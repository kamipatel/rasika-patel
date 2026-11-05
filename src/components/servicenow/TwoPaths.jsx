import { CircleCheck } from "lucide-react";
import Reveal from "../Reveal";

/*
 * Visual B: two entry lanes that end at the same Enrolled node. Desktop
 * stacks the lanes as rows with a bracket joining them on the right; below
 * 900px the lanes sit side by side and the bracket joins them underneath.
 */

const LANE_GAP = 12;

const CSS = `
.sn-paths { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: ${LANE_GAP}px; }
.sn-lane { border: 1px solid var(--border); border-radius: 18px; padding: 14px; background: var(--card); min-width: 0; }
.sn-lane-name { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin: 0 0 14px; }
.sn-lane-name span:first-child { color: var(--text-dim); }
.sn-lane-steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 26px; }
.sn-lane-step { position: relative; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--accent-dim); background: var(--bg); color: var(--text-light); font-family: var(--body); font-size: 15px; line-height: 1.35; }
.sn-lane-step:not(:last-child)::after { content: ""; position: absolute; left: 50%; bottom: -21px; width: 8px; height: 8px; border-right: 2px solid var(--accent); border-bottom: 2px solid var(--accent); transform: translateX(-50%) rotate(45deg); }
.sn-paths-join { grid-column: 1 / -1; position: relative; height: 44px; }
.sn-paths-join::before { content: ""; position: absolute; top: 0; height: 50%; left: calc((100% - ${LANE_GAP}px) / 4); right: calc((100% - ${LANE_GAP}px) / 4); border: 2px solid var(--accent); border-top: 0; border-radius: 0 0 14px 14px; }
.sn-paths-join::after { content: ""; position: absolute; left: 50%; top: 50%; bottom: 0; width: 2px; background: var(--accent); transform: translateX(-50%); }
.sn-paths-end { grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 20px; border-radius: 16px; background: var(--accent); color: var(--sn-on-accent); font-family: var(--display); font-weight: 800; font-size: 22px; box-shadow: 0 0 0 6px var(--accent-bg); }
@media (min-width: 640px) {
  .sn-lane { padding: 18px; }
}
@media (min-width: 900px) {
  .sn-paths { grid-template-columns: minmax(0, 1fr) 56px 180px; grid-template-rows: 1fr 1fr; row-gap: ${LANE_GAP}px; column-gap: 0; }
  .sn-lane:nth-of-type(1) { grid-column: 1; grid-row: 1; }
  .sn-lane:nth-of-type(2) { grid-column: 1; grid-row: 2; }
  .sn-lane-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 28px; row-gap: 0; }
  .sn-lane-step:not(:last-child)::after { left: auto; bottom: auto; right: -19px; top: 50%; transform: translateY(-50%) rotate(-45deg); }
  .sn-paths-join { grid-column: 2; grid-row: 1 / 3; height: auto; }
  .sn-paths-join::before { left: 0; right: 50%; height: auto; top: calc((100% - ${LANE_GAP}px) / 4); bottom: calc((100% - ${LANE_GAP}px) / 4); border: 2px solid var(--accent); border-left: 0; border-radius: 0 14px 14px 0; }
  .sn-paths-join::after { left: 50%; right: 0; top: 50%; bottom: auto; width: auto; height: 2px; transform: translateY(-50%); }
  .sn-paths-end { grid-column: 3; grid-row: 1 / 3; align-self: center; flex-direction: column; padding: 22px 16px; }
}
`;

export default function TwoPaths({ data, reduced }) {
  const { lanes, end, caption } = data;
  const label = `Diagram: two ways in, both ending at ${end}. ${lanes
    .map((lane, i) => `Lane ${i + 1}, ${lane.name}: ${lane.steps.join(", then ")}.`)
    .join(" ")}`;

  return (
    <figure className="sn-visual">
      <style>{CSS}</style>
      <Reveal reduced={reduced}>
        <div className="sn-paths" role="img" aria-label={label}>
          {lanes.map((lane, i) => (
            <div key={lane.name} className="sn-lane">
              <p className="sn-lane-name"><span>Lane {i + 1}</span><span>{lane.name}</span></p>
              <ol className="sn-lane-steps">
                {lane.steps.map((step) => <li key={step} className="sn-lane-step">{step}</li>)}
              </ol>
            </div>
          ))}
          <div className="sn-paths-join" aria-hidden="true" />
          <div className="sn-paths-end">
            <CircleCheck size={24} aria-hidden="true" />
            <span>{end}</span>
          </div>
        </div>
      </Reveal>
      <figcaption className="sn-caption">{caption}</figcaption>
    </figure>
  );
}
