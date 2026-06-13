# Banania – Android App (Capacitor)

This folder contains a complete **Capacitor** project that wraps the Banania
HTML5/JS game (`www/`) in a native Android shell, ready to open in Android
Studio and build into an APK/AAB.

## What's included

- `www/` – the full game (HTML, JS, images, sounds, levels) copied from the
  uploaded project, with the Capacitor bridge script reference added.
- `package.json`, `capacitor.config.ts` – Capacitor project config.
- `android/` – a hand-built Android Studio project (manifest, Gradle files,
  Java `MainActivity`, resources, app icons generated from the game's
  "Berti" sprite).

## ⚠️ Why there's no .apk/.aab in this download

Building an Android app requires:
1. Downloading npm packages (`@capacitor/core`, `@capacitor/android`, `@capacitor/cli`) from the npm registry,
2. The Android SDK + build tools,
3. The Gradle wrapper jar (a binary downloaded on first run).

None of these are available in this sandboxed environment (no internet
access, no Android SDK installed), so the build cannot be completed here.
Everything else — every config file, manifest, icon, and the wired-up game —
is included so the **only thing left is to run the build on your own machine**.

## How to build the APK/AAB

1. **Install prerequisites** (one-time):
   - [Node.js](https://nodejs.org) (LTS)
   - [Android Studio](https://developer.android.com/studio) (includes the Android SDK)

2. **Install dependencies**, from the project root:
   ```bash
   npm install
   ```

3. **Add the Android platform / sync** (this regenerates the Gradle wrapper
   jar and the Capacitor native bridge files that are placeholders here):
   ```bash
   npx cap sync android
   ```
   If `android/` weren't present at all you'd run `npx cap add android` first;
   since it's already here, `sync` will populate the missing
   `capacitor.settings.gradle`, `capacitor.build.gradle`,
   `gradle-wrapper.jar`, and `www/capacitor.js` with the real generated
   versions.

4. **Build**:
   - Open the `android/` folder in Android Studio and click *Run*, **or**
   - From the command line:
     ```bash
     cd android
     ./gradlew assembleDebug      # -> app/build/outputs/apk/debug/app-debug.apk
     ./gradlew bundleRelease      # -> app/build/outputs/bundle/release/app-release.aab (needs signing config)
     ```

5. **Sign the release build** (for Play Store / AAB): create a keystore and
   add signing config to `android/app/build.gradle` under `buildTypes.release`,
   following the [official Capacitor Android docs](https://capacitorjs.com/docs/android).

## App details

- **App ID:** `com.mentalreverb.banania`
- **App name:** Banania
- **Orientation:** locked to landscape (matches the game's fixed 537×408 canvas)
- **Icon:** generated from `player_0-0.png` (Berti) on a banana-yellow background

## Notes on the game itself

- The game runs entirely client-side via the WebView (no internet permission
  needed for gameplay, though `INTERNET` is included in case future versions
  add online features).
- Touch controls: the game already includes an on-screen joystick for touch
  devices (`IS_TOUCH_DEVICE` detection in `game.js`).
- If you want a portrait layout or resizable canvas, you'd need to adjust the
  CSS/canvas sizing logic in `www/index.html` / `game.js` — the original game
  uses a fixed 537×408 canvas.
