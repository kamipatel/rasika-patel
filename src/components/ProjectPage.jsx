import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Instagram, Palette, Smartphone, FolderOpen, Github, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import projectImages from "../data/project-images.json";

const allProjects = projects;

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

function SellRetreatCarousel() {
  const scrollRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered || !scrollRef.current) return;
    const el = scrollRef.current;
    const interval = setInterval(() => {
      if (el) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
    }, 30);
    return () => clearInterval(interval);
  }, [hovered]);

  const images = ['retreat 1.png', '2.png', '3 copy.png', '4 copy.png', '5.png'];

  return (
    <div
      ref={scrollRef}
      className="sell-retreat-scroll"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        scrollSnapType: hovered ? "x mandatory" : "none",
        paddingBottom: "8px",
        WebkitOverflowScrolling: "touch",
        cursor: hovered ? "grab" : "default",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`.sell-retreat-scroll::-webkit-scrollbar { display: none; }`}</style>
      {images.map(img => (
        <img
          key={img}
          src={`/projects/sell-fellowship/${img}`}
          alt="Retreat photo"
          style={{
            height: "280px",
            width: "auto",
            borderRadius: "16px",
            scrollSnapAlign: "start",
            objectFit: "cover",
            flexShrink: 0,
            border: "1px solid var(--border)",
          }}
        />
      ))}
    </div>
  );
}

