import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProjectCover from "@/components/ProjectCover";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return { title: "Work — Narendran L" };
  return { title: `${p.title} — Narendran L`, description: p.oneLiner };
}

export default function WorkDetail({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const idx = projects.indexOf(p);
  const others = [...projects.slice(idx + 1), ...projects.slice(0, idx)].slice(0, 3);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar solid />

      {/* Top: hero cover + other works rail */}
      <div className="detail-top" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "clamp(1.5rem, 2.5vw, 2.5rem)", maxWidth: 1500, margin: "0 auto", padding: "7.5rem 4vw 0" }}>
        <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "1.2rem", overflow: "hidden", boxShadow: "0 30px 80px -30px rgba(23,19,16,0.3)" }}>
          <ProjectCover project={p} index={idx} />
        </div>

        <div className="detail-rail" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            More works
          </span>
          {others.map((o) => (
            <Link key={o.slug} href={`/works/${o.slug}`} style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "110px 1fr", gap: "0.9rem", alignItems: "center" }}>
              <div style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: "0.6rem", overflow: "hidden" }}>
                <ProjectCover project={o} index={projects.indexOf(o)} compact />
              </div>
              <div>
                <div className="mono" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "0.25rem" }}>
                  {o.date}
                </div>
                <div className="display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>
                  {o.title}
                </div>
              </div>
            </Link>
          ))}
          <Link href="/works" className="mono sweep-link" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", marginTop: "0.4rem" }}>
            All works →
          </Link>
        </div>
      </div>

      {/* Body */}
      <article style={{ maxWidth: 1500, margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) 4vw clamp(5rem, 8vw, 7rem)" }}>
        <div className="mono" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "1.4rem" }}>
          <span>{p.date}</span>
          <span style={{ color: "var(--accent)" }}>[{p.categories.join(", ")}]</span>
        </div>

        <h1 className="display" style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--ink)", maxWidth: "18ch", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          {p.title}
        </h1>

        <div className="detail-body" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "clamp(2.5rem, 5vw, 6rem)", alignItems: "start" }}>
          {/* Story */}
          <div>
            {p.story.map((para) => (
              <p key={para.slice(0, 32)} style={{ fontSize: "clamp(1rem, 1.25vw, 1.15rem)", color: "var(--ink-soft)", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.4rem" }}>
                {para}
              </p>
            ))}

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", padding: "0.55rem 0.55rem 0.55rem 1.3rem", background: "var(--ink)", color: "var(--paper)", borderRadius: 999, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>
                  Visit live
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", color: "#F2EEE3", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>↗</span>
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", padding: "0.55rem 0.55rem 0.55rem 1.3rem", border: "1px solid var(--line)", color: "var(--ink)", borderRadius: 999, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>
                  GitHub
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--paper-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Facts rail */}
          <aside>
            {p.highlights && (
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1.1rem", marginBottom: "2rem" }}>
                <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "0.9rem" }}>
                  Highlights
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {p.highlights.map((h) => (
                    <li key={h} style={{ display: "flex", gap: "0.7rem", fontSize: "0.9rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--accent)" }}>→</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1.1rem" }}>
              <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "0.9rem" }}>
                Languages & tools
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {p.tags.map((t) => (
                  <span key={t} className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", padding: "0.32rem 0.75rem", borderRadius: 4, border: "1px solid var(--line)", color: "var(--ink-soft)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Next */}
        <Link href={`/works/${next.slug}`} style={{ textDecoration: "none", display: "block", borderTop: "1px solid var(--line)", marginTop: "clamp(3.5rem, 6vw, 5.5rem)", paddingTop: "2rem" }}>
          <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Next project
          </span>
          <span className="display" style={{ display: "block", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)", marginTop: "0.5rem" }}>
            {next.title} →
          </span>
        </Link>
      </article>

      <style>{`
        @media (max-width: 900px) {
          .detail-top { grid-template-columns: 1fr !important; }
          .detail-rail { flex-direction: column; }
          .detail-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
