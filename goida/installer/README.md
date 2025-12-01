# OliveAgent Windows Installer

Beautiful Windows installer for OliveAgent using Inno Setup.

## Prerequisites

1. **Inno Setup 6.x or later**
   - Download from: https://jrsoftware.org/isdl.php
   - Install on your Windows machine or build server

2. **Built Application**
   - Run `npm run make` or `npm run package` to build the app
   - Ensure the output is in `out/OliveAgent-win32-x64/` directory

## Building the Installer

### Method 1: Using Inno Setup GUI (Windows)

1. Open `oliveagent-setup.iss` in Inno Setup Compiler
2. Click **Build** → **Compile**
3. The installer will be created in `goida/installer/output/`

### Method 2: Using Command Line (Windows)

```cmd
"C:\Program Files (x86)\Inno Setup 6\ISCC.exe" oliveagent-setup.iss
```

### Method 3: Using npm script

Add to your `package.json`:

```json
{
  "scripts": {
    "build:installer": "iscc goida/installer/oliveagent-setup.iss"
  }
}
```

Then run:
```bash
npm run build:installer
```

## Customization

### Changing Version

Edit line 6 in `oliveagent-setup.iss`:
```pascal
#define MyAppVersion "0.28.0"
```

### Custom Branding

Replace these files in `goida/installer/`:

1. **installer-side.bmp** (164x314 pixels)
   - Large image shown on the left side of the installer
   - Should match your brand colors

2. **installer-icon.bmp** (55x55 pixels)
   - Small icon shown in the top-right corner
   - Use your app logo

### Localization

The installer supports multiple languages:
- English (default)
- Russian
- German
- French
- Spanish
- Italian
- Japanese
- Portuguese
- Chinese (Simplified)

Users can select their language at the start of installation.

### Build Output Path

If your electron-forge build output is in a different location, edit line 65:

```pascal
Source: "..\..\out\OliveAgent-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
```

Common electron-forge paths:
- `..\..\out\OliveAgent-win32-x64\*` (default)
- `..\..\out\make\squirrel.windows\x64\*`

## Features

### ✨ Modern UI
- Clean, modern wizard interface
- Custom branding support
- Multi-language support

### 🔧 Installation Options
- Desktop shortcut (optional)
- Start Menu entries
- Quick Launch icon (Windows 7 and below)
- URL protocol registration (`oliveagent://`)

### 🔐 Security
- Code signing support (configure in CI/CD)
- Integrity checks
- Automatic detection of running app before uninstall

### 📦 Smart Uninstall
- Detects if app is running
- Offers to close app automatically
- Clean removal of all files and registry entries

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build Installer

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Electron app
        run: npm run make
      
      - name: Install Inno Setup
        run: choco install innosetup -y
      
      - name: Build installer
        run: iscc goida/installer/oliveagent-setup.iss
      
      - name: Upload installer
        uses: actions/upload-artifact@v3
        with:
          name: installer
          path: goida/installer/output/*.exe
```

## Testing

Before distributing:

1. **Test on clean Windows VM**
   - Windows 10
   - Windows 11
   
2. **Test scenarios**
   - Fresh install
   - Install over existing version (upgrade)
   - Uninstall
   - Custom installation directory
   - Running app during uninstall

3. **Verify**
   - Desktop shortcut works
   - Start Menu entries work
   - URL protocol (`oliveagent://`) works
   - App launches correctly
   - Uninstaller removes everything

## Signing the Installer

For production builds, sign the installer with a code signing certificate:

### Using signtool (Windows SDK)

```cmd
signtool sign /f certificate.pfx /p password /tr http://timestamp.digicert.com /td SHA256 /fd SHA256 output\OliveAgent-Setup-0.28.0.exe
```

### Using Inno Setup

Edit the `[Setup]` section:

```pascal
SignTool=signtool sign /f $qC:\path\to\certificate.pfx$q /p $qPASSWORD$q /tr http://timestamp.digicert.com /td SHA256 /fd SHA256 $f
```

## Output

After building, you'll find:

- **Installer**: `goida/installer/output/OliveAgent-Setup-0.28.0.exe`
- **Size**: ~100-200 MB (depending on your app size)
- **Compression**: LZMA2 (maximum compression)

## Troubleshooting

### Error: "Cannot find file"
- Check that electron-forge built the app correctly
- Verify the path in `[Files]` section matches your build output

### Error: "Cannot open file"
- Ensure all files in build directory are closed
- Close any running instances of the app

### Installer looks outdated
- Make sure you're using Inno Setup 6.x
- Verify `WizardStyle=modern` is set
- Add custom bitmap images for branding

## License

MIT License - same as OliveAgent

## Credits

- Built with [Inno Setup](https://jrsoftware.org/isinfo.php)
- OliveAgent by [OliveAgent Team](https://github.com/oliveagent-sh/oliveagent)
