/*
 * Head-only prerender.
 *
 * The app is a client-rendered SPA, so every route was served the same
 * dist/index.html — meaning its homepage canonical and Open Graph tags. That
 * is invisible to Google (it renders JS and picks up the tags Helmet injects)
 * but decisive for LinkedIn, iMessage, Twitter and Facebook, none of which
 * execute JavaScript. They only ever saw the homepage preview.
 *
 * This writes one static HTML file per route, byte-identical to the built
 * shell except for the head tags Helmet owns. Vercel matches real files ahead
 * of the SPA rewrite in vercel.json, so those files are what crawlers receive,
 * while the app still boots and Helmet keeps client-side navigation correct.
 *
 * Route metadata comes from src/lib/routeMeta.js — the same module the React
 * pages use — so the static and runtime tags cannot drift apart.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { PRERENDER_ROUTES } from "../src/lib/routeMeta.js";
import { absoluteUrl } from "../src/lib/site.js";

const DIST = path.resolve("dist");
const SHELL = path.join(DIST, "index.html");

/** Escape a value for use inside a double-quoted HTML attribute. */
const attr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Escape a value for use as HTML text content. */
const text = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * Replace exactly one tag, matched by the data-rh marker Helmet uses to claim
 * the static tags. Throws when a tag is missing or duplicated so a change to
 * index.html can never silently produce wrong output.
 */
function replaceOne(html, pattern, replacement, label) {
  const matches = html.match(pattern);
  if (!matches || matches.length !== 1) {
    throw new Error(
      `prerender: expected exactly 1 "${label}" tag in dist/index.html, found ${
        matches ? matches.length : 0
      }. Did the head in index.html change?`
    );
  }
  return html.replace(pattern, replacement);
}

function buildHead(shell, route) {
  const url = absoluteUrl(route.path);
  const description = route.description;
  const metaDescription = route.metaDescription ?? description;

  let html = shell;
  html = replaceOne(
    html,
    /<title data-rh="true">[\s\S]*?<\/title>/g,
    `<title data-rh="true">${text(route.title)}</title>`,
    "title"
  );
  html = replaceOne(
    html,
    /<meta data-rh="true" name="description" content="[^"]*" \/>/g,
    `<meta data-rh="true" name="description" content="${attr(metaDescription)}" />`,
    "description"
  );
  html = replaceOne(
    html,
    /<link data-rh="true" rel="canonical" href="[^"]*" \/>/g,
    `<link data-rh="true" rel="canonical" href="${attr(url)}" />`,
    "canonical"
  );
  html = replaceOne(
    html,
    /<meta data-rh="true" property="og:title" content="[^"]*" \/>/g,
    `<meta data-rh="true" property="og:title" content="${attr(route.title)}" />`,
    "og:title"
  );
  html = replaceOne(
    html,
    /<meta data-rh="true" property="og:description" content="[^"]*" \/>/g,
    `<meta data-rh="true" property="og:description" content="${attr(description)}" />`,
    "og:description"
  );
  html = replaceOne(
    html,
    /<meta data-rh="true" property="og:url" content="[^"]*" \/>/g,
    `<meta data-rh="true" property="og:url" content="${attr(url)}" />`,
    "og:url"
  );
  html = replaceOne(
    html,
    /<meta data-rh="true" name="twitter:title" content="[^"]*" \/>/g,
    `<meta data-rh="true" name="twitter:title" content="${attr(route.title)}" />`,
    "twitter:title"
  );
  html = replaceOne(
    html,
    /<meta data-rh="true" name="twitter:description" content="[^"]*" \/>/g,
    `<meta data-rh="true" name="twitter:description" content="${attr(description)}" />`,
    "twitter:description"
  );
  return html;
}

const shell = readFileSync(SHELL, "utf8");

for (const route of PRERENDER_ROUTES) {
  const outDir = path.join(DIST, route.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), buildHead(shell, route), "utf8");
  console.log(`  prerendered ${route.path}`);
}

console.log(`prerender: wrote ${PRERENDER_ROUTES.length} route(s)`);
