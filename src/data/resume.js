/*
 * Résumé content — single source of truth for /resume.
 * Ordered most-recent first within each group.
 * `slug` links an entry to its case study in src/data/projects.js.
 */

export const education = {
  school: "The University of Texas at Austin",
  division: "McCombs School of Business",
  degree: "B.B.A. Marketing",
  minor: "Minor in Entrepreneurship",
  dates: "Expected May 2028",
  location: "Austin, TX",
  coursework: [
    "Software Design",
    "Decision Science",
    "MIS",
    "Design Thinking",
    "Business Stats",
  ],
};

export const experience = [
  {
    org: "Harkey Institute for Entrepreneurial Studies",
    sub: "McCombs School of Business",
    role: "Communications & Campus Engagement Intern",
    location: "Austin, TX",
    dates: "Aug 2026 – Present",
    current: true,
    bullets: [
      "Create social content and manage the content calendar for Institute programs, tracking post performance by format and channel",
      "Support the email newsletter and recruitment events, including tabling and the fall entrepreneurship expo",
    ],
  },
  {
    org: "ServiceNow",
    role: "Marketing Associate Intern",
    location: "New York, NY",
    dates: "Summer 2026",
    bullets: [
      "Led rebuild of the Executive Briefing Center Speakers Bureau; diagnosed 4 root causes of underuse via stakeholder interviews",
      "Reactivated 500+ dormant speaker profiles and updated 450 expertise notes, making participation trackable for the first time",
      "Built an 8-step self-serve onboarding flow and AI roleplay-scored certification (75% pass threshold), replacing manual intake",
    ],
  },
  {
    org: "Center for Integrated Design",
    sub: "The University of Texas at Austin",
    role: "Design & Marketing Assistant",
    location: "Austin, TX",
    dates: "Oct 2025 – May 2026",
    slug: "center-for-integrated-design",
    bullets: [
      "Designed and executed digital marketing assets in Figma and Canva to promote CID programs, events, and partnerships across UT, driving a ~35% increase in program registration over two semesters",
      "Produced campus-wide collateral — posters, flyers, stickers, apparel, and Instagram content — for CID courses and events",
    ],
  },
  {
    org: "American Marketing Association",
    role: "Marketing Consultant",
    location: "Austin, TX",
    dates: "Fall 2024 – Spring 2025",
    slug: "ama",
    bullets: [
      "Optimized Baya Systems' SEO strategy and designed a data-driven content roadmap, increasing organic traffic by 40% and improving Google ranking for 10+ key terms",
    ],
  },
  {
    org: "Texas Convergent",
    role: "UX Designer — Well Water Finders",
    location: "Austin, TX",
    dates: "Fall 2024",
    slug: "well-water-finders",
    bullets: [
      "Built the full UI flow for a groundwater startup, reducing client testing costs by $9,000 per drill through clearer decision-making",
    ],
  },
  {
    org: "The Cultured Carrot",
    role: "Marketing Manager",
    location: "Austin, TX",
    dates: "2022 – 2025",
    slug: "cultured-carrot",
    bullets: [
      "Ran a full rebrand and marketing strategy for an Austin small business, growing sales 121% with 200+ repeat customers",
    ],
  },
];

export const leadership = [
  {
    org: "Foundry",
    role: "Founder & Developer",
    location: "Austin, TX",
    dates: "Mar 2026 – Present",
    current: true,
    slug: "foundry",
    bullets: [
      "Design and build small-business websites end to end, from branding through launch, shipped on a React/Vercel stack",
      "Delivered 2 client sites to date",
    ],
  },
  {
    org: "Xplore Austin",
    role: "Founder & UX Designer",
    location: "Austin, TX",
    dates: "Jan 2025 – Present",
    current: true,
    slug: "xplore-austin",
    bullets: [
      "Founded and shipped an App Store mobile app connecting UT Austin students to small and student-run businesses through curated lists, peer recommendations, and exclusive deals — 250+ downloads",
      "Selected as a Kendra Scott WELI Spark Founder (Jan – May 2026) for mentorship and support to grow monetization and expansion",
    ],
  },
  {
    org: "SELL Fellowship",
    role: "Fellow Development Lead",
    location: "Austin, TX",
    dates: "Jan 2025 – Present",
    current: true,
    slug: "sell-fellowship",
    roleHistory: [
      "Fellow Development Lead · May 2026 – Present",
      "Creative Lead · Jan – May 2026",
      "Incubator Fellow · May – Dec 2025",
      "Ideator Fellow · Jan – May 2025",
    ],
    bullets: [
      "Mentor fellows through the Incubator phase, the build-and-launch stage, advising on product development and go-to-market",
      "Led creative direction as Creative Lead, designing social, web, print, and merch assets to promote programs and recruit fellows",
    ],
  },
  {
    org: "Texas Momentum",
    role: "VP of Marketing",
    location: "Austin, TX",
    dates: "Jan – May 2025 · Jan – May 2026",
    slug: "texas-momentum",
    bullets: [
      "Led creative and marketing for 40+ student interns across two program cycles",
      "Designed campaigns, merch, and event branding that hit 150K+ organic views",
    ],
  },
];

/** Hosted PDF of the same résumé. */
export const RESUME_PDF_URL =
  "https://drive.google.com/file/d/1aZehnbBxOty_i0yXKJn5UT6O0ZCI3lCF/view?usp=sharing";
