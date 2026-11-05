import Reveal from "../Reveal";

/*
 * Visual I: the twelve weeks as four phases. Vertical rail on phones and
 * tablets, a horizontal rail from 900px.
 */

const CSS = `
.sn-tl { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); }
.sn-tl-item { position: relative; padding: 0 0 26px 30px; }
.sn-tl-item::before { content: ""; position: absolute; left: 5px; top: 8px; bottom: -8px; width: 2px; background: var(--border); }
.sn-tl-item:last-child::before { display: none; }
.sn-tl-item::after { content: ""; position: absolute; left: 0; top: 3px; width: 12px; height: 12px; border-radius: 50%; background: var(--bg); border: 2px solid var(--accent); }
.sn-tl-item:last-child::after { background: var(--accent); }
.sn-tl-weeks { font-family: var(--mono); font-size: var(--sn-small); font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin: 0 0 8px; }
@media (min-width: 900px) {
  .sn-tl { grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: 24px; }
  .sn-tl-item { padding: 30px 0 0; }
  .sn-tl-item::before { left: 0; right: -24px; top: 5px; bottom: auto; width: auto; height: 2px; }
  .sn-tl-item:last-child::before { display: block; right: 0; }
  .sn-tl-item::after { top: 0; }
}
`;

export default function Timeline({ phases, reduced }) {
  return (
    <div className="sn-visual">
      <style>{CSS}</style>
      <ol className="sn-tl" aria-label="Twelve-week timeline">
        {phases.map((p, i) => (
          <li key={p.weeks} className="sn-tl-item">
            <Reveal delay={i * 0.06} reduced={reduced}>
              <p className="sn-tl-weeks">{p.weeks}</p>
              <p className="sn-body">{p.work}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
