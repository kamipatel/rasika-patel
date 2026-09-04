import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { springConfig } from "../lib/animation";

/*
 * One résumé role. Layout derives from the SkillRow pattern in Portfolio.jsx —
 * a [meta | content] split on desktop that collapses to a single column on
 * mobile, separated by hairlines rather than a dotted timeline.
 */
export default function ResumeEntry({ entry, index, reduced, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={reduced ? { duration: 0.01 } : { ...springConfig, delay: index * 0.06 }}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "190px 1fr",
        gap: isMobile ? "10px" : "36px",
        alignItems: "start",
        padding: isMobile ? "28px 0" : "34px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Meta column — dates, location, current marker */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 700,
            color: entry.current ? "var(--accent)" : "var(--text-mid)",
          }}
        >
          {entry.dates}
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            letterSpacing: "1px",
            color: "var(--text-dim)",
          }}
        >
          {entry.location}
        </span>
        {entry.current && (
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Current
          </span>
        )}
      </div>

      {/* Content column */}
      <div>
        <h3
          style={{
            fontFamily: "var(--display)",
            fontSize: isMobile ? "22px" : "26px",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            color: "var(--text-light)",
            marginBottom: entry.sub ? "4px" : "8px",
          }}
        >
          {entry.org}
        </h3>

        {entry.sub && (
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              marginBottom: "8px",
            }}
          >
            {entry.sub}
          </div>
        )}

        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--accent)",
            marginBottom: entry.roleHistory ? "12px" : "16px",
          }}
        >
          {entry.role}
        </p>

        {entry.roleHistory && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
            {entry.roleHistory.map((r) => (
              <span
                key={r}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  color: "var(--text-dim)",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  padding: "5px 12px",
                  borderRadius: "100px",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        )}

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {entry.bullets.map((b) => (
            <li
              key={b}
              style={{
                display: "flex",
                gap: "12px",
                fontFamily: "var(--body)",
                fontSize: isMobile ? "15px" : "16px",
                lineHeight: 1.7,
                color: "var(--text-mid)",
              }}
            >
              <span style={{ color: "var(--accent)", flexShrink: 0, opacity: 0.7 }}>—</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {entry.slug && (
          <Link
            to={`/projects/${entry.slug}`}
            className="clickable"
            style={{
              display: "inline-block",
              marginTop: "16px",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textDecoration: "none",
              color: "var(--text-light)",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "2px",
            }}
          >
            Case study &rarr;
          </Link>
        )}
      </div>
    </motion.div>
  );
}
