import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagButton({ children, href, filled = false, onClick }) {
  const ref = useRef(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOff({
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.25,
    });
  };
  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setHov(false);
        setOff({ x: 0, y: 0 });
      }}
      onMouseMove={move}
      whileTap={{ scale: 0.98 }}
      aria-label={typeof children === "string" ? children : undefined}
      className="clickable"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
        fontFamily: "var(--mono)",
        fontSize: "12px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        fontWeight: 700,
        color: filled ? "var(--bg)" : "var(--text-mid)",
        background: filled ? "var(--accent)" : "transparent",
        border: filled ? "none" : "1.5px solid var(--border)",
        padding: "15px 32px",
        borderRadius: "4px",
        transform: `translate(${off.x}px, ${off.y}px) scale(${hov ? 1.04 : 1})`,
        transition: hov
          ? "transform 0.12s ease"
          : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: filled && hov ? "0 0 40px var(--accent-glow)" : "none",
      }}
    >
      {children}
    </motion.a>
  );
}
