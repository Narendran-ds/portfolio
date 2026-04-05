"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const BG = "radial-gradient(ellipse at 80% 20%, #1f0d00 0%, #0d1117 45%, #060a10 100%)";
const ACCENT = "#F97316";
const ACCENT2 = "#FDBA74";
const BORDER = "rgba(249,115,22,0.15)";
const TEXT = "#FAFAFA";
const MUTED = "rgba(250,250,250,0.45)";
const CARD = "rgba(20,12,5,0.85)";

const projects = [
  {
    tag: "Full Stack Web App · LIVE",
    title: "ZipForgeX",
    problem: "Developers waste time manually creating folder structures and ZIP files for project scaffolding.",
    impact: "Live at zipforgex.in with real users, JWT + OAuth2 auth, ZIP history, custom domain.",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Railway", "Vercel"],
    live: "https://zipforgex.in",
    github: "",           // no github for zipforgex
    img: "/projects/zipforgex.in.png",
  },
  {
    tag: "Machine Learning",
    title: "Customer Churn Prediction with Explainable AI",
    problem: "Businesses can't identify which customers are about to leave until it's too late.",
    impact: "~81% accuracy. Interactive Streamlit dashboard for non-technical business users.",
    tech: ["Python", "XGBoost", "SHAP", "scikit-learn", "Streamlit"],
    live: "",
    github: "https://github.com/Narendran-ds/Customer-churn-prediction-with-XAI-",
    img: "/projects/churn.png",
  },
  {
    tag: "NLP + ML",
    title: "Political Sentiment Dashboard",
    problem: "Tracking public sentiment on geopolitical events across thousands of tweets is impossible manually.",
    impact: "6-tab Streamlit dashboard. 78.75% SVM accuracy on Ukraine-Russia war tweet dataset.",
    tech: ["Python", "scikit-learn", "NLTK", "SHAP", "Tweepy"],
    live: "",
    github: "https://github.com/Narendran-ds/Political-Sentiment-Analysis",
    img: "/projects/sentiment.png",
  },
  {
    tag: "Deep Learning",
    title: "English-to-French NMT",
    problem: "Understanding how neural translation works requires building from scratch — not using APIs.",
    impact: "No pretrained models. Full custom PyTorch seq2seq transformer architecture.",
    tech: ["Python", "PyTorch", "Transformer", "seq2seq"],
    live: "",
    github: "https://github.com/Narendran-ds/english-french-nmt.git",
    img: "/projects/nmt.png",
  },
  {
    tag: "AI · Internship @ Syncorb",
    title: "BizOp Analytica",
    problem: "Restaurant menu data is locked in images — impossible to analyze at scale.",
    impact: "Built during internship at Syncorb Geotech. Production-grade pipeline with real client data.",
    tech: ["Gemini API", "PaddleOCR", "Python", "FastAPI"],
    live: "",
    github: "",           // no live/github for internship
    img: "/projects/bizop.png",
  },
  {
    tag: "Data Engineering",
    title: "Retail Sales Pipeline",
    problem: "Raw sales CSVs are messy and impossible to visualize without significant preprocessing.",
    impact: "5 advanced Plotly charts: choropleth, 3D scatter, waterfall, violin, heatmap.",
    tech: ["Python", "Pandas", "Plotly", "Parquet"],
    live: "",
    github: "https://github.com/Narendran-ds/retail-sales-2019-pipeline",
    img: "/projects/retail.png",
  },
];

const looped = [...projects, ...projects, ...projects];
const CARD_W = 380;
const GAP = 24;
const TOTAL_W = projects.length * (CARD_W + GAP);

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const [paused, setPaused] = useState(false);
  const offsetRef = useRef(TOTAL_W);
  const animRef = useRef<number>();
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // clamp offset within valid infinite range
  const clamp = (val: number) => {
    if (val < TOTAL_W * 0.5) return val + TOTAL_W;
    if (val > TOTAL_W * 2.5) return val - TOTAL_W;
    return val;
  };

  const applyOffset = (val: number) => {
    const clamped = clamp(val);
    offsetRef.current = clamped;
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${clamped}px)`;
  };

  // RAF auto-scroll
  useEffect(() => {
    const speed = 1;
    const step = () => {
      if (!paused && !isDragging.current) {
        applyOffset(offsetRef.current + speed);
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [paused]);

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    const dx = e.clientX - lastX.current;
    if (dt > 0) velocity.current = dx / dt;
    lastX.current = e.clientX;
    lastTime.current = now;
    const delta = e.clientX - dragStartX.current;
    applyOffset(dragStartOffset.current - delta);
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (wrapRef.current) wrapRef.current.style.cursor = "grab";
    // momentum fling
    let v = -velocity.current * 12;
    const fling = () => {
      if (Math.abs(v) < 0.1) return;
      applyOffset(offsetRef.current + v);
      v *= 0.93;
      requestAnimationFrame(fling);
    };
    requestAnimationFrame(fling);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = offsetRef.current;
    lastX.current = e.touches[0].clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    const dx = e.touches[0].clientX - lastX.current;
    if (dt > 0) velocity.current = dx / dt;
    lastX.current = e.touches[0].clientX;
    lastTime.current = now;
    const delta = e.touches[0].clientX - dragStartX.current;
    applyOffset(dragStartOffset.current - delta);
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    let v = -velocity.current * 12;
    const fling = () => {
      if (Math.abs(v) < 0.1) return;
      applyOffset(offsetRef.current + v);
      v *= 0.93;
      requestAnimationFrame(fling);
    };
    requestAnimationFrame(fling);
  };

  // Trackpad / wheel horizontal scroll
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    applyOffset(offsetRef.current + e.deltaX + e.deltaY * 0.5);
  };

  return (
    <section id="work" ref={ref} style={{ background: BG, padding: "7rem 0" }}>
      {/* Header */}
      <div style={{ padding: "0 6vw", maxWidth: 1200, margin: "0 auto 4rem" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase", marginBottom: "1rem" }}>Selected Work</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: TEXT }}>Projects</h2>
            <p style={{ fontSize: "0.85rem", color: MUTED, fontStyle: "italic" }}>Drag or scroll to explore →</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={wrapRef}
        style={{ overflow: "hidden", width: "100%", cursor: "grab", userSelect: "none" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); if (!isDragging.current) isDragging.current = false; onMouseUp(); }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: GAP,
            width: "max-content",
            transform: `translateX(-${TOTAL_W}px)`,
            willChange: "transform",
            paddingBottom: 8,
          }}
        >
          {looped.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              style={{
                width: CARD_W,
                flexShrink: 0,
                border: `1px solid ${BORDER}`,
                borderRadius: 20,
                overflow: "hidden",
                background: CARD,
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.3s",
                pointerEvents: "all",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
            >
              {/* Screenshot */}
              <div style={{ height: 200, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover", objectPosition: "top" }} draggable={false} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(20,12,5,0.97) 100%)" }} />
                <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
                  <div style={{ fontSize: "0.58rem", color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{p.tag}</div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{p.title}</div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase", marginBottom: "0.3rem" }}>Problem</div>
                  <p style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.65 }}>{p.problem}</p>
                </div>
                <div>
                  <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase", marginBottom: "0.3rem" }}>Impact</div>
                  <p style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.65 }}>{p.impact}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto", paddingTop: "0.5rem" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: "0.65rem", padding: "0.2rem 0.55rem", borderRadius: 999, border: `1px solid rgba(253,186,116,0.2)`, color: ACCENT2 }}>{t}</span>
                  ))}
                </div>

                {/* Buttons — conditional per project */}
                {(p.live || p.github) && (
                  <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.25rem" }}>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        onMouseDown={e => e.stopPropagation()}
                        style={{ flex: 1, padding: "0.55rem", background: ACCENT, borderRadius: 8, color: "#0A0A0A", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", textAlign: "center" }}>
                        View Live ↗
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        onMouseDown={e => e.stopPropagation()}
                        style={{ flex: 1, padding: "0.55rem", border: `1px solid ${BORDER}`, borderRadius: 8, color: ACCENT, fontSize: "0.78rem", textDecoration: "none", textAlign: "center" }}>
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge fades */}
      <div style={{ position: "relative", pointerEvents: "none", marginTop: -420, height: 420 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to right, #060a10, transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to left, #060a10, transparent)", zIndex: 2 }} />
      </div>
    </section>
  );
}