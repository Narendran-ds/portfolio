"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { certificates } from "@/data/certificates";
import CertificateCover from "./CertificateCover";
import { EASE } from "./useReveal";

/**
 * Same alche-style pinned showcase as Projects.tsx: the section pins, and
 * vertical scroll flips through certificates one by one.
 */
export default function Certifications() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const pin = pinRef.current;
      if (!pin) return;
      const scrollable = pin.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, (window.scrollY - pin.offsetTop) / scrollable));
      const idx = Math.min(certificates.length - 1, Math.floor(p * certificates.length));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const c = certificates[active];

  return (
    <section id="certifications" style={{ background: "var(--paper)", paddingTop: "clamp(6rem, 10vw, 9rem)" }}>
      {/* Header */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 4vw" }}>
        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid var(--line)",
            paddingTop: "1.2rem",
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
      </div>

      {/* Pinned showcase */}
      <div ref={pinRef} style={{ height: `${certificates.length * 85}vh`, position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            alignItems: "center",
            gap: "clamp(1.5rem, 3vw, 4rem)",
            padding: "0 4vw",
            maxWidth: 1500,
            margin: "0 auto",
          }}
          className="showcase-grid"
        >
          {/* Meta — left */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--ink-faint)", marginBottom: "1.1rem", textTransform: "uppercase" }}>
              {c.date}
              <span style={{ margin: "0 0.9rem", color: "var(--accent)" }}>
                {String(active + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
              </span>
            </div>

            <div key={c.slug} style={{ animation: `showcaseIn 0.6s ${EASE} both` }}>
              <h3 className="display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.02, color: "var(--ink)", marginBottom: "1rem" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 300, maxWidth: "44ch", marginBottom: "1.2rem" }}>
                {c.oneLiner}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.6rem" }}>
                <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", padding: "0.3rem 0.75rem", borderRadius: 4, border: "1px solid var(--line)", color: "var(--ink-soft)" }}>
                  {c.issuer}
                </span>
              </div>
              <Link
                href={`/certificates/${c.slug}`}
                className="mono sweep-link"
                style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none" }}
              >
                View certificate →
              </Link>
            </div>

            {/* step indicator */}
            <div style={{ display: "flex", gap: "0.45rem", marginTop: "2.4rem" }}>
              {certificates.map((fc, i) => (
                <span
                  key={fc.slug}
                  style={{
                    width: i === active ? 26 : 8,
                    height: 3,
                    background: i === active ? "var(--accent)" : "var(--line)",
                    transition: `all 0.5s ${EASE}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cover stack — right */}
          <Link href={`/certificates/${c.slug}`} aria-label={c.title} className="showcase-cover" style={{ position: "relative", display: "block", aspectRatio: "16 / 10", maxHeight: "72vh", width: "100%" }}>
            {certificates.map((fc, i) => (
              <div
                key={fc.slug}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : i < active ? "scale(0.96) translateY(-2%)" : "scale(0.96) translateY(2%)",
                  transition: `opacity 0.55s ${EASE}, transform 0.7s ${EASE}`,
                  boxShadow: i === active ? "0 30px 80px -30px rgba(23,19,16,0.35)" : "none",
                }}
              >
                <CertificateCover certificate={fc} index={i} />
              </div>
            ))}
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes showcaseIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 860px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
            align-content: center;
            gap: 1.5rem !important;
          }
          .showcase-cover { order: -1; max-height: 38vh !important; }
        }
      `}</style>
    </section>
  );
}
