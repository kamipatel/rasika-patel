import { useState, useEffect } from "react";

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("animate"); // 'animate' → 'exit' → 'done'

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), 1000);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "exit" ? "exit" : ""}`}>
      <div className="preloader-logo">
        <span className="accent">R</span>P
      </div>
    </div>
  );
}
