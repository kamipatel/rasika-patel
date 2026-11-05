# Copy audit

Every string changed, with why it read as AI and the rewrite. Line numbers are from before the edits.

## Home (/)

| Where | Current | Why | Rewrite |
|---|---|---|---|
| `src/Portfolio.jsx:561` | Building at the intersection of storytelling and systems. | Your flagged line. "At the intersection of" fits anyone's portfolio. | I build apps, then I get people to use them. |
| `src/Portfolio.jsx:658` | A product marketer at McCombs who builds with AI. I make products and the campaigns that get people using them. | Second sentence now repeats the new hero line. Cut. | A product marketer at McCombs who builds with AI. |
| `src/Portfolio.jsx:676` | I love finding the intersection between storytelling and systems... From building Xplore Austin solo with Claude Code to driving 150K+ organic views at Texas Momentum to interning in marketing at ServiceNow, I'm drawn to building and shipping real things. Now I'm at the Harkey Institute... | Your flagged paragraph. "From X to Y to Z" opener, "drawn to", "real things". | I built Xplore Austin solo with Claude Code. I ran marketing at Texas Momentum, where our content hit 150K+ organic views. This summer I interned in marketing at ServiceNow in New York. Now I'm at the Harkey Institute at McCombs, running marketing for the entrepreneurship programs and building Claude workflows that turn our Meta analytics into what to post next. |
| `src/Portfolio.jsx:681` | When I'm not designing in Figma, I'm sketching wireframes, curating playlists, exploring Austin's food scene, or hunting for the best matcha in the city. Always happy to share my recs. I love brainstorming ways to connect Austin's creative community through local businesses, art, and tech. | Your flagged last sentence is cut. "Curating" is on the banned list. | When I'm not in Figma, I'm making playlists, trying food around Austin, or hunting for the best matcha in the city. Always happy to share my recs. |
| `src/Portfolio.jsx:692` | Design & Data • Strategy & Vision • Brand & Product • | Abstract buzzword pairs. Names the real tools instead. | Figma • Claude Code • Canva • Airtable • |
| `src/Portfolio.jsx:693` | Digital Experiences • Human Centric • Creative Direction • | Same. Fits any portfolio. Names what I actually make. | Apps • Websites • Instagram • Flyers • |
| `src/Portfolio.jsx:701` | Selected Work (small label above the heading) | The small label would now repeat the heading. Cut. | (cut) |
| `src/Portfolio.jsx:706` | Things I've Built & Designed | Your flagged cute section name. | Selected work |
| `src/components/RadialOrbitalTimeline.jsx:256` | Timeline (small label above the heading) | The small label would now repeat the heading. Cut. | (cut) |
| `src/components/RadialOrbitalTimeline.jsx:278` | Project Orbit | Your flagged cute section name. | Timeline |
| `src/Portfolio.jsx:736` | Skills & Tools (small label above the heading) | The small label would now repeat the heading. Cut. | (cut) |
| `src/Portfolio.jsx:741` | What I Work With | Your flagged cute section name. | Tools |
| `src/Portfolio.jsx:836` | Relevant Coursework | Sentence case. | Relevant coursework |
| `src/Portfolio.jsx:870` | Let's build something together | Generic closer on every portfolio. | Get in touch |
| `src/Portfolio.jsx:932` | ✨ Message sent! Thanks for reaching out. | Decorative emoji and exclamation point. | Message sent. Thanks for reaching out. |
| `src/Portfolio.jsx:985` | Send Message | Sentence case. | Send message |
| `src/Portfolio.jsx:590` | View My Work | Sentence case. | View my work |
| `src/Portfolio.jsx:591` | Get in Touch | Sentence case. | Get in touch |
| `src/Portfolio.jsx:1012` | Made with big ideas and too much coffee | Template footer joke. Cut. | (cut) |
| `src/Portfolio.jsx:640` | ✦ between marquee items (5 marquees) | Decorative ✦ in text people read. | · between marquee items |
| `src/Portfolio.jsx:103` | Sales Growth | Sentence case. | Sales growth |
| `src/Portfolio.jsx:104` | Organic Views | Sentence case. The number is under Needs Rasika. | Organic views |
| `src/components/ProjectCard.jsx:317` | View Project → | Sentence case. | View project → |

## Project cards and /projects/* pages

