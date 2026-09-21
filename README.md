<div align="center">

  <img src="assets/app-icon.png" alt="shono.fm logo" width="128" height="128" style="border-radius: 28px;" />

  # shono.fm
  ### Good Music Hits Different.
  
  **The high-performance, ad-free desktop music streaming player for Windows.**<br>
  Built with an intelligent auto-healing stream engine, Discord-style in-app updates, and zero telemetry.

  <p>
    <a href="https://github.com/noobcoder1982/shono.fm/releases/tag/v1.0.2"><img src="https://img.shields.io/badge/Release-v1.0.2-ffc72c?style=for-the-badge&logo=github&logoColor=black" alt="Release v1.0.2"></a>
    <a href="https://github.com/noobcoder1982/shono.fm/releases/download/v1.0.2/shono.fm.Setup.1.0.1.exe"><img src="https://img.shields.io/badge/Platform-Windows%20x64-0078d4?style=for-the-badge&logo=windows&logoColor=white" alt="Windows 64-bit"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-00ff87?style=for-the-badge" alt="MIT License"></a>
    <a href="#features"><img src="https://img.shields.io/badge/Ads-0%25%20(Pure%20Audio)-ff3b30?style=for-the-badge" alt="Zero Ads"></a>
  </p>

  <p>
    <a href="https://github.com/noobcoder1982/shono.fm/releases/download/v1.0.2/shono.fm.Setup.1.0.1.exe">
      <img src="https://img.shields.io/badge/DOWNLOAD%20FOR%20WINDOWS-80MB%20.EXE-ffc72c?style=for-the-badge&logo=windows&logoColor=black" height="42" alt="Download for Windows">
    </a>
  </p>

</div>

---

## ⚡ Overview

**shono.fm** is an open-source desktop music player built around how you actually listen. 

Most desktop streaming tools are bloated browser wrappers burdened with mandatory video advertisements, sponsored pre-rolls, heavy telemetry profiling, and playback restriction crashes. **shono.fm** eliminates all of that — delivering pure, continuous, high-fidelity audio directly from YouTube's vast catalog with featherweight system resource consumption.

<div align="center">
  <img src="assets/app-screenshot.png" alt="shono.fm Desktop Player Interface" width="92%" style="border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.8);" />
</div>

---

## ✨ Key Features

- **🛡️ Auto-Healing Stream Engine**:
  Distributor copyright locks often trigger **YouTube Error 150 & 101** (*"Playback restricted on third-party embeds"*). When an error is detected, shono.fm's background resolver immediately identifies, verifies, and switches to embeddable candidate streams in under 50ms. Zero playback interruptions.

- **🚫 100% Ad-Free Audio**:
  No audio sponsor breaks every three songs, no unskippable video pre-rolls, and no noisy banners. Just clean music from start to finish.

- **🚀 Discord-Style Live In-App Updates**:
  Connected directly to GitHub Releases. When a new version drops, a subtle top pill alerts you, downloads the installer in the background, and updates with a single click.

- **🪶 Ultra-Low Memory Footprint (007 Mode)**:
  Operating at ~110–140 MB of RAM (compared to ~1 GB+ in web browsers), shono.fm sips less than 1% CPU — perfect for gaming, coding, and focus sessions.

- **🔒 100% Privacy & Local Storage**:
  No mandatory logins, no tracking pixels, and no behavioral ad telemetry. Playlists and stream caches live exclusively on your local computer.

- **🎚️ Modern Editorial Aesthetics**:
  High-contrast dark mode, custom audio equalizers, real-time waveform visualizers, and customizable tactile hotkeys.

---

## 📊 Benchmark Comparison

| Feature Metric | **shono.fm** | **Spotify Free** | **YouTube (Browser Tab)** |
|:---|:---:|:---:|:---:|
| **Audio Advertisements** | **0% (Clean)** | Frequent (Every 2–3 songs) | Pre-roll & Mid-roll Ads |
| **Auto-Healing Restricted Tracks** | **Included** | N/A | Error 150 Blackout |
| **Average Memory Consumption** | **~118 MB** | ~450 – 600 MB | ~850 MB – 1.5 GB |
| **Mandatory Account Creation** | **None** | Required | Constant Sign-In Prompts |
| **System Footprint** | **Near-Zero CPU** | Moderate | Heavy WebGL / Video Pipeline |
| **Source Code Transparency** | **100% Open Source** | Proprietary | Proprietary |

---

## 📥 Installation

1. **Download the installer**:
   Grab the latest executable installer:
   👉 **[Download shono.fm.Setup.1.0.1.exe](https://github.com/noobcoder1982/shono.fm/releases/download/v1.0.2/shono.fm.Setup.1.0.1.exe)**

2. **Run the setup**:
   Double-click `shono.fm.Setup.1.0.1.exe`.  
   *(Note: If Windows SmartScreen appears due to open-source self-signing, click **"More info"** &rarr; **"Run anyway"**).*

3. **Enjoy your music**:
   Search for any track, album, or paste your favorite YouTube playlists!

---

## 💻 System Requirements

- **Operating System**: Windows 10 or Windows 11 (64-bit)
- **Processor**: 1.6 GHz Intel/AMD 64-bit CPU
- **Memory**: 4 GB RAM (App uses ~118 MB)
- **Disk Space**: ~180 MB free disk space
- **Network**: Broadband internet connection for audio streaming

---

## 🌐 Official Website & Repository

This repository contains both the official **shono.fm** web application landing page and download portal.

### Running the Website Locally:

Clone the repository and start any static HTTP server:

```bash
# Clone the repository
git clone https://github.com/noobcoder1982/shono.fm-application.git
cd shono.fm-application

# Option 1: Using Python
python -m http.server 3030

# Option 2: Using Node.js / npx
npx serve .
```

Open `http://localhost:3030` in your web browser.

---

## 📁 Project Structure

```
shono.fm-application/
├── index.html            # Main landing page (Nike-inspired editorial design)
├── 404.html              # Custom 404 error page with branding
├── styles.css            # Responsive CSS design system (8px grid, pill geometry)
├── script.js             # Interactive search, download modal, & clipboard copy
├── assets/
│   ├── logo.png          # Transparent glowing motion-blur logomark
│   ├── app-icon.png      # High-resolution squircle app icon
│   ├── hero-listener.jpg # Editorial campaign photography
│   └── app-screenshot.png# Desktop app UI screenshot
└── README.md             # Project documentation
```

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!  
Feel free to open an issue or submit a pull request on the [Issue Tracker](https://github.com/noobcoder1982/shono.fm/issues).

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <br>
  <sub>Built with ❤️ for real music lovers by <a href="https://github.com/noobcoder1982">noobcoder1982</a></sub>
</div>
