"use client";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: "6+", label: "Projects Shipped" },
  { value: "1", label: "Live Product" },
  { value: "3rd", label: "Year B.Tech" },
  { value: "2027", label: "Graduating" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ background: "#0a0f1e", padding: "8rem 6vw", borderTop: "1px solid rgba(29,184,160,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="about-grid">

        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "1.5rem" }}>About Me</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#e8eaf0", lineHeight: 1.2, marginBottom: "1.5rem" }}>
            I don&apos;t just learn AI —<br />
            <span style={{ color: "#1db8a0" }}>I ship it.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.9, marginBottom: "1rem" }}>
            I&apos;m Narendran L — a third-year AI &amp; Data Science student at Rajalakshmi Institute of Technology, Chennai. While most students build tutorial projects, I build things people actually use.
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.9, marginBottom: "2rem" }}>
            <strong style={{ color: "rgba(232,234,240,0.8)" }}>ZipForgeX</strong> is live with real users. <strong style={{ color: "rgba(232,234,240,0.8)" }}>BizOp Analytica</strong> was built during my internship at Syncorb Geotech. I bridge the gap between ML research and production engineering.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#1db8a0", fontStyle: "italic", marginBottom: "2.5rem", borderLeft: "2px solid #1db8a0", paddingLeft: "1rem" }}>
            Currently targeting SDE and ML fresher roles at top product-based companies.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="https://linkedin.com/in/narendran-l1125" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", background: "#1db8a0", borderRadius: 999, color: "#0a0f1e", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none" }}>
              LinkedIn ↗
            </a>
            <a href="https://github.com/Narendran-ds" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", border: "1px solid rgba(29,184,160,0.4)", borderRadius: 999, color: "#1db8a0", fontSize: "0.88rem", textDecoration: "none" }}>
              GitHub
            </a>
            <a href="/Narendran_L_resume.pdf" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", border: "1px solid rgba(232,234,240,0.15)", borderRadius: 999, color: "rgba(232,234,240,0.6)", fontSize: "0.88rem", textDecoration: "none" }}>
              Resume ↗
            </a>
          </div>
        </div>

        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease 0.2s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                padding: "2rem", border: "1px solid rgba(29,184,160,0.15)",
                borderRadius: 16, background: "rgba(29,184,160,0.04)",
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
                transition: `all 0.6s ease ${0.3 + i * 0.1}s`,
              }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1db8a0", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.4)", marginTop: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Internship highlight */}
          <div style={{ padding: "1.5rem", border: "1px solid rgba(29,184,160,0.2)", borderRadius: 16, background: "rgba(29,184,160,0.05)" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "0.5rem" }}>Internship</div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#e8eaf0", marginBottom: "0.25rem" }}>AI Developer Intern</div>
            <div style={{ fontSize: "0.85rem", color: "rgba(232,234,240,0.45)" }}>Syncorb Geotech Pvt Ltd · 2024</div>
            <div style={{ fontSize: "0.82rem", color: "rgba(232,234,240,0.4)", marginTop: "0.5rem", lineHeight: 1.6 }}>
              Built BizOp Analytica — Gemini API + PaddleOCR pipeline for menu extraction and business analysis.
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}