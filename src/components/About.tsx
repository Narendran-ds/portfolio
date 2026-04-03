"use client";
import { useRef, useEffect, useState } from "react";

const BG = "radial-gradient(ellipse at 80% 20%, #1f0d00 0%, #0d1117 45%, #060a10 100%)";
const CARD = "rgba(15,13,10,0.8)";
const ACCENT = "#F97316";
const ACCENT2 = "#FDBA74";
const BORDER = "rgba(249,115,22,0.15)";
const TEXT = "#FAFAFA";
const MUTED = "rgba(250,250,250,0.45)";

const stats = [
  { value: "6+", label: "Projects Shipped" },
  { value: "1", label: "Live Product" },
  { value: "3rd", label: "Year B.Tech" },
  { value: "2026", label: "Graduating" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ background: BG, padding: "8rem 6vw", /* seamless */ }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="about-grid">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase", marginBottom: "1.5rem" }}>About Me</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: TEXT, lineHeight: 1.2, marginBottom: "0.5rem" }}>
            I don&apos;t just learn AI —
          </h2>
          <div style={{ width: 40, height: 2, background: `linear-gradient(90deg,${ACCENT},${ACCENT2})`, marginBottom: "0.75rem", borderRadius: 1 }} />
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: ACCENT, marginBottom: "1.5rem" }}>I ship it.</h2>
          <p style={{ fontSize: "1rem", color: MUTED, lineHeight: 1.9, marginBottom: "1rem" }}>
            I&apos;m Narendran L — a third-year AI &amp; Data Science student at Rajalakshmi Institute of Technology, Chennai. While most students build tutorial projects, I build things people actually use.
          </p>
          <p style={{ fontSize: "1rem", color: MUTED, lineHeight: 1.9, marginBottom: "2rem" }}>
            <strong style={{ color: TEXT }}>ZipForgeX</strong> is live with real users. <strong style={{ color: TEXT }}>BizOp Analytica</strong> was built during my internship at Syncorb Geotech. I bridge the gap between ML research and production engineering.
          </p>
          <p style={{ fontSize: "0.9rem", color: ACCENT2, fontStyle: "italic", marginBottom: "2.5rem", borderLeft: `2px solid ${ACCENT}`, paddingLeft: "1rem" }}>
            Currently targeting SDE and ML fresher roles at top product-based companies.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="https://linkedin.com/in/narendran-l1125" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", background: ACCENT, borderRadius: 999, color: "#0A0A0A", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}>LinkedIn ↗</a>
            <a href="https://github.com/Narendran-ds" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", border: `1px solid ${BORDER}`, borderRadius: 999, color: ACCENT, fontSize: "0.88rem", textDecoration: "none" }}>GitHub</a>
            <a href="/Narendran_L_resume.pdf" target="_blank" rel="noopener noreferrer" style={{ padding: "0.7rem 1.8rem", border: "1px solid rgba(250,250,250,0.1)", borderRadius: 999, color: MUTED, fontSize: "0.88rem", textDecoration: "none" }}>Resume ↗</a>
          </div>
        </div>

        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease 0.2s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ padding: "2rem", border: `1px solid ${BORDER}`, borderRadius: 16, background: CARD, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all 0.6s ease ${0.3 + i * 0.1}s` }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 700, color: ACCENT, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.78rem", color: MUTED, marginTop: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "1.5rem", border: `1px solid rgba(253,186,116,0.15)`, borderRadius: 16, background: CARD }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: ACCENT2, textTransform: "uppercase", marginBottom: "0.5rem" }}>Internship</div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: TEXT, marginBottom: "0.25rem" }}>AI Developer Intern</div>
            <div style={{ fontSize: "0.85rem", color: MUTED }}>Syncorb Geotech Pvt Ltd · 2024</div>
            <div style={{ fontSize: "0.82rem", color: MUTED, marginTop: "0.5rem", lineHeight: 1.6 }}>Built BizOp Analytica — Gemini API + PaddleOCR pipeline for menu extraction and business analysis.</div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}