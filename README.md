# Momentum

Momentum is a minimalist, human-centered dot calendar designed to replace the sterile grid of traditional calendars with a living, organic representation of time. 

Instead of numbers and rigid boxes, Momentum uses a field of dots that breathe, shift, and glow, emphasizing the fluid nature of our passage through days and months.

## Features

- Human Geometry: Dots are intentionally imperfect, featuring subtle organic offsets to feel hand-placed rather than machine-generated.
- Diurnal Momentum: A real-time Solar Flow progress bar that tracks your movement through the current 24-hour cycle.
- Micro-Interactions:
  - Smooth staggered entry animations on month changes.
  - Heartbeat presence glow on the current day.
  - Floating, italicized date labels revealed on tap.
- App-Ready: Built as a Progressive Web App (PWA), ready to be installed natively on Android or iOS.

## Project Structure

- index.html: Entry point and UI structure.
- styles.css: Visual effects and organic layout definitions.
- app.js: React logic, Framer Motion animations, and temporal state.
- manifest.json: Metadata for PWA and Native Android installation.

## Installation and Building

### 1. Simple Web Access (PWA)
1. Upload these files to any static host (GitHub Pages, Netlify, Vercel).
2. Open the URL in Chrome on Android.
3. Tap the browser menu and select Add to Home Screen.
4. The app will now launch without browser bars, appearing as a native app.

### 2. Build as Native APK (via Termux)
If you want a standalone .apk file without using Android Studio:

1. Install Dependencies:
   ```bash
   pkg update
   pkg install nodejs-lts openjdk-17
   npm install -g @bubblewrap/cli
   ```

2. Initialize Build:
   ```bash
   bubblewrap init --manifest [https://your-hosted-url.com/manifest.json](https://your-hosted-url.com/manifest.json)
   ```

3. Build the APK:
   ```bash
   bubblewrap build
   ```
   Your signed APK will be located in the project directory as app-release-signed.apk.

## Design Philosophy
The Human-Centric approach means removing the anxiety of deadlines and grids. Time is viewed as a momentum—a flow from dawn to dusk. Future days are The Void, past days are Spent, and the current moment is Presence.

## License
MIT. Feel free to fork, modify, and breathe with it.
