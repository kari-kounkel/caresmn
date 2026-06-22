import { useEffect, useState } from "react";
import { B, SERIF, SANS, SHADOW, SHADOW_LIFT, DOOR_TINT } from "../brand";
import { DOORS } from "../content/doors";
import { go } from "../router";

// Sticky-note palette + handwriting face — the scattered tiles read as a pile
// of Post-its, not UI chips.
const HAND = "'Caveat', 'Comic Sans MS', cursive";
const POSTIT = ["#fff59d", "#ffc9de", "#bfe3ff", "#c8f3c0", "#ffd59e", "#e6d2ff"];

// The chaos tiles — the everyday mess of running a business. Hand-placed so
// the scatter reads the same every load (scattered, tilted, overlapping).
const TILES = [
  { t: "Sticky notes", x: 6,  y: 8,  r: -11 },
  { t: "Spreadsheets", x: 70, y: 4,  r: 9 },
  { t: "Payroll",      x: 38, y: 2,  r: -5 },
  { t: "SOPs",         x: 84, y: 30, r: 14 },
  { t: "Prompts",      x: 2,  y: 40, r: 7 },
  { t: "Invoices",     x: 52, y: 30, r: -13 },
  { t: "Apps",         x: 24, y: 26, r: 12 },
  { t: "Emails",       x: 90, y: 62, r: -8 },
  { t: "Passwords",    x: 12, y: 70, r: 10 },
  { t: "Receipts",     x: 44, y: 64, r: -6 },
  { t: "Tasks",        x: 66, y: 70, r: 13 },
  { t: "Contracts",    x: 30, y: 84, r: -10 },
  { t: "Schedules",    x: 78, y: 88, r: 6 },
  { t: "Onboarding",   x: 56, y: 90, r: -12 },
];

