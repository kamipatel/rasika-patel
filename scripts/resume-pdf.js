/*
 * Builds public/RasikaPatelResume.pdf from src/data/resume.js with headless
 * Chrome, so the download can't drift from /resume. Run it by hand after
 * changing the resume data and commit the PDF (Vercel has no Chrome):
 *
 *   npm run resume-pdf
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { education, experience, leadership } from "../src/data/resume.js";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.resolve("public/RasikaPatelResume.pdf");

/* Contact details and extras that only the PDF carries. */
const CONTACT = [
  { text: "Austin, TX" },
  { text: "rasikap@utexas.edu", href: "mailto:rasikap@utexas.edu" },
  { text: "(737) 207-1622" },
  { text: "LinkedIn.com/in/RasikaPatel", href: "https://www.linkedin.com/in/rasikapatel/" },
  { text: "rasika-patel.vercel.app", href: "https://rasika-patel.vercel.app" },
];

const EXTRAS = [
  ["Technical Skills", "Figma, Canva, Adobe Creative Suite (Illustrator, Photoshop), Airtable, Tableau, Microsoft Office (Excel, PowerPoint), SQL, Python, Java, HTML/CSS, React, React Native, Supabase, Vercel, PostHog, Qualtrics, VS Code"],
  ["AI Tools", "Claude, Claude Code, Instinct, MCP integrations, Gemini, ChatGPT, Perplexity, Antigravity, OpenClaw"],
  ["Certifications", "Data Science (2023), IT Java Specialist (2024), 200hr Yoga Teacher Training (2025), CPR/AED/FA (2025)"],
  ["Interests", "UX Design, Matcha Connoisseur, Entrepreneurship, AI Tools, Yoga, Breathwork, Building Apps/Websites"],
  ["Work Eligibility", "Eligible to work in the U.S. with no restrictions"],
];

/* The one-page order, by org. /resume groups these differently. */
const SECTIONS = [
  ["Experience", ["Harkey Institute for Entrepreneurial Studies", "ServiceNow", "Center for Integrated Design", "Xplore Austin", "Foundry", "The Cultured Carrot", "Revelations LLC"]],
  ["Projects", ["Texas Convergent", "American Marketing Association"]],
  ["Leadership", ["SELL Fellowship", "Texas Momentum"]],
];

/* Phrases set in bold, so a skim lands on the numbers. */
const EMPHASIS = [
  "AI workflows", "Claude workflows", "Airtable", "15+ stakeholder interviews", "438 expertise notes", "443 bios",
  "300 enrollment dates", "80% pass mark", "~10 directors", "~35%", "700+ downloads", "300+ student accounts",
  "Claude Code", "246K views", "1.3K+ followers", "$0 ad spend", "118,946 views", "4,269 shares", "96%",
  "Kendra Scott WELI Spark Founder", "2 client sites", "121% sales increase", "200+ repeat customers", "$6K+/month",
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
.history { font-style: italic; }
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

/* "Creative Lead · Jan – May 2026" -> "Creative Lead (Jan – May 2026)". The
   first entry is the current role, which the entry header already shows. */
const pastRoles = (history) =>
  history.slice(1).map((item) => item.replace(" · ", " (") + ")").join(" · ");

function entryHtml(entry) {
  const place = [entry.location].filter(Boolean).join("");
  const history = entry.roleHistory
    ? `<p class="history">${escapeHtml(pastRoles(entry.roleHistory))}</p>`
    : "";
  return `<div class="entry">
    <div class="row"><span><b>${escapeHtml(entry.org)}</b> · <i>${escapeHtml(entry.role)}</i> · ${escapeHtml(place)}</span><span>${escapeHtml(entry.dates)}</span></div>
    ${history}
    <ul>${entry.bullets.map((b) => `<li>${emphasize(b)}</li>`).join("")}</ul>
  </div>`;
}

function sectionsHtml() {
  const entries = [...experience, ...leadership];
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
    <h1>Rasika Patel</h1>
    <p class="contact">${contact}</p>
    <h2>Education</h2>
    <div class="row"><span><b>${escapeHtml(education.school)}</b> · ${escapeHtml(education.division)}</span><span>${escapeHtml(education.dates)}</span></div>
    <p>${escapeHtml(education.degree)} · ${escapeHtml(education.minor)}</p>
    ${sectionsHtml()}
    <h2>Additional information and skills</h2>
    <div class="extras">${extras}</div>
  </body></html>`;
}

if (!existsSync(CHROME)) throw new Error(`resume-pdf: Chrome not found at ${CHROME}`);

const dir = mkdtempSync(path.join(os.tmpdir(), "resume-pdf-"));
try {
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
