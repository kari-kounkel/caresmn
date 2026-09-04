import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { B, SERIF, SANS, SHADOW, DOOR_TINT, ART_GLOW } from "../brand";
import { DOORS } from "../content/doors";
import { go } from "../router";

// Sticky-note palette + handwriting face — the scattered tiles read as a pile
// of Post-its, not UI chips.
const HAND = "'Caveat', 'Comic Sans MS', cursive";
const POSTIT = ["#fff59d", "#ffc9de", "#bfe3ff", "#c8f3c0", "#ffd59e", "#e6d2ff"];

// The chaos tiles — the everyday mess of running a business. Hand-placed so the
// scatter reads the same every load. x/y are percentages of the stage; they sit
// over the left-hand "desk" so the cabinet on the right stays clear.
const TILES = [
  { t: "Sticky notes", x: 11, y: 10, r: -11 },
  { t: "Spreadsheets", x: 44, y: 6,  r: 9 },
  { t: "Payroll",      x: 27, y: 30, r: -5 },
  { t: "SOPs",         x: 57, y: 24, r: 14 },
  { t: "Prompts",      x: 7,  y: 44, r: 7 },
  { t: "Invoices",     x: 39, y: 50, r: -13 },
  { t: "Apps",         x: 23, y: 66, r: 12 },
  { t: "Emails",       x: 55, y: 70, r: -8 },
  { t: "Passwords",    x: 9,  y: 82, r: 10 },
  { t: "Receipts",     x: 35, y: 84, r: -6 },
  { t: "Tasks",        x: 61, y: 46, r: 13 },
  { t: "Contracts",    x: 19, y: 52, r: -10 },
  { t: "Schedules",    x: 47, y: 90, r: 6 },
  { t: "Onboarding",   x: 64, y: 8,  r: -12 },
];

// Which drawer each note gets filed into — index into DOORS.
const drawerOf = (i) => i % DOORS.length;
const colorOf = (i) => POSTIT[i % POSTIT.length];

