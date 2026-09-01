# 📱 WebDev Archetype Lab — Multi-Platform Native Installation & Distribution Guide

This comprehensive guide outlines how to package, automate, and distribute the **WebDev Archetype Lab** (Vite + React 19 + TypeScript + Tailwind CSS v4) as native desktop and mobile applications across **Android (.apk / .aab)**, **Windows (.exe / .msi)**, **macOS (.dmg)**, **Linux (.deb / AppImage)**, and **iOS / Modern Web (PWA)**.

---

## 📑 Table of Contents

1. [Tooling Selection & Architecture](#1-tooling-selection--architecture)
2. [Project Restructuring & Multi-Platform Adaptation](#2-project-restructuring--multi-platform-adaptation)
3. [Concrete Configuration Files](#3-concrete-configuration-files)
   - 3.1 [Progressive Web App (PWA & Manifest)](#31-pwa-configuration)
   - 3.2 [Android & iOS (Capacitor Config)](#32-capacitor-configuration)
   - 3.3 [Windows & macOS Desktop (Tauri Config)](#33-tauri-configuration)
4. [CI/CD Build Automation (GitHub Actions)](#4-cicd-build-automation-github-actions)
5. [Hosting, Storage & Download Portal Distribution](#5-hosting-storage--download-portal-distribution)
   - 5.1 [S3 / Cloudflare R2 Bucket Hierarchy](#51-s3--cloudflare-r2-bucket-hierarchy)
   - 5.2 [Dynamic OS-Detecting Download Portal Component](#52-dynamic-os-detecting-download-portal-component)
   - 5.3 [Version Manifest & Auto-Updates](#53-version-manifest--auto-updates)

---

## 1. Tooling Selection & Architecture

To achieve optimal performance, small binary sizes, and minimal maintenance overhead for a modern Vite + React codebase:

| Target Platform | Recommended Tool | Binary Format | Why This Tool? |
| :--- | :--- | :--- | :--- |
| **Android** | **Capacitor 6** | `.apk` (Sideload) / `.aab` (Play Store) | Direct native bridge, zero webview bloat compared to Cordova, seamless Vite integration. |
| **iOS / iPadOS** | **Capacitor 6** & **PWA** | `.ipa` / Home Screen PWA | Full webview capability on iOS with offline asset caching and touch gestures. |
| **Windows Desktop** | **Tauri 2.0** | `.exe` (Installer/Portable) & `.msi` | **~10–15 MB binary size** (vs. ~120 MB Electron), utilizes system WebView2, extremely secure Rust core. |
| **macOS Desktop** | **Tauri 2.0** | `.dmg` (Apple Silicon & Intel) | Native WKWebView engine, universal binary support, auto-updater integration. |
| **Web & ChromeOS** | **Vite PWA (Workbox)** | Web App Manifest / Service Worker | 1-click browser install, offline service worker caching, zero installation friction. |

---

## 2. Project Restructuring & Multi-Platform Adaptation

To ensure our Single Page Application (SPA) runs smoothly across web, desktop file protocols (`tauri://` or `http://localhost`), and mobile webviews (`capacitor://localhost`), follow these structural rules:

### A. Asset Paths & Routing
- Set `base: './'` or standard relative paths in `vite.config.ts` so embedded webviews can resolve scripts without an HTTP server root.
- Use **HashRouter** or **MemoryRouter** for embedded wrappers if server-side history fallback is unavailable, or configure native interceptors.

### B. Storage & Offline Persistence
- Use standard `localStorage` or `IndexedDB` for client-side state.
- Ensure all SVG icons (`lucide-react`) and style rules are bundled into static chunks during `npm run build`.

---

## 3. Concrete Configuration Files

### 3.1 PWA Configuration

Add web app manifest and service worker capabilities using `vite-plugin-pwa`.

#### `public/manifest.webmanifest`
```json
{
  "name": "WebDev Archetype Lab",
  "short_name": "ArchetypeLab",
  "description": "Interactive Reference Curriculum & Web Development Archetype Laboratory",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#4f46e5",
  "orientation": "any",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

---

### 3.2 Capacitor Configuration

Install Capacitor in your repository:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "WebDev Archetype Lab" "com.archetypelab.app" --web-dir dist
npx cap add android
npx cap add ios
```

#### `capacitor.config.ts`
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.archetypelab.app',
  appName: 'WebDev Archetype Lab',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    cleartext: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#020617',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#020617'
    }
  }
};

export default config;
```

---

### 3.3 Tauri Configuration

Install the Tauri CLI:
```bash
npm install -D @tauri-apps/cli
npx tauri init
```

#### `src-tauri/tauri.conf.json`
```json
{
  "$schema": "https://raw.githubusercontent.com/tauri-apps/tauri/dev/tooling/cli/schema.json",
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devPath": "http://localhost:3000",
    "distDir": "../dist"
  },
  "package": {
    "productName": "WebDev Archetype Lab",
    "version": "1.0.0"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "shell": {
        "all": false,
        "open": true
      }
    },
    "bundle": {
      "active": true,
      "targets": "all",
      "identifier": "com.archetypelab.app",
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ],
      "windows": {
        "wix": {
          "language": "en-US"
        },
        "nsis": {
          "installMode": "currentUser"
        }
      },
      "macOS": {
        "frameworks": [],
        "minimumSystemVersion": "10.15"
      }
    },
    "windows": [
      {
        "title": "WebDev Archetype Lab",
        "width": 1280,
        "height": 860,
        "minWidth": 900,
        "minHeight": 600,
        "resizable": true,
        "fullscreen": false,
        "center": true
      }
    ]
  }
}
```

---

## 4. CI/CD Build Automation (GitHub Actions)

Create `.github/workflows/release-binaries.yml` to automatically build artifacts on Git tags or workflow dispatch.

```yaml
name: Build & Release Multi-Platform Binaries

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  # -------------------------------------------------------------
  # 1. BUILD DESKTOP APPS (Windows .exe/.msi, macOS .dmg)
  # -------------------------------------------------------------
  build-desktop:
    strategy:
      fail-fast: false
      matrix:
        platform: [windows-latest, macos-latest]
    runs-on: ${{ matrix.platform }}

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Rust Toolchain (for Tauri)
        uses: dtolnay/rust-toolchain@stable

      - name: Rust Cache
        uses: swatinem/rust-cache@v2
        with:
          workspaces: './src-tauri -> target'

      - name: Install Node Dependencies
        run: npm ci

      - name: Build Web & Tauri Desktop Bundle
        uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: ${{ github.ref_name }}
          releaseName: 'WebDev Archetype Lab ${{ github.ref_name }}'
          releaseBody: 'Direct downloads for Windows (.exe/.msi) and macOS (.dmg)'
          releaseDraft: false
          prerelease: false

  # -------------------------------------------------------------
  # 2. BUILD ANDROID APP (.apk & .aab)
  # -------------------------------------------------------------
  build-android:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Java JDK
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Install Dependencies
        run: npm ci

      - name: Build Web Static Files
        run: npm run build

      - name: Sync Capacitor Android
        run: npx cap sync android

      - name: Build Android APK (Release)
        working-directory: android
        run: ./gradlew assembleRelease

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ArchetypeLab-Android-APK
          path: android/app/build/outputs/apk/release/*.apk
```

---

## 5. Hosting, Storage & Download Portal Distribution

### 5.1 S3 / Cloudflare R2 Bucket Hierarchy

Structure your AWS S3 bucket or Cloudflare R2 storage under a public CDN domain (e.g. `https://downloads.archetypelab.io/`):

```text
releases/
├── latest.json                     # Dynamic version manifest (queried by portal)
├── v1.0.0/
│   ├── ArchetypeLab-Setup-1.0.0.exe      # Windows 64-bit Installer
│   ├── ArchetypeLab-1.0.0-arm64.dmg      # macOS Apple Silicon
│   ├── ArchetypeLab-1.0.0-x64.dmg        # macOS Intel
│   ├── ArchetypeLab-release-1.0.0.apk    # Android Sideload APK
│   └── ArchetypeLab-1.0.0.AppImage       # Linux Portable
```

### 5.2 Version Manifest (`latest.json`)

```json
{
  "version": "1.0.0",
  "releaseDate": "2026-08-31",
  "notes": "Initial native release with 11 full archetypes, 19 languages, and StackBlitz integration.",
  "downloads": {
    "windows": {
      "url": "https://downloads.archetypelab.io/releases/v1.0.0/ArchetypeLab-Setup-1.0.0.exe",
      "filename": "ArchetypeLab-Setup-1.0.0.exe",
      "size": "12.4 MB",
      "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    "macOS": {
      "url": "https://downloads.archetypelab.io/releases/v1.0.0/ArchetypeLab-1.0.0-arm64.dmg",
      "filename": "ArchetypeLab-1.0.0-arm64.dmg",
      "size": "9.8 MB",
      "sha256": "f5a5e12...b9"
    },
    "android": {
      "url": "https://downloads.archetypelab.io/releases/v1.0.0/ArchetypeLab-release-1.0.0.apk",
      "filename": "ArchetypeLab-release-1.0.0.apk",
      "size": "6.2 MB",
      "sha256": "d41d8cd...12"
    },
    "pwa": {
      "url": "https://archetypelab.io",
      "instructions": "Open in Safari/Chrome and click 'Add to Home Screen' or 'Install App'"
    }
  }
}
```

---

## 6. Embedded Student Instructions for Direct Sideloading

| Device | Installation Steps |
| :--- | :--- |
| **Android Phone / Tablet** | 1. Download `.apk`<br>2. Open file & tap **Install**<br>3. If prompted, toggle *Allow installation from this source*. |
| **Windows PC** | 1. Download `ArchetypeLab-Setup.exe`<br>2. Run installer<br>3. If Windows SmartScreen appears, click *More info* → *Run anyway*. |
| **macOS Mac / MacBook** | 1. Download `.dmg`<br>2. Drag **WebDev Archetype Lab** into the `Applications` folder<br>3. If un-notarized warning appears, Right Click → *Open*. |
| **iPhone / iPad (iOS)** | 1. Open the web app in **Safari**<br>2. Tap the **Share** button (box with arrow up)<br>3. Select **Add to Home Screen**. |
