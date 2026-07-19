"use client";
/* eslint-disable @next/next/no-img-element */
import { useReveal, EASE } from "./useReveal";

type Tool = { name: string; icon: string };

const row1: Tool[] = [
  { name: "Java", icon: "openjdk" },
  { name: "Python", icon: "python" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Spring Boot", icon: "spring" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "Vercel", icon: "vercel" },
  { name: "Railway", icon: "railway" },
  { name: "Cloudflare", icon: "cloudflare" },
];

const row2: Tool[] = [
  { name: "PyTorch", icon: "pytorch" },
  { name: "scikit-learn", icon: "scikitlearn" },
  { name: "Pandas", icon: "pandas" },
  { name: "NumPy", icon: "numpy" },
  { name: "Streamlit", icon: "streamlit" },
  { name: "Plotly", icon: "plotly" },
  { name: "OpenCV", icon: "opencv" },
  { name: "Gemini", icon: "googlegemini" },
  { name: "Docker", icon: "docker" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Maven", icon: "apachemaven" },
];

const skillGroups = [
  {
    title: "Languages",
    items: ["Java", "Python", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend & Databases",
    items: ["Spring Boot", "FastAPI", "PostgreSQL", "MySQL", "Supabase"],
  },
  {
    title: "Machine Learning & AI",
    items: ["PyTorch", "XGBoost", "scikit-learn", "SHAP", "YOLOv8", "OpenCV", "NLTK", "Gemini API", "PaddleOCR"],
  },
  {
    title: "Data & Visualisation",
    items: ["Pandas", "NumPy", "Plotly", "Streamlit", "Parquet", "Scrapy"],
  },
  {
    title: "DevOps & Infrastructure",
    items: ["Git", "Docker", "Vercel", "Railway", "Cloudflare", "Render", "Maven"],
  },
];

function LogoRow({ items, reverse }: { items: Tool[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", padding: "1.6rem 0", borderTop: "1px solid var(--line)" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          animation: `${reverse ? "marqueeRight" : "marqueeLeft"} ${items.length * 3.5}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            title={t.name}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", padding: "0 2.2rem", opacity: 0.85 }}
          >
            <img src={`/icons/${t.icon}.svg`} alt={t.name} width={30} height={30} draggable={false} style={{ display: "block" }} />
            <span className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
              {t.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const { ref, vis } = useReveal<HTMLElement>(0.08);

  return (
    <section ref={ref} aria-label="Tech stack" style={{ background: "var(--paper)", padding: "clamp(4rem, 7vw, 6rem) 0 clamp(6rem, 9vw, 8rem)" }}>
      <div
        className="mono"
        style={{
          maxWidth: 1400,
          margin: "0 auto 2rem",
          padding: "0 4vw",
          fontSize: "0.68rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: "var(--accent)" }}>( 05 )</span>
        <span>Stack</span>
        <span>Tools I reach for</span>
      </div>

      {/* Logo marquees */}
      <LogoRow items={row1} />
      <LogoRow items={row2} reverse />
      <div style={{ borderTop: "1px solid var(--line)" }} />

      {/* Static, readable skills */}
      <div className="skills-grid" style={{ maxWidth: 1400, margin: "clamp(3.5rem, 6vw, 5rem) auto 0", padding: "0 4vw", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(2rem, 3.5vw, 3.5rem) clamp(2rem, 4vw, 4rem)" }}>
        {skillGroups.map((g, gi) => (
          <div
            key={g.title}
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: "1.1rem",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(24px)",
              transition: `all 0.8s ${EASE} ${gi * 0.08}s`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.9rem" }}>
              <h3 className="display" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.01em" }}>
                {g.title}
              </h3>
              <span className="mono" style={{ fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.15em" }}>
                {String(gi + 1).padStart(2, "0")}
              </span>
            </div>
            <p style={{ fontSize: "0.92rem", color: "var(--ink-soft)", fontWeight: 300, lineHeight: 1.9 }}>
              {g.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>

      <style>{`@media(max-width:900px){.skills-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:600px){.skills-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
