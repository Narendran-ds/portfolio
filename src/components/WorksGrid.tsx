"use client";
import { useState } from "react";
import Link from "next/link";
import { projects, allCategories } from "@/data/projects";
import ProjectCover from "./ProjectCover";
import { EASE } from "./useReveal";

export default function WorksGrid() {
  const [filter, setFilter] = useState<string | null>(null);
  const shown = filter ? projects.filter((p) => p.categories.includes(filter)) : projects;

  return (
    <div style={{ maxWidth: 1500, margin: "0 auto", padding: "9rem 4vw 6rem" }}>
      <h1 className="display" style={{ fontSize: "clamp(3.4rem, 9vw, 8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.95, color: "var(--ink)", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        Works
      </h1>

      <div className="works-layout" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "clamp(2rem, 4vw, 5rem)", alignItems: "start" }}>
        {/* Category sidebar */}
        <aside className="works-sidebar" style={{ position: "sticky", top: "7rem", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.1rem" }}>
          <button
            onClick={() => setFilter(null)}
            className="display"
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.02em",
              color: filter === null ? "var(--ink)" : "var(--ink-faint)",
              transition: `color 0.3s ${EASE}`,
            }}
          >
            All <sup className="mono" style={{ fontSize: "0.6rem", color: "var(--accent)" }}>[{projects.length}]</sup>
          </button>
          {allCategories.map((c) => (
            <button
              key={c.name}
              onClick={() => setFilter(filter === c.name ? null : c.name)}
              className="display"
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
                fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.02em",
                color: filter === c.name ? "var(--accent)" : "var(--ink-faint)",
                transition: `color 0.3s ${EASE}`,
              }}
            >
              {c.name} <sup className="mono" style={{ fontSize: "0.6rem", color: "var(--accent)" }}>[{c.count}]</sup>
            </button>
          ))}
        </aside>

        {/* Grid */}
        <div className="works-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 3.5vw, 3.5rem) clamp(1.5rem, 2.5vw, 2.5rem)" }}>
          {shown.map((p, i) => (
            <Link
              key={p.slug}
              href={`/works/${p.slug}`}
              style={{ textDecoration: "none", display: "block", animation: `worksFade 0.6s ${EASE} ${i * 0.05}s both` }}
            >
              <div className="works-card" style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: "1rem", overflow: "hidden", transition: `transform 0.6s ${EASE}, box-shadow 0.6s ${EASE}` }}>
                <ProjectCover project={p} index={projects.indexOf(p)} compact />
              </div>
              <div className="mono" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "0.9rem", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                <span>{p.date}</span>
                <span style={{ textAlign: "right" }}>[{p.tags.slice(0, 3).join(", ")}]</span>
              </div>
              <div className="display" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)", marginTop: "0.45rem", lineHeight: 1.15 }}>
                {p.title}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", fontWeight: 300, lineHeight: 1.55, marginTop: "0.35rem" }}>
                {p.oneLiner}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes worksFade {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }
        .works-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px -24px rgba(23,19,16,0.35); }
        @media (max-width: 900px) {
          .works-layout { grid-template-columns: 1fr !important; }
          .works-sidebar { position: static !important; flex-direction: row !important; flex-wrap: wrap; gap: 0.9rem 1.4rem !important; }
          .works-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
