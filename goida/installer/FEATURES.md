# ✨ Installer Features

## 🎨 User Experience

### Modern Wizard Interface
```
┌─────────────────────────────────────┐
│  🎯 OliveAgent Setup                │
│─────────────────────────────────────│
│                                     │
│  ┌─────────────┐                   │
│  │             │  Welcome to       │
│  │   [LOGO]    │  OliveAgent!      │
│  │             │                   │
│  └─────────────┘  This wizard will │
│                   guide you...     │
│                                     │
│  < Back    Next >   Cancel         │
└─────────────────────────────────────┘
```

**Features:**
- ✅ Clean, modern design
- ✅ Smooth page transitions
- ✅ Progress indicator
- ✅ Responsive layout
- ✅ High DPI support
- ✅ Dark/light mode support (system)

---

## 🌍 Multi-Language Support

Installer automatically detects system language:

| Language | Code | Status |
|----------|------|--------|
| 🇬🇧 English | en | ✅ Default |
| 🇷🇺 Russian | ru | ✅ Full |
| 🇩🇪 German | de | ✅ Full |
| 🇫🇷 French | fr | ✅ Full |
| 🇪🇸 Spanish | es | ✅ Full |
| 🇮🇹 Italian | it | ✅ Full |
| 🇯🇵 Japanese | ja | ✅ Full |
| 🇵🇹 Portuguese | pt | ✅ Full |
| 🇨🇳 Chinese (Simplified) | zh-CN | ✅ Full |

**How it works:**
1. Detects Windows UI language
2. Offers language selection on first screen
3. All text translated automatically
4. User can override if needed

---

## 📦 Installation Options

### Standard Options

```
┌─────────────────────────────────────┐
│  Select Additional Tasks            │
│─────────────────────────────────────│
│                                     │
│  Additional icons:                  │
│  ☐ Create a desktop icon            │
│  ☐ Create a Quick Launch icon       │
│                                     │
│  Integration:                       │
│  ☐ Register oliveagent:// protocol  │
│                                     │
│  < Back    Next >   Cancel         │
└─────────────────────────────────────┘
```

**Desktop Icon** (Optional)
- Quick access from desktop
- Uses app icon
- Can be removed later

**Quick Launch** (Windows 7 only)
- Adds to taskbar quick launch
- Legacy feature
- Hidden on Windows 10+

**URL Protocol** (Recommended)
- Enables `oliveagent://` deep links
- OAuth callbacks
- External integrations
- Browser → app communication

---

## 🛡️ Security Features

### Process Detection
```
⚠️  OliveAgent is currently running
    
    Would you like to close it automatically?
    
    [Yes]  [No]
```

**What happens:**
1. Installer checks for running process
2. Offers to close it automatically
3. Uses graceful shutdown (not force kill)
4. Waits for clean exit
5. Continues installation

### Permission Management

**User-level Install** (Default)
- ✅ No admin rights needed
- ✅ Installs to user directory
- ✅ Per-user registry keys
- ✅ Safe for shared computers

**System-level Install** (Optional)
- ⚠️ Requires admin rights
- Installs to Program Files
- System-wide registry keys
- Available to all users

### Code Signing Support

**Before signing:**
```
⚠️  Windows protected your PC
    
    Unknown publisher
    
    [More info]
```

**After signing:**
```
✓  Verified publisher: OliveAgent Team
   
   Digital signature is valid
   
   [Install]
```

---

## 🔄 Upgrade Support

### Smart Upgrade Detection

```
┌─────────────────────────────────────┐
│  Previous Installation Detected     │
│─────────────────────────────────────│
│                                     │
│  OliveAgent 0.27.0 is installed.    │
│                                     │
│  Do you want to upgrade to 0.28.0?  │
│                                     │
│  Your settings will be preserved.   │
│                                     │
│  [Upgrade]  [Cancel]                │
└─────────────────────────────────────┘
```

**Features:**
- ✅ Detects previous installation
- ✅ Offers upgrade vs. fresh install
- ✅ Preserves user settings
- ✅ Preserves user data
- ✅ Keeps installation directory
- ✅ Updates shortcuts
- ✅ Updates registry

### Version Rollback

Users can:
1. Uninstall current version
2. Install older version
3. Restore from backup (if created)

