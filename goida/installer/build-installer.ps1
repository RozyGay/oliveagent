# OliveAgent Installer Build Script
# PowerShell script to automate installer creation

param(
    [string]$InnoSetupPath = "C:\Program Files (x86)\Inno Setup 6\ISCC.exe",
    [switch]$SkipBuild,
    [switch]$Sign,
    [string]$CertPath,
    [string]$CertPassword
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host " OliveAgent Installer Builder" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Inno Setup is installed
if (-not (Test-Path $InnoSetupPath)) {
    Write-Host "ERROR: Inno Setup not found at: $InnoSetupPath" -ForegroundColor Red
    Write-Host "Please install Inno Setup 6.x from: https://jrsoftware.org/isdl.php" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or specify the correct path with -InnoSetupPath parameter" -ForegroundColor Yellow
    exit 1
}

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $ScriptDir)

Write-Host "Script Directory: $ScriptDir" -ForegroundColor Gray
Write-Host "Project Root: $ProjectRoot" -ForegroundColor Gray
Write-Host ""

# Step 1: Build Electron app (unless skipped)
if (-not $SkipBuild) {
    Write-Host "[1/3] Building Electron application..." -ForegroundColor Yellow
    Push-Location $ProjectRoot
    
    try {
        npm run clean
        npm run make
        Write-Host "✓ Build completed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Build failed: $_" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    
    Pop-Location
    Write-Host ""
} else {
    Write-Host "[1/3] Skipping Electron build (using existing build)" -ForegroundColor Yellow
    Write-Host ""
}

# Step 2: Verify build output
Write-Host "[2/3] Verifying build output..." -ForegroundColor Yellow
$BuildOutput = Join-Path $ProjectRoot "out\OliveAgent-win32-x64"

if (-not (Test-Path $BuildOutput)) {
    Write-Host "✗ Build output not found at: $BuildOutput" -ForegroundColor Red
    Write-Host "Please run 'npm run make' first or check the output directory" -ForegroundColor Yellow
    exit 1
}

$ExePath = Join-Path $BuildOutput "OliveAgent.exe"
if (-not (Test-Path $ExePath)) {
    Write-Host "✗ OliveAgent.exe not found in build output" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Build output verified" -ForegroundColor Green
Write-Host ""

# Step 3: Build installer with Inno Setup
Write-Host "[3/3] Building installer with Inno Setup..." -ForegroundColor Yellow
$IssFile = Join-Path $ScriptDir "oliveagent-setup.iss"

if (-not (Test-Path $IssFile)) {
    Write-Host "✗ Installer script not found: $IssFile" -ForegroundColor Red
    exit 1
}

try {
    & $InnoSetupPath $IssFile
    if ($LASTEXITCODE -ne 0) {
        throw "Inno Setup compiler failed with exit code: $LASTEXITCODE"
    }
    Write-Host "✓ Installer created successfully" -ForegroundColor Green
}
catch {
    Write-Host "✗ Installer build failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Sign installer (if requested)
if ($Sign) {
    Write-Host "[OPTIONAL] Signing installer..." -ForegroundColor Yellow
    
    if (-not $CertPath) {
        Write-Host "✗ Certificate path not specified (-CertPath)" -ForegroundColor Red
        exit 1
    }
    
    if (-not (Test-Path $CertPath)) {
        Write-Host "✗ Certificate not found: $CertPath" -ForegroundColor Red
        exit 1
    }
    
    $OutputDir = Join-Path $ScriptDir "output"
    $Installers = Get-ChildItem -Path $OutputDir -Filter "*.exe"
    
    foreach ($Installer in $Installers) {
        Write-Host "Signing: $($Installer.Name)" -ForegroundColor Gray
        
        $SignArgs = @(
            "sign",
            "/f", $CertPath,
            "/tr", "http://timestamp.digicert.com",
            "/td", "SHA256",
            "/fd", "SHA256"
        )
        
        if ($CertPassword) {
            $SignArgs += "/p", $CertPassword
        }
        
        $SignArgs += $Installer.FullName
        
        try {
            & signtool.exe $SignArgs
            if ($LASTEXITCODE -ne 0) {
                throw "Signing failed with exit code: $LASTEXITCODE"
            }
            Write-Host "✓ Signed: $($Installer.Name)" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Signing failed: $_" -ForegroundColor Red
            exit 1
        }
    }
    
    Write-Host ""
}

# Summary
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host " Build Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$OutputDir = Join-Path $ScriptDir "output"
$Installers = Get-ChildItem -Path $OutputDir -Filter "*.exe"

Write-Host "Installer(s) created:" -ForegroundColor White
foreach ($Installer in $Installers) {
    $SizeMB = [math]::Round($Installer.Length / 1MB, 2)
    Write-Host "  • $($Installer.Name) ($SizeMB MB)" -ForegroundColor Cyan
    Write-Host "    $($Installer.FullName)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Test the installer on a clean Windows VM" -ForegroundColor Gray
Write-Host "  2. Verify all features work correctly" -ForegroundColor Gray
Write-Host "  3. Sign the installer if not already done" -ForegroundColor Gray
Write-Host "  4. Upload to your distribution platform" -ForegroundColor Gray
Write-Host ""
