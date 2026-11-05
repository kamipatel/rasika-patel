import { CircleCheck } from "lucide-react";
import Reveal from "../Reveal";
import StatCount from "./StatCount";

/*
 * Impact: delivered results on top and large, projections below, smaller
 * and visibly muted so they never read as measured.
 */

const CSS = `
.sn-impact { display: grid; gap: 18px; margin-top: 28px; }
.sn-impact-tag { display: inline-block; font-family: var(--mono); font-size: var(--sn-small); font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; border: 1px solid currentColor; border-radius: 999px; padding: 5px 12px; margin: 0 0 22px; }
.sn-delivered { border: 1px solid var(--accent-dim); background: var(--accent-bg); border-radius: 20px; padding: clamp(22px, 3vw, 34px); }
.sn-delivered .sn-impact-tag { color: var(--accent); }
.sn-delivered-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; }
.sn-delivered-num { display: block; font-family: var(--display); font-weight: 800; font-size: clamp(52px, 7vw, 84px); letter-spacing: -0.04em; line-height: 0.95; color: var(--accent); font-variant-numeric: tabular-nums; }
.sn-delivered-label { display: block; margin-top: 10px; font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-mid); line-height: 1.5; }
.sn-delivered-outcome { display: flex; align-items: center; gap: 12px; margin: 26px 0 0; padding-top: 22px; border-top: 1px solid var(--accent-dim); font-family: var(--display); font-weight: 700; font-size: clamp(19px, 2vw, 24px); line-height: 1.3; color: var(--text-light); }
.sn-delivered-outcome svg { flex-shrink: 0; color: var(--accent); }
.sn-projected { border: 1px dashed var(--border); border-radius: 18px; padding: clamp(18px, 2.4vw, 26px); }
.sn-projected .sn-impact-tag { color: var(--text-dim); margin-bottom: 18px; }
.sn-projected-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
.sn-projected-num { display: block; font-family: var(--display); font-weight: 700; font-size: clamp(24px, 2.6vw, 30px); letter-spacing: -0.02em; color: var(--text-mid); }
.sn-projected-label { display: block; margin-top: 6px; font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); }
.sn-projected-note { margin: 18px 0 0; padding-top: 14px; border-top: 1px solid var(--border); font-family: var(--body); font-size: 14px; font-style: italic; line-height: 1.6; color: var(--text-dim); }
@media (min-width: 640px) {
  .sn-delivered-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .sn-projected-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
`;

export default function ImpactStats({ delivered, projected, reduced }) {
  return (
    <div className="sn-impact">
      <style>{CSS}</style>
      <Reveal reduced={reduced}>
        <div className="sn-delivered">
          <p className="sn-impact-tag">{delivered.label}</p>
          <ul className="sn-delivered-grid">
            {delivered.stats.map((s) => (
              <li key={s.label}>
                <StatCount value={s.value} className="sn-delivered-num" />
                <span className="sn-delivered-label">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="sn-delivered-outcome"><CircleCheck size={26} aria-hidden="true" />{delivered.outcome}</p>
        </div>
      </Reveal>
      <Reveal delay={0.08} reduced={reduced}>
        <div className="sn-projected">
          <p className="sn-impact-tag">{projected.label} (not measured)</p>
          <ul className="sn-projected-grid">
            {projected.stats.map((s) => (
              <li key={s.label}>
                <span className="sn-projected-num">{s.value}</span>
                <span className="sn-projected-label">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="sn-projected-note">{projected.note}</p>
        </div>
      </Reveal>
    </div>
  );
}
