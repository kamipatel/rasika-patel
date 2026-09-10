/*
 * Project orbit nodes.
 *
 * Derived from projects.js rather than hand-maintained, so adding a project
 * puts it in the orbit automatically instead of leaving the two lists to
 * drift apart. Only the orbit-specific bits are declared here.
 */
import { projects } from "./projects.js";

/**
 * Per-project orbit tuning.
 * `energy` sizes the node and, for active projects, promotes it to the inner
 * ring (in-progress and >= 80). `short` replaces long titles, which overlap
 * their neighbours at orbit scale.
 */
const ORBIT = {
  "xplore-austin": { energy: 90, related: ["herdup"] },
  foundry: { energy: 85, related: ["xplore-austin"] },
  harkey: { energy: 82, short: "Harkey", related: ["servicenow"] },
  servicenow: { energy: 88, short: "ServiceNow", related: ["harkey"] },
  "sell-fellowship": { energy: 80, related: ["texas-momentum"] },
  "texas-momentum": { energy: 85, related: ["sell-fellowship"] },
  herdup: { energy: 70, related: ["xplore-austin"] },
  "center-for-integrated-design": { energy: 80, short: "Center for Integrated Design" },
  "well-water-finders": { energy: 100 },
  "cultured-carrot": { energy: 100, short: "The Cultured Carrot" },
  ama: { energy: 80, short: "AMA" },
};

const DEFAULT_ENERGY = 75;

export const timelineNodes = projects.map((project) => {
  const orbit = ORBIT[project.slug] ?? {};
  return {
    slug: project.slug,
    href: project.href,
    title: orbit.short ?? project.title,
    timeline: project.timeline,
    // A project still running is active; everything else has wrapped.
    status: /present/i.test(project.timeline) ? "in-progress" : "completed",
    energy: orbit.energy ?? DEFAULT_ENERGY,
    relatedIds: orbit.related ?? [],
  };
});

/** Edges drawn between related nodes, de-duplicated across both directions. */
export const connections = (() => {
  const seen = new Set();
  const edges = [];
  for (const node of timelineNodes) {
    for (const to of node.relatedIds) {
      const key = [node.slug, to].sort().join("|");
      if (seen.has(key) || !timelineNodes.some((n) => n.slug === to)) continue;
      seen.add(key);
      edges.push({ from: node.slug, to });
    }
  }
  return edges;
})();