| Where | Current | Why | Rewrite |
|---|---|---|---|
| `src/data/projects.js:11` | A student-driven mobile app connecting UT Austin students to small and student-run businesses through curated lists, peer recommendations, and exclusive deals. Available on the App Store, and selected as a Kendra Scott WELI Spark Founder venture. | Your flagged card. "Student-driven", "curated", three-item list, and it cut off at "throug...". | Built the app UT students open to see what's on near campus today. |
| `src/data/projects.js:13` | Social content, an Airtable content calendar, AI social analytics, and event design for McCombs' entrepreneurship institute. | Four-item list. Your full rewrite is on the page; a small card only fits this much without cutting off. | Run social and Claude analytics workflows at McCombs. |
| `src/data/projects.js:13` | Social content and the Airtable content calendar for the entrepreneurship institute at McCombs, plus AI workflows in Claude that analyze the Institute's Meta analytics and surface engagement patterns to guide content strategy... | Your flagged line. "Surface", "guide content strategy". | I run social and the content calendar for UT's entrepreneurship institute. I built Claude workflows that read our Meta analytics and show what's working. I also designed the Longhorn Market flyer and stickers. |
| `src/data/projects.js:13` | AI social analytics (impact slot) | Impact slot held a non-number. No real number on the page, so the slot is removed. | (slot removed) |
| `src/data/projects.js:14` | Custom websites for small business owners, end to end from branding and design through development and launch. | "End to end". The card now has a short line that won't cut off. | Card: Build websites for small businesses. Page: I design and build websites for small businesses, including the branding. |
| `src/data/projects.js:15` | Handcrafted coffee syrups | "Craft" is on the banned list. Plain name of the product. | Coffee syrups |
| `src/data/projects.js:19` | Led creative + marketing for 40+ student interns across two program cycles. Designed campaigns, merch, and event branding that hit 150K+ organic views. | Three-item list, and the card cut off at "two...". | Card: Led marketing for 40+ student interns. Page: I led design and marketing for 40+ student interns across two program cycles. Our content hit 150K+ organic views. |
| `src/data/projects.js:20` | Creative direction and fellow mentorship for a student social-entrepreneurship fellowship. | Abstract noun stack. Says what I actually did. | Mentor fellows, after a term as Creative Lead. |
| `src/data/projects.js:20` | Mentoring fellows through the Incubator build-and-launch phase on product development and go-to-market, after leading creative direction across social, web, print, and merch. | One long gerund sentence. | I mentor fellows through the Incubator, the build-and-launch phase. Before that I was Creative Lead, designing social, web, print, and merch. |
| `src/data/projects.js:20` | Full brand ownership (impact slot) | Your flagged vague claim. No real number on the page, so the slot is removed. | (slot removed) |
| `src/data/projects.js:21` | Digital marketing assets in Figma and Canva for UT's CID programs and events. Tags: Graphic Design / Adobe Suite | Tag fix: the work was Figma and Canva, not Adobe. Line shortened to fit the card. | Designed Figma and Canva assets for UT's CID programs. Tags: Figma / Canva |
| `src/data/projects.js:21` | Digital marketing assets in Figma and Canva promoting UT's CID programs, events, and partnerships, driving a ~35% increase in program registration over two semesters. | Fragment with a three-item list. | I designed marketing assets in Figma and Canva for UT's CID programs and events. Registration rose ~35% over two semesters. |
| `src/data/projects.js:22` | UX consulting for two Texas Convergent clients: HerdUp, a UT student-to-org discovery app, and Well Water Finders, a groundwater startup where a clearer UI flow saved the client $9,000 per drill test. | "Student-to-org discovery" is abstract. The card now has a short line. | Card: Did UX consulting for HerdUp and Well Water Finders. Page: I did UX consulting for two clients: HerdUp, a UT app for finding student orgs, and Well Water Finders, a groundwater startup where a clearer UI flow saved $9,000 per drill test. |
| `src/data/projects.js:23` | SEO strategy and a data-driven content roadmap for Baya Systems. | "Data-driven" doesn't name the data. | Ran SEO and a content roadmap for Baya Systems. |
| `src/data/projects.js:23` | Optimized Baya Systems' SEO strategy and designed a data-driven content roadmap, increasing organic traffic by 40% and improving Google ranking for 10+ key terms. | "Data-driven", and resume phrasing on a project page. | I reworked Baya Systems' SEO and built a content roadmap. Organic traffic rose 40%, and 10+ key terms ranked higher on Google. |
| `src/data/projects.js:24` | Full rebrand and marketing strategy for an Austin small business. | Could be anyone's. Names the real thing. | Rebranded an Austin farmers market stall. |
| `src/data/projects.js:24` | Full rebrand and marketing strategy for an Austin small business, increasing sales by 121% with 200+ repeat customers. | Same. | I rebranded this Austin farmers market stall. Sales rose 121%, with 200+ repeat customers. |
| `src/data/projects.js:25` | High-fidelity mobile wireframes for a UT student-to-org discovery platform. | "Student-to-org discovery platform" is abstract. | High-fidelity wireframes for a UT app for finding student orgs. |
| `src/data/projects.js:25` | High-fidelity mobile wireframes for a UT platform connecting students to organizations through personalized discovery and filtering. | Your flagged line. Rewritten from what the screens actually do. | High-fidelity wireframes for a UT app. Students add their major and interests, then follow orgs and see their events. |
| `src/data/projects.js:25` | Full prototype (impact slot) | Non-number in the impact slot. No real number on the page, so the slot is removed. | (slot removed) |
| `src/data/projects.js:26` | Full UI flow for a groundwater startup, reducing client testing costs by $9,000 per drill through clearer decision-making. | "Through clearer decision-making" says nothing. | Full UI flow for a groundwater startup. It saved the client $9,000 per drill test. |
| `src/data/projects.js:12` | ServiceNow category: Design | Card said DESIGN because of the "Program Design" tag. This was a marketing internship. | ServiceNow category: Marketing |

