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
import RethinkHero from "./components/RethinkHero";
import ReceiptScroll from "./components/ReceiptScroll";
import ProjectGrid from "./components/ProjectGrid";
import AboutLabel from "./components/AboutLabel";
import SkillsOrder from "./components/SkillsOrder";
import PickupWindow from "./components/PickupWindow";
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
  background: "linear-gradient(135deg, #B7D46F, #7FA650, #E3EBA6)",
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
    enabled: false,
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
          background: "radial-gradient(circle, rgba(183,212,111,0.04), transparent 70%)",
          borderRadius: "50%", pointerEvents: "none", zIndex: 1,
          transition: "left 0.6s cubic-bezier(0.22,1,0.36,1), top 0.6s cubic-bezier(0.22,1,0.36,1)",
          filter: "blur(20px)",
        }} />
      )}

      <main>
        <RethinkHero isMobile={isMobile} />

        <ReceiptScroll isMobile={isMobile} />

        {/* ── HERO-ABOUT DIVIDER ── */}
        <Marquee items={projectMarqueeItems} speed={30} direction="left" separator="·" />

        {/* About: the cup label */}
        <section id="about" aria-label="About section" style={{ padding: "clamp(60px, 8vw, 96px) clamp(24px, 6vw, 80px)", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <Reveal reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-1.5px", margin: "0 0 40px", maxWidth: "18ch", overflowWrap: "break-word" }}>
              A product marketer who builds with AI.
            </h2>
          </Reveal>
          <AboutLabel />
        </section>

        {/* Work: the menu board */}
        <section id="work" aria-label="Work section" style={{ padding: "clamp(60px, 8vw, 96px) clamp(24px, 6vw, 80px)", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <Reveal reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-1.5px", margin: "0 0 40px", maxWidth: "18ch", overflowWrap: "break-word" }}>
              The menu: selected work.
            </h2>
          </Reveal>
          <ProjectGrid projects={featuredProjects} reduced={reduced} isMobile={isMobile} />
        </section>

        {/* Skills: the customizer */}
        <section id="skills" aria-label="Skills section" style={{ padding: "clamp(60px, 8vw, 96px) clamp(24px, 6vw, 80px)", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <Reveal reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-1.5px", margin: "0 0 40px", maxWidth: "18ch", overflowWrap: "break-word" }}>
              Build your order.
            </h2>
          </Reveal>
          <SkillsOrder />
        </section>

        {/* Contact: the pickup window */}
        <section id="contact" aria-label="Contact section" style={{ padding: "clamp(40px, 6vw, 80px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <PickupWindow />
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
