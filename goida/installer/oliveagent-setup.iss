; OliveAgent Windows Installer Script
; Inno Setup 6.x required
; https://jrsoftware.org/isinfo.php

#define MyAppName "OliveAgent"
#define MyAppVersion "0.28.0"
#define MyAppPublisher "OliveAgent Team"
#define MyAppURL "https://github.com/oliveagent-sh/oliveagent"
#define MyAppExeName "OliveAgent.exe"
#define MyAppProtocol "oliveagent"

[Setup]
; Application Info
AppId={{8B4A9C2F-6D3E-4A1B-9F2C-7E8D6B5A4C3D}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/issues
AppUpdatesURL={#MyAppURL}/releases
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
LicenseFile=..\..\LICENSE
InfoBeforeFile=info.txt
OutputDir=output
OutputBaseFilename=OliveAgent-Setup-{#MyAppVersion}
SetupIconFile=..\..\assets\icon\logo.ico
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
UsePreviousAppDir=yes
SetupLogging=yes
AppMutex={#MyAppName}Mutex
CloseApplications=yes
CloseApplicationsFilter={#MyAppExeName}

; Modern UI
WizardImageFile=compiler:WizModernImage-IS.bmp
WizardSmallImageFile=compiler:WizModernSmallImage.bmp
DisableProgramGroupPage=yes
DisableWelcomePage=no

; Uninstall
UninstallDisplayIcon={app}\{#MyAppExeName}
UninstallDisplayName={#MyAppName}

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "russian"; MessagesFile: "compiler:Languages\Russian.isl"
Name: "german"; MessagesFile: "compiler:Languages\German.isl"
Name: "french"; MessagesFile: "compiler:Languages\French.isl"
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "italian"; MessagesFile: "compiler:Languages\Italian.isl"
Name: "japanese"; MessagesFile: "compiler:Languages\Japanese.isl"
Name: "portuguese"; MessagesFile: "compiler:Languages\Portuguese.isl"
Name: "chinese"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode
Name: "associateprotocol"; Description: "Register {#MyAppProtocol}:// URL protocol"; GroupDescription: "Integration:"; Flags: unchecked

[Files]
; Main application files - adjust path to your build output
Source: "..\..\out\OliveAgent-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: If using electron-forge, the path might be different. Check your build output directory.

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Registry]
; Register URL protocol handler
Root: HKA; Subkey: "Software\Classes\{#MyAppProtocol}"; ValueType: string; ValueName: ""; ValueData: "URL:{#MyAppName} Protocol"; Flags: uninsdeletekey; Tasks: associateprotocol
Root: HKA; Subkey: "Software\Classes\{#MyAppProtocol}"; ValueType: string; ValueName: "URL Protocol"; ValueData: ""; Tasks: associateprotocol
Root: HKA; Subkey: "Software\Classes\{#MyAppProtocol}\DefaultIcon"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName},0"; Tasks: associateprotocol
Root: HKA; Subkey: "Software\Classes\{#MyAppProtocol}\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""; Tasks: associateprotocol

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
