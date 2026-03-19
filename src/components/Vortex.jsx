import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function Vortex({
  particleCount = 700,
  rangeY = 100,
  baseHue = 20,
  baseSpeed = 0.5,
  rangeSpeed = 1.5,
  containerRef
}) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  const initParticles = useCallback((w, h) => {
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
        particles.current.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * baseSpeed,
            vy: (Math.random() - 0.5) * baseSpeed,
            size: Math.random() * 2,
            opacity: Math.random() * 0.5 + 0.2,
            hue: baseHue + Math.random() * 30
        });
    }
  }, [particleCount, baseHue, baseSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e) => {
        mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.current.forEach(p => {
            // Apply mouse gravity
            const dx = mouse.current.x - p.x;
            const dy = mouse.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                p.vx += dx * 0.0001;
                p.vy += dy * 0.0001;
            } else {
                p.vx *= 0.99;
                p.vy *= 0.99;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`;
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initParticles]);

  return (
    <canvas
        ref={canvasRef}
        style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
            zIndex: 1,
            pointerEvents: "none"
        }}
    />
  );
}
