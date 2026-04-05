<div align="center">
  
# 📸 QR Studio
  
**A stunning, production-ready, 100% client-side QR Code Generator built with React & Next.js.**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

</div>

---

## 🌟 Overview

QR Studio is a premium, Canva-style application for creating highly customized, print-ready QR codes. 
Unlike basic utilities, QR Studio offers a **100vh app workspace layout** designed for a creative, high-end user experience. 

Best of all, it handles everything **100% locally in the browser**. No data is ever sent to a server, ensuring absolute privacy for your custom URLs, WiFi credentials, and personal contact cards (vCards).

## 🔥 Features

- **🎨 SaaS-Level Aesthetics**: A professional split-screen interface mimicking high-end design utilities.
- **⚡ Supercharged by Framer Motion**: Buttery-smooth `layoutId` pill animations, bouncy spring QR previews, and cascading list transitions.
- **🖼️ Template Carousel**: Quickly click through beautifully designed aesthetic presets (e.g., Vibrant Neon, Dark Minimal, Corporate Pro).
- **📝 4 Smart Data Types**: 
  - Auto-formatting URLs.
  - Rich vCard 3.0 Generation (8+ fields).
  - Encrypted WiFi Connections (WPA/WEP/Open).
  - Plain Text.
- **💎 Deep Customization**: 
  - Dual color pickers & deep linear/radial gradient controls.
  - Adjustable internal padding margins.
  - 9 unique structural QR patterns (Dots, Classy, Extra-Rounded).
  - Logo uploder (auto-enables High Error Correction).
- **📥 HD Exporting**: Instantly download your customized QR in PNG, SVG, or JPEG format.

## 🛠 Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **QR Core**: [qr-code-styling](https://qr-code-styling.com/)

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iam-neo/QR-Code-Generator.git
   cd QR-Code-Generator/qr-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to start creating!

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── globals.css          # Tailwind v4 setup + Custom Glass/Aurora utilities
│   ├── layout.js            # Root layout using Geist & Outfit fonts
│   └── page.js              # Dynamically imports QRApp without SSR
├── components/
│   ├── QRApp.js             # Main 100vh SaaS Workspace Structure
│   ├── QRPreview.js         # The main floating Canvas display
│   ├── TemplateCarousel.js  # Preset template selections
│   ├── forms/               # Inputs handling (Text, URL, vCard, WiFi)
│   └── customization/       # Styling panels (Colors, Dots, Padding, Logo)
├── hooks/
│   ├── useQRCode.js         # Handles the core QR instances and debounce updating
│   └── useTheme.js          # Handles system + manual theme state parsing
└── utils/
    ├── formatters.js        # Logic for parsing vCard tags and WiFi strings
    └── validators.js        # Regex validation for URLs, emails, input
```

## 🔐 Privacy
This project uses the `qr-code-styling` canvas library. 100% of the payload parsing and image rendering is done by the user's CPU context inside their Browser instance (`use client`). There is zero backend dependency structure in this project.
