#!/bin/bash
# OliveAgent Installer Build Script for Linux/macOS using Wine + Inno Setup

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

echo -e "${CYAN}=====================================${NC}"
echo -e "${CYAN} OliveAgent Installer Builder${NC}"
echo -e "${CYAN}=====================================${NC}"
echo ""

# Check if Wine is installed
if ! command -v wine &> /dev/null; then
    echo -e "${RED}ERROR: Wine is not installed${NC}"
    echo -e "${YELLOW}Install Wine to compile Inno Setup scripts on Linux/macOS:${NC}"
    echo -e "${GRAY}  Ubuntu/Debian: sudo apt install wine wine64${NC}"
    echo -e "${GRAY}  macOS: brew install wine-stable${NC}"
    exit 1
fi

# Check if Inno Setup is installed via Wine
INNO_SETUP_PATH="$HOME/.wine/drive_c/Program Files (x86)/Inno Setup 6/ISCC.exe"
if [ ! -f "$INNO_SETUP_PATH" ]; then
    echo -e "${RED}ERROR: Inno Setup not found in Wine${NC}"
    echo -e "${YELLOW}Install Inno Setup in Wine:${NC}"
    echo -e "${GRAY}  1. Download from: https://jrsoftware.org/isdl.php${NC}"
    echo -e "${GRAY}  2. Run: wine innosetup-installer.exe${NC}"
    exit 1
fi

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

echo -e "${GRAY}Script Directory: $SCRIPT_DIR${NC}"
echo -e "${GRAY}Project Root: $PROJECT_ROOT${NC}"
echo ""

# Parse arguments
SKIP_BUILD=false
for arg in "$@"; do
    case $arg in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
    esac
done

# Step 1: Build Electron app (unless skipped)
if [ "$SKIP_BUILD" = false ]; then
    echo -e "${YELLOW}[1/3] Building Electron application...${NC}"
    cd "$PROJECT_ROOT"
    
    npm run clean
    npm run make
    
    echo -e "${GREEN}✓ Build completed successfully${NC}"
    echo ""
else
    echo -e "${YELLOW}[1/3] Skipping Electron build (using existing build)${NC}"
    echo ""
fi

# Step 2: Verify build output
echo -e "${YELLOW}[2/3] Verifying build output...${NC}"
BUILD_OUTPUT="$PROJECT_ROOT/out/OliveAgent-win32-x64"

if [ ! -d "$BUILD_OUTPUT" ]; then
    echo -e "${RED}✗ Build output not found at: $BUILD_OUTPUT${NC}"
    echo -e "${YELLOW}Please run 'npm run make' first${NC}"
    exit 1
fi

if [ ! -f "$BUILD_OUTPUT/OliveAgent.exe" ]; then
    echo -e "${RED}✗ OliveAgent.exe not found in build output${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build output verified${NC}"
echo ""

# Step 3: Build installer with Inno Setup via Wine
echo -e "${YELLOW}[3/3] Building installer with Inno Setup...${NC}"
ISS_FILE="$SCRIPT_DIR/oliveagent-setup.iss"

if [ ! -f "$ISS_FILE" ]; then
    echo -e "${RED}✗ Installer script not found: $ISS_FILE${NC}"
    exit 1
fi

# Convert path for Wine
ISS_FILE_WIN=$(winepath -w "$ISS_FILE" 2>/dev/null || echo "$ISS_FILE")

wine "$INNO_SETUP_PATH" "$ISS_FILE_WIN"

echo -e "${GREEN}✓ Installer created successfully${NC}"
echo ""

# Summary
echo -e "${CYAN}=====================================${NC}"
echo -e "${GREEN} Build Complete!${NC}"
echo -e "${CYAN}=====================================${NC}"
echo ""

OUTPUT_DIR="$SCRIPT_DIR/output"
if [ -d "$OUTPUT_DIR" ]; then
    echo -e "${NC}Installer(s) created:${NC}"
    for installer in "$OUTPUT_DIR"/*.exe; do
        if [ -f "$installer" ]; then
            SIZE=$(du -h "$installer" | cut -f1)
            echo -e "  ${CYAN}• $(basename "$installer") ($SIZE)${NC}"
            echo -e "    ${GRAY}$installer${NC}"
        fi
    done
fi

echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "${GRAY}  1. Test the installer on a Windows VM${NC}"
echo -e "${GRAY}  2. Verify all features work correctly${NC}"
echo -e "${GRAY}  3. Sign the installer (on Windows)${NC}"
echo -e "${GRAY}  4. Upload to your distribution platform${NC}"
echo ""
