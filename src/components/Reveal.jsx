import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { revealVariants, revealVariantsReduced } from "../lib/animation";

export default function Reveal({ children, delay = 0, style = {}, reduced = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const variants = reduced ? revealVariantsReduced : revealVariants;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ ...variants.visible.transition, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
