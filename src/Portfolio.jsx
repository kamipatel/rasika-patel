import { useState, useEffect, useRef } from "react";

/* ─── hooks ─── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

/* ─── data ─── */
const featured = {
  title: "Xplore Austin",
  role: "Founder & UX Designer",
  tags: ["Startup", "UI/UX", "Branding", "App Store"],
  desc: "A student-driven mobile app connecting 27K+ UT Austin students to small and student-run businesses through curated lists, peer recommendations, and exclusive deals. Available on the App Store.",
  link: "https://apps.apple.com/us/app/xplore-austin/id6758564187",
  impact: "27K+ students reached",
  timeline: "Jan 2025 – Present",
  num: "01",
};

const projects = [
  { title: "Texas Momentum", role: "VP of Marketing", tags: ["Brand Strategy", "Content", "Community"], desc: "Leading creative + marketing for 70+ student founders. Designed campaigns, merch, and event branding that hit 100K+ organic views.", link: "https://www.instagram.com/txmomentum/", impact: "100K+ views", timeline: "Spring 2025 – Present", num: "02" },
  { title: "HerdUp", role: "UX/UI Designer", tags: ["Mobile", "Figma", "Wireframes"], desc: "High-fidelity mobile wireframes for a UT platform connecting students to organizations through personalized discovery and filtering.", link: null, impact: "Full prototype", timeline: "Jan 2025 – Present", num: "03" },
  { title: "SELL Fellowship", role: "Creative Lead", tags: ["Creative Direction", "Brand Systems"], desc: "Owning visual and creative direction for a student-led social entrepreneurship fellowship — social, web, print, and merch.", link: "https://www.instagram.com/sellfellowship/", impact: "Full brand ownership", timeline: "Spring 2026 – Present", num: "04" },
  { title: "Center for Integrated Design", role: "Design & Marketing Assistant", tags: ["Graphic Design", "Adobe Suite"], desc: "Visual campaigns promoting UT's CID courses and events — T-shirts, flyers, posters, stickers, and Instagram content.", link: null, impact: "Campus-wide reach", timeline: "Oct 2025 – Present", num: "05" },
  { title: "Well Water Finders", role: "UX Designer — Texas Convergent", tags: ["UI/UX", "Data Viz", "Consulting"], desc: "Full UI flow for a groundwater startup — reducing client testing costs by $9,000 per drill through clearer decision-making.", link: null, impact: "$9K saved / drill", timeline: "Fall 2024", num: "06" },
  { title: "Cultured Carrot", role: "Marketing Manager", tags: ["Rebrand", "Small Business", "Growth"], desc: "Full rebrand and marketing strategy for an Austin small business — increasing sales by 121% with 200+ repeat customers.", link: null, impact: "121% sales growth", timeline: "2022 – 2025", num: "07" },
];

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

