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
  const healthy = lowest >= 0;

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
        <Eyebrow>Live demo · running right now</Eyebrow>
        <h2 style={head()}>See your cash before it happens.</h2>
        <p style={sub()}>
          A working cash-flow forecaster that reads your accounting and your pipeline together.
          Move the inputs — watch the runway change. This one runs on sandbox numbers; the real
          one connects to <strong style={{ color: B.ink }}>your</strong> QuickBooks and CRM.
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
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
              <Stat label="Projected by Dec" value={fmt(ending)} tone={ending >= startCash ? B.orange : B.slateDeep} />
              <Stat label="Net / month" value={(monthlyNet >= 0 ? "+" : "") + fmt(monthlyNet)} tone={monthlyNet >= 0 ? B.orange : "#b4452b"} />
              <Stat label="Lowest point" value={fmt(lowest)} tone={healthy ? B.slate : "#b4452b"} />
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Projected cash balance over six months">
              <defs>
                <linearGradient id="cmFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={B.orange} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={B.orange} stopOpacity="0.01" />
                </linearGradient>
              </defs>
              {/* zero baseline */}
              <line x1={P} y1={zeroY} x2={W - P} y2={zeroY} stroke={B.rule} strokeWidth="1" strokeDasharray="3 4" />
              <text x={P} y={zeroY - 5} fontFamily={SANS} fontSize="9" fill={B.faint}>$0</text>
              <polygon points={areaPts} fill="url(#cmFill)" />
              <polyline points={linePts} fill="none" stroke={B.orange} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              {series.map((v, i) => (
                <g key={i}>
                  <circle cx={x(i)} cy={y(v)} r="3" fill={B.white} stroke={B.orange} strokeWidth="2" />
                  <text x={x(i)} y={H - 8} textAnchor="middle" fontFamily={SANS} fontSize="10" fill={B.faint}>{MONTHS[i]}</text>
                </g>
              ))}
            </svg>

            <div
              style={{
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: healthy ? B.warm : "#fbeae6",
                border: `1px solid ${healthy ? "#f0d6c4" : "#f0c9bf"}`,
                fontFamily: SANS,
                fontSize: 13.5,
                color: B.inkSoft,
                lineHeight: 1.45,
              }}
            >
              {healthy
                ? "Runway holds across the whole horizon. Close more of that pipeline and the curve bends up."
                : "Heads up — cash dips below zero before year-end. This is exactly the kind of thing a forecast catches early."}
            </div>

            <p style={{ fontFamily: SANS, fontSize: 11.5, color: B.faint, margin: "12px 0 0", lineHeight: 1.5 }}>
              Sandbox demo — illustrative numbers, not connected to any real account. Your build reads
              live QuickBooks + CRM data.
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
