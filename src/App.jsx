import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Build from "./pages/Build";
import { go } from "./router";
import { B, SERIF, SANS } from "./brand";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const route = path.replace(/\/+$/, "") || "/";

  if (route === "/") return <Home />;
  if (route === "/learn") return <Learn />;
  if (route === "/build") return <Build />;

  // Unknown path — soft bounce, never a dead end.
  return (
    <>
      <Nav />
      <section style={{ background: B.white, minHeight: "52vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "64px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>🧭</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 28, color: B.ink, margin: 0 }}>
          That door isn't here.
        </h1>
        <p style={{ fontFamily: SANS, fontSize: 16, color: B.muted, margin: 0 }}>
          Let's get you back to the five that are.
        </p>
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); go("/"); }}
          style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: B.orange, textDecoration: "none", marginTop: 6 }}
        >
          ← Back to the front door
        </a>
      </section>
      <Footer />
    </>
  );
}
