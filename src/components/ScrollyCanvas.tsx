"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 120;
const EAGER_FRAMES = 10; // show canvas after this many frames load

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
  const [loadedCount, setLoadedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const lastDrawnRef = useRef(-1);

  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const loadImg = (i: number) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}.webp`;
      img.onload = img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        // Show canvas as soon as first EAGER_FRAMES are ready
        if (loaded === EAGER_FRAMES) setImagesLoaded(true);
      };
      imgs[i] = img;
    };

    // Load first EAGER_FRAMES immediately
    for (let i = 0; i < EAGER_FRAMES; i++) loadImg(i);

    // Load remaining frames shortly after — non-blocking
    setTimeout(() => {
      for (let i = EAGER_FRAMES; i < TOTAL_FRAMES; i++) loadImg(i);
    }, 200);

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

  const progressPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  const s1o = fade(progress, 0, 0.06, 0.2, 0.28);
  const s1y = progress < 0.06 ? 30 * (1 - progress / 0.06) : 0;
  const s2o = fade(progress, 0.28, 0.35, 0.5, 0.57);
  const s2x = progress < 0.35 ? -40 * (1 - Math.max(0, progress - 0.28) / 0.07) : 0;
  const s3o = fade(progress, 0.57, 0.64, 0.8, 0.88);
  const s3x = progress < 0.64 ? 40 * (1 - Math.max(0, progress - 0.57) / 0.07) : 0;

  return (
    <section id="top" ref={containerRef} style={{ position: "relative", width: "100%", height: "700vh" }}>
      <div style={{ position: "sticky", top: 0, width: "100%", height: "100vh", overflow: "hidden", background: "#0a0705" }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }}
        />

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,7,5,0.15) 0%, transparent 25%, rgba(10,7,5,0.3) 100%)", pointerEvents: "none" }} />

        {/* Loading overlay — editorial cream preloader */}
        {!imagesLoaded && (
          <div style={{
            position: "absolute", inset: 0,
            background: "#F2EEE3", zIndex: 50,
            padding: "clamp(1.5rem, 4vw, 3rem)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div className="mono" style={{
              fontSize: "0.7rem", letterSpacing: "0.24em", textTransform: "uppercase",
              color: "rgba(23,19,16,0.55)", display: "flex", justifyContent: "space-between",
            }}>
              <span>Narendran L — Portfolio</span>
              <span>Chennai, IN</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
              <div>
                <div className="mono" style={{
                  fontSize: "0.68rem", letterSpacing: "0.24em", textTransform: "uppercase",
                  color: "#E8500A", marginBottom: "0.75rem",
                }}>
                  Loading sequence
                </div>
                <div style={{ width: 220, height: 1, background: "rgba(23,19,16,0.15)" }}>
                  <div style={{
                    height: "100%", width: `${progressPct}%`,
                    background: "#171310",
                    transition: "width 0.15s cubic-bezier(0.32,0.72,0,1)",
                  }} />
                </div>
              </div>
              <div className="display" style={{
                fontSize: "clamp(5rem, 16vw, 12rem)", fontWeight: 800, lineHeight: 0.85,
                color: "#171310", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em",
              }}>
                {progressPct}
                <span style={{ color: "#E8500A" }}>%</span>
              </div>
            </div>
          </div>
        )}

        {/* S1 — bottom-left editorial block */}
        <div style={{ opacity: s1o, transform: `translateY(${s1y}px)`, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", padding: "0 4vw 9vh", pointerEvents: "none", zIndex: 10 }}>
          <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,238,227,0.75)", marginBottom: "1.4rem" }}>
            AI Engineer — Full Stack Developer
          </div>
          <h1 className="display" style={{ fontSize: "clamp(2.4rem, 7.6vw, 8.5rem)", fontWeight: 900, color: "#F2EEE3", lineHeight: 1, letterSpacing: "-0.03em", textShadow: "0 4px 80px rgba(0,0,0,0.8)", margin: 0, textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Narendran L<span style={{ color: "#E8500A" }}>.</span>
          </h1>
          <p style={{ marginTop: "1.2rem", fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)", fontWeight: 300, color: "rgba(242,238,227,0.75)", letterSpacing: "0.02em", maxWidth: "42ch", lineHeight: 1.6, textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}>
            I build AI products that make it out of the notebook — models, backends, frontends, and the infrastructure in between.
          </p>
          <div style={{ display: "flex", gap: "0.85rem", marginTop: "2.5rem", pointerEvents: "all", flexWrap: "wrap" }}>
            <a href="#work" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.55rem 0.55rem 0.55rem 1.4rem", background: "#F2EEE3", borderRadius: 999, color: "#171310", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>
              Selected work
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#E8500A", color: "#F2EEE3", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>↓</span>
            </a>
            <a href="https://zipforgex.in" target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.55rem 0.55rem 0.55rem 1.4rem", border: "1px solid rgba(242,238,227,0.35)", borderRadius: 999, color: "#F2EEE3", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", background: "rgba(10,7,5,0.25)", backdropFilter: "blur(12px)" }}>
              ZipForgeX — Live
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(242,238,227,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>↗</span>
            </a>
          </div>
        </div>

        {/* S2 — left */}
        <div style={{ opacity: s2o, transform: `translateX(${s2x}px)`, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "0 6vw", pointerEvents: "none", zIndex: 10 }}>
          <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "#E8500A", textTransform: "uppercase", marginBottom: "1.2rem" }}>( 01 — What I do )</div>
          <p className="display" style={{ fontSize: "clamp(2.1rem, 5.4vw, 5rem)", fontWeight: 800, color: "#F2EEE3", lineHeight: 1.06, maxWidth: "15ch", letterSpacing: "-0.01em", textShadow: "0 4px 60px rgba(0,0,0,0.85)", textTransform: "uppercase" }}>
            From <span className="serif" style={{ color: "#E8500A" }}>dataset</span> to <span className="serif" style={{ color: "#E8500A" }}>deployed</span> — the whole thing.
          </p>
        </div>

        {/* S3 — right */}
        <div style={{ opacity: s3o, transform: `translateX(${s3x}px)`, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", padding: "0 6vw", textAlign: "right", pointerEvents: "none", zIndex: 10 }}>
          <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "#E8500A", textTransform: "uppercase", marginBottom: "1.2rem" }}>( 02 — Right now )</div>
          <p className="display" style={{ fontSize: "clamp(2.1rem, 5.4vw, 5rem)", fontWeight: 800, color: "#F2EEE3", lineHeight: 1.06, maxWidth: "15ch", letterSpacing: "-0.01em", textShadow: "0 4px 60px rgba(0,0,0,0.85)", textTransform: "uppercase" }}>
            Final year. Open to <span className="serif" style={{ color: "#E8500A" }}>SDE & ML</span> roles.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2.5rem", right: "4vw", opacity: progress < 0.04 ? 1 : 0, transition: "opacity 0.5s", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", pointerEvents: "none", zIndex: 20 }}>
          <span className="mono" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(242,238,227,0.5)", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(232,80,10,0.9), transparent)" }} />
        </div>
      </div>
    </section>
  );
}