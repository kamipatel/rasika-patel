import { Check, CircleCheck, Pencil, RefreshCw, Sparkles } from "lucide-react";
import Reveal from "../Reveal";
import { Mockup } from "./primitives";
import { applicant } from "../../data/servicenow";

/*
 * Visual E: the recreated onboarding screen (progress, pre-filled details,
 * AI-drafted bio), followed by the certification gate.
 */

const CSS = `
.sn-onb { padding: clamp(16px, 2.6vw, 26px); display: grid; gap: 18px; }
.sn-onb-title { font-family: var(--display); font-weight: 800; font-size: 20px; letter-spacing: -0.02em; margin: 2px 0 0; }
.sn-progress { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.sn-progress li { display: flex; align-items: center; gap: 10px; font-weight: 600; color: var(--sn-ink-dim); }
.sn-progress-dot { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--sn-paper-line); background: #fff; flex-shrink: 0; }
.sn-progress li.is-done { color: var(--sn-ink); }
.sn-progress li.is-done .sn-progress-dot { background: var(--sn-ok); border-color: var(--sn-ok); color: #fff; }
.sn-progress li.is-current { color: var(--sn-ink-accent); }
.sn-progress li.is-current .sn-progress-dot { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.18); }
.sn-progress li.is-current .sn-progress-dot::after { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
.sn-prefill { border: 1px solid var(--sn-ok-line); background: var(--sn-ok-bg); border-radius: 14px; padding: 14px 16px; }
.sn-prefill-head { display: flex; align-items: center; gap: 8px; margin: 0 0 10px; font-weight: 700; color: var(--sn-ok); }
.sn-prefill-rows { display: grid; grid-template-columns: minmax(0, 1fr); gap: 6px 18px; }
.sn-prefill-row { display: grid; grid-template-columns: 14px minmax(0, 1fr); gap: 8px; min-width: 0; }
.sn-prefill-row svg { color: var(--sn-ok); margin-top: 4px; }
.sn-prefill-row p { margin: 0; color: var(--sn-ink-dim); }
.sn-prefill-row strong { font-weight: 600; color: var(--sn-ink); }
.sn-bio { border: 1px solid var(--sn-paper-line); border-radius: 14px; padding: 14px 16px; background: #fff; display: grid; gap: 10px; }
.sn-bio-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.sn-bio-head p { margin: 0; font-weight: 700; }
.sn-ai-tag { display: inline-flex; align-items: center; gap: 5px; font-family: var(--mono); font-size: var(--sn-small); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sn-ink-accent); background: #FFEDE4; border-radius: 99px; padding: 3px 10px; }
.sn-bio-text { margin: 0; color: var(--sn-ink-mid); line-height: 1.55; }
.sn-bio-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.sn-bio-actions .sn-pbtn { padding: 7px 12px; }

.sn-gate { margin-top: clamp(36px, 5vw, 56px); display: grid; gap: 16px; }
.sn-gate-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.sn-gate-chip { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-light); border: 1px solid var(--border); background: var(--card); border-radius: 999px; padding: 8px 14px; }
.sn-gate-bar { font-family: var(--mono); font-size: var(--sn-small); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sn-on-accent); background: var(--accent); border-radius: 999px; padding: 8px 14px; }
@media (min-width: 640px) {
  .sn-progress { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .sn-progress li { flex-direction: column; align-items: flex-start; gap: 8px; font-size: 14px; }
  .sn-prefill-rows { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
`;

const STATE_LABEL = { done: "done", current: "in progress", todo: "next" };

function OnboardingScreen({ data }) {
  return (
    <div className="sn-onb">
      <div>
        <p className="sn-paper-label">Speaker onboarding</p>
        <p className="sn-onb-title">Welcome, {applicant.name.split(" ")[0]}</p>
      </div>

      <ol className="sn-progress">
        {data.progress.map((step) => (
          <li key={step.label} className={`is-${step.state}`}>
            <span className="sn-progress-dot">{step.state === "done" && <Check size={14} strokeWidth={3} />}</span>
            <span>{step.label}</span>
          </li>
        ))}
      </ol>

      <div className="sn-prefill">
        <p className="sn-prefill-head"><CircleCheck size={18} />Pre-filled from your application</p>
        <div className="sn-prefill-rows">
          {data.prefilled.map(([label, value]) => (
            <div key={label} className="sn-prefill-row">
              <Check size={14} strokeWidth={3} />
              <p>{label} <strong>{value}</strong></p>
            </div>
          ))}
        </div>
      </div>

      <div className="sn-bio">
        <div className="sn-bio-head">
          <p>Bio</p>
          <span className="sn-ai-tag"><Sparkles size={13} />AI draft</span>
        </div>
        <p className="sn-bio-text">{data.bio}</p>
        <div className="sn-bio-actions">
          <span className="sn-pbtn"><Pencil size={14} />Edit</span>
          <span className="sn-pbtn is-primary"><Check size={14} strokeWidth={3} />Approve</span>
          <span className="sn-pbtn"><RefreshCw size={14} />Regenerate</span>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingMockup({ data, reduced }) {
  const progress = data.progress.map((s) => `${s.label} ${STATE_LABEL[s.state]}`).join(", ");
  const label = `Recreated onboarding screen for a fake speaker, ${applicant.name}. Progress: ${progress}. A green block lists details pre-filled from the application: ${data.prefilled
    .map(([k, v]) => `${k}, ${v}`)
    .join("; ")}. A bio box tagged AI draft shows a two-line bio with Edit, Approve, and Regenerate buttons.`;

  return (
    <>
      <style>{CSS}</style>
      <div className="sn-visual sn-split is-flipped">
        <Reveal reduced={reduced}>
          <Mockup label={label}><OnboardingScreen data={data} /></Mockup>
        </Reveal>
        <Reveal delay={0.1} reduced={reduced}>
          <p className="sn-lead" style={{ marginTop: 0 }}>{data.body}</p>
        </Reveal>
      </div>
    </>
  );
}

export function CertificationGate({ gate, reduced }) {
  return (
    <Reveal reduced={reduced}>
      <div className="sn-gate sn-card">
        <h3 className="sn-h3">{gate.title}</h3>
        <div className="sn-gate-row" role="list" aria-label="Scored on">
          {gate.rubric.map((item) => <span key={item} role="listitem" className="sn-gate-chip">{item}</span>)}
          <span role="listitem" className="sn-gate-bar">{gate.threshold}</span>
        </div>
        <p className="sn-body">{gate.body}</p>
      </div>
    </Reveal>
  );
}
