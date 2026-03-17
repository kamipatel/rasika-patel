import { useState, useEffect, useRef, useCallback } from "react";
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
import FeaturedCard from "./components/FeaturedCard";
import ProjectGrid from "./components/ProjectGrid";
import RadialOrbitalTimeline from "./components/RadialOrbitalTimeline";

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
  { label: "Design", items: ["Figma", "Canva", "Photoshop", "Illustrator", "InDesign"] },
  { label: "Marketing", items: ["Google Analytics", "SEO", "Meta Business Suite", "Salesforce", "Qualtrics"] },
  { label: "Code", items: ["Python", "Java", "HTML", "CSS"] },
  { label: "Creative", items: ["Branding", "Copywriting", "Content Strategy", "UI/UX Design"] },
  { label: "Leadership", items: ["Project Management", "Public Speaking", "Cross-Functional Collaboration"] },
];

const stats = [
  { val: "9+", label: "Projects" },
  { val: "121%", label: "Sales Growth" },
  { val: "100K+", label: "Organic Views" },
  { val: "27K+", label: "Students Reached" },
];

const skillsMarqueeItems = ["UI/UX", "Brand Strategy", "Figma", "Content Creation", "Startups", "Marketing", "Adobe Suite", "Python", "Creative Direction", "Growth"];
const projectMarqueeItems = [featured.title, ...projects.map((p) => p.title)];
const HERO_ROLES = ["Innovator", "Creative Strategist", "Marketer", "Builder", "Storyteller"];

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
        display: "grid", gridTemplateColumns: "140px 1fr", gap: "20px", alignItems: "baseline",
        padding: "20px 0", borderBottom: "1px solid var(--border)",
      }}
    >
      <span style={{
        fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "2px",
        textTransform: "uppercase", color: "var(--accent)", fontWeight: 700,
      }}>{group.label}</span>
      <motion.div
        style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
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
          : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: springConfig } }
      }
      whileHover={reduced ? undefined : { y: -2, backgroundColor: "var(--accent)", color: "var(--bg)", borderColor: "var(--accent)", transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      style={{
        display: "inline-block", padding: "8px 18px", borderRadius: "100px",
        fontFamily: "var(--body)", fontSize: "13px", fontWeight: 500,
        color: "var(--text-mid)",
        background: "var(--surface-hover)",
        border: "1px solid var(--border)",
        cursor: "default",
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

function AnimatedStat({ val, label, reduced }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");

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
    <div ref={ref} style={{ background: "var(--bg)", padding: "24px 20px", textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800,
        color: "var(--accent)", lineHeight: 1, marginBottom: "4px",
      }}>{display}</div>
      <div style={{
        fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "1.5px",
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

  const heroScrollRef = useRef(null);
  const getFramePath = useCallback((i) => `/sequence/frame_${String(i).padStart(3, '0')}.gif`, []);
  const { canvasRef, isLoaded } = useScrollSequence({
    frameCount: 128,
    framePath: getFramePath,
    scrollRef: heroScrollRef,
    enabled: !reduced && !isMobile,
  });

  useEffect(() => {
    if (isMobile) return;
    const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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
          background: "radial-gradient(circle, rgba(232,97,60,0.04), transparent 70%)",
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
          ref={heroScrollRef}
          aria-label="Hero section"
          style={{
            height: "400vh",
            position: "relative",
          }}
        >
          <div style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex", flexDirection: isMobile ? "column" : "row",
            overflow: "hidden",
          }}>
            {/* ── Left column: text content ── */}
            <div style={{
              flex: isMobile ? "1 1 auto" : "0 0 50%",
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "0 clamp(24px, 6vw, 80px)",
              position: "relative", zIndex: 5,
              order: isMobile ? 2 : 1,
            }}>
              {/* Tag */}
              <div style={{
                display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px",
                opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
              }}>
                <div style={{ width: "36px", height: "1.5px", background: "var(--accent)" }} />
                <span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>
                  Marketing · Design · Innovation
                </span>
              </div>

              {/* Name */}
              <div style={{ marginBottom: "32px" }}>
                <h1>
                  <div style={{ fontFamily: "var(--display)", fontSize: "clamp(52px, 11vw, 130px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-3px" }}>
                    <SplitReveal text="Rasika" baseDelay={0.5} charDelay={0.04} style={{ color: "var(--text-light)", display: "block" }} reduced={reduced} />
                  </div>
                  <div style={{ fontFamily: "var(--display)", fontSize: "clamp(52px, 11vw, 130px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-3px" }}>
                    <SplitReveal text="Patel." baseDelay={0.85} charDelay={0.04}
                      reduced={reduced}
                      style={{
                        display: "block",
                        background: "linear-gradient(135deg, #E8613C, #C2185B, #7C4DFF)",
                        backgroundSize: "200% 200%", animation: "gradShift 6s ease infinite",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}
                    />
                  </div>
                </h1>
              </div>

              {/* Rotating role titles */}
              <div style={{
                marginBottom: "24px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "all 1s cubic-bezier(0.22,1,0.36,1) 1.1s",
              }}>
                <RotatingTitle titles={HERO_ROLES} reduced={reduced} loaded={loaded} />
              </div>

              {/* Tagline */}
              <p style={{
                fontFamily: "var(--body)", fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 400,
                color: "var(--text-dim)", maxWidth: "500px", lineHeight: 1.65,
                opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s cubic-bezier(0.22,1,0.36,1) 1.2s",
              }}>
                Building at the intersection of{" "}
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>storytelling</span> and{" "}
                <span style={{ color: "#9C7BF2", fontWeight: 600 }}>systems</span> — turning good ideas into things people actually care about.
              </p>

              {/* CTAs */}
              <div style={{
                display: "flex", gap: "14px", marginTop: "40px", flexWrap: "wrap",
                opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "all 1s cubic-bezier(0.22,1,0.36,1) 1.4s",
              }}>
                <MagButton href="#work" filled>View My Work</MagButton>
                <MagButton href="#contact">Get in Touch</MagButton>
              </div>
            </div>

            {/* ── Right column: canvas ── */}
            <div style={{
              flex: isMobile ? "0 0 40vh" : "0 0 50%",
              position: "relative",
              order: isMobile ? 1 : 2,
            }}>
              <canvas
                ref={canvasRef}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
              {/* Left edge fade (desktop) */}
              {!isMobile && (
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to right, var(--bg) 0%, transparent 25%)",
                }} />
              )}
              {/* Bottom edge fade */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: isMobile
                  ? "linear-gradient(to top, var(--bg) 0%, transparent 30%)"
                  : "linear-gradient(to bottom, transparent 75%, var(--bg) 100%)",
              }} />
            </div>

            {/* Soft ambient gradient blobs */}
            <motion.div style={{
              position: "absolute", top: "-20%", left: isMobile ? "-10%" : "30%", width: "700px", height: "700px",
              background: "radial-gradient(circle, rgba(232,97,60,0.06), transparent 65%)",
              borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
              y: reduced ? 0 : heroBlob1Y, zIndex: 3,
            }} />
            <motion.div style={{
              position: "absolute", bottom: "-10%", left: "-5%", width: "500px", height: "500px",
              background: "radial-gradient(circle, rgba(150,90,220,0.04), transparent 65%)",
              borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
              y: reduced ? 0 : heroBlob2Y, zIndex: 3,
            }} />

            {/* Subtle grid — constrained to left half on desktop */}
            <div style={{
              position: "absolute", inset: 0,
              right: isMobile ? 0 : "50%",
              pointerEvents: "none",
              backgroundImage: "linear-gradient(var(--text-faint) 1px, transparent 1px), linear-gradient(90deg, var(--text-faint) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
              maskImage: "radial-gradient(ellipse at 40% 50%, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 40% 50%, black 30%, transparent 75%)",
              opacity: 0.2, zIndex: 3,
            }} />

            {/* Scroll cue */}
            <div style={{
              position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              opacity: loaded ? 0.3 : 0, transition: "opacity 1.5s ease 2s", zIndex: 5,
            }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-dim)" }}>Scroll</span>
              <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
            </div>
          </div>
        </section>

        {/* ── SKILLS MARQUEE ── */}
        <Marquee items={skillsMarqueeItems} speed={40} />

        {/* ═══════════════════════════════════
           ABOUT
           ═══════════════════════════════════ */}
        <section id="about" aria-label="About section" style={{ padding: "clamp(100px, 14vw, 180px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)", maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>About Me</span>
          </Reveal>

          <Reveal delay={0.1} reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-1px", marginTop: "20px", marginBottom: "32px", maxWidth: "780px" }}>
              A <span style={{ color: "var(--accent)" }}>Marketing</span> student at McCombs
              obsessed with <span style={{ color: "#9C7BF2" }}>UI/UX</span>, creative strategy,
              and building things that matter.
            </h2>
          </Reveal>

          <DrawLine reduced={reduced} />

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "60px", alignItems: "start", marginTop: "32px" }}>
            <div>
              <Reveal delay={0.2} reduced={reduced}>
                <p style={{ fontFamily: "var(--body)", fontSize: "16.5px", color: "var(--text-dim)", lineHeight: 1.75, marginBottom: "18px" }}>
                  I love finding the intersection between storytelling and systems — where a good idea turns into something people actually care about. From founding <strong style={{ color: "var(--text-light)", fontWeight: 600 }}>Xplore Austin</strong> to driving <strong style={{ color: "var(--accent)", fontWeight: 600 }}>100K+ organic views</strong> at Texas Momentum, I'm drawn to building and shipping real things.
                </p>
              </Reveal>
              <Reveal delay={0.25} reduced={reduced}>
                <p style={{ fontFamily: "var(--body)", fontSize: "16.5px", color: "var(--text-dim)", lineHeight: 1.75 }}>
                  When I'm not designing in Figma, I'm sketching wireframes, curating playlists, or brainstorming ways to connect Austin's creative community through local businesses, art, and tech.
                </p>
              </Reveal>
            </div>

            {/* Stats column */}
            <Reveal delay={0.2} reduced={reduced}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
                background: "var(--border)", borderRadius: "20px", overflow: "hidden",
              }}>
                {stats.map((s) => (
                  <AnimatedStat key={s.label} val={s.val} label={s.label} reduced={reduced} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PROJECT TITLE MARQUEE ── */}
        <Marquee items={projectMarqueeItems} speed={35} direction="right" separator="✦" />

        {/* ═══════════════════════════════════
           WORK
           ═══════════════════════════════════ */}
        <section id="work" aria-label="Work section" style={{ padding: "clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) clamp(100px, 14vw, 180px)", maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Selected Work</span>
          </Reveal>
          <Reveal delay={0.08} reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginTop: "16px", marginBottom: "48px" }}>
              Things I've Built{" "}
              <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>&</span>{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--accent), #9C7BF2)",
                backgroundSize: "200% 200%", animation: "gradShift 5s ease infinite",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Designed</span>
            </h2>
          </Reveal>

          {/* Featured project — full-width card */}
          <FeaturedCard reduced={reduced} />

          {/* Project grid */}
          <ProjectGrid projects={projects} reduced={reduced} />
        </section>

        {/* ═══════════════════════════════════
           TIMELINE
           ═══════════════════════════════════ */}
        <RadialOrbitalTimeline reduced={reduced} />

        {/* ═══════════════════════════════════
           SKILLS
           ═══════════════════════════════════ */}
        <section id="skills" aria-label="Skills section" style={{ padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)", maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Skills & Tools</span>
          </Reveal>
          <Reveal delay={0.08} reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginTop: "16px", marginBottom: "48px" }}>
              What I Work With
            </h2>
          </Reveal>

          <DrawLine reduced={reduced} />

          <div>
            {skillGroups.map((g, i) => <SkillRow key={g.label} group={g} index={i} reduced={reduced} />)}
          </div>

          <Reveal delay={0.2} reduced={reduced}>
            <div style={{ marginTop: "48px", padding: "24px 28px", borderRadius: "16px", background: "var(--card)", border: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "14px" }}>Relevant Coursework</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Software Design (Python)", "Decision Science (Excel)", "Management Info Systems", "Design Thinking (Figma)", "Business Statistics (R)"].map((c) => (
                  <span key={c} style={{ fontFamily: "var(--body)", fontSize: "13px", color: "var(--text-dim)", background: "var(--surface-hover)", padding: "5px 14px", borderRadius: "8px", border: "1px solid var(--border)" }}>{c}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════
           CONTACT
           ═══════════════════════════════════ */}
        <section id="contact" aria-label="Contact section" style={{ padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)", maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(232,97,60,0.04), transparent 65%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

          <Reveal reduced={reduced}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Get in Touch</span>
          </Reveal>
          <Reveal delay={0.08} reduced={reduced}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginTop: "16px", marginBottom: "20px", maxWidth: "600px" }}>
              Got an idea?{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--accent), #9C7BF2)",
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
              { href: "https://drive.google.com/file/d/1rZiUMhDQ_2CpptJT8SHn5CspbwN1Rz4g/view", icon: "📄", sub: "Resume", text: "View My Resume" },
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
