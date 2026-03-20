import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { springConfig } from "../lib/animation";

const PROJECT_META = {
  "xplore-austin":                { icon: "\u{1F5FA}\uFE0F", gradient: ["#f97316", "#ef4444"] },
  "texas-momentum":               { icon: "\u{1F680}", gradient: ["#a855f7", "#4f46e5"] },
  "herdup":                       { icon: "\u{1F402}", gradient: ["#22d3ee", "#3b82f6"] },
  "sell-fellowship":              { icon: "\u{1F4A1}", gradient: ["#f43f5e", "#ec4899"] },
  "center-for-integrated-design": { icon: "\u{1F3A8}", gradient: ["#38bdf8", "#2563eb"] },
  "well-water-finders":           { icon: "\u{1F4A7}", gradient: ["#2dd4bf", "#059669"] },
  "cultured-carrot":              { icon: "\u{1F955}", gradient: ["#f59e0b", "#f97316"] },
};

const DEFAULT_META = { icon: "\u2728", gradient: ["#6366f1", "#4338ca"] };

/* ─── hooks ─── */
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

export default function ProjectCard({ project, index, reduced, isActive, onActivate }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.06 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // Skill category mapping
  const category = useMemo(() => {
    const tags = project.tags.map(t => t.toLowerCase());
    if (tags.some(t => t.includes("marketing") || t.includes("strategy") || t.includes("growth") || t.includes("startup"))) {
      return { label: "Marketing", color: "#3B82F6" }; // Blue
    }
    if (tags.some(t => t.includes("ui/ux") || t.includes("figma") || t.includes("wireframes") || t.includes("mobile"))) {
      return { label: "UI/UX", color: "#A78BFA" }; // Purple
    }
    if (tags.some(t => t.includes("design") || t.includes("adobe") || t.includes("creative"))) {
      return { label: "Design", color: "#FF6B35" }; // Orange
    }
    if (tags.some(t => t.includes("data") || t.includes("science") || t.includes("viz") || t.includes("softwaredesign"))) {
      return { label: "Data & Systems", color: "#10B981" }; // Green
    }
    return { label: "Project", color: "var(--accent)" };
  }, [project.tags]);

  const meta = PROJECT_META[project.slug] || DEFAULT_META;
  const [g1, g2] = meta.gradient;
  const gradientStr = `linear-gradient(135deg, ${g1}, ${g2})`;

  const handleMouseMove = useCallback((e) => {
    if (reduced) return;
    setHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      ry: (x - 0.5) * 15,
      rx: (0.5 - y) * 15,
    });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const handleCardClick = () => {
    onActivate(index);
    navigate(`/projects/${project.slug}`);
  };

  const handleViewProject = (e) => {
    // Let it bubble to handleCardClick
  };

  const truncatedDesc = project.desc && project.desc.length > 100
    ? project.desc.slice(0, 100) + "..."
    : project.desc;

  const g1Rgb = hexToRgb(g1);
  const inactiveShadow = `0 4px 24px rgba(${g1Rgb}, 0.12)`;
  const hoveredShadow = `0 14px 44px rgba(${g1Rgb}, 0.35)`;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
      } : undefined}
      transition={reduced ? { duration: 0.01 } : { ...springConfig, delay: index * 0.06 }}
      onClick={handleCardClick}
      style={{ cursor: "pointer", borderRadius: index === 0 ? "2px" : index % 2 === 0 ? "16px" : "8px" }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          borderRadius: "12px",
          padding: "20px",
          overflow: "hidden",
          background: "var(--card)",
          border: hovered
            ? `1px solid rgba(${g1Rgb}, 0.5)`
            : `1px solid var(--border)`,
          transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.15s ease-out, background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: gradientStr,
          opacity: hovered ? 0.15 : 0.08,
          borderRadius: "inherit",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }} />

        {/* Top edge highlight */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: hovered
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          pointerEvents: "none",
          transition: "background 0.3s ease",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Top: icon + tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "32px", lineHeight: 1 }}>{meta.icon}</span>
            <span style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--text-mid)",
            }}>
              {project.tags.slice(0, 3).join(" / ")}
            </span>
          </div>

          {/* Middle: title, role, desc */}
          <div>
            <h3 style={{
              fontFamily: "var(--display)",
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--text-light)",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}>
              {project.title}
            </h3>
            <p style={{
              fontFamily: "var(--body)",
              fontSize: "15px",
              color: "var(--text-mid)",
              fontWeight: 500,
              marginBottom: "10px",
            }}>
              {project.role.split("\u2014")[0].trim()}
            </p>
            <p style={{
              fontFamily: "var(--body)",
              fontSize: "15px",
              color: "var(--text-dim)",
              lineHeight: 1.5,
            }}>
              {truncatedDesc}
            </p>
          </div>


          {/* Bottom: category + impact + view button */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
            {/* Category Badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 8px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "100px",
              border: `1px solid ${category.color}44`,
              backdropFilter: "blur(8px)",
            }}>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: category.color,
                  boxShadow: `0 0 10px ${category.color}`,
                }}
              />
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "var(--text-light)",
                opacity: 0.9,
              }}>
                {category.label}
              </span>
            </div>

            <span style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              fontWeight: 700,
              color: g1,
              letterSpacing: "0.3px",
              borderLeft: `2px solid ${g1}`,
              paddingLeft: "8px",
            }}>
              {project.impact}
            </span>

            <div style={{ flex: 1 }} />

            <button
              onClick={handleViewProject}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-light)",
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.3)",
                padding: "4px 0",
                cursor: "pointer",
                transition: "border-color 0.3s ease, color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              View Project &rarr;
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          key={`progress-${index}-${hovered}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{
            duration: hovered ? 2 : 0.3,
            ease: hovered ? "linear" : "easeOut",
          }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: gradientStr,
            transformOrigin: "left",
            zIndex: 3,
            borderRadius: "0 0 inherit inherit",
          }}
        />
      </div>
    </motion.div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0,0,0";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
