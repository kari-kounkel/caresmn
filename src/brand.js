// caresmn.com — the empire's front door.
// White, clean, very tidy. Generous whitespace = visual "order."
// Palette REFRESHED 2026-07-18 to match tools.caresmn.com neon identity.
// Same key names (orange/gold/slate) preserved so downstream code doesn't break —
// the *values* now carry the neon (blue / pink / orange) sampled from the CARES
// Works neon logo. If you're reading these key names literally, don't — they're
// role slots: `orange` = primary CTA, `gold` = tertiary accent, `slate` = secondary.
export const B = {
  // base — pure, tidy white with two whisper-soft neon tints for raised panels
  white: "#ffffff",
  paper: "#fbfcff",        // barely-cool page wash (used sparingly)
  warm: "#eef7ff",         // soft blue tint — hero/accent panels
  cool: "#fff0f6",         // soft pink tint — secondary panels
  card: "#ffffff",         // cards sit white on tint

  // ink
  ink: "#0a0a14",          // headlines, body
  inkSoft: "#0f172a",      // secondary text
  muted: "#64748b",        // muted body / labels
  faint: "#94a3b8",        // captions

  // accents (CARES Works neon identity)
  orange: "#0080ff",       // primary CTA / action (was orange → NEON BLUE)
  orangeBright: "#00b7ff", // hover (neon blue hot)
  orangeDeep: "#0052cc",   // pressed (neon blue dark)
  gold: "#ff8a2a",         // tertiary accent / evidence (was gold → NEON ORANGE)
  goldSoft: "#ffb47a",
  slate: "#ff2d8a",        // secondary accent (was slate → NEON PINK)
  slateDeep: "#d91d6d",

  // hairlines
  rule: "#e2e8f0",         // hairline on white/paper
  ruleCool: "#dde7f5",     // hairline on cool panels
};

// Per-door accent — the 5 doors each carry a quiet NEON tint so the router reads
// at a glance without shouting. Order matches the spec.
export const DOOR_TINT = {
  learn:     { ink: "#0052cc", tint: "#eef7ff", line: "#c5e2ff" }, // neon blue
  build:     { ink: "#d91d6d", tint: "#fff0f6", line: "#ffcfe0" }, // neon pink
  resources: { ink: "#f06d0a", tint: "#fff4ea", line: "#ffd7b3" }, // neon orange
  shop:      { ink: "#00b7ff", tint: "#e6f9ff", line: "#b3e6f7" }, // neon blue-hot
  community: { ink: "#ff2d8a", tint: "#fff2f6", line: "#ffcfe0" }, // neon pink-warm
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

// Neon glow — for CTA buttons + accent panels (from tools.caresmn.com system)
export const GLOW_BLUE = "0 4px 14px rgba(0,128,255,0.4), 0 0 24px rgba(0,128,255,0.15)";
export const GLOW_PINK = "0 4px 14px rgba(255,45,138,0.4), 0 0 24px rgba(255,45,138,0.15)";
export const GLOW_ORANGE = "0 4px 14px rgba(255,138,42,0.4), 0 0 24px rgba(255,138,42,0.15)";

// Standard layout rails.
export const MAXW = 1120;
export const PAD = "clamp(20px, 5vw, 40px)";
