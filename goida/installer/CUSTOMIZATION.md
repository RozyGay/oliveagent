# Installer Customization Guide

This guide will help you customize the Windows installer for OliveAgent with your own branding and settings.

## Quick Start

### Option 1: Inno Setup (Recommended)
- ✅ Professional look
- ✅ Easy to customize
- ✅ Great documentation
- ✅ Multi-language support
- ✅ Small file size

### Option 2: NSIS
- ✅ More control over UI
- ✅ Plugin system
- ✅ Scriptable
- ⚠️ Steeper learning curve

---

## Customizing Inno Setup Installer

### 1. Change Application Info

Edit `oliveagent-setup.iss`:

```pascal
#define MyAppName "YourAppName"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Your Company"
#define MyAppURL "https://yourwebsite.com"
#define MyAppExeName "YourApp.exe"
#define MyAppProtocol "yourprotocol"
```

### 2. Add Custom Branding Images

Create these images in the installer directory:

#### Sidebar Image (164x314 pixels)
**File:** `installer-side.bmp`
- Format: 24-bit BMP
- Size: 164 x 314 pixels
- Purpose: Large image on the left side of installer

**Design tips:**
- Use your brand colors
- Add your logo at the top
- Keep it simple and professional
- Consider using a gradient background

#### Small Icon (55x55 pixels)
**File:** `installer-icon.bmp`
- Format: 24-bit BMP
- Size: 55 x 55 pixels
- Purpose: Small icon in the top-right corner

**Design tips:**
- Use your app logo
- Make sure it's visible at small size
- Use transparent or white background

#### Example with ImageMagick:

```bash
# Convert PNG to BMP for sidebar
convert logo.png -resize 164x314! -type TrueColor installer-side.bmp

# Convert PNG to BMP for icon
convert logo.png -resize 55x55! -type TrueColor installer-icon.bmp
```

### 3. Customize Welcome Message

Edit `info.txt` to change the pre-installation information screen.

### 4. Change Colors and Theme

Inno Setup uses the modern wizard style by default. For advanced theming:

1. Download Inno Setup Skin: https://www.deviantart.com/tag/innosetup
2. Add to your script:

```pascal
[Setup]
WizardImageFile=your-custom-side.bmp
WizardSmallImageFile=your-custom-icon.bmp
; For solid color background:
WizardImageBackColor=$000000
```

### 5. Add Custom Pages

Add a custom page with additional options:

```pascal
[Code]
var
  CustomPage: TInputOptionWizardPage;

procedure InitializeWizard;
begin
  CustomPage := CreateInputOptionPage(wpSelectDir,
    'Additional Options', 'Select additional installation options',
    'Please select any additional options you would like to configure.',
    False, False);
  
  CustomPage.Add('Install for all users');
  CustomPage.Add('Create system service');
  CustomPage.Add('Open firewall ports');
  
  CustomPage.Values[0] := False;
  CustomPage.Values[1] := False;
  CustomPage.Values[2] := False;
end;
```

### 6. Custom Installation Paths

Modify the default installation directory:

```pascal
[Setup]
; Install to Program Files (requires admin)
DefaultDirName={autopf}\{#MyAppName}
PrivilegesRequired=admin

; OR install to user directory (no admin needed)
DefaultDirName={localappdata}\{#MyAppName}
PrivilegesRequired=lowest
```

### 7. Add Additional Files

Include documentation, configuration files, etc.:

```pascal
[Files]
Source: "..\..\README.pdf"; DestDir: "{app}\docs"; Flags: ignoreversion
Source: "..\..\config\default.json"; DestDir: "{app}\config"; Flags: ignoreversion
```

---

## Customizing NSIS Installer

### 1. Change Basic Info

Edit `oliveagent-nsis.nsi`:

```nsis
Name "Your App Name"
OutFile "output\YourApp-Setup.exe"
InstallDir "$LOCALAPPDATA\YourApp"
```

### 2. Add Custom Images

NSIS supports custom header and sidebar images:

```nsis
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_BITMAP "header.bmp"  ; 150x57 pixels
!define MUI_WELCOMEFINISHPAGE_BITMAP "welcome.bmp"  ; 164x314 pixels
```

### 3. Custom Pages

Add a custom page for configuration:

```nsis
Var Dialog
Var Label
Var CheckBox

PageEx custom
  PageCallbacks ShowCustomPage LeaveCustomPage
PageExEnd

Function ShowCustomPage
  nsDialogs::Create 1018
  Pop $Dialog
  
  ${NSD_CreateLabel} 0 0 100% 12u "Additional Settings:"
  Pop $Label
  
  ${NSD_CreateCheckbox} 0 20u 100% 10u "Enable auto-start"
  Pop $CheckBox
  
  nsDialogs::Show
FunctionEnd

Function LeaveCustomPage
  ${NSD_GetState} $CheckBox $0
  ${If} $0 == 1
    ; Checkbox is checked
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "YourApp" "$INSTDIR\YourApp.exe"
  ${EndIf}
FunctionEnd
```

---

## Advanced Customizations

### 1. Code Signing

Sign your installer to avoid Windows SmartScreen warnings:

