/*
 * Narrative content for the /work/servicenow case study.
 *
 * Public page about a former employer: no colleague names, no internal tool
 * names, no level codes, and no numbers beyond the ones below. Every mockup
 * uses fake data. Plain JS (no JSX, no asset imports) so the prerender script
 * can import it in Node for the no-JS fallback.
 */

export const MOCK_CAPTION = "Recreated for my portfolio. Names, data and internal tools changed.";

/* The fake applicant used across every mockup. */
export const applicant = {
  name: "Jordan Lee",
  title: "Solutions Consultant",
  location: "New York",
};

export const hero = {
  label: "Case study",
  title: "Rebuilding the Speakers Bureau",
  deck: "Redesigning how a Fortune 500 company finds, vets, and keeps the experts who speak to its biggest customers.",
  meta: [
    "ServiceNow",
    "Marketing Associate Intern, Company Marketing (Executive Experience)",
    "May to Aug 2026, 12 weeks",
    "New York",
  ],
  glance: [
    "15+ stakeholder interviews",
    "438 expertise notes rewritten",
    "443 bios standardized",
    "Presented to ~10 directors",
  ],
};

export const context = {
  label: "The context",
  heading: "High-stakes meetings, sourced by hand.",
  body: "ServiceNow's Executive Briefing Centers host meetings with C-suite and VP-level customers, and every one needs internal experts in the room. The Speakers Bureau was supposed to be where coordinators found them. In practice, 90 to 95% of profiles were dormant, and coordinators had given up on the official platform for 7+ informal workarounds.",
  channels: {
    title: "Seven channels, one system",
    sources: [
      { label: "Personal networks" },
      { label: "Word of mouth" },
      { label: "An internal who's-who doc" },
      { label: "Org chart searches" },
      { label: "Other request tools" },
      { label: "Customer advocate recs" },
      { label: "The official platform", ignored: true },
    ],
    target: "One application-based Bureau",
  },
};

export const discovery = {
  label: "How I found the real problem",
  heading: "I didn't send a survey.",
  body: "Week one, I got a walkthrough of the manual process and shadowed a live briefing. Then I ran 15+ interviews in two rounds, first to diagnose and then to co-design the fix, with briefing coordinators in New York and London, content and creative leads, the insights analyst, field marketing, and the platform's owner.",
  pull: "Speakers were coming from word of mouth. The platform built to find them sat unused.",
  insights: [
    { title: "The platform only knew what someone typed in.", detail: "Bios held the good detail, but nobody could search them." },
    { title: "Topic isn't enough.", detail: "A showcase presenter and a deep-dive expert are different jobs, so matching has to start from the agenda." },
    { title: "Expertise isn't presence.", detail: "Great presenters are also prepared and comfortable." },
    { title: "Coordinators won't book someone they can't vouch for.", detail: "Trust had to be built into the system." },
  ],
  quickWin: {
    label: "First-week quick win:",
    text: "worked with the platform's owner to make expertise notes keyword-searchable, live on the call.",
  },
};

export const breaking = {
  label: "What was breaking",
  heading: "Four root causes.",
  lead: "The real problem was the model. Open nomination let anyone in, so nobody valued being in.",
  columns: [
    { name: "Trust", detail: "No quality vetting, stale profiles, onboarding friction" },
    { name: "Discovery", detail: "Niche expertise was unsearchable, profiles incomplete" },
    { name: "Incentives", detail: "Managers gatekeep, no reason for strong speakers to opt in" },
    { name: "Reach", detail: "Regional coverage gaps and speaker burnout" },
  ],
};

export const reframe = {
  label: "The reframe",
  statement: "Membership should be something you earn, not a form you fill out.",
  points: [
    "Vetting and certification so only qualified speakers enroll",
    "Messaging that frames acceptance as recognition",
    "Tracking that makes participation visible and rewardable",
  ],
  pull: "The old system let anyone in and no one cared. The new system makes you earn it, and that's what makes people actually show up.",
};

export const paths = {
  label: "Two ways in",
  heading: "Two ways in, one bar.",
  lanes: [
    { name: "Nominated", steps: ["A senior leader nominates", "Skips the application", "Straight to onboarding"] },
    { name: "Open application", steps: ["Anyone applies (5 to 10 min)", "AI screen + human review every Friday", "AI roleplay certification"] },
  ],
  end: "Enrolled",
  caption: "We sequenced the nominated path first.",
};

