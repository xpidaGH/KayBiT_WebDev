# Web Development Archetypes & Teaching Reference Laboratory

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Internationalization](https://img.shields.io/badge/i18n-19%20Languages-success.svg)](#internationalization-support)

An interactive, high-fidelity curriculum and architectural laboratory designed for computer science students, engineering interns, and full-stack software developers. The laboratory dissects and demonstrates the **11 foundational archetypes** of modern web development across both content-driven websites and transaction-heavy web applications.

---

## 🌟 Key Features

- **11 Complete Interactive Archetypes**: Fully responsive, working production-grade implementations with zero mock stubs.
- **Architectural Dissections**: In-depth breakdowns of Presentation, Client State, API Protocols, Database Models, and Caching tiers.
- **Threat Defense Matrices**: Real-world OWASP Top 10 vulnerabilities, attack vectors, and battle-tested code remediation patterns.
- **Tiered Engineering Exercises**: Structured student challenges (Warmup, Core Challenge, Advanced Capstone) tailored for progressive mastery.
- **Device Viewport Simulator**: Test responsiveness in real-time across Desktop, Tablet (768px), and Mobile (375px) breakpoints.
- **19-Language Multilingual User Guide**: Comprehensive internationalized documentation with native script support and Right-to-Left (RTL) formatting for Arabic and Urdu.

---

## 📚 Curriculum Catalog

### Common Types of Websites (Content & Presentation Focus)

| # | Archetype | Rendering Pattern | Primary Teaching Focus |
|---|---|---|---|
| 1 | **Blog / Content Site** | SSG + ISR | Markdown AST processing, reading progress tracking, RSS feeds, and SEO metadata. |
| 2 | **E-commerce Site** | Hybrid (SSG + CSR) | Product catalogs, faceted multi-attribute filtering, cart drawers, and checkout state machines. |
| 3 | **Portfolio** | Jamstack / SSG | Core Web Vitals, case study modal transitions, responsive grids, and contact dispatching. |
| 4 | **Corporate / Business Site** | SSR + Headless CMS | Interactive ROI calculators, structured service tabs, testimonials, and consultation booking. |
| 5 | **Landing Page** | Edge Cached SSG | Launch countdown tickers, annual vs. monthly pricing engines, and lead capture funnels. |
| 6 | **Educational / Wiki Site** | Search-Indexed Docs | Collapsible navigation hierarchy, instant search indexing, code blocks, and feedback telemetry. |

### Common Types of Web Applications (State & Transaction Focus)

| # | Archetype | Architectural Pattern | Primary Teaching Focus |
|---|---|---|---|
| 7 | **SaaS Dashboard** | CSR + Realtime Metrics | Latency & error histograms, API key lifecycle management, and RBAC team permissions. |
| 8 | **Social Media Network** | Optimistic CSR + Feeds | Ephemeral story rings, code post composers, optimistic like/repost toggles, and threaded replies. |
| 9 | **Enterprise Portal** | Role-Gated Gateway (RBAC) | Persona switching (Student/Faculty/Admin), presigned download tokens, and digital QR credentials. |
| 10 | **Project Management Board** | Kanban State Machine | Atomic stage transitions, story point velocity tracking, priority indicators, and sprint progress. |
| 11 | **E-learning Platform** | Single Page App (LMS) | Interactive video player simulation, lesson completion checklists, and graded quizzes with certificates. |

---

## 🌐 Internationalization Support

To support global universities, coding bootcamps, and international learners, the laboratory includes a comprehensive user guide translated into **19 languages**:

- 🇬🇧 **English** (Base)
- 🇫🇷 **French** (*Français*)
- 🇩🇪 **German** (*Deutsch*)
- 🇮🇹 **Italian** (*Italiano*)
- 🇪🇸 **Spanish** (*Español*)
- 🇵🇹 **Portuguese** (*Português*)
- 🇮🇩 **Indonesian** (*Bahasa Indonesia*)
- 🇰🇪 **Swahili** (*Kiswahili*)
- 🇹🇷 **Turkish** (*Türkçe*)
- 🇷🇺 **Russian** (*Русский*)
- 🇨🇳 **Chinese** (*中文 - 简体*)
- 🇯🇵 **Japanese** (*日本語*)
- 🇸🇦 **Arabic** (*العربية* - RTL)
- 🇵🇰 **Urdu** (*اردو* - RTL)
- 🇮🇳 **Hindi** (*हिन्दी*)
- 🇮🇳 **Marathi** (*मराठी*)
- 🇧🇩 **Bangla / Bengali** (*বাংলা*)
- 🇮🇳 **Tamil** (*தமிழ்*)
- 🇮🇳 **Telugu** (*తెలుగు*)

---

## 🛠️ Tech Stack & Prerequisites

- **Frontend**: React 19, TypeScript 5.8, Tailwind CSS v4, Motion, Lucide React
- **Build System**: Vite 6, Node.js (v18+)

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/example/webdev-archetype-lab.git
cd webdev-archetype-lab

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

The application runs on `http://localhost:3000`.

---

## ⚡ Instant Cloud IDE & Standalone Export

Students can run and edit any archetype in two frictionless ways:

1. **StackBlitz Live Web IDE**: Click **Open in StackBlitz** from the top bar or code view to spin up an instant in-browser Node.js WebContainer with live HMR, interactive terminal, and zero setup.
2. **Offline ZIP Bundle**: Click **Export Project** to download a standalone archive containing full source code, tsconfig, package.json, and an automated `setup.sh` diagnostic runner.

---

## 📖 User Guide & Native Installation

- **Curriculum & Usage**: Refer to [`USER_GUIDE.md`](./USER_GUIDE.md) (or the in-app 19-language User Guide modal) for detailed walkthroughs of all 11 archetypes.
- **Native App Packaging & Distribution**: Refer to [`INSTALLATION.md`](./INSTALLATION.md) for step-by-step setup to package and distribute native builds for Android (`.apk`), Windows (`.exe`/`.msi`), macOS (`.dmg`), and iOS (PWA).

---

## 📄 License

This educational laboratory is distributed under the MIT License for open student and classroom use.
