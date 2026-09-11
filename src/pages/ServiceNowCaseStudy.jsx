import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import Seo from "../components/Seo";
import { servicenowMeta } from "../lib/routeMeta";
import {
  hero, context, discovery, breaking, reframe,
  designed, leverage, impact, handoff, takeaway,
} from "../data/servicenow";

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

/* Type scale mirrors XploreCaseStudy so the two read as one series. */
const eyebrowStyle = {
  display: "block", fontFamily: "var(--mono)", fontSize: "13px",
  letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)",
};
const bodyStyle = {
  fontFamily: "var(--body)", fontSize: "clamp(17px, 2vw, 19px)", fontWeight: 300,
  lineHeight: 1.75, color: "var(--text-mid)", maxWidth: "620px",
};

const Eyebrow = ({ children }) => <span style={eyebrowStyle}>{children}</span>;

const Heading = ({ children, isMobile }) => (
  <h2 style={{
    fontFamily: "var(--display)",
    fontSize: isMobile ? "clamp(26px, 7vw, 32px)" : "clamp(32px, 3.6vw, 46px)",
    fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.12,
    color: "var(--text-light)", margin: "18px 0 22px", maxWidth: "760px",
  }}>{children}</h2>
);

const Chapter = ({ children, isMobile, first = false }) => (
  <section style={{
    borderTop: first ? "none" : "1px solid var(--border)",
    padding: isMobile ? "56px 0" : "84px 0",
  }}>{children}</section>
);

const Paragraphs = ({ items, reduced, base = 0.1 }) =>
  items.map((p, i) => (
    <Reveal key={p.slice(0, 24)} delay={base + i * 0.05} reduced={reduced}>
      <p style={{ ...bodyStyle, marginBottom: "18px" }}>{p}</p>
    </Reveal>
  ));

function StatGroup({ label, note, stats, tone, isMobile, reduced }) {
  const isProjection = tone === "projected";
  return (
    <div style={{
      flex: 1, minWidth: isMobile ? "100%" : "280px",
      border: `1px solid ${isProjection ? "var(--border)" : "var(--accent-dim)"}`,
      background: isProjection ? "transparent" : "var(--accent-bg)",
      borderRadius: "16px", padding: isMobile ? "24px" : "30px",
      borderStyle: isProjection ? "dashed" : "solid",
    }}>
      <div style={{
        display: "inline-block", fontFamily: "var(--mono)", fontSize: "10px",
        fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
        color: isProjection ? "var(--text-dim)" : "var(--accent)",
        border: `1px solid ${isProjection ? "var(--border)" : "var(--accent-dim)"}`,
        borderRadius: "100px", padding: "5px 12px", marginBottom: "22px",
      }}>
        {isProjection ? `${label} — not measured` : label}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {stats.map((s) => (
          <div key={s.label}>
            <CountUp value={s.value} style={{
              display: "block", fontFamily: "var(--display)",
              fontSize: isMobile ? "clamp(30px, 8vw, 38px)" : "clamp(34px, 3.4vw, 46px)",
              fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1,
              color: isProjection ? "var(--text-light)" : "var(--accent)",
              fontVariantNumeric: "tabular-nums", opacity: isProjection ? 0.75 : 1,
            }} />
            <span style={{
              display: "block", marginTop: "10px", fontFamily: "var(--mono)",
              fontSize: "10px", letterSpacing: "1.6px", textTransform: "uppercase",
              color: "var(--text-dim)", lineHeight: 1.6,
            }}>{s.label}</span>
          </div>
        ))}
      </div>

      {note && (
        <p style={{
          marginTop: "22px", paddingTop: "16px", borderTop: "1px solid var(--border)",
          fontFamily: "var(--body)", fontSize: "14px", fontStyle: "italic",
          color: "var(--text-dim)", lineHeight: 1.6,
        }}>{note}</p>
      )}
    </div>
  );
}

