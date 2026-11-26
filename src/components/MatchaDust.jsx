import { useEffect, useRef } from "react";

/* Matcha dust: three layers of tiny specks that lean toward the pointer at different depths and twinkle at different speeds. */

function rng(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; }

const LAYERS = [
  { n: 22, r: [1.2, 2.4], depth: 6, dur: 3, color: "#17301F", op: 0.35, seed: 7 },
  { n: 18, r: [1.8, 3.4], depth: 12, dur: 4.2, color: "#FBFDF4", op: 0.7, seed: 21 },
  { n: 12, r: [2.8, 5], depth: 20, dur: 5.5, color: "#3F6B21", op: 0.4, seed: 43 },
];

function build(layer) {
  const rand = rng(layer.seed);
  return Array.from({ length: layer.n }, (_, i) => ({
    x: rand() * 100, y: rand() * 100,
    r: layer.r[0] + rand() * (layer.r[1] - layer.r[0]),
    delay: rand() * layer.dur,
    key: i,
  }));
}

const CSS = `
@keyframes md-twinkle { 0%, 100% { opacity: .15; } 50% { opacity: 1; } }
.md-layer { position: absolute; inset: 0; pointer-events: none; will-change: transform; }
.md-speck { animation: md-twinkle var(--d) ease-in-out var(--delay) infinite; }
@media (prefers-reduced-motion: reduce) { .md-speck { animation: none; opacity: .6; } }
`;

export default function MatchaDust({ reduced }) {
  const refs = useRef([]);
  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf;
    const move = (e) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; };
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      refs.current.forEach((el, i) => { if (el) el.style.transform = `translate3d(${cx * LAYERS[i].depth * 2}px, ${cy * LAYERS[i].depth * 2}px, 0)`; });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      <style>{CSS}</style>
      {LAYERS.map((layer, li) => (
        <svg key={li} className="md-layer" ref={(el) => (refs.current[li] = el)} width="100%" height="100%" preserveAspectRatio="none">
          {build(layer).map((p) => (
            <circle key={p.key} className="md-speck" cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill={layer.color} opacity={layer.op}
              style={{ "--d": `${layer.dur}s`, "--delay": `${p.delay}s` }} />
          ))}
        </svg>
      ))}
    </div>
  );
}
