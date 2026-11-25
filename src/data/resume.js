/*
 * Résumé content: single source of truth for /resume.
 * Ordered most-recent first within each group.
 * `slug` links an entry to its case study in src/data/projects.js.
 */

export const education = {
  school: "The University of Texas at Austin",
  division: "McCombs School of Business",
  degree: "Bachelor of Business Administration, Marketing",
  minor: "Minor: Entrepreneurship",
  dates: "May 2028",
  location: "Austin, TX",
  abroad: "IAU Madrid (study abroad) · Spring 2027",
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
    org: "ServiceNow",
    role: "Marketing Associate Intern",
    href: "/work/servicenow",
    location: "New York, NY",
    dates: "Summer 2026",
    bullets: [
      "Led rebuild of the Executive Briefing Center Speakers Bureau; diagnosed 4 root causes of underuse via stakeholder interviews",
      "Redesigned the program from open nomination to a selective, application-based model after 15+ stakeholder interviews found 90–95% of ~450 profiles dormant",
      "Built an 8-step self-serve onboarding flow & AI roleplay-scored certification, replacing manual processes",
    ],
  },
  {
    org: "Harkey Institute for Entrepreneurial Studies",
    role: "Communications & Campus Engagement Intern",
    location: "Austin, TX",
    dates: "Aug 2026 – Present",
    current: true,
    bullets: [
      "Create social content & manage the content calendar for Institute programs, tracking post performance by format & channel",
      "Support the email newsletter & recruitment events, including tabling & the fall entrepreneurship expo",
    ],
  },
  {
    org: "Center for Integrated Design (CID), UT Austin",
    role: "Undergraduate Marketing Assistant",
    location: "Austin, TX",
    dates: "Oct 2025 – May 2026",
    bullets: [
      "Designed digital marketing assets in Figma & Canva for CID programs & events, increasing registration by ~35% over 2 semesters",
      "Collaborated with the CID team on visual strategy & branding initiatives to enhance campus-wide engagement",
    ],
  },
  {
    org: "Xplore Austin",
    role: "Founder",
    location: "Austin, TX",
    dates: "Feb 2025 – Present",
    current: true,
    slug: "xplore-austin",
    href: "/work/xplore",
    bullets: [
      "Grew a campus content engine to 300K+ organic views & 1.2K+ followers with zero paid spend; 127K views in a 30-day period",
      "Developed a ranked local-guide content format driving 100K views & 3.7K shares on a single post, 79% from non-followers",
      "Launched UT-only discovery app on the App Store, converting into 700+ downloads; selected as a KS WELI Spark Founder",
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
      "Design & build small-business websites end-to-end, from branding to launch; delivered 2 client sites on a React/Vercel stack",
    ],
  },
  {
    org: "The Cultured Carrot",
    role: "Operations Manager & Marketing Assistant",
    location: "Austin, TX",
    dates: "Jun 2022 – Aug 2025",
    bullets: [
      "Independently managed our stall, promoting & selling fermented vegetable dressings at 3 farmers market locations",
      "Rebranded packaging, posters, & social visuals, driving a 121% sales increase & 200+ repeat customers in 7 months",
    ],
  },
  {
    org: "Revelations LLC",
    role: "Business Founder & Owner",
    location: "Remote",
    dates: "Mar 2023 – Dec 2023",
    bullets: [
      "Built & scaled a print-on-demand Etsy shop to $6K+/month in revenue through social & SEO-driven marketing",
    ],
  },
];

export const projects = [
  {
    org: "Texas Convergent",
    role: "UX Design Consultant",
    dates: "Fall 2024 – Fall 2025",
    /* Sub-project label shown above the bullet at the same index. */
    bulletHeads: ["HerdUp (Jan 2025 – Dec 2025)", "Well Water Finders (Aug – Dec 2024)"],
    bullets: [
      "Designed UI on Figma for HerdUp, a student organization platform improving accessibility & engagement for 24K+ UT users",
      "Streamlined user flow for Well Water Finders on Figma, enhancing usability & saving clients $9,000 per groundwater drill test",
    ],
  },
  {
    org: "American Marketing Association",
    role: "Marketing Consultant",
    dates: "Fall 2024 – Spring 2025",
    bullets: [
      "Optimized Baya Systems’ SEO strategy, increasing organic traffic by 40% & improving Google ranking for 10+ key terms",
      "Designed data-driven content roadmap & analytics dashboard, boosting client engagement rates by 25% & CTR by 18%",
    ],
  },
];

export const leadership = [
  {
    org: "SELL Fellowship, UT Austin",
    role: "Fellow Development Lead (Summer 2026 – Present)",
    dates: "Jan 2025 – Present",
    current: true,
    /* Earlier roles, newest first. */
    roleHistory: [
      "Creative Lead (Spring 2026)",
      "Incubator Fellow (Fall 2025)",
      "Ideator Fellow (Spring 2025)",
    ],
    bullets: [
      "Mentor fellows through the Incubator phase, the build-and-launch stage, advising on product development & go-to-market",
      "Led creative direction as Creative Lead, designing social, web, print, & merch assets to promote programs & recruit fellows",
    ],
  },
  {
    org: "Texas Momentum",
    role: "Director of Design & Marketing",
    dates: "Spring 2025, Spring 2026",
    slug: "texas-momentum",
    bullets: [
      "Managed marketing & creative strategy for 40+ student interns, driving 60% higher event turnout & 150K+ organic views",
      "Led branding & outreach for a 24-hour Build-a-thon, attracting 60+ participants & 4 sponsors across UT Austin",
    ],
  },
];

/** Hosted PDF of the same résumé. */
export const RESUME_PDF_URL =
  "/RasikaPatelResume.pdf";
