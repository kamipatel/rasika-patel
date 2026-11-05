import { Info } from "lucide-react";
import Reveal from "../Reveal";
import { MOCK_CAPTION } from "../../data/servicenow";

/*
 * Shared building blocks for the ServiceNow case study: section shell,
 * eyebrow label, and the paper frame every recreated mockup sits in.
 */

export function Eyebrow({ as: Tag = "span", id, children }) {
  return (
    <Tag id={id} className="sn-eyebrow">
      <span className="sn-eyebrow-rule" aria-hidden="true" />
      <span>{children}</span>
    </Tag>
  );
}

/* A section with no heading promotes its label to the h2. */
export function Section({ id, label, heading, reduced, children }) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className="sn-section">
      <div className="sn-wrap">
        <Reveal reduced={reduced}>
          {heading ? <Eyebrow>{label}</Eyebrow> : <Eyebrow as="h2" id={titleId}>{label}</Eyebrow>}
        </Reveal>
        {heading && (
          <Reveal delay={0.05} reduced={reduced}>
            <h2 id={titleId} className="sn-h2">{heading}</h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function Lead({ children, reduced, delay = 0.1 }) {
  return (
    <Reveal delay={delay} reduced={reduced}>
      <p className="sn-lead">{children}</p>
    </Reveal>
  );
}

export function PullQuote({ children, reduced }) {
  return (
    <Reveal delay={0.12} reduced={reduced}>
      <blockquote className="sn-pull">{children}</blockquote>
    </Reveal>
  );
}

export function MockCaption() {
  return (
    <p className="sn-caption">
      <Info size={14} aria-hidden="true" />
      <span>{MOCK_CAPTION}</span>
    </p>
  );
}

/*
 * Paper frame for a recreated screen. The mockup is a picture, not a real
 * form, so it is exposed as one image with a full description.
 */
export function Mockup({ label, className = "", children }) {
  return (
    <figure className="sn-mock">
      <div className={`sn-paper ${className}`} role="img" aria-label={label}>
        {children}
      </div>
      <figcaption><MockCaption /></figcaption>
    </figure>
  );
}
