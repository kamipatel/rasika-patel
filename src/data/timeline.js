export const timelineNodes = [
  { slug: "xplore-austin", title: "Xplore Austin", timeline: "Jan 2025 - Present", status: "in-progress", energy: 90, relatedIds: ["herdup"] },
  { slug: "texas-momentum", title: "Texas Momentum", timeline: "Spring 2025 - Present", status: "in-progress", energy: 85, relatedIds: ["sell-fellowship"] },
  { slug: "herdup", title: "HerdUp", timeline: "Jan 2025 - Dec 2025", status: "completed", energy: 70, relatedIds: ["xplore-austin"] },
  { slug: "sell-fellowship", title: "SELL Fellowship", timeline: "Spring 2026 - Present", status: "in-progress", energy: 75, relatedIds: ["texas-momentum"] },
  { slug: "center-for-integrated-design", title: "Center for Integrated Design", timeline: "Oct 2025 - Present", status: "in-progress", energy: 80, relatedIds: [] },
  { slug: "well-water-finders", title: "Well Water Finders", timeline: "Fall 2024", status: "completed", energy: 100, relatedIds: [] },
  { slug: "cultured-carrot", title: "The Cultured Carrot", timeline: "2022-2025", status: "completed", energy: 100, relatedIds: [] },
  { slug: "ama", title: "AMA", timeline: "Fall 2024 - Spring 2025", status: "completed", energy: 80, relatedIds: [] },
];

export const connections = [
  { from: "xplore-austin", to: "herdup", label: "App Projects" },
  { from: "texas-momentum", to: "sell-fellowship", label: "Marketing / Brand" },
];
