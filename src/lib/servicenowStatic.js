/*
 * No-JS fallback for /work/servicenow, injected by scripts/prerender.js as a
 * <noscript> block. Built from the same data file as the React page, so the
 * numbers in the static HTML cannot drift from the page.
 */
import { hero, impact } from "../data/servicenow.js";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const list = (items) => `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;

export function servicenowStaticBody() {
  const { delivered, projected } = impact;
  return [
    /* index.css hides the cursor for the custom one, which needs JS, and the
       text color is set inside the React app. */
    "<style>*{cursor:auto!important}</style>",
    '<main style="color:#EDE8F5;font-family:sans-serif;line-height:1.6;max-width:680px;margin:0 auto;padding:48px 24px">',
    `<h1>${escapeHtml(hero.title)}</h1>`,
    `<p>${escapeHtml(hero.deck)}</p>`,
    `<p>${hero.meta.map(escapeHtml).join(" · ")}</p>`,
    list(hero.glance),
    `<h2>${escapeHtml(impact.label)}</h2>`,
    `<h3>${escapeHtml(delivered.label)}</h3>`,
    list([...delivered.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`), delivered.outcome]),
    `<h3>${escapeHtml(projected.label)} (not measured)</h3>`,
    list(projected.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`)),
    `<p>${escapeHtml(projected.note)}</p>`,
    "</main>",
  ].join("");
}
