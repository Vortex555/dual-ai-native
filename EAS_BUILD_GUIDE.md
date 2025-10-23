# EAS Build Guide - Native iOS Build Without Admin Access

## 🎯 Overview
Since you don't have admin access to install CocoaPods locally, we'll use **EAS Build** (Expo Application Services) to build your iOS app in the cloud. This handles all native compilation, CocoaPods, and dependencies automatically!

## ✅ What You Have
- ✅ Node.js v22.21.0 (via nvm)
- ✅ npm 10.9.4
- ✅ Xcode command-line tools
- ✅ EAS CLI installed
- ✅ Project ready for native build

## 🚀 Step-by-Step Build Process

### Step 1: Install React Native LLM Library

Choose one of these libraries (I recommend llama.rn as it's actively maintained):

**Option A: llama.rn (Recommended)**
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
npm install llama.rn --legacy-peer-deps
```

**Option B: @staltz/react-native-llama**
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
npm install @staltz/react-native-llama --legacy-peer-deps
```

### Step 2: Create Expo Account (if you don't have one)

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
eas login
```

If you don't have an account, sign up at https://expo.dev/signup (it's free!)

### Step 3: Configure Your Project

Run this to link your project to EAS:
```bash
eas build:configure
```

It will:
- Ask which platforms (select **iOS**)
- Create/update `eas.json` configuration
- Set up your project ID

### Step 4: Update Bundle Identifier

Open `app.json` and make your bundle ID unique:
```json
{
  "expo": {
    ...
    "ios": {
      "bundleIdentifier": "com.yourname.mistralai"
    }
  }
}
```

### Step 5: Build in the Cloud! 🎉

```bash
eas build --platform ios --profile development
```

This will:
- Upload your project to EAS servers
- Install all dependencies (including CocoaPods)
- Compile native code with llama.cpp
- Build the .ipa file
- Give you a download link

**Build time:** ~15-20 minutes

### Step 6: Download & Install

Once the build completes:

1. **Download the .ipa** from the link EAS provides
2. **Install on iPhone:**
   - **Option A**: Use Apple Configurator 2 (free Mac app)
   - **Option B**: Use Xcode → Window → Devices and Simulators → drag .ipa
   - **Option C**: Use `ios-deploy` CLI tool

### Step 7: Test Offline AI

1. Open the app on your iPhone
2. Download the 4GB model (one-time)
3. Switch to Offline Mode in settings
4. Chat with the AI completely offline!

## 📱 Installing on iPhone

### Method 1: Apple Configurator 2 (Easiest)
1. Download Apple Configurator 2 from Mac App Store
2. Connect iPhone via USB
3. Drag the .ipa file onto your device
4. Trust the developer certificate on iPhone

### Method 2: Xcode Devices
1. Open Xcode → Window → Devices and Simulators
2. Select your iPhone
3. Click the "+" button under "Installed Apps"
4. Select the downloaded .ipa file

### Method 3: ios-deploy CLI
```bash
npm install -g ios-deploy
ios-deploy --bundle path/to/your-app.ipa
```

## 🔧 Troubleshooting

### "No valid code signing identity found"
- EAS Build requires an Apple Developer account ($99/year)
- **Workaround**: Use `--profile preview` for ad-hoc distribution
- Or use `--profile development` for simulator builds

### "Build failed on EAS"
- Check the build logs on https://expo.dev/accounts/[username]/projects/[project]/builds
- Common issues:
  - Native module compatibility → check package versions
  - Missing config plugins → add to `app.json`

### "App won't install on iPhone"
- Make sure Developer Mode is enabled (Settings → Privacy & Security → Developer Mode)
- Trust the certificate (Settings → General → VPN & Device Management)

## 💰 EAS Build Pricing

- **Free tier**: 30 builds/month for personal projects
- **Production**: $29/month for unlimited builds
- Perfect for development and testing!

## 🎯 Build Profiles Explained

### `development`
- Includes dev tools and debugging
- Larger app size
- Best for testing

### `preview`
- Production-like build
- Smaller size
- Ad-hoc distribution

### `production`
- Optimized for App Store
- Smallest size
- Requires Apple Developer account

## 📝 Next Build Commands

After initial setup, building is simple:

```bash
# Development build (includes debugging)
eas build --platform ios --profile development

# Preview build (production-like, ad-hoc)
eas build --platform ios --profile preview

# Production build (for App Store)
eas build --platform ios --profile production
```

## 🆘 Common Issues & Solutions

### Issue: "eas: command not found"
Solution:
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
npm install -g eas-cli
```

### Issue: Native module not found
Solution: Add config plugin to `app.json`:
```json
{
  "expo": {
    "plugins": [
      ["llama.rn", {}]
    ]
  }
}
```

### Issue: Build takes too long
- First builds take longer (~20 min)
- Subsequent builds are cached (~5-10 min)
- Use `--profile preview` for faster builds

## ✅ Success Checklist

- [ ] eas-cli installed
- [ ] Logged into Expo account
- [ ] Project configured with `eas build:configure`
- [ ] Bundle ID updated in app.json
- [ ] llama.rn or react-native-llama installed
- [ ] Build started with `eas build --platform ios`
- [ ] Build completed successfully
- [ ] .ipa downloaded
- [ ] App installed on iPhone
- [ ] Offline AI tested and working

## 🎉 Advantages of EAS Build

✅ **No local setup needed** - Works without CocoaPods/Homebrew
✅ **Cloud-powered** - Fast, reliable builds
✅ **Consistent environment** - Same build every time
✅ **Easy CI/CD** - Integrate with GitHub Actions
✅ **Team friendly** - Anyone can trigger builds
✅ **Cache support** - Faster subsequent builds

---

**You're all set!** Run the commands above and you'll have a native iOS app with offline AI in ~20 minutes. No admin access required! 🚀
