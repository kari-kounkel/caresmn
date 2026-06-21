// caresmn.com — the empire's front door.
// White, clean, very tidy. Generous whitespace = visual "order."
// Palette is the canonical CARES identity (orange / slate / gold) pulled from
// the live CARES Works surface, used as ACCENTS ONLY on a white page.
export const B = {
  // base — pure, tidy white with two whisper-soft tints for raised panels
  white: "#ffffff",
  paper: "#faf8f4",        // barely-warm page wash (used sparingly)
  warm: "#fdf0e8",         // warm CARES tint — hero/accent panels
  cool: "#eef0f6",         // cool slate tint — secondary panels
  card: "#ffffff",         // cards sit white on tint

  // ink
  ink: "#1e1e2a",          // headlines, body
  inkSoft: "#3d4560",      // secondary text
  muted: "#5a6481",        // muted body / labels
  faint: "#7a7585",        // captions

  // accents (CARES identity)
  orange: "#c95f22",       // primary CTA / action
  orangeBright: "#e8773a", // hover
  orangeDeep: "#a84a16",   // pressed
  gold: "#C9A84C",         // tertiary accent / evidence
  goldSoft: "#e0c060",
  slate: "#5a6481",        // secondary accent
  slateDeep: "#3d4560",

  // hairlines
  rule: "#ece8e0",         // hairline on white/paper
  ruleCool: "#e2e6f0",     // hairline on cool panels
};

// Per-door accent — the 5 doors each carry a quiet tint so the router reads
// at a glance without shouting. Order matches the spec.
export const DOOR_TINT = {
  learn:     { ink: "#a84a16", tint: "#fdf0e8", line: "#f0d6c4" }, // orange
  build:     { ink: "#3d4560", tint: "#eef0f6", line: "#dde2ee" }, // slate
  resources: { ink: "#7a6a1f", tint: "#f7f1dd", line: "#e9dcb0" }, // gold
  shop:      { ink: "#9c4f2a", tint: "#fbeae0", line: "#efd2c2" }, // terracotta
  community: { ink: "#46506e", tint: "#eef1f7", line: "#dde2ef" }, // indigo-slate
};

// Type — Fraunces (warm editorial serif = credible, human) for display,
// Inter (clean neutral sans) for everything functional.
export const SERIF = "'Fraunces', Georgia, serif";
export const SANS =
  "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

// Soft, tidy elevation — no hard comic shadows here; this is the calm
// "order" side of the brand.
export const SHADOW = "0 1px 2px rgba(30,30,42,0.04), 0 8px 24px rgba(30,30,42,0.06)";
export const SHADOW_LIFT = "0 2px 4px rgba(30,30,42,0.05), 0 18px 40px rgba(30,30,42,0.10)";

// Standard layout rails.
export const MAXW = 1120;
export const PAD = "clamp(20px, 5vw, 40px)";
