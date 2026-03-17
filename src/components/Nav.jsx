import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ scrollY, loaded, activeNav, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener("scroll", close, { passive: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // After navigation, scroll to section
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header>
        <nav
          aria-label="Main navigation"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "14px clamp(20px, 4vw, 48px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: scrollY > 80 ? "rgba(11,11,15,0.92)" : "transparent",
            backdropFilter: scrollY > 80 ? "blur(24px) saturate(180%)" : "none",
            borderBottom: scrollY > 80 ? "1px solid var(--border)" : "1px solid transparent",
            transition: "all 0.5s ease",
          }}
        >
          <a
            href="#hero"
            onClick={handleLogoClick}
            aria-label="Go to top"
            style={{
              textDecoration: "none",
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: "20px",
              color: "var(--text-light)",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
            }}
          >
            <span style={{ color: "var(--accent)" }}>R</span>P
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent)",
                marginLeft: "3px",
                marginBottom: "10px",
              }}
            />
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="nav-links"
              style={{
                display: "flex",
                gap: "6px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(-12px)",
                transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
              }}
            >
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => handleNavClick(e, n.id)}
                  className={`nav-pill ${activeNav === n.id ? "active" : "inactive"}`}
                  aria-label={`Navigate to ${n.label} section`}
                >
                  {n.label}
                </a>
              ))}
            </div>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.8s ease 0.5s, background 0.3s, border-color 0.3s",
              }}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleNavClick(e, n.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                {n.label}
              </motion.a>
            ))}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{ marginTop: "16px", width: "48px", height: "48px", fontSize: "20px" }}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
