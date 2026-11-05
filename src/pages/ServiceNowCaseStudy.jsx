import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { servicenowMeta } from "../lib/routeMeta";
import { BASE_CSS } from "../components/servicenow/styles";
import { Eyebrow, Lead, PullQuote, Section } from "../components/servicenow/primitives";
import ChannelsDiagram from "../components/servicenow/ChannelsDiagram";
import TwoPaths from "../components/servicenow/TwoPaths";
import FlowCompare from "../components/servicenow/FlowCompare";
import ApplicationMockup from "../components/servicenow/ApplicationMockup";
import OnboardingMockup, { CertificationGate } from "../components/servicenow/OnboardingMockup";
import EmailCompare, { ManagerNote } from "../components/servicenow/EmailCompare";
import RatingsMockup from "../components/servicenow/RatingsMockup";
import ExpertiseNote from "../components/servicenow/ExpertiseNote";
import Timeline from "../components/servicenow/Timeline";
import ImpactStats from "../components/servicenow/ImpactStats";
import DocTiles from "../components/servicenow/DocTiles";
import {
  alsoThisSummer, application, breaking, context, dataWork, discovery, flow,
  handoff, hero, impact, lessons, acceptance, onboarding, paths, reframe,
  timeline, trust,
} from "../data/servicenow";

/*
 * ServiceNow case study. Each section is a label, a one-line heading, a few
 * short sentences, then a visual. All visuals live in
 * components/servicenow/; all copy lives in data/servicenow.js.
 */

const HERO_CSS = `
.sn-hero { position: relative; overflow: hidden; padding: clamp(112px, 13vw, 160px) 0 clamp(52px, 7vw, 92px); }
.sn-hero-glow { position: absolute; top: -30%; right: -10%; width: min(720px, 90vw); height: min(720px, 90vw); background: radial-gradient(circle, rgba(255, 107, 53, 0.10), transparent 62%); filter: blur(70px); pointer-events: none; }
.sn-back { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-mid); margin-bottom: 48px; padding: 10px 20px; border-radius: 100px; border: 1px solid var(--border); transition: all 0.3s ease; }
.sn-h1 { font-family: var(--display); font-weight: 800; font-size: clamp(38px, 7vw, 88px); letter-spacing: -0.04em; line-height: 0.98; color: var(--text-light); margin: 18px 0 26px; max-width: 980px; }
.sn-deck { font-family: var(--body); font-weight: 300; font-size: clamp(19px, 2.4vw, 28px); line-height: 1.4; color: var(--text-light); max-width: 760px; margin: 0; }
.sn-meta { display: flex; flex-wrap: wrap; gap: 6px 12px; margin: 30px 0 0; padding: 0; list-style: none; font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.1em; line-height: 1.6; text-transform: uppercase; color: var(--text-dim); }
.sn-meta li:not(:last-child)::after { content: "\\00B7"; margin-left: 12px; }
`;

function Hero() {
  return (
    <header className="sn-hero">
      <div className="sn-hero-glow" aria-hidden="true" />
      <div className="sn-wrap" style={{ position: "relative" }}>
        <Link to="/#work" aria-label="Back to work" className="sn-back clickable">&larr; Back</Link>
        <Eyebrow>{hero.label}</Eyebrow>
        <h1 className="sn-h1">{hero.title}</h1>
        <p className="sn-deck">{hero.deck}</p>
        <ul className="sn-meta">{hero.meta.map((m) => <li key={m}>{m}</li>)}</ul>
        <ul className="sn-glance" aria-label="At a glance">
          {hero.glance.map((g) => <li key={g}>{g}</li>)}
        </ul>
      </div>
    </header>
  );
}

function InsightGrid({ reduced }) {
  return (
    <div className="sn-visual">
      <div className="sn-insights">
        {discovery.insights.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05} reduced={reduced} style={{ display: "grid" }}>
            <div className="sn-card sn-insight">
              <h3 className="sn-h3">{item.title}</h3>
              <p className="sn-body">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} reduced={reduced}>
        <p className="sn-callout">
          <Zap size={18} aria-hidden="true" />
          <span><strong>{discovery.quickWin.label}</strong> {discovery.quickWin.text}</span>
        </p>
      </Reveal>
    </div>
  );
}

