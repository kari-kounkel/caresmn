import { B, SERIF, SANS } from "../brand";
import { go } from "../router";

// Light ecosystem footer — the map of the empire, kept quiet.
const LINKS = [
  { label: "Home", href: "/", internal: true },
  { label: "Learn", href: "/learn", internal: true },
  { label: "Build", href: "/build", internal: true },
  { label: "Resources — tools.caresmn.com", href: "https://tools.caresmn.com" },
  { label: "Shop — karikounkel.shop", href: "https://karikounkel.shop" },
  { label: "Community — CARES Works", href: "https://tools.caresmn.com" },
];

export default function Footer() {
  return (
    <footer style={{ background: B.ink, color: "rgba(255,255,255,0.72)", padding: "clamp(40px, 6vw, 64px) clamp(20px, 5vw, 40px) 36px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 22, color: "#fff", letterSpacing: "-0.01em" }}>
              CARES Consulting
            </div>
            <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.6, margin: "10px 0 0", color: "rgba(255,255,255,0.66)" }}>
              We turn business chaos into working systems — then work ourselves out of a job. Systems, teams, and AI used with intention.
            </p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={l.internal ? (e) => { e.preventDefault(); go(l.href); } : undefined}
                style={{ fontFamily: SANS, fontSize: 14.5, color: "rgba(255,255,255,0.78)", textDecoration: "none" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "28px 0 18px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
          <span>© {YEAR} CARES Consulting Inc. All rights reserved.</span>
          <span>Built with intention · caresmn.com</span>
        </div>
      </div>
    </footer>
  );
}

// Static stamp — avoids a runtime clock and keeps the build deterministic.
const YEAR = 2026;
