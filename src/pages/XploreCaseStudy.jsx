import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Dices,
  ListOrdered,
  Mail,
  Search,
  Sparkles,
  Ticket,
  Zap,
} from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { xploreMeta } from "../lib/routeMeta";
import {
  APP_STORE_URL,
  INSTAGRAM_URL,
  SOURCES_NOTE,
  ai,
  business,
  chapters,
  decisions,
  growth,
  hero,
  lessons,
  problem,
  product,
  proof,
  timeline,
  tldr,
  traction,
} from "../data/xplore";

/*
 * Xplore Austin case study.
 * Story order: hook (hero + 30-second summary) -> problem -> product ->
 * AI (the centerpiece) -> decisions -> growth -> traction -> business ->
 * lessons -> call to action. Each chapter states its finding in the headline
 * and backs it with one piece of visible evidence.
 *
 * Tones reuse the site-wide highlight colors so this page matches the
 * homepage: ai = violet (--hl-ai), product = green (--hl-product),
 * growth = orange (--accent).
 */

const TONE = {
  ai: "var(--hl-ai)",
  product: "var(--hl-product)",
  growth: "var(--accent)",
  neutral: "var(--accent)",
};

const CHAPTER_TONE = {
  problem: "neutral",
  product: "product",
  ai: "ai",
  decisions: "product",
  growth: "growth",
  traction: "growth",
  business: "neutral",
  lessons: "neutral",
};

const FEATURE_ICONS = {
  zap: Zap,
  dice: Dices,
  sparkles: Sparkles,
  ticket: Ticket,
  calendar: CalendarDays,
  list: ListOrdered,
};

/* Scoped styles. Layout and responsive rules live here so the JSX stays
   readable; colors come from the theme variables in index.css, so light
   mode works without extra rules. */