## Project page labels

| Where | Current | Why | Rewrite |
|---|---|---|---|
| `src/components/ProjectPage.jsx:278` | Swipe to explore (2 places) | "Explore" filler. | Swipe |
| `src/components/ProjectPage.jsx:755` | User Interfaces / Project Gallery | Sentence case. | User interfaces / Project gallery |
| `src/components/ProjectPage.jsx:95` | Live Demo | Sentence case. | Live demo |
| `src/components/ProjectPage.jsx:99` | Canva Design | Sentence case. | Canva design |
| `src/data/project-images.json:31` | Identity & Branding | Sentence case. | Identity & branding |
| `src/data/project-images.json:38` | Social Media Graphics | Sentence case. | Social media graphics |
| `src/data/project-images.json:46` | Course Promotion | Sentence case. | Course promotion |
| `src/data/project-images.json:55` | Spring 2026 Course Poster | Sentence case. | Spring 2026 course poster |
| `src/data/project-images.json:61` | Assets & Stickers | Sentence case. | Assets & stickers |
| `src/data/project-images.json:131` | Business Cards | Sentence case. | Business cards |
| `src/data/project-images.json:140` | Spring 2026 Recruitment Timeline | Sentence case. | Spring 2026 recruitment timeline |
| `src/data/project-images.json:155` | Longhorn Market Flyer | Sentence case. | Longhorn Market flyer |
| `src/data/project-images.json:161` | Longhorn Market Stickers | Sentence case. | Longhorn Market stickers |
| `src/data/project-images.json:169` | Harkey Stickers | Sentence case. | Harkey stickers |
| `src/data/project-images.json:91` | Business Plan | Sentence case. | Business plan |

## /resume

