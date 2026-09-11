import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { springConfig } from "../lib/animation";

/*
 * Compact tier: work without a full case study behind it. A scannable row
 * per project — title, role, one line, outcome — rather than a card that
 * promises a page it cannot deliver.
 */
function Row({ project, index, reduced, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={reduced ? { duration: 0.01 } : { ...springConfig, delay: index * 0.05 }}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 170px",
        gap: isMobile ? "10px" : "28px",
        alignItems: isMobile ? "start" : "baseline",
        padding: isMobile ? "22px 0" : "26px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: isMobile ? "4px 10px" : "14px",
            marginBottom: "8px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: isMobile ? "18px" : "20px",
              fontWeight: 800,
              color: "var(--text-light)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--text-dim)",
            }}
          >
            {project.role}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "var(--text-mid)",
            margin: 0,
            maxWidth: "620px",
          }}
        >
          {project.oneLiner ?? project.desc}
        </p>
      </div>

      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--accent)",
          letterSpacing: "0.3px",
          lineHeight: 1.4,
          textAlign: isMobile ? "left" : "right",
        }}
      >
        {project.impact}
      </span>
    </motion.div>
  );
}

export default function SelectedWorkList({ projects, reduced, isMobile }) {
  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {projects.map((p, i) => (
        <Row key={p.slug} project={p} index={i} reduced={reduced} isMobile={isMobile} />
      ))}
    </div>
  );
}