function prefersReduced() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function ChaosHero() {
  // phase: "chaos" → notes jitter on the desk; "order" → they file themselves.
  const [ordered, setOrdered] = useState(false);
  const [openKey, setOpenKey] = useState(null);

  // Drawer positions measured in px relative to the stage, so each note lands
  // in the real drawer instead of at a guessed percentage.
  const stageRef = useRef(null);
  const drawerRefs = useRef([]);
  const [targets, setTargets] = useState(null);

  useEffect(() => {
    if (prefersReduced()) {
      setOrdered(true);
      return;
    }
    // Let the pile sit long enough to register before it tidies itself.
    const t = setTimeout(() => setOrdered(true), 4200);
    return () => clearTimeout(t);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const s = stage.getBoundingClientRect();
      const next = drawerRefs.current.map((el) => {
        if (!el) return null;
        const d = el.getBoundingClientRect();
        return { x: d.left - s.left + d.width / 2, y: d.top - s.top + d.height / 2 };
      });
      if (next.length === DOORS.length && next.every(Boolean)) setTargets(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [openKey]);

  return (
    <section
      style={{
        background: `
          radial-gradient(ellipse at 15% 0%, rgba(0,128,255,0.10), transparent 55%),
          radial-gradient(ellipse at 85% 5%, rgba(34,197,94,0.07), transparent 55%),
          linear-gradient(180deg, ${B.warm} 0%, ${B.white} 82%)
        `,
        borderBottom: `1px solid ${B.ruleCool}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "clamp(28px, 4vw, 52px) clamp(20px, 5vw, 40px) clamp(36px, 5vw, 60px)",
        }}
      >
        {/* Lock-up: logo + the promise. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(18px, 3vw, 38px)",
            flexWrap: "wrap",
            marginBottom: "clamp(20px, 3vw, 34px)",
          }}
        >
          <img
            src="/cares-consulting-logo.png"
            alt="CARES Consulting Inc — Kari Hoglund Kounkel"
            style={{
              height: "clamp(120px, 15vw, 180px)",
              width: "auto",
              display: "block",
              borderRadius: 20,
              boxShadow: ART_GLOW,
              background: "#ffffff",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: "1 1 320px", minWidth: 260, textAlign: "left" }}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: B.orange,
                margin: "0 0 12px",
              }}
            >
              Systems, not chaos
            </p>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 600,
                fontSize: "clamp(28px, 4.4vw, 46px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: B.ink,
                margin: 0,
              }}
            >
              We turn business chaos<br />
              into{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${B.orange}, ${B.slate})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                working systems.
              </span>
            </h1>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.6,
                color: B.inkSoft,
                margin: "14px 0 0",
                maxWidth: 520,
              }}
            >
              Better systems, stronger teams, smarter workflows. We build the machine,
              train your people, and work ourselves out of a job.
            </p>
          </div>
        </div>

        {/* THE STAGE — a desk covered in notes on the left, and on the right the
            cabinet they file themselves into. */}
        <div
          ref={stageRef}
          className="cm-stage"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(250px, 0.66fr)",
            gap: "clamp(16px, 3vw, 40px)",
            alignItems: "center",
            minHeight: "clamp(340px, 38vw, 440px)",
          }}
        >
          {/* The desk. The call to action sits in the middle of the mess, and
              the notes scatter around it — so the left column carries weight
              instead of emptying out once everything files itself. */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("doors");
                if (el) el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
              }}
              style={{
                fontFamily: SANS,
                fontSize: "clamp(15px, 2vw, 17px)",
                fontWeight: 700,
                color: "#fff",
                background: B.orange,
                border: "none",
                padding: "15px 34px",
                borderRadius: 999,
                cursor: "pointer",
                boxShadow: "0 4px 18px rgba(0,128,255,0.55), 0 0 40px rgba(0,128,255,0.25)",
              }}
            >
              Just Start →
            </button>
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "clamp(15px, 2vw, 18px)",
                color: B.muted,
                margin: "14px 0 0",
              }}
            >
              That's all it takes.
            </p>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 13.5,
                lineHeight: 1.55,
                color: B.slate,
                margin: "22px auto 0",
                maxWidth: 300,
                opacity: ordered ? 1 : 0,
                transition: "opacity 0.7s ease 0.9s",
              }}
            >
              Desk clear. Nothing got thrown out — open a drawer and it's all
              still in there.
            </p>
          </div>

          <Cabinet
            openKey={openKey}
            setOpenKey={setOpenKey}
            drawerRefs={drawerRefs}
            ordered={ordered}
          />

          {/* The notes, flying from the desk into their drawer. */}
          {TILES.map((tile, i) => {
            const target = targets && targets[drawerOf(i)];
            const flying = ordered && !!target;
            const d = ordered ? i * 22 : 0;
            return (
              <span
                key={tile.t}
                aria-hidden="true"
                className={ordered ? "" : "chaos-jitter"}
                style={{
                  position: "absolute",
                  left: flying ? `${target.x}px` : `${tile.x}%`,
                  top: flying ? `${target.y}px` : `${tile.y}%`,
                  zIndex: 1, // under the drawer fronts, so they slide *inside*
                  fontFamily: HAND,
                  fontSize: "clamp(11.5px, 1.45vw, 14.5px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#3a352a",
                  // Real Post-its are one square whatever you write on them.
                  width: "clamp(80px, 9.8vw, 102px)",
                  height: "clamp(80px, 9.8vw, 102px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "9px 7px",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  // Faint adhesive strip along the top edge, like the real thing.
                  background: `linear-gradient(180deg, rgba(0,0,0,0.055) 0 13%, transparent 13%), ${colorOf(i)}`,
                  border: "none",
                  borderRadius: 2,
                  boxShadow: "1px 3px 7px rgba(40,30,10,0.20)",
                  transformOrigin: "center",
                  transform: flying
                    ? "translate(-50%,-50%) scale(0.3)"
                    : `translate(-50%,-50%) rotate(${tile.r}deg)`,
                  // They shrink toward the drawer and only fade at the very end,
                  // so you watch each one post itself through the front.
                  opacity: flying ? 0 : 1,
                  transition:
                    `left 0.85s cubic-bezier(.45,0,.2,1) ${d}ms,` +
                    `top 0.85s cubic-bezier(.45,0,.2,1) ${d}ms,` +
                    `transform 0.85s cubic-bezier(.45,0,.2,1) ${d}ms,` +
                    `opacity 0.28s ease ${d + 580}ms`,
                  pointerEvents: "none",
                }}
              >
                {tile.t}
              </span>
            );
          })}
        </div>

      </div>

      <style>{`
        @keyframes chaosJitter {
          0%   { margin: 0 0 0 0;      }
          25%  { margin: -5px 0 0 3px; }
          50%  { margin: 4px 0 0 -3px; }
          75%  { margin: -3px 0 0 2px; }
          100% { margin: 0 0 0 0;      }
        }
        .chaos-jitter { animation: chaosJitter 1.7s ease-in-out infinite; }
        @media (max-width: 880px) {
          .cm-stage { grid-template-columns: 1fr !important; min-height: 660px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chaos-jitter { animation: none; }
        }
      `}</style>
    </section>
  );
}

// The cabinet — five drawers, one per door. Closed, it's a labelled front.
// Open, it shows what got filed in there and where that door leads.
function Cabinet({ openKey, setOpenKey, drawerRefs, ordered }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        alignSelf: "center",
        background: `linear-gradient(180deg, #ffffff 0%, ${B.paper} 100%)`,
        border: `2px solid ${B.orange}`,
        borderRadius: 16,
        boxShadow:
          "0 0 22px rgba(0,128,255,0.24), 0 0 52px rgba(0,128,255,0.10), inset 0 0 20px rgba(0,128,255,0.03)",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity: ordered ? 1 : 0.6,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Cabinet top edge — enough to read as an object, not a list of buttons. */}
      <div
        aria-hidden="true"
        style={{
          height: 6,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${B.orange}, ${B.slate})`,
          opacity: 0.5,
          marginBottom: 2,
        }}
      />
      {DOORS.map((door, i) => (
        <Drawer
          key={door.key}
          door={door}
          tint={DOOR_TINT[door.key]}
          open={openKey === door.key}
          onToggle={() => setOpenKey(openKey === door.key ? null : door.key)}
          innerRef={(el) => (drawerRefs.current[i] = el)}
          filed={TILES.map((t, ti) => ({ ...t, i: ti })).filter((t) => drawerOf(t.i) === i)}
        />
      ))}
    </div>
  );
}

function Drawer({ door, tint, open, onToggle, innerRef, filed }) {
  const [hover, setHover] = useState(false);
  const enter = (e) => {
    e.preventDefault();
    if (door.kind === "internal") go(door.to);
    else window.location.href = door.href;
  };
  return (
    <div ref={innerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          textAlign: "left",
          background: tint.tint,
          border: `1.5px solid ${tint.line}`,
          borderRadius: 10,
          padding: "clamp(11px, 1.5vw, 15px) 14px",
          boxShadow: open ? `0 0 18px ${tint.ink}44` : SHADOW,
          transform: open ? "translateX(10px)" : hover ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.28s cubic-bezier(.3,1.1,.4,1), box-shadow 0.28s ease",
        }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: "clamp(16px, 1.9vw, 21px)",
            color: tint.ink,
            letterSpacing: "-0.01em",
            flex: 1,
          }}
        >
          {door.label}
        </span>
        {/* Drawer handle. */}
        <span
          aria-hidden="true"
          style={{
            width: 34,
            height: 7,
            borderRadius: 4,
            background: tint.ink,
            opacity: 0.35,
            flexShrink: 0,
          }}
        />
      </button>

      {/* Contents — the notes filed here, and where this door goes. */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 320 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.3s ease",
        }}
      >
        <div style={{ padding: "10px 12px 6px 22px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {filed.map((n) => (
              <span
                key={n.t}
                style={{
                  fontFamily: HAND,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#3a352a",
                  background: `linear-gradient(180deg, rgba(0,0,0,0.05) 0 16%, transparent 16%), ${colorOf(n.i)}`,
                  borderRadius: 2,
                  padding: "5px 9px 6px",
                  boxShadow: "1px 2px 4px rgba(40,30,10,0.18)",
                  transform: `rotate(${n.r / 5}deg)`,
                }}
              >
                {n.t}
              </span>
            ))}
          </div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 13.5,
              lineHeight: 1.5,
              color: B.muted,
              margin: "0 0 10px",
            }}
          >
            {door.blurb}
          </p>
          <a
            href={door.kind === "internal" ? door.to : door.href}
            onClick={enter}
            style={{
              fontFamily: SANS,
              fontSize: 13.5,
              fontWeight: 700,
              color: tint.ink,
              textDecoration: "none",
            }}
          >
            {door.cta} →
          </a>
        </div>
      </div>
    </div>
  );
}
