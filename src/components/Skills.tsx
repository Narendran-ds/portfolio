"use client";
import { useRef, useEffect, useState } from "react";

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
    <section id="stack" ref={ref} style={{ background: "#070c1a", padding: "7rem 6vw", borderTop: "1px solid rgba(29,184,160,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "1rem" }}>Capabilities</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#e8eaf0" }}>What I Build</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {skills.map((s, i) => (
            <div key={s.title}
              style={{ padding: "2.5rem 2rem", border: "1px solid rgba(29,184,160,0.12)", borderRadius: 20, background: "rgba(29,184,160,0.03)", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `all 0.7s ease ${i * 0.1}s`, cursor: "default" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29,184,160,0.4)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(29,184,160,0.07)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29,184,160,0.12)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(29,184,160,0.03)"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#1db8a0" }}>{s.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#e8eaf0", marginBottom: "0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.88rem", color: "rgba(232,234,240,0.45)", lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
