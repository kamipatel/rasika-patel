/*
 * DESIGN RULES: DO NOT:
 * - Use "Hello, I'm" or "Hi, I'm" intros
 * - Use numbered sections (01, 02, 03)
 * - Use left-text right-portrait hero splits
 * - Use purple/blue gradients on dark backgrounds
 * - Use simple pill/badge tags for skills
 * - Use vertical timelines with dots and lines
 * - Use uniform card grids where every card looks identical
 * - Use generic subtitles like "Builder" / "Creator" / "Innovator"
 * - Use the same border-radius on everything
 * - Use cookie-cutter hover effects (scale 1.05 + shadow)
 *
 * INSTEAD:
 * - Break the grid: overlap elements, use asymmetry
 * - Mix scales dramatically: one huge element next to tiny details
 * - Use editorial typography: vary weights, sizes, and spacing
 *   within the same section
 * - Make each project feel different, not templated
 * - Use whitespace as a design element, not just padding
 * - Let the content dictate the layout, not a repeating pattern
 * - Reference magazine layouts, fashion sites, and agency portfolios
 *   not developer templates
 */
import { 
  useEffect, 
  useState, 
  useMemo, 
  useRef, 
  useCallback,
  useLayoutEffect
} from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import Marquee from "./components/Marquee";
import { useScrollSequence } from "./components/useScrollSequence";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import Seo from "./components/Seo";
import { homeMeta } from "./lib/routeMeta";
import Reveal from "./components/Reveal";
import MagButton from "./components/MagButton";
import { stats } from "./data/homeStats";
import ProjectGrid from "./components/ProjectGrid";
import Vortex from "./components/Vortex";
import IconCloud from "./components/IconCloud";
import { Icon, EvervaultCard } from "./components/ui/evervault-card";
import { Spotlight } from "./components/ui/spotlight";
import { DotPattern } from "./components/ui/dot-pattern";
import { Meteors } from "./components/ui/meteors";
import MagneticButton from "./components/ui/magnetic-button";
import { FloatingDock } from "./components/ui/floating-dock";
import { AnimatedBeam } from "./components/ui/animated-beam";

const STABLE_ICON_SLUGS = [
  "react", 
  "javascript", 
  "python", 
  "openai", 
  "openjdk", 
  "postgresql",
  "figma",
  "canva",
  "html5",
  "css3",
  "supabase",
  "anthropic",
  "googlegemini",
  "perplexity",
  "qualtrics",
  "nextdotjs",
  "vercel",
  "git",
];

/* ─── hooks ─── */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

/* ─── data ─── */
// The marquee keeps its own lineup and order, independent of the card grid's
// order, and leaves out Texas Convergent (its two projects are listed instead).
const MARQUEE_SLUGS = [
  "xplore-austin", "foundry", "harkey", "servicenow", "center-for-integrated-design",
  "texas-momentum", "herdup", "sell-fellowship", "well-water-finders", "ama", "cultured-carrot",
];
const projectMarqueeItems = MARQUEE_SLUGS.map((slug) => projects.find((p) => p.slug === slug).title);
const HERO_NAME_GRADIENT = {
  background: "linear-gradient(135deg, #FF6B35, #E8453C, #FF9F1C)",
  backgroundSize: "200% 200%", animation: "gradShift 6s ease infinite",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
};

/* ─── animation helpers ─── */
const springConfig = { type: "spring", stiffness: 60, damping: 20 };

/* ─── components ─── */

