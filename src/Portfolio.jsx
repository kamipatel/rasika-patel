/*
 * DESIGN RULES — DO NOT:
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
 * - Break the grid — overlap elements, use asymmetry
 * - Mix scales dramatically — one huge element next to tiny details
 * - Use editorial typography — vary weights, sizes, and spacing
 *   within the same section
 * - Make each project feel different, not templated
 * - Use whitespace as a design element, not just padding
 * - Let the content dictate the layout, not a repeating pattern
 * - Reference magazine layouts, fashion sites, and agency portfolios
 *   — not developer templates
 */
import { 
  useEffect, 
  useState, 
  useMemo, 
  useRef, 
  useCallback 
} from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Marquee from "./components/Marquee";
import RotatingTitle from "./components/RotatingTitle";
import { useScrollSequence } from "./components/useScrollSequence";
import { featured, projects } from "./data/projects";
import Reveal from "./components/Reveal";
import MagButton from "./components/MagButton";
import ProjectGrid from "./components/ProjectGrid";
import RadialOrbitalTimeline from "./components/RadialOrbitalTimeline";
import Vortex from "./components/Vortex";
import IconCloud from "./components/IconCloud";
import VelocityScroll from "./components/VelocityScroll";
import { Icon } from "./components/ui/evervault-card";

const STABLE_ICON_SLUGS = [
  "react", 
  "javascript", 
  "python", 
  "openai", 
  "openjdk", 
  "postgresql", 
  "googlecloud",
  "figma", 
  "canva",
  "html5",
  "css3",
  "supabase",
  "anthropic",
  "googlegemini",
  "perplexity",
  "qualtrics",
];

/* ─── hooks ─── */
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

/* ─── data ─── */
const skillGroups = [
  { label: "Design", items: ["Figma", "Canva", "Illustrator", "Photoshop"] },
  { label: "Code", items: ["Python", "Java", "SQL", "HTML/CSS"] },
  { label: "Analytics", items: ["Tableau", "Qualtrics", "Excel", "PowerPoint"] },
  { label: "Tools", items: ["VS Code", "Supabase"] },
  { label: "AI", items: ["Claude", "Gemini", "Perplexity", "OpenClaw", "Antigravity"] },
];

const stats = [
  { val: "9+", label: "Projects" },
  { val: "121%", label: "Sales Growth" },
  { val: "150K+", label: "Organic Views" },
  { val: "250+", label: "Downloads" },
];

const skillsMarqueeItems = ["Figma", "Python", "Tableau", "AI Tools", "Canva", "Java", "SQL", "Supabase", "Illustrator", "Qualtrics"];
const projectMarqueeItems = [featured.title, ...projects.map((p) => p.title)];
const HERO_ROLES = ["UX Designer", "Creative Strategist", "Brand Architect", "Marketing Lead", "App Founder"];

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

