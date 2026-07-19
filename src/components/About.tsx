"use client";
import { useReveal, EASE } from "./useReveal";

const stats = [
  { value: "14", label: "Public repos" },
  { value: "01", label: "Live product" },
  { value: "500+", label: "Cuisines pipelined at Syncorb" },
  { value: "2027", label: "Graduating" },
];

const statementLines: React.ReactNode[] = [
  <>Most student projects <span className="serif" style={{ color: "var(--accent)" }}>die</span> in</>,
  <>a notebook. Mine run in <span className="serif" style={{ color: "var(--accent)" }}>production</span> —</>,
  <>with users, auth, and uptime to answer for.</>,
];

export default function About() {
  const { ref, vis } = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "var(--paper)", padding: "clamp(7rem, 12vw, 11rem) 4vw", position: "relative" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Section marker */}
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
          <span style={{ color: "var(--accent)" }}>( 01 )</span>
          <span>About</span>
          <span>Chennai — India</span>
        </div>

        {/* Big statement — staggered line reveal */}
        <h2
          className="display"
          style={{
            fontSize: "clamp(1.9rem, 4.6vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            maxWidth: "24ch",
            textTransform: "uppercase",
            marginBottom: "clamp(4rem, 7vw, 6rem)",
          }}
        >
          {statementLines.map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  transform: vis ? "none" : "translateY(110%)",
                  transition: `transform 1s ${EASE} ${0.1 + i * 0.12}s`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        {/* Split: bio left, stats right */}
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "start" }}>
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(30px)",
              transition: `all 1s ${EASE} 0.35s`,
            }}
          >
            <p style={{ fontSize: "clamp(1rem, 1.25vw, 1.15rem)", color: "var(--ink-soft)", lineHeight: 1.85, marginBottom: "1.4rem", fontWeight: 300 }}>
              I&apos;m Narendran — a final-year AI &amp; Data Science student at Rajalakshmi
              Institute of Technology, Chennai. My live product, <strong style={{ fontWeight: 500, color: "var(--ink)" }}>ZipForgeX</strong>,
              runs at zipforgex.in with real users, OAuth2 and a custom domain. At my
              internship with <strong style={{ fontWeight: 500, color: "var(--ink)" }}>Syncorb Geotech</strong> I replaced five broken scrapers
              with one Gemini-driven pipeline and rebuilt their OCR menu-extraction system from scratch.
            </p>
            <p style={{ fontSize: "clamp(1rem, 1.25vw, 1.15rem)", color: "var(--ink-soft)", lineHeight: 1.85, marginBottom: "2.5rem", fontWeight: 300 }}>
              The through-line in my work: systems you can trust. SHAP explanations on
              every churn prediction, deterministic rule engines over black-box guesses,
              58 passing tests on my safety-vision pipeline. If I can&apos;t explain it,
              I don&apos;t ship it.
            </p>

            <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
              {[
                { label: "LinkedIn", href: "https://linkedin.com/in/narendran-l1125" },
                { label: "GitHub", href: "https://github.com/Narendran-ds" },
                { label: "Resume", href: "/Narendran_L_resume.pdf" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono sweep-link"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink)" }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Stats — ruled rows, not cards */}
          <div>
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  padding: "1.4rem 0",
                  borderTop: "1px solid var(--line)",
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(24px)",
                  transition: `all 0.9s ${EASE} ${0.4 + i * 0.1}s`,
                }}
              >
                <span className="display" style={{ fontSize: "clamp(2.2rem, 3.4vw, 3.2rem)", fontWeight: 800, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {s.value}
                </span>
                <span className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)", textAlign: "right" }}>
                  {s.label}
                </span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
          </div>
        </div>
      </div>

      <style>{`@media(max-width:860px){.about-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
