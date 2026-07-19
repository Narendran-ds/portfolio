"use client";
import { useReveal, EASE } from "./useReveal";

const experiences = [
  {
    index: "01",
    role: "AI Developer Intern",
    company: "Syncorb Geotech Pvt Ltd",
    period: "2025 — 2026",
    type: "Internship",
    points: [
      "Replaced manual BeautifulSoup scripts and 5 Scrapy spiders with a single Gemini API pipeline generating 500+ global cuisines and up to 500 dishes per cuisine",
      "Added history tracking that skips completed entries on reruns — no repeated processing across pipeline runs",
      "Rebuilt the restaurant menu-extraction pipeline from scratch with PaddleOCR after Zomato restricted API access, replacing a broken 70%-complete prototype with a production batch system",
    ],
  },
  {
    index: "02",
    role: "B.Tech — AI & Data Science",
    company: "Rajalakshmi Institute of Technology",
    period: "2023 — 2027",
    type: "Education",
    points: [
      "Specializing in machine learning, deep learning and full-stack development",
      "Shipped production-grade work alongside coursework: ZipForgeX (live, OAuth2 + JWT) and SHAP-explainable ML dashboards",
      "Final year — graduating 2027",
    ],
  },
];

export default function Experience() {
  const { ref, vis } = useReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={ref}
      style={{ background: "var(--paper)", padding: "clamp(6rem, 10vw, 9rem) 4vw" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid var(--line)",
            paddingTop: "1.2rem",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            fontSize: "0.68rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>( 04 )</span>
          <span>Experience</span>
          <span>Where I&apos;ve been</span>
        </div>

        {experiences.map((e, i) => (
          <div
            key={e.index}
            className="exp-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "clamp(1.5rem, 4vw, 5rem)",
              borderTop: "1px solid var(--line)",
              padding: "clamp(2rem, 4vw, 3rem) 0",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(36px)",
              transition: `all 0.9s ${EASE} ${i * 0.15}s`,
            }}
          >
            <div>
              <div className="mono" style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                <span style={{ padding: "0.3rem 0.85rem", borderRadius: 999, border: "1px solid var(--line)", color: "var(--accent)" }}>{e.type}</span>
                <span style={{ color: "var(--ink-faint)" }}>{e.period}</span>
              </div>
              <h3 className="display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)", marginBottom: "0.4rem" }}>
                {e.role}
              </h3>
              <div className="mono" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                {e.company}
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "0.4rem" }}>
              {e.points.map((pt) => (
                <li key={pt} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: "0.8rem", marginTop: "0.2rem" }}>→</span>
                  <span style={{ fontSize: "0.92rem", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 300 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>

      <style>{`@media(max-width:860px){.exp-row{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
