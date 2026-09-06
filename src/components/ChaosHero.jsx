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
  { t: "Payroll",      x: 12, y: 8,  r: -11 },
  { t: "Spreadsheets", x: 46, y: 6,  r: 9 },
  { t: "Invoices",     x: 76, y: 12, r: -6 },
  { t: "Passwords",    x: 8,  y: 40, r: 7 },
  { t: "Receipts",     x: 80, y: 44, r: 12 },
  { t: "Contracts",    x: 10, y: 74, r: -9 },
  { t: "Onboarding",   x: 40, y: 86, r: 6 },
  { t: "SOPs",         x: 72, y: 80, r: -13 },
  { t: "Emails",       x: 24, y: 22, r: 14 },
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
    const t = setTimeout(() => setOrdered(true), 2100);
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
            gridTemplateColumns: "minmax(0, 1fr) minmax(250px, 0.62fr)",
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
            const d = ordered ? i * 26 : 0;
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
        filter: "drop-shadow(0 18px 30px rgba(15,23,42,0.18)) drop-shadow(0 0 34px rgba(0,128,255,0.16))",
        opacity: ordered ? 1 : 0.72,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* TOP SLAB — overhangs the body on both sides. Furniture has a lid. */}
      <div
        aria-hidden="true"
        style={{
          height: 14,
          margin: "0 -8px",
          borderRadius: "6px 6px 2px 2px",
          background: "linear-gradient(180deg, #f7fafd 0%, #dce5ef 62%, #c3d0de 100%)",
          borderTop: "1px solid #ffffff",
          boxShadow: "inset 0 -1px 0 rgba(15,23,42,0.10)",
        }}
      />

      {/* BODY — one solid carcass. The drawers are cut into it, not stacked on it. */}
      <div
        style={{
          background: "linear-gradient(180deg, #e9eff6 0%, #dbe4ee 100%)",
          borderLeft: "1px solid #c8d4e2",
          borderRight: "1px solid #c8d4e2",
          padding: "7px 7px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          // Inner walls, so the drawers read as sunk into a box.
          boxShadow:
            "inset 3px 0 6px -3px rgba(15,23,42,0.22), inset -3px 0 6px -3px rgba(15,23,42,0.22)",
        }}
      >
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

      {/* PLINTH — the base it stands on. Without this it floats. */}
      <div
        aria-hidden="true"
        style={{
          height: 12,
          margin: "0 6px",
          borderRadius: "0 0 4px 4px",
          background: "linear-gradient(180deg, #c8d4e2 0%, #aebccd 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      />
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
      {/* DRAWER FACE. Pulls toward you on open — it grows a shade and throws a
          shadow down onto the drawer below, which is what "out" looks like
          from straight on. */}
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "block",
          cursor: "pointer",
          border: "1px solid #c2cedc",
          borderRadius: 3,
          padding: "clamp(12px, 1.6vw, 17px) 14px",
          background: "linear-gradient(180deg, #ffffff 0%, #f2f6fb 48%, #e4ebf3 100%)",
          boxShadow: open
            ? "0 10px 16px -6px rgba(15,23,42,0.32), inset 0 1px 0 #ffffff"
            : hover
            ? "0 4px 9px -4px rgba(15,23,42,0.26), inset 0 1px 0 #ffffff"
            : "inset 0 1px 0 #ffffff, inset 0 -1px 0 rgba(15,23,42,0.06)",
          transform: open ? "scale(1.035)" : hover ? "scale(1.012)" : "scale(1)",
          transformOrigin: "center",
          transition: "transform 0.26s cubic-bezier(.3,1.05,.4,1), box-shadow 0.26s ease",
        }}
      >
        {/* LABEL HOLDER — the little framed card window every filing cabinet has,
            centred on the face. This is the detail that says "cabinet". */}
        <span
          style={{
            display: "block",
            width: "min(74%, 210px)",
            margin: "0 auto",
            background: tint.tint,
            border: "1px solid #b9c6d6",
            borderRadius: 2,
            boxShadow: "inset 0 1px 2px rgba(15,23,42,0.14), 0 1px 0 #ffffff",
            padding: "5px 10px 6px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(11px, 1.25vw, 13px)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: tint.ink,
            }}
          >
            {door.label}
          </span>
        </span>

        {/* PULL — recessed bar under the label. */}
        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: "min(44%, 116px)",
            height: 8,
            margin: "9px auto 0",
            borderRadius: 4,
            background: "linear-gradient(180deg, #aebccd 0%, #ccd8e5 55%, #f2f6fb 100%)",
            boxShadow: "inset 0 1px 2px rgba(15,23,42,0.35), 0 1px 0 #ffffff",
          }}
        />
      </button>

      {/* THE INSIDE OF THE DRAWER — dark lip at the top, then what's filed here. */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 340 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 0.38s ease, opacity 0.3s ease",
        }}
      >
        <div
          style={{
            margin: "2px 4px 4px",
            borderRadius: "0 0 3px 3px",
            background: "linear-gradient(180deg, #cfdae7 0%, #eef3f8 14%, #ffffff 100%)",
            boxShadow: "inset 0 6px 8px -6px rgba(15,23,42,0.45)",
            padding: "14px 14px 12px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 11 }}>
            {filed.map((n) => (
              <span
                key={n.t}
                style={{
                  // Same square as the ones on the desk, just smaller — a filed
                  // Post-it is still a Post-it, not a text chip.
                  fontFamily: HAND,
                  fontSize: 10.5,
                  fontWeight: 700,
                  lineHeight: 1.08,
                  color: "#3a352a",
                  width: 58,
                  height: 58,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "7px 5px 5px",
                  overflowWrap: "break-word",
                  background: `linear-gradient(180deg, rgba(0,0,0,0.055) 0 13%, transparent 13%), ${colorOf(n.i)}`,
                  borderRadius: 2,
                  boxShadow: "1px 2px 4px rgba(40,30,10,0.20)",
                  transform: `rotate(${n.r / 4}deg)`,
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
