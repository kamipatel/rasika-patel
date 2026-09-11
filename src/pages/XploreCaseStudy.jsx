import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import Seo from "../components/Seo";
import { xploreMeta } from "../lib/routeMeta";
import { hero, sections, gtm, gtmStats, matchaPost, next } from "../data/xplore";

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

/* Shared type scale — kept local so the narrative reads as one voice. */
const eyebrowStyle = {
  display: "block",
  fontFamily: "var(--mono)",
  fontSize: "13px",
  letterSpacing: "3px",
  textTransform: "uppercase",
  color: "var(--accent)",
};

const bodyStyle = {
  fontFamily: "var(--body)",
  fontSize: "clamp(17px, 2vw, 19px)",
  fontWeight: 300,
  lineHeight: 1.75,
  color: "var(--text-mid)",
  maxWidth: "620px",
};

function Eyebrow({ children }) {
  return <span style={eyebrowStyle}>{children}</span>;
}

function Heading({ children, isMobile }) {
  return (
    <h2
      style={{
        fontFamily: "var(--display)",
        fontSize: isMobile ? "clamp(26px, 7vw, 32px)" : "clamp(32px, 3.6vw, 46px)",
        fontWeight: 800,
        letterSpacing: "-1.2px",
        lineHeight: 1.12,
        color: "var(--text-light)",
        margin: "18px 0 22px",
        maxWidth: "760px",
      }}
    >
      {children}
    </h2>
  );
}