| Where | Current | Why | Rewrite |
|---|---|---|---|
| `src/components/ResumePage.jsx:357` | Where I've Worked | Your flagged section name. | Experience |
| `src/components/ResumePage.jsx:371` | Things I've Started & Led | Your flagged section name. | Leadership |
| `src/components/ResumePage.jsx:385` | What I Work With | Your flagged section name. | Tools |
| `src/data/resume.js:33` | Build AI workflows in Claude on the Institute's Meta analytics, surfacing engagement patterns that guide content strategy | "Surfacing", "guide content strategy". | Build Claude workflows that read our Meta analytics and show what's working |
| `src/data/resume.js:44` | Led rebuild of the Executive Briefing Center Speakers Bureau; diagnosed 4 root causes of underuse via stakeholder interviews | Adds the real interview count. | Led the rebuild of the Executive Briefing Center Speakers Bureau, with 15+ stakeholder interviews and 4 root causes found |
| `src/data/resume.js:45` | Reactivated 500+ dormant speaker profiles and updated 450 expertise notes, making participation trackable for the first time | Wrong numbers. "Reactivated", "500+", and "450" removed. | Rewrote 438 expertise notes, standardized 443 bios, and set 300 enrollment dates so participation is trackable |
| `src/data/resume.js:46` | Built an 8-step self-serve onboarding flow and AI roleplay-scored certification (75% pass threshold), replacing manual intake | Wrong pass mark. Now matches the case study. | Designed an application-based model with an AI roleplay certification (80% pass mark) and presented it to ~10 directors |
| `src/data/resume.js:56` | Designed and executed digital marketing assets in Figma and Canva to promote CID programs, events, and partnerships across UT, driving a ~35% increase in program registration over two semesters | "Designed and executed" is padding. | Designed marketing assets in Figma and Canva for CID programs and events; registration rose ~35% over two semesters |
| `src/data/resume.js:57` | Produced campus-wide collateral (posters, flyers, stickers, apparel, and Instagram content) for CID courses and events | "Campus-wide collateral" is corporate. | Made posters, flyers, stickers, apparel, and Instagram content for CID courses and events |
| `src/data/resume.js:67` | Designed a data-driven content roadmap and analytics dashboard, boosting client engagement rates by 25% and CTR by 18% | "Data-driven". | Built a content roadmap and analytics dashboard that raised client engagement 25% and CTR 18% |
| `src/data/resume.js:76` | Designed the UI in Figma for HerdUp, a student organization platform improving accessibility and engagement for 24K+ UT users | "Improving accessibility and engagement" is vague. | Designed the UI in Figma for HerdUp, a student organization platform for 24K+ UT users |
| `src/data/resume.js:96` | Built and scaled a print-on-demand Etsy shop to $6K+/month in revenue through social and SEO-driven marketing | Tighter. | Built and scaled a print-on-demand Etsy shop to $6K+/month in revenue through social and SEO |
| `src/data/resume.js:111` | Founded and shipped an App Store mobile app connecting UT Austin students to small and student-run businesses through curated lists, peer recommendations, and exclusive deals, reaching 700+ downloads | "Curated", three-item list. Matches the case study. | Shipped the App Store app UT students open to see what's on near campus today, with 700+ downloads and 300+ student accounts |
| `src/data/resume.js:113` | Grew a campus content engine to 300K+ organic views and 1.2K+ followers with zero paid spend, including 127K views in a 30-day period | Wrong numbers. "300K+", "1.2K+", and "127K" removed. "Content engine" is corporate. | Grew Instagram to 246K views in the last 90 days and 1.3K+ followers with $0 ad spend |
| `src/data/resume.js:114` | Developed a ranked local-guide content format that drove 100K views and 3.7K shares on a single post, 79% from non-followers | Wrong numbers. "100K", "3.7K", and "79%" removed. | Made a ranked list that hit 118,946 views and 4,269 shares, 96% from non-followers |
| `src/data/resume.js:115` | Selected as a Kendra Scott WELI Spark Founder (Jan – May 2026) for mentorship and support to grow monetization and expansion | The tail says nothing specific. Cut. | Selected as a Kendra Scott WELI Spark Founder (Jan – May 2026) |
| `src/data/resume.js:126` | Build and deploy custom websites for small business owners end to end, from branding and design to development and launch | "End to end". | Design and build websites for small businesses, from branding to launch |

## /work/xplore

| Where | Current | Why | Rewrite |
|---|---|---|---|
| `src/data/xplore.js:88` | Students don't need more reviews. They need a decision. | "Don't need X, need Y" contrast. The page keeps its one allowed contrast below. | Students need a decision. |
| `src/data/xplore.js:97` | Every feature had to pass one test: can a UT student decide where to go in under 10 seconds? | Colon reveal into a rhetorical question. | Every feature had to help a UT student decide where to go in under 10 seconds. |
| `src/data/xplore.js:117` | Here's what that looks like day to day. | Your flagged colon-reveal phrase. Cut. | (cut) |
| `src/data/xplore.js:135` | AI picks the filters. The database picks the places. So every result is a real listing. | Punchy fragment pair. | AI only picks the filters, so every result is a real listing. |
| `src/data/xplore.js:153` | 3x the events. I stopped typing them. | Punchy fragment pair. | 3x the events with no typing. |
| `src/data/xplore.js:194` | Instagram did the marketing. Zero ad spend. | Punchy fragment pair. | I grew it on Instagram with $0 in ads. |
| `src/data/xplore.js:256` | Usage follows the calendar, not the feature list. | Second "X, not Y" on the page. | Usage follows the campus calendar. |
| `src/data/xplore.js:285` | Businesses pay. Students never do. | Punchy fragment pair. | Only businesses pay. |
| `src/data/xplore.js:297` | Downloads are noise. Coming back is the signal. | Punchy fragment pair. | Coming back matters more than downloads. |
| `src/data/xplore.js:297` | Getting people in was never the hard part. What happens after day one is. | "Never X, Y" reveal. | The hard part is what happens after day one. |
| `src/data/xplore.js:298` | Students follow taste, not crowds. | Third "X, not Y" on the page. | Students follow taste. |
| `src/pages/XploreCaseStudy.jsx:953` | What's next. hand daily operations... | Your flagged punctuation. | What's next: hand daily operations... |
| `src/pages/XploreCaseStudy.jsx:964` | Download the app, scroll the feed, or ask me how any of it works. | List of three. | Get the app, or ask me how any of it works. |

