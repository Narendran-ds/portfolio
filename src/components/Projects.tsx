"use client";
import { useRef, useEffect, useState } from "react";

const projects = [
  {
    tag: "Full Stack Web App",
    title: "ZipForgeX",
    desc: "Full-stack folder-to-ZIP generator with JWT Auth + Google/GitHub OAuth2. Live production app with custom domain.",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Railway", "Vercel"],
    link: "https://zipforgex.in",
    gradient: "linear-gradient(135deg, #1a2744 0%, #0d3d35 50%, #1db8a0 100%)",
    mockup: "zipforgex.in",
  },
  {
    tag: "Machine Learning",
    title: "Customer Churn Prediction",
    desc: "XGBoost classifier with ~81% accuracy, SHAP explainability and interactive Streamlit dashboard.",
    tech: ["Python", "XGBoost", "SHAP", "scikit-learn", "Streamlit"],
    link: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    mockup: "Churn Analysis",
  },
  {
    tag: "NLP + ML",
    title: "Political Sentiment Dashboard",
    desc: "Real-time sentiment analysis on Ukraine-Russia war tweets. SVM + Logistic Regression + SHAP. 6-tab Streamlit dashboard.",
    tech: ["Python", "scikit-learn", "NLTK", "SHAP", "Tweepy"],
    link: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #553c9a 100%)",
    mockup: "Sentiment AI",
  },
  {
    tag: "Deep Learning",
    title: "English-to-French NMT",
    desc: "Neural Machine Translation from scratch — pure PyTorch seq2seq transformer. No pretrained models.",
    tech: ["Python", "PyTorch", "Transformer", "seq2seq"],
    link: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #0d2137 50%, #1a4a6b 100%)",
    mockup: "NMT Model",
  },
  {
    tag: "AI Internship",
    title: "BizOp Analytica",
    desc: "Built at Syncorb Geotech Pvt Ltd. Gemini API pipeline + PaddleOCR for automated menu extraction and business analysis.",
    tech: ["Gemini API", "PaddleOCR", "Python"],
    link: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #1a2a0a 0%, #2d4a1b 50%, #4a7c1a 100%)",
    mockup: "BizOp AI",
  },
  {
    tag: "Data Engineering",
    title: "Retail Sales Pipeline",
    desc: "Full ETL + visualization pipeline. Choropleth maps, 3D scatter plots, waterfall charts. Clean reproducible pipeline.",
    tech: ["Python", "Pandas", "Plotly", "Parquet"],
    link: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #2a1a0a 0%, #4a2d1b 50%, #7c4a1a 100%)",
    mockup: "Sales Analytics",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={ref} style={{ background: "#0a0f1e", padding: "7rem 6vw", borderTop: "1px solid rgba(29,184,160,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "1rem" }}>Selected Work</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#e8eaf0" }}>Projects</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
          {projects.map((p, i) => (
            <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", flexDirection: "column", border: "1px solid rgba(29,184,160,0.12)", borderRadius: 20, overflow: "hidden", background: "#0d1526", textDecoration: "none", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: `all 0.7s ease ${i * 0.08}s` }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(29,184,160,0.4)"; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 20px 60px rgba(29,184,160,0.12)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(29,184,160,0.12)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
            >
              {/* Screenshot placeholder */}
              <div style={{ height: 200, background: p.gradient, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)" }} />
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>{p.mockup}</div>
                  <div style={{ width: 40, height: 2, background: "#1db8a0", margin: "0.75rem auto 0", borderRadius: 1 }} />
                </div>
                <div style={{ position: "absolute", top: 12, right: 12, fontSize: "0.65rem", padding: "0.3rem 0.7rem", background: "rgba(29,184,160,0.2)", border: "1px solid rgba(29,184,160,0.3)", borderRadius: 999, color: "#1db8a0", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {p.tag}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#e8eaf0", marginBottom: "0.75rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.87rem", color: "rgba(232,234,240,0.45)", lineHeight: 1.7, flex: 1, marginBottom: "1.25rem" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: "0.72rem", padding: "0.25rem 0.65rem", borderRadius: 999, border: "1px solid rgba(29,184,160,0.2)", color: "rgba(29,184,160,0.8)", letterSpacing: "0.05em" }}>{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
