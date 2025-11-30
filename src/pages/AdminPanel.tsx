import { useState, useEffect } from "react";
import { IpcClient } from "@/ipc/ipc_client";
import { showSuccess, showError } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield, Users, Key } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
  username: string;
  isActive: boolean;
}

export default function AdminPanelPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [provider, setProvider] = useState<string>("openai");
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const ipcClient = IpcClient.getInstance();
      const data = await ipcClient.profileAdminListUsers();
      setUsers(data);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Failed to load users");
    }
  };

  const handleToggleUser = async (username: string, isActive: boolean) => {
    try {
      const ipcClient = IpcClient.getInstance();
      await ipcClient.profileAdminToggleUser({ username, isActive });
      showSuccess(`User ${username} ${isActive ? "enabled" : "disabled"}`);
      loadUsers();
    } catch (error) {
      showError(error instanceof Error ? error.message : "Failed to toggle user");
    }
  };

  const handleSetApiKey = async () => {
    if (!selectedUser || !apiKey) {
      showError("Please select a user and enter an API key");
      return;
    }

    setIsLoading(true);
    try {
      const ipcClient = IpcClient.getInstance();
      await ipcClient.profileAdminSetProviderKey({ username: selectedUser, provider, apiKey });
      showSuccess(`API key set for ${selectedUser}`);
      setApiKey("");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Failed to set API key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Manage users and API keys
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <CardTitle>User Management</CardTitle>
              </div>
              <CardDescription>Enable or disable user accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.map((user) => (
                <div key={user.username} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${user.isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <Switch
                    checked={user.isActive}
                    onCheckedChange={(checked) => handleToggleUser(user.username, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 dark:border-pink-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                <CardTitle>API Key Management</CardTitle>
              </div>
              <CardDescription>Set provider API keys for users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user">Select User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.username} value={user.username}>
                        {user.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="auto">Auto (Pro)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono"
                />
              </div>

              <Button
                onClick={handleSetApiKey}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                {isLoading ? "Setting..." : "Set API Key"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024 Dyad by Rozy. All rights reserved.
        </div>
      </div>
    </div>
  );
}