/* ─── components ─── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(48px)",
      transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function SplitReveal({ text, style = {}, charDelay = 0.035, baseDelay = 0 }) {
  const [ref, vis] = useInView(0.1);
  return (
    <span ref={ref} style={{ display: "inline-block", ...style }}>
      {text.split("").map((c, i) => (
        <span key={i} style={{
          display: "inline-block",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(105%)",
          transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${baseDelay + i * charDelay}s`,
          whiteSpace: c === " " ? "pre" : "normal",
        }}>{c === " " ? "\u00A0" : c}</span>
      ))}
    </span>
  );
}

function MagButton({ children, href, filled = false }) {
  const ref = useRef(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOff({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  };
  return (
    <a ref={ref} href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setOff({ x: 0, y: 0 }); }}
      onMouseMove={move}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        textDecoration: "none",
        fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700,
        color: filled ? "var(--bg)" : "var(--text-mid)",
        background: filled ? "var(--accent)" : "transparent",
        border: filled ? "none" : "1.5px solid var(--border)",
        padding: "15px 32px", borderRadius: "100px",
        transform: `translate(${off.x}px, ${off.y}px) scale(${hov ? 1.04 : 1})`,
        transition: hov ? "transform 0.12s ease" : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: filled && hov ? "0 0 40px var(--accent-glow)" : "none",
      }}
    >{children}</a>
  );
}

function FeaturedCard() {
  const [ref, vis] = useInView(0.08);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(60px)",
      transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
    }}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onClick={() => window.open(featured.link, "_blank")}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0",
          borderRadius: "24px", overflow: "hidden", cursor: "pointer",
          border: `1px solid ${hov ? "var(--accent-dim)" : "var(--border)"}`,
          background: "var(--card)",
          transform: hov ? "scale(1.008)" : "scale(1)",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Left — gradient panel */}
        <div style={{
          background: "linear-gradient(160deg, var(--accent), #C2185B)",
          padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between",
          minHeight: "360px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.12,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
          <div>
            <span style={{
              fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "2px",
              background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)",
              padding: "5px 14px", borderRadius: "100px", color: "#fff",
            }}>FEATURED PROJECT</span>
          </div>
          <div>
            <div style={{
              fontFamily: "var(--display)", fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: "12px",
            }}>{featured.title}</div>
            <div style={{
              fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.5px",
            }}>{featured.role}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", color: "#fff",
              transform: hov ? "translate(2px, -2px)" : "translate(0,0)",
              transition: "transform 0.3s ease",
            }}>↗</div>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "1px" }}>VIEW ON APP STORE</span>
          </div>
        </div>

        {/* Right — info panel */}
        <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            fontFamily: "var(--display)", fontSize: "72px", fontWeight: 800,
            color: "var(--accent)", opacity: 0.12, lineHeight: 1, marginBottom: "4px",
          }}>{featured.num}</div>
          <p style={{ fontFamily: "var(--body)", fontSize: "16px", color: "var(--text-dim)", lineHeight: 1.7, marginBottom: "24px" }}>
            {featured.desc}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, color: "var(--accent)" }}>{featured.impact.split(" ")[0]}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "1px", alignSelf: "center" }}>{featured.impact.split(" ").slice(1).join(" ").toUpperCase()}</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {featured.tags.map((t) => (
              <span key={t} style={{
                fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
                border: "1px solid var(--border)", padding: "4px 12px", borderRadius: "100px",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, index }) {
  const [ref, vis] = useInView(0.06);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)",
      transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s`,
    }}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onClick={() => project.link && window.open(project.link, "_blank")}
        style={{
          display: "grid", gridTemplateColumns: "60px 1fr auto",
          alignItems: "start", gap: "24px",
          padding: "32px 0",
          borderBottom: "1px solid var(--border)",
          cursor: project.link ? "pointer" : "default",
          transition: "all 0.35s ease",
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: "var(--display)", fontSize: "36px", fontWeight: 800,
          color: hov ? "var(--accent)" : "rgba(255,255,255,0.06)",
          lineHeight: 1, transition: "color 0.4s ease", paddingTop: "4px",
        }}>{project.num}</span>

        {/* Info */}
        <div style={{
          transform: hov ? "translateX(8px)" : "translateX(0)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "6px" }}>
            <h3 style={{
              fontFamily: "var(--display)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700,
              color: hov ? "#fff" : "var(--text-light)", lineHeight: 1.15, transition: "color 0.3s ease",
            }}>{project.title}</h3>
            <span style={{
              fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
              letterSpacing: "0.5px",
            }}>— {project.role}</span>
          </div>
          <p style={{
            fontFamily: "var(--body)", fontSize: "14.5px", color: "var(--text-dim)",
            lineHeight: 1.65, maxWidth: "580px", marginBottom: "12px",
          }}>{project.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 700,
              color: "var(--accent)", background: "var(--accent-bg)",
              padding: "3px 10px", borderRadius: "100px", letterSpacing: "0.5px",
            }}>{project.impact}</span>
            {project.tags.map((t) => (
              <span key={t} style={{
                fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.05)", padding: "3px 10px", borderRadius: "100px",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Arrow / Timeline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", paddingTop: "6px" }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "0.5px",
          }}>{project.timeline}</span>
          {project.link && (
            <span style={{
              fontSize: "18px", color: "var(--accent)",
              opacity: hov ? 1 : 0, transform: hov ? "translate(0,0)" : "translate(-6px,6px)",
              transition: "all 0.3s ease",
            }}>↗</span>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillRow({ group, index }) {
  const [ref, vis] = useInView(0.08);
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "140px 1fr", gap: "20px", alignItems: "baseline",
      padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.03)",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s`,
    }}>
      <span style={{
        fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "2px",
        textTransform: "uppercase", color: "var(--accent)", fontWeight: 700,
      }}>{group.label}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {group.items.map((s, si) => (
          <SkillChip key={s} name={s} delay={si * 0.04} />
        ))}
      </div>
    </div>
  );
}

