import { BookOpen, ClipboardList, FileSpreadsheet, UserCheck, Workflow } from "lucide-react";
import Reveal from "../Reveal";

/*
 * The five handoff documents as small tiles. Placeholder bars only: no real
 * content from the documents appears on the page.
 */

const ICONS = {
  sheet: FileSpreadsheet,
  guide: BookOpen,
  workflow: Workflow,
  applicant: UserCheck,
  survey: ClipboardList,
};

const CSS = `
.sn-docs { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.sn-doc { position: relative; display: grid; gap: 12px; align-content: start; padding: 16px; border: 1px solid var(--border); border-radius: 14px 22px 14px 14px; background: var(--card); min-width: 0; }
.sn-doc::after { content: ""; position: absolute; top: -1px; right: -1px; width: 22px; height: 22px; border-bottom-left-radius: 8px; background: var(--border); }
.sn-doc-icon { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 10px; background: var(--accent-bg); color: var(--accent); }
.sn-doc-name { font-family: var(--body); font-weight: 600; font-size: 15px; line-height: 1.3; color: var(--text-light); margin: 0; }
.sn-doc-lines { display: grid; gap: 6px; }
.sn-doc-lines span { height: 5px; border-radius: 99px; background: var(--border); }
.sn-docs li:last-child:nth-child(odd) { grid-column: 1 / -1; }
@media (min-width: 760px) {
  .sn-docs { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .sn-docs li:last-child:nth-child(odd) { grid-column: auto; }
}
`;

export default function DocTiles({ docs, reduced }) {
  return (
    <div className="sn-visual">
      <style>{CSS}</style>
      <ul className="sn-docs" aria-label="Handoff documents">
        {docs.map((doc, i) => {
          const Icon = ICONS[doc.kind];
          return (
            <li key={doc.name} className="sn-doc">
              <Reveal delay={i * 0.05} reduced={reduced}>
                <span className="sn-doc-icon" aria-hidden="true"><Icon size={20} /></span>
                <p className="sn-doc-name" style={{ marginTop: 12 }}>{doc.name}</p>
                <div className="sn-doc-lines" aria-hidden="true" style={{ marginTop: 12 }}>
                  <span style={{ width: "100%" }} /><span style={{ width: "80%" }} /><span style={{ width: "55%" }} />
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