export const flow = {
  label: "The new flow",
  heading: "From six leaky steps to one clear path.",
  before: {
    steps: [
      "Nomination form",
      "Manager approval",
      "12-field intake form",
      "Manual profile entry",
      "Welcome email",
      "Training email",
    ],
    caption: "High drop-off between every step. No reason to finish.",
  },
  after: {
    steps: [
      { label: "Apply", by: "speaker" },
      { label: "Team review", by: "team" },
      { label: "Conditional approval", note: "“Congratulations”", by: "team" },
      { label: "Profile completion", by: "speaker" },
      { label: "Team intake, AI drafts expertise notes", by: "team" },
      { label: "On-demand training", by: "speaker" },
      { label: "Certification", by: "speaker" },
      { label: "Enrolled", by: "speaker" },
    ],
  },
  legend: { speaker: "The speaker does this", team: "The team does this" },
};

export const application = {
  label: "The application",
  heading: "Short enough that strong speakers actually finish it.",
  form: {
    title: "Speaker Application",
    meta: "4 sections · 5 to 10 minutes",
    heardFrom: ["Self-nominated", "Peer referral", "Manager referral", "Event", "Other"],
    heardFromSelected: "Self-nominated",
    nearestCenter: "New York",
    topics: ["AI", "CRM", "IT", "HR", "Security & Risk", "Finance", "Customer Success", "Innovation"],
    topicsSelected: ["AI", "IT"],
    industries: ["Banking", "Healthcare", "Retail", "Manufacturing", "Public Sector", "Telecom"],
    industriesSelected: ["Banking", "Healthcare"],
    speakerTypes: ["Facilitator", "Showcase Presenter", "Live Demo Presenter", "Focus Topic Presenter"],
    speakerTypeSelected: "Live Demo Presenter",
    experiencePlaceholder: "Tell us about talks, demos, or briefings you've led, and who was in the room.",
    vouchPlaceholder: "Name or email",
    comfortScale: [1, 2, 3, 4, 5],
    comfortSelected: 4,
    referralPrompt: "Know 1 to 2 colleagues who'd be great speakers?",
  },
  annotations: [
    "5 to 10 minutes, so busy experts finish it.",
    "Speaker type is captured up front, so showcase presenters and deep-dive experts never get mixed up.",
    "Pay it forward: every applicant names one or two more.",
  ],
};

export const onboarding = {
  label: "Onboarding",
  heading: "No duplicate entry.",
  body: "Onboarding pre-fills everything from the application. AI drafts the bio and expertise notes, and the speaker just approves.",
  progress: [
    { label: "Application", state: "done" },
    { label: "Certification", state: "done" },
    { label: "Profile setup", state: "current" },
    { label: "Enrolled", state: "todo" },
  ],
  prefilled: [
    ["Name", "Jordan Lee"],
    ["Title", "Solutions Consultant"],
    ["Location", "New York"],
    ["Topics", "AI, IT"],
    ["Industries", "Banking, Healthcare"],
    ["Speaker type", "Live Demo Presenter"],
  ],
  bio: "Jordan Lee is a Solutions Consultant in New York who helps banking and healthcare teams put AI to work across IT. Known for calm, hands-on live demos with senior audiences.",
  gate: {
    title: "The certification gate",
    rubric: ["Tone", "Conciseness", "Charisma", "Technical knowledge"],
    threshold: "80%+ to enroll",
    body: "Before enrolling, speakers run a custom AI roleplay with an executive persona.",
  },
};

export const acceptance = {
  label: "The biggest change",
  heading: "One email did most of the work.",
  before: { label: "Before", subject: "Please complete your enrollment", note: "Long and ignored." },
  after: { label: "After", subject: "Congratulations, you've been selected", cta: "Set up your profile", note: "Short, with one button." },
  closing: [
    "The acceptance email mattered more than any other step. Feeling chosen is what got people to finish their profile.",
    "I worded it as a step forward, so nobody gets false hope if they don't pass certification.",
  ],
  manager: {
    title: "The note to a speaker's manager",
    before: "We need your permission.",
    after: "Your employee was selected. Congratulations.",
  },
  templates: "Five templates cover the whole flow: application received, acceptance, waitlist, decline, and manager notification.",
};

