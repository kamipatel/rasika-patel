/*
 * Per-route document metadata, derived from the same content the pages render.
 *
 * Imported by BOTH the React pages (via Seo.jsx) and scripts/prerender.js, so
 * the static HTML written at build time and the tags Helmet injects at runtime
 * can never disagree. Relative imports carry explicit .js extensions because
 * this module is loaded by plain Node during the build, not only by Vite.
 */
import { projects } from "../data/projects.js";
import { education, experience } from "../data/resume.js";
import { SITE_DEFAULTS, truncate } from "./site.js";

export const homeMeta = () => ({
  path: "/",
  title: SITE_DEFAULTS.title,
  description: SITE_DEFAULTS.description,
  metaDescription: SITE_DEFAULTS.metaDescription,
});

export const resumeMeta = () => {
  const current = experience.find((e) => e.current) ?? experience[0];
  return {
    path: "/resume",
    title: "Résumé — Rasika Patel",
    description: truncate(
      `${current.role} at ${current.org}. ${education.degree}, ${education.minor}, at UT Austin.`
    ),
  };
};

export const xploreMeta = () => ({
  path: "/work/xplore",
  title: "Xplore Austin — Case Study — Rasika Patel",
  description: truncate(
    "How a discovery app for UT students grew through ranked local guides — 200K+ organic views, 500+ downloads, 79% reach from non-followers."
  ),
});

export const servicenowMeta = () => ({
  path: "/work/servicenow",
  title: "Rebuilding the Speakers Bureau — Rasika Patel",
  description: truncate(
    "How a Fortune 500 executive speaker programme was rebuilt: four root causes of underuse, an eight-step enrollment flow, and an AI-scored certification gate."
  ),
});

export const projectMeta = (project) => ({
  path: `/projects/${project.slug}`,
  title: `${project.title} — Rasika Patel`,
  description: truncate(`${project.role}. ${project.desc}`),
});

/** Every route the site can serve. Project routes follow src/data/projects.js. */
// Xplore and ServiceNow live at /work/*; the compact tier has no page of its
// own, so only featured projects with their own page are listed.
const SUPERSEDED_SLUGS = new Set(["xplore-austin", "servicenow"]);

export const ALL_ROUTES = [
  homeMeta(),
  resumeMeta(),
  xploreMeta(),
  servicenowMeta(),
  ...projects
    .filter((p) => p.featured && !SUPERSEDED_SLUGS.has(p.slug))
    .map(projectMeta),
];

/** Routes needing their own static HTML file. "/" is already dist/index.html. */
export const PRERENDER_ROUTES = ALL_ROUTES.filter((r) => r.path !== "/");
