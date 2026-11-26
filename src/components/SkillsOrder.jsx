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
.so-foot { margin-top: 24px; padding-top: 18px; border-top: 2px solid var(--text-light); display: flex; justify-content: space-between; gap: 16px; font-family: var(--mono); font-size: 14px; color: var(--text-light); flex-wrap: wrap; }
.so-note { font-family: var(--body); font-size: 16px; color: var(--text-dim); margin-top: 20px; max-width: 62ch; }
@media (max-width: 720px) { .so-panel { padding: 22px 18px; border-radius: 24px; } .so-row { grid-template-columns: 1fr; gap: 8px; } .so-group { padding-top: 0; } }
@media (prefers-reduced-motion: reduce) { .so-pill { transition: none; } }
`;

export default function SkillsOrder() {
  const [picked, setPicked] = useState(() => new Set());
  const toggle = (name) => setPicked((prev) => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });
  const n = picked.size;
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
          <span>{n === 0 ? "Tap anything to add it to the order" : `${n} on the order`}</span>
          {n > 0 && <button type="button" className="so-pill" style={{ minHeight: 32, padding: "0 12px", fontSize: 12 }} onClick={() => setPicked(new Set())}>Clear</button>}
        </div>
      </div>
      <p className="so-note">Relevant coursework: Software Design, Decision Science, MIS, Design Thinking, Business Stats.</p>
    </div>
  );
}