const CSS = `
.xp { --xp-gutter: clamp(20px, 5vw, 64px); }
.xp a { -webkit-tap-highlight-color: transparent; }
.xp-wrap { max-width: 1120px; margin: 0 auto; padding: 0 var(--xp-gutter); }
.xp-section { padding: clamp(72px, 10vw, 128px) 0; border-top: 1px solid var(--border); scroll-margin-top: 72px; }
.xp-eyebrow { display: flex; align-items: center; gap: 12px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--tone); }
.xp-eyebrow-rule { width: 28px; height: 1px; background: currentColor; opacity: 0.6; }
.xp-h2 { font-family: var(--display); font-weight: 800; font-size: clamp(32px, 4.6vw, 58px); letter-spacing: -0.035em; line-height: 1.04; color: var(--text-light); margin: 20px 0 0; max-width: 880px; text-wrap: balance; }
.xp-h3 { font-family: var(--display); font-weight: 700; font-size: clamp(20px, 2vw, 24px); letter-spacing: -0.015em; line-height: 1.2; color: var(--text-light); margin: 0; }
.xp-lead { font-family: var(--body); font-weight: 300; font-size: clamp(17px, 1.6vw, 20px); line-height: 1.65; color: var(--text-mid); max-width: 660px; margin: 24px 0 0; }
.xp-body { font-family: var(--body); font-weight: 400; font-size: 15px; line-height: 1.6; color: var(--text-mid); margin: 0; }
.xp-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-dim); }
.xp-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: clamp(20px, 2.4vw, 28px); }
.xp-num { font-family: var(--display); font-weight: 800; letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }
.xp-btn { display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 22px; border-radius: 999px; font-family: var(--mono); font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease; }
.xp-btn:hover { transform: translateY(-2px); }
.xp-btn:focus-visible, .xp a:focus-visible, .xp button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.xp-btn-primary { background: var(--accent); color: #170F2E; }
.xp-btn-ghost { border: 1px solid var(--border); color: var(--text-light); }
.xp-btn-ghost:hover { border-color: var(--text-dim); }

/* Hero */
.xp-hero { position: relative; overflow: hidden; padding: clamp(112px, 13vw, 160px) 0 clamp(48px, 6vw, 80px); }
.xp-hero-glow { position: absolute; inset: -20% -10% auto auto; width: min(900px, 120vw); height: min(900px, 120vw); background: radial-gradient(closest-side, rgba(167,139,250,0.16), transparent 70%), radial-gradient(closest-side at 70% 60%, rgba(255,107,53,0.14), transparent 70%), radial-gradient(closest-side at 40% 80%, rgba(52,211,153,0.10), transparent 70%); filter: blur(40px); pointer-events: none; }
.xp-hero-grid { position: relative; display: grid; grid-template-columns: 1fr; gap: 56px; align-items: center; }
.xp-h1 { font-family: var(--display); font-weight: 800; font-size: clamp(54px, 9vw, 116px); letter-spacing: -0.05em; line-height: 0.9; color: var(--text-light); margin: 22px 0 0; }
.xp-deck { font-family: var(--body); font-weight: 300; font-size: clamp(19px, 2vw, 25px); line-height: 1.45; color: var(--text-light); max-width: 600px; margin: 26px 0 0; }
.xp-deck strong { font-weight: 600; color: var(--hl-ai); }
.xp-roles { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 26px; }
.xp-chip { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-mid); border: 1px solid var(--border); border-radius: 999px; padding: 7px 14px; background: var(--card); }
.xp-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.xp-phones { position: relative; display: flex; justify-content: center; align-items: flex-end; min-height: 420px; }
.xp-phone { width: clamp(168px, 20vw, 236px); aspect-ratio: 1242 / 2688; border-radius: clamp(28px, 3vw, 38px); padding: 7px; background: linear-gradient(150deg, #3a2c6b, #120c26 60%); box-shadow: 0 40px 80px -30px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.10); flex-shrink: 0; }
.xp-phone img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: clamp(22px, 2.5vw, 31px); background: #fff; }
.xp-phones .xp-phone:first-child { transform: rotate(-7deg) translate(18%, 6%); z-index: 1; opacity: 0.92; }
.xp-phones .xp-phone:last-child { transform: rotate(5deg) translate(-12%, -4%); z-index: 2; }

/* Proof bar */
.xp-proof { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border: 1px solid var(--border); border-radius: 20px; background: var(--card); overflow: hidden; margin-top: clamp(48px, 6vw, 72px); }
.xp-proof > div { padding: clamp(18px, 2.4vw, 28px); border-top: 1px solid var(--border); }
.xp-proof > div:nth-child(-n+2) { border-top: 0; }
.xp-proof > div:nth-child(2n) { border-left: 1px solid var(--border); }
.xp-proof .xp-num { font-size: clamp(32px, 4.2vw, 52px); color: var(--text-light); }
.xp-proof .xp-label { display: block; margin-top: 10px; line-height: 1.4; }
.xp-sources { font-family: var(--mono); font-size: 11px; line-height: 1.6; color: var(--text-dim); margin: 14px 0 0; max-width: 760px; }

/* 30-second summary */
.xp-tldr { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 24px; }
.xp-tldr-card { position: relative; display: flex; flex-direction: column; gap: 14px; text-decoration: none; color: inherit; border-top: 3px solid var(--tone); transition: transform 0.2s ease, background 0.2s ease; }
.xp-tldr-card:hover { transform: translateY(-3px); background: var(--surface-hover); }
.xp-tldr-card ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.xp-tldr-card li { position: relative; padding-left: 18px; }
.xp-tldr-card li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 6px; height: 6px; border-radius: 50%; background: var(--tone); }
.xp-more { margin-top: auto; display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--tone); }

/* Timeline */
.xp-timeline { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(150px, 1fr); overflow-x: auto; scroll-snap-type: x mandatory; margin: 28px calc(var(--xp-gutter) * -1) 0; padding: 0 var(--xp-gutter) 8px; scrollbar-width: none; }
.xp-timeline::-webkit-scrollbar { display: none; }
.xp-tl-item { position: relative; scroll-snap-align: start; padding: 26px 18px 0 0; border-top: 1px solid var(--border); }
.xp-tl-item::before { content: ""; position: absolute; top: -5px; left: 0; width: 9px; height: 9px; border-radius: 50%; background: var(--bg); border: 2px solid var(--accent); }
.xp-tl-item .xp-label { color: var(--accent); }
.xp-tl-item p { font-family: var(--body); font-size: 15px; line-height: 1.45; color: var(--text-mid); margin: 8px 0 0; }

/* Problem */
.xp-quote { position: relative; margin: 40px 0 0; padding: 0 0 0 clamp(20px, 3vw, 36px); border-left: 3px solid var(--accent); max-width: 900px; }
.xp-quote p { font-family: var(--display); font-weight: 700; font-size: clamp(24px, 3.2vw, 40px); letter-spacing: -0.02em; line-height: 1.22; color: var(--text-light); margin: 0; }
.xp-quote footer { margin-top: 18px; }

/* Product */
.xp-rule { display: grid; gap: 8px; margin-top: 36px; max-width: 760px; border-left: 3px solid var(--tone); }
.xp-rule p { font-family: var(--body); font-size: clamp(18px, 1.8vw, 22px); line-height: 1.5; color: var(--text-light); margin: 0; }
.xp-screens { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(150px, 1fr); gap: clamp(14px, 2vw, 24px); overflow-x: auto; scroll-snap-type: x mandatory; margin: 48px calc(var(--xp-gutter) * -1) 0; padding: 0 var(--xp-gutter) 12px; scrollbar-width: none; }
.xp-screens::-webkit-scrollbar { display: none; }
.xp-screens figure { margin: 0; scroll-snap-align: start; }
.xp-screens .xp-phone { width: 100%; max-width: 230px; margin: 0 auto; }
.xp-screens figcaption { text-align: center; margin-top: 14px; }
.xp-features { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 48px; }
.xp-feature { display: grid; grid-template-columns: 44px 1fr; gap: 16px; align-items: start; }
.xp-feature-icon { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; color: var(--tone); background: color-mix(in srgb, var(--tone) 14%, transparent); }
.xp-feature h3 { font-family: var(--display); font-weight: 700; font-size: 18px; color: var(--text-light); margin: 2px 0 6px; display: flex; align-items: center; gap: 8px; }
.xp-badge { font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--hl-ai); border: 1px solid color-mix(in srgb, var(--hl-ai) 50%, transparent); border-radius: 999px; padding: 2px 8px; }

/* AI chapter */
.xp-ai { position: relative; overflow: hidden; }
.xp-ai::before { content: ""; position: absolute; inset: 0; background: radial-gradient(60% 50% at 80% 0%, rgba(167,139,250,0.10), transparent 70%); pointer-events: none; }
.xp-ai > .xp-wrap { position: relative; }
.xp-sub { margin-top: clamp(56px, 7vw, 88px); }
.xp-steps { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 24px; counter-reset: step; }
.xp-step { position: relative; padding: 18px 20px; display: grid; grid-template-columns: 32px 1fr; column-gap: 14px; align-items: start; }
.xp-step-num { grid-row: span 2; width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; font-family: var(--mono); font-size: 13px; font-weight: 700; color: #170F2E; background: var(--hl-ai); }
.xp-step h4 { font-family: var(--display); font-weight: 700; font-size: 17px; color: var(--text-light); margin: 4px 0 6px; }
.xp-statrow { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
.xp-stat { padding: 22px; }
.xp-stat .xp-num { font-size: clamp(34px, 4vw, 48px); color: var(--tone); }
.xp-stat .xp-label { display: block; margin-top: 10px; line-height: 1.45; }
.xp-split { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px; }
.xp-search { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-radius: 14px; border: 1px solid color-mix(in srgb, var(--hl-ai) 45%, transparent); background: color-mix(in srgb, var(--hl-ai) 7%, transparent); font-family: var(--mono); font-size: clamp(13px, 1.3vw, 15px); color: var(--text-light); margin-top: 20px; }
.xp-caret { display: inline-block; width: 2px; height: 1.1em; background: var(--hl-ai); vertical-align: text-bottom; margin-left: 2px; animation: xp-blink 1.1s steps(1) infinite; }
@keyframes xp-blink { 50% { opacity: 0; } }
.xp-arrow { display: flex; align-items: center; gap: 10px; margin: 14px 0; color: var(--text-dim); }
.xp-filters { display: flex; flex-wrap: wrap; gap: 8px; }
.xp-filter { font-family: var(--mono); font-size: 12px; color: var(--hl-ai); border: 1px solid color-mix(in srgb, var(--hl-ai) 50%, transparent); border-radius: 999px; padding: 6px 12px; }
.xp-tasks { list-style: none; margin: 20px 0 0; padding: 0; display: grid; gap: 10px; }
.xp-tasks li { display: grid; grid-template-columns: 52px 1fr; gap: 12px; align-items: center; }
.xp-day { font-family: var(--mono); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--hl-ai); border: 1px solid color-mix(in srgb, var(--hl-ai) 40%, transparent); border-radius: 8px; padding: 6px 0; text-align: center; }
.xp-tools { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.xp-pipeline { display: grid; grid-template-columns: 1fr; gap: 28px; margin-top: 16px; }
.xp-flow { list-style: none; margin: 20px 0 0; padding: 0; position: relative; }
.xp-flow li { position: relative; padding: 0 0 18px 34px; font-family: var(--body); font-size: 15px; line-height: 1.5; color: var(--text-mid); }
.xp-flow li::before { content: ""; position: absolute; left: 7px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: var(--hl-ai); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hl-ai) 18%, transparent); }
.xp-flow li::after { content: ""; position: absolute; left: 11px; top: 20px; bottom: 0; width: 2px; background: color-mix(in srgb, var(--hl-ai) 30%, transparent); }
.xp-flow li:last-child::after { display: none; }
.xp-hbar { margin-top: 22px; display: grid; gap: 18px; }
.xp-hbar-row { display: grid; gap: 8px; }
.xp-hbar-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.xp-hbar-track { height: 14px; border-radius: 999px; background: var(--text-faint); overflow: hidden; }
.xp-hbar-fill { height: 100%; border-radius: 999px; }
.xp-takeaway { font-family: var(--display); font-weight: 800; font-size: clamp(22px, 2.4vw, 30px); letter-spacing: -0.02em; line-height: 1.2; color: var(--text-light); margin: 26px 0 0; }

/* Decisions */
.xp-decisions { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 48px; }
.xp-decision { display: grid; gap: 14px; }
.xp-decision .xp-num { font-size: clamp(48px, 6vw, 72px); color: var(--hl-product); }
.xp-decision-did { border-top: 1px solid var(--border); padding-top: 14px; display: grid; gap: 6px; }
.xp-decision-did p { color: var(--text-light); }
.xp-cut { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 24px; }
.xp-cut s { font-family: var(--mono); font-size: 12px; color: var(--text-mid); text-decoration-color: var(--hl-product); text-decoration-thickness: 2px; border: 1px dashed var(--text-dim); border-radius: 999px; padding: 6px 12px; }

/* Growth */
.xp-growth-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px; }
.xp-learn { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 14px; }
.xp-learn li { display: grid; grid-template-columns: 28px 1fr; gap: 12px; font-family: var(--body); font-size: 16px; line-height: 1.5; color: var(--text-light); }
.xp-learn li span { font-family: var(--mono); font-size: 12px; color: var(--accent); padding-top: 3px; }
.xp-posts { display: grid; grid-auto-flow: column; grid-auto-columns: min(340px, calc(100vw - 2 * var(--xp-gutter))); gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; margin: 24px calc(var(--xp-gutter) * -1) 0 0; padding: 0 var(--xp-gutter) 16px 0; scrollbar-width: thin; -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 72px), transparent); mask-image: linear-gradient(to right, #000 calc(100% - 72px), transparent); }
.xp-post { scroll-snap-align: start; display: flex; flex-direction: column; gap: 14px; }
.xp-post-head { padding: 18px; display: grid; gap: 8px; align-content: start; min-height: 150px; }
.xp-post-head strong { font-family: var(--display); font-weight: 700; font-size: 17px; line-height: 1.3; color: var(--text-light); }
.xp-post-stats { font-family: var(--mono); font-size: 12px; color: var(--accent); }
.xp-ig { margin: 0 !important; min-width: 0 !important; width: 100% !important; max-width: 100% !important; border-radius: 16px !important; overflow: hidden; border: 1px solid var(--border) !important; background: var(--card) !important; box-shadow: none !important; }
.xp-ig-fallback { display: block; text-decoration: none; color: inherit; }
.xp-ig-fallback img { display: block; width: 100%; height: auto; }
.xp-ig-fallback span { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 14px 16px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-mid); }
.xp-ig-placeholder { aspect-ratio: 4 / 5; display: grid; place-items: center; padding: 24px; text-align: center; font-family: var(--display); font-weight: 700; font-size: 20px; line-height: 1.25; color: var(--text-light); background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%); }

/* Charts */
.xp-chart { margin: 0; }
.xp-chart figcaption { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.xp-vbars { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); align-items: end; gap: clamp(6px, 1.2vw, 14px); height: 240px; margin-top: 28px; padding-bottom: 4px; border-bottom: 1px solid var(--border); }
.xp-vbar { display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 8px; height: 100%; }
.xp-vbar-val { font-family: var(--mono); font-size: 12px; color: var(--text-mid); font-variant-numeric: tabular-nums; }
.xp-vbar-fill { width: 100%; max-width: 56px; border-radius: 8px 8px 3px 3px; }
.xp-vlabels { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: clamp(6px, 1.2vw, 14px); margin-top: 10px; }
.xp-vlabels span { text-align: center; }
.xp-notes { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 18px; }
.xp-notes span { font-family: var(--body); font-size: 14px; color: var(--text-mid); }
.xp-notes b { font-family: var(--mono); font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-right: 6px; }
.xp-line svg { display: block; width: 100%; height: auto; overflow: visible; }

/* Business + lessons */
.xp-three { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 48px; }
.xp-biz .xp-num { font-size: clamp(36px, 4.4vw, 52px); color: var(--accent); }
.xp-biz p { margin-top: 14px; }
.xp-lesson { display: grid; gap: 12px; }
.xp-lesson .xp-label { color: var(--accent); }
.xp-next { margin-top: 28px; font-family: var(--body); font-size: 17px; line-height: 1.6; color: var(--text-mid); max-width: 760px; }
.xp-next strong { color: var(--text-light); font-weight: 600; }

/* Closing call to action */
.xp-cta { position: relative; overflow: hidden; text-align: center; padding: clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px); border-radius: 28px; border: 1px solid var(--border); background: radial-gradient(80% 120% at 50% 0%, rgba(255,107,53,0.12), transparent 60%), var(--card); }
.xp-cta h2 { margin-left: auto; margin-right: auto; }
.xp-cta .xp-ctas { justify-content: center; }

/* Chapter rail: only where there's room beside the content */
.xp-rail { display: none; }
@media (min-width: 1400px) {
  .xp-rail { display: flex; flex-direction: column; gap: 6px; position: fixed; left: 28px; top: 50%; transform: translateY(-50%); z-index: 40; }
  .xp-rail a { display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: 8px; text-decoration: none; font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); transition: color 0.2s ease; }
  .xp-rail a:hover { color: var(--text-light); }
  .xp-rail-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); transition: transform 0.2s ease, background 0.2s ease; }
  .xp-rail a[aria-current="true"] { color: var(--text-light); }
  .xp-rail a[aria-current="true"] .xp-rail-dot { background: var(--tone); transform: scale(1.4); }
  .xp-rail-text { opacity: 0; transform: translateX(-4px); transition: opacity 0.2s ease, transform 0.2s ease; }
  .xp-rail:hover .xp-rail-text, .xp-rail a[aria-current="true"] .xp-rail-text { opacity: 1; transform: none; }
}

@media (min-width: 640px) {
  .xp-statrow { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .xp-features { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .xp-decisions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 760px) {
  .xp-proof { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .xp-proof > div { border-top: 0; }
  .xp-proof > div + div { border-left: 1px solid var(--border); }
}
@media (min-width: 900px) {
  .xp-tldr { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .xp-three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .xp-features { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .xp-split { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); }
  .xp-pipeline { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; }
  .xp-growth-grid { grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); }
  .xp-screens { grid-auto-flow: row; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: visible; margin: 48px 0 0; padding: 0; }
}
@media (min-width: 960px) {
  .xp-hero-grid { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 32px; }
  .xp-phones { min-height: 520px; }
}
@media (min-width: 900px) {
  .xp-timeline { grid-auto-flow: row; grid-template-columns: repeat(4, minmax(0, 1fr)); row-gap: 32px; overflow: visible; margin: 28px 0 0; padding: 0; }
}
@media (min-width: 1200px) {
  .xp-timeline { grid-template-columns: repeat(8, minmax(0, 1fr)); }
}
@media (min-width: 1100px) {
  .xp-steps { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .xp-step { display: block; padding: 22px; }
  .xp-step-num { margin-bottom: 14px; }
  .xp-step:not(:last-child)::after { content: ""; position: absolute; top: 37px; right: -12px; width: 12px; height: 2px; background: color-mix(in srgb, var(--hl-ai) 45%, transparent); }
}
@media (max-width: 959px) {
  .xp-phones { min-height: 0; padding: 12px 0 8px; }
  .xp-phone { width: clamp(150px, 40vw, 210px); }
}
@media (prefers-reduced-motion: reduce) {
  .xp-caret { animation: none; }
  .xp-btn, .xp-tldr-card { transition: none; }
  .xp-btn:hover, .xp-tldr-card:hover { transform: none; }
}
`;

