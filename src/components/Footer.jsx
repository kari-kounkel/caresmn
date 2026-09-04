import { B, SERIF, SANS, MONO } from "../brand";
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

// Contact block — matches the business card exactly. If any of this changes,
// the card and this list have to move together.
const CONTACT = [
  { label: "651.334.1300", href: "tel:+16513341300" },
  { label: "kari@caresmn.com", href: "mailto:kari@caresmn.com" },
  { label: "caresmn.com", href: "https://caresmn.com" },
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

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              Get in touch
            </div>
            {CONTACT.map((c) => (
              <a
                key={c.label}
                href={c.href}
                style={{ fontFamily: SANS, fontSize: 14.5, color: "rgba(255,255,255,0.78)", textDecoration: "none" }}
              >
                {c.label}
              </a>
            ))}
            <div style={{ fontFamily: SANS, fontSize: 14.5, color: "rgba(255,255,255,0.6)" }}>
              Saint Paul, MN
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 17, color: B.goldSoft, marginTop: 6 }}>
              Clear today. Stronger tomorrow.
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "28px 0 18px" }} />

        {/* Signature block — the same pill + IP notice every Kari-built product
            carries (see SignatureFooter in the cares-works repo).

            PENDING (9/4/2026): Kari has applied for a new EIN under
            "K Co Creative LLC". Once it is issued, the entity line below
            changes — and so does the matching line in the cares-works
            SignatureFooter and anywhere else this boilerplate appears.
            Change them together; they are supposed to agree. */}
        <div style={{ textAlign: "center", padding: "18px 0 6px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "10px 26px",
              background: `linear-gradient(135deg, ${B.orange}, ${B.slate})`,
              borderRadius: 100,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 6px 20px rgba(0,128,255,0.35)",
              marginBottom: 22,
            }}
          >
            BUILT FOR BUSINESS &nbsp;·&nbsp; BACKED BY CARES
          </div>
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
            }}
          >
            caresmn.com — proprietary property of Kari Hoglund Kounkel LLC &amp; CARES Consulting, Inc.
            <br />© {YEAR}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

// Static stamp — avoids a runtime clock and keeps the build deterministic.
const YEAR = 2026;