function SkillChip({ name, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block", padding: "8px 18px", borderRadius: "100px",
        fontFamily: "var(--body)", fontSize: "13px", fontWeight: 500,
        color: hov ? "var(--bg)" : "var(--text-mid)",
        background: hov ? "var(--accent)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "var(--accent)" : "var(--border)"}`,
        cursor: "default",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >{name}</span>
  );
}

/* ─── main ─── */
export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); };
  }, []);

  useEffect(() => {
    const ids = ["hero", "about", "work", "skills", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); }),
      { threshold: 0.25 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const nav = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div style={{ background: "var(--bg)", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --bg: #0B0B0F;
          --card: rgba(255,255,255,0.025);
          --border: rgba(255,255,255,0.06);
          --accent: #E8613C;
          --accent-dim: rgba(232,97,60,0.35);
          --accent-bg: rgba(232,97,60,0.1);
          --accent-glow: rgba(232,97,60,0.25);
          --text-light: rgba(255,255,255,0.88);
          --text-mid: rgba(255,255,255,0.55);
          --text-dim: rgba(255,255,255,0.35);
          --display: 'Bricolage Grotesque', sans-serif;
          --body: 'Outfit', sans-serif;
          --mono: 'IBM Plex Mono', monospace;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); overflow-x: hidden; }
        ::selection { background: var(--accent); color: var(--bg); }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(7%, -15%); }
          50% { transform: translate(-15%, 10%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }

        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-pill {
          text-decoration: none; font-family: var(--mono); font-size: 11px;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 7px 14px; border-radius: 100px;
          transition: all 0.3s ease; cursor: pointer;
        }
        .nav-pill.active { color: var(--accent); background: var(--accent-bg); border: 1px solid var(--accent-dim); }
        .nav-pill.inactive { color: var(--text-dim); background: transparent; border: 1px solid transparent; }
        .nav-pill.inactive:hover { color: var(--text-mid); }

        .contact-card {
          display: flex; align-items: center; gap: 16px;
          padding: 22px 24px; border-radius: 18px;
          background: var(--card); border: 1px solid var(--border);
          text-decoration: none; color: var(--text-mid);
          font-family: var(--body); font-size: 16px; font-weight: 500;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .contact-card:hover {
          background: var(--accent-bg); border-color: var(--accent-dim);
          color: var(--accent); transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(232,97,60,0.08);
        }
      `}</style>

      {/* grain overlay */}
      <div style={{
        position: "fixed", inset: "-50%", width: "200%", height: "200%",
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        pointerEvents: "none", zIndex: 9999, animation: "grain 5s steps(6) infinite", opacity: 0.55,
      }} />

      {/* subtle cursor glow */}
      <div style={{
        position: "fixed", left: mouse.x - 250, top: mouse.y - 250,
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(232,97,60,0.04), transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 1,
        transition: "left 0.6s cubic-bezier(0.22,1,0.36,1), top 0.6s cubic-bezier(0.22,1,0.36,1)",
        filter: "blur(20px)",
      }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px clamp(20px, 4vw, 48px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 80 ? "rgba(11,11,15,0.92)" : "transparent",
        backdropFilter: scrollY > 80 ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrollY > 80 ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.5s ease",
      }}>
        <a href="#hero" style={{
          textDecoration: "none",
          fontFamily: "var(--display)", fontWeight: 800, fontSize: "20px",
          color: "#fff", display: "flex", alignItems: "center", gap: "2px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(-20px)",
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}>
          <span style={{ color: "var(--accent)" }}>R</span>P
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", marginLeft: "3px", marginBottom: "10px" }} />
        </a>
        <div style={{
          display: "flex", gap: "6px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-12px)",
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
        }}>
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}
              className={`nav-pill ${activeNav === n.id ? "active" : "inactive"}`}
            >{n.label}</a>
          ))}
        </div>
      </nav>

      {/* ═══════════════════════════════════
         HERO
         ═══════════════════════════════════ */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 clamp(24px, 6vw, 80px)", position: "relative", overflow: "hidden",
      }}>
        {/* Soft ambient gradient */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%", width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(232,97,60,0.06), transparent 65%)",
          borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-5%", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(150,90,220,0.04), transparent 65%)",
          borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          maskImage: "radial-gradient(ellipse at 40% 50%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 40% 50%, black 30%, transparent 75%)",
        }} />

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
        <div style={{ position: "relative", zIndex: 5, marginBottom: "32px" }}>
          <div style={{ fontFamily: "var(--display)", fontSize: "clamp(52px, 11vw, 130px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-3px" }}>
            <SplitReveal text="Rasika" baseDelay={0.5} charDelay={0.04} style={{ color: "#fff", display: "block" }} />
          </div>
          <div style={{ fontFamily: "var(--display)", fontSize: "clamp(52px, 11vw, 130px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-3px" }}>
            <SplitReveal text="Patel." baseDelay={0.85} charDelay={0.04}
              style={{
                display: "block",
                background: "linear-gradient(135deg, #E8613C, #C2185B, #7C4DFF)",
                backgroundSize: "200% 200%", animation: "gradShift 6s ease infinite",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            />
          </div>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "var(--body)", fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 400,
          color: "var(--text-dim)", maxWidth: "500px", lineHeight: 1.65,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.22,1,0.36,1) 1.2s", position: "relative", zIndex: 5,
        }}>
          Building at the intersection of{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>storytelling</span> and{" "}
          <span style={{ color: "#9C7BF2", fontWeight: 600 }}>systems</span> — turning good ideas into things people actually care about.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "14px", marginTop: "40px", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.22,1,0.36,1) 1.4s", position: "relative", zIndex: 5,
        }}>
          <MagButton href="#work" filled>View My Work</MagButton>
          <MagButton href="#contact">Get in Touch</MagButton>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          opacity: loaded ? 0.3 : 0, transition: "opacity 1.5s ease 2s",
        }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden", padding: "16px 0" }}>
        <div style={{ display: "flex", animation: "marquee 40s linear infinite", width: "fit-content" }}>
          {[0, 1].map((d) => (
            <div key={d} style={{ display: "flex", alignItems: "center", gap: "24px", paddingRight: "24px" }}>
              {["UI/UX", "Brand Strategy", "Figma", "Content Creation", "Startups", "Marketing", "Adobe Suite", "Python", "Creative Direction", "Growth"].map((w) => (
                <span key={w + d} style={{ fontFamily: "var(--display)", fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.07)", whiteSpace: "nowrap" }}>
                  {w}<span style={{ color: "var(--accent)", opacity: 0.3, margin: "0 12px", fontSize: "8px" }}>●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
         ABOUT
         ═══════════════════════════════════ */}
      <section id="about" style={{ padding: "clamp(100px, 14vw, 180px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>About Me</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-1px", marginTop: "20px", marginBottom: "32px", maxWidth: "780px" }}>
            A <span style={{ color: "var(--accent)" }}>Marketing</span> student at McCombs
            obsessed with <span style={{ color: "#9C7BF2" }}>UI/UX</span>, creative strategy,
            and building things that matter.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "60px", alignItems: "start" }}>
          <div>
            <Reveal delay={0.2}>
              <p style={{ fontFamily: "var(--body)", fontSize: "16.5px", color: "var(--text-dim)", lineHeight: 1.75, marginBottom: "18px" }}>
                I love finding the intersection between storytelling and systems — where a good idea turns into something people actually care about. From founding <strong style={{ color: "var(--text-light)", fontWeight: 600 }}>Xplore Austin</strong> to driving <strong style={{ color: "var(--accent)", fontWeight: 600 }}>100K+ organic views</strong> at Texas Momentum, I'm drawn to building and shipping real things.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p style={{ fontFamily: "var(--body)", fontSize: "16.5px", color: "var(--text-dim)", lineHeight: 1.75 }}>
                When I'm not designing in Figma, I'm sketching wireframes, curating playlists, or brainstorming ways to connect Austin's creative community through local businesses, art, and tech.
              </p>
            </Reveal>
          </div>

          {/* Stats column */}
          <Reveal delay={0.2}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
              background: "var(--border)", borderRadius: "20px", overflow: "hidden",
            }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  background: "var(--bg)", padding: "24px 20px", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: "28px", fontWeight: 800, color: "var(--accent)", lineHeight: 1, marginBottom: "4px" }}>{s.val}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-dim)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════
         WORK
         ═══════════════════════════════════ */}
      <section id="work" style={{ padding: "clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) clamp(100px, 14vw, 180px)", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Selected Work</span>
        </Reveal>
        <Reveal delay={0.08}>
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
        <FeaturedCard />

        {/* Remaining projects — editorial list */}
        <div style={{ marginTop: "12px", borderTop: "1px solid var(--border)" }}>
          {projects.map((p, i) => <ProjectRow key={p.title} project={p} index={i} />)}
        </div>
      </section>

      {/* ═══════════════════════════════════
         SKILLS
         ═══════════════════════════════════ */}
      <section id="skills" style={{ padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Skills & Tools</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginTop: "16px", marginBottom: "48px" }}>
            What I Work With
          </h2>
        </Reveal>

        <div>
          {skillGroups.map((g, i) => <SkillRow key={g.label} group={g} index={i} />)}
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginTop: "48px", padding: "24px 28px", borderRadius: "16px", background: "var(--card)", border: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: "14px" }}>Relevant Coursework</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Software Design (Python)", "Decision Science (Excel)", "Management Info Systems", "Design Thinking (Figma)", "Business Statistics (R)"].map((c) => (
                <span key={c} style={{ fontFamily: "var(--body)", fontSize: "13px", color: "var(--text-dim)", background: "rgba(255,255,255,0.03)", padding: "5px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)" }}>{c}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════
         CONTACT
         ═══════════════════════════════════ */}
      <section id="contact" style={{ padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)", maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(232,97,60,0.04), transparent 65%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

        <Reveal>
          <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent)" }}>Get in Touch</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginTop: "16px", marginBottom: "20px", maxWidth: "600px" }}>
            Got an idea?{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--accent), #9C7BF2)",
              backgroundSize: "200% 200%", animation: "gradShift 5s ease infinite",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Let's talk.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
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
            <Reveal key={c.sub} delay={0.18 + i * 0.05}>
              <a href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} className="contact-card">
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

      {/* FOOTER */}
      <footer style={{ padding: "28px clamp(24px, 6vw, 80px)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "var(--display)", fontSize: "15px", fontWeight: 800 }}>
            <span style={{ color: "var(--accent)" }}>R</span>P
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)" }}>© 2026 Rasika Patel</span>
        </div>
        <span style={{ fontFamily: "var(--body)", fontSize: "13px", color: "rgba(255,255,255,0.18)" }}>
          Made with big ideas and too much coffee ☕
        </span>
      </footer>
    </div>
  );
}
