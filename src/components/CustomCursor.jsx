import { useState, useEffect } from "react";
import { useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const springX = useSpring(pos.x, { stiffness: 150, damping: 20 });
  const springY = useSpring(pos.y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const over = (e) => {
      if (e.target.closest("a, button, [role='button'], .clickable")) {
        setHovered(true);
      }
    };
    const out = (e) => {
      if (e.target.closest("a, button, [role='button'], .clickable")) {
        setHovered(false);
      }
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible]);

  // Update spring targets
  useEffect(() => {
    springX.set(pos.x);
    springY.set(pos.y);
  }, [pos, springX, springY]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot — follows exactly */}
      <div
        style={{
          position: "fixed",
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--text-light)",
          pointerEvents: "none",
          zIndex: 10001,
          transition: "background 0.3s",
        }}
      />
      {/* Outer circle — follows with spring delay */}
      <motion.div
        style={{
          position: "fixed",
          left: springX,
          top: springY,
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          x: hovered ? -24 : -16,
          y: hovered ? -24 : -16,
          borderRadius: "50%",
          border: `1.5px solid ${hovered ? "var(--accent)" : "var(--text-mid)"}`,
          pointerEvents: "none",
          zIndex: 10001,
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
        }}
      />
    </>
  );
}
