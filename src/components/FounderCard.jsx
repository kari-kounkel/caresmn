import { B, SERIF, SANS, ART_GLOW, TEXT_GRAD, NEON_RGB } from "../brand";

// The person behind the systems. Sits after the evidence and before the CTA —
// visitors see the proof, then who's actually doing the work, then the ask.
// Photo left, words right; stacks to photo-over-words on narrow screens.
export default function FounderCard() {
  return (
    <section
      style={{
        background: "transparent",
        borderTop: `1px solid ${B.ruleCool}`,
        padding: "clamp(44px, 7vw, 84px) clamp(20px, 5vw, 40px)",
      }}
    >
      <div
        style={{
          maxWidth: 940,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "clamp(24px, 4vw, 52px)",
          justifyContent: "center",
        }}
      >
        <img
          src="/kari-headshot.png"
          alt="Kari Hoglund Kounkel, founder of CARES Consulting Inc"
          width="815"
          height="1050"
          loading="lazy"
          style={{
            width: "clamp(180px, 26vw, 260px)",
            height: "auto",
            flexShrink: 0,
            borderRadius: 18,
            display: "block",
            objectFit: "cover",
            boxShadow: ART_GLOW,
          }}
        />

        <div style={{ flex: "1 1 340px", minWidth: 260 }}>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: B.slate,
              margin: "0 0 12px",
            }}
          >
            Who you're actually hiring
          </p>

          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: "clamp(26px, 4vw, 40px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: B.ink,
              margin: 0,
            }}
          >
            Kari Hoglund Kounkel
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: B.muted,
              margin: "10px 0 0",
            }}
          >
            Founder + Consultant
          </p>

          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(15px, 2vw, 17px)",
              lineHeight: 1.65,
              color: B.inkSoft,
              margin: "18px 0 0",
              maxWidth: 480,
            }}
          >
            Thirty-five years of untangling other people's messes — books, payroll,
            systems, and the quiet chaos underneath a business that looks fine from
            the road. You get a person who has done the work, not a framework.
          </p>

          <p
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(19px, 2.6vw, 26px)",
              lineHeight: 1.25,
              margin: "22px 0 0",
              ...TEXT_GRAD,
            }}
          >
            Clear today. Stronger tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
