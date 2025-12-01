#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const path = require("node:path");
const process = require("node:process");

const scriptDir = __dirname;
const isWindows = process.platform === "win32";
const command = isWindows ? "powershell" : "bash";
const args = isWindows
  ? ["-ExecutionPolicy", "Bypass", "-File", path.join(scriptDir, "build-installer.ps1")]
  : [path.join(scriptDir, "build-installer.sh")];

console.log("=====================================");
console.log(" OliveAgent Installer Builder (node)");
console.log("=====================================");
console.log("");

const result = spawnSync(command, args, {
  stdio: "inherit",
  shell: false,
});

if (result.error) {
  console.error("Failed to run installer build script:", result.error);
  process.exit(result.status ?? 1);
}

if (result.status !== 0) {
  process.exit(result.status);
}

console.log("");
console.log("✓ Installer build script completed");
