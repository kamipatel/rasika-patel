/*
 * Base styles for the ServiceNow case study. Layout, type, and the shared
 * "paper" mockup primitives live here; each visual carries its own rules.
 * Page colors come from the theme variables in index.css. Paper mockups use
 * their own fixed light palette so they read as product screens on the dark
 * page. --sn-small is the floor for small text: 12px on desktop, 14px on
 * phones.
 */
export const BASE_CSS = `
.sn {
  --sn-gutter: clamp(20px, 5vw, 64px);
  --sn-small: 12px;
  --sn-paper: #FBFAFD;
  --sn-paper-2: #F2EFF7;
  --sn-paper-line: #E3DEEC;
  --sn-ink: #1D1533;
  --sn-ink-mid: #4F4766;
  --sn-ink-dim: #6B6482;
  --sn-ink-accent: #C2410C;
  --sn-on-accent: #1D1533;
  --sn-ok: #047857;
  --sn-ok-bg: #E8F6EF;
  --sn-ok-line: #BFE5D2;
}
@media (max-width: 640px) { .sn { --sn-small: 14px; } }
.sn a { -webkit-tap-highlight-color: transparent; }
.sn-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.sn a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

.sn-wrap { max-width: 1120px; margin: 0 auto; padding: 0 var(--sn-gutter); }
.sn-section { padding: clamp(64px, 9vw, 112px) 0; border-top: 1px solid var(--border); }
.sn-eyebrow { display: flex; align-items: center; gap: 12px; margin: 0; font-family: var(--mono); font-size: var(--sn-small); font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); }
.sn-eyebrow-rule { width: 28px; height: 1px; background: currentColor; opacity: 0.6; flex-shrink: 0; }
.sn-h2 { font-family: var(--display); font-weight: 800; font-size: clamp(30px, 4.2vw, 52px); letter-spacing: -0.035em; line-height: 1.06; color: var(--text-light); margin: 18px 0 0; max-width: 860px; text-wrap: balance; }
.sn-h3 { font-family: var(--display); font-weight: 700; font-size: clamp(19px, 1.8vw, 22px); letter-spacing: -0.015em; line-height: 1.25; color: var(--text-light); margin: 0; }
.sn-lead { font-family: var(--body); font-weight: 300; font-size: clamp(17px, 1.6vw, 19px); line-height: 1.7; color: var(--text-mid); max-width: 680px; margin: 22px 0 0; }
.sn-body { font-family: var(--body); font-size: 15px; line-height: 1.6; color: var(--text-mid); margin: 0; }
.sn-label { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-dim); margin: 0; }
.sn-visual { margin-top: clamp(32px, 4.5vw, 52px); }
.sn-card { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: clamp(18px, 2.2vw, 26px); }
.sn-pull { font-family: var(--display); font-weight: 700; font-style: italic; font-size: clamp(22px, 2.8vw, 34px); line-height: 1.3; color: var(--text-light); border-left: 3px solid var(--accent); padding-left: clamp(18px, 2.4vw, 26px); margin: clamp(28px, 4vw, 44px) 0 0; max-width: 760px; }
.sn-caption { display: flex; gap: 8px; align-items: flex-start; font-family: var(--mono); font-size: var(--sn-small); line-height: 1.5; color: var(--text-mid); margin: 14px 0 0; }
.sn-caption svg { flex-shrink: 0; margin-top: 2px; }

/* Mockup beside its annotations; flipped puts the mockup on the right. */
.sn-split { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(28px, 4vw, 56px); align-items: center; }
.sn-notes { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
.sn-notes li { display: flex; gap: 14px; align-items: flex-start; font-family: var(--body); font-size: 16px; line-height: 1.55; color: var(--text-mid); }
.sn-marker { display: inline-grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: var(--accent); color: var(--sn-on-accent); font-family: var(--mono); font-size: var(--sn-small); font-weight: 700; flex-shrink: 0; }
@media (min-width: 900px) {
  .sn-split { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); }
  .sn-split.is-flipped { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); }
  .sn-split.is-flipped > :first-child { order: 2; }
}

/* Paper mockups */
.sn-mock { margin: 0; min-width: 0; }
.sn-paper { background: var(--sn-paper); color: var(--sn-ink); border-radius: 18px; box-shadow: 0 32px 64px -32px rgba(0, 0, 0, 0.75), 0 2px 8px rgba(0, 0, 0, 0.25); font-family: var(--body); font-size: 14px; line-height: 1.5; overflow: hidden; }
[data-theme="light"] .sn-paper { border: 1px solid rgba(23, 15, 46, 0.08); box-shadow: 0 24px 56px -28px rgba(23, 15, 46, 0.35), 0 1px 4px rgba(23, 15, 46, 0.12); }
.sn-paper-label { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.1em; text-transform: uppercase; color: var(--sn-ink-dim); margin: 0; }
.sn-pchip { display: inline-flex; align-items: center; gap: 6px; font-size: max(13px, var(--sn-small)); line-height: 1.3; border: 1px solid var(--sn-paper-line); border-radius: 999px; padding: 5px 12px; color: var(--sn-ink-mid); background: #fff; }
.sn-pchip.is-on { background: var(--accent); border-color: var(--accent); color: var(--sn-on-accent); font-weight: 600; }
.sn-pchips { display: flex; flex-wrap: wrap; gap: 8px; }
.sn-field { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 40px; border: 1px solid var(--sn-paper-line); background: #fff; border-radius: 10px; padding: 8px 12px; color: var(--sn-ink); min-width: 0; }
.sn-field.is-auto { background: var(--sn-paper-2); color: var(--sn-ink-dim); }
.sn-field.is-empty { color: var(--sn-ink-dim); }
.sn-pbtn { display: inline-flex; align-items: center; gap: 6px; border-radius: 10px; padding: 9px 16px; font-weight: 600; font-size: 14px; border: 1px solid var(--sn-paper-line); background: #fff; color: var(--sn-ink); }
.sn-pbtn.is-primary { background: var(--accent); border-color: var(--accent); color: var(--sn-on-accent); }
.sn-bar { display: block; height: 8px; border-radius: 99px; background: var(--sn-paper-line); }

/* Text sections */
.sn-glance { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; padding: 0; list-style: none; }
.sn-glance li { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-light); border: 1px solid var(--accent-dim); background: var(--accent-bg); border-radius: 999px; padding: 8px 14px; }
.sn-insights { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; }
.sn-insight { display: grid; gap: 10px; border-top: 3px solid var(--accent); }
.sn-callout { display: flex; gap: 12px; align-items: flex-start; margin-top: 16px; padding: 14px 18px; border: 1px dashed var(--accent-dim); background: var(--accent-bg); border-radius: 14px; font-family: var(--body); font-size: 15px; line-height: 1.55; color: var(--text-mid); }
.sn-callout svg { flex-shrink: 0; margin-top: 3px; color: var(--accent); }
.sn-callout strong { color: var(--text-light); font-weight: 600; }
.sn-causes { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; }
.sn-cause { border-top: 2px solid var(--accent); padding-top: 16px; }
.sn-cause-name { font-family: var(--display); font-size: 20px; font-weight: 800; color: var(--text-light); margin: 0 0 10px; }
.sn-statement { font-family: var(--display); font-weight: 800; font-size: clamp(28px, 4vw, 54px); letter-spacing: -0.04em; line-height: 1.08; color: var(--text-light); margin: 20px 0 0; max-width: 860px; text-wrap: balance; }
.sn-points { display: grid; grid-template-columns: minmax(0, 1fr); gap: 18px; margin-top: 34px; }
.sn-points p { border-top: 1px solid var(--border); padding-top: 16px; font-size: 16px; font-weight: 300; line-height: 1.65; }
.sn-lessons { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
.sn-lesson { display: grid; gap: 12px; align-content: start; }
.sn-also { list-style: none; padding: 0; }
.sn-also li { display: grid; grid-template-columns: minmax(0, 1fr); gap: 8px; padding: 18px 0; border-top: 1px solid var(--border); }
.sn-also li:last-child { border-bottom: 1px solid var(--border); }
.sn-also .sn-label { color: var(--accent); }
.sn-footer { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 44px; }
.sn-footer a { font-family: var(--mono); font-size: var(--sn-small); letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; text-decoration: none; padding: 15px 32px; border-radius: 4px; }
.sn-footer .is-primary { color: var(--bg); background: var(--accent); }
.sn-footer .is-ghost { color: var(--text-mid); border: 1.5px solid var(--border); }
@media (min-width: 640px) {
  .sn-causes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sn-also li { grid-template-columns: 200px minmax(0, 1fr); gap: 24px; }
}
@media (min-width: 760px) {
  .sn-insights { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 900px) {
  .sn-points { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 26px; }
  .sn-lessons { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (min-width: 1000px) {
  .sn-causes { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; }
}
`;
