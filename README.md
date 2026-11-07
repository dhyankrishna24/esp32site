# 🎓 EduSphere — Academic Knowledge & Seminar Slides Portal

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers_Static_Assets-orange?logo=cloudflare)](https://workers.cloudflare.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Author: Dhyan Krishna M](https://img.shields.io/badge/Author-Dhyan_Krishna_M-indigo)](about.html)

**EduSphere** is an open-access academic presentation portal and interactive engineering suite designed for students, educators, and seminar researchers. It provides built-in presentation playback, educational computation utilities, and an IoT microcontroller subpage.

---

## ✨ Features

### 1. 📚 Seminar Presentations & Slides Player
* **In-Browser Slide Player Carousel**: Flip through slide-by-slide agendas with bulleted breakdowns and core seminar takeaways without needing PowerPoint installed.
* **Embeddable Viewer**: Interactive SmartBoard viewer container supporting HTML apps, PDFs, and Google Drive previews.
* **Academic Reference Generator**: Instant copy for pre-formatted **APA** and **IEEE** citations for seminar papers.
* **Curated Disciplines**:
  - 🛡️ **Computer Science & Cybersecurity**: *Spread of Computer Viruses, Network Risk & Hygiene*.
  - 🦠 **Biology & Health**: *Signs & Symptoms of Allergies, Hypersensitivity & Immunology*.
  - 💰 **Economics & Finance**: *Real-Life Budgeting Simulator & Emergency Curveballs*.
  - 🌍 **Geography & Earth Science**: *World Rivers, Hydrology & Civilizations*.
  - 🎤 **Public Speaking & Speech Arts**: *School Assembly Host Address & Delivery Script*.
  - ⚛️ **Quantum Computing**: *Qubits, Superposition & Shor's Algorithm*.

### 2. 🛠️ Interactive Student Toolkit
* **🧠 Flashcards & Quiz Trainer**: 3D interactive flashcards with flip animations and a self-scoring 5-question technical quiz with instant explanations.
* **📐 Formula Quick-Reference Directory**: Searchable directory covering Electronics, Computer Science, Mathematics, and Biology with one-click clipboard copying.
* **🎧 Ambient Study Focus Audio**: Web Audio API synthesizer generating Brown noise, White noise, and 432 Hz Alpha binaural beats for rehearsal focus.
* **⏱️ Seminar Rehearsal Timer**: Dedicated countdown timer with quick presets (5m, 10m, 15m) and automatic 2-minute concluding alerts.
* **⚡ Ohm's Law & Power Solver**: 4-variable electrical calculation engine ($V, I, R, P$) with real-time derivations.
* **🎙️ Speech Pacing Estimator**: Word count analyzer calculating speaking duration for formal (130 wpm) and conversational (160 wpm) speech rates.
* **📊 Big-O Complexity Benchmarker**: Interactive slider illustrating algorithmic growth comparisons ($O(1)$, $O(\log N)$, $O(N)$, $O(N \log N)$, $O(N^2)$, $O(2^N)$).

### 3. 🎯 Presenter & Study Modes
* **🎙️ Presenter Speaker Notes**: Slide-by-slide teleprompter and talking points to guide live seminar delivery.
* **🖥️ Fullscreen Projector Mode**: One-click and keyboard shortcut (`F` key) for distraction-free presentation display.
* **📄 Executive Study Cheatsheet**: Formats slide summaries, takeaways, and topics into an exportable study guide with print optimization (`@media print`) and Markdown copy.
* **⏳ Talk Time Badges**: Dynamic speaking duration estimation (`⏳ ~Xm talk`) based on slide volume.

### 4. 🚀 Student Contributor Studio
* **Peer Slide Sharing**: A submission studio for fellow students to add and showcase their school and college presentations.
* **Multi-Format Support**: Supports `.pptx`, `.pdf`, interactive web apps, Canva links, and cloud storage shares (Google Drive, OneDrive).
* **Open Source Contribution**: One-click code generation for [`slides-data.js`](slides-data.js) enabling easy GitHub Pull Requests.

### 5. 🔌 ESP32 Microcontroller Hub
* **Hands-on IoT Subpage**: Preserved hardware engineering workspace located in [`esp32/`](esp32/).
* **Telemetry Dashboards**: Environmental sensor readings, remote LED controller, radio stream hub, and embedded FreeRTOS experiments.

---

## 📂 Project Structure

```
esp32site/
├── index.html               # Main Academic Hub & Slides Portal
├── about.html               # Author biography & background
├── slides-data.js           # Comprehensive presentations database & formulas
├── wrangler.json            # Cloudflare Workers Static Assets configuration
├── cloudflare-worker.js     # Edge worker routing API & static assets
├── robots.txt               # Search engine crawlers policy
├── sitemap.xml              # XML Sitemap for SEO indexing
├── LICENSE                  # MIT License
├── slides/                  # Source seminar slide decks (.pptx, .pdf, .html)
│   ├── Spread of Computer Viruses - Copy.pptx
│   ├── Signs and Symptoms of Allergies.pptx
│   ├── Group a3.pptx
│   ├── Speech.pdf
│   └── interactive_seminar_real_life_budgeting_curveballs.html
└── esp32/                   # ESP32 IoT Microcontroller Project Subpage
    ├── index.html           # ESP32 Portal Home
    ├── weather_station.html # Live Weather Telemetry
    ├── led_control.html     # Remote LED Controller
    ├── sensor.html          # Sensor Analytics
    ├── radio.html           # Web Radio Stream
    └── details.html         # Hardware Specs & Pins
```

---

## 🚀 Getting Started

### Local Development
To preview the website locally on your computer:

```bash
# Clone the repository
git clone https://github.com/dhyankrishna24/esp32site.git
cd esp32site

# Run a local web server (e.g. Python or Node)
npx serve .
# OR
python -m http.server 8080
```
Open your browser and navigate to `http://localhost:8080`.

### Cloudflare Workers Deployment
This project is deployed to Cloudflare's Edge using Wrangler with Static Assets:

```bash
# Preview build assets
npx wrangler deploy --dry-run

# Deploy to Cloudflare
npx wrangler deploy
```

---

## 🤝 Contributing New Slides

We welcome seminar slides and academic materials from students across all disciplines!

1. Fork this repository.
2. Place your slide deck (`.pptx` or `.pdf`) into the [`slides/`](slides/) directory.
3. Add your presentation metadata to [`slides-data.js`](slides-data.js).
4. Open a Pull Request with your changes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for educational, academic, and non-commercial research use.

**Created & Maintained by [Dhyan Krishna M](about.html) • 2026**
