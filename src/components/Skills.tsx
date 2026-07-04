"use client";

import { useState, useRef } from "react";

type Capability = {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  proof: string;
};

const capabilities: Capability[] = [
  {
    icon: "⬡",
    title: "Full Stack Development",
    tagline: "From auth to deploy — no gaps.",
    description:
      "I architect and ship complete web applications — Spring Boot APIs, React frontends, JWT & OAuth2 auth, PostgreSQL schemas, and production CI/CD. A coherent system, not stitched-together tutorials.",
    tech: ["Spring Boot", "React", "PostgreSQL", "JWT", "OAuth2", "Vercel"],
    proof: "ZipForgeX — live on zipforgex.in with real users.",
  },
  {
    icon: "◈",
    title: "AI & ML Engineering",
    tagline: "Models that explain their decisions.",
    description:
      "End-to-end ML pipelines: feature engineering, model selection, hyperparameter tuning, SHAP explainability, and Streamlit dashboards that turn predictions into business decisions.",
    tech: ["PyTorch", "XGBoost", "scikit-learn", "SHAP", "Streamlit", "Pandas"],
    proof: "89% churn accuracy — with full SHAP explainability.",
  },
  {
    icon: "⟐",
    title: "LLM & GenAI Pipelines",
    tagline: "Production-grade AI, not just prompts.",
    description:
      "LLM-driven data pipelines using Gemini API, RAG architectures, and PaddleOCR. At Syncorb I replaced 5 broken scrapers with a single AI workflow generating 500+ cuisines at scale.",
    tech: ["Gemini API", "PaddleOCR", "FastAPI", "RAG", "NVIDIA NIM", "Prompt Eng."],
    proof: "Deployed in production at Syncorb Geotech internship.",
  },
  {
    icon: "⌬",
    title: "Developer Tooling & Infra",
    tagline: "Tools built to survive 2 AM.",
    description:
      "Developer productivity tools backed by real infrastructure — Cloudflare DNS, Render backends, Supabase databases, Vercel frontends. Reliable, observable, and built to scale.",
    tech: ["Cloudflare", "Render", "Supabase", "Docker", "Maven", "CI/CD"],
    proof: "zipforgex.in — custom domain, history tracking, live.",
  },
];

export default function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (i: number) => {
    setActiveIndex(i);
    const card = cardRefs.current[i];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const popupH = 270;
    const spaceBelow = window.innerHeight - r.bottom;
    const top = spaceBelow > popupH + 16 ? r.bottom + 14 : r.top - popupH - 14;
    const left = Math.min(Math.max(r.left + r.width / 2 - 190, 16), window.innerWidth - 396);
    setPopupStyle({ top, left });
  };

  const active = activeIndex !== null ? capabilities[activeIndex] : null;

  return (
    <section
      id="capabilities"
      data-scan-section      /* ← triggers full-section scan on cursor entry */
      style={{
        padding: "100px 0",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingLeft: "32px",
        paddingRight: "32px",
      }}
    >
      {/* Label */}
      <p style={{
        fontSize: "11px", letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
        marginBottom: "14px", fontFamily: "monospace",
      }}>
        Capabilities
      </p>

      <h2 style={{
        fontSize: "clamp(32px, 4.5vw, 52px)",
        fontWeight: 700, color: "#fff",
        marginBottom: "10px", lineHeight: 1.1,
      }}>
        What I Build
      </h2>
      <p style={{
        fontSize: "16px", color: "rgba(255,255,255,0.4)",
        marginBottom: "56px", maxWidth: "480px", lineHeight: 1.6,
      }}>
        End-to-end. From model to migration, from prompt to production.
      </p>

      {/* Grid — bigger cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "18px",
      }}>
        {capabilities.map((cap, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-cursor="card"                         /* triggers bracket scanner */
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                position: "relative",
                padding: "36px 28px",
                minHeight: "220px",
                borderRadius: "12px",
                border: isActive
                  ? "1px solid rgba(201,168,76,0.5)"
                  : "1px solid rgba(255,255,255,0.07)",
                background: isActive
                  ? "rgba(201,168,76,0.04)"
                  : "rgba(255,255,255,0.02)",
                transition: "border-color 0.22s ease, background 0.22s ease, transform 0.22s ease",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Icon */}
              <div style={{
                fontSize: "26px",
                color: isActive ? "#c9a84c" : "rgba(255,255,255,0.35)",
                transition: "color 0.22s ease",
              }}>
                {cap.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "18px", fontWeight: 700,
                color: isActive ? "#fff" : "rgba(255,255,255,0.85)",
                lineHeight: 1.25, transition: "color 0.2s ease",
              }}>
                {cap.title}
              </h3>

              {/* Tagline */}
              <p style={{
                fontSize: "13.5px", fontStyle: "italic",
                color: isActive ? "rgba(201,168,76,0.8)" : "rgba(255,255,255,0.38)",
                lineHeight: 1.5, transition: "color 0.22s ease",
              }}>
                {cap.tagline}
              </p>

              {/* Description — always visible, slightly dimmed when not active */}
              <p style={{
                fontSize: "13px",
                color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.28)",
                lineHeight: 1.65,
                transition: "color 0.3s ease",
                flex: 1,
              }}>
                {cap.description}
              </p>

              {/* Tech pills — shown when active */}
              <div style={{
                display: "flex", flexWrap: "wrap", gap: "6px",
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}>
                {cap.tech.map((t) => (
                  <span key={t} style={{
                    fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: "rgba(201,168,76,0.8)",
                    background: "rgba(201,168,76,0.06)",
                    letterSpacing: "0.03em",
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Proof line */}
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "10px",
                fontSize: "11.5px",
                color: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
                fontStyle: "italic",
                transition: "color 0.25s ease",
              }}>
                ▹ {cap.proof}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}