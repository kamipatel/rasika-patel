import { useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import DecryptedText from "./bits/DecryptedText";

const CSS = `
@keyframes pk-twinkle { 0%, 100% { opacity: .25; } 50% { opacity: 1; } }
.pk-stars { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; overflow: hidden; }
.pk-stars i { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pk-twinkle 4s ease-in-out infinite; }
.pk-card > div:not(.pk-stars) { position: relative; z-index: 1; }
@media (prefers-reduced-motion: reduce) { .pk-stars i { animation: none; opacity: .5; } }
.pk-card { position: relative; background: var(--foam); border: 2px solid var(--text-light); border-radius: 36px; padding: clamp(24px, 5vw, 56px); box-shadow: 8px 8px 0 var(--accent); display: grid; grid-template-columns: minmax(0,1.1fr) minmax(0,1fr); gap: clamp(28px, 5vw, 64px); align-items: start; }
.pk-title { font-family: var(--display); font-weight: 800; font-size: clamp(40px, 7vw, 84px); line-height: 0.95; letter-spacing: -2px; color: var(--text-light); margin: 0 0 20px; overflow-wrap: break-word; min-width: 0; }
.pk-sub { font-family: var(--body); font-size: 19px; line-height: 1.55; color: var(--text-light); max-width: 40ch; margin: 0 0 24px; }
.pk-mail { display: inline-block; font-family: var(--display); font-weight: 800; font-size: clamp(20px, 3vw, 30px); color: var(--text-light); text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 6px; text-decoration-color: var(--accent); overflow-wrap: anywhere; }
.pk-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.pk-link { font-family: var(--body); font-weight: 600; font-size: 16px; min-height: 44px; display: inline-flex; align-items: center; padding: 0 20px; border-radius: 999px; border: 1.5px solid var(--text-light); color: var(--text-light); text-decoration: none; transition: transform 160ms cubic-bezier(0.23,1,0.32,1), background-color 160ms; }
.pk-link:active { transform: scale(0.97); }
@media (hover: hover) and (pointer: fine) { .pk-link:hover { background: var(--text-light); color: var(--bg); } }
.pk-link:focus-visible, .pk-mail:focus-visible, .pk-input:focus-visible, .pk-send:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.pk-form { display: flex; flex-direction: column; gap: 12px; }
.pk-input { width: 100%; box-sizing: border-box; font-family: var(--body); font-size: 17px; line-height: 1.5; padding: 16px 20px; border-radius: 18px; border: 1.5px solid var(--text-light); background: var(--bg); color: var(--text-light); }
.pk-input::placeholder { color: var(--text-dim); }
.pk-send { font-family: var(--body); font-weight: 700; font-size: 17px; min-height: 52px; border-radius: 999px; border: 2px solid var(--text-light); background: var(--accent); color: #fff; cursor: pointer; box-shadow: 4px 4px 0 var(--text-light); transition: transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms cubic-bezier(0.23,1,0.32,1); }
@media (hover: hover) and (pointer: fine) { .pk-send:hover:not(:disabled) { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--text-light); } }
.pk-send:active:not(:disabled) { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--text-light); }
.pk-send:disabled { opacity: 0.6; cursor: default; }
.pk-ok { font-family: var(--body); font-size: 20px; padding: 28px; border-radius: 20px; border: 1.5px solid var(--accent); background: var(--bg); color: var(--text-light); }
.pk-err { color: #B3261E; font-family: var(--body); font-size: 15px; }
@media (max-width: 820px) { .pk-card { grid-template-columns: minmax(0,1fr); border-radius: 26px; } }
@media (prefers-reduced-motion: reduce) { .pk-link, .pk-send { transition: none; } }
`;

export default function PickupWindow() {
  const [status, setStatus] = useState("idle");
  const reduced = !!useReducedMotion();
  async function onSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/mdawjoro", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) { setStatus("success"); e.target.reset(); } else setStatus("error");
    } catch { setStatus("error"); }
  }
  return (
    <div className="pk-card">
      <style>{CSS}</style>
      <div className="pk-stars" aria-hidden="true"><i style={{ left: "4%", top: "8%", animationDelay: "0s", width: 6, height: 6 }} /><i style={{ left: "48%", top: "6%", animationDelay: "1.1s", width: 4, height: 4 }} /><i style={{ left: "93%", top: "12%", animationDelay: "2.2s", width: 7, height: 7 }} /><i style={{ left: "52%", top: "92%", animationDelay: "0.6s", width: 5, height: 5 }} /><i style={{ left: "96%", top: "88%", animationDelay: "1.7s", width: 4, height: 4 }} /><i style={{ left: "3%", top: "86%", animationDelay: "2.6s", width: 6, height: 6 }} /><i style={{ left: "46%", top: "50%", animationDelay: "3.1s", width: 3, height: 3 }} /><i style={{ left: "70%", top: "4%", animationDelay: "0.3s", width: 5, height: 5 }} /></div>
      <div>
        <h2 className="pk-title">
          {reduced ? "Order's up. Say hi." : (
            <DecryptedText text="Order's up. Say hi." animateOn="inViewHover" sequential speed={45} maxIterations={10} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ·*" />
          )}
        </h2>
        <p className="pk-sub">Open to Summer 2027 internships in AI, marketing, and product management.</p>
        <a className="pk-mail" href="mailto:rasikap@utexas.edu">rasikap@utexas.edu</a>
        <div className="pk-links">
          <a className="pk-link" href="https://www.linkedin.com/in/rasikapatel/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="pk-link" href="https://apps.apple.com/us/app/xplore-austin/id6758564187" target="_blank" rel="noopener noreferrer">Xplore Austin on the App Store</a>
          <Link className="pk-link" to="/resume">Resume</Link>
        </div>
      </div>
      <div>
        {status === "success" ? (
          <div className="pk-ok" role="status">Message sent. Thanks for reaching out.</div>
        ) : (
          <form className="pk-form" onSubmit={onSubmit}>
            <input className="pk-input" required type="text" name="name" placeholder="Name" autoComplete="name" aria-label="Name" />
            <input className="pk-input" required type="email" name="email" placeholder="Email" autoComplete="email" aria-label="Email" />
            <textarea className="pk-input" required name="message" placeholder="Message" rows={4} aria-label="Message" />
            <button className="pk-send" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : "Send message"}</button>
            {status === "error" && <span className="pk-err" role="alert">Something went wrong. Please try again.</span>}
          </form>
        )}
      </div>
    </div>
  );
}
