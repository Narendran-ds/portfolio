"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import ProjectCover from "./ProjectCover";
import { EASE } from "./useReveal";

/**
 * Alche-style showcase: the section pins, and vertical scroll flips through
 * the featured works one by one — cover on the right, meta on the left.
 */
export default function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const pin = pinRef.current;
      if (!pin) return;
      const scrollable = pin.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, (window.scrollY - pin.offsetTop) / scrollable));
      const idx = Math.min(
        featuredProjects.length - 1,
        Math.floor(p * featuredProjects.length)
      );
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

  const p = featuredProjects[active];

  return (
    <section id="work" style={{ background: "var(--paper)", paddingTop: "clamp(6rem, 10vw, 9rem)" }}>
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
          <span style={{ color: "var(--accent)" }}>( 03 )</span>
          <span>Selected work</span>
          <Link href="/works" className="sweep-link" style={{ color: "var(--ink)", textDecoration: "none" }}>
            All works ↗
          </Link>
        </div>
      </div>

      {/* Pinned showcase */}
      <div ref={pinRef} style={{ height: `${featuredProjects.length * 85}vh`, position: "relative" }}>
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
              {p.date}
              <span style={{ margin: "0 0.9rem", color: "var(--accent)" }}>
                {String(active + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
              </span>
            </div>

            {/* keyed so it re-animates on change */}
            <div key={p.slug} style={{ animation: `showcaseIn 0.6s ${EASE} both` }}>
              <h3 className="display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.02, color: "var(--ink)", marginBottom: "1rem" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: "var(--ink-soft)", lineHeight: 1.7, fontWeight: 300, maxWidth: "44ch", marginBottom: "1.2rem" }}>
                {p.oneLiner}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.6rem" }}>
                {p.tags.map((t) => (
                  <span key={t} className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", padding: "0.3rem 0.75rem", borderRadius: 4, border: "1px solid var(--line)", color: "var(--ink-soft)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={`/works/${p.slug}`}
                className="mono sweep-link"
                style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none" }}
              >
                View project →
              </Link>
            </div>

            {/* step indicator */}
            <div style={{ display: "flex", gap: "0.45rem", marginTop: "2.4rem" }}>
              {featuredProjects.map((fp, i) => (
                <span
                  key={fp.slug}
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
          <Link href={`/works/${p.slug}`} aria-label={p.title} className="showcase-cover" style={{ position: "relative", display: "block", aspectRatio: "16 / 10", maxHeight: "72vh", width: "100%" }}>
            {featuredProjects.map((fp, i) => (
              <div
                key={fp.slug}
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
                <ProjectCover project={fp} index={i} />
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
