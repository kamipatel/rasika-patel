import { useState, useEffect, useCallback } from "react";
import ProjectCard from "./ProjectCard";

/** The first LARGE_COUNT projects render as big cards; the rest are small. */
const LARGE_COUNT = 2;

// Big row: 2 columns, 1 below 900px. Small grid: 4 columns, 2 from 600 to
// 1100px, 1 below 600px.
const GRID_CSS = `
.work-grid-large { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.work-grid-small { grid-template-columns: repeat(4, minmax(0, 1fr)); }
@media (max-width: 1100px) { .work-grid-small { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 899.98px) { .work-grid-large { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 599.98px) { .work-grid-small { grid-template-columns: minmax(0, 1fr); } }
`;

export default function ProjectGrid({ projects, reduced }) {
  const large = projects.slice(0, LARGE_COUNT);
  const small = projects.slice(LARGE_COUNT);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation timer (big cards only)
  useEffect(() => {
    if (isPaused || reduced) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % large.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused, reduced, large.length]);

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
      <style>{GRID_CSS}</style>

      {/* Big cards: the two flagship case studies */}
      <div
        className="work-grid-large"
        style={{
          display: "grid",
          gap: "clamp(20px, 4vw, 32px)",
          marginTop: "32px",
        }}
      >
        {large.map((p, i) => (
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

      {/* Navigation: minimal line indicators for the big cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "32px" }}>
        {large.map((p, i) => (
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

      {/* Small cards: hover effect only, no rotation */}
      {small.length > 0 && (
        <div
          className="work-grid-small"
          style={{
            display: "grid",
            gap: "clamp(16px, 2vw, 20px)",
            marginTop: "32px",
          }}
        >
          {small.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              reduced={reduced}
              size="small"
            />
          ))}
        </div>
      )}
    </div>
  );
}
