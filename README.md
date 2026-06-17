# 🌌 Vibe Coding Presentation & VibeTree Project Workspace

Welcome to the **Vibe Coding & VibeTree** master workspace! This repository contains a premium, highly-polished presentation deck explaining the "Vibe Coding" paradigm shift, a production-ready Next.js application implementation for **VibeTree** (a sleek Linktree builder clone), and the collaborative single-page application (SPA) website for **Vibe Coding No, Limited.**

---

## 📂 Repository Structure

The workspace is structured into specialized directories for documentation, presentation, and software implementations:

### 🎭 1. Presentation Slide (`/slide`)
* **[`vibe_coding_slide.html`](slide/vibe_coding_slide.html)**: A stunning, interactive presentation deck powered by [Reveal.js](https://revealjs.com/). Styled using a premium, minimalist "Google Slides" theme with modern fonts (*Plus Jakarta Sans*, *Space Grotesk*) and zero-overflow aspect ratio scaling (16:9).
* **[`mtmp2xee-qr.png`](slide/mtmp2xee-qr.png)**: A QR code for quick mobile access or presentation sharing.

### 🌴 2. VibeTree Next.js App (`/vibetree`)
A production-grade web application built using **Next.js**, **Firebase App Hosting**, and **Cloud Firestore**.
* **[`vibetree/`](vibetree/)**: Complete React/Next.js codebase using TypeScript and Tailwind CSS, following clean architectural boundaries.
* Includes real-time Firestore database syncing, secure Firebase Auth integrations, and full environment configurations.

### 🏢 3. Vibe Coding No, Limited. (`/spa_company_website`)
A interactive Single Page Application (SPA) designed as a mock company website to facilitate cooperative prompt-engineering exercises and live Vibe Coding sessions.
* **[`index.html`](spa_company_website/index.html)**: The main single-file web app.
* **[`PROFILE.md`](spa_company_website/PROFILE.md)**: Rich mock data, company vision, services offered, and contact information used as context for the Vibe Coding sessions.
* **[`ACTIVITY.md`](spa_company_website/ACTIVITY.md)**: Rules, guidelines, and feature tracking for team collaboration.

### 📋 4. Specifications & Research (`/vibetree_spec` & `/docs`)
* **[`vibetree_spec/`](vibetree_spec/)**: Highly detailed, production-grade Product Requirement Documents (**PRD**) and step-by-step developer tutorials.
* **[`docs/`](docs/)**: Conceptual foundations of the "Vibe Coding" era, research materials, and appendices exploring AI-Assisted development paradigms.

---

## ⚡ Getting Started

### Running the VibeTree Web App
Navigate to the `/vibetree` directory and boot up the Next.js development server:
```bash
cd vibetree
npm install
npm run dev
```

### Viewing the Presentation Slides
Simply open the [`vibe_coding_slide.html`](slide/vibe_coding_slide.html) file directly in any modern web browser or run a simple local HTTP server:
```bash
npx serve slide
```
