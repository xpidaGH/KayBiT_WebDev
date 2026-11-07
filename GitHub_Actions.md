# 🚀 Multi-Platform CI/CD & Production Code-Signing Guide (`GitHub_Actions.md`)

This guide provides a complete, production-ready **GitHub Actions** pipeline to automatically build, code-sign, increment versions, publish to **TestFlight** & **Google Play Internal Testing**, attach desktop installers to **GitHub Releases** with an **automated changelog**, and notify your team via **Slack, Discord, or Email**.

---

## 1. Secure Production Code-Signing Setup (Base64 Secrets)

To keep signing credentials secure, **never commit raw `.keystore`, `.jks`, `.p12`, or `.mobileprovision` files** to your GitHub repository. Instead, encode them into Base64 strings locally, store them in **GitHub Repository Secrets**, and decode them on the fly inside runner memory (`$RUNNER_TEMP` or `/dev/shm`) during CI execution.

### A. Encoding Secrets Locally (Bash vs. PowerShell)

#### 1. Android Release Keystore (`.jks` / `.keystore`)
First, generate a production keystore locally if you do not have one:
```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-app-key
```

Convert `release-key.jks` to a single-line Base64 string:

* **Bash (macOS / Linux):**
  ```bash
  base64 -i release-key.jks | tr -d '\n' > keystore.b64.txt
  ```
* **PowerShell (Windows):**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("release-key.jks")) | Set-Content -NoNewline keystore.b64.txt
  ```

#### 2. Apple Distribution Certificate (`.p12`) & Provisioning Profile (`.mobileprovision`)
Export your **Apple Distribution** certificate from Keychain Access as `distribution.p12` and download your App Store Provisioning Profile as `profile.mobileprovision`.

* **Bash (macOS / Linux):**
  ```bash
  base64 -i distribution.p12 | tr -d '\n' > cert.b64.txt
  base64 -i profile.mobileprovision | tr -d '\n' > profile.b64.txt
  ```
* **PowerShell (Windows):**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("distribution.p12")) | Set-Content -NoNewline cert.b64.txt
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("profile.mobileprovision")) | Set-Content -NoNewline profile.b64.txt
  ```

---

### B. Required GitHub Repository Secrets

Navigate to **GitHub Repository → Settings → Secrets and variables → Actions** and add:

| Secret Name | Platform | Description |
| :--- | :--- | :--- |
| `APPLE_CERT_BASE64` | iOS / macOS | Base64-encoded `.p12` Distribution Certificate |
| `APPLE_CERT_PASSWORD` | iOS / macOS | Password used when exporting the `.p12` file |
| `APPLE_PROVISION_PROFILE_BASE64` | iOS | Base64-encoded `.mobileprovision` file |
| `APPLE_TEAM_ID` | iOS / macOS | 10-character Apple Developer Team ID |
| `IOS_BUNDLE_ID` | iOS | App Bundle Identifier (e.g., `com.archetypelab.app`) |
| `IOS_PROVISIONING_PROFILE_NAME` | iOS | Exact name of the Provisioning Profile |
| `APP_STORE_CONNECT_API_KEY_ID` | iOS TestFlight | App Store Connect API Key ID |
| `APP_STORE_CONNECT_ISSUER_ID` | iOS TestFlight | App Store Connect Issuer UUID |
| `APP_STORE_CONNECT_PRIVATE_KEY` | iOS TestFlight | Contents of the `.p8` API key file |
| `ANDROID_KEYSTORE_BASE64` | Android | Base64-encoded `.jks` / `.keystore` file |
| `ANDROID_KEYSTORE_PASSWORD` | Android | Keystore password |
| `ANDROID_KEY_ALIAS` | Android | Key alias (e.g., `my-app-key`) |
| `ANDROID_KEY_PASSWORD` | Android | Key password |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Google Play | Raw JSON of Google Play Console Service Account |
| `SLACK_WEBHOOK_URL` | Notifications | Incoming Webhook URL for Slack (optional) |
| `DISCORD_WEBHOOK_URL` | Notifications | Incoming Webhook URL for Discord (optional) |
| `SMTP_USERNAME` / `SMTP_PASSWORD` | Notifications | SMTP credentials for Email alerts (optional) |

---

