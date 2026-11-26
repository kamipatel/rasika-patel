import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* A thermal order ticket that prints a line as each section is reached. Skim layer for recruiters. */
const INK = "#17301F";
const LINES = [
  { id: "about", qty: "1", item: "Product marketer who builds with AI", note: "About" },
  { id: "work", qty: "1", item: "Xplore Austin, founder", note: "700+ downloads" },
  { id: "skills", qty: "1", item: "Skills, your pick", note: "Build your order" },
  { id: "contact", qty: "", item: "TOTAL: Summer 2027 internship", note: "Open to offers" },
];

export default function LiveTicket({ isMobile }) {
  const reduced = !!useReducedMotion();
  const [seen, setSeen] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let n = 0;
      LINES.forEach((l, i) => {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55) n = i + 1;
      });
      setSeen(n);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (seen === 0) return null;
  const shown = LINES.slice(0, seen);
  const last = shown[shown.length - 1];
  const expanded = open;

  return (
    <aside aria-label="Order ticket: a running summary of this page" style={{
      position: "fixed", zIndex: 50, right: isMobile ? 10 : 20, bottom: isMobile ? 10 : 20,
      width: isMobile ? "calc(100vw - 20px)" : 270, background: "#FBFDF4", color: INK,
      border: `2px solid ${INK}`, borderRadius: 14, boxShadow: `5px 5px 0 ${INK}`, fontFamily: "var(--mono)", fontSize: 12,
    }}>
      <style>{`
        @keyframes lt-print { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
        .lt-line { animation: lt-print .45s steps(6, end) both; }
        @media (prefers-reduced-motion: reduce) { .lt-line { animation: none; } }
      `}</style>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={expanded}
        style={{ all: "unset", boxSizing: "border-box", width: "100%", minHeight: 44, padding: "8px 14px", display: "flex",
          justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", fontSize: 11 }}>
        <span>Order #{String(seen).padStart(2, "0")}</span>
        {!expanded ? <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0, marginLeft: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "right" }}>{last.item}</span> : <span>{expanded ? "−" : "+"}</span>}
      </button>
      {expanded && (
        <ul style={{ listStyle: "none", margin: 0, padding: "2px 14px 12px", borderTop: `1.5px dashed ${INK}` }}>
          {shown.map((l) => (
            <li key={l.id} className={reduced ? "" : "lt-line"} style={{ padding: "8px 0", borderBottom: `1px dotted rgba(23,48,31,.35)`, lineHeight: 1.35 }}>
              <div style={{ fontWeight: 700 }}>{l.qty ? `${l.qty}× ` : ""}{l.item}</div>
              <div style={{ opacity: 0.8 }}>{l.note}</div>
            </li>
          ))}
          {seen === LINES.length && (
            <li style={{ paddingTop: 10 }}>
              <a href="#contact" style={{ color: INK, fontWeight: 700 }}>Order ready: say hello →</a>
            </li>
          )}
        </ul>
      )}
    </aside>
  );
}
