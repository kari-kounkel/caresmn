import { B, SERIF, SANS, SHADOW } from "../brand";
import { LEARN_PILLARS } from "../content/doors";
import { go } from "../router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { DoorHero, BackLink, GridCard } from "./_parts";

export default function Learn() {
  return (
    <>
      <Nav />
      <DoorHero
        eyebrow="Learn"
        title="Get better at this."
        lead="Six skill pillars for the business problems nobody taught you how to solve. Each one routes you to a free resource, a paid product, or a hands-on Build engagement — your call, your pace."
        tint={B.warm}
        line="#f0d6c4"
      />
      <section style={{ background: B.white, padding: "clamp(36px, 6vw, 64px) clamp(20px, 5vw, 40px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "clamp(14px, 2vw, 22px)",
            }}
          >
            {LEARN_PILLARS.map((p) => (
              <GridCard key={p.title} title={p.title} body={p.body} routes={p.routes} />
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
