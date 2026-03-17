import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollSequence({ frameCount, framePath, scrollRef, enabled = true }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const rafRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [frameCount, framePath]);

  // Draw a frame with cover-fit
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fit math
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  // Resize canvas for retina
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(frameIndexRef.current);
  }, [drawFrame]);

  // Scroll + resize handling
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const section = scrollRef.current;
    if (!canvas || !section) return;

    // If disabled (reduced motion or mobile), draw frame 0 once
    if (!enabled) {
      updateCanvasSize();
      frameIndexRef.current = 0;
      drawFrame(0);

      const ro = new ResizeObserver(() => {
        updateCanvasSize();
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    // Initial sizing
    updateCanvasSize();

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const newIndex = Math.min(Math.floor(progress * frameCount), frameCount - 1);

      if (newIndex !== frameIndexRef.current) {
        frameIndexRef.current = newIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          drawFrame(newIndex);
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial draw

    const ro = new ResizeObserver(() => {
      updateCanvasSize();
    });
    ro.observe(canvas);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, enabled, frameCount, scrollRef, drawFrame, updateCanvasSize]);

  return { canvasRef, isLoaded };
}