export const trust = {
  label: "Building trust",
  heading: "Give coordinators a reason to trust the pick.",
  body: "Ratings from post-briefing surveys plus who-said-what review notes, visible only to coordinators.",
  ratings: {
    external: { score: "4.5", count: "6 evals" },
    internal: { score: "4.1", count: "3 reviews" },
    briefings: "6",
    /* Breakdown reuses the overall scores so the mockup adds no new numbers. */
    breakdown: [
      { label: "Presenter quality", external: 4.5, internal: 4.1 },
      { label: "Content delivery", external: 4.5, internal: 4.1 },
    ],
    notes: [
      { who: "Briefing lead", date: "Jun 12", text: "Great with healthcare execs. Keep for focus topics." },
      { who: "Content lead", date: "Jun 12", text: "Strong live demo. Pair with a showcase presenter to open." },
    ],
  },
};

export const dataWork = {
  label: "The data work",
  heading: "The unglamorous part.",
  before: "IT, AI, cloud stuff. Did a few briefings.",
  after: [
    ["Core expertise", "AI for IT service workflows and cloud migration planning"],
    ["Best for", "Live demos and deep-dive sessions with IT leadership"],
    ["Solutions", "IT service management, AI automation, cloud operations"],
    ["Distinctive angle", "Former IT operations lead who explains change from the customer's side"],
    ["Industries", "Banking, Healthcare"],
  ],
  stats: [
    { value: "438", label: "expertise notes rewritten into this structure" },
    { value: "443", label: "bios standardized" },
    { value: "300", label: "enrollment dates set, so participation is trackable for the first time" },
    { label: "Industry labels remapped" },
  ],
};

export const timeline = {
  label: "Twelve weeks",
  phases: [
    { weeks: "Weeks 1 to 2", work: "Process audit, walkthrough, shadowed a live briefing" },
    { weeks: "Weeks 3 to 5", work: "15+ interviews, intake form audit" },
    { weeks: "Weeks 6 to 8", work: "Application model, 438 notes and 443 bios, leadership workshop" },
    { weeks: "Weeks 9 to 12", work: "Redrawn forms, handoff package, final presentation to leadership" },
  ],
  body: "In July I presented the model to about 10 directors at a leadership workshop. They endorsed it and handed it to the internal tech team to build.",
};

export const impact = {
  label: "Impact",
  delivered: {
    label: "Delivered",
    stats: [
      { value: "438", label: "Expertise notes rewritten" },
      { value: "443", label: "Bios standardized" },
      { value: "300", label: "Enrollment dates set" },
    ],
    outcome: "Model endorsed and handed off to be built",
  },
  projected: {
    label: "Projected",
    note: "Projected over the first months of rollout, not measured results.",
    stats: [
      { value: "30 to 50%", label: "More platform use" },
      { value: "20 to 40%", label: "Faster speaker sourcing" },
    ],
  },
};

export const handoff = {
  label: "What I left behind",
  heading: "Documented for handoff.",
  body: [
    "I documented the whole system for handoff: a master log, a handoff guide, a workflow playbook, an applicant guide, and a community survey to track completion and training gaps.",
    "The work is being built out now.",
  ],
  /* `kind` picks the tile icon in DocTiles. */
  docs: [
    { name: "Master log", kind: "sheet" },
    { name: "Handoff guide", kind: "guide" },
    { name: "Workflow playbook", kind: "workflow" },
    { name: "Applicant guide", kind: "applicant" },
    { name: "Community survey", kind: "survey" },
  ],
};

export const lessons = {
  label: "What I took from it",
  items: [
    { title: "Fix the model before the tool." },
    { title: "The acceptance email mattered most.", detail: "It turns a yes into commitment right where the old process lost people." },
    { title: "Announcements don't work.", detail: "Emails and channel posts barely moved anyone. What worked was live, in-person enablement, and that changed how I plan every rollout since." },
  ],
};

export const alsoThisSummer = {
  label: "Also this summer",
  items: [
    {
      kind: "Team pitch",
      text: "Rally, a fictional functional protein snack brand, built for an intern program case on AI-first consumer brands. Positioned against protein bars, with an LA pop-up and creator launch plan.",
    },
    {
      kind: "Market analysis",
      text: "Transportation and logistics as an underserved vertical, built from public industry data.",
    },
  ],
};
