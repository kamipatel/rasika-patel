import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { springConfig } from "../lib/animation";
import { getProjectImages } from "../lib/images";
import MagButton from "./MagButton";
import { featured } from "../data/projects";

function buildMediaItems(media) {
  const items = [];
  if (media.cover) items.push({ type: "image", src: media.cover });
  for (const img of media.images || []) {
    items.push({ type: "image", src: img });
  }
  for (const v of media.videos || []) {
    if (v.type === "external") {
      items.push({ type: "video-embed", url: v.url, caption: v.caption });
    } else {
      items.push({ type: "video-file", src: v.url, caption: v.caption });
    }
  }
  for (const e of media.embeds || []) {
    items.push({ type: "embed", url: e.url, caption: e.caption });
  }
  return items;
}

function getEmbedUrl(url) {
  if (!url) return url;
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function FeaturedCard({ reduced }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();

  const media = getProjectImages(featured.slug);
  const mediaItems = buildMediaItems(media);
  const [activeIdx, setActiveIdx] = useState(0);
  const hasMultiple = mediaItems.length > 1;

  const prev = useCallback(
    (e) => { e.stopPropagation(); setActiveIdx((i) => (i - 1 + mediaItems.length) % mediaItems.length); },
    [mediaItems.length]
  );
  const next = useCallback(
    (e) => { e.stopPropagation(); setActiveIdx((i) => (i + 1) % mediaItems.length); },
    [mediaItems.length]
  );

  const current = mediaItems[activeIdx] || null;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={reduced ? { duration: 0.01 } : { ...springConfig, delay: 0.1 }}
    >
      <div
        className="featured-card-grid clickable"
        role="button"
        aria-label={`View ${featured.title} project details`}
        tabIndex={0}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => navigate(`/projects/${featured.slug}`)}
        onKeyDown={(e) => { if (e.key === "Enter") navigate(`/projects/${featured.slug}`); }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderRadius: "24px",
          overflow: "hidden",
          cursor: "pointer",
          border: `1px solid ${hov ? "var(--accent-dim)" : "var(--border)"}`,
          background: "var(--card)",
          transform: hov ? "scale(1.005)" : "scale(1)",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* LEFT — Media gallery */}
        <div
          style={{
            position: "relative",
            minHeight: "360px",
            overflow: "hidden",
            borderRadius: "16px",
            margin: "12px 0 12px 12px",
            background: "linear-gradient(160deg, var(--accent), #C2185B)",
          }}
        >
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: "absolute", inset: 0 }}
              >
                {current.type === "image" && (
                  <img
                    src={current.src}
                    alt={`${featured.title} media ${activeIdx + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                {current.type === "video-embed" && (
                  <iframe
                    src={getEmbedUrl(current.url)}
                    title={current.caption || `${featured.title} video`}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                {current.type === "video-file" && (
                  <video
                    src={current.src}
                    controls
                    poster={media.cover || undefined}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                {current.type === "embed" && (
                  <iframe
                    src={current.url}
                    title={current.caption || "Embedded content"}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    loading="lazy"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel controls */}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                style={{
                  position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                  border: "none", color: "#fff", fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: hov ? 1 : 0, transition: "opacity 0.3s", zIndex: 2,
                  cursor: "pointer",
                }}
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next"
                style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                  border: "none", color: "#fff", fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: hov ? 1 : 0, transition: "opacity 0.3s", zIndex: 2,
                  cursor: "pointer",
                }}
              >
                ›
              </button>
              {/* Dot indicators */}
              <div
                style={{
                  position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)",
                  display: "flex", gap: "6px", zIndex: 2,
                }}
              >
                {mediaItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      width: i === activeIdx ? "18px" : "6px",
                      height: "6px",
                      borderRadius: "100px",
                      background: i === activeIdx ? "#fff" : "rgba(255,255,255,0.5)",
                      border: "none",
                      padding: 0,
                      transition: "all 0.3s",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT — Info panel */}
        <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span
            style={{
              fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "2px",
              textTransform: "uppercase", color: "var(--accent)", fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Featured Project
          </span>

          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: "var(--text-light)",
              marginBottom: "8px",
            }}
          >
            {featured.title}
          </h3>

          <span
            style={{
              fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)",
              letterSpacing: "0.5px", marginBottom: "20px",
            }}
          >
            {featured.role}
          </span>

          <p
            style={{
              fontFamily: "var(--body)", fontSize: "15px", color: "var(--text-dim)",
              lineHeight: 1.7, marginBottom: "24px", maxWidth: "440px",
            }}
          >
            {featured.desc}
          </p>

          {/* Impact stat */}
          <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "20px" }}>
            <span
              style={{
                fontFamily: "var(--display)", fontSize: "32px", fontWeight: 800,
                color: "var(--accent)",
              }}
            >
              {featured.impact.split(" ")[0]}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
                letterSpacing: "1px", textTransform: "uppercase",
              }}
            >
              {featured.impact.split(" ").slice(1).join(" ")}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
            {featured.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
                  border: "1px solid var(--border)", padding: "4px 12px", borderRadius: "100px",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          {featured.link && (
            <MagButton
              filled
              onClick={(e) => {
                e.stopPropagation();
                window.open(featured.link, "_blank", "noopener,noreferrer");
              }}
            >
              View on App Store
            </MagButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}