## /work/servicenow

| Where | Current | Why | Rewrite |
|---|---|---|---|
| `src/data/servicenow.js:20` | Case Study | Sentence case. | Case study |
| `src/data/servicenow.js:38` | The Context | Sentence case. | The context |
| `src/data/servicenow.js:57` | How I Found the Real Problem | Sentence case. | How I found the real problem |
| `src/data/servicenow.js:74` | What Was Breaking | Sentence case. | What was breaking |
| `src/data/servicenow.js:86` | The Reframe | Sentence case. | The reframe |
| `src/data/servicenow.js:97` | Two Ways In | Sentence case. | Two ways in |
| `src/data/servicenow.js:108` | The New Flow | Sentence case. | The new flow |
| `src/data/servicenow.js:137` | The Application | Sentence case. | The application |
| `src/data/servicenow.js:209` | Building Trust | Sentence case. | Building trust |
| `src/data/servicenow.js:229` | The Data Work | Sentence case. | The data work |
| `src/data/servicenow.js:248` | Twelve Weeks | Sentence case. | Twelve weeks |
| `src/data/servicenow.js:280` | What I Left Behind | Sentence case. | What I left behind |
| `src/data/servicenow.js:297` | What I Took From It | Sentence case. | What I took from it |
| `src/data/servicenow.js:306` | Also This Summer | Sentence case. | Also this summer |
| `src/data/servicenow.js:192` | The Highest-Leverage Change | "Leverage" is on the banned list. | The biggest change |
| `src/data/servicenow.js:197` | The acceptance email was the single highest-leverage moment in the flow. Turning a yes into a feeling of being chosen is what got people to finish their profile. | "Leverage" again. | The acceptance email mattered more than any other step. Feeling chosen is what got people to finish their profile. |
| `src/data/servicenow.js:75` | Four root causes, not one. | Extra "X, not Y". The page keeps "Membership should be something you earn, not a form you fill out." | Four root causes. |
| `src/data/servicenow.js:76` | The root cause was the model, not the technology. | Extra "X, not Y". | The real problem was the model. |
| `src/data/servicenow.js:60` | The biggest find was that speakers were being sourced by word of mouth, not by the platform built to source them. | Extra "X, not Y". | Speakers were coming from word of mouth. The platform built to find them sat unused. |
| `src/data/servicenow.js:64` | Great presenters are prepared and comfortable, not just smart. | "Not just X" contrast. | Great presenters are also prepared and comfortable. |
| `src/data/servicenow.js:198` | I worded it to signal progression, not final acceptance, so nobody gets false hope | Extra "X, not Y". | I worded it as a step forward, so nobody gets false hope |
| `src/data/servicenow.js:160` | Pay it forward: every applicant surfaces one or two more. | "Surface" as a verb. | Pay it forward: every applicant names one or two more. |
| `src/data/servicenow.js:194` | Long, dense, ignored. | List of three. | Long and ignored. |
| `src/data/servicenow.js:195` | Short, warm, one action. | List of three. | Short, with one button. |
| `src/data/servicenow.js:300` | The acceptance moment is load-bearing. | "Load-bearing" is an AI favorite. | The acceptance email mattered most. |
| `src/data/servicenow.js:301` | Announcements don't drive adoption. | "Drive" with no number. | Announcements don't work. |
| `src/pages/ServiceNowCaseStudy.jsx:236` | More Work | Sentence case. | More work |
| `src/pages/ServiceNowCaseStudy.jsx:237` | Get in Touch | Sentence case. | Get in touch |

