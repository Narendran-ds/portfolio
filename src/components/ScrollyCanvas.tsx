"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 120;

function fade(p: number, i0: number, i1: number, o0: number, o1: number) {
  if (p < i0) return 0;
  if (p < i1) return (p - i0) / (i1 - i0);
  if (p < o0) return 1;
  if (p < o1) return 1 - (p - o0) / (o1 - o0);
  return 0;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastDrawnRef = useRef(-1);

  // Preload all frames eagerly
  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    // Preload in order so first frames appear fast
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}.webp`;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true);
      };
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    const img = imagesRef.current[idx];
    if (!img || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    const cr = w / h, ir = img.naturalWidth / img.naturalHeight;
    let rw = w, rh = h, ox = 0, oy = 0;
    if (cr > ir) { rh = w / ir; oy = (h - rh) / 2; }
    else { rw = h * ir; ox = (w - rw) / 2; }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.drawImage(img, ox, oy, rw, rh);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const c = containerRef.current;
      if (!c) return;
      const scrollable = c.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - c.offsetTop;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      progressRef.current = p;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // RAF loop — only redraws when frame changes
  useEffect(() => {
    if (!imagesLoaded) return;
    let rafId: number;
    drawFrame(0);

    const loop = () => {
      const fi = Math.round(progressRef.current * (TOTAL_FRAMES - 1));
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, fi));
      if (clamped !== lastDrawnRef.current) {
        drawFrame(clamped);
        lastDrawnRef.current = clamped;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [imagesLoaded, drawFrame]);

  const s1o = fade(progress, 0, 0.06, 0.2, 0.28);
  const s1y = progress < 0.06 ? 30 * (1 - progress / 0.06) : 0;
  const s2o = fade(progress, 0.28, 0.35, 0.5, 0.57);
  const s2x = progress < 0.35 ? -40 * (1 - Math.max(0, progress - 0.28) / 0.07) : 0;
  const s3o = fade(progress, 0.57, 0.64, 0.8, 0.88);
  const s3x = progress < 0.64 ? 40 * (1 - Math.max(0, progress - 0.57) / 0.07) : 0;

  return (
    <section ref={containerRef} style={{ position: "relative", width: "100%", height: "700vh" }}>
      <div style={{ position: "sticky", top: 0, width: "100%", height: "100vh", overflow: "hidden", background: "#060a10" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }}
        />

        {/* Very subtle gradient — doesn't kill the cinematic image */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,10,16,0.1) 0%, transparent 25%, rgba(6,10,16,0.2) 100%)", pointerEvents: "none" }} />

        {!imagesLoaded && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#060a10", zIndex: 50 }}>
            <div style={{ width: 36, height: 36, border: "2px solid rgba(249,115,22,0.3)", borderTopColor: "#F97316", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <p style={{ marginTop: 16, color: "rgba(250,250,250,0.4)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" }}>Loading...</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* S1 — center */}
        <div style={{ opacity: s1o, transform: `translateY(${s1y}px)`, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem", pointerEvents: "none", zIndex: 10 }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FAFAFA", marginBottom: "1.2rem" }}>
            AI Engineer · Full Stack Developer
          </div>
          <h1 style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1, letterSpacing: "-0.02em", textShadow: "0 4px 80px rgba(0,0,0,0.9)", margin: 0 }}>
            Narendran L<span style={{ color: "#F97316" }}>.</span>
          </h1>
          <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,#F97316,#FDBA74)", margin: "1.5rem auto", borderRadius: 1 }} />
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.65)", letterSpacing: "0.03em", maxWidth: "32ch", lineHeight: 1.5 }}>
            I ship real AI products — not just side projects.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", pointerEvents: "all" }}>
            <a href="#work" style={{ padding: "0.75rem 2rem", background: "#F97316", borderRadius: 999, color: "#0A0A0A", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", letterSpacing: "0.05em", boxShadow: "0 0 30px rgba(249,115,22,0.4)" }}>
              See My Work
            </a>
            <a href="https://zipforgex.in" target="_blank" rel="noopener noreferrer" style={{ padding: "0.75rem 2rem", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 999, color: "#FDBA74", fontSize: "0.9rem", textDecoration: "none", background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)" }}>
              ZipForgeX ↗
            </a>
          </div>
        </div>

        {/* S2 — left — UPDATED TEXT */}
        <div style={{ opacity: s2o, transform: `translateX(${s2x}px)`, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "0 8vw", pointerEvents: "none", zIndex: 10 }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "#F97316", textTransform: "uppercase", marginBottom: "1rem" }}>What I do</div>
          <p style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.1, maxWidth: "13ch", textShadow: "0 4px 60px rgba(0,0,0,0.9)" }}>
            From models to production — end to end.
          </p>
        </div>

        {/* S3 — right — UPDATED TEXT */}
        <div style={{ opacity: s3o, transform: `translateX(${s3x}px)`, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", padding: "0 8vw", textAlign: "right", pointerEvents: "none", zIndex: 10 }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "#F97316", textTransform: "uppercase", marginBottom: "1rem" }}>My edge</div>
          <p style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 700, color: "#FAFAFA", lineHeight: 1.1, maxWidth: "13ch", textShadow: "0 4px 60px rgba(0,0,0,0.9)" }}>
            AI that ships. Code that scales.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", opacity: progress < 0.04 ? 1 : 0, transition: "opacity 0.5s", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", pointerEvents: "none", zIndex: 20 }}>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(249,115,22,0.8), transparent)" }} />
        </div>
      </div>
    </section>
  );
}