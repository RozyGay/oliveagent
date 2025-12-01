import { ipcMain } from "electron";
import log from "electron-log";
import { readSettings, writeSettings } from "../../main/settings";

const logger = log.scope("profile");

const PROFILE_API_URL = "https://mirage-project.ru/v2/users";
const PROFILE_API_KEY = "adsfkjhwrg7fg234uyref32eh8fh32dfu2hdjfg23rye=423582438urf38r7efhvciuyh";

interface MirageUser {
  username: string;
  password: string;
  isadmin: string;
}

interface AdminListedUser {
  username: string;
  isActive: boolean;
  isAdmin: boolean;
}

async function fetchMirageUsers(): Promise<MirageUser[]> {
  const response = await fetch(PROFILE_API_URL, {
    headers: {
      Authorization: `Bearer ${PROFILE_API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Profile API error: ${response.status}`);
  }

  const payload = await response.json();
  const users: MirageUser[] = [];

  const normalizeUser = (value: unknown, fallbackUsername?: string) => {
    if (!value || typeof value !== "object") {
      if (typeof value === "string" && fallbackUsername) {
        users.push({
          username: fallbackUsername,
          password: value,
          isadmin: "false",
        });
      }
      return;
    }

    const record = value as Partial<MirageUser> & Record<string, unknown>;
    const username =
      typeof record.username === "string" ? record.username : fallbackUsername;
    const password = typeof record.password === "string" ? record.password : null;
    if (!username || !password) {
      return;
    }
    users.push({
      username,
      password,
      isadmin:
        typeof record.isadmin === "string" ? record.isadmin : "false",
    });
  };

  if (Array.isArray(payload)) {
    payload.forEach((entry, index) => normalizeUser(entry, `user-${index + 1}`));
  } else if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (typeof record.username === "string" && typeof record.password === "string") {
      users.push({
        username: record.username as string,
        password: record.password as string,
        isadmin: typeof record.isadmin === "string" ? (record.isadmin as string) : "false",
      });
    } else {
      Object.entries(record).forEach(([username, value]) => {
        normalizeUser(value, username);
      });
    }
  }

  if (!users.length) {
    throw new Error("No profiles available");
  }

  return users;
}

function requireAdmin() {
  const settings = readSettings();
  if (!settings.currentProfile?.isAdmin) {
    throw new Error("Unauthorized");
  }
  return settings;
}

export function registerProfileHandlers() {
  ipcMain.handle(
    "profile:login",
    async (
      _,
      { username, password }: { username: string; password: string },
    ) => {
      try {
        const [settings, users] = await Promise.all([
          readSettings(),
          fetchMirageUsers(),
        ]);

        const targetUser = users.find((user) => user.username === username);
        if (!targetUser || targetUser.password !== password) {
          throw new Error("Invalid credentials");
        }

        const disabled = new Set(settings.disabledUsers ?? []);
        if (disabled.has(username)) {
          throw new Error("Profile disabled");
        }

        writeSettings({
          currentProfile: {
            username: targetUser.username,
            isAdmin: targetUser.isadmin === "true",
          },
        });

        return {
          success: true,
          profile: {
            username: targetUser.username,
            isAdmin: targetUser.isadmin === "true",
          },
        };
      } catch (error) {
        logger.error("Login error:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to login",
        );
      }
    },
  );

  ipcMain.handle("profile:get-current", async () => {
    try {
      const settings = readSettings();
      return settings.currentProfile ?? null;
    } catch (error) {
      logger.error("Get current profile error:", error);
      throw new Error("Failed to get current profile");
    }
  });

  ipcMain.handle("profile:logout", async () => {
    try {
      writeSettings({ currentProfile: undefined });
      return { success: true };
    } catch (error) {
      logger.error("Logout error:", error);
      throw new Error("Failed to logout");
    }
  });

  ipcMain.handle("profile:admin:list-users", async () => {
    try {
      const settings = requireAdmin();
      const users = await fetchMirageUsers();
      const disabledSet = new Set(settings.disabledUsers ?? []);
      return users.map<AdminListedUser>((user) => ({
        username: user.username,
        isActive: !disabledSet.has(user.username),
        isAdmin: user.isadmin === "true",
      }));
    } catch (error) {
      logger.error("List users error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to list users",
      );
    }
  });

  ipcMain.handle(
    "profile:admin:set-provider-key",
    async (
      _,
      {
        username,
        provider,
        apiKey,
      }: { username: string; provider: string; apiKey: string },
    ) => {
      try {
        const settings = requireAdmin();
        const adminManagedKeys = {
          ...settings.adminManagedKeys,
          [username]: {
            ...settings.adminManagedKeys?.[username],
            [provider]: apiKey,
          },
        };

        writeSettings({ adminManagedKeys });
        return { success: true };
      } catch (error) {
        logger.error("Set provider key error:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to set provider key",
        );
      }
    },
  );

  ipcMain.handle(
    "profile:admin:toggle-user",
    async (_, { username, isActive }: { username: string; isActive: boolean }) => {
      try {
        const settings = requireAdmin();
        const disabledUsers = new Set(settings.disabledUsers ?? []);
        if (isActive) {
          disabledUsers.delete(username);
        } else {
          disabledUsers.add(username);
        }

        writeSettings({ disabledUsers: Array.from(disabledUsers) });
        return { success: true };
      } catch (error) {
        logger.error("Toggle user error:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to toggle user",
        );
      }
    },
  );

  ipcMain.handle("profile:get-managed-keys", async () => {
    try {
      const settings = readSettings();
      const username = settings.currentProfile?.username;
      if (!username) {
        return {};
      }
      return settings.adminManagedKeys?.[username] ?? {};
    } catch (error) {
      logger.error("Get managed keys error:", error);
      throw new Error("Failed to get managed keys");
    }
  });
}
