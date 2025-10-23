#!/bin/bash

# Mistral AI Native - EAS Build Script
# Run this to build your native iOS app without CocoaPods/admin access!

set -e

echo "🚀 Mistral AI Native - EAS Build Process"
echo "========================================"
echo ""

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "✅ Node.js: $(node -v)"
echo "✅ npm: $(npm -v)"
echo "✅ EAS CLI installed"
echo ""

# Step 1: Check login status
echo "📋 Step 1: Checking Expo account..."
if eas whoami > /dev/null 2>&1; then
    echo "✅ Already logged in as: $(eas whoami)"
else
    echo "❌ Not logged in"
    echo ""
    echo "Please run: eas login"
    echo "Or create an account at: https://expo.dev/signup"
    echo ""
    read -p "Press Enter after logging in..."
    eas whoami
fi
echo ""

# Step 2: Configure project
echo "📋 Step 2: Configuring EAS Build..."
if [ ! -f "eas.json" ]; then
    echo "Running eas build:configure..."
    eas build:configure
else
    echo "✅ eas.json already exists"
fi
echo ""

# Step 3: Show configuration
echo "📋 Step 3: Current Configuration"
echo "Bundle ID: $(grep -A 2 'ios' app.json | grep bundleIdentifier | cut -d '"' -f 4)"
echo "App Name: $(grep 'name' app.json | head -1 | cut -d '"' -f 4)"
echo ""

# Step 4: Build options
echo "📋 Step 4: Ready to build!"
echo ""
echo "Choose a build profile:"
echo "  1. development (includes debugging, best for testing)"
echo "  2. preview (production-like, smaller size)"
echo "  3. production (for App Store submission)"
echo ""
read -p "Enter choice (1-3) or 'q' to quit: " choice

case $choice in
    1)
        echo ""
        echo "🔨 Building development version..."
        eas build --platform ios --profile development
        ;;
    2)
        echo ""
        echo "🔨 Building preview version..."
        eas build --platform ios --profile preview
        ;;
    3)
        echo ""
        echo "🔨 Building production version..."
        eas build --platform ios --profile production
        ;;
    q|Q)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice. Run script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Build started!"
echo ""
echo "📱 Next steps:"
echo "  1. Wait for build to complete (~15-20 min)"
echo "  2. Download the .ipa file from the link provided"
echo "  3. Install on iPhone using:"
echo "     • Apple Configurator 2 (recommended)"
echo "     • Xcode → Devices and Simulators"
echo "     • ios-deploy CLI"
echo ""
echo "📖 See EAS_BUILD_GUIDE.md for detailed instructions"
echo ""
