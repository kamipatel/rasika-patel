import { Lock } from "lucide-react";
import Reveal from "../Reveal";
import { Mockup } from "./primitives";
import { applicant } from "../../data/servicenow";

/*
 * Visual G: the recreated speaker ratings card a coordinator sees before
 * booking. Every number is fake.
 */

const SCALE_MAX = 5;

const CSS = `
.sn-rate { padding: clamp(16px, 2.6vw, 26px); display: grid; gap: 18px; }
.sn-rate-head { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 10px; }
.sn-rate-title { font-family: var(--display); font-weight: 800; font-size: 20px; letter-spacing: -0.02em; margin: 2px 0 0; }
.sn-rate-lock { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.06em; text-transform: uppercase; color: var(--sn-ink-dim); border: 1px solid var(--sn-paper-line); border-radius: 99px; padding: 4px 10px; }
.sn-rate-tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; }
.sn-rate-tile { border: 1px solid var(--sn-paper-line); border-radius: 12px; background: #fff; padding: 12px; display: grid; gap: 4px; min-width: 0; }
.sn-rate-num { font-family: var(--display); font-weight: 800; font-size: clamp(22px, 2.4vw, 28px); letter-spacing: -0.02em; line-height: 1; }
.sn-rate-num small { font-size: 14px; font-weight: 600; color: var(--sn-ink-dim); letter-spacing: 0; }
.sn-rate-sub { color: var(--sn-ink-dim); }
.sn-rate-legend { display: flex; gap: 16px; margin: 0; }
.sn-rate-legend span { display: inline-flex; align-items: center; gap: 6px; color: var(--sn-ink-mid); }
.sn-rate-legend i { width: 10px; height: 10px; border-radius: 3px; }
.sn-rate-ext { background: var(--accent); }
.sn-rate-int { background: #7C6FA8; }
.sn-rate-row { display: grid; gap: 6px; }
.sn-rate-row > p { margin: 0; font-weight: 600; }
.sn-rate-bar { display: grid; grid-template-columns: minmax(0, 1fr) 32px; align-items: center; gap: 10px; }
.sn-rate-track { height: 10px; border-radius: 99px; background: var(--sn-paper-2); overflow: hidden; }
.sn-rate-fill { display: block; height: 100%; border-radius: 99px; }
.sn-rate-bar b { font-weight: 600; text-align: right; color: var(--sn-ink-mid); }
.sn-rate-notes { border-top: 1px solid var(--sn-paper-line); padding-top: 14px; display: grid; gap: 10px; }
.sn-rate-note { margin: 0; padding: 10px 12px; border-radius: 10px; background: var(--sn-paper-2); color: var(--sn-ink-mid); line-height: 1.5; }
.sn-rate-note strong { color: var(--sn-ink); font-weight: 600; }
`;

function Tile({ value, suffix, sub, title }) {
  return (
    <div className="sn-rate-tile">
      <p className="sn-paper-label">{title}</p>
      <p className="sn-rate-num" style={{ margin: 0 }}>{value}{suffix && <small> {suffix}</small>}</p>
      {sub && <span className="sn-rate-sub">{sub}</span>}
    </div>
  );
}

function Bar({ value, tone }) {
  return (
    <div className="sn-rate-bar">
      <span className="sn-rate-track"><span className={`sn-rate-fill ${tone}`} style={{ width: `${(value / SCALE_MAX) * 100}%` }} /></span>
      <b>{value.toFixed(1)}</b>
    </div>
  );
}

function RatingsCard({ ratings }) {
  return (
    <div className="sn-rate">
      <div className="sn-rate-head">
        <div>
          <p className="sn-paper-label">Speaker ratings</p>
          <p className="sn-rate-title">{applicant.name}</p>
        </div>
        <span className="sn-rate-lock"><Lock size={12} />Coordinators only</span>
      </div>

      <div className="sn-rate-tiles">
        <Tile title="External" value={ratings.external.score} suffix="/ 5" sub={`(${ratings.external.count})`} />
        <Tile title="Internal" value={ratings.internal.score} suffix="/ 5" sub={`(${ratings.internal.count})`} />
        <Tile title="Briefings" value={ratings.briefings} />
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <p className="sn-rate-legend">
          <span><i className="sn-rate-ext" />External</span>
          <span><i className="sn-rate-int" />Internal</span>
        </p>
        {ratings.breakdown.map((row) => (
          <div key={row.label} className="sn-rate-row">
            <p>{row.label}</p>
            <Bar value={row.external} tone="sn-rate-ext" />
            <Bar value={row.internal} tone="sn-rate-int" />
          </div>
        ))}
      </div>

      <div className="sn-rate-notes">
        <p className="sn-paper-label">Internal review notes</p>
        {ratings.notes.map((note) => (
          <p key={note.who} className="sn-rate-note"><strong>{note.who} · {note.date}:</strong> {note.text}</p>
        ))}
      </div>
    </div>
  );
}

export default function RatingsMockup({ data, reduced }) {
  const { ratings, body } = data;
  const label = `Recreated speaker ratings card for a fake speaker, ${applicant.name}, with fake numbers. External rating ${ratings.external.score} out of 5 (${ratings.external.count}), internal rating ${ratings.internal.score} out of 5 (${ratings.internal.count}), ${ratings.briefings} briefings. Bars compare external and internal scores for ${ratings.breakdown
    .map((r) => r.label.toLowerCase())
    .join(" and ")}. Internal review notes: ${ratings.notes.map((n) => `${n.who}, ${n.date}: ${n.text}`).join(" ")}`;

  return (
    <div className="sn-visual sn-split">
      <style>{CSS}</style>
      <Reveal reduced={reduced}>
        <Mockup label={label}><RatingsCard ratings={ratings} /></Mockup>
      </Reveal>
      <Reveal delay={0.1} reduced={reduced}>
        <p className="sn-lead" style={{ marginTop: 0 }}>{body}</p>
      </Reveal>
    </div>
  );
}
