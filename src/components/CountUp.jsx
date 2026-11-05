import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const DURATION_MS = 1400;

/**
 * Split "200K+" into its numeric core and the text around it, so the number
 * can animate while the prefix/suffix stay put.
 */
function parseValue(value) {
  const match = value.match(/[\d.]+/);
  if (!match) return null;
  const start = value.indexOf(match[0]);
  return {
    target: parseFloat(match[0]),
    prefix: value.slice(0, start),
    suffix: value.slice(start + match[0].length),
    decimals: match[0].includes(".") ? match[0].split(".")[1].length : 0,
  };
}

/**
 * Counts up to `value` as it scrolls in. The real value is the DOM text before
 * and after the animation, so text extraction, reduced-motion visitors, and
 * anyone who never scrolls this far all read the true figure. The trigger
 * fires a little before the number reaches the screen, so the reset to 0
 * happens out of view.
 */
export default function CountUp({ value, className, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 120px 0px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseValue(value);
    if (!isInView || !parsed || prefersReduced) return undefined;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / DURATION_MS, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (parsed.target * eased).toFixed(parsed.decimals);
      setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
  }, [isInView, prefersReduced, value]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
