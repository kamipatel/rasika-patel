import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

const TABS = [
  {
    id: "marketing",
    label: "Marketing",
    body: (
      <>
        I ran marketing at Texas Momentum, where our content hit 150K+ organic views. In summer 2026 I interned in marketing at ServiceNow in New York. Now I'm at the Harkey Institute at McCombs, running marketing for the entrepreneurship programs.
      </>
    ),
  },
  {
    id: "building",
    label: "Building",
    body: (
      <>
        I built <Link to="/work/xplore" className="about-link">Xplore Austin</Link> solo with Claude Code. At Harkey I build Claude workflows that turn our Meta analytics into what to post next.
      </>
    ),
  },
  {
    id: "design",
    label: "Design",
    body: (
      <>
        I was Director of Design and Marketing at Texas Momentum. When I'm not in Figma, I'm making playlists, trying food around Austin, or hunting for the best matcha in the city. Always happy to share my recs.
      </>
    ),
  },
];

const CSS = `
.about-wrap { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 32px; align-items: start; }
.about-label { grid-column: 1 / span 5; position: relative; background: var(--foam); color: var(--text-light); border: 2px solid var(--text-light); border-radius: 28px; padding: 28px 28px 24px; box-shadow: 6px 6px 0 var(--accent); }
.about-label::before, .about-label::after { content: ""; position: absolute; top: 50%; width: 14px; height: 14px; border-radius: 50%; background: var(--bg); border: 2px solid var(--text-light); }
.about-label::before { left: -8px; } .about-label::after { right: -8px; }
.about-label dl { margin: 0; font-family: var(--mono); font-size: 14px; line-height: 1.5; }
.about-label dt { color: var(--text-dim); font-size: 12px; margin-top: 14px; }
.about-label dd { margin: 2px 0 0; color: var(--text-light); font-weight: 600; }
.about-copy { grid-column: 6 / span 7; }
.about-chips { position: relative; display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: nowrap; }
.about-ind { position: absolute; left: 0; top: 0; height: 44px; border-radius: 999px; background: var(--text-light); transition: transform 220ms cubic-bezier(0.77,0,0.175,1), width 220ms cubic-bezier(0.77,0,0.175,1); pointer-events: none; }
.about-chip { position: relative; z-index: 1; font-family: var(--body); font-size: 16px; font-weight: 600; min-height: 44px; padding: 0 20px; border-radius: 999px; border: 1.5px solid var(--text-light); background: transparent; color: var(--text-light); cursor: pointer; transition: transform 160ms cubic-bezier(0.23,1,0.32,1), background-color 160ms cubic-bezier(0.23,1,0.32,1); }
.about-chip[aria-pressed="true"] { color: var(--bg); }
.about-chip:active { transform: scale(0.97); }
.about-chip:focus-visible, .about-link:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.about-body { font-family: var(--body); font-size: clamp(18px, 2vw, 21px); line-height: 1.6; max-width: 58ch; color: var(--text-light); margin: 0; animation: aboutIn 200ms cubic-bezier(0.23,1,0.32,1); }
.about-link { color: var(--accent); font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
@keyframes aboutIn { from { opacity: 0; filter: blur(2px); transform: translateY(4px); } to { opacity: 1; filter: blur(0); transform: none; } }
@media (max-width: 820px) {
  .about-wrap { gap: 28px; } .about-label, .about-copy { grid-column: 1 / -1; } .about-label { padding: 20px; }
  .about-chips { overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 6px; } .about-chip { scroll-snap-align: start; flex: none; }
}
@media (prefers-reduced-motion: reduce) { .about-body { animation: aboutFade 120ms linear; } .about-chip, .about-ind { transition: none; } }
@keyframes aboutFade { from { opacity: 0; } to { opacity: 1; } }
`;

export default function AboutLabel() {
  const [tab, setTab] = useState("marketing");
  const current = TABS.find((t) => t.id === tab);
  const btns = useRef({});
  const [ind, setInd] = useState({ x: 0, w: 0 });
  useLayoutEffect(() => {
    const el = btns.current[tab];
    if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
  }, [tab]);
  return (
    <div className="about-wrap">
      <style>{CSS}</style>
      <div className="about-label" aria-label="Name label">
        <dl>
          <dt>for</dt><dd>Rasika Patel</dd>
          <dt>studying</dt><dd>UT Austin, McCombs</dd>
          <dt>founder of</dt><dd>Xplore Austin</dd>
          <dt>currently</dt><dd>Communications at the Harkey Institute</dd>
          <dt>open to</dt><dd>Summer 2027 internships</dd>
        </dl>
      </div>
      <div className="about-copy">
        <div className="about-chips" role="group" aria-label="Pick a topic">
          <span className="about-ind" aria-hidden="true" style={{ width: ind.w, transform: `translateX(${ind.x}px)` }} />
          {TABS.map((t) => (
            <button key={t.id} ref={(el) => (btns.current[t.id] = el)} type="button" className="about-chip" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <p className="about-body" key={tab} aria-live="polite">{current.body}</p>
      </div>
    </div>
  );
}
