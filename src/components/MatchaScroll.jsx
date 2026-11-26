import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { stats } from "../data/homeStats";

/* Scroll-scrubbed matcha latte: whisk, pour the milk, pour the matcha. The copy beside it changes with each step and uses the
   same verified numbers as the stats band. */

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => t * t * (3 - 2 * t);
// Keyframes: [[p, value], ...] with smoothstep between them.
function kf(p, frames) {
  if (p <= frames[0][0]) return frames[0][1];
  for (let i = 1; i < frames.length; i++) {
    if (p <= frames[i][0]) {
      const [p0, v0] = frames[i - 1];
      const [p1, v1] = frames[i];
      return v0 + (v1 - v0) * ease((p - p0) / (p1 - p0));
    }
  }
  return frames[frames.length - 1][1];
}

const STEPS = [
  {
    n: "01",
    title: "Start with something people want to share.",
    body: "Our matcha rankings post for Xplore reached",
    big: stats[1].val,
    unit: "views",
  },
  {
    n: "02",
    title: "Then watch it travel.",
    body: "People kept sending it to each other:",
    big: stats[2].val,
    unit: "shares",
  },
  {
    n: "03",
    title: "Turn attention into a community.",
    body: "The page behind it now has",
    big: stats[3].val,
    unit: "Instagram followers",
  },
  {
    n: "04",
    title: "I build apps, then I get people to use them.",
    body: "Xplore Austin has been downloaded",
    big: stats[0].val,
    unit: "times",
  },
];

const KEYFRAMES = 11; // generated photoreal stills, same camera and kitchen
const COLS = 4;
const CELL = 640;
const SHEET_PARTS = ["/matcha/kf-a.txt", "/matcha/kf-b.txt"]; // base64 webp sheet, split in two

let sheetPromise = null;
function loadSheet() {
  if (!sheetPromise) {
    sheetPromise = Promise.all(SHEET_PARTS.map((u) => fetch(u).then((r) => r.text())))
      .then((parts) => fetch("data:image/webp;base64," + parts.join("").trim()))
      .then((r) => r.blob())
      .then((b) => createImageBitmap(b));
  }
  return sheetPromise;
}

function drawKey(ctx, bmp, k, alpha, size) {
  ctx.globalAlpha = alpha;
  ctx.drawImage(bmp, (k % COLS) * CELL, Math.floor(k / COLS) * CELL, CELL, CELL, 0, 0, size, size);
}

/* Scroll position cross-fades between the generated keyframes on a canvas. */
function PhotoStage({ p, still = false }) {
  const canvasRef = useRef(null);
  const bmpRef = useRef(null);
  const pRef = useRef(still ? 1 : 0);

  const paint = () => {
    const c = canvasRef.current;
    const bmp = bmpRef.current;
    if (!c || !bmp) return;
    const ctx = c.getContext("2d");
    const pos = clamp(pRef.current / 0.94) * (KEYFRAMES - 1);
    const i = Math.min(KEYFRAMES - 1, Math.floor(pos));
    const t = ease(pos - i);
    ctx.globalAlpha = 1;
    drawKey(ctx, bmp, i, 1, c.width);
    if (i < KEYFRAMES - 1 && t > 0.001) drawKey(ctx, bmp, i + 1, t, c.width);
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    let dead = false;
    loadSheet().then((bmp) => {
      if (dead) return;
      bmpRef.current = bmp;
      paint();
    }).catch(() => {});
    return () => { dead = true; };
  }, []);

  useEffect(() => {
    pRef.current = still ? 1 : p;
    paint();
  }, [p, still]);

  return (
    <canvas ref={canvasRef} width={720} height={720} role="img"
      aria-label="A matcha latte being made: whisking, pouring milk, pouring matcha"
      style={{ width: "100%", height: "100%", display: "block" }} />
  );
}

export default function MatchaScroll({ isMobile = false }) {
  const reduced = !!useReducedMotion();
  const trackRef = useRef(null);
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(clamp(v)));

  if (reduced) {
    return (
      <section aria-label="Matcha story" style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 12 }}>
        <div style={{ maxWidth: 440, margin: "0 auto 32px", borderRadius: 28, overflow: "hidden" }}><PhotoStage p={1} still /></div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
          {STEPS.map((s) => (
            <div key={s.n}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)" }}>{s.n}</div>
              <h3 style={{ fontFamily: "var(--display)", color: "var(--text-light)", fontSize: 22 }}>{s.title}</h3>
              <p style={{ color: "var(--text-mid)", fontFamily: "var(--body)" }}>{s.body} <strong style={{ color: "var(--accent)" }}>{s.big} {s.unit}</strong></p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const idx = Math.min(STEPS.length - 1, Math.floor(clamp(p, 0, 0.999) * STEPS.length));
  const stepStart = idx / STEPS.length;
  const local = clamp((p - stepStart) * STEPS.length);
  const textOpacity = kf(local, [[0, 0], [0.18, 1], [0.8, 1], [1, idx === STEPS.length - 1 ? 1 : 0]]);
  const textShift = kf(local, [[0, 24], [0.18, 0]]);

  return (
    <section
      ref={trackRef}
      aria-label="Matcha story"
      style={{ height: isMobile ? "380vh" : "460vh", position: "relative", zIndex: 12 }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100dvh", overflow: "hidden",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: "center", justifyContent: "center",
        gap: isMobile ? 12 : "clamp(24px, 5vw, 72px)",
        padding: isMobile ? "76px 20px 24px" : "88px clamp(24px, 6vw, 80px) 40px",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <div style={{
          flex: isMobile ? "0 0 auto" : "1 1 52%",
          width: isMobile ? "100%" : undefined,
          maxWidth: isMobile ? 380 : 620,
          maxHeight: isMobile ? "46dvh" : "78dvh",
          aspectRatio: "1 / 1",
          borderRadius: 28, overflow: "hidden",
          boxShadow: "0 30px 70px -30px rgba(0,0,0,0.55)",
        }}>
          <PhotoStage p={p} />
        </div>

        <div style={{ flex: isMobile ? "1 1 auto" : "1 1 40%", maxWidth: 460, minHeight: isMobile ? 0 : 280 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 18 }} aria-hidden="true">
            {STEPS.map((s, i) => (
              <span key={s.n} style={{ height: 3, flex: 1, borderRadius: 3, background: i <= idx ? "var(--accent)" : "var(--border)", transition: "background 0.3s" }} />
            ))}
          </div>
          <div style={{ opacity: textOpacity, transform: `translateY(${textShift}px)` }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 10 }}>
              STEP {STEPS[idx].n}
            </div>
            <h2 style={{
              fontFamily: "var(--display)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05,
              fontSize: isMobile ? "clamp(26px, 7.5vw, 34px)" : "clamp(30px, 3.6vw, 48px)",
              color: "var(--text-light)", margin: 0,
            }}>{STEPS[idx].title}</h2>
            <p style={{ fontFamily: "var(--body)", fontSize: isMobile ? 15 : 17, color: "var(--text-mid)", margin: "16px 0 6px", lineHeight: 1.5 }}>
              {STEPS[idx].body}
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--display)", fontWeight: 800, letterSpacing: "-2px", fontSize: isMobile ? 46 : 68, lineHeight: 1, color: "var(--accent)" }}>
                {STEPS[idx].big}
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-dim)" }}>
                {STEPS[idx].unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