function Pills({ items }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "26px" }}>
      {items.map((t) => (
        <span
          key={t}
          style={{
            fontFamily: "var(--mono)",
            fontSize: "12px",
            color: "var(--text-dim)",
            background: "var(--card)",
            border: "1px solid var(--border)",
            padding: "7px 16px",
            borderRadius: "100px",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/** One narrative beat. Hairline rule above keeps the rhythm without cards. */
function Chapter({ section, isMobile, reduced }) {
  return (
    <section
      aria-labelledby={`${section.id}-heading`}
      style={{
        borderTop: "1px solid var(--border)",
        padding: isMobile ? "56px 0" : "84px 0",
      }}
    >
      <Reveal reduced={reduced}>
        <Eyebrow>{section.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06} reduced={reduced}>
        <div id={`${section.id}-heading`}>
          <Heading isMobile={isMobile}>{section.heading}</Heading>
        </div>
      </Reveal>
      {section.body.map((p, i) => (
        <Reveal key={p.slice(0, 24)} delay={0.1 + i * 0.05} reduced={reduced}>
          <p style={{ ...bodyStyle, marginBottom: "18px" }}>{p}</p>
        </Reveal>
      ))}
      {section.pull && (
        <Reveal delay={0.2} reduced={reduced}>
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: isMobile ? "22px" : "clamp(24px, 2.6vw, 32px)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.3,
              color: "var(--text-light)",
              borderLeft: "3px solid var(--accent)",
              paddingLeft: isMobile ? "18px" : "26px",
              margin: "34px 0 0",
              maxWidth: "640px",
            }}
          >
            {section.pull}
          </p>
        </Reveal>
      )}
      {section.tags && (
        <Reveal delay={0.2} reduced={reduced}>
          <Pills items={section.tags} />
        </Reveal>
      )}
    </section>
  );
}

export default function XploreCaseStudy() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = !!useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gutter = "clamp(24px, 6vw, 80px)";
  const column = { maxWidth: "900px", margin: "0 auto", padding: `0 ${gutter}` };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Seo {...xploreMeta()} />

      <main style={{ minHeight: "100vh", paddingBottom: "80px" }}>
        {/* ── Full-bleed title ── */}
        <header
          style={{
            position: "relative",
            overflow: "hidden",
            padding: isMobile
              ? "120px 0 56px"
              : "160px 0 92px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-30%",
              right: "-10%",
              width: "min(720px, 90vw)",
              height: "min(720px, 90vw)",
              background:
                "radial-gradient(circle, rgba(255,107,53,0.10), transparent 62%)",
              filter: "blur(70px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ ...column, position: "relative" }}>
            <Link
              to="/#work"
              aria-label="Back to work"
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

            <Eyebrow>Case Study</Eyebrow>

            <h1
              style={{
                fontFamily: "var(--display)",
                fontSize: isMobile
                  ? "clamp(40px, 12vw, 56px)"
                  : "clamp(56px, 8vw, 104px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                margin: "18px 0 26px",
                color: "var(--text-light)",
              }}
            >
              {hero.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: isMobile ? "clamp(18px, 5vw, 22px)" : "clamp(22px, 2.4vw, 30px)",
                fontWeight: 300,
                lineHeight: 1.4,
                color: "var(--text-light)",
                maxWidth: "700px",
                margin: 0,
              }}
            >
              {hero.deck}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? "8px 16px" : "24px",
                marginTop: "34px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--text-dim)",
              }}
            >
              {hero.meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
              <a
                href={hero.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="clickable"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                App Store &#8599;
              </a>
            </div>
          </div>
        </header>

        {/* ── Narrative ── */}
        <div style={column}>
          {sections.map((section) => (
            <Chapter
              key={section.id}
              section={section}
              isMobile={isMobile}
              reduced={reduced}
            />
          ))}

          {/* ── Go To Market ── */}
          <section
            aria-labelledby="gtm-heading"
            style={{
              borderTop: "1px solid var(--border)",
              padding: isMobile ? "56px 0 40px" : "84px 0 56px",
            }}
          >
            <Reveal reduced={reduced}>
              <Eyebrow>{gtm.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06} reduced={reduced}>
              <div id="gtm-heading">
                <Heading isMobile={isMobile}>{gtm.heading}</Heading>
              </div>
            </Reveal>
            {gtm.body.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={0.1 + i * 0.05} reduced={reduced}>
                <p style={{ ...bodyStyle, marginBottom: "18px" }}>{p}</p>
              </Reveal>
            ))}
          </section>
        </div>

        {/* ── Stat band — full-bleed, the page's loudest moment ── */}
        <section
          aria-label="Go to market results"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            background: "var(--card)",
            padding: isMobile ? "40px 0" : "56px 0",
          }}
        >
          <div
            style={{
              ...column,
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "32px 16px" : "24px",
            }}
          >
            {gtmStats.map((s) => (
              <div key={s.label}>
                <CountUp
                  value={s.value}
                  style={{
                    display: "block",
                    fontFamily: "var(--display)",
                    fontSize: isMobile ? "clamp(32px, 9vw, 40px)" : "clamp(40px, 4.4vw, 60px)",
                    fontWeight: 800,
                    letterSpacing: "-2px",
                    lineHeight: 1,
                    color: "var(--accent)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    marginTop: "12px",
                    fontFamily: "var(--mono)",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Matcha post highlight ── */}
        <div style={column}>
          <section
            aria-labelledby="matcha-heading"
            style={{ padding: isMobile ? "56px 0" : "84px 0" }}
          >
            <Reveal reduced={reduced}>
              <Eyebrow>{matchaPost.eyebrow}</Eyebrow>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 380px) 1fr",
                gap: isMobile ? "28px" : "48px",
                alignItems: "center",
                marginTop: "24px",
              }}
            >
              <Reveal reduced={reduced}>
                <a
                  href={matchaPost.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clickable"
                  aria-label={`${matchaPost.alt} — open full size`}
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <img
                    src={matchaPost.image}
                    alt={matchaPost.alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "16px",
                      border: "1px solid var(--border)",
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontFamily: "var(--mono)",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                    }}
                  >
                    {isMobile ? "Tap to view full size" : "Click to view full size"} &#8599;
                  </span>
                </a>
              </Reveal>

              <div>
                <Reveal delay={0.08} reduced={reduced}>
                  <h2
                    id="matcha-heading"
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: isMobile ? "clamp(24px, 6.5vw, 30px)" : "clamp(28px, 3vw, 40px)",
                      fontWeight: 800,
                      letterSpacing: "-1px",
                      lineHeight: 1.15,
                      color: "var(--text-light)",
                      margin: "0 0 24px",
                    }}
                  >
                    &ldquo;{matchaPost.title}&rdquo;
                  </h2>
                </Reveal>

                <Reveal delay={0.12} reduced={reduced}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: isMobile ? "24px" : "40px",
                      paddingBottom: "22px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {matchaPost.stats.map((s) => (
                      <div key={s.label}>
                        <CountUp
                          value={s.value}
                          style={{
                            display: "block",
                            fontFamily: "var(--display)",
                            fontSize: isMobile ? "26px" : "34px",
                            fontWeight: 800,
                            letterSpacing: "-1px",
                            lineHeight: 1,
                            color: "var(--accent)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        />
                        <span
                          style={{
                            display: "block",
                            marginTop: "8px",
                            fontFamily: "var(--mono)",
                            fontSize: "10px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "var(--text-dim)",
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.16} reduced={reduced}>
                  <p style={{ ...bodyStyle, fontSize: "16px", marginTop: "22px" }}>
                    {matchaPost.note}
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── What I'd do next ── */}
          <section
            aria-labelledby="next-heading"
            style={{
              borderTop: "1px solid var(--border)",
              padding: isMobile ? "56px 0 0" : "84px 0 0",
            }}
          >
            <Reveal reduced={reduced}>
              <Eyebrow>{next.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06} reduced={reduced}>
              <div id="next-heading">
                <Heading isMobile={isMobile}>{next.heading}</Heading>
              </div>
            </Reveal>
            {next.body.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={0.1 + i * 0.05} reduced={reduced}>
                <p style={{ ...bodyStyle, marginBottom: "18px" }}>{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2} reduced={reduced}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginTop: "44px",
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
                  More Work
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
            </Reveal>
          </section>
        </div>
      </main>
    </motion.div>
  );
}
