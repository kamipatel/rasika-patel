/*
 * Content for the /work/xplore case study.
 * Every number here comes from a dated source (App Store, Supabase, PostHog,
 * GitHub, or Instagram) as of Nov 4 2026. Update numbers here only; the page
 * reads everything from this file.
 */

export const APP_STORE_URL = "https://apps.apple.com/us/app/xplore-austin/id6758564187";
export const INSTAGRAM_URL = "https://www.instagram.com/xplore.austin/";

export const hero = {
  eyebrow: "Case study",
  title: "Xplore Austin",
  deck: "I built the app UT students open to see what's on near campus today. Solo, with AI, from first idea to the App Store.",
  roles: ["Founder", "Product", "Design", "Code with Claude Code", "Growth"],
  dates: "Feb 2025 – Present",
  screens: [
    { src: "/projects/xplore-austin/screens/home.png", alt: "Xplore Austin home screen with search, Pick For Me, recent reviews, and trending places near campus" },
    { src: "/projects/xplore-austin/screens/pick-for-me.png", alt: "Pick For Me screen asking where to go for a lunch break, with coffee, food, dessert, and retail options" },
  ],
};

export const proof = [
  { value: "700+", label: "App Store downloads" },
  { value: "300+", label: "UT student accounts" },
  { value: "400+", label: "Places, pop-ups and vendors" },
  { value: "1.3K+", label: "Instagram followers" },
];

export const SOURCES_NOTE =
  "Numbers as of Nov 4 2026, from the App Store, Supabase, PostHog, GitHub, and Instagram. People counts are unique devices with test traffic removed.";

/* The three things a recruiter should leave with. Tones map to the site-wide
   highlight colors: ai = violet, product = green, growth = orange. */
export const tldr = [
  {
    tone: "ai",
    target: "ai",
    title: "Built and run with AI",
    points: [
      "Shipped the whole app solo with Claude Code: 72 merged pull requests and 147 test files.",
      "An AI pipeline now adds campus events for me. 73 a month by hand became 222 a month on autopilot.",
    ],
  },
  {
    tone: "product",
    target: "decisions",
    title: "Decisions made from data",
    points: [
      "A 43% drop at the login wall made the app guest-first.",
      "Events got 6x the taps of specials, so Home now leads with what's happening.",
    ],
  },
  {
    tone: "growth",
    target: "growth",
    title: "Grown on Instagram, no ads",
    points: [
      "1.3K+ followers, more than 3x since March.",
      "One ranked list got 3,004 likes. Ad spend: $0.",
    ],
  },
];

export const timeline = [
  { date: "Jan 2025", text: "Starts as my SELL Fellowship project" },
  { date: "Dec 2025", text: "First usability test with a student" },
  { date: "Jan 2026", text: "First code, written with Claude" },
  { date: "Feb 2026", text: "Fixes 5 App Store review issues, then launches" },
  { date: "Mar 2026", text: "200+ downloads in the first 3 weeks" },
  { date: "Sept 2026", text: "AI vibe search ships" },
  { date: "Oct 2026", text: "AI starts running the event pipeline" },
  { date: "Nov 2026", text: "Payments go live for businesses" },
];

export const chapters = [
  { id: "problem", num: "01", label: "Problem" },
  { id: "product", num: "02", label: "Product" },
  { id: "ai", num: "03", label: "Built with AI" },
  { id: "decisions", num: "04", label: "Decisions" },
  { id: "growth", num: "05", label: "Growth" },
  { id: "traction", num: "06", label: "Traction" },
  { id: "business", num: "07", label: "Business" },
  { id: "lessons", num: "08", label: "Lessons" },
];

export const problem = {
  headline: "Students don't need more reviews. They need a decision.",
  quote:
    "Reviews assume you already have a shortlist. Students don't have a shortlist. They have twenty minutes and a vague craving.",
  body: "So they default to the same five places, and the local and student-run spots three blocks from campus stay invisible.",
};

