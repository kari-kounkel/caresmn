import { useState } from "react";
import { B, SERIF, SANS } from "../brand";
import { DOORS } from "../content/doors";
import { go } from "../router";

// The five doors as a persistent top bar. Five items, no dropdowns — the
// router itself, always in reach. External doors open their destination.
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.86)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: `1px solid ${B.rule}`,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "12px clamp(20px, 5vw, 40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); go("/"); }}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
          aria-label="CARES Consulting — home"
        >
          <img
            src="/cares-logo.png"
            alt="CARES Consulting"
            style={{ height: 40, width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop doors */}
        <nav className="cm-nav-desktop" style={{ display: "flex", gap: 4 }}>
          {DOORS.map((d) => (
            <DoorLink key={d.key} door={d} />
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="cm-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          style={{
            display: "none",
            background: "none",
            border: `1px solid ${B.rule}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontFamily: SANS,
            fontSize: 14,
            color: B.ink,
            cursor: "pointer",
          }}
        >
          Doors
        </button>
      </div>

      {open && (
        <nav
          className="cm-nav-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            padding: "4px clamp(20px, 5vw, 40px) 14px",
            borderTop: `1px solid ${B.rule}`,
          }}
        >
          {DOORS.map((d) => (
            <DoorLink key={d.key} door={d} block onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 760px) {
          .cm-nav-desktop { display: none !important; }
          .cm-nav-toggle { display: inline-block !important; }
          .cm-nav-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function DoorLink({ door, block, onNavigate }) {
  const [hover, setHover] = useState(false);
  const click = (e) => {
    e.preventDefault();
    onNavigate && onNavigate();
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
        fontFamily: SANS,
        fontSize: 15,
        fontWeight: 500,
        color: hover ? B.orange : B.inkSoft,
        textDecoration: "none",
        padding: block ? "11px 4px" : "8px 12px",
        borderRadius: 8,
        borderBottom: block ? `1px solid ${B.rule}` : "none",
        background: hover && !block ? B.warm : "transparent",
        transition: "color 0.15s ease, background 0.15s ease",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {door.label}
      {door.kind === "external" && (
        <span style={{ fontSize: 11, color: B.faint }}>↗</span>
      )}
    </a>
  );
}
