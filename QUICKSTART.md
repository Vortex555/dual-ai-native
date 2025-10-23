# 🚀 Quick Start - Build Native iOS App

## TL;DR - Three Commands to Build

```bash
cd /Users/bva/Downloads/vs/ai/mistral-ai-native

# Load Node.js
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Login to Expo (first time only)
eas login

# Build it!
eas build --platform ios --profile development
```

**Build time:** ~15-20 minutes  
**Result:** Download link to your .ipa file

---

## Or Use The Interactive Script

```bash
./build-ios.sh
```

Walks you through the whole process!

---

## What You Get

✅ **Native iOS app** with offline AI  
✅ **No admin access needed** (builds in the cloud)  
✅ **Real llama.cpp** integration  
✅ **4GB Mistral 7B** model support  
✅ **100% on-device** inference  

---

## Installation After Build

1. Download the `.ipa` from EAS link
2. Install on iPhone:
   - **Apple Configurator 2** (easiest - free Mac app)
   - **Xcode** → Devices → Add .ipa
   - **ios-deploy** CLI tool

3. Enable Developer Mode on iPhone:
   - Settings → Privacy & Security → Developer Mode → ON

4. Trust the certificate:
   - Settings → General → VPN & Device Management

---

## Files to Read

- `BUILD_READY.md` - Complete summary of what I did
- `EAS_BUILD_GUIDE.md` - Detailed EAS build instructions
- `USAGE.md` - How to use the app

---

## Need Help?

**Build issues?** Check EAS build logs at expo.dev  
**Install issues?** See EAS_BUILD_GUIDE.md troubleshooting  
**App issues?** Check USAGE.md and DEVELOPMENT_HISTORY.md  

---

**You're all set!** 🎉

Run `./build-ios.sh` or the commands above to start building.
