// slides_data.js - Slide Content and Data for Vibe Coding Presentation

const slidesData = [
  {
    layout: "title",
    transition: "fade",
    badge: "Google Cloud Slides",
    title: "Web Application <br>Development with <br><span style='color: var(--google-blue);'>Vibe</span> <span style='color: var(--google-red);'>Co</span><span style='color: var(--google-yellow);'>di</span><span style='color: var(--google-green);'>ng</span>",
    subtitle: "A Modern Paradigm Shift in Software Engineering",
    presenter: "Anuchit Chalothorn"
  },
  {
    layout: "quote",
    transition: "slide",
    section: "Section 01",
    title: 'What is "Vibe Coding"?',
    intro: "Coined in early 2025, <strong style='color: var(--google-blue);'>Vibe Coding</strong> defines a prompt-driven, conversational workflow where humans act as high-level creators and AI executes line-by-line implementations.",
    quote: "Fully give in to the vibes, embrace exponentials, and forget that the code even exists.",
    author: "Andrej Karpathy, Co-founder of OpenAI"
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "Section 01",
    title: "The Conceptual Shift &bull; Traditional vs Vibe",
    card1: {
      title: "Traditional Coding",
      badge: "Manual",
      themeColor: "var(--google-red)",
      badgeClass: "badge-red",
      items: [
        "<strong>Writing Syntax</strong>: Typing imports, syntax rules, structures manually.",
        "<strong>Time Sinks</strong>: Fixing compile errors and writing boilerplates.",
        "<strong>Focus</strong>: Bound by syntax memorization and language constraints."
      ]
    },
    card2: {
      title: "Vibe Coding",
      badge: "Leveraged",
      themeColor: "var(--google-blue)",
      badgeClass: "badge-blue",
      items: [
        "<strong>Context & Intent</strong>: Explaining features in natural language.",
        "<strong>Time Sinks</strong>: Directing updates, testing outputs, and code review.",
        "<strong>Focus</strong>: App architecture, interface design, and product fit."
      ]
    }
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "Section 02",
    title: "Core Principles & Live Workflow",
    intro: "Vibe coding is not a simple 'one-shot' generation. It is a highly structured, continuous developer-to-AI loop:",
    card1: {
      title: "The Iterative Vibe Cycle",
      badge: "🔄 Cycle",
      themeColor: "var(--google-green)",
      badgeClass: "badge-green",
      items: [
        "<strong>See Stuff</strong>: Build, run, and visually inspect browser outputs.",
        "<strong>Say Stuff</strong>: Report errors and prompt new incremental features.",
        "<strong>Run Stuff</strong>: Instantly execute and re-verify compiled integrations."
      ]
    },
    card2: {
      title: "The 'Tech Lead' Mindset",
      badge: "👑 Role",
      themeColor: "#b06000",
      badgeClass: "badge-yellow",
      items: [
        "Human acts as <strong>Tech Lead</strong>, directing intent and reviewing diffs.",
        "AI acts as a tireless <strong>Junior Developer</strong> writing code.",
        "Your <strong>design taste</strong> determines final project excellence."
      ]
    }
  },
  {
    layout: "table",
    transition: "slide",
    section: "Section 03",
    title: "The Vibe Coding Tool Ecosystem",
    headers: ["Tool", "Focus Area", "Core Presentation Strength"],
    rows: [
      ["<strong>Cursor</strong>", "AI-first Code Editor", "Codebase indexing, in-context chat, and multi-file diff edits."],
      ["<strong>Replit Agent</strong>", "Rapid Prototyping", "Creates apps from ideas, wiring databases and deploys instantly."],
      ["<strong>GitHub Copilot</strong>", "Task-Based Agents", "Translates issues directly into complete PR execution plans."],
      ["<strong>Google Gemini</strong>", "Creative Ideation", "Large context window ideal for absorbing entire architectures."]
    ]
  },
  {
    layout: "grid-2-columns",
    transition: "slide",
    section: "Section 04",
    title: "Core Advantages of the Vibe Approach",
    column1: [
      "<strong>Extreme Prototyping Speed</strong><br>Build responsive user interfaces, fully functional web applications, and database integrations in hours instead of days.",
      "<strong>Democratized Application Creation</strong><br>Enables product managers, designers, and experts to test concepts and create tools without code-syntax boundaries."
    ],
    column2: [
      "<strong>Lowered Cognitive Overhead</strong><br>Frees minds from repetitive boilerplate typing, configuration script setup, and manual API bindings.",
      "<strong>Focus on Curation & Taste</strong><br>Spends energy on visual aesthetics, micro-interactions, responsive sizing, and elegant customer flows."
    ]
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "Section 04",
    title: "Risks and Challenges",
    intro: "Directing AI requires high-level verification. Unchecked prompts can lead to serious production issues:",
    card1: {
      title: "Technical Debt & Quality",
      badge: "📉 Code",
      themeColor: "var(--google-red)",
      badgeClass: "badge-red",
      items: [
        "AI can build 'black boxes' full of redundant code blocks.",
        "Inefficient code structures can degrade page load times."
      ]
    },
    card2: {
      title: "Security & Skills",
      badge: "🔒 Risks",
      themeColor: "#b06000",
      badgeClass: "badge-yellow",
      items: [
        "AI can miss validation checks, exposing access control vulnerabilities.",
        "Over-reliance can weaken basic developer logic and language syntax."
      ]
    }
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "Section 05",
    title: "Best Practices &bull; Context & Validation",
    intro: "To produce professional-grade software using 'Vibe' methods, engineers should implement strict guardrails:",
    card1: {
      title: "1. Context Management",
      badge: "🔍 Scope",
      themeColor: "var(--google-blue)",
      badgeClass: "badge-blue",
      items: [
        "Provide exact database schemas and files to ground AI.",
        "Break features into small, testable micro-milestones."
      ]
    },
    card2: {
      title: "2. Code Verification",
      badge: "🧪 Quality",
      themeColor: "var(--google-green)",
      badgeClass: "badge-green",
      items: [
        "Review codebase diffs carefully before accepting merges.",
        "Write automated unit and functional tests early."
      ]
    }
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "Section 05",
    title: "Best Practices &bull; Security & Taste",
    intro: "Continuing our production-grade architectural rules:",
    card1: {
      title: "3. Secret & Variable Security",
      badge: "🔑 Rules",
      themeColor: "var(--google-red)",
      badgeClass: "badge-red",
      items: [
        "Never include API keys or private tokens inside text prompts.",
        "Force configurations into secure `.env` files and ignore them."
      ]
    },
    card2: {
      title: "4. Curation & Product Taste",
      badge: "🎨 Visuals",
      themeColor: "var(--google-yellow)",
      badgeClass: "badge-yellow",
      items: [
        "Control typography, spacing, and grid boundaries carefully.",
        "Incorporate responsive layouts and tactile micro-animations."
      ]
    }
  },
  {
    layout: "conclusion",
    transition: "fade",
    badge: "Future Outlook",
    title: "The Developer of the Future <br>is a <span style='color: var(--google-green);'>Curation Director</span>",
    subtitle: "Let's build beautiful, elegant applications together.",
    thankYou: "Thank You!"
  }
];

// Export to window object for browser import
window.slidesData = slidesData;
