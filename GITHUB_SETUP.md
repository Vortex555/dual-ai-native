# GitHub Setup Instructions

## 📦 Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `mistral-ai-native-mobile` (or your choice)
3. Description: "Dual-mode AI chatbot for iOS - Online via Groq API + Offline via local Mistral 7B"
4. **Keep it Private** (recommended, since API keys might be in history)
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Your Code

After creating the repo, GitHub will show you commands. Use these:

```powershell
cd C:\Users\Daniel\CodeVS\ai\native-mobile

# Add your GitHub repo as remote (replace with YOUR username)
git remote add origin https://github.com/YOUR_USERNAME/mistral-ai-native-mobile.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: On Your Mac

```bash
# Clone the repository
cd ~/Documents
git clone https://github.com/YOUR_USERNAME/mistral-ai-native-mobile.git
cd mistral-ai-native-mobile

# You're ready to build!
```

---

## 🔐 Important Security Notes

### Before Pushing

**Remove any API keys from code!**

Check these files:
- `AIService.js` - Remove any hardcoded keys
- `.env` files - Make sure they're in `.gitignore`

The `.gitignore` is already set up to exclude:
- `.env` files
- Model files (`.gguf`)
- Build artifacts
- API keys

### After Cloning on Mac

You'll need to:
1. Install dependencies: `npm install`
2. Add your Groq API key in the app settings (not in code)
3. Follow BUILD_GUIDE.md for native build

---

## 🚀 Quick Start on Mac

Once cloned:

```bash
# Install dependencies
npm install

# Test in Expo (to verify transfer worked)
npm start

# Build native (for offline AI)
npm install @staltz/react-native-llama --legacy-peer-deps
npx expo prebuild --platform ios
cd ios && pod install && cd ..
npx expo run:ios
```

---

## 📝 Alternative: Manual Transfer

If you don't want to use GitHub:

### On Windows (PowerShell):
```powershell
# Create a zip
Compress-Archive -Path C:\Users\Daniel\CodeVS\ai\native-mobile\* -DestinationPath C:\Users\Daniel\Desktop\mistral-app.zip
```

Then upload `mistral-app.zip` to:
- Google Drive
- Dropbox
- iCloud
- OneDrive

### On Mac:
1. Download the zip
2. Extract it
3. Open Terminal in that folder
4. Run `npm install`
5. Follow BUILD_GUIDE.md

---

## ✅ Verification

After transfer (either method), verify these files exist:
- [ ] App.js
- [ ] AIService.js
- [ ] ModelDownloader.js
- [ ] package.json
- [ ] app.json
- [ ] BUILD_GUIDE.md
- [ ] README.md
- [ ] USAGE.md

If all present, you're good to go!

---

## 🆘 Troubleshooting

**"git: command not found" on Mac**
```bash
xcode-select --install
```

**GitHub authentication issues**
- Use Personal Access Token instead of password
- Or use GitHub Desktop app
- Or use SSH keys

**"npm: command not found" on Mac**
```bash
brew install node
```

---

## 📱 Next Steps

1. ✅ Transfer project to Mac (GitHub or zip)
2. ✅ Verify all files present
3. ✅ Run `npm install`
4. ✅ Test with `npm start`
5. ✅ Follow BUILD_GUIDE.md for native build
6. 🎉 Enjoy your native AI app!

---

**Need help?** Check BUILD_GUIDE.md for detailed instructions!
