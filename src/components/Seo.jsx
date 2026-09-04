import { Helmet } from "react-helmet-async";
import { SITE_DEFAULTS, absoluteUrl } from "../lib/site";

/*
 * Per-route document head.
 *
 * The matching tags in index.html carry data-rh="true" so Helmet treats them
 * as its own and REPLACES them on mount instead of appending duplicates.
 * Those static tags stay the homepage defaults, which is what non-JS
 * consumers (and the first paint) see.
 */
export default function Seo({ title, description, metaDescription, path }) {
  const resolvedTitle = title || SITE_DEFAULTS.title;
  const resolvedDescription = description || SITE_DEFAULTS.description;
  const resolvedMeta = metaDescription || resolvedDescription;
  const url = absoluteUrl(path);

  // defer={false} applies head changes in a normal effect. Helmet's default
  // defers through requestAnimationFrame, which never fires in a background
  // tab, leaving the head stale until the tab is focused.
  return (
    <Helmet prioritizeSeoTags defer={false}>
      <title>{resolvedTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={resolvedMeta} />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
    </Helmet>
  );
}
