"use client";
import { useState } from "react";
import { useReveal, EASE } from "./useReveal";

type Capability = {
  index: string;
  title: string;
  description: string;
  tech: string[];
  proof: string;
};

const capabilities: Capability[] = [
  {
    index: "01",
    title: "Full-Stack Engineering",
    description:
      "Complete web applications — Spring Boot APIs, React frontends, JWT & OAuth2 auth, PostgreSQL schemas, CI/CD to production. One coherent system, not stitched-together tutorials.",
    tech: ["Spring Boot", "React", "PostgreSQL", "OAuth2", "Vercel", "Railway"],
    proof: "ZipForgeX — live at zipforgex.in with real users",
  },
  {
    index: "02",
    title: "Machine Learning",
    description:
      "End-to-end pipelines: feature engineering, model selection, tuning, and SHAP explainability — turned into dashboards a non-technical stakeholder can actually use.",
    tech: ["PyTorch", "XGBoost", "scikit-learn", "SHAP", "Streamlit", "Pandas"],
    proof: "81% churn accuracy, every prediction explained",
  },
  {
    index: "03",
    title: "LLM & Vision Pipelines",
    description:
      "Production GenAI systems — Gemini-driven data generation, PaddleOCR extraction, YOLOv8 detection with deterministic reasoning layers that keep every decision traceable.",
    tech: ["Gemini API", "PaddleOCR", "YOLOv8", "FastAPI", "ByteTrack"],
    proof: "Deployed at Syncorb Geotech; 58 tests on ChainSight",
  },
  {
    index: "04",
    title: "Infra & Tooling",
    description:
      "The unglamorous parts that make products real: Cloudflare DNS, Render backends, Supabase, Docker, history-tracking batch systems that survive reruns at 2 AM.",
    tech: ["Cloudflare", "Docker", "Supabase", "Render", "Maven", "Git"],
    proof: "Custom domains, batch reliability, zero babysitting",
  },
];

export default function Skills() {
  const { ref, vis } = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
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
          <span style={{ color: "var(--accent)" }}>( 02 )</span>
          <span>Capabilities</span>
          <span>What I&apos;m good at</span>
        </div>

        <div>
          {capabilities.map((cap, i) => {
            const isActive = active === i;
            return (
              <div
                key={cap.index}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  borderTop: "1px solid var(--line)",
                  padding: "clamp(1.8rem, 3vw, 2.6rem) 0",
                  display: "grid",
                  gridTemplateColumns: "80px 1.1fr 1fr",
                  gap: "clamp(1rem, 3vw, 3rem)",
                  alignItems: "start",
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(36px)",
                  transition: `opacity 0.9s ${EASE} ${i * 0.1}s, transform 0.9s ${EASE} ${i * 0.1}s, background 0.5s ${EASE}`,
                  background: isActive ? "var(--paper-2)" : "transparent",
                  cursor: "default",
                }}
                className="cap-row"
              >
                <span
                  className="mono"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.2em",
                    color: isActive ? "var(--accent)" : "var(--ink-faint)",
                    paddingTop: "0.8rem",
                    transition: `color 0.4s ${EASE}`,
                  }}
                >
                  /{cap.index}
                </span>

                <h3
                  className="display"
                  style={{
                    fontSize: "clamp(1.7rem, 3.6vw, 3.2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    color: "var(--ink)",
                    transform: isActive ? "translateX(10px)" : "none",
                    transition: `transform 0.5s ${EASE}`,
                  }}
                >
                  {cap.title}
                </h3>

                <div>
                  <p style={{ fontSize: "0.95rem", color: "var(--ink-soft)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.1rem" }}>
                    {cap.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.9rem" }}>
                    {cap.tech.map((t) => (
                      <span
                        key={t}
                        className="mono"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.3rem 0.75rem",
                          borderRadius: 999,
                          border: "1px solid var(--line)",
                          color: isActive ? "var(--ink)" : "var(--ink-faint)",
                          transition: `color 0.4s ${EASE}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.08em", color: "var(--accent)" }}>
                    → {cap.proof}
                  </p>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>

      <style>{`@media(max-width:860px){.cap-row{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