#### PowerShell:
```powershell
$cert = Get-PfxCertificate -FilePath "certificate.pfx"
Set-AuthenticodeSignature -FilePath "OliveAgent-Setup.exe" -Certificate $cert -TimestampServer "http://timestamp.digicert.com"
```

#### signtool.exe:
```cmd
signtool sign /f certificate.pfx /p password /tr http://timestamp.digicert.com /td SHA256 /fd SHA256 OliveAgent-Setup.exe
```

### 2. Silent Installation

Support command-line silent install:

**Inno Setup:**
```cmd
OliveAgent-Setup.exe /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP- /DIR="C:\MyCustomPath"
```

**NSIS:**
```cmd
OliveAgent-Setup.exe /S /D=C:\MyCustomPath
```

### 3. Auto-Update Integration

Add update check on installation:

```pascal
[Code]
procedure CurStepChanged(CurStep: TSetupStep);
var
  ResultCode: Integer;
begin
  if CurStep = ssPostInstall then
  begin
    // Write update check timestamp
    SaveStringToFile(ExpandConstant('{app}\last-update-check.txt'), 
                     GetDateTimeString('yyyy-mm-dd hh:nn:ss', #0, #0), False);
  end;
end;
```

### 4. Multiple Language Support

Inno Setup already includes multiple languages. To add more:

```pascal
[Languages]
Name: "dutch"; MessagesFile: "compiler:Languages\Dutch.isl"
Name: "polish"; MessagesFile: "compiler:Languages\Polish.isl"
Name: "ukrainian"; MessagesFile: "compiler:Languages\Ukrainian.isl"
```

### 5. Prerequisites Check

Check for required dependencies:

```pascal
[Code]
function InitializeSetup(): Boolean;
var
  Version: String;
begin
  Result := True;
  
  // Check Windows version
  if not IsWin64() then
  begin
    MsgBox('This application requires 64-bit Windows.', mbError, MB_OK);
    Result := False;
    Exit;
  end;
  
  // Check for required software
  if not RegQueryStringValue(HKLM, 'SOFTWARE\Node.js', 'Version', Version) then
  begin
    if MsgBox('Node.js is not installed. Do you want to continue anyway?', 
              mbConfirmation, MB_YESNO) = IDNO then
    begin
      Result := False;
    end;
  end;
end;
```

---

## Testing Checklist

Before distributing your installer:

- [ ] Test on clean Windows 10 VM
- [ ] Test on clean Windows 11 VM
- [ ] Test upgrade from previous version
- [ ] Test uninstall
- [ ] Verify all shortcuts work
- [ ] Test URL protocol handler
- [ ] Check installer size
- [ ] Verify code signature (if signed)
- [ ] Test with antivirus software
- [ ] Test silent installation
- [ ] Verify Add/Remove Programs entry
- [ ] Test with non-admin user
- [ ] Check installer UI on different DPI settings

---

## Troubleshooting

### Installer is flagged by Windows SmartScreen
**Solution:** Sign your installer with a valid code signing certificate

### Installer crashes on start
**Solution:** Check that all file paths in the script are correct and files exist

### Icons don't appear correctly
**Solution:** Ensure BMP files are 24-bit and correct dimensions

### Installer is too large
**Solution:** 
- Use `/SOLID` compression in Inno Setup
- Remove unnecessary files from build output
- Consider using 7-Zip LZMA2 compression

### Language not working
**Solution:** Ensure language files are included and properly referenced

---

## Resources

### Inno Setup
- Documentation: https://jrsoftware.org/ishelp/
- Examples: https://jrsoftware.org/ishelp/index.php?topic=samples
- Forum: https://groups.google.com/g/innosetup

### NSIS
- Documentation: https://nsis.sourceforge.io/Docs/
- Examples: https://nsis.sourceforge.io/Category:Examples
- Wiki: https://nsis.sourceforge.io/Main_Page

### Code Signing
- DigiCert: https://www.digicert.com/signing/code-signing-certificates
- Sectigo: https://sectigo.com/ssl-certificates-tls/code-signing
- SSL.com: https://www.ssl.com/code-signing/

### Tools
- Resource Hacker: http://www.angusj.com/resourcehacker/
- ImageMagick: https://imagemagick.org/
- Inno Setup ISTool: http://www.istool.org/

---

## Example Customization Workflow

1. **Build your app:**
   ```bash
   npm run make
   ```

2. **Customize branding:**
   - Create custom BMP images
   - Update app name and version
   - Modify welcome text

3. **Build installer:**
   ```bash
   cd goida/installer
   npm run build
   ```

4. **Test installer:**
   - Install on clean VM
   - Verify all features
   - Check shortcuts and registry

5. **Sign installer:**
   ```bash
   signtool sign /f cert.pfx /p pass /tr http://timestamp.digicert.com /td SHA256 output/YourApp-Setup.exe
   ```

6. **Distribute:**
   - Upload to GitHub Releases
   - Update download links
   - Announce to users

---

## Need Help?

If you need help customizing the installer:

1. Check the official documentation links above
2. Search existing issues on GitHub
3. Ask in the Inno Setup or NSIS forums
4. Create an issue in the OliveAgent repository

Happy customizing! 🎨
