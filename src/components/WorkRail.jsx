import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SelectedWorkList from "./SelectedWorkList";
import ProjectGrid from "./ProjectGrid";

/*
 * "The menu rail": on desktop the selected work slides sideways as you scroll
 * down, like sliding plates along a cafe counter. Mobile and reduced-motion
 * visitors keep the original grid.
 */

const RAIL_COUNT = 6;
const INK = "#17301F";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function RailCounter({ index, total }) {
  return (
    <div style={{
      position: "absolute", left: "clamp(24px, 6vw, 80px)", bottom: 22, zIndex: 5,
      fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
      color: INK, display: "flex", alignItems: "center", gap: 12, pointerEvents: "none",
    }}>
      <span style={{ fontWeight: 700 }}>On the counter</span>
      <span style={{ display: "inline-block", width: 90, height: 2, background: "rgba(23,48,31,0.2)", position: "relative", overflow: "hidden", borderRadius: 2 }}>
        <span style={{ position: "absolute", inset: 0, width: `${(index / total) * 100}%`, background: INK, transition: "width .25s ease" }} />
      </span>
      <span>{String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
  );
}

export default function WorkRail({ projects, reduced, isMobile }) {
  const railProjects = projects.slice(0, RAIL_COUNT);
  const rest = projects.slice(RAIL_COUNT);

  const trackRef = useRef(null);
  const stripRef = useRef(null);
  const [range, setRange] = useState(0);
  const [current, setCurrent] = useState(1);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.5 });
  const x = useTransform(smooth, [0.02, 0.98], [0, -range]);

  useMotionValueEvent(smooth, "change", (v) => {
    setCurrent(1 + Math.round(clamp(v) * (railProjects.length - 1)));
  });

  useEffect(() => {
    if (isMobile || reduced) return undefined;
    const measure = () => {
      const strip = stripRef.current;
      if (!strip) return;
      const overflow = strip.scrollWidth - window.innerWidth;
      setRange(Math.max(0, overflow));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, [isMobile, reduced, railProjects.length]);

  if (isMobile || reduced) {
    return <ProjectGrid projects={projects} reduced={reduced} isMobile={isMobile} />;
  }

  return (
    <div>
      <section
        ref={trackRef}
        aria-label="Selected work, sliding menu rail"
        style={{ height: `calc(100dvh + ${range + 200}px)`, position: "relative" }}
      >
        <div style={{
          position: "sticky", top: 0, height: "100dvh", overflow: "clip",
          display: "flex", alignItems: "flex-start",
        }}>
          <div style={{
            position: "absolute", top: 84, right: "clamp(24px, 6vw, 80px)", zIndex: 5,
            fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase",
            color: INK, opacity: 0.75, pointerEvents: "none",
          }}>
            Scroll to slide the counter →
          </div>
          <div style={{
            position: "absolute", top: 84, left: "clamp(24px, 6vw, 80px)", zIndex: 5,
            fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
            color: INK, opacity: 0.85, pointerEvents: "none",
          }}>
            The menu · selected work
          </div>

          <motion.div
            ref={stripRef}
            style={{
              x, display: "flex", alignItems: "flex-start", gap: "clamp(24px, 3vw, 44px)",
              paddingLeft: "clamp(24px, 6vw, 80px)", paddingRight: "12vw", willChange: "transform",
              paddingTop: "clamp(120px, 17dvh, 190px)",
            }}
          >
            {railProjects.map((p, i) => (
              <div
                key={p.slug}
                onFocusCapture={() => {
                  // keyboard: tabbing to an offscreen plate slides the counter to it
                  const track = trackRef.current;
                  if (!track) return;
                  const frac = i / Math.max(1, railProjects.length - 1);
                  const span = track.offsetHeight - window.innerHeight;
                  const y = track.getBoundingClientRect().top + window.scrollY + frac * span;
                  if (window.__lenis) window.__lenis.scrollTo(y); else window.scrollTo({ top: y });
                }}
                style={{
                flex: "0 0 auto", width: "clamp(330px, 25vw, 410px)",
                marginTop: i % 2 ? 64 : 0,
              }}>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, letterSpacing: "2.5px",
                  textTransform: "uppercase", color: INK, opacity: 0.65, marginBottom: 10, paddingLeft: 4,
                }}>
                  No. {String(i + 1).padStart(2, "0")}
                </div>
                <ProjectCard project={p} index={i} reduced={false} />
              </div>
            ))}

            {/* end plate */}
            <div style={{
              flex: "0 0 auto", width: "clamp(280px, 20vw, 340px)", marginTop: 20,
              border: `2px dashed ${INK}`, borderRadius: 24, padding: "34px 28px",
              fontFamily: "var(--mono)", color: INK, textAlign: "center", background: "rgba(251,253,244,0.6)",
            }}>
              <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 14 }} aria-hidden="true">✦</div>
              <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: "1.5px", textTransform: "uppercase" }}>That's the headliners</div>
              <div style={{ fontSize: 13, marginTop: 10, opacity: 0.75, lineHeight: 1.5 }}>
                The rest of the menu is just below, and every plate opens its own page.
              </div>
            </div>
          </motion.div>

          <RailCounter index={current} total={railProjects.length} />
        </div>
      </section>

      {rest.length > 0 && (
        <div style={{ marginTop: "clamp(40px, 6vw, 56px)" }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px",
          }}>
            More work
          </p>
          <SelectedWorkList projects={rest} reduced={reduced} isMobile={isMobile} />
        </div>
      )}
    </div>
  );
}
