"use client";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: "6+", label: "Projects Built" },
  { value: "3rd", label: "Year B.Tech" },
  { value: "AI/DS", label: "Specialization" },
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
            Building intelligent systems that feel <span style={{ color: "#1db8a0" }}>alive.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.8, marginBottom: "1rem" }}>
            I&apos;m Narendran L — a third-year AI &amp; Data Science student at Rajalakshmi Institute of Technology, Chennai. I specialize in building full-stack web applications and machine learning systems that solve real problems.
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            From Spring Boot backends to PyTorch models, I bridge the gap between design, data, and engineering. Currently targeting SDE and ML fresher roles.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="https://linkedin.com/in/narendran-l1125" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", background: "#1db8a0", borderRadius: 999, color: "#0a0f1e", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", letterSpacing: "0.05em" }}>
              View LinkedIn
            </a>
            <a href="https://github.com/Narendran-ds" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", border: "1px solid rgba(29,184,160,0.4)", borderRadius: 999, color: "#1db8a0", fontSize: "0.88rem", textDecoration: "none" }}>
              GitHub
            </a>
          </div>
        </div>

        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease 0.2s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ padding: "2rem", border: "1px solid rgba(29,184,160,0.15)", borderRadius: 16, background: "rgba(29,184,160,0.04)", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all 0.6s ease ${0.3 + i * 0.1}s` }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1db8a0", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(232,234,240,0.45)", marginTop: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
