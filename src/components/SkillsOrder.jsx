import { useState } from "react";
import { skillGroups } from "../data/skills";

const CSS = `
.so-panel { background: var(--foam); border: 2px solid var(--text-light); border-radius: 32px; padding: 40px; box-shadow: 8px 8px 0 var(--accent); }
.so-row { display: grid; grid-template-columns: 150px minmax(0,1fr); gap: 16px; padding: 18px 0; border-top: 1.5px dashed rgba(20,41,27,0.25); align-items: start; }
.so-row:first-of-type { border-top: 0; padding-top: 0; }
.so-group { font-family: var(--body); font-weight: 700; font-size: 19px; color: var(--text-light); padding-top: 9px; }
.so-pills { display: flex; flex-wrap: wrap; gap: 10px; }
.so-pill { font-family: var(--mono); font-size: 14px; min-height: 44px; padding: 0 18px; border-radius: 999px; border: 1.5px solid var(--text-light); background: transparent; color: var(--text-light); cursor: pointer; transition: transform 160ms cubic-bezier(0.23,1,0.32,1), background-color 160ms cubic-bezier(0.23,1,0.32,1), color 160ms; }
.so-pill[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: #fff; }
.so-pill:active { transform: scale(0.96); }
.so-pill:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.so-foot { margin-top: 24px; padding-top: 18px; border-top: 2px solid var(--text-light); display: flex; align-items: center; justify-content: space-between; gap: 16px; font-family: var(--mono); font-size: 14px; color: var(--text-light); flex-wrap: wrap;
}
.so-cup { display: flex; align-items: center; gap: 14px; }
.so-fill { transition: transform 320ms cubic-bezier(0.34,1.56,0.64,1); }
.so-pill[aria-pressed="true"] { animation: so-plop 280ms cubic-bezier(0.23,1,0.32,1); }
@keyframes so-plop { 0% { transform: translateY(-6px) scale(1.06); } 100% { transform: none; } }
@media (prefers-reduced-motion: reduce) { .so-fill { transition: none; } .so-pill[aria-pressed="true"] { animation: none; } }
.so-foot-x { font-family: var(--mono); font-size: 14px; color: var(--text-light); flex-wrap: wrap; }
.so-note { font-family: var(--body); font-size: 16px; color: var(--text-dim); margin-top: 20px; max-width: 62ch; }
@media (max-width: 720px) { .so-panel { padding: 22px 18px; border-radius: 24px; } .so-row { grid-template-columns: 1fr; gap: 8px; } .so-group { padding-top: 0; } }
@media (prefers-reduced-motion: reduce) { .so-pill { transition: none; } }
`;

export default function SkillsOrder() {
  const [picked, setPicked] = useState(() => new Set());
  const toggle = (name) => setPicked((prev) => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });
  const n = picked.size;
  const total = skillGroups.reduce((a, g) => a + g.items.length, 0);
  const level = Math.min(1, n / total);
  return (
    <div>
      <style>{CSS}</style>
      <div className="so-panel">
        {skillGroups.map((g) => (
          <div className="so-row" key={g.label}>
            <div className="so-group">{g.label}</div>
            <div className="so-pills">
              {g.items.map((it) => (
                <button key={it} type="button" className="so-pill" aria-pressed={picked.has(it)} onClick={() => toggle(it)}>{it}</button>
              ))}
            </div>
          </div>
        ))}
        <div className="so-foot" aria-live="polite">
          <span className="so-cup">
            <svg width="44" height="56" viewBox="0 0 44 56" aria-hidden="true">
              <defs><clipPath id="so-clip"><path d="M6 8 H38 L34 52 H10 Z" /></clipPath></defs>
              <g clipPath="url(#so-clip)">
                <rect x="0" y="0" width="44" height="56" fill="var(--bg)" />
                <rect className="so-fill" x="0" y="8" width="44" height="48" fill="var(--accent)" style={{ transform: `translateY(${(1 - level) * 46}px)` }} />
              </g>
              <path d="M6 8 H38 L34 52 H10 Z" fill="none" stroke="var(--text-light)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M26 2 L30 8" stroke="var(--text-light)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span>{n === 0 ? "Tap anything to add it to the order" : `${n} ${n === 1 ? "item" : "items"} on the order`}</span>
          </span>
          {n > 0 && <button type="button" className="so-pill" style={{ minHeight: 32, padding: "0 12px", fontSize: 12 }} onClick={() => setPicked(new Set())}>Clear</button>}
        </div>
      </div>
      <p className="so-note">Relevant coursework: Software Design, Decision Science, MIS, Design Thinking, Business Stats.</p>
    </div>
  );
}
