"use client";
import { useRef, useEffect, useState } from "react";

const BG = "radial-gradient(ellipse at 80% 20%, #1f0d00 0%, #0d1117 45%, #060a10 100%)";
const ACCENT = "#F97316";
const ACCENT2 = "#FDBA74";
const BORDER = "rgba(249,115,22,0.15)";
const BORDER2 = "rgba(253,186,116,0.2)";
const TEXT = "#FAFAFA";
const MUTED = "rgba(250,250,250,0.45)";

const techGroups = [
  { category: "Languages", items: ["Java", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Tailwind CSS"] },
  { category: "Backend & DB", items: ["Spring Boot", "PostgreSQL"] },
  { category: "ML / AI", items: ["PyTorch", "XGBoost", "scikit-learn", "SHAP", "Gemini API", "PaddleOCR"] },
  { category: "DevOps & Tools", items: ["Git", "Railway", "Vercel", "Cloudflare", "Maven", "Streamlit"] },
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
    <section ref={ref} style={{ background: BG, padding: "7rem 6vw", /* seamless */ }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase", marginBottom: "1rem" }}>Technologies</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: TEXT }}>Tech Stack</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {techGroups.map((g, gi) => (
            <div key={g.category} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)", transition: `all 0.7s ease ${gi * 0.1}s` }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: MUTED, textTransform: "uppercase", marginBottom: "1rem" }}>{g.category}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {g.items.map((item, ii) => (
                  <span key={item}
                    style={{ padding: "0.5rem 1.2rem", border: `1px solid ${BORDER2}`, borderRadius: 999, fontSize: "0.88rem", color: ACCENT2, background: "rgba(253,186,116,0.04)", opacity: vis ? 1 : 0, transform: vis ? "none" : "scale(0.9)", transition: `all 0.5s ease ${gi * 0.1 + ii * 0.03}s`, cursor: "default" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = ACCENT; (e.currentTarget as HTMLSpanElement).style.color = ACCENT; (e.currentTarget as HTMLSpanElement).style.background = "rgba(249,115,22,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = BORDER2; (e.currentTarget as HTMLSpanElement).style.color = ACCENT2; (e.currentTarget as HTMLSpanElement).style.background = "rgba(253,186,116,0.04)"; }}
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