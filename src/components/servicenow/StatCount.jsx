import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const DURATION_MS = 1200;

/*
 * Counts up to a whole-number `value` as it scrolls in. Unlike the shared
 * CountUp, which starts at 0, the real number is the text in the DOM before
 * and after the animation, so text extraction, reduced-motion visitors, and
 * anyone who never scrolls this far all read the true figure. The trigger
 * fires a little before the number reaches the screen, so the reset to 0
 * happens out of view.
 */
export default function StatCount({ value, className }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px 120px 0px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const target = Number(value);
    if (!inView || reduced || !Number.isInteger(target)) return undefined;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / DURATION_MS, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(String(Math.round(target * eased)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
  }, [inView, reduced, value]);

  return <span ref={ref} className={className}>{display}</span>;
}
