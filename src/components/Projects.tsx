"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const BG = "radial-gradient(ellipse at 80% 20%, #1f0d00 0%, #0d1117 45%, #060a10 100%)";
const ACCENT = "#F97316";
const ACCENT2 = "#FDBA74";
const BORDER = "rgba(249,115,22,0.15)";
const TEXT = "#FAFAFA";
const MUTED = "rgba(250,250,250,0.45)";
const CARD = "#0d0a08";

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
    img: "/projects/zipforgex.in.png",
    featured: true,
  },
  {
    tag: "Machine Learning",
    title: "Customer Churn Prediction",
    problem: "Businesses can't identify which customers are about to leave until it's too late.",
    impact: "~81% accuracy. Interactive Streamlit dashboard for non-technical business users.",
    tech: ["Python", "XGBoost", "SHAP", "scikit-learn", "Streamlit"],
    live: "",
    github: "https://github.com/Narendran-ds",
    img: "/projects/churn.png",
  },
  {
    tag: "NLP + ML",
    title: "Political Sentiment Dashboard",
    problem: "Tracking public sentiment on geopolitical events across thousands of tweets is manually impossible.",
    impact: "6-tab Streamlit dashboard. 78.75% SVM accuracy on Ukraine-Russia war tweet dataset.",
    tech: ["Python", "scikit-learn", "NLTK", "SHAP", "Tweepy"],
    live: "",
    github: "https://github.com/Narendran-ds",
    img: "/projects/sentiment.png",
  },
  {
    tag: "Deep Learning",
    title: "English-to-French NMT",
    problem: "Understanding how neural translation works requires building from scratch — not using APIs.",
    impact: "No pretrained models. Full custom architecture. Demonstrates deep DL fundamentals.",
    tech: ["Python", "PyTorch", "Transformer", "seq2seq"],
    live: "",
    github: "https://github.com/Narendran-ds",
    img: "/projects/nmt.png",
  },
  {
    tag: "AI · Internship",
    title: "BizOp Analytica",
    problem: "Restaurant menu data is locked in images — impossible to analyze at scale.",
    impact: "Built during internship at Syncorb Geotech. Production-grade pipeline handling real client data.",
    tech: ["Gemini API", "PaddleOCR", "Python", "FastAPI"],
    live: "",
    github: "https://github.com/Narendran-ds",
    img: "/projects/bizop.png",
  },
  {
    tag: "Data Engineering",
    title: "Retail Sales Pipeline",
    problem: "Raw sales CSVs are messy and impossible to visualize without significant preprocessing.",
    impact: "5 advanced Plotly charts: choropleth, 3D scatter, waterfall, violin, heatmap.",
    tech: ["Python", "Pandas", "Plotly", "Parquet"],
    live: "",
    github: "https://github.com/Narendran-ds",
    img: "/projects/retail.png",
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
    <section id="work" ref={ref} style={{ background: BG, padding: "7rem 6vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase", marginBottom: "1rem" }}>Selected Work</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: TEXT }}>Projects</h2>
        </div>

        {/* Featured — ZipForgeX */}
        <div style={{ border: `1px solid rgba(249,115,22,0.3)`, borderRadius: 24, overflow: "hidden", marginBottom: "2rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease", background: CARD, boxShadow: "0 0 60px rgba(249,115,22,0.07)" }}>
          {/* Screenshot */}
          <div style={{ height: 300, position: "relative", overflow: "hidden", background: "#0d0a08" }}>
            <Image src={featured.img} alt={featured.title} fill style={{ objectFit: "cover", objectPosition: "top" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(13,10,8,0.95) 100%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, fontSize: "0.65rem", padding: "0.3rem 0.8rem", background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.5)", borderRadius: 999, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ⭐ Featured · Live Product
            </div>
          </div>

          <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }} className="feat-grid">
            {[["Problem", featured.problem], ["Solution", featured.solution!], ["Impact", featured.impact]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: ACCENT, textTransform: "uppercase", marginBottom: "0.5rem" }}>{label}</div>
                <p style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.7 }}>{val}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: "0 2rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {featured.tech.map(t => <span key={t} style={{ fontSize: "0.72rem", padding: "0.25rem 0.65rem", borderRadius: 999, border: `1px solid rgba(249,115,22,0.25)`, color: ACCENT2 }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href={featured.live} target="_blank" rel="noopener noreferrer" style={{ padding: "0.6rem 1.5rem", background: ACCENT, borderRadius: 999, color: "#0A0A0A", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}>View Live ↗</a>
              <a href={featured.github} target="_blank" rel="noopener noreferrer" style={{ padding: "0.6rem 1.5rem", border: `1px solid ${BORDER}`, borderRadius: 999, color: ACCENT, fontSize: "0.85rem", textDecoration: "none" }}>GitHub</a>
            </div>
          </div>
        </div>

        {/* Rest of projects */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {rest.map((p, i) => (
            <div key={p.title}
              style={{ border: `1px solid ${BORDER}`, borderRadius: 20, overflow: "hidden", background: CARD, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: `all 0.7s ease ${0.1 + i * 0.08}s`, display: "flex", flexDirection: "column" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(249,115,22,0.4)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(249,115,22,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = BORDER; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              {/* Screenshot */}
              <div style={{ height: 180, position: "relative", overflow: "hidden", background: "#0d0a08" }}>
                <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover", objectPosition: "top" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(13,10,8,0.9) 100%)" }} />
                <div style={{ position: "absolute", top: 12, right: 12, fontSize: "0.6rem", padding: "0.2rem 0.6rem", background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 999, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.tag}</div>
              </div>

              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: TEXT }}>{p.title}</h3>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: ACCENT, textTransform: "uppercase", marginBottom: "0.3rem" }}>Problem</div>
                  <p style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.6 }}>{p.problem}</p>
                </div>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: ACCENT, textTransform: "uppercase", marginBottom: "0.3rem" }}>Impact</div>
                  <p style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.6 }}>{p.impact}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto", paddingTop: "0.75rem" }}>
                  {p.tech.map(t => <span key={t} style={{ fontSize: "0.68rem", padding: "0.2rem 0.55rem", borderRadius: 999, border: `1px solid rgba(253,186,116,0.2)`, color: ACCENT2 }}>{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "0.5rem", background: ACCENT, borderRadius: 8, color: "#0A0A0A", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", textAlign: "center" }}>Live ↗</a>}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "0.5rem", border: `1px solid ${BORDER}`, borderRadius: 8, color: ACCENT, fontSize: "0.8rem", textDecoration: "none", textAlign: "center" }}>GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.feat-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}