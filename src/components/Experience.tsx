"use client";
import { useRef, useEffect, useState } from "react";

const experiences = [
  {
    role: "AI Developer Intern",
    company: "Syncorb Geotech Pvt Ltd",
    period: "2024",
    type: "Internship",
    points: [
      "Built BizOp Analytica — a Gemini API pipeline for business opportunity analysis",
      "Implemented PaddleOCR for automated menu text extraction",
      "Developed end-to-end data processing pipeline in Python",
    ],
  },
  {
    role: "B.Tech — AI & Data Science",
    company: "Rajalakshmi Institute of Technology",
    period: "2023 — Present",
    type: "Education",
    points: [
      "Specializing in Machine Learning, Deep Learning, and Full Stack Development",
      "Built 6+ production-grade projects spanning web apps and ML systems",
      "Currently in 3rd year, graduating 2026",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} style={{ background: "#070c1a", padding: "7rem 6vw", borderTop: "1px solid rgba(29,184,160,0.1)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "1rem" }}>Journey</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#e8eaf0" }}>Experience</h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #1db8a0, rgba(29,184,160,0.1))" }} />

          {experiences.map((e, i) => (
            <div key={e.role} style={{ paddingLeft: "3rem", paddingBottom: "3rem", position: "relative", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `all 0.7s ease ${i * 0.15}s` }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: -5, top: 6, width: 11, height: 11, borderRadius: "50%", background: "#1db8a0", border: "2px solid #070c1a", boxShadow: "0 0 12px rgba(29,184,160,0.6)" }} />

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.65rem", padding: "0.2rem 0.7rem", background: "rgba(29,184,160,0.15)", border: "1px solid rgba(29,184,160,0.3)", borderRadius: 999, color: "#1db8a0", letterSpacing: "0.1em", textTransform: "uppercase" }}>{e.type}</span>
                <span style={{ fontSize: "0.8rem", color: "rgba(232,234,240,0.35)", letterSpacing: "0.05em" }}>{e.period}</span>
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#e8eaf0", marginBottom: "0.3rem" }}>{e.role}</h3>
              <div style={{ fontSize: "0.9rem", color: "#1db8a0", marginBottom: "1.25rem" }}>{e.company}</div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {e.points.map(pt => (
                  <li key={pt} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#1db8a0", marginTop: "0.3rem", flexShrink: 0, fontSize: "0.7rem" }}>▹</span>
                    <span style={{ fontSize: "0.9rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.7 }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
