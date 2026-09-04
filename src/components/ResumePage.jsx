import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Mail, Linkedin, FileDown } from "lucide-react";
import Reveal from "./Reveal";
import ResumeEntry from "./ResumeEntry";
import { education, experience, leadership, RESUME_PDF_URL } from "../data/resume";
import { skillGroups } from "../data/skills";
import Seo from "./Seo";
import { resumeMeta } from "../lib/routeMeta";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

const CONTACT_LINKS = [
  { label: "rasikap@utexas.edu", href: "mailto:rasikap@utexas.edu", icon: Mail },
  { label: "linkedin.com/in/rasikapatel", href: "https://www.linkedin.com/in/rasikapatel/", icon: Linkedin },
  { label: "Download PDF", href: RESUME_PDF_URL, icon: FileDown },
];

function SectionHead({ eyebrow, title, reduced }) {
  return (
    <>
      <Reveal reduced={reduced}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--mono)",
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08} reduced={reduced}>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(30px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.05,
            marginTop: "14px",
            marginBottom: "8px",
          }}
        >
          {title}
        </h2>
      </Reveal>
    </>
  );
}

export default function ResumePage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = !!useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Seo {...resumeMeta()} />

      <main
        style={{
          minHeight: "100vh",
          padding: "140px clamp(24px, 6vw, 80px) 80px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Back button */}
        <Link
          to="/"
          aria-label="Back to home"
          className="clickable"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            fontFamily: "var(--mono)",
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--text-mid)",
            marginBottom: "48px",
            padding: "10px 20px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            transition: "all 0.3s ease",
          }}
        >
          &larr; Back
        </Link>

        {/* ─── Masthead ─── */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Résumé
        </div>

        <h1
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            color: "var(--text-light)",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          Rasika Patel
        </h1>

        <div
          style={{
            display: "inline-block",
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: "1px",
            color: "var(--accent)",
            background: "var(--accent-bg)",
            border: "1px solid var(--accent-dim)",
            padding: "6px 16px",
            borderRadius: "100px",
            marginBottom: "32px",
          }}
        >
          Marketing &amp; Design · Austin, TX
        </div>

        {/* Contact links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "12px",
            marginBottom: "72px",
          }}
        >
          {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="clickable link-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textDecoration: "none",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "14px 18px",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "var(--accent-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color="var(--accent)" />
              </div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--text-light)",
                  letterSpacing: "0.3px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* ─── Education ─── */}
        <SectionHead eyebrow="Education" title="McCombs School of Business" reduced={reduced} />
        <Reveal delay={0.12} reduced={reduced}>
          <div
            style={{
              marginTop: "24px",
              marginBottom: "80px",
              padding: isMobile ? "24px" : "32px 36px",
              borderRadius: "16px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--accent)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: isMobile ? "22px" : "26px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "var(--text-light)",
                marginBottom: "6px",
              }}
            >
              {education.school}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "18px",
              }}
            >
              {education.division} · {education.location}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: isMobile ? "6px" : "16px",
                marginBottom: "22px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--body)",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                {education.degree}
              </span>
              <span
                style={{
                  fontFamily: "var(--body)",
                  fontSize: "16px",
                  color: "var(--text-mid)",
                }}
              >
                {education.minor}
              </span>
            </div>

            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--text-mid)",
                marginBottom: "22px",
              }}
            >
              {education.dates}
            </div>

            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "9px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Relevant Coursework
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {education.coursework.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: "12px",
                    color: "var(--text-dim)",
                    background: "rgba(255,255,255,0.03)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ─── Experience ─── */}
        <SectionHead eyebrow="Experience" title="Where I've Worked" reduced={reduced} />
        <div style={{ marginTop: "24px", marginBottom: "80px", borderTop: "1px solid var(--border)" }}>
          {experience.map((entry, i) => (
            <ResumeEntry
              key={entry.org}
              entry={entry}
              index={i}
              reduced={reduced}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* ─── Leadership & Ventures ─── */}
        <SectionHead eyebrow="Leadership" title="Things I've Started & Led" reduced={reduced} />
        <div style={{ marginTop: "24px", marginBottom: "80px", borderTop: "1px solid var(--border)" }}>
          {leadership.map((entry, i) => (
            <ResumeEntry
              key={entry.org}
              entry={entry}
              index={i}
              reduced={reduced}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* ─── Skills ─── */}
        <SectionHead eyebrow="Skills & Tools" title="What I Work With" reduced={reduced} />
        <div style={{ marginTop: "24px", borderTop: "1px solid var(--border)" }}>
          {skillGroups.map((group) => (
            <div
              key={group.label}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "190px 1fr",
                gap: isMobile ? "10px" : "36px",
                alignItems: isMobile ? "start" : "center",
                padding: isMobile ? "20px 0" : "24px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                }}
              >
                {group.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {group.items.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-light)",
                      padding: "8px 20px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "100px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Footer CTA ─── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            marginTop: "64px",
          }}
        >
          <Link
            to="/#work"
            className="clickable"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "15px 32px",
              borderRadius: "4px",
            }}
          >
            See the Work
          </Link>
          <Link
            to="/#contact"
            className="clickable"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--text-mid)",
              border: "1.5px solid var(--border)",
              padding: "15px 32px",
              borderRadius: "4px",
            }}
          >
            Get in Touch
          </Link>
        </div>
      </main>
    </motion.div>
  );
}
