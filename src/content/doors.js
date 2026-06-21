// The Five Doors — the intent router. Five doors max up top; all depth is
// exactly ONE layer down. Nothing piled on the porch.
//
// Taxonomy rule (locked):
//   Resources = FREE / DIY   ·   Shop = PAID products   ·
//   Learn = TOPICS that route to free / paid / Build.

export const DOORS = [
  {
    key: "learn",
    label: "Learn",
    intent: "Get better at this.",
    blurb:
      "Six skill pillars for the business problems nobody taught you. Each one routes to a free resource, a paid product, or a Build engagement.",
    kind: "internal",
    to: "/learn",
    cta: "Explore the pillars",
  },
  {
    key: "build",
    label: "Build",
    intent: "Build it — or fix it — for me.",
    blurb:
      "Done-with-you and done-for-you systems. Workflow design, documentation, AI implementation, and Vibe Coding — ideas turned into working systems.",
    kind: "internal",
    to: "/build",
    cta: "See what we build",
  },
  {
    key: "resources",
    label: "Resources",
    intent: "Give me tools to do it myself.",
    blurb:
      "Templates, downloads, SOP libraries, and live cockpit tools. Free and DIY — open the toolkit and take what you need.",
    kind: "external",
    href: "https://tools.caresmn.com",
    cta: "Open the toolkit",
  },
  {
    key: "shop",
    label: "Shop",
    intent: "I want to buy something.",
    blurb:
      "Workbooks, business kits, courses, and downloads. The paid shelf — finished products you can own today.",
    kind: "external",
    href: "https://karikounkel.shop",
    cta: "Visit the shop",
  },
  {
    key: "community",
    label: "Community",
    intent: "I want to belong.",
    blurb:
      "CARES Works — where businesses come to get their superpowers. A membership of owners building real systems together.",
    kind: "external",
    href: "https://tools.caresmn.com",
    cta: "Join CARES Works",
  },
];

// LEARN — six pillars, one layer down. Each names where it routes.
export const LEARN_PILLARS = [
  {
    title: "How To Business",
    body: "The operating fundamentals — money, structure, decisions — explained without the jargon.",
    routes: "Free guides → paid workbooks",
  },
  {
    title: "AI Prompting",
    body: "Get real work out of Claude and ChatGPT. Prompts, patterns, and guardrails that hold up.",
    routes: "Free resources → Build training",
  },
  {
    title: "Communication",
    body: "Scripts and templates for the hard conversations: clients, vendors, and your own team.",
    routes: "Free templates → paid kits",
  },
  {
    title: "Management",
    body: "Run the place on purpose — delegation, accountability, and the boring rhythms that work.",
    routes: "Free guides → Build engagement",
  },
  {
    title: "Team Building",
    body: "Hire, onboard, and keep good people. The systems that make a team more than a payroll list.",
    routes: "Free resources → paid courses",
  },
  {
    title: "Systems",
    body: "The throughline: turn the way you work into something written down, repeatable, and handed off.",
    routes: "Free SOPs → Build the system",
  },
];

// BUILD — services, one layer down.
export const BUILD_SERVICES = [
  { title: "Workflow Design", body: "Map how work actually moves, then design the path it should take." },
  { title: "Process Improvement", body: "Find the friction, cut the steps that don't earn their keep." },
  { title: "Documentation", body: "Turn what's in your head into SOPs your team can run without you." },
  { title: "AI Implementation", body: "Put AI to work inside the mission — as a tool, not a gimmick." },
  { title: "Team Systems", body: "The roles, handoffs, and checklists that make a team self-running." },
  { title: "Operations Consulting", body: "The whole machine — assess, build, train, exit, check in." },
];

// BUILD — AI offerings, one layer down. Vibe Coding is the headline.
export const BUILD_AI = [
  { title: "Vibe Coding", body: "Ideas into working systems with AI — not traditional development. The fast path from “what if” to “it works.”", flag: true },
  { title: "AI Foundations", body: "For beginners — what AI is, what it isn't, and how to start using it safely today." },
  { title: "Copilot Training", body: "Get your team productive with Microsoft Copilot inside the tools they already use." },
  { title: "Claude & ChatGPT Training", body: "Hands-on training on the assistants that do the most for small teams." },
  { title: "AI Team Implementation", body: "Roll AI out across a team with roles, guardrails, and adoption that sticks." },
];