function RootCauses({ reduced }) {
  return (
    <div className="sn-visual sn-causes">
      {breaking.columns.map((c, i) => (
        <Reveal key={c.name} delay={0.08 + i * 0.05} reduced={reduced}>
          <div className="sn-cause">
            <h3 className="sn-cause-name">{c.name}</h3>
            <p className="sn-body">{c.detail}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Reframe({ reduced }) {
  return (
    <Section id="reframe" label={reframe.label} reduced={reduced}>
      <Reveal delay={0.05} reduced={reduced}>
        <p className="sn-statement">{reframe.statement}</p>
      </Reveal>
      <div className="sn-points">
        {reframe.points.map((p, i) => (
          <Reveal key={p} delay={0.1 + i * 0.05} reduced={reduced}>
            <p className="sn-body">{p}</p>
          </Reveal>
        ))}
      </div>
      <PullQuote reduced={reduced}>{reframe.pull}</PullQuote>
    </Section>
  );
}

function Lessons({ reduced }) {
  return (
    <div className="sn-visual sn-lessons">
      {lessons.items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06} reduced={reduced} style={{ display: "grid" }}>
          <div className="sn-card sn-lesson">
            <h3 className="sn-h3">{item.title}</h3>
            {item.detail && <p className="sn-body">{item.detail}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function AlsoThisSummer({ reduced }) {
  return (
    <Reveal delay={0.05} reduced={reduced}>
      <ul className="sn-also sn-visual">
        {alsoThisSummer.items.map((item) => (
          <li key={item.kind}>
            <p className="sn-label">{item.kind}</p>
            <p className="sn-body">{item.text}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function ServiceNowCaseStudy() {
  const reduced = !!useReducedMotion();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div
      className="sn"
      initial={{ opacity: 0, y: reduced ? 0 : 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Seo {...servicenowMeta()} />
      <style>{BASE_CSS + HERO_CSS}</style>

      <main style={{ minHeight: "100vh", paddingBottom: "80px" }}>
        <Hero />

        <Section id="context" label={context.label} heading={context.heading} reduced={reduced}>
          <Lead reduced={reduced}>{context.body}</Lead>
          <ChannelsDiagram data={context.channels} reduced={reduced} />
        </Section>

        <Section id="discovery" label={discovery.label} heading={discovery.heading} reduced={reduced}>
          <Lead reduced={reduced}>{discovery.body}</Lead>
          <PullQuote reduced={reduced}>{discovery.pull}</PullQuote>
          <InsightGrid reduced={reduced} />
        </Section>

        <Section id="breaking" label={breaking.label} heading={breaking.heading} reduced={reduced}>
          <Lead reduced={reduced}>{breaking.lead}</Lead>
          <RootCauses reduced={reduced} />
        </Section>

        <Reframe reduced={reduced} />

        <Section id="paths" label={paths.label} heading={paths.heading} reduced={reduced}>
          <TwoPaths data={paths} reduced={reduced} />
        </Section>

        <Section id="flow" label={flow.label} heading={flow.heading} reduced={reduced}>
          <FlowCompare data={flow} reduced={reduced} />
        </Section>

        <Section id="application" label={application.label} heading={application.heading} reduced={reduced}>
          <ApplicationMockup data={application} reduced={reduced} />
        </Section>

        <Section id="onboarding" label={onboarding.label} heading={onboarding.heading} reduced={reduced}>
          <OnboardingMockup data={onboarding} reduced={reduced} />
          <CertificationGate gate={onboarding.gate} reduced={reduced} />
        </Section>

        <Section id="acceptance" label={acceptance.label} heading={acceptance.heading} reduced={reduced}>
          <EmailCompare before={acceptance.before} after={acceptance.after} reduced={reduced} />
          {acceptance.closing.map((p) => <Lead key={p} reduced={reduced}>{p}</Lead>)}
          <ManagerNote manager={acceptance.manager} reduced={reduced} />
          <Lead reduced={reduced}>{acceptance.templates}</Lead>
        </Section>

        <Section id="trust" label={trust.label} heading={trust.heading} reduced={reduced}>
          <RatingsMockup data={trust} reduced={reduced} />
        </Section>

        <Section id="data" label={dataWork.label} heading={dataWork.heading} reduced={reduced}>
          <ExpertiseNote data={dataWork} reduced={reduced} />
        </Section>

        <Section id="timeline" label={timeline.label} reduced={reduced}>
          <Timeline phases={timeline.phases} reduced={reduced} />
          <Lead reduced={reduced}>{timeline.body}</Lead>
        </Section>

        <Section id="impact" label={impact.label} reduced={reduced}>
          <ImpactStats delivered={impact.delivered} projected={impact.projected} reduced={reduced} />
        </Section>

        <Section id="handoff" label={handoff.label} heading={handoff.heading} reduced={reduced}>
          {handoff.body.map((p) => <Lead key={p} reduced={reduced}>{p}</Lead>)}
          <DocTiles docs={handoff.docs} reduced={reduced} />
        </Section>

        <Section id="lessons" label={lessons.label} reduced={reduced}>
          <Lessons reduced={reduced} />
        </Section>

        <Section id="also" label={alsoThisSummer.label} reduced={reduced}>
          <AlsoThisSummer reduced={reduced} />
          <Reveal delay={0.1} reduced={reduced}>
            <div className="sn-footer">
              <Link to="/#work" className="clickable is-primary">More work</Link>
              <Link to="/#contact" className="clickable is-ghost">Get in touch</Link>
            </div>
          </Reveal>
        </Section>
      </main>
    </motion.div>
  );
}
