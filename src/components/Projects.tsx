"use client";
import { useRef, useEffect, useState } from "react";

const projects = [
  {
    tag: "Full Stack Web App · LIVE",
    title: "ZipForgeX",
    problem: "Developers waste time manually creating folder structures and ZIP files for project scaffolding.",
    solution: "A web app that converts any folder structure text into a downloadable ZIP instantly.",
    impact: "Live at zipforgex.in with real users, JWT + OAuth2 auth, ZIP history, custom domain.",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Railway", "Vercel", "Cloudflare"],
    live: "https://zipforgex.in",
    github: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #1a2744 0%, #0d3d35 50%, #1db8a0 100%)",
    featured: true,
  },
  {
    tag: "Machine Learning",
    title: "Customer Churn Prediction",
    problem: "Businesses can't identify which customers are about to leave until it's too late.",
    solution: "XGBoost classifier with SHAP explainability — tells you WHY a customer will churn.",
    impact: "~81% accuracy. Interactive Streamlit dashboard for non-technical business users.",
    tech: ["Python", "XGBoost", "SHAP", "scikit-learn", "Streamlit"],
    live: "",
    github: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    featured: false,
  },
  {
    tag: "NLP + ML",
    title: "Political Sentiment Dashboard",
    problem: "Tracking public sentiment on geopolitical events across thousands of tweets is manually impossible.",
    solution: "Real-time SVM + Logistic Regression pipeline with SHAP word-level explanation.",
    impact: "6-tab Streamlit dashboard. 78.75% SVM accuracy on Ukraine-Russia war tweet dataset.",
    tech: ["Python", "scikit-learn", "NLTK", "SHAP", "Tweepy", "Streamlit"],
    live: "",
    github: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #553c9a 100%)",
    featured: false,
  },
  {
    tag: "Deep Learning",
    title: "English-to-French NMT",
    problem: "Understanding how neural translation works requires building from scratch — not using APIs.",
    solution: "Pure PyTorch seq2seq transformer — encoder, decoder, attention — built from zero.",
    impact: "No pretrained models. Full custom architecture. Demonstrates deep DL fundamentals.",
    tech: ["Python", "PyTorch", "Transformer", "seq2seq", "Attention"],
    live: "",
    github: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #0d2137 50%, #1a4a6b 100%)",
    featured: false,
  },
  {
    tag: "AI · Internship @ Syncorb Geotech",
    title: "BizOp Analytica",
    problem: "Restaurant menu data is locked in images — impossible to analyze at scale.",
    solution: "Gemini API pipeline + PaddleOCR extracts and analyzes menu data for business intelligence.",
    impact: "Built during internship. Production-grade pipeline handling real client data.",
    tech: ["Gemini API", "PaddleOCR", "Python", "FastAPI"],
    live: "",
    github: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #1a2a0a 0%, #2d4a1b 50%, #4a7c1a 100%)",
    featured: false,
  },
  {
    tag: "Data Engineering",
    title: "Retail Sales Pipeline",
    problem: "Raw sales CSVs are messy and impossible to visualize without significant preprocessing.",
    solution: "Full ETL pipeline — clean, transform, and visualize April 2019 retail sales data.",
    impact: "5 advanced Plotly charts: choropleth, 3D scatter, waterfall, violin, heatmap.",
    tech: ["Python", "Pandas", "Plotly", "Parquet", "ETL"],
    live: "",
    github: "https://github.com/Narendran-ds",
    gradient: "linear-gradient(135deg, #2a1a0a 0%, #4a2d1b 50%, #7c4a1a 100%)",
    featured: false,
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

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="work" ref={ref} style={{ background: "#0a0f1e", padding: "7rem 6vw", borderTop: "1px solid rgba(29,184,160,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "1rem" }}>Selected Work</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#e8eaf0" }}>Projects</h2>
        </div>

        {/* Featured project — ZipForgeX full width */}
        <div style={{
          border: "1px solid rgba(29,184,160,0.25)", borderRadius: 24,
          overflow: "hidden", marginBottom: "2rem",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
          transition: "all 0.8s ease",
          background: "#0d1526",
        }}>
          {/* Featured header */}
          <div style={{ height: 280, background: featured.gradient, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.05) 40px,rgba(255,255,255,0.05) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.05) 40px,rgba(255,255,255,0.05) 41px)" }} />
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}>ZipForgeX</div>
              <div style={{ width: 60, height: 2, background: "#1db8a0", margin: "1rem auto", borderRadius: 1 }} />
              <div style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>zipforgex.in</div>
            </div>
            <div style={{ position: "absolute", top: 16, left: 16, fontSize: "0.65rem", padding: "0.3rem 0.8rem", background: "rgba(29,184,160,0.25)", border: "1px solid rgba(29,184,160,0.5)", borderRadius: 999, color: "#1db8a0", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ⭐ Featured · Live Product
            </div>
          </div>

          {/* Featured body */}
          <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }} className="featured-grid">
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "0.5rem" }}>Problem</div>
              <p style={{ fontSize: "0.88rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.7 }}>{featured.problem}</p>
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "0.5rem" }}>Solution</div>
              <p style={{ fontSize: "0.88rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.7 }}>{featured.solution}</p>
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "0.5rem" }}>Impact</div>
              <p style={{ fontSize: "0.88rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.7 }}>{featured.impact}</p>
            </div>
          </div>

          <div style={{ padding: "0 2rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {featured.tech.map(t => (
                <span key={t} style={{ fontSize: "0.72rem", padding: "0.25rem 0.65rem", borderRadius: 999, border: "1px solid rgba(29,184,160,0.25)", color: "rgba(29,184,160,0.8)" }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href={featured.live} target="_blank" rel="noopener noreferrer" style={{ padding: "0.6rem 1.5rem", background: "#1db8a0", borderRadius: 999, color: "#0a0f1e", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", letterSpacing: "0.05em" }}>
                View Live ↗
              </a>
              <a href={featured.github} target="_blank" rel="noopener noreferrer" style={{ padding: "0.6rem 1.5rem", border: "1px solid rgba(29,184,160,0.3)", borderRadius: 999, color: "#1db8a0", fontSize: "0.85rem", textDecoration: "none" }}>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Rest of projects grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {rest.map((p, i) => (
            <div key={p.title}
              style={{
                border: "1px solid rgba(29,184,160,0.12)", borderRadius: 20,
                overflow: "hidden", background: "#0d1526",
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
                transition: `all 0.7s ease ${0.1 + i * 0.08}s`,
                display: "flex", flexDirection: "column",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29,184,160,0.35)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29,184,160,0.12)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              {/* Card image */}
              <div style={{ height: 160, background: p.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.03) 10px,rgba(255,255,255,0.03) 11px)" }} />
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", zIndex: 1, textAlign: "center", padding: "0 1rem" }}>{p.title}</div>
                <div style={{ position: "absolute", top: 12, right: 12, fontSize: "0.6rem", padding: "0.2rem 0.6rem", background: "rgba(29,184,160,0.2)", border: "1px solid rgba(29,184,160,0.3)", borderRadius: 999, color: "#1db8a0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {p.tag}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "0.3rem" }}>Problem</div>
                  <p style={{ fontSize: "0.82rem", color: "rgba(232,234,240,0.45)", lineHeight: 1.6 }}>{p.problem}</p>
                </div>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "0.3rem" }}>Impact</div>
                  <p style={{ fontSize: "0.82rem", color: "rgba(232,234,240,0.45)", lineHeight: 1.6 }}>{p.impact}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto", paddingTop: "0.75rem" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: "0.68rem", padding: "0.2rem 0.55rem", borderRadius: 999, border: "1px solid rgba(29,184,160,0.2)", color: "rgba(29,184,160,0.7)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.5rem" }}>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "0.5rem", background: "#1db8a0", borderRadius: 8, color: "#0a0f1e", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", textAlign: "center" }}>
                      Live ↗
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "0.5rem", border: "1px solid rgba(29,184,160,0.25)", borderRadius: 8, color: "#1db8a0", fontSize: "0.8rem", textDecoration: "none", textAlign: "center" }}>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.featured-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}