function SplitReveal({ text, style = {}, charDelay = 0.035, baseDelay = 0, reduced = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (reduced) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.01 }}
        style={{ display: "inline-block", ...style }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span ref={ref} style={{ display: "inline-block", ...style }}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "105%" }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: "105%" }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: baseDelay + i * charDelay,
          }}
          style={{
            display: "inline-block",
            whiteSpace: c === " " ? "pre" : "normal",
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

function SkillRow({ group, index, reduced, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div
      ref={ref}
      className="skill-grid"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={reduced ? { duration: 0.01 } : { ...springConfig, delay: index * 0.07 }}
      style={{
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : "180px 1fr", 
        gap: isMobile ? "12px" : "20px", 
        alignItems: isMobile ? "start" : "center",
        padding: isMobile ? "20px 0" : "24px 0", 
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span style={{
        fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "2.5px",
        textTransform: "uppercase", color: "var(--accent)", fontWeight: 700,
      }}>{group.label}</span>
      <motion.div
        style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reduced ? 0 : 0.04 } },
        }}
      >
        {group.items.map((s) => (
          <SkillChip key={s} name={s} reduced={reduced} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function SkillChip({ name, reduced }) {
  return (
    <motion.span
      variants={
        reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } }
          : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: springConfig } }
      }
      whileHover={reduced ? undefined : { background: "var(--surface-hover)", borderColor: "var(--accent)", y: -2 }}
      style={{
        display: "inline-block",
        fontFamily: "var(--mono)", fontSize: "13px", fontWeight: 500,
        letterSpacing: "0.2px",
        color: "var(--text-light)",
        cursor: "default",
        padding: "10px 24px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "100px",
        backdropFilter: "blur(4px)",
      }}
    >
      {name}
    </motion.span>
  );
}

function DrawLine({ reduced }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={reduced ? { duration: 0.01 } : { ...springConfig }}
      style={{
        height: "1px",
        background: "var(--border)",
        transformOrigin: "left",
      }}
    />
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "3px",
        background: "var(--accent)", transformOrigin: "0%", scaleX,
        zIndex: 200,
      }}
    />
  );
}

/*
 * html has scroll-behavior: smooth, so a page's scrollTo(0, 0) on mount glides
 * up from the About section. Jumping in the commit that swaps the route puts
 * the linked page at the top before its first paint, and leaves the homepage
 * in place while it fades out.
 */
