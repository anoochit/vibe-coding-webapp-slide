// slides_data.js - Slide Content and Data for Vibe Coding Presentation (Updated)

const slidesData = [
  {
    layout: "title",
    transition: "fade",
    badge: "Slides",
    title: "Web Application <br>Development with <br><span style='color: var(--google-blue);'>Vibe</span> <span style='color: var(--google-red);'>Co</span><span style='color: var(--google-yellow);'>di</span><span style='color: var(--google-green);'>ng</span>",
    subtitle: "A Modern Paradigm Shift in Software Engineering",
    presenter: "Anuchit Chalothorn"
  },
  {
    layout: "quote",
    transition: "slide",
    section: "Section 01",
    title: 'What is "Vibe Coding"?',
    intro: "A conversational, prompt-driven workflow where humans act as high-level creators and AI executes line-by-line implementations.",
    quote: "Fully give in to the vibes, embrace exponentials, and forget that the code even exists.",
    author: "Andrej Karpathy, Co-founder of OpenAI"
  },
  {
    layout: "table",
    transition: "slide",
    section: "Section 03",
    title: "The 2026 Vibe Coding Ecosystem",
    headers: ["Platform", "Category", "2026 Capability", "Examples"],
    rows: [
      ["<strong>Agentic IDEs</strong>", "Local Orchestration", "Multi-file refactoring, deep indexing.", "Cursor, Windsurf"],
      ["<strong>Agy & Orchestration</strong>", "The Brain", "Intent and state management.", "Agy, Genkit, Vercel AI SDK"],
      ["<strong>Frontend Generators</strong>", "UI/UX Prototyping", "Rapid scaffolding of UIs.", "Bolt.new, v0.dev, Replit Agent"],
      ["<strong>Coding Agents</strong>", "Atomic Execution", "Complex, multi-step task execution.", "Devin, OpenDevin"],
      ["<strong>Cloud Agents</strong>", "Execution & Infra", "Scaffolding of backends/CI/CD.", "Firebase App Hosting, Vercel"]
    ]
  },
  {
    layout: "list",
    transition: "slide",
    section: "Section 04",
    title: "Tool Categorization & Usage",
    intro: "Understanding the role of each tool class:",
    items: [
      "<strong>Agentic IDEs</strong>: Core workspaces with deep file system integration.",
      "<strong>Frontend Generators</strong>: Fast UI and skeleton creation.",
      "<strong>Orchestration Platforms</strong>: The 'brain' managing intent and state.",
      "<strong>Autonomous Coding Agents</strong>: Task-focused execution (e.g., bug fixing).",
      "<strong>Autonomous Cloud Agents</strong>: Streamlined deployment and infrastructure."
    ]
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "Section 10",
    title: "Spec-Driven Development (SDD)",
    intro: "Evolving the vibe into architectural discipline:",
    card1: {
      title: "The Four Pillars",
      badge: "🛡️ Reliability",
      themeColor: "var(--google-blue)",
      badgeClass: "badge-blue",
      items: ["Specify Intent", "Plan Architecture", "Taskify Development", "Implement & Test"]
    },
    card2: {
      title: "Three Levels of Maturity",
      badge: "📈 Scale",
      themeColor: "var(--google-yellow)",
      badgeClass: "badge-yellow",
      items: ["Level 1: Spec-First", "Level 2: Spec-Anchored", "Level 3: Spec-as-Source"]
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
