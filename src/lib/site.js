/** Canonical origin for the deployed site. Single source of truth for absolute URLs. */
export const SITE_URL = "https://rasika-patel.vercel.app";

/**
 * Defaults mirrored by the static tags in index.html — keep the two in sync.
 * `metaDescription` differs from `description` only on the homepage, where
 * index.html has always carried the "Rasika Patel — " prefix on <meta
 * name="description"> but not on og:description. Preserved so the homepage's
 * existing tags are unchanged.
 */
export const SITE_DEFAULTS = {
  title: "Rasika Patel — Portfolio",
  description:
    "Marketing, Design & Innovation. BBA Marketing at UT Austin's McCombs School of Business.",
  metaDescription:
    "Rasika Patel — Marketing, Design & Innovation. BBA Marketing at UT Austin's McCombs School of Business.",
};

/** Build an absolute URL from a route path. */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Trim a description to a length link previews and SERPs actually render,
 * breaking on a word boundary rather than mid-word.
 */
export function truncate(text, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.—-]$/, "")}…`;
}