## Titles, meta, and Open Graph

| Where | Current | Why | Rewrite |
|---|---|---|---|
| `src/lib/routeMeta.js:35` | How I built and grew Xplore Austin solo with AI: Claude Code, an AI event pipeline, data-driven calls, and 246K Instagram views in 90 days with zero ad spend. | "Data-driven", colon reveal, and a list. | How I built Xplore Austin solo with Claude Code and got 246K Instagram views in 90 days with $0 in ads. |
| `index.html:26` | Rasika Patel: Building at the intersection of storytelling and systems. | Your flagged line, in the share image alt text. | Rasika Patel: I build apps, then I get people to use them. |
| `scripts/og-image.html:90` | Building at the intersection of storytelling and systems. (in og-image.png) | The old tagline is baked into the share image. PNG regenerated from this file. | I build apps, then I get people to use them. |

## Technical fixes

| # | Fix | What changed |
|---|-----|--------------|
| 1 | Count-up stats | `CountUp` now keeps the real value as the DOM text and only animates as it scrolls in. The home stats and ServiceNow impact numbers both use it. `scripts/prerender.js` adds a `<noscript>` block with the real home stats to `dist/index.html`. |
| 2 | Random-character background | The string moved from text into a `data-chars` attribute drawn by CSS, so it stays aria-hidden and is no longer in page text. The hover effect looks the same. |
| 3 | Emoji on cards | Removed from every project card. |
| 4 | Non-numbers in the impact slot | Harkey, SELL, and HerdUp had no real number, so the slot is removed on the card and the page. |
| 5 | Tags and categories | CID tags are now Figma and Canva. ServiceNow category is now Marketing. CID stays Design. The other 8 cards fit their work. |
| 6 | Xplore "What's next" | Punctuation fixed. |
| 7 | Resume PDF | No source existed, so `scripts/resume-pdf.js` now builds it from `src/data/resume.js` with headless Chrome. Run `npm run resume-pdf` after changing the resume data. Text confirmed with a PDF reader, since `pdftotext` isn't installed. |

Also needed for your grep: em dashes removed from code comments in `src/`, and the `leverage` export in `src/data/servicenow.js` renamed to `acceptance`.

## Grep exceptions

Hits left after the final grep of `src/`, `index.html`, and `dist/`, and why each stayed:

- **"not a review app"**: the one you allowed.
- **"showcase" (4 in `src/data/servicenow.js`)**: the speaker type name. See Needs Rasika.
- **"driving" (2 in `src/data/resume.js`)**: both have real numbers (121% and 60%), which your rule allows.
- **✦ in the favicon**: an icon, not text people read. It's in every built HTML file.
- **`--surface-hover`, `drive.google.com`, "Google Drive"**: a CSS variable, a URL, and a product name.
- **"seamless", "surface", "drive" in the JS bundle**: library code. "Showcase" there is the speaker type above.

## Needs Rasika

Nothing below was changed.

1. **"400K+ organic views" on the home stats band.** It isn't in your fact list. Xplore's 246K plus Texas Momentum's 150K+ is about 396K, so it may be rounded up.
2. **"11 projects" on the home stats band.** The grid shows 10 cards, `projects.js` has 12 entries, and the marquee lists 11.
3. **Harkey job title.** `index.html` structured data says "Marketing & Campus Engagement Intern". The resume and card say "Communications & Campus Engagement Intern".
4. **CID number.** The card says "35% registration lift". The resume and project page say "~35%".
5. **Xplore start date.** The dates say "Feb 2025 – Present", but the case study timeline starts in Jan 2025.
6. **"Showcase Presenter" on /work/servicenow.** "Showcase" is banned, but this is the speaker type name from your form spec, so I left it (3 uses plus one fake review note).
7. **ServiceNow onboarding order.** The mockup shows Certification done before Profile setup, but the new flow puts Profile completion (step 4) before Certification (step 7). Both follow your spec.
8. **ServiceNow workarounds.** The copy says "7+ informal workarounds". The diagram shows six plus the official platform.
9. **ServiceNow ratings mockup.** The breakdown bars reuse 4.5 and 4.1 so no new numbers were added, which makes both bars identical.
10. **ServiceNow card color.** The green gradient on the home card could read as ServiceNow green. It's from before the redesign.
