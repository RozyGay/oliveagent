# 📁 Installer Directory Structure

## File Overview

```
goida/installer/
├── 📄 oliveagent-setup.iss      # Main Inno Setup script (RECOMMENDED)
├── 📄 oliveagent-nsis.nsi       # Alternative NSIS script
├── 📄 info.txt                  # Pre-installation welcome text
├── 📄 build-installer.ps1       # Windows PowerShell build script
├── 📄 build-installer.sh        # Linux/macOS bash build script
├── 📄 build.js                  # Node.js wrapper script
├── 📄 package.json              # npm scripts configuration
├── 📄 .gitignore                # Ignore build outputs
├── 📚 README.md                 # Full documentation
├── 📚 QUICKSTART.md             # 5-minute quick start
├── 📚 CUSTOMIZATION.md          # Branding & customization guide
├── 📚 STRUCTURE.md              # This file
└── 📁 output/                   # Build output (created automatically)
    └── OliveAgent-Setup-*.exe
```

## File Descriptions

### 🎯 Main Scripts

#### `oliveagent-setup.iss` (PRIMARY)
**Purpose:** Inno Setup installer script
**Language:** Inno Setup Script
**Features:**
- Modern wizard UI
- Multi-language support (9 languages)
- URL protocol registration
- Code signing support
- Custom pages
- Registry management
- Process detection

**When to use:** Default choice for most projects

---

#### `oliveagent-nsis.nsi` (ALTERNATIVE)
**Purpose:** NSIS installer script
**Language:** NSIS Script
**Features:**
- More control over UI
- Plugin system
- Smaller file size
- Advanced scripting

**When to use:** When you need more control or specific NSIS features

---

### 🛠️ Build Scripts

#### `build-installer.ps1`
**Platform:** Windows (PowerShell)
**Purpose:** Automated build process
**Usage:**
```powershell
.\build-installer.ps1
.\build-installer.ps1 -SkipBuild
.\build-installer.ps1 -Sign -CertPath "cert.pfx"
```

**What it does:**
1. Cleans previous builds
2. Builds Electron app (optional)
3. Verifies build output
4. Compiles installer with Inno Setup
5. Signs installer (optional)

---

#### `build-installer.sh`
**Platform:** Linux/macOS (Bash + Wine)
**Purpose:** Cross-platform build
**Usage:**
```bash
./build-installer.sh
./build-installer.sh --skip-build
```

**Requirements:**
- Wine
- Inno Setup installed in Wine

---

#### `build.js`
**Platform:** Cross-platform (Node.js)
**Purpose:** Platform-agnostic wrapper
**Usage:**
```bash
npm run build
```

**What it does:**
- Detects platform
- Calls appropriate build script
- Reports success/failure

---

### 📚 Documentation

#### `README.md`
Complete documentation covering:
- Prerequisites
- Installation
- Building
- CI/CD integration
- Testing
- Troubleshooting

#### `QUICKSTART.md`
5-minute quick start guide:
- Minimal steps to build
- Quick customization
- Fast testing

#### `CUSTOMIZATION.md`
Detailed branding guide:
- Changing app info
- Custom images
- Colors and themes
- Code signing
- Advanced features

#### `STRUCTURE.md`
This file - explains directory structure

---

### 📝 Configuration

#### `info.txt`
Pre-installation information shown to user.

**Contains:**
- Welcome message
- Feature list
- System requirements
- What's new
- License info
- Support links

**Format:** Plain text
**Editable:** Yes, customize for your brand

---

#### `package.json`
npm scripts for building installer.

**Available scripts:**
```json
{
  "build": "Cross-platform build",
  "build:windows": "Windows-specific build",
  "build:unix": "Linux/macOS build",
  "build:skip-app": "Skip app build, just installer",
  "build:nsis": "Build with NSIS instead",
  "clean": "Remove output directory"
}
```

---

#### `.gitignore`
Prevents committing build outputs.

