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
 * Counts up to `value` once it scrolls into view. Falls back to the final
 * value immediately when the visitor prefers reduced motion, or when the
 * string has no number to animate.
 */
export default function CountUp({ value, className, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!isInView) return undefined;
    if (!parsed || prefersReduced) {
      setDisplay(value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (parsed.target * eased).toFixed(parsed.decimals);
      setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // `parsed` is derived from `value`; tracking value alone avoids re-running
    // on every render from the fresh object identity.
  }, [isInView, prefersReduced, value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
