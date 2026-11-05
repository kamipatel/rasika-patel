import { motion } from "framer-motion";

/*
 * Visual A: seven sourcing channels converging on one system. Desktop runs
 * left to right; below 900px the same wires run top to bottom. Wires draw in
 * on scroll unless the visitor prefers reduced motion.
 */

/* Desktop chip geometry. The wire SVG uses the same numbers so every wire
   starts at the middle of its chip. */
const CHIP_H = 48;
const CHIP_GAP = 10;
const WIRE_W = 160;

const CSS = `
.sn-ch { display: grid; grid-template-columns: minmax(0, 1fr); }
.sn-ch-sources { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${CHIP_GAP}px; }
.sn-ch-source { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: ${CHIP_H}px; padding: 8px 14px; border: 1px solid var(--accent-dim); border-radius: 12px; background: var(--accent-bg); color: var(--text-light); font-family: var(--body); font-size: 15px; line-height: 1.25; }
.sn-ch-source.is-ignored { grid-column: 1 / -1; border-style: dashed; border-color: var(--text-dim); background: transparent; color: var(--text-dim); }
.sn-ch-source.is-ignored span:first-child { text-decoration: line-through; text-decoration-thickness: 1px; }
.sn-ch-tag { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid currentColor; border-radius: 99px; padding: 2px 8px; white-space: nowrap; }
.sn-ch-wires { display: block; width: 100%; height: auto; color: var(--accent); overflow: visible; }
.sn-ch-wires.is-h { display: none; }
.sn-ch-target { display: flex; align-items: center; justify-content: center; text-align: center; min-height: 72px; padding: 18px 22px; border-radius: 16px; background: var(--accent); color: var(--sn-on-accent); font-family: var(--display); font-weight: 800; font-size: clamp(18px, 2vw, 22px); line-height: 1.2; box-shadow: 0 0 0 6px var(--accent-bg), 0 18px 48px -18px var(--accent-glow); }
@media (min-width: 900px) {
  .sn-ch { grid-template-columns: minmax(0, 1fr) ${WIRE_W}px minmax(0, 0.8fr); align-items: center; }
  .sn-ch-sources { grid-template-columns: minmax(0, 1fr); }
  .sn-ch-source { height: ${CHIP_H}px; min-height: 0; }
  .sn-ch-source.is-ignored { grid-column: auto; }
  .sn-ch-wires.is-v { display: none; }
  .sn-ch-wires.is-h { display: block; }
}
`;

function Wire({ d, index, ignored, reduced }) {
  if (ignored) {
    return (
      <motion.path
        d={d} fill="none" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="4 6"
        initial={{ opacity: reduced ? 1 : 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.7 }}
      />
    );
  }
  return (
    <motion.path
      d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 0.85 : 0 }}
      whileInView={{ pathLength: 1, opacity: 0.85 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: "easeOut" }}
    />
  );
}

export default function ChannelsDiagram({ data, reduced }) {
  const { sources, target, title } = data;
  const height = sources.length * CHIP_H + (sources.length - 1) * CHIP_GAP;
  const midY = height / 2;
  const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
  const label = `${title}. Diagram: ${sources.length} channels coordinators used to find speakers (${sources
    .map((s) => (s.ignored ? `${lowerFirst(s.label)}, which was ignored` : lowerFirst(s.label)))
    .join(", ")}) converge into ${lowerFirst(target)}.`;

  return (
    <figure className="sn-visual">
      <style>{CSS}</style>
      <p className="sn-label" style={{ marginBottom: 18 }}>{title}</p>
      <div className="sn-ch" role="img" aria-label={label}>
        <ul className="sn-ch-sources">
          {sources.map((s) => (
            <li key={s.label} className={`sn-ch-source${s.ignored ? " is-ignored" : ""}`}>
              <span>{s.label}</span>
              {s.ignored && <span className="sn-ch-tag">Ignored</span>}
            </li>
          ))}
        </ul>

        <svg className="sn-ch-wires is-h" viewBox={`0 0 ${WIRE_W} ${height}`} height={height} aria-hidden="true">
          {sources.map((s, i) => {
            const y = i * (CHIP_H + CHIP_GAP) + CHIP_H / 2;
            const half = WIRE_W / 2;
            return (
              <Wire key={s.label} index={i} ignored={s.ignored} reduced={reduced}
                d={`M0 ${y} C ${half} ${y}, ${half} ${midY}, ${WIRE_W} ${midY}`} />
            );
          })}
        </svg>

        <svg className="sn-ch-wires is-v" viewBox="0 0 300 72" aria-hidden="true">
          {sources.map((s, i) => {
            const x = (300 * (i + 0.5)) / sources.length;
            return (
              <Wire key={s.label} index={i} ignored={s.ignored} reduced={reduced}
                d={`M${x} 0 C ${x} 36, 150 36, 150 72`} />
            );
          })}
        </svg>

        <div className="sn-ch-target">{target}</div>
      </div>
    </figure>
  );
}
