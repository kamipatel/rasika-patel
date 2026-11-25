/*
 * Builds a proposed résumé PDF from src/data/resume.js with headless Chrome:
 *
 *   npm run resume-pdf  ->  proposed/RasikaPatelResume-proposed.pdf
 *
 * It never writes public/RasikaPatelResume.pdf. That file is Rasika's own
 * résumé and is replaced by hand. Nothing links to the proposed file.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { education, experience, projects, leadership } from "../src/data/resume.js";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.resolve("proposed/RasikaPatelResume-proposed.pdf");

/* Contact details and extras that only the PDF carries. */
const CONTACT = [
  { text: "Austin, TX" },
  { text: "rasikap@utexas.edu", href: "mailto:rasikap@utexas.edu" },
  { text: "(737) 207-1622" },
  { text: "LinkedIn.com/in/RasikaPatel", href: "https://www.linkedin.com/in/rasikapatel/" },
  { text: "rasika-patel.vercel.app", href: "https://rasika-patel.vercel.app" },
];

const EXTRAS = [
  ["Technical Skills", "Figma, Canva, Adobe Creative Suite (Illustrator, Photoshop), Tableau, Microsoft Office (Excel, PowerPoint), SQL, Python, Java, HTML/CSS, Qualtrics, VS Code, PostHog, Supabase, AI Tools (Claude, Gemini, Perplexity, OpenClaw, Antigravity)"],
  ["Certifications", "Data Science (2023), IT Java Specialist (2024), 200hr Yoga Teacher Training (2025), CPR/AED/FA (2025)"],
  ["Interests", "UX Design, Matcha Connoisseur, Entrepreneurship, AI Tools, Yoga, Breathwork, Building Apps/Websites"],
  ["Work Eligibility", "Eligible to work in the U.S. with no restrictions"],
];

/* The one-page order, by org, as on her résumé. */
const SECTIONS = [
  ["Experience", ["ServiceNow", "Harkey Institute for Entrepreneurial Studies", "Center for Integrated Design (CID), UT Austin", "Xplore Austin", "Foundry", "The Cultured Carrot", "Revelations LLC"]],
  ["Projects", ["Texas Convergent", "American Marketing Association"]],
  ["Leadership Experience and Activities", ["SELL Fellowship, UT Austin", "Texas Momentum"]],
];

/* Phrases set in bold, so a skim lands on the numbers. */
const EMPHASIS = [
  "4 root causes", "90–95% of ~450 profiles", "8-step self-serve onboarding flow",
  "~35%", "300K+ organic views", "1.2K+ followers", "zero paid spend", "127K views", "100K views", "3.7K shares", "79%",
  "700+ downloads", "KS WELI Spark Founder", "2 client sites", "121% sales increase", "200+ repeat customers", "$6K+/month",
  "24K+ UT users", "$9,000", "organic traffic by 40%", "25%", "18%", "40+ student interns", "60% higher event turnout",
  "150K+ organic views", "60+ participants", "4 sponsors",
];

const CSS = `
@page { size: Letter; margin: 0.36in 0.45in; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Calibri, Carlito, "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 9.35pt; line-height: 1.2; color: #000; }
a { color: inherit; text-decoration: none; }
h1 { font-size: 14pt; font-variant: small-caps; letter-spacing: 0.3px; text-align: center; }
.contact { text-align: center; margin-top: 1px; }
h2 { font-size: 9.35pt; text-transform: uppercase; border-bottom: 1px solid #000; margin: 5px 0 2px; padding-bottom: 1px; break-after: avoid; }
.row { display: flex; justify-content: space-between; gap: 12px; }
.row span:last-child { white-space: nowrap; }
.entry { margin-bottom: 2.5px; break-inside: avoid; }
.history, .sub { font-style: italic; }
.edu { display: grid; grid-template-columns: auto 1fr auto; column-gap: 18px; }
ul { list-style: none; }
li { padding-left: 9px; text-indent: -9px; }
li::before { content: "\\2022"; display: inline-block; width: 9px; text-indent: 0; }
.extras p { margin-bottom: 1px; }
`;

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const emphasize = (text) =>
  EMPHASIS.reduce((html, phrase) => {
    const safe = escapeHtml(phrase);
    return html.includes(safe) ? html.replace(safe, `<b>${safe}</b>`) : html;
  }, escapeHtml(text));

/* Earlier roles, already written as "Creative Lead (Spring 2026)". */
const pastRoles = (history) => history.join(" · ");

function entryHtml(entry) {
  const place = entry.location ? `; ${escapeHtml(entry.location)}` : "";
  const history = entry.roleHistory
    ? `<p class="history">${escapeHtml(pastRoles(entry.roleHistory))}</p>`
    : "";
  const items = entry.bullets.map((b, i) => {
    const head = entry.bulletHeads?.[i] ? `<p class="sub">${escapeHtml(entry.bulletHeads[i])}</p>` : "";
    return `${head}<ul><li>${emphasize(b)}</li></ul>`;
  });
  return `<div class="entry">
    <div class="row"><span><b>${escapeHtml(entry.org)}</b> – ${escapeHtml(entry.role)}${place}</span><span>${escapeHtml(entry.dates)}</span></div>
    ${history}
    ${items.join("")}
  </div>`;
}

function sectionsHtml() {
  const entries = [...experience, ...projects, ...leadership];
  const placed = SECTIONS.flatMap(([, orgs]) => orgs);
  const missing = entries.filter((e) => !placed.includes(e.org)).map((e) => e.org);
  if (missing.length) throw new Error(`resume-pdf: add to SECTIONS: ${missing.join(", ")}`);

  return SECTIONS.map(([title, orgs]) => {
    const body = orgs.map((org) => {
      const entry = entries.find((e) => e.org === org);
      if (!entry) throw new Error(`resume-pdf: no resume entry for "${org}"`);
      return entryHtml(entry);
    });
    return `<h2>${title}</h2>${body.join("")}`;
  }).join("");
}

function pageHtml() {
  const contact = CONTACT.map((c) =>
    c.href ? `<a href="${c.href}">${escapeHtml(c.text)}</a>` : escapeHtml(c.text)
  ).join(" • ");
  const extras = EXTRAS.map(([k, v]) => `<p><b>${escapeHtml(k)}:</b> ${escapeHtml(v)}</p>`).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Rasika Patel Resume</title><style>${CSS}</style></head><body>
    <h1>RASIKA PATEL</h1>
    <p class="contact">${contact}</p>
    <h2>Education</h2>
    <div class="edu"><b>${escapeHtml(education.school)}</b><span>${escapeHtml(education.degree)}</span><span>${escapeHtml(education.dates)}</span><span></span><span>${escapeHtml(education.minor)}</span><span></span></div>
    ${sectionsHtml()}
    <h2>Additional information and skills</h2>
    <div class="extras">${extras}</div>
  </body></html>`;
}

if (!existsSync(CHROME)) throw new Error(`resume-pdf: Chrome not found at ${CHROME}`);

const dir = mkdtempSync(path.join(os.tmpdir(), "resume-pdf-"));
try {
  mkdirSync(path.dirname(OUT), { recursive: true });
  const html = path.join(dir, "resume.html");
  writeFileSync(html, pageHtml(), "utf8");
  execFileSync(CHROME, [
    "--headless", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf-no-header",
    `--print-to-pdf=${OUT}`, `file://${html}`,
  ], { stdio: "ignore" });
  console.log(`resume-pdf: wrote ${path.relative(process.cwd(), OUT)}`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
