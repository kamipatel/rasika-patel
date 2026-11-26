import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { stats } from "../data/homeStats";
import { PhotoStage } from "./MatchaScroll";

/* "The order": the matcha gets made as you scroll while a receipt prints the results. Numbers come from homeStats.js only. */

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const INK = "#17301F";

const LINES = [
  { item: "Xplore Austin app", note: "downloads", val: stats[0].val },
  { item: "Matcha rankings post", note: "views", val: stats[1].val },
  { item: "Same post", note: "shares", val: stats[2].val },
  { item: "Instagram", note: "followers", val: stats[3].val },
];
// the photo is at this share of the scroll when each line prints
const AT = [0.1, 0.32, 0.54, 0.76];

function Receipt({ p, all, compact }) {
  const shown = (i) => all || p >= AT[i];
  const total = all || p >= 0.9;
  const mono = { fontFamily: "var(--mono)", color: INK };
  return (
    <div role="group" aria-label="Receipt of results" style={{
      ...mono, background: "#FFFFFF", width: "100%", maxWidth: compact ? 360 : 400,
      padding: compact ? "20px 20px 34px" : "30px 30px 46px", position: "relative",
      boxShadow: "0 24px 50px -24px rgba(23,48,31,0.45), 0 2px 0 rgba(23,48,31,0.08)",
      WebkitMaskImage: "linear-gradient(135deg, #000 0 0)",
      clipPath: "polygon(0 0,100% 0,100% calc(100% - 12px),96% 100%,92% calc(100% - 12px),88% 100%,84% calc(100% - 12px),80% 100%,76% calc(100% - 12px),72% 100%,68% calc(100% - 12px),64% 100%,60% calc(100% - 12px),56% 100%,52% calc(100% - 12px),48% 100%,44% calc(100% - 12px),40% 100%,36% calc(100% - 12px),32% 100%,28% calc(100% - 12px),24% 100%,20% calc(100% - 12px),16% 100%,12% calc(100% - 12px),8% 100%,4% calc(100% - 12px),0 100%)",
    }}>
      <p style={{ fontSize: compact ? 13 : 15, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center" }}>Rasika's order</p>
      <p style={{ fontSize: 12, textAlign: "center", marginTop: 4, opacity: 0.7 }}>One iced matcha latte, made on scroll</p>
      <div style={{ borderTop: `1.5px dashed ${INK}`, margin: compact ? "12px 0" : "16px 0" }} />
      {LINES.map((l, i) => (
        <div key={l.item} style={{
          display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "baseline",
          padding: compact ? "5px 0" : "8px 0",
          opacity: shown(i) ? 1 : 0, transform: shown(i) ? "none" : "translateY(10px)",
          transition: "opacity .35s ease, transform .35s ease",
        }}>
          <span style={{ fontSize: compact ? 12.5 : 14 }}>1 x {l.item}<br /><span style={{ opacity: 0.62, fontSize: 11.5 }}>{l.note}</span></span>
          <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: compact ? 28 : 36, letterSpacing: "-0.04em", lineHeight: 1 }}>{l.val}</span>
        </div>
      ))}
      <div style={{ borderTop: `1.5px dashed ${INK}`, margin: compact ? "12px 0 10px" : "16px 0 12px" }} />
      <div style={{ opacity: total ? 1 : 0, transition: "opacity .4s ease", fontSize: compact ? 12.5 : 14, lineHeight: 1.45 }}>
        <strong style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>Now serving</strong>
        <br />Open to Summer 2027 internships in AI, marketing, and product management.
        <br /><span style={{ opacity: 0.62 }}>Thank you! Work is just below.</span>
      </div>
    </div>
  );
}

export default function ReceiptScroll({ isMobile }) {
  const reduced = !!useReducedMotion();
  const trackRef = useRef(null);
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(clamp(v)));

  const frame = {
    borderRadius: 28, overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 30px 70px -34px rgba(23,48,31,0.6)",
    background: "#d8dcc6",
  };

  if (reduced) {
    return (
      <section aria-label="Results" style={{ padding: "64px 24px", background: "#E4EBC8", position: "relative", zIndex: 12 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...frame, width: "min(100%, 420px)" }}><PhotoStage p={1} still /></div>
          <Receipt p={1} all />
        </div>
      </section>
    );
  }

  return (
    <section ref={trackRef} aria-label="Results" style={{ height: isMobile ? "340vh" : "400vh", position: "relative", zIndex: 12, background: "#E4EBC8" }}>
      <div style={{
        position: "sticky", top: 0, height: "100dvh", overflow: "hidden", display: "flex",
        flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center",
        gap: isMobile ? 18 : "clamp(32px, 6vw, 90px)", padding: isMobile ? "76px 20px 20px" : "84px clamp(24px, 6vw, 80px) 36px",
      }}>
        <div style={{ ...frame, width: isMobile ? "auto" : "min(46vw, 78dvh)", height: isMobile ? "37dvh" : "auto", maxWidth: "100%" }}>
          <PhotoStage p={p} />
        </div>
        <Receipt p={p} compact={isMobile} />
      </div>
    </section>
  );
}
