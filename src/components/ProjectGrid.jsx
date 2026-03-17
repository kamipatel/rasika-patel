import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, reduced }) {
  return (
    <div
      className="project-card-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} reduced={reduced} />
      ))}
    </div>
  );
}
