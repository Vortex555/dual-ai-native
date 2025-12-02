# 🤖 Dual AI Native

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB.svg)
![Expo](https://img.shields.io/badge/Expo-54.0.0-000020.svg)
![License](https://img.shields.io/badge/license-MIT%20%2B%20Commons%20Clause-orange.svg)

**A powerful dual-mode AI assistant that works both online and offline**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Building](#-building) • [Architecture](#-architecture)

</div>

---

## 📖 Overview

**Dual AI Native** is a cross-platform mobile application that provides AI-powered chat capabilities with a unique dual-mode approach:

- 🌐 **Online Mode**: Lightning-fast responses using Groq's API with Llama 3.1 models
- 📴 **Offline Mode**: Complete privacy with local AI inference using Dolphin X1 8B model
- 🔄 **Seamless Switching**: Toggle between modes based on your needs
- 💬 **Chat Management**: Multiple conversation sessions with full history
- ⚡ **Performance Modes**: Fast, Balanced, and Uncensored settings

---

## ✨ Features

### 🎯 Core Capabilities

| Feature | Description |
|---------|-------------|
| **Dual Mode Operation** | Switch between cloud-based and on-device AI |
| **Smart Streaming** | Real-time response streaming with stop functionality |
| **Session Management** | Create, save, and manage multiple chat sessions |
| **Performance Tuning** | Three optimization levels for different use cases |
| **Download Manager** | Robust model downloading with pause/resume |
| **Auto-Initialization** | Intelligent model loading on app start |
| **Storage Optimization** | Efficient caching and memory management |

### 🌐 Online Mode

- **Provider**: Groq API
- **Models**: Llama 3.1 70B & 8B
- **Speed**: ~500 tokens/second
- **Cost**: Free tier available
- **Requirements**: Internet connection + API key

### 📴 Offline Mode

- **Model**: Dolphin X1 8B (Uncensored)
- **Size**: 4.92 GB (Q4 quantization)
- **Engine**: llama.rn with GPU acceleration
- **Privacy**: 100% on-device processing
- **Requirements**: 6+ GB free storage

---

## 🚀 Quick Start

### Prerequisites

- **iOS**: 14.0+ or **Android**: 8.0+
- **Development**: Node.js 16+, Expo CLI
- **Storage**: 8 GB free space (for offline mode)
- **Optional**: Groq API key (for online mode)

### Installation

```bash
# Clone the repository
git clone https://github.com/Vortex555/mistral-ai-native.git
cd mistral-ai-native

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

---

## 📱 Usage

### First Launch

1. **Choose Your Mode**
   - Online: Enter your Groq API key (get one free at [console.groq.com](https://console.groq.com))
   - Offline: Download the 4.92 GB AI model (one-time setup)

2. **Start Chatting**
   - Type your message in the input field
   - Responses stream in real-time
   - Use the stop button to halt generation

### Switching Modes

```
Settings → AI Mode → Toggle Online/Offline
```

**Online Mode Benefits:**
- ✅ Faster responses
- ✅ No storage required
- ✅ Always up-to-date models

**Offline Mode Benefits:**
- ✅ Complete privacy
- ✅ Works without internet
- ✅ No API costs

### Performance Modes

| Mode | Speed | Quality | Context | Best For |
|------|-------|---------|---------|----------|
| **Fast** | ⚡⚡⚡ | Good | 512 tokens | Quick questions |
| **Balanced** | ⚡⚡ | Great | 1024 tokens | General chat |
| **Uncensored** | ⚡ | Best | 1536 tokens | Complex tasks |

---

## 🏗️ Building for Production

### iOS Build

#### Option 1: Xcode (Local)

```bash
# Generate native iOS project
npx expo prebuild --platform ios

# Open in Xcode
open ios/DualAINative.xcworkspace

# Build & Archive
# Product → Archive → Distribute App
```

#### Option 2: EAS Build (Cloud)

```bash
# Login to Expo
npx eas-cli login

# Build for iOS
npx eas-cli build --platform ios --profile production

# Or use the helper script
./build-ios.sh
```

### Android Build

```bash
# Build for Android
npx eas-cli build --platform android --profile production

# Or run locally
npm run android:build
```

### Build Profiles

| Profile | Type | Use Case |
|---------|------|----------|
| **development** | Debug | Testing with hot reload |
| **preview** | Release | Beta testing |
| **production** | Release | App Store submission |

---

## 🛠️ Architecture

### Project Structure

```
mistral-ai-native/
├── App.js                  # Main application component
├── AIService.js            # AI inference service (online/offline)
├── ModelDownloader.js      # Model download manager
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── eas.json                # Build configuration
├── build-ios.sh            # iOS build helper script
└── ios/                    # Native iOS project (generated)
    ├── DualAINative.xcworkspace
    └── Podfile
```

### Tech Stack

**Frontend:**
- React Native 0.81.5
- Expo 54.0.0
- React 19.1.0

**AI Engines:**
- llama.rn 0.8.0-rc.4 (offline)
- Groq API (online)
- Axios 1.12.2

**Storage:**
- AsyncStorage (settings)
- FileSystem (models)
- Chat history persistence

**UI Components:**
- Expo Vector Icons
- Linear Gradient
- Safe Area Context

### Data Flow

```
User Input → AIService
              ├─ Online Mode → Groq API → Stream Response
              └─ Offline Mode → llama.rn → Generate Response
                                    ↓
                            Update UI (Streaming)
                                    ↓
                            Save to AsyncStorage
```

---

## 🔧 Configuration

### Environment Setup

Create a `.env` file (optional):

```bash
GROQ_API_KEY=your_api_key_here
DEFAULT_MODE=online
```

### App Configuration

Edit `app.json` to customize:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "2.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.app"
    }
  }
}
```

### Model Configuration

In `ModelDownloader.js`, update model URLs:

```javascript
static MODEL_URLS = {
  primary: 'https://your-model-url.gguf',
  mirror1: 'https://backup-url.gguf'
};
```

---

## 🎨 Features Deep Dive

### Chat Session Management

- **Create Sessions**: Start fresh conversations
- **Switch Sessions**: Jump between different chats
- **Delete Sessions**: Remove unwanted history
- **Auto-Save**: Conversations persist automatically

### Download System

- **Resume Support**: Pause and resume large downloads
- **Progress Tracking**: Real-time speed and ETA
- **Space Verification**: Checks available storage
- **Mirror Fallback**: Alternative sources if primary fails

### Model Loading

```javascript
// Smart auto-initialization
- Checks for existing model on startup
- Loads model if user was in offline mode
- Falls back to online mode if loading fails
- Shows initialization status
```

---

## 📊 Performance

### Benchmarks

**Online Mode (Groq API):**
- Response latency: ~200-500ms
- Streaming speed: ~500 tokens/sec
- Model: Llama 3.1 70B

**Offline Mode (Dolphin X1 8B):**
- Initialization: ~3-5 seconds
- Generation speed: ~10-30 tokens/sec (device dependent)
- Memory usage: ~2-4 GB RAM

### Optimization Tips

1. **Fast Mode**: Use for simple questions
2. **Clear History**: Remove old sessions to save space
3. **GPU Acceleration**: Enabled by default on iOS/Android
4. **Context Limits**: Adjust based on device capability

---

## 🔐 Privacy & Security

- ✅ **Offline Mode**: Zero data leaves your device
- ✅ **API Keys**: Stored locally using AsyncStorage
- ✅ **No Tracking**: No analytics or telemetry
- ✅ **Chat History**: Encrypted at rest
- ✅ **Model Files**: Downloaded over HTTPS

---

## 🐛 Troubleshooting

### Common Issues

**"Model failed to load"**
```bash
# Solution: Re-download the model
Settings → Download Model → Delete and re-download
```

**"Out of memory"**
```bash
# Solution: Switch to Fast mode
Settings → Performance Mode → Fast
```

**"API key invalid"**
```bash
# Solution: Get a new key from Groq
https://console.groq.com → Create API Key
```

**Metro bundler not connecting**
```bash
# Solution: Restart the dev server
npm start -- --clear
```

### Build Issues

**Xcode: "Pod install failed"**
```bash
cd ios
pod deintegrate
pod install
```

**EAS Build fails**
```bash
# Clear cache and retry
eas build --platform ios --clear-cache
```

---

## 📚 Documentation

- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Detailed build instructions
- [EAS_BUILD_GUIDE.md](./EAS_BUILD_GUIDE.md) - Cloud build setup
- [USAGE.md](./USAGE.md) - User guide
- [DEVELOPMENT_HISTORY.md](./DEVELOPMENT_HISTORY.md) - Project history

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License with Commons Clause** - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ You can view, modify, and use the code for personal/educational purposes
- ✅ Internal business use is permitted
- ❌ You cannot sell this software or create competing App Store apps
- ❌ Commercial SaaS offerings are not permitted without permission

For commercial licensing inquiries, please contact: daniel@vortex55.com

---

## 🙏 Acknowledgments

- **Groq** - For providing fast inference API
- **Cognitive Computations** - For the Dolphin X1 model
- **llama.cpp** - For the inference engine
- **Expo** - For the amazing development framework
- **React Native** - For cross-platform capabilities

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Vortex555/mistral-ai-native/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Vortex555/mistral-ai-native/discussions)
- **Email**: daniel@vortex55.com

---

## 🗺️ Roadmap

- [ ] Multi-model support
- [ ] Voice input/output
- [ ] Image generation
- [ ] Custom model training
- [ ] Cloud sync (optional)
- [ ] Desktop version
- [ ] Plugin system

---

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

---

<div align="center">

**Made by the Dual AI Native Team aka One 15 Year Old**

</div>
