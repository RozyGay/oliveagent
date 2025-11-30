import { useState, useEffect, useCallback } from "react";
import { IpcClient } from "@/ipc/ipc_client";

interface Profile {
  username: string;
  isAdmin: boolean;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const ipcClient = IpcClient.getInstance();
      const currentProfile = await ipcClient.profileGetCurrent();
      setProfile(currentProfile);
      setError(null);
    } catch (err) {
      console.error("Error loading profile:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const login = async (username: string, password: string) => {
    try {
      const ipcClient = IpcClient.getInstance();
      const result = await ipcClient.profileLogin({ username, password });
      if (result.success) {
        setProfile(result.profile);
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  const logout = async () => {
    try {
      const ipcClient = IpcClient.getInstance();
      await ipcClient.profileLogout();
      setProfile(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    login,
    logout,
    refreshProfile: loadProfile,
  };
}