export const product = {
  headline: "A decision engine, not a review app.",
  principle:
    "Every feature had to pass one test: can a UT student decide where to go in under 10 seconds?",
  screens: [
    { src: "/projects/xplore-austin/screens/home.png", label: "Home", alt: "Xplore Austin home screen" },
    { src: "/projects/xplore-austin/screens/pick-for-me.png", label: "Pick For Me", alt: "Pick For Me screen" },
    { src: "/projects/xplore-austin/screens/discover.png", label: "Discover", alt: "Discover screen with student-run businesses" },
    { src: "/projects/xplore-austin/screens/map.png", label: "Map", alt: "Map of places around the UT campus" },
  ],
  screensCaption: "Launch version, Feb 2026",
  features: [
    { icon: "zap", title: "Right now", text: "Live deals, happy hours, and events starting soon sit at the top of Home." },
    { icon: "dice", title: "Pick For Me", text: "One tap, one place, scored on reviews, distance, polls, and what's active." },
    { icon: "sparkles", title: "Vibe search", text: "Type \"somewhere quiet to study that's open now\" and AI turns it into filters.", ai: true },
    { icon: "ticket", title: "Show at the counter", text: "Deals open as a screen the cashier can read in one glance." },
    { icon: "calendar", title: "Pop-ups and events", text: "99 coming up right now. Pop-ups only show on the map while they're live." },
    { icon: "list", title: "Ranked lists", text: "My taste, in order, with exactly what to get. Never for sale." },
  ],
};

export const ai = {
  headline: "I built it solo with AI. Then I taught AI to run it.",
  intro: "I'm a marketing major, so I learned to run AI like an engineering team. Here's what that looks like day to day.",
  shipSteps: [
    { title: "One sentence", text: "I describe the feature the way a user would." },
    { title: "Spec from real data", text: "Claude checks the live database and analytics, then writes a scoped prompt." },
    { title: "Build in its own lane", text: "A Claude Code session builds it on its own branch, with tests." },
    { title: "Pull request", text: "Every change lands as a reviewable PR, never straight to production." },
    { title: "Verified live", text: "Claude checks it against production before I merge." },
  ],
  shipStats: [
    { value: "72", label: "Merged pull requests" },
    { value: "147", label: "Test files" },
    { value: "30+", label: "Production deploys in 3 weeks" },
    { value: "18", label: "Database migrations in those 3 weeks" },
  ],
  vibe: {
    title: "AI search that can't make things up",
    query: "somewhere quiet to study that's open now",
    filters: ["Study spot", "Quiet", "Open now", "Near campus"],
    note: "AI picks the filters. The database picks the places. So every result is a real listing.",
    meta: "Claude Haiku 4.5 · about 1/8 of a cent per search",
  },
  pipeline: {
    title: "The event pipeline runs itself",
    steps: [
      "A vendor posts a pop-up on Instagram",
      "Instinct, an AI agent, spots it and emails me",
      "A scheduled Claude task adds it 4x a day, with the right time, place, and no duplicates",
      "It shows up on Home",
      "The next morning's push tells students",
    ],
    chart: {
      title: "Events added to the app per month",
      bars: [
        { label: "Sept 2026", value: 73, note: "Mostly by hand" },
        { label: "Oct 2026", value: 222, note: "AI pipeline on" },
      ],
      takeaway: "3x the events. I stopped typing them.",
    },
  },
  scheduled: [
    { day: "Sun", text: "Sweep UT calendars for new events" },
    { day: "Wed", text: "Fill gaps so every weekday has 3+ things on" },
    { day: "Mon", text: "Health check on every automation" },
    { day: "Fri", text: "Analytics report in my inbox" },
  ],
  tools: ["Supabase", "Vercel", "PostHog", "Stripe", "GitHub", "Gmail", "Google Calendar", "Canva"],
  toolsNote: "Claude works directly inside these tools through MCP connectors.",
};

export const decisions = {
  headline: "I let the data make the calls.",
  cards: [
    {
      metric: "43%",
      saw: "of new people dropped off at the login wall.",
      did: "Made the app guest-first. Browse freely, sign in only to save or review.",
    },
    {
      metric: "2.5x",
      saw: "New people who open a place, event, or deal on day one come back 2.5x as often (20% vs 8%).",
      did: "Rebuilt Home to lead with live deals and events.",
    },
    {
      metric: "6x",
      saw: "Events got 6x the taps of weekly specials (28.6% vs 4.7%).",
      did: "Automated the event supply so every weekday has 3+ things on.",
    },
    {
      metric: "11",
      saw: "reviews written a month. But one ranked list got 3,004 likes.",
      did: "Bet on ranked lists over crowd reviews. Paid spots sit beside a list, never inside it.",
    },
  ],
  cut: "Also cut: DMs, a friend feed, and leaderboards. Almost nobody used them.",
};

