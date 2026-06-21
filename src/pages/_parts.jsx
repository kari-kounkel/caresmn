import { useState } from "react";
import { B, SERIF, SANS, SHADOW, SHADOW_LIFT } from "../brand";
import { go } from "../router";

// Shared furniture for the one-layer-down door pages (Learn / Build).

export function DoorHero({ eyebrow, title, lead, tint, line }) {
  return (
    <section style={{ background: `linear-gradient(180deg, ${tint} 0%, ${B.white} 100%)`, borderBottom: `1px solid ${line}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(40px, 6vw, 72px) clamp(20px, 5vw, 40px) clamp(32px, 4vw, 48px)" }}>
        <BackLink subtle />
        <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.orange, margin: "18px 0 12px" }}>
          {eyebrow}
        </p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(30px, 5vw, 50px)", letterSpacing: "-0.02em", color: B.ink, margin: 0, lineHeight: 1.06, maxWidth: 720 }}>
          {title}
        </h1>
        <p style={{ fontFamily: SANS, fontSize: "clamp(16px, 2.2vw, 19px)", lineHeight: 1.6, color: B.inkSoft, margin: "18px 0 0", maxWidth: 640 }}>
          {lead}
        </p>
      </div>
    </section>
  );
}

export function BackLink({ subtle }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="/"
      onClick={(e) => { e.preventDefault(); go("/"); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: SANS,
        fontSize: 14.5,
        fontWeight: 500,
        color: hover ? B.orange : (subtle ? B.muted : B.inkSoft),
        textDecoration: "none",
        transition: "color 0.15s ease",
      }}
    >
      <span style={{ transform: hover ? "translateX(-2px)" : "translateX(0)", transition: "transform 0.15s ease" }}>←</span>
      Back to the five doors
    </a>
  );
}

export function GridCard({ title, body, routes }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: B.white,
        border: `1px solid ${B.rule}`,
        borderRadius: 14,
        padding: "20px 20px 18px",
        boxShadow: hover ? SHADOW_LIFT : SHADOW,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: 9,
        height: "100%",
      }}
    >
      <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 21, color: B.ink, margin: 0, letterSpacing: "-0.01em" }}>
        {title}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.55, color: B.inkSoft, margin: 0, flex: 1 }}>
        {body}
      </p>
      {routes && (
        <p style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", color: B.muted, margin: "4px 0 0", paddingTop: 10, borderTop: `1px solid ${B.rule}` }}>
          {routes}
        </p>
      )}
    </div>
  );
}
