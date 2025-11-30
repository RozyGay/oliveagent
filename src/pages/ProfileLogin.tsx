import { useState } from "react";
import { IpcClient } from "@/ipc/ipc_client";
import { showSuccess, showError } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, LogIn } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export default function ProfileLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      showError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const ipcClient = IpcClient.getInstance();
      const result = await ipcClient.profileLogin({ username, password });
      
      if (result.success) {
        showSuccess(`Welcome, ${result.profile.username}!`);
        router.navigate({ to: "/" });
      }
    } catch (error) {
      showError(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <Card className="w-full max-w-md z-10 shadow-2xl border-2 border-white/20 dark:border-gray-700/50 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-purple-600 dark:text-purple-400 animate-pulse" />
              <div className="absolute inset-0 h-16 w-16 animate-ping opacity-20">
                <Sparkles className="h-16 w-16 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Welcome to Dyad
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your profile to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="transition-all focus:scale-[1.02]"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="transition-all focus:scale-[1.02]"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 transition-all hover:scale-[1.02] shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Sign In
              </div>
            )}
          </Button>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            Made with ❤️ by Rozy
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
