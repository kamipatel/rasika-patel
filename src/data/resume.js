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
      "Create social content and manage the Institute's content calendar in Airtable, tracking post performance by format and channel",
      "Build AI workflows in Claude on the Institute's Meta analytics, surfacing engagement patterns that guide content strategy",
      "Support the email newsletter and recruitment events, including tabling and the fall entrepreneurship expo",
    ],
  },
  {
    org: "ServiceNow",
    role: "Marketing Associate Intern",
    href: "/work/servicenow",
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
    role: "Undergraduate Marketing Assistant",
    location: "Austin, TX",
    dates: "Oct 2025 – May 2026",
    bullets: [
      "Designed and executed digital marketing assets in Figma and Canva to promote CID programs, events, and partnerships across UT, driving a ~35% increase in program registration over two semesters",
      "Produced campus-wide collateral (posters, flyers, stickers, apparel, and Instagram content) for CID courses and events",
    ],
  },
  {
    org: "American Marketing Association",
    role: "Marketing Consultant",
    location: "Austin, TX",
    dates: "Fall 2024 – Spring 2025",
    bullets: [
      "Optimized Baya Systems' SEO strategy, increasing organic traffic by 40% and improving Google ranking for 10+ key terms",
      "Designed a data-driven content roadmap and analytics dashboard, boosting client engagement rates by 25% and CTR by 18%",
    ],
  },
  {
    org: "Texas Convergent",
    role: "UX Design Consultant",
    location: "Austin, TX",
    dates: "Fall 2024 – Fall 2025",
    bullets: [
      "Designed the UI in Figma for HerdUp, a student organization platform improving accessibility and engagement for 24K+ UT users",
      "Streamlined the user flow for Well Water Finders in Figma, saving the client $9,000 per groundwater drill test",
    ],
  },
  {
    org: "The Cultured Carrot",
    role: "Operations Manager & Marketing Assistant",
    location: "Austin, TX",
    dates: "Jun 2022 – Aug 2025",
    bullets: [
      "Independently managed our stall, promoting and selling fermented vegetable dressings at 3 farmers market locations",
      "Rebranded packaging, posters, and social visuals, driving a 121% sales increase and 200+ repeat customers in 7 months",
    ],
  },
  {
    org: "Revelations LLC",
    role: "Business Founder & Owner",
    location: "Remote",
    dates: "Mar 2023 – Dec 2023",
    bullets: [
      "Built and scaled a print-on-demand Etsy shop to $6K+/month in revenue through social and SEO-driven marketing",
    ],
  },
];

export const leadership = [
  {
    org: "Xplore Austin",
    role: "Founder & UX Designer",
    location: "Austin, TX",
    dates: "Feb 2025 – Present",
    current: true,
    slug: "xplore-austin",
    href: "/work/xplore",
    bullets: [
      "Founded and shipped an App Store mobile app connecting UT Austin students to small and student-run businesses through curated lists, peer recommendations, and exclusive deals, reaching 700+ downloads",
      "Built the app solo with Claude Code; automated operations with Claude, the Instinct AI agent, and Supabase, Vercel, and PostHog MCPs",
      "Grew a campus content engine to 300K+ organic views and 1.2K+ followers with zero paid spend, including 127K views in a 30-day period",
      "Developed a ranked local-guide content format that drove 100K views and 3.7K shares on a single post, 79% from non-followers",
      "Selected as a Kendra Scott WELI Spark Founder (Jan – May 2026) for mentorship and support to grow monetization and expansion",
    ],
  },
  {
    org: "Foundry",
    role: "Founder & Developer",
    location: "Austin, TX",
    dates: "Mar 2026 – Present",
    current: true,
    slug: "foundry",
    bullets: [
      "Build and deploy custom websites for small business owners end to end, from branding and design to development and launch",
      "Delivered 2 client sites, Mithas and Kake N Kream, on a React and Vercel stack",
    ],
  },
  {
    org: "SELL Fellowship",
    role: "Fellow Development Lead",
    location: "Austin, TX",
    dates: "Jan 2025 – Present",
    current: true,
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
    role: "Director of Design & Marketing",
    location: "Austin, TX",
    dates: "Jan – May 2025 · Jan – May 2026",
    slug: "texas-momentum",
    bullets: [
      "Managed marketing and creative strategy for 40+ student interns, driving 60% higher event turnout and 150K+ organic views",
      "Led branding and outreach for a 24-hour Build-a-thon, attracting 60+ participants and 4 sponsors across UT Austin",
    ],
  },
];

/** Hosted PDF of the same résumé. */
export const RESUME_PDF_URL =
  "/RasikaPatelResume.pdf";