**Ignores:**
- `output/` directory
- `*.exe` files
- Temporary files
- Logs

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────┐
│  Project Root (npm run make)                    │
│  Builds: out/OliveAgent-win32-x64/              │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  goida/installer/                               │
│                                                  │
│  ┌────────────────────────────────────┐        │
│  │  Option 1: Inno Setup              │        │
│  │  oliveagent-setup.iss              │        │
│  └────────────────────────────────────┘        │
│                                                  │
│  ┌────────────────────────────────────┐        │
│  │  Option 2: NSIS                    │        │
│  │  oliveagent-nsis.nsi               │        │
│  └────────────────────────────────────┘        │
│                                                  │
│  Choose one ──┐                                 │
│               │                                 │
│               ▼                                 │
│  ┌────────────────────────────────────┐        │
│  │  Build Script                      │        │
│  │  • Windows: build-installer.ps1    │        │
│  │  • Unix: build-installer.sh        │        │
│  │  • Node: build.js                  │        │
│  └────────────────────────────────────┘        │
│               │                                 │
│               ▼                                 │
│  ┌────────────────────────────────────┐        │
│  │  Compiler                          │        │
│  │  • Inno Setup (ISCC.exe)           │        │
│  │  • NSIS (makensis.exe)             │        │
│  └────────────────────────────────────┘        │
│               │                                 │
│               ▼                                 │
│  ┌────────────────────────────────────┐        │
│  │  Output                            │        │
│  │  output/OliveAgent-Setup.exe       │        │
│  └────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Optional: Code Signing                         │
│  signtool.exe sign ...                          │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Distribution                                    │
│  • GitHub Releases                              │
│  • Website Downloads                            │
│  • Update Server                                │
└─────────────────────────────────────────────────┘
```

---

## Build Output Structure

After building, the `output/` directory contains:

```
output/
├── OliveAgent-Setup-0.28.0.exe    # Main installer
└── Setup*.txt                      # Build log (if logging enabled)
```

---

## Installer Behavior

### What the installer does:

1. **Welcome Screen**
   - Shows app logo
   - Displays welcome message
   - Language selection

2. **License Agreement**
   - Shows LICENSE file
   - User must accept to continue

3. **Pre-Installation Info**
   - Displays `info.txt`
   - Shows features and requirements

4. **Installation Directory**
   - Default: `C:\Users\USERNAME\AppData\Local\OliveAgent`
   - User can customize

5. **Installation Options**
   - ☐ Create desktop shortcut
   - ☐ Create Quick Launch icon
   - ☐ Register URL protocol (`oliveagent://`)

6. **Installing**
   - Checks for running app
   - Copies files
   - Creates shortcuts
   - Registers protocol
   - Creates uninstaller

7. **Finish**
   - ☐ Launch OliveAgent
   - Link to website

---

## Registry Keys Created

### URL Protocol
```
HKCU\Software\Classes\oliveagent
  (Default) = "URL:OliveAgent Protocol"
  URL Protocol = ""
  DefaultIcon\(Default) = "C:\...\OliveAgent.exe,0"
  shell\open\command\(Default) = "C:\...\OliveAgent.exe" "%1"
```

### Installation Info
```
HKCU\Software\OliveAgent
  (Default) = "C:\Users\...\OliveAgent"
```

### Add/Remove Programs
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent
  DisplayName = "OliveAgent"
  DisplayIcon = "C:\...\OliveAgent.exe"
  UninstallString = "C:\...\Uninstall.exe"
  Publisher = "OliveAgent Team"
  DisplayVersion = "0.28.0"
  EstimatedSize = <size in KB>
```

---

## Shortcuts Created

### Start Menu
```
%APPDATA%\Microsoft\Windows\Start Menu\Programs\OliveAgent\
├── OliveAgent.lnk
└── Uninstall.lnk
```

### Desktop (optional)
```
%USERPROFILE%\Desktop\OliveAgent.lnk
```

### Quick Launch (Windows 7, optional)
```
%APPDATA%\Microsoft\Internet Explorer\Quick Launch\OliveAgent.lnk
```

---

## Files Installed

```
%LOCALAPPDATA%\OliveAgent\
├── OliveAgent.exe                  # Main executable
├── resources\                      # Electron resources
│   └── app.asar                    # Application code
├── locales\                        # Electron locales
├── *.dll                           # Runtime libraries
├── LICENSE                         # License file
└── Uninstall.exe                   # Uninstaller
```

---

## Uninstaller Behavior

The uninstaller:

1. ✅ Checks if app is running
2. ✅ Offers to close app automatically
3. ✅ Removes all files
4. ✅ Removes shortcuts
5. ✅ Removes registry keys
6. ✅ Removes from Add/Remove Programs
7. ✅ Shows completion message

**What it preserves:**
- User data (if stored elsewhere)
- Configuration files (if in %APPDATA%)

---

## Size Estimates

| Component | Size |
|-----------|------|
| Electron app (uncompressed) | ~120-150 MB |
| Compressed installer | ~60-80 MB |
| Installed size on disk | ~120-150 MB |

**Compression ratio:** ~50% with LZMA2

---

## Platform Support

| Platform | Supported | Notes |
|----------|-----------|-------|
| Windows 10 x64 | ✅ Yes | Primary target |
| Windows 11 x64 | ✅ Yes | Fully supported |
| Windows 8.1 x64 | ⚠️ Maybe | Not tested |
| Windows 7 x64 | ❌ No | Electron 38 requires Win 10+ |
| Windows 32-bit | ❌ No | 64-bit only |

---

## Next Steps

1. **Read:** [QUICKSTART.md](QUICKSTART.md) to build your first installer
2. **Customize:** [CUSTOMIZATION.md](CUSTOMIZATION.md) for branding
3. **Build:** Run `npm run build` in this directory
4. **Test:** Install on a clean Windows VM
5. **Sign:** Add code signing certificate
6. **Distribute:** Upload to GitHub Releases

---

## Support

- 📖 Full docs: [README.md](README.md)
- 🚀 Quick start: [QUICKSTART.md](QUICKSTART.md)
- 🎨 Branding: [CUSTOMIZATION.md](CUSTOMIZATION.md)
- 🐛 Issues: https://github.com/oliveagent-sh/oliveagent/issues
