import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView, useAnimationFrame, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";
import { timelineNodes, connections } from "../data/timeline";

// Place nodes on orbits
function layoutNodes(nodes) {
  const inner = nodes.filter((n) => n.status === "in-progress" && n.energy >= 80);
  const outer = nodes.filter((n) => !inner.includes(n));
  const cx = 400, cy = 400;

  const place = (list, radius) =>
    list.map((node, i) => {
      const angle = (2 * Math.PI * i) / list.length - Math.PI / 2;
      return { ...node, baseAngle: angle, radius, cx, cy };
    });

  return [...place(inner, 160), ...place(outer, 260)];
}

function nodePos(node, angleOffset) {
  const a = node.baseAngle + angleOffset;
  return {
    x: node.cx + node.radius * Math.cos(a),
    y: node.cy + node.radius * Math.sin(a),
  };
}

// SVG orbital visualization (desktop)
function OrbitalSVG({ reduced }) {
  const navigate = useNavigate();
  const [hovSlug, setHovSlug] = useState(null);
  const angleVal = useMotionValue(0);
  const laidOut = useMemo(() => layoutNodes(timelineNodes), []);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    angleVal.set(angleVal.get() + (delta / 1000) * ((2 * Math.PI) / 60));
  });

  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const unsub = angleVal.on("change", (v) => setAngle(v));
    return unsub;
  }, [angleVal]);

  const nodeRadius = (n) => 12 + n.energy * 0.06;

  const slugToPos = {};
  for (const n of laidOut) {
    slugToPos[n.slug] = nodePos(n, angle);
  }

  return (
    <svg
      viewBox="0 0 800 800"
      style={{ width: "100%", maxWidth: "700px", margin: "0 auto", display: "block" }}
    >
      {/* Orbit rings */}
      {[160, 260].map((r) => (
        <circle
          key={r}
          cx={400} cy={400} r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="6 6"
          opacity={0.5}
        />
      ))}

      {/* Connection lines */}
      {connections.map((c) => {
        const from = slugToPos[c.from];
        const to = slugToPos[c.to];
        if (!from || !to) return null;
        const highlight = hovSlug === c.from || hovSlug === c.to;
        return (
          <line
            key={`${c.from}-${c.to}`}
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke="var(--accent)"
            strokeWidth={highlight ? 1.5 : 0.8}
            strokeDasharray="4 4"
            opacity={highlight ? 0.5 : 0.15}
            style={{ transition: "opacity 0.3s" }}
          />
        );
      })}

      {/* Central hub */}
      <circle cx={400} cy={400} r={40} fill="var(--accent)" opacity={0.15} />
      <circle cx={400} cy={400} r={28} fill="var(--accent)" opacity={0.3} />
      <text
        x={400} y={405}
        textAnchor="middle"
        fill="var(--accent)"
        fontFamily="var(--display)"
        fontWeight={800}
        fontSize="18"
      >
        RP
      </text>

      {/* Nodes */}
      {laidOut.map((node) => {
        const pos = slugToPos[node.slug];
        const r = nodeRadius(node);
        const isHov = hovSlug === node.slug;
        const dimmed = hovSlug && !isHov && !connections.some(
          (c) => (c.from === hovSlug && c.to === node.slug) || (c.to === hovSlug && c.from === node.slug)
        );
        const isActive = node.status === "in-progress";
        const fillColor = isActive ? "var(--accent)" : "rgba(232,97,60,0.4)";

        return (
          <g
            key={node.slug}
            style={{ cursor: "pointer", transition: "opacity 0.3s" }}
            opacity={dimmed ? 0.3 : 1}
            onClick={() => navigate(`/projects/${node.slug}`)}
            onMouseEnter={() => setHovSlug(node.slug)}
            onMouseLeave={() => setHovSlug(null)}
          >
            {/* Glow ring for in-progress */}
            {isActive && !reduced && (
              <motion.circle
                cx={pos.x} cy={pos.y} r={r + 6}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <circle
              cx={pos.x} cy={pos.y} r={isHov ? r * 1.15 : r}
              fill={fillColor}
              style={{ transition: "r 0.3s" }}
            />

            {/* Title */}
            <text
              x={pos.x}
              y={pos.y + r + 16}
              textAnchor="middle"
              fill={isHov ? "var(--text-light)" : "var(--text-mid)"}
              fontFamily="var(--mono)"
              fontSize="10"
              letterSpacing="0.5"
              style={{ transition: "fill 0.3s" }}
            >
              {node.title}
            </text>

            {/* Timeline */}
            <text
              x={pos.x}
              y={pos.y + r + 28}
              textAnchor="middle"
              fill="var(--text-dim)"
              fontFamily="var(--mono)"
              fontSize="8"
            >
              {node.timeline}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Linear mobile fallback
function LinearTimeline({ reduced }) {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", paddingLeft: "32px" }}>
      {/* Center line */}
      <div
        style={{
          position: "absolute", left: "8px", top: 0, bottom: 0,
          width: "2px", background: "var(--border)",
        }}
      />

      {timelineNodes.map((node, i) => {
        const isActive = node.status === "in-progress";
        return (
          <Reveal key={node.slug} delay={i * 0.06} reduced={reduced}>
            <div
              onClick={() => navigate(`/projects/${node.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") navigate(`/projects/${node.slug}`); }}
              className="clickable"
              style={{
                position: "relative",
                padding: "20px 0",
                cursor: "pointer",
              }}
            >
              {/* Dot on line */}
              <div
                style={{
                  position: "absolute",
                  left: "-28px",
                  top: "26px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: isActive ? "var(--accent)" : "rgba(232,97,60,0.4)",
                  border: isActive ? "2px solid var(--accent-dim)" : "none",
                }}
              />

              <h4
                style={{
                  fontFamily: "var(--display)", fontSize: "18px", fontWeight: 700,
                  color: "var(--text-light)", marginBottom: "4px",
                }}
              >
                {node.title}
              </h4>
              <span
                style={{
                  fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
                  letterSpacing: "0.5px",
                }}
              >
                {node.timeline}
              </span>
              {isActive && (
                <span
                  style={{
                    fontFamily: "var(--mono)", fontSize: "9px", color: "var(--accent)",
                    background: "var(--accent-bg)", padding: "2px 8px",
                    borderRadius: "100px", marginLeft: "8px", letterSpacing: "0.5px",
                  }}
                >
                  Active
                </span>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function RadialOrbitalTimeline({ reduced }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      id="timeline"
      ref={ref}
      aria-label="Timeline section"
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Reveal reduced={reduced}>
        <span
          style={{
            fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--accent)",
          }}
        >
          Timeline
        </span>
      </Reveal>
      <Reveal delay={0.08} reduced={reduced}>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(34px, 5.5vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginTop: "16px",
            marginBottom: "48px",
          }}
        >
          Project Orbit
        </h2>
      </Reveal>

      {isInView && (
        <>
          <div className="radial-timeline-orbital">
            <OrbitalSVG reduced={reduced} />
          </div>
          <div className="radial-timeline-linear">
            <LinearTimeline reduced={reduced} />
          </div>
        </>
      )}
    </section>
  );
}