## 2. iOS `exportOptions.plist` & Dynamic Secret Injection

Create a template file at `ios/App/exportOptions.template.plist` with placeholder tokens so your **Team ID**, **Bundle ID**, and **Provisioning Profile Name** are never exposed in your public repository:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>__APPLE_TEAM_ID__</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>signingStyle</key>
    <string>manual</string>
    <key>provisioningProfiles</key>
    <dict>
        <key>__IOS_BUNDLE_ID__</key>
        <string>__IOS_PROVISIONING_PROFILE_NAME__</string>
    </dict>
</dict>
</plist>
```

During the workflow run, a script dynamically injects the GitHub Secrets into `$RUNNER_TEMP/exportOptions.plist` in runner memory.

---

## 3. Windows SmartScreen & Code-Signing Note

Tauri automatically outputs both `.msi` (WiX) and `.exe` (NSIS) installers on `windows-latest`.
* **Unsigned Builds:** Windows SmartScreen will display *"Windows protected your PC"* on first launch for unsigned installers. Students can click **More info → Run anyway**.
* **Production Authenticode Signing:** When you purchase an EV or OV Code Signing Certificate (`.pfx`), store it as `WINDOWS_CERT_BASE64` and `WINDOWS_CERT_PASSWORD` in GitHub Secrets and pass `TAURI_SIGNING_PRIVATE_KEY` / `signtool` in the Windows job to eliminate SmartScreen warnings.

---

## 4. Complete GitHub Actions Workflow

Save this workflow to `.github/workflows/multiplatform-release.yml`:

```yaml
name: Multi-Platform Build, Sign & Release

on:
  push:
    branches: [main]
    tags:
      - 'v*'
  workflow_dispatch:

env:
  APP_VERSION: 1.0.${{ github.run_number }}
  BUILD_NUMBER: ${{ github.run_number }}

