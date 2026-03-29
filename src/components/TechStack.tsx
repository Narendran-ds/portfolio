"use client";
import { useRef, useEffect, useState } from "react";

const techGroups = [
  {
    category: "Languages",
    items: ["Java", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "HTML & CSS"],
  },
  {
    category: "Backend & DB",
    items: ["Spring Boot", "REST APIs", "PostgreSQL", "JWT Auth", "OAuth2"],
  },
  {
    category: "ML / AI",
    items: ["PyTorch", "XGBoost", "scikit-learn", "SHAP", "Gemini API", "PaddleOCR"],
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "Railway", "Vercel", "Cloudflare", "Maven", "Streamlit"],
  },
];

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#0a0f1e", padding: "7rem 6vw", borderTop: "1px solid rgba(29,184,160,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "1rem" }}>Technologies</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#e8eaf0" }}>Tech Stack</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {techGroups.map((g, gi) => (
            <div key={g.category} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)", transition: `all 0.7s ease ${gi * 0.1}s` }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(232,234,240,0.3)", textTransform: "uppercase", marginBottom: "1rem" }}>{g.category}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {g.items.map((item, ii) => (
                  <span key={item} style={{ padding: "0.5rem 1.2rem", border: "1px solid rgba(29,184,160,0.2)", borderRadius: 999, fontSize: "0.88rem", color: "rgba(232,234,240,0.7)", background: "rgba(29,184,160,0.04)", opacity: vis ? 1 : 0, transform: vis ? "none" : "scale(0.9)", transition: `all 0.5s ease ${gi * 0.1 + ii * 0.03}s`, cursor: "default" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = "#1db8a0"; (e.currentTarget as HTMLSpanElement).style.color = "#1db8a0"; (e.currentTarget as HTMLSpanElement).style.background = "rgba(29,184,160,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(29,184,160,0.2)"; (e.currentTarget as HTMLSpanElement).style.color = "rgba(232,234,240,0.7)"; (e.currentTarget as HTMLSpanElement).style.background = "rgba(29,184,160,0.04)"; }}
                  >{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