/* ─── Small building blocks ─── */

function Eyebrow({ num, children }) {
  return (
    <span className="xp-eyebrow">
      {num && <span>{num}</span>}
      <span className="xp-eyebrow-rule" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}

function Chapter({ id, children, className = "" }) {
  const chapter = chapters.find((c) => c.id === id);
  const tone = TONE[CHAPTER_TONE[id]];
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`xp-section ${className}`}
      style={{ "--tone": tone }}
    >
      <div className="xp-wrap">
        {chapter && <Eyebrow num={chapter.num}>{chapter.label}</Eyebrow>}
        {children}
      </div>
    </section>
  );
}

function Phone({ src, alt, eager = false }) {
  return (
    <div className="xp-phone">
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function StatRow({ items, tone }) {
  return (
    <div className="xp-statrow" style={{ "--tone": tone }}>
      {items.map((s) => (
        <div key={s.label} className="xp-card xp-stat">
          <div className="xp-num">{s.value}</div>
          <span className="xp-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* Vertical bar chart in plain HTML so labels stay crisp and responsive. */
function VerticalBars({ title, bars, highlight, tone, footnote }) {
  const max = Math.max(...bars.map((b) => b.value));
  const summary = bars.map((b) => `${b.label}: ${b.value}`).join(", ");
  return (
    <figure className="xp-chart" aria-label={`${title}. ${summary}`}>
      <figcaption>
        <span className="xp-label">{title}</span>
        {footnote && <span className="xp-label">{footnote}</span>}
      </figcaption>
      <div className="xp-vbars" style={{ "--n": bars.length }} aria-hidden="true">
        {bars.map((b) => {
          const on = b.label === highlight;
          return (
            <div key={b.label} className="xp-vbar">
              <span className="xp-vbar-val" style={on ? { color: "var(--text-light)", fontWeight: 700 } : undefined}>
                {b.value}
              </span>
              <div
                className="xp-vbar-fill"
                style={{
                  height: `${Math.max(4, (b.value / max) * 100)}%`,
                  background: tone,
                  opacity: on ? 1 : 0.38,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="xp-vlabels" style={{ "--n": bars.length }} aria-hidden="true">
        {bars.map((b) => (
          <span key={b.label} className="xp-label">{b.label}</span>
        ))}
      </div>
    </figure>
  );
}

/* Before/after bars for the event pipeline. */
function HorizontalBars({ title, bars, tone }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure
      className="xp-chart"
      aria-label={`${title}. ${bars.map((b) => `${b.label}: ${b.value} (${b.note})`).join(", ")}`}
    >
      <figcaption>
        <span className="xp-label">{title}</span>
      </figcaption>
      <div className="xp-hbar" aria-hidden="true">
        {bars.map((b, i) => {
          const last = i === bars.length - 1;
          return (
            <div key={b.label} className="xp-hbar-row">
              <div className="xp-hbar-head">
                <span className="xp-body">
                  {b.label} <span className="xp-label" style={{ marginLeft: 6 }}>{b.note}</span>
                </span>
                <span
                  className="xp-num"
                  style={{ fontSize: last ? 34 : 24, color: last ? tone : "var(--text-mid)" }}
                >
                  {b.value}
                </span>
              </div>
              <div className="xp-hbar-track">
                <div
                  className="xp-hbar-fill"
                  style={{ width: `${(b.value / max) * 100}%`, background: tone, opacity: last ? 1 : 0.4 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

/* Follower growth. X positions follow the real dates, so the summer gap
   reads honestly; the August point is approximate and drawn dashed. */
function FollowerLine({ data }) {
  const W = 560;
  const H = 240;
  const pad = { l: 8, r: 8, t: 34, b: 34 };
  const xs = [2.5, 3.9, 7.5, 10.1]; // months from Jan: Mar 16, Apr 28, ~mid Aug, Nov 4
  const minX = 2;
  const maxX = 10.5;
  const maxY = 1500;
  const x = (m) => pad.l + ((m - minX) / (maxX - minX)) * (W - pad.l - pad.r);
  const y = (v) => pad.t + (1 - v / maxY) * (H - pad.t - pad.b);
  const pts = data.points.map((p, i) => ({ ...p, cx: x(xs[i]), cy: y(p.value) }));
  const area = `M ${pts[0].cx} ${H - pad.b} ${pts.map((p) => `L ${p.cx} ${p.cy}`).join(" ")} L ${pts[pts.length - 1].cx} ${H - pad.b} Z`;
  const summary = data.points.map((p) => `${p.label}: ${p.approx ? "about " : ""}${p.value}`).join(", ");

  return (
    <figure className="xp-chart xp-line" aria-label={`${data.title}. ${summary}. ${data.annotation}`}>
      <figcaption>
        <span className="xp-label">{data.title}, 2026</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ marginTop: 16 }}>
        <defs>
          <linearGradient id="xp-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="var(--border)" />
        <path d={area} fill="url(#xp-area)" />
        <polyline
          points={`${pts[0].cx},${pts[0].cy} ${pts[1].cx},${pts[1].cy}`}
          fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
        />
        <polyline
          points={`${pts[1].cx},${pts[1].cy} ${pts[2].cx},${pts[2].cy} ${pts[3].cx},${pts[3].cy}`}
          fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round"
        />
        <text x={(pts[1].cx + pts[2].cx) / 2} y={pts[2].cy - 44} textAnchor="middle" fill="var(--text-dim)" fontFamily="var(--body)" fontSize="13">
          {data.annotation}
        </text>
        {pts.map((p) => (
          <g key={p.label}>
            <circle cx={p.cx} cy={p.cy} r="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
            <text x={p.cx} y={p.cy - 16} textAnchor="middle" fill="var(--text-light)" fontFamily="var(--mono)" fontSize="14" fontWeight="700">
              {p.approx ? "~" : ""}{p.value.toLocaleString()}
            </text>
            <text x={p.cx} y={H - 10} textAnchor="middle" fill="var(--text-dim)" fontFamily="var(--mono)" fontSize="12">
              {p.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/* Instagram embeds load only when the section is close, so the page stays
   fast. If the embed script is blocked, the styled fallback still links out. */
function useInstagramEmbeds(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const load = () => {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
        return;
      }
      if (document.getElementById("ig-embed-js")) return;
      const s = document.createElement("script");
      s.id = "ig-embed-js";
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      s.onload = () => window.instgrm?.Embeds?.process();
      document.body.appendChild(s);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

function InstagramPost({ post }) {
  return (
    <article className="xp-post">
      <div className="xp-card xp-post-head">
        <span className="xp-label">{post.date}</span>
        <strong>{post.lesson}</strong>
        <span className="xp-post-stats">{post.stats}</span>
      </div>
      <blockquote
        className="instagram-media xp-ig"
        data-instgrm-permalink={`${post.url}?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
      >
        <a className="xp-ig-fallback clickable" href={post.url} target="_blank" rel="noopener noreferrer">
          {post.image ? (
            <img src={post.image} alt={`Instagram post: ${post.title}`} loading="lazy" />
          ) : (
            <div className="xp-ig-placeholder">{post.title}</div>
          )}
          <span>
            View on Instagram <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </a>
      </blockquote>
    </article>
  );
}

/* Left rail that tracks the chapter in view (wide screens only). */
function ChapterRail() {
  const [active, setActive] = useState(chapters[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="xp-rail" aria-label="Case study chapters">
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className="clickable"
          aria-current={active === c.id ? "true" : undefined}
          style={{ "--tone": TONE[CHAPTER_TONE[c.id]] }}
        >
          <span className="xp-rail-dot" aria-hidden="true" />
          <span>{c.num}</span>
          <span className="xp-rail-text">{c.label}</span>
        </a>
      ))}
    </nav>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 200,
        transformOrigin: "0%",
        scaleX,
        background: "linear-gradient(90deg, var(--hl-ai), var(--accent), var(--hl-product))",
      }}
    />
  );
}

/* ─── Page ─── */

export default function XploreCaseStudy() {
  const reduced = !!useReducedMotion();
  const postsRef = useRef(null);
  useInstagramEmbeds(postsRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deckParts = hero.deck.split("Solo, with AI,");

  return (
    <motion.div
      className="xp"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Seo {...xploreMeta()} />
      <style>{CSS}</style>
      {!reduced && <ProgressBar />}
      <ChapterRail />

      <main>
        {/* ── Hero ── */}
        <header className="xp-hero">
          <div className="xp-hero-glow" aria-hidden="true" />
          <div className="xp-wrap">
            <Link to="/#work" className="xp-btn xp-btn-ghost clickable" style={{ minHeight: 40, padding: "0 16px", fontSize: 11 }}>
              <ArrowLeft size={14} aria-hidden="true" /> Back to work
            </Link>

            <div className="xp-hero-grid" style={{ marginTop: 40 }}>
              <div>
                <span className="xp-eyebrow" style={{ "--tone": "var(--accent)" }}>
                  <span>{hero.eyebrow}</span>
                  <span className="xp-eyebrow-rule" aria-hidden="true" />
                  <span>{hero.dates}</span>
                </span>
                <h1 className="xp-h1">{hero.title}</h1>
                <p className="xp-deck">
                  {deckParts[0]}
                  <strong>Solo, with AI,</strong>
                  {deckParts[1]}
                </p>
                <div className="xp-roles" aria-label="My roles">
                  {hero.roles.map((r) => (
                    <span key={r} className="xp-chip">{r}</span>
                  ))}
                </div>
                <div className="xp-ctas">
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="xp-btn xp-btn-primary clickable">
                    Get the app <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="xp-btn xp-btn-ghost clickable">
                    @xplore.austin <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="xp-phones">
                {hero.screens.map((s, i) => (
                  <Phone key={s.src} src={s.src} alt={s.alt} eager={i === hero.screens.length - 1} />
                ))}
              </div>
            </div>

            <div className="xp-proof" role="list" aria-label="Xplore at a glance">
              {proof.map((p) => (
                <div key={p.label} role="listitem">
                  <div className="xp-num">{p.value}</div>
                  <span className="xp-label">{p.label}</span>
                </div>
              ))}
            </div>
            <p className="xp-sources">{SOURCES_NOTE}</p>
          </div>
        </header>

        {/* ── 30-second summary + path ── */}
        <section aria-label="Summary" style={{ paddingBottom: "clamp(72px, 10vw, 112px)" }}>
          <div className="xp-wrap">
            <span className="xp-label">The 30-second version</span>
            <div className="xp-tldr">
              {tldr.map((t) => (
                <a
                  key={t.title}
                  href={`#${t.target}`}
                  className="xp-card xp-tldr-card clickable"
                  style={{ "--tone": TONE[t.tone] }}
                >
                  <h2 className="xp-h3">{t.title}</h2>
                  <ul className="xp-body">
                    {t.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <span className="xp-more">
                    See how <ArrowDown size={14} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>

            <div style={{ marginTop: "clamp(56px, 7vw, 80px)" }}>
              <span className="xp-label">How it got here</span>
              <ol className="xp-timeline" style={{ listStyle: "none" }}>
                {timeline.map((t) => (
                  <li key={t.date} className="xp-tl-item">
                    <span className="xp-label">{t.date}</span>
                    <p>{t.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── 01 Problem ── */}
        <Chapter id="problem">
          <h2 id="problem-title" className="xp-h2">{problem.headline}</h2>
          <Reveal reduced={reduced}>
            <blockquote className="xp-quote">
              <p>&ldquo;{problem.quote}&rdquo;</p>
              <footer className="xp-label">From my pitch competition application</footer>
            </blockquote>
          </Reveal>
          <p className="xp-lead">{problem.body}</p>
        </Chapter>

        {/* ── 02 Product ── */}
        <Chapter id="product">
          <h2 id="product-title" className="xp-h2">{product.headline}</h2>
          <div className="xp-card xp-rule">
            <span className="xp-label" style={{ color: "var(--tone)" }}>The rule</span>
            <p>{product.principle}</p>
          </div>

          <div className="xp-screens">
            {product.screens.map((s) => (
              <figure key={s.src}>
                <Phone src={s.src} alt={s.alt} />
                <figcaption className="xp-label">{s.label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="xp-sources" style={{ textAlign: "center", maxWidth: "none" }}>{product.screensCaption}</p>

          <div className="xp-features">
            {product.features.map((f) => {
              const Icon = FEATURE_ICONS[f.icon];
              return (
                <div key={f.title} className="xp-card xp-feature" style={f.ai ? { "--tone": "var(--hl-ai)" } : undefined}>
                  <span className="xp-feature-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3>
                      {f.title}
                      {f.ai && <span className="xp-badge">AI</span>}
                    </h3>
                    <p className="xp-body">{f.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Chapter>

        {/* ── 03 Built with AI ── */}
        <Chapter id="ai" className="xp-ai">
          <h2 id="ai-title" className="xp-h2">{ai.headline}</h2>
          <p className="xp-lead">{ai.intro}</p>

          <div className="xp-sub">
            <h3 className="xp-h3">How a feature ships</h3>
            <ol className="xp-steps" style={{ listStyle: "none", padding: 0 }}>
              {ai.shipSteps.map((s, i) => (
                <li key={s.title} className="xp-card xp-step">
                  <span className="xp-step-num" aria-hidden="true">{i + 1}</span>
                  <h4>{s.title}</h4>
                  <p className="xp-body">{s.text}</p>
                </li>
              ))}
            </ol>
            <StatRow items={ai.shipStats} tone="var(--hl-ai)" />
          </div>

          <div className="xp-split xp-sub">
            <div className="xp-card">
              <h3 className="xp-h3">{ai.vibe.title}</h3>
              <div className="xp-search" role="img" aria-label={`Example search: ${ai.vibe.query}`}>
                <Search size={18} aria-hidden="true" style={{ color: "var(--hl-ai)", flexShrink: 0 }} />
                <span>
                  {ai.vibe.query}
                  <span className="xp-caret" aria-hidden="true" />
                </span>
              </div>
              <div className="xp-arrow" aria-hidden="true">
                <ArrowDown size={16} />
                <span className="xp-label">AI turns it into filters</span>
              </div>
              <div className="xp-filters">
                {ai.vibe.filters.map((f) => (
                  <span key={f} className="xp-filter">{f}</span>
                ))}
              </div>
              <p className="xp-body" style={{ marginTop: 20, color: "var(--text-light)" }}>{ai.vibe.note}</p>
              <p className="xp-label" style={{ marginTop: 12 }}>{ai.vibe.meta}</p>
            </div>

            <div className="xp-card">
              <h3 className="xp-h3">AI on a schedule</h3>
              <ul className="xp-tasks">
                {ai.scheduled.map((t) => (
                  <li key={t.day}>
                    <span className="xp-day">{t.day}</span>
                    <span className="xp-body">{t.text}</span>
                  </li>
                ))}
              </ul>
              <div className="xp-tools">
                {ai.tools.map((t) => (
                  <span key={t} className="xp-chip">{t}</span>
                ))}
              </div>
              <p className="xp-label" style={{ marginTop: 14, lineHeight: 1.5, textTransform: "none", letterSpacing: "0.02em" }}>
                {ai.toolsNote}
              </p>
            </div>
          </div>

          <div className="xp-card xp-sub">
            <div className="xp-pipeline">
              <div>
                <h3 className="xp-h3">{ai.pipeline.title}</h3>
                <ol className="xp-flow">
                  {ai.pipeline.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
              <div>
                <HorizontalBars title={ai.pipeline.chart.title} bars={ai.pipeline.chart.bars} tone="var(--hl-ai)" />
                <p className="xp-takeaway">{ai.pipeline.chart.takeaway}</p>
              </div>
            </div>
          </div>
        </Chapter>

        {/* ── 04 Decisions ── */}
        <Chapter id="decisions">
          <h2 id="decisions-title" className="xp-h2">{decisions.headline}</h2>
          <div className="xp-decisions">
            {decisions.cards.map((d) => (
              <div key={d.metric} className="xp-card xp-decision">
                <div className="xp-num">{d.metric}</div>
                <p className="xp-body">{d.saw}</p>
                <div className="xp-decision-did">
                  <span className="xp-label" style={{ color: "var(--hl-product)" }}>So I</span>
                  <p className="xp-body">{d.did}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="xp-cut">
            <span className="xp-label">Also cut</span>
            <s>DMs</s>
            <s>Friend feed</s>
            <s>Leaderboards</s>
            <span className="xp-body">Almost nobody used them.</span>
          </div>
        </Chapter>

        {/* ── 05 Growth ── */}
        <Chapter id="growth">
          <h2 id="growth-title" className="xp-h2">{growth.headline}</h2>
          <div style={{ marginTop: 40 }}>
            <StatRow items={growth.stats} tone="var(--accent)" />
          </div>
          <div className="xp-growth-grid">
            <div className="xp-card">
              <FollowerLine data={growth.followers} />
            </div>
            <div className="xp-card">
              <h3 className="xp-h3">What worked</h3>
              <ul className="xp-learn">
                {growth.learnings.map((l, i) => (
                  <li key={l}>
                    <span>0{i + 1}</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="xp-sub" ref={postsRef}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <h3 className="xp-h3">The posts</h3>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="xp-more clickable" style={{ "--tone": "var(--accent)", textDecoration: "none" }}>
                All posts on Instagram <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="xp-posts">
              {growth.posts.map((p) => (
                <InstagramPost key={p.url} post={p} />
              ))}
            </div>
          </div>
        </Chapter>

        {/* ── 06 Traction ── */}
        <Chapter id="traction">
          <h2 id="traction-title" className="xp-h2">{traction.headline}</h2>
          <p className="xp-lead">{traction.body}</p>
          <div className="xp-card" style={{ marginTop: 40 }}>
            <VerticalBars
              title={traction.chart.title}
              bars={traction.chart.bars}
              highlight="Sept"
              tone="var(--accent)"
            />
            <div className="xp-notes">
              {traction.chart.annotations.map((a) => (
                <span key={a.at}>
                  <b>{a.at}</b>
                  {a.text}
                </span>
              ))}
            </div>
          </div>
          <StatRow items={traction.stats} tone="var(--accent)" />
        </Chapter>

        {/* ── 07 Business ── */}
        <Chapter id="business">
          <h2 id="business-title" className="xp-h2">{business.headline}</h2>
          <div className="xp-three">
            {business.cards.map((c) => (
              <div key={c.value} className="xp-card xp-biz">
                <div className="xp-num">{c.value}</div>
                <p className="xp-body">{c.text}</p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ── 08 Lessons ── */}
        <Chapter id="lessons">
          <h2 id="lessons-title" className="xp-h2">{lessons.headline}</h2>
          <div className="xp-three">
            {lessons.items.map((l, i) => (
              <div key={l.title} className="xp-card xp-lesson">
                <span className="xp-label">Lesson 0{i + 1}</span>
                <h3 className="xp-h3">{l.title}</h3>
                <p className="xp-body">{l.text}</p>
              </div>
            ))}
          </div>
          <p className="xp-next">
            <strong>What's next. </strong>
            {lessons.next.replace(/^Next: /, "")}
          </p>
        </Chapter>

        {/* ── Closing ── */}
        <section aria-labelledby="cta-title" style={{ padding: "0 0 clamp(72px, 10vw, 120px)" }}>
          <div className="xp-wrap">
            <div className="xp-cta">
              <h2 id="cta-title" className="xp-h2" style={{ marginTop: 0 }}>See it for yourself.</h2>
              <p className="xp-lead" style={{ marginLeft: "auto", marginRight: "auto" }}>
                Download the app, scroll the feed, or ask me how any of it works.
              </p>
              <div className="xp-ctas">
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="xp-btn xp-btn-primary clickable">
                  Get the app <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="xp-btn xp-btn-ghost clickable">
                  Instagram <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href="mailto:rasikap@utexas.edu" className="xp-btn xp-btn-ghost clickable">
                  <Mail size={16} aria-hidden="true" /> Email me
                </a>
              </div>
              <Link to="/#work" className="xp-more clickable" style={{ "--tone": "var(--text-mid)", textDecoration: "none", marginTop: 28, justifyContent: "center" }}>
                <ArrowLeft size={14} aria-hidden="true" /> More work
              </Link>
            </div>
            <p className="xp-sources" style={{ textAlign: "center", margin: "18px auto 0" }}>{SOURCES_NOTE}</p>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
