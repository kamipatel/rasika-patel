/*
 * Narrative content for the /work/servicenow case study.
 * Deliberately free of internal system names, colleague names, seniority
 * codes, and unreleased roadmap detail.
 */

export const hero = {
  title: "Rebuilding the Speakers Bureau",
  deck: "Redesigning how a Fortune 500 company recruits, vets, and retains its executive speakers.",
  meta: [
    "ServiceNow",
    "Marketing Associate Intern, Executive Engagement Strategy & Field Alignment",
    "Summer 2026",
    "New York",
  ],
};

export const context = {
  eyebrow: "The Context",
  heading: "High-stakes meetings, sourced by hand.",
  body: [
    "ServiceNow's Executive Briefing Centers run high-stakes meetings with enterprise customers, and those meetings need internal experts to present. The system for finding and enrolling those speakers ran almost entirely by hand.",
    "I was given a walkthrough, watched the manual process, and shadowed a live briefing to see what the stakes actually were.",
  ],
};

export const discovery = {
  eyebrow: "How I Found the Real Problem",
  heading: "I didn't send a survey.",
  body: [
    "I talked to stakeholders across Company Marketing and kept asking follow-ups past the first answer.",
  ],
  pull: "The biggest find was that speakers were being sourced by word of mouth, not by the platform built to source them.",
  after: [
    "That reframed the whole project. The tool wasn't underused because people disliked it. It was underused because it couldn't answer the question people actually had, which was “who can speak credibly on this niche topic to this audience.”",
  ],
};

export const breaking = {
  eyebrow: "What Was Breaking",
  heading: "Four root causes, not one.",
  columns: [
    { name: "Trust", detail: "No quality vetting, stale profiles, onboarding friction" },
    { name: "Discovery", detail: "Niche expertise was unsearchable, profiles incomplete" },
    { name: "Incentives", detail: "Managers gatekeep, no reason for strong speakers to opt in" },
    { name: "Reach", detail: "Regional coverage gaps and speaker burnout" },
  ],
};

export const reframe = {
  eyebrow: "The Reframe",
  statement: "Membership should be something you earn, not a form you fill out.",
  points: [
    "Vetting and certification so only qualified speakers enroll",
    "Messaging that frames acceptance as recognition",
    "Tracking that makes participation visible and rewardable",
  ],
};

export const designed = {
  eyebrow: "What I Designed",
  intro: "A system that replaced an untracked manual process end to end.",
  items: [
    "A two-path entry model: executive nomination for fast-tracked speakers, and open application for everyone else",
    "An eight-step application-to-enrollment flow replacing an untracked manual process",
    "A five-to-ten minute application form, with a peer-referral field built in so every applicant surfaces one or two more",
    "An onboarding flow that pre-fills from the application and uses AI to draft speaker bios and expertise notes for review",
    "A certification gate: a custom AI roleplay scenario scored on tone, conciseness, charisma, and technical knowledge, with a minimum score to enroll",
    "Five lifecycle email templates covering application received, acceptance, waitlist, decline, and manager notification",
    "A ratings module surfacing post-briefing scores so the next person booking a speaker can trust the pick",
  ],
};

export const leverage = {
  eyebrow: "The Highest-Leverage Change",
  heading: "One email did most of the work.",
  before: { label: "Before", quote: "Please complete your enrollment.", note: "Long, dense, ignored." },
  after: { label: "After", quote: "Congratulations, you've been selected.", note: "Short, warm, one action." },
  closing:
    "The acceptance email was the single highest-leverage moment in the flow. Turning a yes into a feeling of being chosen is what got people to finish their profile.",
};

export const impact = {
  eyebrow: "Impact",
  delivered: {
    label: "Delivered",
    stats: [
      { value: "450", label: "Expertise notes updated" },
      { value: "300", label: "Enrollment dates set, making participation trackable for the first time" },
    ],
  },
  projected: {
    label: "Projected",
    note: "Projected over the first months of rollout — not measured results.",
    stats: [
      { value: "30-50%", label: "Increase in platform use" },
      { value: "20-40%", label: "Faster speaker sourcing" },
    ],
  },
};

export const handoff = {
  eyebrow: "What I Left Behind",
  heading: "Documented for handoff.",
  body: [
    "I documented the whole system for handoff: a master log, a handoff guide, a workflow playbook, an applicant guide, and a community survey to track completion and training gaps.",
    "The work is being built out now.",
  ],
};

export const takeaway = {
  eyebrow: "What I Took From It",
  heading: "Announcements don't drive adoption.",
  body: [
    "Emails and channel posts barely moved anyone. What worked was live, in-person enablement, and that changed how I plan every rollout since.",
  ],
};
