import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RotatingTitle({ titles, reduced = false, loaded = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!loaded || reduced) return;
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [currentIndex, titles.length, loaded, reduced]);

  if (reduced) {
    return (
      <span style={{
        fontFamily: "var(--display)",
        fontSize: "clamp(24px, 3.5vw, 40px)",
        fontWeight: 700,
        background: "linear-gradient(135deg, #FF6B35, #E8453C, #FF9F1C)",
        backgroundSize: "200% 200%",
        animation: "gradShift 6s ease infinite",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        {titles[0]}
      </span>
    );
  }

  return (
    <span style={{
      position: "relative",
      display: "flex",
      justifyContent: "center", // Center text within the flexing container
      overflow: "hidden",
      height: "clamp(32px, 4.5vw, 52px)",
      alignItems: "center",
      width: "100%", // Explicit full width to help centering
    }}>
      {/* Invisible spacer for widest title */}
      <span style={{ 
        visibility: "hidden", 
        fontFamily: "var(--display)", 
        fontSize: "clamp(24px, 3.5vw, 40px)", 
        fontWeight: 700,
        textAlign: "center"
      }}>
        {titles.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      {titles.map((title, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 40, x: "-50%" }}
          animate={
            currentIndex === index
              ? { y: 0, opacity: 1, x: "-50%" }
              : { y: currentIndex > index ? -40 : 40, opacity: 0, x: "-50%" }
          }
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          style={{
            position: "absolute",
            left: "50%", // Anchor to absolute center
            fontFamily: "var(--display)",
            fontSize: "clamp(24px, 3.5vw, 40px)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #FF6B35, #E8453C, #FF9F1C)",
            backgroundSize: "200% 200%",
            animation: "gradShift 6s ease infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {title}
        </motion.span>
      ))}
    </span>
  );
}
