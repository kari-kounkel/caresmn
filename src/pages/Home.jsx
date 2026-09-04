import { useState } from "react";
import { B, SERIF, SANS, SHADOW, SHADOW_LIFT, DOOR_TINT, NEON_RGB, BTN_GLOW_BLUE } from "../brand";
import { DOORS } from "../content/doors";
import { go } from "../router";
import Nav from "../components/Nav";
import ChaosHero from "../components/ChaosHero";
import ForecasterDemo from "../components/ForecasterDemo";
import EvidenceWall from "../components/EvidenceWall";
import FounderCard from "../components/FounderCard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <ChaosHero />
      <DoorsDetail />
      <ForecasterDemo />
      <EvidenceWall />
      <FounderCard />
      <CTAStrip />
      <Footer />
    </>
  );
}

// The five doors, full treatment — the intent router with room to breathe.
function DoorsDetail() {
  return (
    <section id="doors" style={{ background: "transparent", padding: "clamp(48px, 8vw, 88px) clamp(20px, 5vw, 40px)", scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.orange, margin: "0 0 12px" }}>
          Five doors
        </p>
        <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em", color: B.ink, margin: 0, lineHeight: 1.1 }}>
          Tell us why you're here.
        </h2>
        <p style={{ fontFamily: SANS, fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.6, color: B.inkSoft, margin: "14px 0 0", maxWidth: 620 }}>
          One of these is you today. Pick the door — everything you need is one step inside.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(14px, 2vw, 22px)",
            marginTop: 36,
          }}
        >
          {DOORS.map((d) => (
            <DoorCard key={d.key} door={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DoorCard({ door }) {
  const [hover, setHover] = useState(false);
  const tint = DOOR_TINT[door.key];
  const click = (e) => {
    e.preventDefault();
    if (door.kind === "internal") go(door.to);
    else window.location.href = door.href;
  };
  return (
    <a
      href={door.kind === "internal" ? door.to : door.href}
      onClick={click}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        background: B.white,
        // Neon outline + layered glow, same construction as NeonBox in the
        // toolkit. Each door keeps its own accent; hover just turns it up.
        border: `2px solid ${tint.ink}`,
        borderRadius: 14,
        padding: "clamp(20px, 2.4vw, 28px)",
        boxShadow: hover
          ? `0 0 28px ${tint.ink}55, 0 0 60px ${tint.ink}22, inset 0 0 18px ${tint.ink}08`
          : `0 0 20px ${tint.ink}3d, 0 0 44px ${tint.ink}1f, inset 0 0 18px ${tint.ink}08`,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 25, color: tint.ink, letterSpacing: "-0.01em" }}>
          {door.label}
        </span>
        <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: B.faint, background: tint.tint, borderRadius: 999, padding: "4px 10px" }}>
          {door.kind === "external" ? "Opens ↗" : "Step in"}
        </span>
      </div>
      <p style={{ fontFamily: SERIF, fontSize: 17, fontStyle: "italic", color: B.inkSoft, margin: "0 0 10px" }}>
        “{door.intent}”
      </p>
      <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.55, color: B.muted, margin: 0, flex: 1 }}>
        {door.blurb}
      </p>
      <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: hover ? B.orangeBright : B.orange, marginTop: 16 }}>
        {door.cta} →
      </span>
    </a>
  );
}

// Closing strip — the ASK™ widget handles live objections; this points to it
// and to a real conversation.
function CTAStrip() {
  return (
    <section style={{ background: "transparent", borderTop: `1px solid ${B.ruleCool}`, padding: "clamp(44px, 7vw, 80px) clamp(20px, 5vw, 40px)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(24px, 4vw, 38px)", letterSpacing: "-0.02em", color: B.ink, margin: 0, lineHeight: 1.12 }}>
          Not sure which door is yours?
        </h2>
        <p style={{ fontFamily: SANS, fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.6, color: B.inkSoft, margin: "14px auto 26px", maxWidth: 540 }}>
          Tell us what's buried under the chaos. Ask™ — bottom-right corner — will point you to the
          right resource, product, or build. Or reach a human directly.
        </p>
        <a
          href="https://tools.caresmn.com"
          style={{
            display: "inline-block",
            fontFamily: SANS,
            fontSize: 15.5,
            fontWeight: 600,
            color: "#fff",
            background: B.orange,
            textDecoration: "none",
            padding: "14px 28px",
            borderRadius: 10,
            boxShadow: BTN_GLOW_BLUE,
          }}
        >
          Start with the toolkit
        </a>
      </div>
    </section>
  );
}
