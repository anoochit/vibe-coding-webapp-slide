
## 🎓 Appendix: The 60-Minute "VibeTree" Workshop

This workshop is designed to demonstrate the power of **Vibe Coding** and **Spec-Driven Development** by building a functional Linktree clone in under an hour.

### 🕒 Phase 1: The Blueprint (10 Minutes)

* **Goal**: Ground the AI in the PRD and align on intent.
* **Activity**: Feed this PRD into your AI agent (Cursor, Gemini CLI, etc.). Ask it to summarize the P0 features and generate a technical architecture diagram.
* **Outcome**: A shared mental model between the human "Tech Lead" and the AI "Engineer."

### 🕒 Phase 2: The Foundation (10 Minutes)

* **Goal**: Zero-to-One setup with safety checks.
* **Activity**: Prompt: *"Scaffold a Next.js App Router project in the /vibetree directory with Tailwind CSS. Implement the Firebase Setup Helper (Task 1.3) to detect missing .env keys."*
* **Outcome**: A running local server with a functional "Setup Needed" screen.

### 🕒 Phase 3: The UI Core Sprint (15 Minutes)

* **Goal**: Build the primary visual value proposition.
* **Activity**: Prompt: *"Build the Split-Screen Builder UI (F-01). Left side: Form for display name and bio. Right side: A floating glassmorphic mobile phone mockup that live-previews the input text."*
* **Outcome**: A beautiful, interactive real-time preview dashboard.

### 🕒 Phase 4: The Data & Theme Loop (15 Minutes)

* **Goal**: Connect the "vibe" to a persistent cloud database.
* **Activity**: Prompt: *"Implement Task 3.1 & 3.2. Sync the profile state to Firestore. Then, implement the 4 Premium Themes (Section 3) and allow the user to toggle them with instant preview updates."*
* **Outcome**: A fully persistent, themed application synced to Cloud Firestore.

### 🕒 Phase 5: Reflection & "Vibe Debt" Check (10 Minutes)

* **Goal**: Verification and hardening.
* **Activity**: Run a "Vibe Debt" audit. Check for insecure Firestore rules or redundant Tailwind classes. Prompt: *"Generate a test suite for the username uniqueness check (F-04) and ensure mobile responsiveness."*
* **Outcome**: A production-ready, verified application prototype.
