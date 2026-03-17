import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { springConfig } from "../lib/animation";
import { getProjectImages } from "../lib/images";

export default function ProjectCard({ project, index, reduced }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.06 });
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  const media = getProjectImages(project.slug);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={reduced ? { duration: 0.01 } : { ...springConfig, delay: index * 0.06 }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => navigate(`/projects/${project.slug}`)}
        onKeyDown={(e) => { if (e.key === "Enter") navigate(`/projects/${project.slug}`); }}
        className="clickable"
        role="button"
        aria-label={`View ${project.title} project details`}
        tabIndex={0}
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          border: `1px solid ${hov ? "var(--accent-dim)" : "var(--border)"}`,
          background: "var(--card)",
          cursor: "pointer",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hov ? "0 16px 48px rgba(232,97,60,0.08)" : "none",
          transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            aspectRatio: "16 / 10",
            overflow: "hidden",
            background: "linear-gradient(160deg, var(--accent), #C2185B)",
          }}
        >
          {media.cover && (
            <img
              src={media.cover}
              alt={`${project.title} thumbnail`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hov ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h3
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 700,
                color: "var(--text-light)",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
          </div>

          <span
            style={{
              fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
              letterSpacing: "0.5px", display: "block", marginBottom: "10px",
            }}
          >
            {project.role}
          </span>

          <p
            style={{
              fontFamily: "var(--body)", fontSize: "14px", color: "var(--text-dim)",
              lineHeight: 1.65, marginBottom: "14px",
              display: "-webkit-box", WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}
          >
            {project.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 700,
                color: "var(--accent)", background: "var(--accent-bg)",
                padding: "3px 10px", borderRadius: "100px", letterSpacing: "0.5px",
              }}
            >
              {project.impact}
            </span>
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
                  border: "1px solid var(--border)", padding: "3px 10px", borderRadius: "100px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
