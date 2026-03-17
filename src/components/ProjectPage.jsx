import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { featured, projects } from "../data/projects";
import projectImages from "../data/project-images.json";

const allProjects = [featured, ...projects];

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = allProjects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    navigate("/");
    return null;
  }

  const impactNum = project.impact.split(" ")[0];
  const impactLabel = project.impact.split(" ").slice(1).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <main
        style={{
          minHeight: "100vh",
          padding: "140px clamp(24px, 6vw, 80px) 80px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Back button */}
        <Link
          to="/"
          aria-label="Back to home"
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
          className="clickable"
        >
          ← Back
        </Link>

        {/* Project number */}
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: "96px",
            fontWeight: 800,
            color: "var(--accent)",
            opacity: 0.1,
            lineHeight: 1,
            marginBottom: "-20px",
          }}
        >
          {project.num}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            color: "var(--text-light)",
            marginBottom: "16px",
          }}
        >
          {project.title}
        </h1>

        {/* Role badge */}
        <div
          style={{
            display: "inline-block",
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: "1px",
            color: "var(--accent)",
            background: "var(--accent-bg)",
            border: "1px solid var(--accent-dim)",
            padding: "6px 16px",
            borderRadius: "100px",
            marginBottom: "32px",
          }}
        >
          {project.role}
        </div>

        {/* Timeline */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "12px",
            color: "var(--text-dim)",
            letterSpacing: "1px",
            marginBottom: "40px",
          }}
        >
          {project.timeline}
        </div>

        {/* Cover image hero */}
        {projectImages[slug]?.cover && (
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "40px",
              border: "1px solid var(--border)",
            }}
          >
            <img
              src={projectImages[slug].cover}
              alt={`${project.title} cover`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--border)",
            marginBottom: "40px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: "18px",
            color: "var(--text-mid)",
            lineHeight: 1.75,
            maxWidth: "700px",
            marginBottom: "48px",
          }}
        >
          {project.desc}
        </p>

        {/* Impact stat */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "40px",
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 800,
              color: "var(--accent)",
              lineHeight: 1,
            }}
          >
            {impactNum}
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--text-dim)",
            }}
          >
            {impactLabel}
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "48px",
          }}
        >
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "var(--text-dim)",
                border: "1px solid var(--border)",
                padding: "6px 16px",
                borderRadius: "100px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* External link button */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title} externally`}
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
              fontWeight: 700,
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "15px 32px",
              borderRadius: "100px",
              transition: "all 0.3s ease",
              boxShadow: "0 0 30px var(--accent-glow)",
            }}
          >
            Visit Project ↗
          </a>
        )}

        {/* Content image gallery */}
        {projectImages[slug]?.images?.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "24px",
              }}
            >
              Project Gallery
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
                gap: "16px",
              }}
            >
              {projectImages[slug].images.map((src, i) => (
                <div
                  key={src}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <img
                    src={src}
                    alt={`${project.title} image ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}
