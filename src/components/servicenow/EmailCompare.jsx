import Reveal from "../Reveal";
import { MockCaption } from "./primitives";

/*
 * Visual F: the old enrollment email beside the new acceptance email, plus
 * the matching before/after for the note to a speaker's manager. Email
 * bodies are placeholder bars so no real copy is reproduced.
 */

const CSS = `
.sn-emails { display: grid; grid-template-columns: minmax(0, 1fr); gap: 20px; }
.sn-email-fig { margin: 0; min-width: 0; display: flex; flex-direction: column; gap: 14px; }
.sn-email { display: flex; flex-direction: column; flex: 1; }
.sn-email-chrome { display: flex; gap: 6px; padding: 12px 16px; border-bottom: 1px solid var(--sn-paper-line); background: var(--sn-paper-2); }
.sn-email-chrome span { width: 10px; height: 10px; border-radius: 50%; background: var(--sn-paper-line); }
.sn-email-inner { padding: 18px 18px 22px; display: grid; gap: 14px; align-content: start; }
.sn-email-subject { margin: 2px 0 0; font-family: var(--display); font-weight: 700; font-size: 18px; line-height: 1.3; }
.sn-email-lines { display: grid; gap: 9px; }
.sn-email-link { display: block; height: 8px; border-radius: 99px; background: #9DB2E8; }
.sn-email-cta { justify-self: start; margin-top: 6px; }
.is-before .sn-email { opacity: 0.88; }
.is-before .sn-email-subject { color: var(--sn-ink-mid); font-weight: 600; }
.sn-email-note { display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline; font-family: var(--body); font-size: 15px; color: var(--text-mid); }
.sn-email-note strong { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.14em; text-transform: uppercase; }
.is-before .sn-email-note strong { color: var(--text-dim); }
.is-after .sn-email-note strong { color: var(--accent); }

.sn-mgr { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 18px; }
.sn-mgr-card { border-radius: 14px; padding: 16px 18px; font-family: var(--body); font-size: 17px; line-height: 1.4; display: grid; gap: 6px; }
.sn-mgr-card.is-before { border: 1px dashed var(--text-dim); color: var(--text-dim); }
.sn-mgr-card.is-after { border: 1px solid var(--accent-dim); background: var(--accent-bg); color: var(--text-light); font-weight: 500; }
.sn-mgr-card .sn-label { font-weight: 700; }
.sn-mgr-card.is-after .sn-label { color: var(--accent); }
@media (min-width: 760px) {
  .sn-emails, .sn-mgr { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
`;

/* Bar widths, in percent, for the placeholder body copy. */
const BEFORE_LINES = [100, 96, 100, 88, 100, 92, 100, 97, 64];
const AFTER_LINES = [82, 70, 48];

function Lines({ widths }) {
  return (
    <div className="sn-email-lines">
      {widths.map((w, i) => <span key={i} className="sn-bar" style={{ width: `${w}%` }} />)}
    </div>
  );
}

function Email({ variant, email, children }) {
  return (
    <figure className={`sn-email-fig is-${variant}`}>
      <div className="sn-paper sn-email" role="img" aria-label={`Recreated ${variant} email. Subject: ${email.subject}. ${email.note}`}>
        <div className="sn-email-chrome" aria-hidden="true"><span /><span /><span /></div>
        <div className="sn-email-inner">
          <div>
            <p className="sn-paper-label">Subject</p>
            <p className="sn-email-subject">{email.subject}</p>
          </div>
          {children}
        </div>
      </div>
      <figcaption className="sn-email-note"><strong>{email.label}</strong><span>{email.note}</span></figcaption>
    </figure>
  );
}

export default function EmailCompare({ before, after, reduced }) {
  return (
    <div className="sn-visual">
      <style>{CSS}</style>
      <div className="sn-emails">
        <Reveal reduced={reduced}>
          <Email variant="before" email={before}>
            <Lines widths={BEFORE_LINES} />
            <div className="sn-email-lines" style={{ maxWidth: "60%" }}>
              {[70, 90, 55, 80].map((w, i) => <span key={i} className="sn-email-link" style={{ width: `${w}%` }} />)}
            </div>
            <Lines widths={BEFORE_LINES.slice(0, 4)} />
          </Email>
        </Reveal>
        <Reveal delay={0.08} reduced={reduced}>
          <Email variant="after" email={after}>
            <Lines widths={AFTER_LINES} />
            <span className="sn-pbtn is-primary sn-email-cta">{after.cta}</span>
          </Email>
        </Reveal>
      </div>
      <MockCaption />
    </div>
  );
}

export function ManagerNote({ manager, reduced }) {
  return (
    <Reveal reduced={reduced}>
      <div style={{ marginTop: "clamp(32px, 4vw, 44px)" }}>
        <h3 className="sn-h3">{manager.title}</h3>
        <div className="sn-mgr">
          <p className="sn-mgr-card is-before"><span className="sn-label">Before</span><span>{manager.before}</span></p>
          <p className="sn-mgr-card is-after"><span className="sn-label">After</span><span>{manager.after}</span></p>
        </div>
      </div>
    </Reveal>
  );
}