---

## 📊 Installation Progress

```
┌─────────────────────────────────────┐
│  Installing OliveAgent              │
│─────────────────────────────────────│
│                                     │
│  Extracting files...                │
│  ████████████████░░░░░░  67%        │
│                                     │
│  Current file:                      │
│  resources\app.asar                 │
│                                     │
│  Time remaining: 23 seconds         │
│                                     │
└─────────────────────────────────────┘
```

**Details shown:**
- Current operation
- Progress bar
- Percentage complete
- Current file being copied
- Estimated time remaining
- Total size being installed

---

## 🗑️ Uninstaller

### Smart Uninstall

```
┌─────────────────────────────────────┐
│  Uninstall OliveAgent               │
│─────────────────────────────────────│
│                                     │
│  Are you sure you want to           │
│  completely remove OliveAgent?      │
│                                     │
│  ☐ Remove user settings             │
│  ☐ Remove user data                 │
│                                     │
│  [Uninstall]  [Cancel]              │
└─────────────────────────────────────┘
```

**What gets removed:**
- ✅ All program files
- ✅ Desktop shortcuts
- ✅ Start Menu entries
- ✅ Registry keys
- ✅ URL protocol registration
- ⚠️ User settings (optional)
- ⚠️ User data (optional)

**What's preserved:**
- User projects (in separate directory)
- Configuration files (if selected)
- Database files (if selected)
- Logs (if selected)

---

## 💾 Disk Space Management

### Installation Size

| Component | Size | Required |
|-----------|------|----------|
| Core application | 80 MB | ✅ Yes |
| Resources & libraries | 30 MB | ✅ Yes |
| Electron framework | 10 MB | ✅ Yes |
| **Total** | **~120 MB** | |

### Compression

**Installer size vs. installed size:**
```
Installer:    60 MB  (LZMA2 compressed)
  ↓
Installed:   120 MB  (on disk)
  ↓
Compression: ~50% ratio
```

### Disk Space Check

```
⚠️  Not enough disk space
    
    Required:  120 MB
    Available: 85 MB
    
    Please free up space and try again.
    
    [OK]
```

---

## 🔗 Integration Features

### Windows Explorer

**Context Menu** (Optional)
- Right-click on folders
- "Open with OliveAgent"
- "Create OliveAgent project here"

### File Associations** (Optional)

Associate file types:
- `.oliveagent` - Project files
- `.dyad` - Legacy projects

### URL Protocol

**Deep Linking:**
```
oliveagent://action/new?template=react
oliveagent://oauth/callback?code=...
oliveagent://project/open?path=...
oliveagent://settings/providers
```

**OAuth Flows:**
- GitHub authentication
- Vercel deployment
- Supabase integration
- Neon database

---

## 📝 Post-Installation

### Launch Options

```
┌─────────────────────────────────────┐
│  Setup Completed                    │
│─────────────────────────────────────┐
│                                     │
│  ✓ OliveAgent has been installed    │
│                                     │
│  ☑ Launch OliveAgent                │
│  ☐ View release notes               │
│  ☐ Open documentation               │
│                                     │
│  [Finish]                           │
└─────────────────────────────────────┘
```

### First Run

After installation, on first launch:
1. Welcome screen
2. Privacy settings
3. Telemetry opt-in/out
4. Provider configuration
5. Quick start guide

---

## 🔧 Advanced Features

### Silent Installation

**Command Line:**
```cmd
OliveAgent-Setup.exe /VERYSILENT /NORESTART /DIR="C:\Apps\OliveAgent"
```

**Parameters:**
- `/VERYSILENT` - No UI, no prompts
- `/SILENT` - Progress only, no prompts
- `/SUPPRESSMSGBOXES` - Suppress all message boxes
- `/NORESTART` - Don't restart computer
- `/DIR="path"` - Custom install directory
- `/GROUP="name"` - Custom Start Menu folder
- `/NOICONS` - Don't create shortcuts
- `/TASKS="task1,task2"` - Select tasks
- `/LOG="file.txt"` - Save install log

**Exit Codes:**
- `0` - Success
- `1` - User cancelled
- `2` - Fatal error
- `3` - CRC error
- `4` - Not enough disk space

### Automated Deployment

