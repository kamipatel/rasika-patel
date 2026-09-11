/*
 * Narrative content for the /work/xplore case study.
 * Kept separate from the page so the layout file stays presentation-only,
 * matching the src/data convention used by projects.js and resume.js.
 */

export const hero = {
  title: "Xplore Austin",
  deck: "A discovery app for UT students, and the content engine that grew it.",
  meta: ["Founder & UX Designer", "Jan 2025 – Present", "Austin, TX"],
  appStore: "https://apps.apple.com/us/app/xplore-austin/id6758564187",
};

export const sections = [
  {
    id: "problem",
    eyebrow: "The Problem",
    heading: "Discovery is fragmented, so students stop looking.",
    body: [
      "UT students default to the same handful of places. Not for lack of options — because discovery is scattered across Google, TikTok, and word of mouth, and none of those three agree with each other.",
      "The cost lands hardest on local and student-run businesses. They stay invisible to the students standing three blocks away.",
    ],
  },
  {
    id: "insight",
    eyebrow: "The Insight",
    heading: "Students don't want more reviews. They want a decision.",
    body: [
      "Every existing option hands you more input and leaves the judgment to you. That's the opposite of what someone deciding where to eat in ten minutes actually needs.",
      "So Xplore isn't a review app. It's a decision engine — curated, ranked, and opinionated enough to end the scroll.",
    ],
    pull: "Curated, ranked, and opinionated enough to end the scroll.",
  },
  {
    id: "research",
    eyebrow: "Research",
    heading: "The product was shaped before it was built.",
    body: [
      "Student interviews to find where discovery actually breaks. Usability testing on early flows. Surveys to size the pattern. Pricing validation with local owners to check the business side held up.",
      "Figma prototypes went in front of students until the flows stopped confusing them. Research shaped the product — it didn't justify it after the fact.",
    ],
    tags: [
      "Student interviews",
      "Usability testing",
      "Surveys",
      "Pricing validation",
      "Figma prototyping",
    ],
  },
  {
    id: "build",
    eyebrow: "Build",
    heading: "Shipped to the App Store, not to a prototype link.",
    body: [
      "Next.js and Supabase behind a native shell in Expo WebView, deployed on Vercel. Out through TestFlight for real student testing, then onto the App Store.",
    ],
    tags: ["Next.js", "Supabase", "Expo WebView", "Vercel", "TestFlight", "App Store"],
  },
];

export const gtm = {
  eyebrow: "Go To Market",
  heading: "Distribution was the product decision.",
  body: [
    "I tested content formats against each other rather than guessing. One pattern broke away immediately: ranked local guides massively outperformed standard posts.",
    "Not lifestyle shots. Not app screenshots. A ranked list that settles an argument — the kind of thing people send to a friend instead of just liking.",
  ],
};

/** Stat band under Go To Market. `value` drives the count-up animation. */
export const gtmStats = [
  { value: "200K+", label: "Organic views" },
  { value: "1K+", label: "Followers" },
  { value: "500+", label: "App downloads" },
  { value: "79%", label: "Reach from non-followers" },
];

export const matchaPost = {
  eyebrow: "Highlight",
  title: "Every Matcha in Austin, Ranked",
  image: "/xplore-matcha-post.png",
  alt: "Xplore Austin post — Every Matcha in Austin, Ranked: 10 spots ranked from 20 tried, with pop-ups flagged",
  note: "Shares is the number that matters. It means someone sent it to a friend rather than just double-tapping.",
  stats: [
    { value: "92K", label: "Views" },
    { value: "3.5K", label: "Shares" },
    { value: "2.4K", label: "Likes" },
  ],
};

export const next = {
  eyebrow: "What I'd Do Next",
  heading: "Turn attention into revenue.",
  body: [
    "Monetization: paid placement for the businesses already receiving attributable foot traffic, plus a student subscription for deals worth paying for.",
    "Business-side partnerships: make the ranked guides something local owners buy into as a product, not just content they happen to benefit from.",
  ],
};
