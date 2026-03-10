# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native mobile AI chatbot ("Dual AI Native") with two inference modes:
- **Online**: Groq API with Llama 3.3 70B
- **Offline**: On-device inference via `llama.rn` (llama.cpp) with Dolphin X1 8B (Q4_K_M GGUF, ~4.92GB)

Built with Expo SDK 54 + React Native 0.81 + React 19. Targets iOS and Android.

## Build & Development Commands

```bash
npm start              # Start Expo dev server
npm run ios            # Run on iOS (Expo Go - online mode only)
npm run android        # Run on Android
npm run prebuild       # Generate native iOS/Android project files

# EAS cloud builds (requires eas-cli + Expo account)
npm run ios:build      # eas build --platform ios
npm run android:build  # eas build --platform android
```

No test runner or linter is configured. No TypeScript.

EAS build profiles are in `eas.json`: development (simulator), preview (internal distribution), production (App Store).

## Architecture

All source code lives in three root-level files — there are no subdirectories for components/services:

- **App.js** — Monolithic main component: full chat UI, state management (useState/useRef), chat persistence via AsyncStorage, settings modal, model download UI, welcome screen. All UI is inline (no component extraction).
- **AIService.js** — Service class managing both modes. Online: Groq API via axios (non-streaming, simulated word-by-word output). Offline: llama.rn `initLlama`/`completion` with real token streaming. Three performance modes (fast/balanced/uncensored) control context window, token limits, temperature, and system prompt.
- **ModelDownloader.js** — Handles GGUF model download from Hugging Face using `expo-file-system` resumable downloads. Tracks progress/speed, supports pause/resume/cancel, validates file size.

## Key Technical Details

- **Prompt format**: ChatML (`<|im_start|>` / `<|im_end|>` tags) — required by the Dolphin model
- **llama.rn config** is Expo plugin-based — GPU enabled for both platforms in `app.json`
- **iOS entitlements** include extended virtual addressing and increased memory limit (required for large model inference)
- **Model path**: `${FileSystem.documentDirectory}dolphin-x1-8b-q4.gguf`
- **Offline inference tuning**: 6 threads (iPhone 16 Pro performance cores), n_gpu_layers=99 (full Metal offload), FP16 KV cache, batch size 128
- **Build number** is in `app.json` under `expo.ios.buildNumber` — bump this for each new build
- **Groq API key** is stored in AsyncStorage, not hardcoded

## Conventions

- Plain JavaScript (no TypeScript, no JSX file extensions)
- All state management through React hooks — no Redux or context providers
- Commit messages follow: descriptive summary of what changed (see git log for style)