export const growth = {
  headline: "Instagram did the marketing. Zero ad spend.",
  stats: [
    { value: "1,378", label: "Followers, up from 440 in March" },
    { value: "3,004", label: "Likes on one ranked list" },
    { value: "13.2K", label: "Views on a collab with a local cafe" },
    { value: "$0", label: "Spent on ads" },
  ],
  followers: {
    title: "Instagram followers",
    points: [
      { label: "Mar", value: 440 },
      { label: "Apr", value: 700 },
      { label: "Aug", value: 1000, approx: true },
      { label: "Nov", value: 1378 },
    ],
    annotation: "Summer in NYC, no posts. Still grew.",
  },
  posts: [
    {
      url: "https://www.instagram.com/p/DctuGyyEc6x/",
      title: "The best matcha in Austin, ranked",
      date: "Aug 31 2026",
      lesson: "Put the whole ranked list on slide one.",
      stats: "3,004 likes · 114 comments · 100K views · 3.7K shares",
    },
    {
      url: "https://www.instagram.com/p/Dd1r4jYkdHo/",
      title: "Everywhere you can use your Dine In Dollars",
      date: "Sept 28 2026",
      lesson: "Solve a real student problem: 25 spots, most people use 4.",
      stats: "1,051 likes",
    },
    {
      url: "https://www.instagram.com/p/DbFG1UKAO8f/",
      title: "Collab with a local matcha cafe",
      date: "Jul 21 2026",
      lesson: "Collabs reach people who don't follow you yet.",
      stats: "13.2K views · 130 shares",
    },
    {
      url: "https://www.instagram.com/p/DUzRYfZDNl2/",
      title: "Launch week giveaway",
      date: "Feb 15 2026",
      lesson: "Comment-to-enter turned launch week into a conversation.",
      stats: "557 comments",
    },
  ],
  learnings: [
    "Ranked lists win. Put the full list on slide one.",
    "Collabs reach people who don't follow you yet.",
    "Giveaways spike for a day. Lists keep paying off.",
  ],
};

export const traction = {
  headline: "Usage follows the calendar, not the feature list.",
  body: "When there's something happening near campus, students open the app. So the job became keeping the calendar full, which is exactly what the AI pipeline does.",
  chart: {
    title: "People who opened Xplore each month, 2026",
    bars: [
      { label: "Mar", value: 269 },
      { label: "Apr", value: 171 },
      { label: "May", value: 85 },
      { label: "Jun", value: 81 },
      { label: "Jul", value: 70 },
      { label: "Aug", value: 141 },
      { label: "Sept", value: 325 },
      { label: "Oct", value: 216 },
    ],
    annotations: [
      { at: "Mar", text: "Launch month" },
      { at: "Jun", text: "Summer in NYC, zero work" },
      { at: "Sept", text: "Welcome week + daily events" },
    ],
  },
  stats: [
    { value: "1,000+", label: "People since March" },
    { value: "47", label: "People on the best single day" },
    { value: "49", label: "Signups over the summer with zero work" },
    { value: "5.0", label: "App Store rating" },
  ],
};

export const business = {
  headline: "Businesses pay. Students never do.",
  cards: [
    { value: "$41.25", text: "What owners I surveyed said they'd pay each month, on average." },
    { value: "$20/mo", text: "Featured placement, live since Nov 2026, plus a $10 one-week boost." },
    { value: "Never", text: "Charge students, or sell a spot on a ranked list." },
  ],
};

export const lessons = {
  headline: "Three things I'd tell myself in January.",
  items: [
    { title: "Broken looks like boring.", text: "Three times, a feature \"nobody wanted\" was actually just broken. Check the plumbing before you kill the idea." },
    { title: "Downloads are noise. Coming back is the signal.", text: "Getting people in was never the hard part. What happens after day one is." },
    { title: "Students follow taste, not crowds.", text: "They won't write reviews. They will follow one person's ranked list." },
  ],
  next: "Next: hand daily operations to interns before I study abroad, land the first paying business, and connect Instagram so posting runs itself.",
};