function getLinkMeta(url, captionOrTitle) {
  const fallback = (label) => ({
    label: captionOrTitle || label,
    description: "Visit link",
    icon: ExternalLink,
    color: "var(--text-mid)",
  });
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("vercel.app"))
      return { label: captionOrTitle || "Live Demo", description: "View the live app", icon: Globe, color: "#00C4B4" };
    if (hostname.includes("instagram.com"))
      return { label: captionOrTitle || "Instagram", description: "View on Instagram", icon: Instagram, color: "#E1306C" };
    if (hostname.includes("canva.com"))
      return { label: captionOrTitle || "Canva Design", description: "View design deck", icon: Palette, color: "#7D2AE8" };
    if (hostname.includes("apps.apple.com"))
      return { label: captionOrTitle || "App Store", description: "Download on iOS", icon: Smartphone, color: "#007AFF" };
    if (hostname.includes("drive.google.com"))
      return { label: captionOrTitle || "Google Drive", description: "View document", icon: FolderOpen, color: "#34A853" };
    if (hostname.includes("github.com"))
      return { label: captionOrTitle || "GitHub", description: "View repository", icon: Github, color: "#F0F0F0" };
    return fallback(hostname.replace("www.", ""));
  } catch {
    return fallback("Link");
  }
}

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = allProjects.find((p) => p.slug === slug);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
            padding: isMobile ? "24px" : "40px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "baseline",
            gap: isMobile ? "8px" : "16px",
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

        {/* External link button + additional links */}
        {(() => {
          const manifest = projectImages[slug] || {};
          const embeds = (manifest.embeds || []).map((e) => ({ url: e.url, ...getLinkMeta(e.url, e.caption) }));
          const links = (manifest.links || []).map((l) => ({ url: l.url, ...getLinkMeta(l.url, l.title) }));
          const seen = new Set();
          const allLinks = [
            ...(project.link ? [{ url: project.link, ...getLinkMeta(project.link, "Official Site") }] : []),
            ...embeds,
            ...links
          ].filter(({ url }) => {
            const normalized = url.replace(/\/$/, "");
            if (seen.has(normalized)) return false;
            seen.add(normalized);
            return true;
          });

          return (
            <>

              {allLinks.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "12px",
                    marginTop: "0",
                  }}
                >
                  {allLinks.map(({ url, label, description, icon: Icon, color }) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clickable link-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        textDecoration: "none",
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                        padding: "16px 18px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: `${color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} color={color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "var(--text-light)",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "10px",
                            color: "var(--text-dim)",
                            marginTop: "2px",
                          }}
                        >
                          {description}
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "14px",
                          color: "var(--text-dim)",
                          flexShrink: 0,
                        }}
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </>
          );
        })()}

        {/* Custom Layout for Well Water Finders (Video + Gallery at bottom) */}
        {slug === "well-water-finders" && (
          <div style={{ marginTop: "80px" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "24px",
              }}
            >
              Project Details
            </div>
            
            {/* Video Hero */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                background: "var(--card-bg)",
                marginBottom: "20px",
              }}
            >
              <video
                src="/projects/well-water-finders/Untitled design (3).mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
            
            {/* Horizontal Scrollable Gallery */}
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "16px",
                paddingBottom: "16px",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                /* Hide scrollbar for a cleaner look */
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="hide-scrollbar"
            >
              <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              {["2.png", "3.png", "4.png", "5.png"].map((img) => (
                <div
                  key={img}
                  style={{
                    flex: "0 0 auto",
                    width: "clamp(260px, 60vw, 320px)",
                    scrollSnapAlign: "start",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <motion.img
                    src={`/projects/well-water-finders/${img}`}
                    alt={`Well Water Finders ${img}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "12px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "var(--text-dim)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              <span>Swipe to explore</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ fontSize: "14px", display: "inline-block" }}
              >
                →
              </motion.div>
            </div>
          </div>
        )}

        {/* Content image gallery */}
        {slug !== "well-water-finders" && projectImages[slug]?.images?.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "24px",
              }}
            >
              {slug === "herdup" ? "User Interfaces" : "Project Gallery"}
            </div>
            <div
              style={{
                display: slug === "herdup" ? "flex" : "flex",
                flexDirection: "row",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                gap: slug === "herdup" ? "20px" : "16px",
                paddingBottom: "16px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                alignItems: "start",
                justifyContent: "flex-start"
              }}
              className="hide-scrollbar"
            >
              {projectImages[slug].images.map((src, i) => {
                const herdupWidth = slug === "herdup"
                  ? src.includes("001") ? "100%"
                  : isMobile ? "260px" : "13.33%"
                  : isMobile ? "280px" : "320px";

                return (
                  <div
                    key={src}
                    style={{
                      borderRadius: slug === "herdup" && !src.includes("001") ? "0px" : "16px",
                      overflow: "hidden",
                      border: slug === "herdup" ? "none" : "1px solid var(--border)",
                      width: herdupWidth,
                      minWidth: herdupWidth,
                      flexShrink: 0,
                      scrollSnapAlign: "start",
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
                );
              })}
            </div>
          </div>
        )}

        {/* SELL Fellowship — Merch Showcase */}
        {slug === "sell-fellowship" && (
          <div style={{ marginTop: "80px" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "24px",
              }}
            >
              Merch I Designed
            </div>
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "24px" : "0",
              padding: "20px 0",
            }}>
              <img
                src="/projects/sell-fellowship/tshirt1.png"
                alt="SELL Fellowship merch design 1"
                style={{
                  width: isMobile ? "90%" : "48%",
                  borderRadius: "16px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                  transform: isMobile ? "none" : "rotate(-4deg) translateX(20px)",
                  zIndex: 1,
                  border: "1px solid var(--border)",
                }}
              />
              <img
                src="/projects/sell-fellowship/tshirt2.png"
                alt="SELL Fellowship merch design 2"
                style={{
                  width: isMobile ? "90%" : "48%",
                  borderRadius: "16px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                  transform: isMobile ? "none" : "rotate(4deg) translateX(-20px)",
                  zIndex: 2,
                  border: "1px solid var(--border)",
                }}
              />
            </div>
          </div>
        )}

        {/* SELL Fellowship — Retreat Carousel */}
        {slug === "sell-fellowship" && (
          <div style={{ marginTop: "80px" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "24px",
              }}
            >
              Retreat Recap
            </div>
            <SellRetreatCarousel />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "12px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "var(--text-dim)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              <span>Swipe to explore</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ fontSize: "14px", display: "inline-block" }}
              >
                →
              </motion.div>
            </div>
          </div>
        )}

        {/* Extra sections */}
        {projectImages[slug]?.sections?.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            {projectImages[slug].sections.map((section, idx) => (
              <div key={section.title} style={{ marginBottom: "48px" }}>
                <h2
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text-light)",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ color: "var(--accent)", opacity: 0.5 }}>0{idx + 1}</span>
                  {section.title}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: section.title === "Business Cards"
                      ? "repeat(2, 1fr)"
                      : "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
                    gap: "16px",
                    maxWidth: section.title === "Business Cards" ? "600px" : "none",
                  }}
                >
                  {section.images.map((src, i) => (
                    <div
                      key={src}
                      style={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid var(--border)",
                        background: "var(--card-bg)",
                      }}
                    >
                      <img
                        src={src}
                        alt={`${section.title} image ${i + 1}`}
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
            ))}
          </div>
        )}

        {/* Cover image (Moved to bottom) */}
        {projectImages[slug]?.cover && (
          <div
            style={
              slug === "xplore-austin"
                ? {
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginTop: "80px",
                    marginBottom: "40px",
                    border: "none",
                    height: isMobile ? "141px" : "375px",
                  }
                : {
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginTop: "80px",
                    marginBottom: "40px",
                    border: "1px solid var(--border)",
                  }
            }
          >
            <img
              src={projectImages[slug].cover}
              alt={`${project.title} cover`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                marginTop: slug === "xplore-austin" ? (isMobile ? "-25%" : "-32%") : "0",
              }}
            />
          </div>
        )}
      </main>
    </motion.div>
  );
}