function AboutLink({ to, children }) {
  const clicked = useRef(false);

  useLayoutEffect(() => () => {
    if (clicked.current) window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Link to={to} className="about-link" onClick={() => { clicked.current = true; }}>
      {children}
    </Link>
  );
}

/* ─── main ─── */
export default function Portfolio({ theme = "dark" }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState("idle");

  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const featuredProjects = useMemo(() => projects.filter((p) => p.featured && !p.hideFromGrid), []);

  const { scrollY: motionScrollY } = useScroll();
  const heroBlob1Y = useTransform(motionScrollY, [0, 800], [0, -120]);
  const heroBlob2Y = useTransform(motionScrollY, [0, 800], [0, -80]);

  const heroRef = useRef(null);
  const beamContainerRef = useRef(null);
  const beamHubRef = useRef(null);
  const beamDesignRef = useRef(null);
  const beamCodeRef = useRef(null);
  const beamAnalyticsRef = useRef(null);
  const beamToolsRef = useRef(null);
  const beamAIRef = useRef(null);
  const getFramePath = useCallback((i) => `/sequence/frame_${String(i).padStart(3, '0')}.gif`, []);
  const { canvasRef } = useScrollSequence({
    frameCount: 128,
    framePath: getFramePath,
    scrollRef: heroRef,
    enabled: !reduced && !isMobile,
    mode: "scroll",
  });

  useEffect(() => {
    if (isMobile) return;
    const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, [isMobile]);

  return (
    <motion.div
      key="main-content"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Seo {...homeMeta()} />

      {/* Scroll progress bar */}
      {!reduced && <ScrollProgressBar />}

      {/* grain overlay: hidden on mobile, reduced in light mode */}
      {!isMobile && (
        <div style={{
          position: "fixed", inset: "-50%", width: "200%", height: "200%",
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          pointerEvents: "none", zIndex: 9999, animation: "grain 5s steps(6) infinite",
          opacity: theme === "light" ? 0.15 : 0.55,
        }} />
      )}

      {/* subtle cursor glow: hidden on mobile */}
      {!isMobile && (
        <div style={{
          position: "fixed", left: mouse.x - 250, top: mouse.y - 250,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(255,107,53,0.04), transparent 70%)",
          borderRadius: "50%", pointerEvents: "none", zIndex: 1,
          transition: "left 0.6s cubic-bezier(0.22,1,0.36,1), top 0.6s cubic-bezier(0.22,1,0.36,1)",
          filter: "blur(20px)",
        }} />
      )}

      <main>
        {/* ═══════════════════════════════════
           HERO
           ═══════════════════════════════════ */}
        <section
          id="hero"
          ref={heroRef}
          aria-label="Hero section"
          style={{
            height: "min(88dvh, 820px)",
            position: "relative",
            overflow: "hidden",
            background: "var(--bg)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "calc(var(--nav-height, 80px) + 20px) 24px clamp(60px, 8vw, 80px) 24px",
            gap: "clamp(16px, 3vh, 32px)",
          }}
        >
          {/* 1. Interactive Vortex Background */}
          {!reduced && <Vortex baseHue={20} particleCount={400} />}

          {/* 2. Monumental Title */}
          <h1 aria-label="Rasika Patel" style={{
            fontFamily: "var(--display)",
            fontSize: isMobile ? "clamp(38px, 10vw, 56px)" : "clamp(46px, 11vw, 130px)",
            fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.04em",
            textTransform: "uppercase", margin: 0,
            textAlign: "center",
            zIndex: 10,
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(8px, 2vw, 32px)"
          }}>
            <span aria-hidden="true" style={{ color: "var(--text-light)", textShadow: "0 10px 40px rgba(0,0,0,0.6)" }}>Rasika</span>
            <span aria-hidden="true" style={{ display: "flex", alignItems: "center" }}>
              <span style={HERO_NAME_GRADIENT}>Patel</span>
              <span style={{ ...HERO_NAME_GRADIENT, marginLeft: "clamp(4px, 1vw, 12px)" }}>.</span>
            </span>
          </h1>

          {/* 2b. Role Badge */}
          <div style={{ zIndex: 10 }}>
            <span style={{
              display: "inline-block",
              fontFamily: "var(--mono)",
              fontSize: "clamp(11px, 1.2vw, 14px)",
              fontWeight: 500,
              color: "var(--accent)",
              border: "1px solid var(--accent-dim)",
              background: "var(--accent-bg)",
              borderRadius: "999px",
              padding: "6px 16px",
              letterSpacing: "0.03em",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}>
              Product marketer who builds with AI
            </span>
          </div>

          {/* 3. Interactive Portrait Masked inside an Arch */}
          <div style={{
            // Sized by height so it tracks the hero's vertical budget; width
            // follows from the ratio. flexShrink:0 is load-bearing: because
            // overflow:hidden makes min-height:auto resolve to 0, flex was
            // free to crush the 3:4 box into a landscape sliver once the hero
            // got shorter, and that is what cropped the head.
            height: "clamp(130px, 20vh, 220px)",
            width: "auto",
            aspectRatio: "3/4",
            flexShrink: 0,
            position: "relative",
            borderRadius: "200px 200px 0 0",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(237,232,245,0.1)",
            zIndex: 5,
            background: "rgba(0,0,0,0.2)",
            marginTop: "8px"
          }}>
            <canvas
              ref={canvasRef}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                // Inert while the bitmap matches the box, but if a resize lands
                // before updateCanvasSize() repaints, bias the crop to the top.
                objectPosition: "50% 0%",
                // Lands the top of the frame flush with the container so the ~8%
                // of background above the hair survives as headroom;
                // scale(1.2) translateY(5%) cut source rows 0-8 instead.
                transform: "scale(1.1) translateY(4%)",
              }}
            />
          </div>

          {/* 4. Tagline */}
          <div style={{ zIndex: 10, maxWidth: "600px", textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--body)", fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 300,
              color: "var(--text-light)", lineHeight: 1.5,
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              margin: 0
            }}>
              I build apps, then I get people to{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600, fontStyle: "italic" }}>use them</span>.
            </p>
              <p style={{
                fontFamily: "var(--mono)", fontSize: "clamp(11px, 1.1vw, 13px)", fontWeight: 400,
                letterSpacing: "0.4px", color: "var(--text-light)", lineHeight: 1.6,
                textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                margin: "14px 0 0"
              }}>
                Open to Summer 2027 internships in{" "}
                <strong style={{ fontWeight: 700, color: "var(--hl-ai)" }}>AI</strong>,{" "}
                <strong style={{ fontWeight: 700, color: "var(--accent)" }}>marketing</strong>, and{" "}
                <strong style={{ fontWeight: 700, color: "var(--hl-product)" }}>product management</strong>.
              </p>
          </div>

          {/* 5. CTAs */}
          <div style={{
            display: "flex", 
            gap: "16px", 
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            zIndex: 20, pointerEvents: "auto",
            marginTop: "8px", width: isMobile ? "100%" : "auto", 
            maxWidth: isMobile ? "300px" : "none"
          }}>
            <MagButton href="#work" filled style={{ width: "100%" }}>View my work</MagButton>
            <MagButton href="#contact" style={{ width: "100%" }}>Get in touch</MagButton>
          </div>

          {/* Smooth blend to next section */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "15vh",
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
            pointerEvents: "none", zIndex: 11
          }} />
        </section>

        {/* ═══ PROOF BAND: first thing after the hero ═══ */}
        <section
          aria-label="Key results"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            background: "var(--card)",
            padding: isMobile ? "34px 0" : "44px 0",
            position: "relative",
            zIndex: 12,
          }}
        >
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            padding: `0 ${isMobile ? "24px" : "clamp(24px, 6vw, 80px)"}`,
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? "26px 16px" : "24px",
          }}>
            {stats.map((s) => (
              <div key={s.label}>
                <span style={{
                  display: "block", fontFamily: "var(--display)",
                  fontSize: isMobile ? "clamp(30px, 8.5vw, 38px)" : "clamp(38px, 4vw, 56px)",
                  fontWeight: 800, letterSpacing: "-2px", lineHeight: 1,
                  color: "var(--accent)", fontVariantNumeric: "tabular-nums",
                }}>{s.val}</span>
                <span style={{
                  display: "block", marginTop: "10px", fontFamily: "var(--mono)",
                  fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
                  color: "var(--text-dim)", lineHeight: 1.5,
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── HERO-ABOUT DIVIDER ── */}
        <Marquee items={projectMarqueeItems} speed={30} direction="left" separator="·" />

        {/* ═══════════════════════════════════
           ABOUT
           ═══════════════════════════════════ */}
        <section id="about" aria-label="About section" style={{ padding: `clamp(60px, 8vw, 80px) ${isMobile ? '24px' : '0'}`, maxWidth: "1100px", margin: "0 auto", background: "transparent", position: "relative", zIndex: 10 }}>
          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>About Me</span>
          </Reveal>

          <Reveal delay={0.1} reduced={reduced}>
            <h2 style={{ 
              fontFamily: "var(--display)", 
              fontSize: "clamp(28px, 6vw, 48px)", 
              fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", 
              marginTop: "20px", marginBottom: "32px", maxWidth: "780px" 
            }}>
              A <span style={{ color: "var(--accent)" }}>product marketer</span> at McCombs who
              <span style={{ color: "var(--accent)" }}> builds with AI</span>.
            </h2>
          </Reveal>

          <DrawLine reduced={reduced} />

          <div className="about-grid" style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: isMobile ? "40px" : "60px", 
            alignItems: "start", 
            marginTop: "32px" 
          }}>
            <div>
              <Reveal delay={0.2} reduced={reduced}>
                <p style={{ fontFamily: "var(--body)", fontSize: "clamp(17px, 2vw, 19px)", color: "var(--text-dim)", lineHeight: 1.75, marginBottom: "18px" }}>
                  I built <strong style={{ color: "var(--text-light)", fontWeight: "600" }}><AboutLink to="/work/xplore">Xplore Austin</AboutLink></strong> solo with Claude Code. I ran marketing at Texas Momentum, where our content hit <strong style={{ color: "var(--accent)", fontWeight: "600" }}>150K+ organic views</strong>. This summer I interned in marketing at <strong style={{ color: "var(--text-light)", fontWeight: "600" }}><AboutLink to="/work/servicenow">ServiceNow</AboutLink></strong> in New York. Now I'm at the <strong style={{ color: "var(--text-light)", fontWeight: "600" }}><AboutLink to="/projects/harkey">Harkey Institute</AboutLink></strong> at McCombs, running marketing for the entrepreneurship programs and building Claude workflows that turn our Meta analytics into what to post next.
                </p>
              </Reveal>
              <Reveal delay={0.25} reduced={reduced}>
                <p style={{ fontFamily: "var(--body)", fontSize: "clamp(17px, 2vw, 19px)", color: "var(--text-dim)", lineHeight: 1.75 }}>
                  When I'm not in Figma, I'm making playlists, trying food around Austin, or hunting for the best matcha in the city. Always happy to share my recs.
                </p>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════
           WORK
           ═══════════════════════════════════ */}
        <section id="work" aria-label="Work section" style={{ padding: "clamp(60px, 8vw, 80px) clamp(24px, 6vw, 80px)", maxWidth: "1100px", margin: "0 auto", background: "var(--bg)", position: "relative", zIndex: 20, overflow: "hidden" }}>
          <Reveal reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: isMobile ? "clamp(32px, 9vw, 44px)" : "clamp(40px, 7vw, 80px)", fontWeight: 800, letterSpacing: isMobile ? "-1px" : "-3px", lineHeight: 0.95, marginTop: "16px", marginBottom: "48px" }}>
              Selected{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--accent), #E8453C)",
                backgroundSize: "200% 200%", animation: "gradShift 5s ease infinite",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>work</span>
            </h2>
          </Reveal>

          {/* Tiers: 2 big case studies, 4 small cards, then compact rows */}
          <ProjectGrid projects={featuredProjects} reduced={reduced} isMobile={isMobile} />
        </section>

        {/* ═══════════════════════════════════
           SKILLS
           ═══════════════════════════════════ */}
        <section id="skills" aria-label="Skills section" style={{ padding: "clamp(60px, 8vw, 80px) 0", margin: "0", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(24px, 6vw, 80px)", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
              <Reveal reduced={reduced}>
                <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 400, letterSpacing: "-0.5px", lineHeight: 1.2, marginTop: "16px", marginBottom: "16px", color: "var(--text-light)" }}>
                  Tools
                </h2>
              </Reveal>

              <DrawLine reduced={reduced} />

              {/* Hub-and-spoke beam diagram: desktop only */}
              {!isMobile && (
                <div
                  ref={beamContainerRef}
                  style={{
                    position: "relative",
                    height: "150px",
                    marginTop: "16px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Top row: Design, Code, Analytics */}
                  <div style={{ position: "absolute", top: "6px", left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "0 20px" }}>
                    <div ref={beamDesignRef} style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "100px", padding: "6px 16px" }}>
                      Design
                    </div>
                    <div ref={beamCodeRef} style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "100px", padding: "6px 16px" }}>
                      Code
                    </div>
                    <div ref={beamAnalyticsRef} style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "100px", padding: "6px 16px" }}>
                      Analytics
                    </div>
                  </div>

                  {/* Center hub */}
                  <div ref={beamHubRef} style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--card)", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "var(--accent)", fontWeight: 700, zIndex: 2 }}>
                    ∗
                  </div>

                  {/* Bottom row: Tools, AI */}
                  <div style={{ position: "absolute", bottom: "6px", left: 0, right: 0, display: "flex", justifyContent: "space-evenly", padding: "0 60px" }}>
                    <div ref={beamToolsRef} style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "100px", padding: "6px 16px" }}>
                      Tools
                    </div>
                    <div ref={beamAIRef} style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "100px", padding: "6px 16px" }}>
                      AI
                    </div>
                  </div>

                  {/* Animated beams from hub to each category */}
                  <AnimatedBeam containerRef={beamContainerRef} fromRef={beamHubRef} toRef={beamDesignRef} curvature={50} gradientStartColor="var(--accent)" gradientStopColor="#E8453C" pathColor="var(--border)" delay={0} duration={4} />
                  <AnimatedBeam containerRef={beamContainerRef} fromRef={beamHubRef} toRef={beamCodeRef} curvature={50} gradientStartColor="var(--accent)" gradientStopColor="#E8453C" pathColor="var(--border)" delay={0.5} duration={4} />
                  <AnimatedBeam containerRef={beamContainerRef} fromRef={beamHubRef} toRef={beamAnalyticsRef} curvature={50} gradientStartColor="var(--accent)" gradientStopColor="#E8453C" pathColor="var(--border)" delay={1} duration={4} />
                  <AnimatedBeam containerRef={beamContainerRef} fromRef={beamHubRef} toRef={beamToolsRef} curvature={-50} gradientStartColor="var(--accent)" gradientStopColor="#E8453C" pathColor="var(--border)" delay={1.5} duration={4} />
                  <AnimatedBeam containerRef={beamContainerRef} fromRef={beamHubRef} toRef={beamAIRef} curvature={-50} gradientStartColor="var(--accent)" gradientStopColor="#E8453C" pathColor="var(--border)" delay={2} duration={4} />
                </div>
              )}

              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 280px",
                gap: isMobile ? "16px" : "60px",
                alignItems: "start"
              }}>
                <div>
                  <div style={{ borderTop: "1px solid var(--border)", marginTop: isMobile ? "20px" : "0" }}>
                    {skillGroups.map((group, idx) => (
                      <SkillRow key={group.label} group={group} index={idx} reduced={reduced} isMobile={isMobile} />
                    ))}
                  </div>
                </div>

                <div style={{ position: isMobile ? "relative" : "sticky", top: isMobile ? undefined : "100px", ...(isMobile && { marginTop: 0, paddingTop: 0, overflow: "visible" }) }}>
                    <Reveal reduced={reduced}>
                      <div style={{
                        position: "relative",
                        ...(isMobile
                          ? { height: "auto", overflow: "visible", marginBottom: "0px" }
                          : { height: "350px" }),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "auto",
                        zIndex: 10,
                      }}>
                        <IconCloud iconSlugs={STABLE_ICON_SLUGS} />
                      </div>
                    </Reveal>
                  
                  <Reveal delay={0.2} reduced={reduced}>
                    <div style={{ 
                      marginTop: "20px", padding: "20px 24px", borderRadius: "12px", 
                      background: "var(--card)", border: "1px solid var(--border)", 
                      borderLeft: "3px solid var(--accent)", backdropFilter: "blur(10px)",
                      pointerEvents: "auto", position: "relative", zIndex: 1
                    }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "12px" }}>Relevant coursework</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {["Software Design", "Decision Science", "MIS", "Design Thinking", "Business Stats"].map((c) => (
                          <span key={c} style={{ fontFamily: "var(--body)", fontSize: "12px", color: "var(--text-dim)", background: "rgba(255,255,255,0.03)", padding: "4px 10px", borderRadius: "4px", border: "1px solid var(--border)" }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
        </section>

        {/* ═══════════════════════════════════
           CONTACT
           ═══════════════════════════════════ */}
        <section id="contact" aria-label="Contact section" style={{ padding: "clamp(40px, 5vw, 60px) clamp(24px, 6vw, 80px)", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ position: "absolute", top: "20%", left: "10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,107,53,0.05), transparent 60%)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />

          {/* Core Spotlight effect over the background */}

          <EvervaultCard className="w-full border border-[var(--border)] rounded-[40px] overflow-hidden backdrop-blur-md relative" style={{ background: "rgba(255,255,255,0.02)" }}>
            
            {/* Added DotPattern & Meteors inside the interactive card */}
            <DotPattern className="opacity-40 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]" />
            <Meteors number={15} />

            <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 60px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%", position: "relative", zIndex: 20 }}>
              
              <Reveal reduced={reduced}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px", display: "inline-block" }}>
                  Get in <span style={{ color: "var(--accent)", fontStyle: "italic" }}>touch</span>
                </span>
              </Reveal>

              <Reveal delay={0.1} reduced={reduced}>
                {/* Magnetic Wrapper on massive email */}
                <MagneticButton
                  href="mailto:rasikap@utexas.edu"
                  style={{ 
                    fontFamily: "var(--display)", 
                    fontSize: isMobile ? "clamp(24px, 7vw, 42px)" : "clamp(28px, 6.5vw, 110px)", 
                    fontWeight: 800, 
                    letterSpacing: isMobile ? "-1px" : "-2px", 
                    lineHeight: 1, 
                    color: "transparent",
                    backgroundImage: "linear-gradient(135deg, var(--text-light) 0%, var(--accent) 150%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    display: "inline-block",
                    textDecoration: "none",
                    position: "relative",
                  }}
                  whileHover={reduced ? {} : { 
                    scale: 1.05, 
                    textShadow: "0 0 50px rgba(255,107,53,0.6)"
                  }}
                >
                  rasikap@utexas.edu
                </MagneticButton>
              </Reveal>

              <div style={{ width: "1px", height: "12px", background: "var(--border)", margin: "8px auto", boxShadow: "0 0 10px rgba(255,107,53,0.3)" }} />

              <div style={{ position: "relative", zIndex: 20, width: "100%", display: "flex", justifyContent: "center" }}>
                <FloatingDock
                  items={[
                    { title: "LinkedIn", href: "https://www.linkedin.com/in/rasikapatel/", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
                    { title: "App Store", href: "https://apps.apple.com/us/app/xplore-austin/id6758564187", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 1.44C9.6 6.44 8 5 5 5A5 5 0 0 0 0 10c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5h-2c0-3-1-4-2-5Z"/></svg> },
                    { title: "Resume", href: "/resume", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
                  ]}
                  className="flex"
                />
              </div>

              {/* Dynamic Contact Form */}
              <div style={{ marginTop: "48px", width: "100%", maxWidth: "460px", position: "relative", zIndex: 20 }}>
                {formStatus === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    style={{ 
                      padding: "32px 24px", 
                      background: "var(--accent-bg)", 
                      border: "1px solid var(--accent-dim)", 
                      borderRadius: "20px", 
                      color: "var(--text-light)",
                      fontFamily: "var(--body)",
                      fontSize: "18px",
                      textAlign: "center",
                      boxShadow: "0 0 30px var(--accent-glow)"
                    }}
                  >
                    Message sent. Thanks for reaching out.
                  </motion.div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setFormStatus("submitting");
                      const formData = new FormData(e.target);
                      try {
                        const res = await fetch("https://formspree.io/f/mdawjoro", {
                          method: "POST",
                          body: formData,
                          headers: { Accept: "application/json" }
                        });
                        if (res.ok) {
                          setFormStatus("success");
                          e.target.reset();
                        } else {
                          setFormStatus("error");
                        }
                      } catch {
                        setFormStatus("error");
                      }
                    }}
                    className="flex flex-col gap-4 text-left w-full relative z-30 bg-[var(--bg)] rounded-3xl p-6"
                  >
                    <input
                      required type="text" name="name" placeholder="Name"
                      style={{ padding: "24px 28px", lineHeight: "1.5" }}
                      className="w-full rounded-2xl bg-white/10 border border-[var(--border)] font-[var(--body)] text-[17px] text-[var(--text-light)] placeholder-[var(--text-dim)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_25px_var(--accent-glow)] focus:bg-white/[0.15]"
                    />
                    <input
                      required type="email" name="email" placeholder="Email"
                      style={{ padding: "24px 28px", lineHeight: "1.5" }}
                      className="w-full rounded-2xl bg-white/10 border border-[var(--border)] font-[var(--body)] text-[17px] text-[var(--text-light)] placeholder-[var(--text-dim)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_25px_var(--accent-glow)] focus:bg-white/[0.15]"
                    />
                    <textarea
                      required name="message" placeholder="Message" rows={4}
                      style={{ padding: "24px 28px", lineHeight: "1.6" }}
                      className="w-full rounded-2xl bg-white/10 border border-[var(--border)] font-[var(--body)] text-[17px] text-[var(--text-light)] placeholder-[var(--text-dim)] outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_25px_var(--accent-glow)] focus:bg-white/[0.15] resize-none min-h-[160px]"
                    />
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="mt-2 w-full px-8 py-4 rounded-full font-[var(--mono)] text-[14px] font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
                      style={{
                        background: "var(--accent)", color: "var(--bg)", border: "none", cursor: "pointer",
                        boxShadow: "0 0 20px var(--accent-glow)",
                      }}
                      onMouseEnter={(e) => { if (formStatus !== "submitting") e.currentTarget.style.boxShadow = "0 0 30px var(--accent-dim)"; }}
                      onMouseLeave={(e) => { if (formStatus !== "submitting") e.currentTarget.style.boxShadow = "0 0 20px var(--accent-glow)"; }}
                    >
                      {formStatus === "submitting" ? "Sending..." : "Send message"}
                    </button>
                    {formStatus === "error" && (
                      <span className="text-[#E8453C] text-[14px] text-center font-[var(--body)] mt-2">
                        Something went wrong. Please try again.
                      </span>
                    )}
                  </form>
                )}
              </div>
            </div>
          </EvervaultCard>
        </section>
      </main>

      {/* FOOTER */}
      <Reveal reduced={reduced}>
        <footer style={{ padding: "28px clamp(24px, 6vw, 80px)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "var(--display)", fontSize: "15px", fontWeight: 800 }}>
              <span style={{ color: "var(--accent)" }}>R</span>P
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)" }}>© 2026 Rasika Patel</span>
          </div>
        </footer>
      </Reveal>
    </motion.div>
  );
}
