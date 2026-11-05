import { ArrowDownRight } from "lucide-react";
import Reveal from "../Reveal";

/*
 * Visual C: the old six-step chain (muted, leaking between every step) above
 * the new eight-step path, color-coded by who does each step. Horizontal on
 * desktop, a vertical stepper on phones.
 */

const CSS = `
.sn-flow-tag { display: inline-block; font-family: var(--mono); font-size: var(--sn-small); font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; border: 1px solid currentColor; border-radius: 999px; padding: 5px 12px; margin: 0 0 18px; }
.sn-flow-tag.is-before { color: var(--text-dim); }
.sn-flow-tag.is-after { color: var(--accent); }

.sn-before { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; max-width: 560px; }
.sn-before-step { padding: 12px 16px; border: 1px dashed var(--text-dim); border-radius: 12px; color: var(--text-mid); font-family: var(--body); font-size: 15px; line-height: 1.35; }
.sn-leak { display: flex; align-items: center; gap: 8px; padding: 6px 0 6px 16px; color: var(--text-mid); font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.08em; text-transform: uppercase; }
.sn-leak svg { flex-shrink: 0; }

.sn-legend { display: flex; flex-wrap: wrap; gap: 10px 22px; margin: 0 0 22px; padding: 0; list-style: none; }
.sn-legend li { display: flex; align-items: center; gap: 8px; font-family: var(--body); font-size: 14px; color: var(--text-mid); }
.sn-swatch { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }
.sn-swatch.is-speaker { background: var(--accent); }
.sn-swatch.is-team { border: 2px solid var(--text-dim); }

.sn-after { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); }
.sn-after-step { position: relative; display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 14px; align-items: start; padding-bottom: 20px; }
.sn-after-step:not(:last-child)::before { content: ""; position: absolute; left: 16px; top: 36px; bottom: 2px; width: 2px; background: var(--border); }
.sn-after-num { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; font-family: var(--mono); font-size: 14px; font-weight: 700; }
.sn-after-step.is-speaker .sn-after-num { background: var(--accent); color: var(--sn-on-accent); }
.sn-after-step.is-team .sn-after-num { border: 2px solid var(--text-dim); color: var(--text-mid); background: var(--bg); }
.sn-after-text { padding-top: 6px; font-family: var(--body); font-size: 15px; line-height: 1.4; }
.sn-after-step.is-speaker .sn-after-text { color: var(--text-light); font-weight: 500; }
.sn-after-step.is-team .sn-after-text { color: var(--text-mid); }
.sn-after-note { display: block; font-style: italic; color: var(--text-mid); font-weight: 400; }

@media (min-width: 640px) {
  .sn-after { grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: 16px; row-gap: 28px; }
  .sn-after-step { display: block; padding-bottom: 0; }
  .sn-after-step:not(:last-child)::before { left: 42px; right: -8px; top: 16px; bottom: auto; width: auto; height: 2px; }
  .sn-after-step:nth-child(4n)::before { display: none; }
  .sn-after-text { padding-top: 12px; }
}
@media (min-width: 1000px) {
  .sn-before { flex-direction: row; align-items: stretch; max-width: none; }
  .sn-before-step { flex: 1 1 0; min-width: 0; display: flex; align-items: center; }
  .sn-leak { flex-direction: column; justify-content: center; gap: 2px; padding: 0 6px; }
  .sn-leak-text { display: none; }
}
@media (min-width: 1100px) {
  .sn-after { grid-template-columns: repeat(8, minmax(0, 1fr)); column-gap: 12px; }
  .sn-after-step:nth-child(4n)::before { display: block; }
  .sn-after-step:last-child::before { display: none; }
  .sn-after-step:not(:last-child)::before { right: -6px; }
}
`;

function BeforeChain({ steps, caption }) {
  return (
    <figure style={{ margin: 0 }}>
      <p className="sn-flow-tag is-before">Before</p>
      <ol className="sn-before" aria-label={`Before: ${steps.join(", then ")}`}>
        {steps.flatMap((step, i) => {
          const item = <li key={step} className="sn-before-step">{step}</li>;
          if (i === 0) return [item];
          return [
            <li key={`${step}-leak`} className="sn-leak" aria-hidden="true">
              <ArrowDownRight size={16} />
              <span className="sn-leak-text">Drop-off</span>
            </li>,
            item,
          ];
        })}
      </ol>
      <figcaption className="sn-caption">{caption}</figcaption>
    </figure>
  );
}

function AfterPath({ steps, legend }) {
  return (
    <figure style={{ margin: "clamp(44px, 6vw, 64px) 0 0" }}>
      <p className="sn-flow-tag is-after">After</p>
      <ul className="sn-legend">
        <li><span className="sn-swatch is-speaker" aria-hidden="true" />{legend.speaker}</li>
        <li><span className="sn-swatch is-team" aria-hidden="true" />{legend.team}</li>
      </ul>
      <ol className="sn-after" aria-label={`After: ${steps.map((s) => s.label).join(", then ")}`}>
        {steps.map((step, i) => (
          <li key={step.label} className={`sn-after-step is-${step.by}`}>
            <span className="sn-after-num" aria-hidden="true">{i + 1}</span>
            <span className="sn-after-text">
              {step.label}
              {step.note && <span className="sn-after-note">{step.note}</span>}
              <span className="sn-sr">{`, ${legend[step.by].toLowerCase()}`}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export default function FlowCompare({ data, reduced }) {
  return (
    <div className="sn-visual">
      <style>{CSS}</style>
      <Reveal reduced={reduced}><BeforeChain {...data.before} /></Reveal>
      <Reveal delay={0.08} reduced={reduced}><AfterPath steps={data.after.steps} legend={data.legend} /></Reveal>
    </div>
  );
}
