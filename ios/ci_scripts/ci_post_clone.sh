#!/bin/sh

# Xcode Cloud Post-Clone Script
# This script runs after Xcode Cloud clones your repository
# It installs CocoaPods dependencies before building

set -e

echo "🚀 Xcode Cloud Post-Clone Script Started"
echo "========================================"

# Navigate to iOS directory
cd "$CI_PRIMARY_REPOSITORY_PATH/ios"

echo "📦 Installing CocoaPods dependencies..."

# Check if CocoaPods is installed
if ! command -v pod &> /dev/null; then
    echo "⚠️  CocoaPods not found, installing..."
    sudo gem install cocoapods
else
    echo "✅ CocoaPods already installed: $(pod --version)"
fi

# Install pods
echo "Running pod install..."
pod install --repo-update

echo "✅ CocoaPods installation complete!"
echo "========================================"
