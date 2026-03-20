import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import Portfolio from "./Portfolio";
import ProjectPage from "./components/ProjectPage";
import PortfolioNav from "./components/PortfolioNav";
import CustomCursor from "./components/CustomCursor";

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

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [preloaderDone, setPreloaderDone] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("hero");
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReduced = useReducedMotion();

  // Theme effect
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active nav section tracking
  useEffect(() => {
    const ids = ["hero", "about", "work", "skills", "contact"];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        }),
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location, preloaderDone]);


  return (
    <div style={{ background: "var(--bg)", color: "var(--text-light)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Custom cursor — desktop only */}
      {!isMobile && <CustomCursor />}

      {/* Nav */}
      <PortfolioNav activeNav={activeNav} />

      {/* Routes with page transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Portfolio
                loaded={preloaderDone || !!prefersReduced}
                theme={theme}
              />
            }
          />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