export default function ServiceNowCaseStudy() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = !!useReducedMotion();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const gutter = "clamp(24px, 6vw, 80px)";
  const column = { maxWidth: "900px", margin: "0 auto", padding: `0 ${gutter}` };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Seo {...servicenowMeta()} />

      <main style={{ minHeight: "100vh", paddingBottom: "80px" }}>
        {/* ── Full-bleed title ── */}
        <header style={{
          position: "relative", overflow: "hidden",
          padding: isMobile ? "120px 0 56px" : "160px 0 92px",
          borderBottom: "1px solid var(--border)",
        }}>
          <div aria-hidden="true" style={{
            position: "absolute", top: "-30%", right: "-10%",
            width: "min(720px, 90vw)", height: "min(720px, 90vw)",
            background: "radial-gradient(circle, rgba(255,107,53,0.10), transparent 62%)",
            filter: "blur(70px)", pointerEvents: "none",
          }} />

          <div style={{ ...column, position: "relative" }}>
            <Link to="/#work" aria-label="Back to work" className="clickable" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              textDecoration: "none", fontFamily: "var(--mono)", fontSize: "12px",
              letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-mid)",
              marginBottom: "48px", padding: "10px 20px", borderRadius: "100px",
              border: "1px solid var(--border)", transition: "all 0.3s ease",
            }}>&larr; Back</Link>

            <Eyebrow>Case Study</Eyebrow>

            <h1 style={{
              fontFamily: "var(--display)",
              fontSize: isMobile ? "clamp(34px, 10vw, 46px)" : "clamp(48px, 7vw, 88px)",
              fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95,
              margin: "18px 0 26px", color: "var(--text-light)",
            }}>{hero.title}</h1>

            <p style={{
              fontFamily: "var(--body)",
              fontSize: isMobile ? "clamp(18px, 5vw, 22px)" : "clamp(22px, 2.4vw, 30px)",
              fontWeight: 300, lineHeight: 1.4, color: "var(--text-light)",
              maxWidth: "720px", margin: 0,
            }}>{hero.deck}</p>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: isMobile ? "8px 14px" : "10px 24px",
              marginTop: "34px", fontFamily: "var(--mono)", fontSize: "11px",
              letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-dim)",
            }}>
              {hero.meta.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
        </header>

        <div style={column}>
          {/* ── Context ── */}
          <Chapter isMobile={isMobile} first>
            <Reveal reduced={reduced}><Eyebrow>{context.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}><Heading isMobile={isMobile}>{context.heading}</Heading></Reveal>
            <Paragraphs items={context.body} reduced={reduced} />
          </Chapter>

          {/* ── Discovery + pull quote ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{discovery.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}><Heading isMobile={isMobile}>{discovery.heading}</Heading></Reveal>
            <Paragraphs items={discovery.body} reduced={reduced} />
            <Reveal delay={0.16} reduced={reduced}>
              <p style={{
                fontFamily: "var(--display)",
                fontSize: isMobile ? "clamp(22px, 6vw, 26px)" : "clamp(26px, 2.9vw, 36px)",
                fontWeight: 700, fontStyle: "italic", lineHeight: 1.3,
                color: "var(--text-light)", borderLeft: "3px solid var(--accent)",
                paddingLeft: isMobile ? "18px" : "26px", margin: "34px 0",
                maxWidth: "700px",
              }}>{discovery.pull}</p>
            </Reveal>
            <Paragraphs items={discovery.after} reduced={reduced} base={0.2} />
          </Chapter>

          {/* ── What was breaking ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{breaking.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}><Heading isMobile={isMobile}>{breaking.heading}</Heading></Reveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: isMobile ? "24px" : "28px", marginTop: "12px",
            }}>
              {breaking.columns.map((c, i) => (
                <Reveal key={c.name} delay={0.1 + i * 0.05} reduced={reduced}>
                  <div style={{ borderTop: "2px solid var(--accent)", paddingTop: "16px" }}>
                    <div style={{
                      fontFamily: "var(--display)", fontSize: "20px", fontWeight: 800,
                      color: "var(--text-light)", marginBottom: "10px",
                    }}>{c.name}</div>
                    <p style={{
                      fontFamily: "var(--body)", fontSize: "15px", fontWeight: 300,
                      lineHeight: 1.6, color: "var(--text-mid)", margin: 0,
                    }}>{c.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Chapter>

          {/* ── Reframe ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{reframe.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}>
              <p style={{
                fontFamily: "var(--display)",
                fontSize: isMobile ? "clamp(26px, 7.5vw, 34px)" : "clamp(34px, 4vw, 54px)",
                fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1,
                color: "var(--text-light)", margin: "20px 0 34px", maxWidth: "840px",
              }}>{reframe.statement}</p>
            </Reveal>
            <div style={{
              display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "18px" : "26px",
            }}>
              {reframe.points.map((p, i) => (
                <Reveal key={p} delay={0.12 + i * 0.05} reduced={reduced}>
                  <p style={{
                    fontFamily: "var(--body)", fontSize: "16px", fontWeight: 300,
                    lineHeight: 1.65, color: "var(--text-mid)",
                    borderTop: "1px solid var(--border)", paddingTop: "16px", margin: 0,
                  }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </Chapter>

          {/* ── What I designed ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{designed.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}><Heading isMobile={isMobile}>{designed.intro}</Heading></Reveal>
            <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0" }}>
              {designed.items.map((item, i) => (
                <Reveal key={item.slice(0, 20)} delay={0.08 + i * 0.04} reduced={reduced}>
                  <li style={{
                    display: "flex", gap: isMobile ? "16px" : "24px",
                    padding: "20px 0", borderBottom: "1px solid var(--border)",
                    fontFamily: "var(--body)", fontSize: isMobile ? "15px" : "16px",
                    fontWeight: 300, lineHeight: 1.7, color: "var(--text-mid)",
                  }}>
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 700,
                      color: "var(--accent)", flexShrink: 0, paddingTop: "4px",
                    }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Chapter>

          {/* ── Highest-leverage change ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{leverage.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}><Heading isMobile={isMobile}>{leverage.heading}</Heading></Reveal>
            <div style={{
              display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "16px" : "24px", marginTop: "8px",
            }}>
              {[leverage.before, leverage.after].map((v, i) => {
                const isAfter = i === 1;
                return (
                  <Reveal key={v.label} delay={0.1 + i * 0.06} reduced={reduced}>
                    <div style={{
                      border: `1px solid ${isAfter ? "var(--accent-dim)" : "var(--border)"}`,
                      background: isAfter ? "var(--accent-bg)" : "var(--card)",
                      borderRadius: "16px", padding: isMobile ? "22px" : "28px", height: "100%",
                    }}>
                      <div style={{
                        fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 700,
                        letterSpacing: "2px", textTransform: "uppercase",
                        color: isAfter ? "var(--accent)" : "var(--text-dim)", marginBottom: "16px",
                      }}>{v.label}</div>
                      <p style={{
                        fontFamily: "var(--display)", fontSize: isMobile ? "19px" : "22px",
                        fontWeight: 700, lineHeight: 1.3, color: "var(--text-light)",
                        margin: "0 0 12px",
                      }}>&ldquo;{v.quote}&rdquo;</p>
                      <p style={{
                        fontFamily: "var(--body)", fontSize: "14px", color: "var(--text-dim)", margin: 0,
                      }}>{v.note}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={0.24} reduced={reduced}>
              <p style={{ ...bodyStyle, marginTop: "30px" }}>{leverage.closing}</p>
            </Reveal>
          </Chapter>

          {/* ── Impact: delivered vs projected, kept visually separate ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{impact.eyebrow}</Eyebrow></Reveal>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: isMobile ? "16px" : "24px", marginTop: "28px",
            }}>
              <StatGroup {...impact.delivered} tone="delivered" isMobile={isMobile} reduced={reduced} />
              <StatGroup {...impact.projected} tone="projected" isMobile={isMobile} reduced={reduced} />
            </div>
          </Chapter>

          {/* ── Handoff ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{handoff.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}><Heading isMobile={isMobile}>{handoff.heading}</Heading></Reveal>
            <Paragraphs items={handoff.body} reduced={reduced} />
          </Chapter>

          {/* ── Takeaway ── */}
          <Chapter isMobile={isMobile}>
            <Reveal reduced={reduced}><Eyebrow>{takeaway.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.06} reduced={reduced}><Heading isMobile={isMobile}>{takeaway.heading}</Heading></Reveal>
            <Paragraphs items={takeaway.body} reduced={reduced} />

            <Reveal delay={0.2} reduced={reduced}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "44px" }}>
                <Link to="/#work" className="clickable" style={{
                  fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "1.5px",
                  textTransform: "uppercase", fontWeight: 700, textDecoration: "none",
                  color: "var(--bg)", background: "var(--accent)", padding: "15px 32px", borderRadius: "4px",
                }}>More Work</Link>
                <Link to="/#contact" className="clickable" style={{
                  fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "1.5px",
                  textTransform: "uppercase", fontWeight: 700, textDecoration: "none",
                  color: "var(--text-mid)", border: "1.5px solid var(--border)",
                  padding: "15px 32px", borderRadius: "4px",
                }}>Get in Touch</Link>
              </div>
            </Reveal>
          </Chapter>
        </div>
      </main>
    </motion.div>
  );
}
