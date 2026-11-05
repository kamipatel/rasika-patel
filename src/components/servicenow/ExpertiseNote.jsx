import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { MockCaption } from "./primitives";
import { applicant } from "../../data/servicenow";

/*
 * Visual H: one expertise note before and after the rewrite, then the row of
 * data-cleanup numbers. The note is a recreation with fake content.
 */

const CSS = `
.sn-xn { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; align-items: center; }
.sn-xn-fig { margin: 0; min-width: 0; display: grid; gap: 12px; }
.sn-xn-before .sn-paper { opacity: 0.85; padding: 18px; }
.sn-xn-messy { margin: 8px 0 0; font-family: var(--mono); font-size: 14px; line-height: 1.6; color: var(--sn-ink-mid); }
.sn-xn-arrow { display: grid; place-items: center; color: var(--accent); transform: rotate(90deg); }
.sn-xn-after .sn-paper { padding: clamp(16px, 2.4vw, 24px); }
.sn-xn-fields { display: grid; gap: 12px; margin: 12px 0 0; }
.sn-xn-field { display: grid; gap: 2px; padding-top: 12px; border-top: 1px solid var(--sn-paper-line); }
.sn-xn-field dt { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.08em; text-transform: uppercase; color: var(--sn-ink-accent); }
.sn-xn-field dd { margin: 0; color: var(--sn-ink); line-height: 1.5; }
.sn-xn-tag { display: inline-flex; font-family: var(--mono); font-size: var(--sn-small); font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
.sn-xn-before .sn-xn-tag { color: var(--text-dim); }
.sn-xn-after .sn-xn-tag { color: var(--accent); }

.sn-datastats { list-style: none; margin: clamp(32px, 4vw, 44px) 0 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); border: 1px solid var(--border); border-radius: 18px; background: var(--card); overflow: hidden; }
.sn-datastats li { padding: 20px 22px; display: grid; gap: 8px; align-content: start; }
.sn-datastats li + li { border-top: 1px solid var(--border); }
.sn-datastats b { font-family: var(--display); font-weight: 800; font-size: clamp(34px, 4vw, 46px); letter-spacing: -0.03em; line-height: 1; color: var(--accent); font-variant-numeric: tabular-nums; }
.sn-datastats li.is-text b { font-size: clamp(20px, 2vw, 24px); letter-spacing: -0.01em; line-height: 1.2; color: var(--text-light); }
.sn-datastats span { font-family: var(--body); font-size: 15px; line-height: 1.45; color: var(--text-mid); }
@media (min-width: 640px) {
  .sn-datastats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sn-datastats li:nth-child(2) { border-top: 0; border-left: 1px solid var(--border); }
  .sn-datastats li:nth-child(4) { border-left: 1px solid var(--border); }
}
@media (min-width: 900px) {
  .sn-xn { grid-template-columns: minmax(0, 0.8fr) 40px minmax(0, 1.2fr); }
  .sn-xn-arrow { transform: none; }
}
@media (min-width: 1000px) {
  .sn-datastats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .sn-datastats li + li { border-top: 0; border-left: 1px solid var(--border); }
}
`;

export default function ExpertiseNote({ data, reduced }) {
  const afterLabel = `Recreated expertise note for a fake speaker, ${applicant.name}, after the rewrite: ${data.after
    .map(([k, v]) => `${k}: ${v}`)
    .join(". ")}.`;

  return (
    <div className="sn-visual">
      <style>{CSS}</style>
      <Reveal reduced={reduced}>
        <div className="sn-xn">
          <figure className="sn-xn-fig sn-xn-before">
            <figcaption className="sn-xn-tag">Before</figcaption>
            <div className="sn-paper" role="img" aria-label={`Recreated expertise note before the rewrite, one messy line: ${data.before}`}>
              <p className="sn-paper-label">Expertise notes</p>
              <p className="sn-xn-messy">{data.before}</p>
            </div>
          </figure>
          <div className="sn-xn-arrow" aria-hidden="true"><ArrowRight size={28} /></div>
          <figure className="sn-xn-fig sn-xn-after">
            <figcaption className="sn-xn-tag">After</figcaption>
            <div className="sn-paper" role="img" aria-label={afterLabel}>
              <p className="sn-paper-label">Expertise notes · {applicant.name}</p>
              <dl className="sn-xn-fields">
                {data.after.map(([k, v]) => (
                  <div key={k} className="sn-xn-field"><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
          </figure>
        </div>
      </Reveal>
      <MockCaption />

      <Reveal delay={0.08} reduced={reduced}>
        <ul className="sn-datastats">
          {data.stats.map((s) => (
            <li key={s.label} className={s.value ? undefined : "is-text"}>
              {s.value ? <><b>{s.value}</b><span>{s.label}</span></> : <b>{s.label}</b>}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
