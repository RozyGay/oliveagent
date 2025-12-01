; OliveAgent NSIS Installer Script
; Alternative to Inno Setup - provides modern UI with custom pages
; Requires NSIS 3.x: https://nsis.sourceforge.io/Download

;--------------------------------
; Includes

!include "MUI2.nsh"
!include "FileFunc.nsh"
!include "x64.nsh"

;--------------------------------
; General

; Name and file
Name "OliveAgent"
OutFile "output\OliveAgent-Setup-0.28.0.exe"

; Default installation folder
InstallDir "$LOCALAPPDATA\OliveAgent"

; Get installation folder from registry if available
InstallDirRegKey HKCU "Software\OliveAgent" ""

; Request application privileges
RequestExecutionLevel user

; Compression
SetCompressor /SOLID lzma

; Version Information
VIProductVersion "0.28.0.0"
VIAddVersionKey "ProductName" "OliveAgent"
VIAddVersionKey "CompanyName" "OliveAgent Team"
VIAddVersionKey "LegalCopyright" "MIT License"
VIAddVersionKey "FileDescription" "OliveAgent Setup"
VIAddVersionKey "FileVersion" "0.28.0"

;--------------------------------
; Modern UI Configuration

!define MUI_ABORTWARNING
!define MUI_ICON "..\..\assets\icon\logo.ico"
!define MUI_UNICON "..\..\assets\icon\logo.ico"

; Welcome page
!define MUI_WELCOMEPAGE_TITLE "Welcome to OliveAgent Setup"
!define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the installation of OliveAgent.$\r$\n$\r$\nOliveAgent is a free, local, open-source AI app builder.$\r$\n$\r$\nClick Next to continue."

; Finish page
!define MUI_FINISHPAGE_RUN "$INSTDIR\OliveAgent.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Launch OliveAgent"
!define MUI_FINISHPAGE_LINK "Visit the OliveAgent website"
!define MUI_FINISHPAGE_LINK_LOCATION "https://github.com/oliveagent-sh/oliveagent"

;--------------------------------
; Pages

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "..\..\LICENSE"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

;--------------------------------
; Languages

!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "Russian"
!insertmacro MUI_LANGUAGE "German"
!insertmacro MUI_LANGUAGE "French"
!insertmacro MUI_LANGUAGE "Spanish"
!insertmacro MUI_LANGUAGE "Italian"
!insertmacro MUI_LANGUAGE "Japanese"
!insertmacro MUI_LANGUAGE "Portuguese"
!insertmacro MUI_LANGUAGE "SimpChinese"

;--------------------------------
; Installer Sections

Section "Install" SecMain

  SetOutPath "$INSTDIR"
  
  ; Kill running processes
  DetailPrint "Checking for running instances..."
  nsExec::ExecToStack 'tasklist /FI "IMAGENAME eq OliveAgent.exe" 2>NUL | find /I /N "OliveAgent.exe">NUL'
  Pop $0
  ${If} $0 == 0
    MessageBox MB_OKCANCEL|MB_ICONEXCLAMATION \
      "OliveAgent is currently running. Please close it before continuing.$\r$\n$\r$\nClick OK to automatically close it or Cancel to abort installation." \
      /SD IDOK \
      IDOK kill_process
    Abort
    kill_process:
    DetailPrint "Closing OliveAgent..."
    nsExec::Exec 'taskkill /F /IM OliveAgent.exe'
    Sleep 1000
  ${EndIf}
  
  ; Copy files
  DetailPrint "Installing application files..."
  File /r "..\..\out\OliveAgent-win32-x64\*.*"
  
  ; Store installation folder
  WriteRegStr HKCU "Software\OliveAgent" "" $INSTDIR
  
  ; Create uninstaller
  WriteUninstaller "$INSTDIR\Uninstall.exe"
  
  ; Create shortcuts
  CreateDirectory "$SMPROGRAMS\OliveAgent"
  CreateShortCut "$SMPROGRAMS\OliveAgent\OliveAgent.lnk" "$INSTDIR\OliveAgent.exe"
  CreateShortCut "$SMPROGRAMS\OliveAgent\Uninstall.lnk" "$INSTDIR\Uninstall.exe"
  CreateShortCut "$DESKTOP\OliveAgent.lnk" "$INSTDIR\OliveAgent.exe"
  
  ; Register URL protocol
  DetailPrint "Registering URL protocol handler..."
  WriteRegStr HKCU "Software\Classes\oliveagent" "" "URL:OliveAgent Protocol"
  WriteRegStr HKCU "Software\Classes\oliveagent" "URL Protocol" ""
  WriteRegStr HKCU "Software\Classes\oliveagent\DefaultIcon" "" "$INSTDIR\OliveAgent.exe,0"
  WriteRegStr HKCU "Software\Classes\oliveagent\shell\open\command" "" '"$INSTDIR\OliveAgent.exe" "%1"'
  
  ; Add to Add/Remove Programs
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent" \
    "DisplayName" "OliveAgent"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent" \
    "UninstallString" "$\"$INSTDIR\Uninstall.exe$\""
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent" \
    "DisplayIcon" "$INSTDIR\OliveAgent.exe"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent" \
    "Publisher" "OliveAgent Team"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent" \
    "DisplayVersion" "0.28.0"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent" \
    "URLInfoAbout" "https://github.com/oliveagent-sh/oliveagent"
  
  ${GetSize} "$INSTDIR" "/S=0K" $0 $1 $2
  IntFmt $0 "0x%08X" $0
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent" \
    "EstimatedSize" "$0"
  
SectionEnd

;--------------------------------
; Uninstaller Section

Section "Uninstall"

  ; Kill running processes
  nsExec::Exec 'taskkill /F /IM OliveAgent.exe 2>NUL'
  Sleep 500
  
  ; Remove files and folders
  Delete "$INSTDIR\Uninstall.exe"
  RMDir /r "$INSTDIR"
  
  ; Remove shortcuts
  Delete "$DESKTOP\OliveAgent.lnk"
  Delete "$SMPROGRAMS\OliveAgent\OliveAgent.lnk"
  Delete "$SMPROGRAMS\OliveAgent\Uninstall.lnk"
  RMDir "$SMPROGRAMS\OliveAgent"
  
  ; Remove registry keys
  DeleteRegKey HKCU "Software\OliveAgent"
  DeleteRegKey HKCU "Software\Classes\oliveagent"
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\OliveAgent"

SectionEnd
