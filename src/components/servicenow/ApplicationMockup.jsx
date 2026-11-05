import { ChevronDown, Lock } from "lucide-react";
import Reveal from "../Reveal";
import { Mockup } from "./primitives";
import { applicant } from "../../data/servicenow";

/*
 * Visual D: the recreated speaker application, with numbered markers that
 * match the annotations beside it. A picture of a form, not a working one.
 */

const CSS = `
.sn-app { padding: clamp(16px, 2.6vw, 28px); display: grid; gap: 22px; }
.sn-app-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding-bottom: 18px; border-bottom: 1px solid var(--sn-paper-line); }
.sn-app-title { font-family: var(--display); font-weight: 800; font-size: 22px; letter-spacing: -0.02em; margin: 0 0 4px; }
.sn-app-sec { display: grid; gap: 12px; }
.sn-app-sec + .sn-app-sec { padding-top: 20px; border-top: 1px solid var(--sn-paper-line); }
.sn-app-sec-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.sn-app-sec-title { display: flex; align-items: baseline; gap: 10px; font-weight: 700; font-size: 16px; margin: 0; }
.sn-app-sec-title span:first-child { font-family: var(--mono); font-size: var(--sn-small); color: var(--sn-ink-dim); }
.sn-app-optional { font-weight: 400; font-size: 14px; color: var(--sn-ink-dim); }
.sn-app-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; }
.sn-app-q { display: grid; gap: 6px; }
.sn-app-q > p { margin: 0; font-size: 14px; font-weight: 600; color: var(--sn-ink-mid); }
.sn-app-area { min-height: 76px; align-items: flex-start; }
.sn-app-scale { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.sn-app-scale span { display: grid; place-items: center; height: 38px; border-radius: 10px; border: 1px solid var(--sn-paper-line); background: #fff; font-weight: 600; color: var(--sn-ink-mid); }
.sn-app-scale span.is-on { background: var(--accent); border-color: var(--accent); color: var(--sn-on-accent); }
.sn-app-foot { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; padding-top: 18px; border-top: 1px solid var(--sn-paper-line); }
@media (min-width: 560px) {
  .sn-app-grid.is-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .sn-app-grid.is-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
`;

function Q({ label, children }) {
  return (
    <div className="sn-app-q">
      <p>{label}</p>
      {children}
    </div>
  );
}

function Chips({ items, selected }) {
  const on = new Set([].concat(selected));
  return (
    <div className="sn-pchips">
      {items.map((item) => (
        <span key={item} className={`sn-pchip${on.has(item) ? " is-on" : ""}`}>{item}</span>
      ))}
    </div>
  );
}

function AppSection({ num, title, optional, marker, children }) {
  return (
    <div className="sn-app-sec">
      <div className="sn-app-sec-head">
        <p className="sn-app-sec-title">
          <span>{num}</span>
          <span>{title}{optional && <span className="sn-app-optional"> (optional)</span>}</span>
        </p>
        {marker && <span className="sn-marker">{marker}</span>}
      </div>
      {children}
    </div>
  );
}

function ApplicationForm({ form }) {
  return (
    <div className="sn-app">
      <div className="sn-app-head">
        <div>
          <p className="sn-app-title">{form.title}</p>
          <p className="sn-paper-label">{form.meta}</p>
        </div>
        <span className="sn-marker">1</span>
      </div>

      <AppSection num="1" title="Who you are">
        <div className="sn-app-grid is-3">
          {[["Name", applicant.name], ["Title", applicant.title], ["Location", applicant.location]].map(([label, value]) => (
            <Q key={label} label={label}>
              <span className="sn-field is-auto">{value}<Lock size={14} aria-hidden="true" /></span>
            </Q>
          ))}
        </div>
        <Q label="Nearest briefing center">
          <span className="sn-field">{form.nearestCenter}<ChevronDown size={16} aria-hidden="true" /></span>
        </Q>
        <Q label="How did you hear about us?">
          <Chips items={form.heardFrom} selected={form.heardFromSelected} />
        </Q>
      </AppSection>

      <AppSection num="2" title="Your expertise" marker="2">
        <Q label="Topics"><Chips items={form.topics} selected={form.topicsSelected} /></Q>
        <Q label="Industries"><Chips items={form.industries} selected={form.industriesSelected} /></Q>
        <Q label="Speaker type"><Chips items={form.speakerTypes} selected={form.speakerTypeSelected} /></Q>
      </AppSection>

      <AppSection num="3" title="Your experience">
        <Q label="Speaking experience">
          <span className="sn-field is-empty sn-app-area">{form.experiencePlaceholder}</span>
        </Q>
        <Q label="Someone who can vouch for you">
          <span className="sn-field is-empty">{form.vouchPlaceholder}</span>
        </Q>
        <Q label="Executive audience comfort">
          <div className="sn-app-scale">
            {form.comfortScale.map((n) => (
              <span key={n} className={n === form.comfortSelected ? "is-on" : undefined}>{n}</span>
            ))}
          </div>
        </Q>
      </AppSection>

      <AppSection num="4" title="Pay it forward" optional marker="3">
        <Q label={form.referralPrompt}>
          <div className="sn-app-grid is-2">
            <span className="sn-field is-empty">Colleague&apos;s name</span>
            <span className="sn-field is-empty">Colleague&apos;s name</span>
          </div>
        </Q>
      </AppSection>

      <div className="sn-app-foot">
        <span className="sn-pbtn">Save draft</span>
        <span className="sn-pbtn is-primary">Submit application</span>
      </div>
    </div>
  );
}

export default function ApplicationMockup({ data, reduced }) {
  const { form, annotations } = data;
  const label = `Recreated speaker application form for a fake applicant, ${applicant.name}, ${applicant.title} in ${applicant.location}. ${form.meta}. Section 1, who you are: name, title, and location auto-filled, nearest briefing center, and how they heard about the program. Section 2, your expertise: topic, industry, and speaker type chips. Section 3, your experience: a short description, someone who can vouch for them, and executive audience comfort on a 1 to 5 scale. Section 4, pay it forward (optional): one or two colleagues who would be great speakers. Buttons to save a draft or submit.`;

  return (
    <div className="sn-visual sn-split">
      <style>{CSS}</style>
      <Reveal reduced={reduced}>
        <Mockup label={label}><ApplicationForm form={form} /></Mockup>
      </Reveal>
      <Reveal delay={0.1} reduced={reduced} style={{ position: "sticky", top: 96, alignSelf: "start" }}>
        <ol className="sn-notes" aria-label="What the form is designed to do">
          {annotations.map((note, i) => (
            <li key={note}><span className="sn-marker" aria-hidden="true">{i + 1}</span><span>{note}</span></li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
