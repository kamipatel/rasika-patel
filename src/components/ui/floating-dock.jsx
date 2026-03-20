import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-32 gap-8 items-end",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-200, 0, 200], [80, 140, 80]);
  let heightTransform = useTransform(distance, [-200, 0, 200], [80, 140, 80]);

  let widthTransformIcon = useTransform(distance, [-200, 0, 200], [40, 70, 40]);
  let heightTransformIcon = useTransform(distance, [-200, 0, 200], [40, 70, 40]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center relative cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50"
        whileHover={{ backgroundColor: "#231842", borderColor: "var(--accent)", boxShadow: "0 0 30px rgba(0,0,0,1)" }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              style={{ position: "absolute", left: "50%", top: "-64px" }}
              className="px-6 py-3 whitespace-pre rounded-xl border border-[var(--border)] bg-[#111111]/90 backdrop-blur-md text-[#e0e0e0] w-fit text-sm md:text-base font-bold uppercase tracking-widest font-mono shadow-2xl z-50 pointer-events-none"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-[var(--accent)]"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
