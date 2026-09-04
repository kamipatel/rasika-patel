import { useEffect } from "react";

/**
 * React Router does not scroll to `#hash` targets on client-side navigation.
 * The target section may still be unmounted while AnimatePresence finishes its
 * exit transition, so poll for it for a short window before giving up.
 */
export function useHashScroll(hash) {
  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);
    const deadline = performance.now() + 1500;
    let frame;

    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (performance.now() < deadline) frame = requestAnimationFrame(attempt);
    };

    frame = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(frame);
  }, [hash]);
}