function prefersReduced() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function ChaosHero() {
  // phase: "chaos" → tiles jitter; "order" → tiles snap away, doors resolve in.
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (prefersReduced()) {
      setOrdered(true);
      return;
    }
    // Let the scattered Post-its sit and jitter long enough to register —
    // especially on phones where the whole thing flies by.
    const t = setTimeout(() => setOrdered(true), 4400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${B.warm} 0%, ${B.white} 78%)`,
        borderBottom: `1px solid ${B.rule}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "clamp(32px, 5vw, 60px) clamp(20px, 5vw, 40px) clamp(40px, 6vw, 72px)",
          textAlign: "center",
        }}
      >
        {/* The logo — large and centered, the crest at the top of the page.
            It lives here and ONLY here; the nav wordmark fades in after it
            scrolls away, so the two are never in view at once. */}
        <img
          src="/cares-logo.png"
          alt="CARES Consulting"
          style={{
            height: "clamp(88px, 13vw, 132px)",
            width: "auto",
            display: "block",
            margin: "0 auto clamp(20px, 3vw, 32px)",
          }}
        />

        {/* Headline — the stable anchor; the promise the animation acts out. */}
        <p
          style={{
            fontFamily: SANS,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: B.orange,
            margin: "0 0 18px",
          }}
        >
          Systems, not chaos
        </p>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: "clamp(32px, 6vw, 58px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: B.ink,
            margin: "0 auto",
            maxWidth: 760,
          }}
        >
          We turn business chaos<br />into working systems.
        </h1>
        <p
          style={{
            fontFamily: SANS,
            fontSize: "clamp(16px, 2.2vw, 19px)",
            lineHeight: 1.6,
            color: B.inkSoft,
            margin: "20px auto 0",
            maxWidth: 560,
          }}
        >
          Better systems, stronger teams, smarter workflows. We build the machine,
          train your people, and work ourselves out of a job.
        </p>

        {/* JUST START — the whole philosophy in two words. You don't need it all
            figured out; you just need to begin. */}
        <div style={{ marginTop: "clamp(22px, 3vw, 30px)" }}>
          <button
            onClick={() => {
              const el = document.getElementById("doors");
              if (el) el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
            }}
            style={{
              fontFamily: SANS,
              fontSize: "clamp(15px, 2vw, 17px)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#fff",
              background: B.orange,
              border: "none",
              borderRadius: 999,
              padding: "15px 34px",
              cursor: "pointer",
              boxShadow: SHADOW_LIFT,
              transition: "background 0.18s ease, transform 0.18s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = B.orangeBright; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = B.orange; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Just Start →
          </button>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(15px, 2vw, 18px)", color: B.muted, margin: "14px 0 0" }}>
            That's all it takes.
          </p>
        </div>

        {/* The stage — chaos resolves into the five doors. */}
        <div
          aria-hidden="true"
          style={{
            position: "relative",
            height: "clamp(320px, 42vw, 380px)",
            margin: "clamp(28px, 4vw, 44px) auto 0",
            maxWidth: 920,
          }}
        >
          {/* Chaos layer — a scattered pile of Post-it notes. */}
          {TILES.map((tile, i) => (
            <span
              key={tile.t}
              className={ordered ? "" : "chaos-jitter"}
              style={{
                position: "absolute",
                left: `${tile.x}%`,
                top: `${tile.y}%`,
                fontFamily: HAND,
                fontSize: "clamp(16px, 3vw, 21px)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#3a352a",
                background: POSTIT[i % POSTIT.length],
                border: "none",
                borderRadius: 2,
                padding: "12px 16px 14px",
                whiteSpace: "nowrap",
                boxShadow: "1px 3px 7px rgba(40,30,10,0.20)",
                transformOrigin: "center",
                transform: ordered
                  ? "translate(-50%,-50%) scale(0.5)"
                  : `translate(-50%,-50%) rotate(${tile.r}deg)`,
                opacity: ordered ? 0 : 1,
                transition: "transform 1s cubic-bezier(.2,.9,.2,1), opacity 0.8s ease",
                transitionDelay: ordered ? `${i * 22}ms` : "0ms",
                animationDelay: `${(i % 6) * 0.17}s`,
                pointerEvents: "none",
              }}
            >
              {tile.t}
            </span>
          ))}

          {/* Order layer — the five doors resolve in. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "clamp(8px, 1.4vw, 16px)",
              alignContent: "center",
              opacity: ordered ? 1 : 0,
              transform: ordered ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(.2,.9,.2,1) 0.25s",
              pointerEvents: ordered ? "auto" : "none",
            }}
          >
            {DOORS.map((d) => {
              const tint = DOOR_TINT[d.key];
              return (
                <DoorMini key={d.key} door={d} tint={tint} />
              );
            })}
          </div>
        </div>

        <p
          style={{
            fontFamily: SANS,
            fontSize: 13,
            color: B.faint,
            margin: "clamp(20px, 3vw, 30px) 0 0",
            opacity: ordered ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          Pick a door. Everything lives one step in — nothing piled on the porch.
        </p>
      </div>

      <style>{`
        @keyframes chaosJitter {
          0%   { margin: 0 0 0 0;     }
          25%  { margin: -5px 0 0 3px;  }
          50%  { margin: 4px 0 0 -3px;  }
          75%  { margin: -3px 0 0 2px;  }
          100% { margin: 0 0 0 0;     }
        }
        .chaos-jitter { animation: chaosJitter 1.7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .chaos-jitter { animation: none; }
        }
      `}</style>
    </section>
  );
}

function DoorMini({ door, tint }) {
  const [hover, setHover] = useState(false);
  const open = (e) => {
    e.preventDefault();
    if (door.kind === "internal") go(door.to);
    else window.location.href = door.href;
  };
  return (
    <a
      href={door.kind === "internal" ? door.to : door.href}
      onClick={open}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        textDecoration: "none",
        background: tint.tint,
        border: `1px solid ${tint.line}`,
        borderRadius: 12,
        padding: "clamp(12px, 1.6vw, 18px) clamp(8px, 1vw, 12px)",
        minHeight: "clamp(96px, 13vw, 132px)",
        boxShadow: hover ? SHADOW_LIFT : SHADOW,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <span
        style={{
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: "clamp(15px, 1.9vw, 20px)",
          color: tint.ink,
          letterSpacing: "-0.01em",
        }}
      >
        {door.label}
      </span>
      <span
        style={{
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.2vw, 12.5px)",
          lineHeight: 1.35,
          color: B.muted,
        }}
      >
        {door.intent}
      </span>
    </a>
  );
}
