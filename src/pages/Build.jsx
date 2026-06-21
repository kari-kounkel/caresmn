import { B, SERIF, SANS, SHADOW, SHADOW_LIFT } from "../brand";
import { BUILD_SERVICES, BUILD_AI } from "../content/doors";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { DoorHero, BackLink, GridCard } from "./_parts";

export default function Build() {
  return (
    <>
      <Nav />
      <DoorHero
        eyebrow="Build"
        title="Build it — or fix it — for me."
        lead="Done-with-you and done-for-you systems. We map how work actually moves, design the path it should take, document it so your team can run it, and put AI to work inside the mission. Then we train your people and step out."
        tint={B.cool}
        line="#dde2ee"
      />

      <section style={{ background: B.white, padding: "clamp(36px, 6vw, 56px) clamp(20px, 5vw, 40px) clamp(20px, 3vw, 32px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SectionLabel>What we build</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "clamp(14px, 2vw, 22px)",
              marginTop: 20,
            }}
          >
            {BUILD_SERVICES.map((s) => (
              <GridCard key={s.title} title={s.title} body={s.body} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: B.paper, borderTop: `1px solid ${B.rule}`, padding: "clamp(36px, 6vw, 64px) clamp(20px, 5vw, 40px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SectionLabel>AI, used with intention</SectionLabel>
          <p style={{ fontFamily: SANS, fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.6, color: B.inkSoft, margin: "10px 0 0", maxWidth: 620 }}>
            AI is a tool inside the mission, not the mission. We help you adopt it the way that
            actually sticks — starting wherever your team really is.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "clamp(14px, 2vw, 22px)",
              marginTop: 24,
            }}
          >
            {BUILD_AI.map((a) => (
              <AICard key={a.title} item={a} />
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <BackLink />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function AICard({ item }) {
  const flagged = item.flag;
  return (
    <div
      style={{
        background: flagged ? B.warm : B.white,
        border: `1px solid ${flagged ? "#f0d6c4" : B.rule}`,
        borderRadius: 14,
        padding: "20px 20px 18px",
        boxShadow: SHADOW,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {flagged && (
        <span style={{ alignSelf: "flex-start", fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: B.orange, borderRadius: 999, padding: "3px 10px" }}>
          Flagship
        </span>
      )}
      <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 21, color: B.ink, margin: 0, letterSpacing: "-0.01em" }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.55, color: B.inkSoft, margin: 0 }}>
        {item.body}
      </p>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.orange, margin: 0 }}>
      {children}
    </p>
  );
}
