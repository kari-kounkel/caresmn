// caresmn.com — the empire's front door.
// White, clean, very tidy. Generous whitespace = visual "order."
// Palette RE-REFRESHED 2026 — moved to TWO neon accents only: blue + green.
// Kari's call: "too much color... blue neon and green neon."
// Same key names (orange/gold/slate) preserved so downstream code doesn't break —
// the *values* now carry blue + green only. If you're reading these key names
// literally, don't — they're role slots: `orange` = primary CTA (blue),
// `gold` = tertiary accent (green), `slate` = secondary (deep green).
export const B = {
  // base — pure, tidy white with two whisper-soft neon tints for raised panels
  white: "#ffffff",
  paper: "#fbfcff",        // barely-cool page wash (used sparingly)
  warm: "#eef7ff",         // soft blue tint — hero/accent panels
  cool: "#eefdf3",         // soft green tint — secondary panels (was pink)
  card: "#ffffff",         // cards sit white on tint

  // ink
  ink: "#0a0a14",          // headlines, body
  inkSoft: "#0f172a",      // secondary text
  muted: "#64748b",        // muted body / labels
  faint: "#94a3b8",        // captions

  // accents — BLUE + GREEN only
  orange: "#0080ff",       // primary CTA (semantic slot: NEON BLUE)
  orangeBright: "#00b7ff", // hover
  orangeDeep: "#0052cc",   // pressed
  gold: "#22c55e",         // tertiary accent (semantic slot: NEON GREEN)
  goldSoft: "#86efac",     // green hover / lighter
  slate: "#16a34a",        // secondary accent (semantic slot: DEEP GREEN)
  slateDeep: "#15803d",    // darker green for pressed

  // hairlines
  rule: "#e2e8f0",         // hairline on white/paper
  ruleCool: "#dde7f5",     // hairline on cool panels
};

// Per-door accent — the 5 doors now alternate between blue and green tints only.
// Order matches the spec. No more pink/orange in the door system.
export const DOOR_TINT = {
  learn:     { ink: "#0052cc", tint: "#eef7ff", line: "#c5e2ff" }, // neon blue
  build:     { ink: "#16a34a", tint: "#eefdf3", line: "#b8f0cf" }, // neon green
  resources: { ink: "#00b7ff", tint: "#e6f9ff", line: "#b3e6f7" }, // neon blue-hot
  shop:      { ink: "#15803d", tint: "#e9fbef", line: "#a7ecc0" }, // deep green
  community: { ink: "#0080ff", tint: "#e8f4ff", line: "#c5e2ff" }, // neon blue (matches learn family)
};

// Type — matches tools.caresmn.com neon system.
// DM Serif Display for display (editorial serif), Figtree for body, DM Mono for meta.
// Fraunces + Inter still available for pages that need the calmer feel.
export const SERIF = "'DM Serif Display', 'Fraunces', Georgia, serif";
export const SANS =
  "'Figtree', 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
export const MONO = "'DM Mono', 'Courier New', monospace";

// Soft, tidy elevation — kept as-is; the "order" side of the brand.
export const SHADOW = "0 1px 2px rgba(10,10,20,0.04), 0 8px 24px rgba(10,10,20,0.06)";
export const SHADOW_LIFT = "0 2px 4px rgba(10,10,20,0.05), 0 18px 40px rgba(10,10,20,0.10)";

// Neon glow — blue + green only. GLOW_PINK / GLOW_ORANGE kept as aliases so any
// existing imports keep working; they now emit green.
export const GLOW_BLUE = "0 4px 14px rgba(0,128,255,0.4), 0 0 24px rgba(0,128,255,0.15)";
export const GLOW_GREEN = "0 4px 14px rgba(34,197,94,0.4), 0 0 24px rgba(34,197,94,0.15)";
export const GLOW_PINK = GLOW_GREEN;   // legacy alias — retargeted to green
export const GLOW_ORANGE = GLOW_GREEN; // legacy alias — retargeted to green

// Standard layout rails.
export const MAXW = 1120;
export const PAD = "clamp(20px, 5vw, 40px)";
