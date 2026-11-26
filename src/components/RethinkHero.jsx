import { useReducedMotion } from "framer-motion";
import MatchaDust from "./MatchaDust";

/* Home hero. Lime backdrop, the name set huge, a latte photographed on the same lime, one slowly turning badge. */

const INK = "#17301F";
const LIME = "#CBD981";

function Badge({ spin }) {
  const text = "Founder, Xplore Austin · 700+ downloads · ";
  return (
    <svg viewBox="0 0 200 200" width="150" height="150" aria-hidden="true"
      style={{ animation: spin ? "badge-spin 28s linear infinite" : "none" }}>
      <defs><path id="rk-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" /></defs>
      <circle cx="100" cy="100" r="96" fill={INK} />
      <text fill={LIME} fontSize="14.5" fontFamily="'IBM Plex Mono', monospace" fontWeight="500" letterSpacing="0">
        <textPath href="#rk-circle" textLength="468" lengthAdjust="spacing">{text}</textPath>
      </text>
      <path d="M100 74 C108 88 118 96 128 100 C118 104 108 112 100 126 C92 112 82 104 72 100 C82 96 92 88 100 74Z" fill={LIME} />
    </svg>
  );
}

export default function RethinkHero({ isMobile }) {
  const reduced = !!useReducedMotion();
  const rise = (d) => (reduced ? {} : { animation: `rk-rise 0.9s cubic-bezier(0.22,1,0.36,1) ${d}s both` });

  return (
    <section id="hero" aria-label="Hero section" style={{
      position: "relative", background: LIME, color: INK,
      minHeight: isMobile ? "auto" : "min(100dvh, 860px)",
      display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.08fr 0.92fr",
      overflow: "hidden", zIndex: 11,
    }}>
      <style>{`
        @keyframes rk-rise { from { opacity: 0; transform: translateY(40px) } to { opacity: 1; transform: none } }
        @keyframes badge-spin { to { transform: rotate(360deg) } }
        .rk-btn { transition: transform .2s ease, background .2s ease; }
        .rk-btn:hover { transform: translateY(-2px) rotate(-1deg); }
        .rk-btn:focus-visible { outline: 3px solid ${INK}; outline-offset: 3px; }
      `}</style>
      <MatchaDust reduced={reduced} />

      <div style={{
        padding: isMobile ? "96px 24px 28px" : "120px clamp(24px, 5vw, 72px) 56px clamp(24px, 6vw, 88px)",
        display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 2,
      }}>
        <h1 style={{
          fontFamily: "var(--display)", fontWeight: 800, textTransform: "none",
          fontSize: isMobile ? "clamp(76px, 23vw, 120px)" : "clamp(96px, 13.2vw, 210px)",
          lineHeight: 0.84, letterSpacing: "-0.055em", margin: 0, color: INK,
        }}>
          <span style={{ display: "block", ...rise(0.05) }}>Rasika</span>
          <span style={{ display: "block", ...rise(0.17) }}>Patel.</span>
        </h1>

        <p style={{
          fontFamily: "var(--body)", fontWeight: 400, margin: isMobile ? "26px 0 0" : "38px 0 0",
          fontSize: isMobile ? "21px" : "clamp(22px, 2.3vw, 32px)", lineHeight: 1.22, maxWidth: "17em", ...rise(0.32),
        }}>
          I build apps, then I get people to use them.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "26px", ...rise(0.42) }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "13px", fontWeight: 500, border: `1.5px solid ${INK}`, borderRadius: "999px", padding: "8px 16px", transform: "rotate(-2deg)" }}>
            AI expert specializing in Claude
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "13px", fontWeight: 500, background: INK, color: LIME, borderRadius: "999px", padding: "8px 16px", transform: "rotate(1.5deg)" }}>
            Open to Summer 2027 internships
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "34px", ...rise(0.52) }}>
          <a href="#work" className="rk-btn" style={{ background: INK, color: LIME, fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", padding: "16px 26px", borderRadius: "10px" }}>View my work</a>
          <a href="#contact" className="rk-btn" style={{ border: `1.5px solid ${INK}`, color: INK, fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", padding: "16px 26px", borderRadius: "10px" }}>Get in touch</a>
        </div>
      </div>

      <div style={{ position: "relative", minHeight: isMobile ? "min(70vw, 440px)" : undefined }}>
        <img src="/hero-latte.webp" alt="An iced matcha latte with a green straw, photographed on a lime backdrop"
          width="1000" height="1250" fetchpriority="high"
          style={{
            position: isMobile ? "relative" : "absolute", inset: 0, width: "100%", height: isMobile ? "min(92vw, 520px)" : "100%",
            objectFit: "cover", objectPosition: "50% 60%", display: "block",
            WebkitMaskImage: isMobile ? "linear-gradient(to bottom, transparent 0, #000 14%)" : "linear-gradient(to right, transparent 0, #000 18%)",
            maskImage: isMobile ? "linear-gradient(to bottom, transparent 0, #000 14%)" : "linear-gradient(to right, transparent 0, #000 18%)",
          }} />
        <div style={{ position: "absolute", right: isMobile ? 14 : "8%", top: isMobile ? "auto" : "17%", bottom: isMobile ? 18 : "auto", zIndex: 3 }}>
          <Badge spin={!reduced} />
        </div>
      </div>
    </section>
  );
}
