import { useMemo, useState } from "react";
import { B, SERIF, SANS, SHADOW, SHADOW_LIFT } from "../brand";

// LIVE DEMO — the centerpiece proof. A QBO + CRM cash-flow forecaster that
// runs entirely in the browser on SANDBOX numbers. It is NOT connected to any
// real account and never touches real client books. The point is the promise:
// "yes — we can connect YOUR stuff."

const MONTHS = ["Now", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmt(n) {
  const v = Math.round(n);
  return (v < 0 ? "-$" : "$") + Math.abs(v).toLocaleString();
}

export default function ForecasterDemo() {
  const [startCash, setStartCash] = useState(42000);     // QBO: bank balance
  const [booked, setBooked] = useState(28000);           // QBO: recurring revenue / mo
  const [expenses, setExpenses] = useState(31000);       // QBO: operating expenses / mo
  const [pipeline, setPipeline] = useState(96000);       // CRM: open pipeline value
  const [winRate, setWinRate] = useState(35);            // CRM: win probability %

  const series = useMemo(() => {
    // Expected new revenue from the CRM pipeline, spread across the horizon.
    const expectedPipeline = (pipeline * (winRate / 100)) / 6;
    const monthlyNet = booked + expectedPipeline - expenses;
    const out = [];
    for (let i = 0; i < MONTHS.length; i++) out.push(startCash + monthlyNet * i);
    return out;
  }, [startCash, booked, expenses, pipeline, winRate]);

  const ending = series[series.length - 1];
  const monthlyNet = (series[1] ?? series[0]) - series[0];
  const lowest = Math.min(...series);
  const lowestIdx = series.indexOf(lowest);
  const lowMonth = MONTHS[lowestIdx] === "Now" ? "right now" : MONTHS[lowestIdx];
  const healthy = lowest >= 0;

  // The plain-English verdict — the whole point of the tool. Answers
  // "am I going to be short, and when?" before it actually happens.
  let verdict;
  if (lowest < 0) {
    verdict = {
      tone: "bad",
      headline: `You run out of cash in ${lowMonth}.`,
      detail: `At this pace your balance drops to ${fmt(lowest)} — that's not making payroll.`,
    };
  } else if (lowest < expenses) {
    verdict = {
      tone: "warn",
      headline: `It gets tight in ${lowMonth}.`,
      detail: `Your thinnest month leaves about ${fmt(lowest)} — under one month of expenses in reserve.`,
    };
  } else {
    verdict = {
      tone: "good",
      headline: `You're covered all year.`,
      detail: `Even at your lowest (${lowMonth}) you've still got ${fmt(lowest)} in the bank.`,
    };
  }
  const V = {
    good: { fg: "#2f7d4f", bg: "#eaf6ee", line: "#cfe9d6", dot: "✓" },
    warn: { fg: "#9a6a14", bg: "#fbf2dd", line: "#eedfb4", dot: "!" },
    bad:  { fg: "#b4452b", bg: "#fbeae6", line: "#f0c9bf", dot: "!" },
  }[verdict.tone];

  // chart geometry
  const W = 560, H = 200, P = 28;
  const max = Math.max(...series, 0);
  const min = Math.min(...series, 0);
  const span = max - min || 1;
  const x = (i) => P + (i * (W - P * 2)) / (MONTHS.length - 1);
  const y = (v) => H - P - ((v - min) / span) * (H - P * 2);
  const zeroY = y(0);
  const linePts = series.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const areaPts = `${P},${zeroY} ${linePts} ${W - P},${zeroY}`;

  return (
    <section style={{ background: B.white, padding: "clamp(48px, 8vw, 88px) clamp(20px, 5vw, 40px)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Eyebrow>The kind of tool we build for you</Eyebrow>
        <h2 style={head()}>Will you run out of cash this year?</h2>
        <p style={sub()}>
          Most owners can't answer that until it's too late. This tool reads your accounting and
          your sales pipeline <em>together</em> and tells you — months ahead — whether you'll be
          short, and when. Drag any number and watch the answer change. It's running on sample
          data here; the real one we build connects to <strong style={{ color: B.ink }}>your</strong>{" "}
          QuickBooks and CRM.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
            gap: "clamp(20px, 3vw, 40px)",
            alignItems: "stretch",
            marginTop: 32,
          }}
          className="cm-forecaster"
        >
          {/* Controls */}
          <div
            style={{
              background: B.cool,
              border: `1px solid ${B.ruleCool}`,
              borderRadius: 16,
              padding: "clamp(18px, 2.4vw, 26px)",
            }}
          >
            <Tag color={B.slate}>From QuickBooks</Tag>
            <Slider label="Cash in the bank" value={startCash} set={setStartCash} min={0} max={120000} step={1000} />
            <Slider label="Recurring revenue / mo" value={booked} set={setBooked} min={0} max={80000} step={1000} />
            <Slider label="Operating expenses / mo" value={expenses} set={setExpenses} min={0} max={80000} step={1000} />

            <div style={{ height: 1, background: B.ruleCool, margin: "18px 0" }} />

            <Tag color={B.gold}>From the CRM</Tag>
            <Slider label="Open pipeline value" value={pipeline} set={setPipeline} min={0} max={300000} step={5000} />
            <Slider label="Win probability" value={winRate} set={setWinRate} min={0} max={100} step={5} suffix="%" />
          </div>

          {/* Chart + readout */}
          <div
            style={{
              background: B.white,
              border: `1px solid ${B.rule}`,
              borderRadius: 16,
              padding: "clamp(18px, 2.4vw, 26px)",
              boxShadow: SHADOW,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* The verdict — the answer, stated plainly and first. */}
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px", borderRadius: 12, background: V.bg, border: `1px solid ${V.line}`, marginBottom: 18 }}>
              <span style={{ flex: "0 0 auto", width: 30, height: 30, borderRadius: 999, background: V.fg, color: "#fff", fontFamily: SANS, fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>{V.dot}</span>
              <div>
                <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(19px, 2.6vw, 25px)", color: V.fg, lineHeight: 1.1, letterSpacing: "-0.01em" }}>{verdict.headline}</div>
                <div style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.5, color: B.inkSoft, marginTop: 5 }}>{verdict.detail}</div>
              </div>
            </div>

            <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: B.faint, margin: "0 0 6px" }}>
              Cash balance, next 6 months
            </p>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Projected cash balance over six months">
              <defs>
                <linearGradient id="cmFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={B.orange} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={B.orange} stopOpacity="0.01" />
                </linearGradient>
              </defs>
              {/* the "running on empty" line */}
              <line x1={P} y1={zeroY} x2={W - P} y2={zeroY} stroke={lowest < 0 ? "#d98b78" : B.rule} strokeWidth="1" strokeDasharray="3 4" />
              <text x={W - P} y={zeroY - 5} textAnchor="end" fontFamily={SANS} fontSize="9.5" fill={lowest < 0 ? "#b4452b" : B.faint}>$0 — empty</text>
              <polygon points={areaPts} fill="url(#cmFill)" />
              <polyline points={linePts} fill="none" stroke={B.orange} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              {series.map((v, i) => (
                <g key={i}>
                  <circle cx={x(i)} cy={y(v)} r="3" fill={B.white} stroke={B.orange} strokeWidth="2" />
                  <text x={x(i)} y={H - 8} textAnchor="middle" fontFamily={SANS} fontSize="10" fill={i === lowestIdx ? V.fg : B.faint} fontWeight={i === lowestIdx ? 700 : 400}>{MONTHS[i]}</text>
                </g>
              ))}
              {/* highlight the lowest point — the moment that matters */}
              <circle cx={x(lowestIdx)} cy={y(lowest)} r="6" fill="none" stroke={V.fg} strokeWidth="2" />
              <circle cx={x(lowestIdx)} cy={y(lowest)} r="2.5" fill={V.fg} />
            </svg>

            {/* supporting numbers — secondary to the verdict */}
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${B.rule}` }}>
              <Stat label="Lowest point" value={fmt(lowest)} tone={V.fg} />
              <Stat label="Net / month" value={(monthlyNet >= 0 ? "+" : "") + fmt(monthlyNet)} tone={monthlyNet >= 0 ? B.orange : "#b4452b"} />
              <Stat label="Cash by Dec" value={fmt(ending)} tone={ending >= startCash ? B.orange : B.slateDeep} />
            </div>

            <p style={{ fontFamily: SANS, fontSize: 11.5, color: B.faint, margin: "14px 0 0", lineHeight: 1.5 }}>
              Sample numbers, not a real account. The version we build for you reads your live
              QuickBooks + CRM — same answer, your books.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .cm-forecaster { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Slider({ label, value, set, min, max, step, suffix }) {
  const display = suffix === "%" ? `${value}${suffix}` : fmt(value);
  return (
    <label style={{ display: "block", marginTop: 14 }}>
      <span style={{ display: "flex", justifyContent: "space-between", fontFamily: SANS, fontSize: 13.5, marginBottom: 6 }}>
        <span style={{ color: B.inkSoft }}>{label}</span>
        <span style={{ color: B.ink, fontWeight: 600 }}>{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        style={{ width: "100%", accentColor: B.orange, cursor: "pointer" }}
      />
    </label>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div>
      <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: B.faint, marginBottom: 2 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 24, color: tone, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{ display: "inline-block", fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: 2 }}>
      {children}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.orange, margin: "0 0 12px" }}>
      {children}
    </p>
  );
}
const head = () => ({ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em", color: B.ink, margin: 0, lineHeight: 1.1 });
const sub = () => ({ fontFamily: SANS, fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.6, color: B.inkSoft, margin: "14px 0 0", maxWidth: 620 });
