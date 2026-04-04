"use client";
import { useRef, useEffect, useState } from "react";

const BG = "radial-gradient(ellipse at 80% 20%, #1f0d00 0%, #0d1117 45%, #060a10 100%)";
const ACCENT = "#F97316";
const ACCENT2 = "#FDBA74";
const BORDER = "rgba(249,115,22,0.15)";
const TEXT = "#FAFAFA";
const MUTED = "rgba(250,250,250,0.45)";
const CARD = "rgba(15,10,5,0.7)";

const skills = [
  { icon: "⬡", title: "Full Stack Development", desc: "Building scalable web apps with Spring Boot, React, PostgreSQL, JWT Auth, OAuth2 — from zero to production." },
  { icon: "◈", title: "AI & ML Engineering", desc: "XGBoost, PyTorch, LLM pipelines, RAG systems, SHAP explainability. Models that explain themselves." },
  { icon: "⟐", title: "API & Backend Design", desc: "REST APIs, JWT auth, OAuth2 with Google/GitHub, Railway & Vercel deployment pipelines." },
  { icon: "⌬", title: "Developer Tooling", desc: "Building productivity tools that solve real problems. ZipForgeX is live at zipforgex.in." },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stack" ref={ref} style={{ background: BG, padding: "7rem 6vw", /* seamless */ }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase", marginBottom: "1rem" }}>Capabilities</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: TEXT }}>What I Build</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {skills.map((s, i) => (
            <div key={s.title}
              style={{ padding: "2.5rem 2rem", border: `1px solid ${BORDER}`, borderRadius: 20, background: CARD, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `all 0.7s ease ${i * 0.1}s`, cursor: "default" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(249,115,22,0.4)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(249,115,22,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = BORDER; (e.currentTarget as HTMLDivElement).style.background = CARD; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem", color: ACCENT }}>{s.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: TEXT, marginBottom: "0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}