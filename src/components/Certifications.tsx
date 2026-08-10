"use client";
import { certificates } from "@/data/certificates";
import CertificateCover from "./CertificateCover";
import { useReveal, EASE } from "./useReveal";

export default function Certifications() {
  const { ref, vis } = useReveal<HTMLElement>();

  return (
    <section id="certifications" ref={ref} style={{ background: "var(--paper)", padding: "clamp(6rem, 10vw, 9rem) 4vw" }}>
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
          <span style={{ color: "var(--accent)" }}>( 05 )</span>
          <span>Certifications</span>
          <span>Verified work</span>
        </div>

        <div className="certs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 3.5vw, 3.5rem)" }}>
          {certificates.map((c, i) => (
            <a
              key={c.slug}
              href={c.file}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="card"
              style={{
                textDecoration: "none",
                display: "block",
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(36px)",
                transition: `all 0.9s ${EASE} ${i * 0.15}s`,
              }}
            >
              <div className="cert-card" style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: "1.2rem", overflow: "hidden", transition: `transform 0.6s ${EASE}, box-shadow 0.6s ${EASE}` }}>
                <CertificateCover certificate={c} index={i} />
              </div>
              <div className="mono" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "1rem", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                <span>{c.date}</span>
                <span>{c.issuer}</span>
              </div>
              <div className="display" style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)", marginTop: "0.5rem", lineHeight: 1.15 }}>
                {c.title}
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", fontWeight: 300, lineHeight: 1.6, marginTop: "0.5rem", maxWidth: "48ch" }}>
                {c.description}
              </p>
              <span className="mono sweep-link" style={{ display: "inline-block", marginTop: "1rem", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)" }}>
                Know more ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .cert-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px -24px rgba(23,19,16,0.35); }
        @media (max-width: 860px) {
          .certs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