**Group Policy / SCCM:**
```cmd
msiexec /i OliveAgent-Setup.msi /qn ALLUSERS=1
```

**PowerShell DSC:**
```powershell
Package OliveAgent {
    Ensure = "Present"
    Path = "\\server\share\OliveAgent-Setup.exe"
    Arguments = "/VERYSILENT /NORESTART"
    Name = "OliveAgent"
    ProductId = ""
}
```

### Custom Install Scripts

**Pre-install script:**
```pascal
[Code]
function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  // Check prerequisites
  // Download dependencies
  // Configure environment
  Result := '';  // Empty = success
end;
```

**Post-install script:**
```pascal
procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then begin
    // Run first-time setup
    // Import settings
    // Register services
  end;
end;
```

---

## 📈 Analytics & Telemetry

### Installation Metrics

**What we track:**
- ✅ Installation attempts
- ✅ Installation success/failure
- ✅ Installation time
- ✅ Selected options
- ✅ System information
- ❌ Personal data (never)
- ❌ File contents (never)

**Privacy:**
- All anonymous
- Opt-in during first run
- Can be disabled anytime
- Used for improvement only

---

## 🎯 Comparison

### vs. Squirrel.Windows (electron-forge default)

| Feature | Our Installer | Squirrel |
|---------|--------------|----------|
| Custom branding | ✅ Full | ⚠️ Limited |
| Multi-language | ✅ 9 languages | ❌ English only |
| Install options | ✅ Many | ⚠️ Few |
| Silent install | ✅ Yes | ✅ Yes |
| Size | ~60 MB | ~50 MB |
| Setup time | 30-60s | 10-20s |
| User experience | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Auto-update | ⚠️ Manual | ✅ Built-in |

### vs. NSIS

| Feature | Inno Setup | NSIS |
|---------|-----------|------|
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Documentation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Customization | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| File size | Similar | Similar |
| Learning curve | Easy | Moderate |
| Community | Large | Very large |

---

## 🚀 Performance

### Installation Speed

**Average install time:**
```
Extraction:    30s  (60 MB → 120 MB)
Registry:       2s  (URLs, uninstall info)
Shortcuts:      1s  (desktop, start menu)
Verification:   2s  (file integrity)
─────────────────
Total:         35s  (on SSD)
Total:         60s  (on HDD)
```

### System Impact

**During installation:**
- CPU: 10-30% (single core)
- RAM: 50-100 MB
- Disk I/O: Moderate
- No internet required

**After installation:**
- Disk space: ~120 MB
- Registry: ~50 KB
- Startup impact: None (unless enabled)

---

## 🎓 Best Practices

### For Users

✅ **Do:**
- Close app before uninstalling
- Keep installer for reinstall
- Enable URL protocol
- Create desktop shortcut
- Review privacy settings

❌ **Don't:**
- Install to system directories manually
- Modify registry manually
- Delete files manually (use uninstaller)
- Run multiple versions simultaneously

### For Developers

✅ **Do:**
- Sign your installer
- Test on clean VMs
- Provide silent install
- Document install options
- Support upgrades
- Include uninstaller

❌ **Don't:**
- Hardcode paths
- Require admin unnecessarily
- Skip error handling
- Forget to test uninstall
- Bloat installer size

---

## 🔮 Future Enhancements

**Planned features:**
- [ ] Auto-update support
- [ ] Delta updates (smaller downloads)
- [ ] Microsoft Store version
- [ ] Portable version (no install)
- [ ] Custom themes
- [ ] Plugin installer
- [ ] Offline license activation
- [ ] Enterprise deployment tools
- [ ] Chocolatey package
- [ ] Winget package

---

## 📞 Support

Having issues?

1. **Check logs:**
   ```
   %TEMP%\Setup Log YYYY-MM-DD #NNN.txt
   ```

2. **Common issues:**
   - Not enough space
   - Permission denied
   - App already running
   - Antivirus blocking

3. **Get help:**
   - GitHub Issues
   - Discord community
   - Email support

---

## 🏆 Credits

Built with:
- **Inno Setup** - Jordan Russell
- **NSIS** - Nullsoft
- **Electron** - OpenJS Foundation
- **OliveAgent** - OliveAgent Team

Thank you to all contributors! 🙏