function SkillRow({ group, index, reduced }) {
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
        display: "grid", gridTemplateColumns: "180px 1fr", gap: "20px", alignItems: "center",
        padding: "24px 0", borderBottom: "1px solid var(--border)",
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

function AnimatedStat({ val, label, reduced, variant = "secondary" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");
  const isHero = variant === "hero";

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setDisplay(val);
      return;
    }

    const numMatch = val.match(/[\d.]+/);
    if (!numMatch) { setDisplay(val); return; }
    const target = parseFloat(numMatch[0]);
    const prefix = val.slice(0, val.indexOf(numMatch[0]));
    const suffix = val.slice(val.indexOf(numMatch[0]) + numMatch[0].length);
    const isFloat = numMatch[0].includes(".");
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const current = target * ease;
      setDisplay(prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, val, reduced]);

  return (
    <div ref={ref} style={{ background: "var(--bg)", padding: isHero ? "24px 16px" : "8px 4px", textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--display)", fontSize: isHero ? "48px" : "30px", fontWeight: 800,
        color: "var(--accent)", lineHeight: 1, marginBottom: isHero ? "8px" : "4px",
        textShadow: isHero ? "0 0 30px rgba(255,107,53,0.3), 0 0 60px rgba(255,107,53,0.1)" : "none",
      }}>{display}</div>
      {isHero && (
        <div style={{
          width: "40px", height: "2px", background: "var(--accent)",
          opacity: 0.6, margin: "0 auto 8px",
        }} />
      )}
      <div style={{
        fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "1.5px",
        textTransform: "uppercase", color: "var(--text-dim)",
      }}>{label}</div>
    </div>
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

/* ─── main ─── */
export default function Portfolio({ loaded = false, theme = "dark" }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { scrollY: motionScrollY } = useScroll();
  const heroBlob1Y = useTransform(motionScrollY, [0, 800], [0, -120]);
  const heroBlob2Y = useTransform(motionScrollY, [0, 800], [0, -80]);

  const heroRef = useRef(null);
  const getFramePath = useCallback((i) => `/sequence/frame_${String(i).padStart(3, '0')}.gif`, []);
  const { canvasRef, isLoaded } = useScrollSequence({
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scroll progress bar */}
      {!reduced && <ScrollProgressBar />}

      {/* grain overlay — hidden on mobile, reduced in light mode */}
      {!isMobile && (
        <div style={{
          position: "fixed", inset: "-50%", width: "200%", height: "200%",
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          pointerEvents: "none", zIndex: 9999, animation: "grain 5s steps(6) infinite",
          opacity: theme === "light" ? 0.15 : 0.55,
        }} />
      )}

      {/* subtle cursor glow — hidden on mobile */}
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
            height: "100dvh",
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
          <Vortex baseHue={20} particleCount={400} />

          {/* 2. Monumental Title */}
          <h1 style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(50px, 10vw, 130px)",
            fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em",
            textTransform: "uppercase", margin: 0,
            textAlign: "center",
            zIndex: 10,
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(12px, 3vw, 32px)"
          }}>
            <span style={{ color: "var(--text-light)", textShadow: "0 10px 40px rgba(0,0,0,0.6)" }}>
              <SplitReveal text="Rasika" baseDelay={0.4} charDelay={0.05} reduced={reduced} />
            </span>
            <span style={{
              display: "flex", alignItems: "center",
              background: "linear-gradient(135deg, #FF6B35, #E8453C, #FF9F1C)",
              backgroundSize: "200% 200%", animation: "gradShift 6s ease infinite",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              <SplitReveal text="Patel" baseDelay={0.7} charDelay={0.05} reduced={reduced} />
              <span style={{ marginLeft: "clamp(4px, 1vw, 12px)" }}>
                <SplitReveal text="." baseDelay={1.0} charDelay={0.05} reduced={reduced} />
              </span>
            </span>
          </h1>

          {/* 3. Interactive Portrait Masked inside an Arch */}
          <div style={{
            width: "clamp(200px, 35vw, 320px)",
            aspectRatio: "3/4",
            position: "relative",
            borderRadius: "200px 200px 0 0",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(237,232,245,0.1)",
            zIndex: 5,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s cubic-bezier(0.22,1,0.36,1) 0.8s",
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
                transform: "scale(1.2) translateY(5%)",
              }}
            />
          </div>

          {/* 4. Subtitle (Rotating Roles) */}
          <div style={{
            opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s",
            zIndex: 10, display: "flex", justifyContent: "center", width: "100%",
            marginTop: "8px"
          }}>
            <RotatingTitle titles={HERO_ROLES} reduced={reduced} loaded={loaded} />
          </div>

          {/* 5. Tagline */}
          <div style={{
            opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.4s",
            zIndex: 10, maxWidth: "600px", textAlign: "center"
          }}>
            <p style={{
              fontFamily: "var(--body)", fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 300,
              color: "var(--text-light)", lineHeight: 1.5,
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              margin: 0
            }}>
              Building at the intersection of{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600, fontStyle: "italic" }}>storytelling</span> and{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600, fontStyle: "italic" }}>systems</span>.
            </p>
          </div>

          {/* 6. CTAs */}
          <div style={{
            display: "flex", gap: "16px", justifyContent: "center",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s cubic-bezier(0.22,1,0.36,1) 1.6s",
            zIndex: 20, pointerEvents: "auto",
            marginTop: "0px", flexWrap: "wrap"
          }}>
            <MagButton href="#work" filled>View My Work</MagButton>
            <MagButton href="#contact">Get in Touch</MagButton>
          </div>

          {/* Smooth blend to next section */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "15vh",
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
            pointerEvents: "none", zIndex: 11
          }} />
        </section>

        {/* ── HERO-ABOUT DIVIDER ── */}
        <Marquee items={projectMarqueeItems} speed={30} direction="left" separator="✦" />

        {/* ═══════════════════════════════════
           ABOUT
           ═══════════════════════════════════ */}
        <section id="about" aria-label="About section" style={{ padding: "clamp(60px, 8vw, 80px) 0", maxWidth: "1100px", margin: "0 auto", background: "transparent", position: "relative", zIndex: 10 }}>
          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>About Me</span>
          </Reveal>

          <Reveal delay={0.1} reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-1px", marginTop: "20px", marginBottom: "32px", maxWidth: "780px" }}>
              A <span style={{ color: "var(--accent)" }}>Marketing</span> student at McCombs
              obsessed with <span style={{ fontStyle: "italic", color: "var(--text-light)" }}>UI/UX</span>, creative strategy,
              and building things that matter.
            </h2>
          </Reveal>

          <DrawLine reduced={reduced} />

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 310px", gap: "60px", alignItems: "start", marginTop: "32px" }}>
            <div>
              <Reveal delay={0.2} reduced={reduced}>
                <p style={{ fontFamily: "var(--body)", fontSize: "19px", color: "var(--text-dim)", lineHeight: 1.75, marginBottom: "18px" }}>
                  I love finding the intersection between storytelling and systems — where a good idea turns into something people actually care about. From founding <strong style={{ color: "var(--text-light)", fontWeight: "600" }}>Xplore Austin</strong> to driving <strong style={{ color: "var(--accent)", fontWeight: "600" }}>150K+ organic views</strong> at Texas Momentum, I'm drawn to building and shipping real things.
                </p>
              </Reveal>
              <Reveal delay={0.25} reduced={reduced}>
                <p style={{ fontFamily: "var(--body)", fontSize: "19px", color: "var(--text-dim)", lineHeight: 1.75 }}>
                  When I'm not designing in Figma, I'm sketching wireframes, curating playlists, or brainstorming ways to connect Austin's creative community through local businesses, art, and tech.
                </p>
              </Reveal>
            </div>

            {/* Stats column — asymmetric layout */}
            <Reveal delay={0.2} reduced={reduced}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {/* Hero stat — large */}
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "32px 24px", borderRadius: "4px 4px 0 0", borderLeft: "3px solid var(--accent)" }}>
                  <AnimatedStat val={stats[0].val} label={stats[0].label} reduced={reduced} variant="hero" />
                </div>
                {/* Secondary stats — compact row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px" }}>
                  {stats.slice(1).map((s) => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", padding: "8px 4px", borderRadius: "0" }}>
                      <AnimatedStat val={s.val} label={s.label} reduced={reduced} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TRANSITION / VELOCITY SCROLL divider ── */}
        {!isMobile && (
          <VelocityScroll 
            text1="Design & Data • Strategy & Vision • Brand & Product •" 
            text2="Digital Experiences • Human Centric • Creative Lead •" 
          />
        )}

        {/* ═══════════════════════════════════
           WORK
           ═══════════════════════════════════ */}
        <section id="work" aria-label="Work section" style={{ padding: "clamp(60px, 8vw, 80px) clamp(24px, 6vw, 80px)", maxWidth: "1100px", margin: "0 auto", background: "transparent", position: "relative", zIndex: 20 }}>
          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Selected Work</span>
          </Reveal>
          <Reveal delay={0.08} reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 0.95, marginTop: "16px", marginBottom: "48px" }}>
              Things I've Built{" "}
              <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>&</span>{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--accent), #E8453C)",
                backgroundSize: "200% 200%", animation: "gradShift 5s ease infinite",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Designed</span>
            </h2>
          </Reveal>

          {/* Unified Project Grid */}
          <ProjectGrid projects={[featured, ...projects]} reduced={reduced} />
        </section>

        {/* ── WORK-TIMELINE DIVIDER ── */}
        <Marquee items={projectMarqueeItems} speed={25} direction="right" separator="✦" />

        {/* ═══════════════════════════════════
           TIMELINE
           ═══════════════════════════════════ */}
        <RadialOrbitalTimeline reduced={reduced} />

        {/* ── TIMELINE-SKILLS DIVIDER ── */}
        <Marquee items={projectMarqueeItems} speed={35} direction="left" separator="✦" />

        {/* ═══════════════════════════════════
           SKILLS
           ═══════════════════════════════════ */}
        <section id="skills" aria-label="Skills section" style={{ padding: "clamp(60px, 8vw, 80px) 0", margin: "0", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(24px, 6vw, 80px)", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
              <Reveal reduced={reduced}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Skills & Tools</span>
              </Reveal>
              <Reveal delay={0.08} reduced={reduced}>
                <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 400, letterSpacing: "-0.5px", lineHeight: 1.2, marginTop: "16px", marginBottom: "16px", color: "var(--text-light)" }}>
                  What I Work With
                </h2>
              </Reveal>

              <DrawLine reduced={reduced} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "60px", alignItems: "start" }}>
                <div>
                  <div style={{ borderTop: "1px solid var(--border)", marginTop: "40px" }}>
                    {skillGroups.map((group, idx) => (
                      <SkillRow key={group.label} group={group} index={idx} reduced={reduced} />
                    ))}
                  </div>
                </div>

                <div style={{ position: "sticky", top: "100px" }}>
                  <Reveal reduced={reduced}>
                    <div style={{ position: "relative", height: "350px", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "auto", zIndex: 10 }}>
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
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "12px" }}>Relevant Coursework</span>
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

        {/* ── SKILLS-CONTACT DIVIDER ── */}
        <Marquee items={projectMarqueeItems} speed={30} direction="right" separator="✦" />

        {/* ═══════════════════════════════════
           CONTACT
           ═══════════════════════════════════ */}
        <section id="contact" aria-label="Contact section" style={{ padding: "clamp(60px, 8vw, 80px) clamp(24px, 6vw, 80px)", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ position: "absolute", top: 0, right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,107,53,0.04), transparent 65%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)" }}>Get In Touch</span>
          </Reveal>
          <Reveal delay={0.08} reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginTop: "16px", marginBottom: "20px", maxWidth: "600px" }}>
              Got an idea?{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--accent), #E8453C)",
                backgroundSize: "200% 200%", animation: "gradShift 5s ease infinite",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Let's talk.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14} reduced={reduced}>
            <p style={{ fontFamily: "var(--body)", fontSize: "16px", color: "var(--text-dim)", maxWidth: "440px", lineHeight: 1.6, marginBottom: "40px" }}>
              Whether it's a startup, brand, or creative project — I'm always excited to collaborate.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "12px", maxWidth: "660px" }}>
            {[
              { href: "mailto:rasikap@utexas.edu", icon: "📧", sub: "Email", text: "rasikap@utexas.edu" },
              { href: "https://www.linkedin.com/in/rasikapatel/", icon: "💼", sub: "LinkedIn", text: "linkedin.com/in/rasikapatel" },
              { href: "https://apps.apple.com/us/app/xplore-austin/id6758564187", icon: "🗺️", sub: "App Store", text: "Xplore Austin" },
              { href: "https://drive.google.com/file/d/1fO7V_1aJk_rOOg4imeVFxt0a1pfiQH0B/view?usp=sharing", icon: "📄", sub: "Resume", text: "View My Resume" },
            ].map((c, i) => (
              <Reveal key={c.sub} delay={0.18 + i * 0.05} reduced={reduced}>
                <a href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="contact-card" aria-label={`${c.sub}: ${c.text}`}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--accent-bg)", border: "1px solid var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "2px" }}>{c.sub}</div>
                    <div>{c.text}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      
      {/* ── FOOTER DIVIDER ── */}
      <Marquee items={projectMarqueeItems} speed={40} direction="left" separator="✦" />

      {/* FOOTER */}
      <Reveal reduced={reduced}>
        <footer style={{ padding: "28px clamp(24px, 6vw, 80px)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "var(--display)", fontSize: "15px", fontWeight: 800 }}>
              <span style={{ color: "var(--accent)" }}>R</span>P
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)" }}>© 2026 Rasika Patel</span>
          </div>
          <span style={{ fontFamily: "var(--body)", fontSize: "13px", color: "var(--text-dim)", opacity: 0.5 }}>
            Made with big ideas and too much coffee
          </span>
        </footer>
      </Reveal>
    </motion.div>
  );
}
