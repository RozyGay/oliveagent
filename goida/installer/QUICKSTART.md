# 🚀 Quick Start Guide

Get your beautiful Windows installer up and running in 5 minutes!

## Prerequisites

Choose one installer builder:

### 🎯 Option A: Inno Setup (Recommended for beginners)
1. Download: https://jrsoftware.org/isdl.php
2. Install Inno Setup 6.x on Windows
3. ✅ Done!

### 🎯 Option B: NSIS (Advanced users)
1. Download: https://nsis.sourceforge.io/Download
2. Install NSIS 3.x on Windows
3. ✅ Done!

---

## 3-Step Build Process

### Step 1: Build Your Electron App

```bash
# From the project root
cd /path/to/oliveagent
npm run make
```

This creates the app in `out/OliveAgent-win32-x64/`

### Step 2: Navigate to Installer Directory

```bash
cd goida/installer
```

### Step 3: Build the Installer

#### 🪟 On Windows (PowerShell):

**Using Inno Setup:**
```powershell
npm run build
```

**Or directly:**
```powershell
& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" oliveagent-setup.iss
```

#### 🐧 On Linux/macOS (with Wine):

```bash
npm run build:unix
```

**Or directly:**
```bash
./build-installer.sh
```

---

## ✨ That's It!

Your installer is now ready in:
```
goida/installer/output/OliveAgent-Setup-0.28.0.exe
```

---

## 🎨 Quick Customization

### Change App Name & Version

Edit `oliveagent-setup.iss` (lines 5-10):
```pascal
#define MyAppName "YourAppName"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Your Company"
```

### Add Custom Branding

1. Create two BMP images:
   - `installer-side.bmp` (164x314 pixels) - Sidebar image
   - `installer-icon.bmp` (55x55 pixels) - Top icon

2. Place them in `goida/installer/`

3. Update `oliveagent-setup.iss`:
```pascal
WizardImageFile=installer-side.bmp
WizardSmallImageFile=installer-icon.bmp
```

4. Rebuild!

---

## 🧪 Testing

1. **Install on a clean Windows VM**
2. **Run the setup:**
   ```
   goida/installer/output/OliveAgent-Setup-0.28.0.exe
   ```
3. **Check:**
   - [ ] Desktop shortcut works
   - [ ] Start menu entry works
   - [ ] App launches correctly
   - [ ] Uninstaller works

---

## 📦 Distribution

### Upload to GitHub Releases

```bash
# From project root
gh release create v0.28.0 \
  goida/installer/output/OliveAgent-Setup-0.28.0.exe \
  --title "OliveAgent v0.28.0" \
  --notes "Release notes here"
```

### Or manually:
1. Go to: https://github.com/oliveagent-sh/oliveagent/releases
2. Click "Draft a new release"
3. Upload `OliveAgent-Setup-0.28.0.exe`
4. Publish!

---

## 🔐 Code Signing (Optional but Recommended)

To avoid Windows SmartScreen warnings:

```powershell
signtool sign /f certificate.pfx /p PASSWORD `
  /tr http://timestamp.digicert.com `
  /td SHA256 /fd SHA256 `
  output/OliveAgent-Setup-0.28.0.exe
```

Get a certificate from:
- DigiCert
- Sectigo
- SSL.com

---

## 🆘 Common Issues

### "Cannot find Inno Setup"
**Solution:** Install from https://jrsoftware.org/isdl.php or update path

### "Build output not found"
**Solution:** Run `npm run make` first from project root

### "Installer is flagged by antivirus"
**Solution:** Code sign your installer or add exclusion rules

### "Icons don't show up"
**Solution:** Use 24-bit BMP format, not PNG

---

## 📚 Learn More

- **Full Documentation:** [README.md](README.md)
- **Customization Guide:** [CUSTOMIZATION.md](CUSTOMIZATION.md)
- **Inno Setup Docs:** https://jrsoftware.org/ishelp/

---

## 🎉 Features Included

✅ Modern wizard interface  
✅ Multi-language support (9 languages)  
✅ Desktop & Start Menu shortcuts  
✅ URL protocol registration (`oliveagent://`)  
✅ Automatic uninstaller  
✅ Smart upgrade detection  
✅ Process detection (closes running app)  
✅ Add/Remove Programs integration  
✅ Compression (LZMA2)  

---

## Need Help?

- Check [README.md](README.md) for detailed instructions
- Check [CUSTOMIZATION.md](CUSTOMIZATION.md) for branding
- Open an issue on GitHub
- Ask in Inno Setup forums

**Happy building! 🎊**