jobs:
  # ============================================================================
  # 1. macOS RUNNER: iOS (.ipa) via Capacitor/Xcode + macOS Universal (.dmg/.app)
  # ============================================================================
  build-apple:
    name: Build iOS (.ipa) & macOS Universal (.dmg)
    runs-on: macos-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Rust Toolchain (for Tauri Universal Binary)
        uses: dtolnay/rust-toolchain@stable
        with:
          targets: aarch64-apple-darwin,x86_64-apple-darwin

      - name: Install Dependencies & Build Web Bundle
        run: |
          npm ci
          npm run build

      # --- iOS Code Signing & .ipa Compilation ---
      - name: Import Apple Distribution Certificate & Provisioning Profile
        uses: apple-actions/import-codesign-certs@v2
        with:
          p12-file-base64: ${{ secrets.APPLE_CERT_BASE64 }}
          p12-password: ${{ secrets.APPLE_CERT_PASSWORD }}

      - name: Decode Provisioning Profile into Runner Memory
        run: |
          mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
          echo "${{ secrets.APPLE_PROVISION_PROFILE_BASE64 }}" | base64 --decode > ~/Library/MobileDevice/Provisioning\ Profiles/profile.mobileprovision

      - name: Generate Dynamic exportOptions.plist from Secrets
        run: |
          sed -e "s/__APPLE_TEAM_ID__/${{ secrets.APPLE_TEAM_ID }}/g" \
              -e "s/__IOS_BUNDLE_ID__/${{ secrets.IOS_BUNDLE_ID }}/g" \
              -e "s/__IOS_PROVISIONING_PROFILE_NAME__/${{ secrets.IOS_PROVISIONING_PROFILE_NAME }}/g" \
              ios/App/exportOptions.template.plist > "$RUNNER_TEMP/exportOptions.plist"

      - name: Sync Capacitor & Increment iOS Build Number
        run: |
          npx cap sync ios
          cd ios/App
          agvtool new-version -all ${{ env.BUILD_NUMBER }}

      - name: Archive & Export iOS .ipa
        run: |
          xcodebuild -workspace ios/App/App.xcworkspace \
            -scheme App \
            -configuration Release \
            -archivePath "$RUNNER_TEMP/App.xcarchive" \
            archive
          xcodebuild -exportArchive \
            -archivePath "$RUNNER_TEMP/App.xcarchive" \
            -exportOptionsPlist "$RUNNER_TEMP/exportOptions.plist" \
            -exportPath "$RUNNER_TEMP/ios-export"

      # --- Auto-Publish to Apple TestFlight ---
      - name: Upload iOS Build to TestFlight
        if: secrets.APP_STORE_CONNECT_API_KEY_ID != ''
        uses: apple-actions/upload-testflight-build@v1
        with:
          app-path: ${{ runner.temp }}/ios-export/App.ipa
          issuer-id: ${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
          api-key-id: ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
          api-private-key: ${{ secrets.APP_STORE_CONNECT_PRIVATE_KEY }}

      # --- macOS Universal Binary (.dmg & .app) ---
      - name: Build macOS Universal Binary (.dmg / .app)
        run: |
          npx tauri build --target universal-apple-darwin

      - name: Upload macOS Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: macos-universal-binaries
          path: |
            src-tauri/target/universal-apple-darwin/release/bundle/dmg/*.dmg
            src-tauri/target/universal-apple-darwin/release/bundle/macos/*.app

  # ============================================================================
  # 2. WINDOWS RUNNER: Windows (.exe & .msi) via Tauri + WiX/NSIS
  # ============================================================================
  build-windows:
    name: Build Windows (.exe & .msi)
    runs-on: windows-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Rust Toolchain
        uses: dtolnay/rust-toolchain@stable

      - name: Install Dependencies & Build Windows Installers
        shell: pwsh
        run: |
          npm ci
          npm run build
          npx tauri build

      - name: Upload Windows Installers (.msi & .exe)
        uses: actions/upload-artifact@v4
        with:
          name: windows-installers
          path: |
            src-tauri/target/release/bundle/msi/*.msi
            src-tauri/target/release/bundle/nsis/*.exe

  # ============================================================================
  # 3. UBUNTU RUNNER: Android (.apk/.aab) + Linux (.deb/.AppImage) with PipeWire
  # ============================================================================
  build-linux-and-android:
    name: Build Android (.apk/.aab) & Linux (.deb/.AppImage)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Linux Desktop & PipeWire Dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y \
            libwebkit2gtk-4.1-dev \
            build-essential \
            curl \
            wget \
            file \
            libxdo-dev \
            libssl-dev \
            libayatana-appindicator3-dev \
            librsvg2-dev \
            libpipewire-0.3-dev \
            pipewire-audio-client-libraries

      - name: Setup Rust Toolchain
        uses: dtolnay/rust-toolchain@stable

      - name: Setup Java 17 & Android SDK/NDK
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Install Dependencies & Build Web Bundle
        run: |
          npm ci
          npm run build

      # --- Linux .deb & .AppImage Compilation ---
      - name: Build Linux .deb & .AppImage
        run: npx tauri build

      - name: Upload Linux Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: linux-packages
          path: |
            src-tauri/target/release/bundle/deb/*.deb
            src-tauri/target/release/bundle/appimage/*.AppImage

      # --- Android .apk & .aab Compilation + Keystore Signing ---
      - name: Sync Capacitor Android & Build Release APK/AAB
        run: |
          npx cap sync android
          cd android
          ./gradlew assembleRelease bundleRelease \
            -Pandroid.injected.version.code=${{ env.BUILD_NUMBER }} \
            -Pandroid.injected.version.name=${{ env.APP_VERSION }}

      - name: Decode Android Keystore in Runner Memory
        run: |
          echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > "$RUNNER_TEMP/release-key.jks"

      - name: Sign Android .aab & .apk
        id: sign_android
        uses: r0adkll/sign-android-release@v1
        with:
          releaseDirectory: android/app/build/outputs/bundle/release
          signingKeyBase64: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}
          alias: ${{ secrets.ANDROID_KEY_ALIAS }}
          keyStorePassword: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
          keyPassword: ${{ secrets.ANDROID_KEY_PASSWORD }}

      # --- Auto-Publish to Google Play Internal Testing Track ---
      - name: Publish Signed .aab to Google Play Internal Track
        if: secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON != ''
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
          packageName: com.archetypelab.app
          releaseFiles: ${{ steps.sign_android.outputs.signedReleaseFile }}
          track: internal
          status: completed

      - name: Upload Android Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: android-packages
          path: |
            android/app/build/outputs/apk/release/*.apk
            ${{ steps.sign_android.outputs.signedReleaseFile }}

  # ============================================================================
  # 4. PUBLISH DESKTOP BINARIES TO GITHUB RELEASES + AUTOMATED CHANGELOG
  # ============================================================================
  publish-github-release:
    name: Publish GitHub Release & Changelog
    needs: [build-apple, build-windows, build-linux-and-android]
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Repository with Full History
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Download All Build Artifacts
        uses: actions/download-artifact@v4
        with:
          path: artifacts

      - name: Generate Automated Changelog from Commit Messages
        id: changelog
        run: |
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
          if [ -z "$PREV_TAG" ]; then
            COMMITS=$(git log -n 20 --pretty=format:"- %s (%h)")
          else
            COMMITS=$(git log ${PREV_TAG}..HEAD --pretty=format:"- %s (%h)")
          fi
          {
            echo "CHANGELOG<<EOF"
            echo "## What's Changed in v${{ env.APP_VERSION }}"
            echo ""
            echo "$COMMITS"
            echo "EOF"
          } >> "$GITHUB_ENV"

      - name: Create GitHub Release & Attach Desktop/Mobile Installers
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v${{ env.APP_VERSION }}
          name: WebDev Archetype Lab v${{ env.APP_VERSION }}
          body: ${{ env.CHANGELOG }}
          files: |
            artifacts/windows-installers/*.msi
            artifacts/windows-installers/*.exe
            artifacts/macos-universal-binaries/*.dmg
            artifacts/linux-packages/*.AppImage
            artifacts/linux-packages/*.deb
            artifacts/android-packages/*.apk

  # ============================================================================
  # 5. TEAM NOTIFICATIONS (SLACK, DISCORD & EMAIL)
  # ============================================================================
  notify-team:
    name: Send Build Status Notifications
    needs: [build-apple, build-windows, build-linux-and-android, publish-github-release]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Determine Overall Build Status
        id: status
        run: |
          if [[ "${{ needs.publish-github-release.result }}" == "success" ]]; then
            echo "STATUS=SUCCESS" >> "$GITHUB_OUTPUT"
            echo "COLOR=#10b981" >> "$GITHUB_OUTPUT"
          else
            echo "STATUS=FAILED" >> "$GITHUB_OUTPUT"
            echo "COLOR=#ef4444" >> "$GITHUB_OUTPUT"
          fi

      - name: Notify Slack Channel
        if: secrets.SLACK_WEBHOOK_URL != ''
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": "Build ${{ steps.status.outputs.STATUS }}: WebDev Archetype Lab v${{ env.APP_VERSION }} (Run #${{ github.run_number }})",
              "attachments": [
                {
                  "color": "${{ steps.status.outputs.COLOR }}",
                  "fields": [
                    { "title": "Repository", "value": "${{ github.repository }}", "short": true },
                    { "title": "Branch / Ref", "value": "${{ github.ref_name }}", "short": true },
                    { "title": "Triggered By", "value": "${{ github.actor }}", "short": true },
                    { "title": "Workflow Run", "value": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}", "short": false }
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK

      - name: Notify Discord Server
        if: secrets.DISCORD_WEBHOOK_URL != ''
        uses: sarisia/actions-status-discord@v1
        with:
          webhook: ${{ secrets.DISCORD_WEBHOOK_URL }}
          title: "WebDev Archetype Lab v${{ env.APP_VERSION }}"
          description: "Multi-platform build #${{ github.run_number }} finished with status: **${{ steps.status.outputs.STATUS }}**"

      - name: Send Email Notification
        if: secrets.SMTP_USERNAME != '' && secrets.SMTP_PASSWORD != ''
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          secure: true
          username: ${{ secrets.SMTP_USERNAME }}
          password: ${{ secrets.SMTP_PASSWORD }}
          subject: "[CI/CD ${{ steps.status.outputs.STATUS }}] WebDev Archetype Lab v${{ env.APP_VERSION }}"
          to: team@archetypelab.io
          from: CI/CD Bot <ci@archetypelab.io>
          body: |
            Multi-platform build #${{ github.run_number }} completed with status: ${{ steps.status.outputs.STATUS }}.
            View logs and artifacts: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
