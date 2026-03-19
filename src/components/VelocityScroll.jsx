import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue
} from "framer-motion";
import { wrap } from "framer-motion";

export function VelocityText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div style={{ overflow: "hidden", letterSpacing: "-0.5px", lineHeight: "1.1", margin: 0, whiteSpace: "nowrap", display: "flex", flexWrap: "nowrap" }}>
      <motion.div style={{ x, fontSize: "clamp(24px, 6vw, 42px)", fontWeight: 800, textTransform: "uppercase", display: "flex", whiteSpace: "nowrap", flexWrap: "nowrap" }}>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
      </motion.div>
    </div>
  );
}

export default function VelocityScroll({ text1, text2 }) {
    return (
        <section style={{ position: "relative", padding: "12px 0", overflow: "hidden" }}>
            <VelocityText baseVelocity={-1}>{text1}</VelocityText>
            <VelocityText baseVelocity={1}>{text2}</VelocityText>
        </section>
    );
}
