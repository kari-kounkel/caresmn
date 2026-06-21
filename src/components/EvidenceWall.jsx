import { useState } from "react";
import { B, SERIF, SANS, SHADOW, SHADOW_LIFT } from "../brand";
import { EVIDENCE } from "../content/evidence";

// THE EVIDENCE WALL — "look what already exists," not "buy this."
// Show, don't sell: every card is a thing that's real, not an adjective.
export default function EvidenceWall() {
  return (
    <section style={{ background: B.paper, borderTop: `1px solid ${B.rule}`, padding: "clamp(48px, 8vw, 88px) clamp(20px, 5vw, 40px)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.orange, margin: "0 0 12px" }}>
          The evidence wall
        </p>
        <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em", color: B.ink, margin: 0, lineHeight: 1.1 }}>
          Look what already exists.
        </h2>
        <p style={{ fontFamily: SANS, fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.6, color: B.inkSoft, margin: "14px 0 0", maxWidth: 620 }}>
          Not a sales shelf — a record. Real builds, real tools, real workbooks, already
          in real hands. This is what "working systems" looks like once the chaos clears.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "clamp(14px, 2vw, 22px)",
            marginTop: 36,
          }}
        >
          {EVIDENCE.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        textDecoration: "none",
        background: B.card,
        border: `1px solid ${B.rule}`,
        borderRadius: 14,
        padding: "20px 20px 18px",
        boxShadow: hover ? SHADOW_LIFT : SHADOW,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <span
        style={{
          alignSelf: "flex-start",
          fontFamily: SANS,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: B.orange,
          background: B.warm,
          border: `1px solid #f0d6c4`,
          borderRadius: 999,
          padding: "3px 10px",
        }}
      >
        {item.kind}
      </span>
      <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 21, color: B.ink, margin: 0, letterSpacing: "-0.01em" }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.55, color: B.inkSoft, margin: 0, flex: 1 }}>
        {item.blurb}
      </p>
      <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 600, color: hover ? B.orangeBright : B.orange }}>
        See it →
      </span>
    </a>
  );
}
