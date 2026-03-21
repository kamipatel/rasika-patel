import { useState, useEffect, useCallback } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, reduced }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation timer
  useEffect(() => {
    if (isPaused || reduced) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused, reduced, projects.length]);

  // Resume after pause
  useEffect(() => {
    if (!isPaused) return;
    const id = setTimeout(() => setIsPaused(false), 8000);
    return () => clearTimeout(id);
  }, [isPaused]);

  const handleActivate = useCallback((i) => {
    setActiveIndex(i);
    setIsPaused(true);
  }, []);

  return (
    <div>
      {/* Projects — uniform 2-column grid */}
      <div
        className="project-card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          gap: "clamp(20px, 4vw, 32px)",
          marginTop: "32px",
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            reduced={reduced}
            isActive={i === activeIndex}
            onActivate={handleActivate}
          />
        ))}
      </div>

      {/* Navigation — minimal line indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "32px" }}>
        {projects.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => handleActivate(i)}
            aria-label={`Go to ${p.title}`}
            style={{
              width: i === activeIndex ? "32px" : "12px",
              height: "2px",
              border: "none",
              borderRadius: "1px",
              background: i === activeIndex ? "var(--accent)" : "var(--border)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
