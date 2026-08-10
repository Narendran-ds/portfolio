import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CertificateCover from "@/components/CertificateCover";
import { certificates, getCertificate } from "@/data/certificates";

export function generateStaticParams() {
  return certificates.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCertificate(params.slug);
  if (!c) return { title: "Certificate — Narendran L" };
  return { title: `${c.title} — Narendran L`, description: c.oneLiner };
}

export default function CertificateDetail({ params }: { params: { slug: string } }) {
  const c = getCertificate(params.slug);
  if (!c) notFound();

  const idx = certificates.indexOf(c);
  const others = [...certificates.slice(idx + 1), ...certificates.slice(0, idx)];
  const next = certificates[(idx + 1) % certificates.length];

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar solid />

      {/* Top: hero cover + other certificates rail */}
      <div className="detail-top" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "clamp(1.5rem, 2.5vw, 2.5rem)", maxWidth: 1500, margin: "0 auto", padding: "7.5rem 4vw 0" }}>
        <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "1.2rem", overflow: "hidden", boxShadow: "0 30px 80px -30px rgba(23,19,16,0.3)" }}>
          <CertificateCover certificate={c} index={idx} />
        </div>

        <div className="detail-rail" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Other certificates
          </span>
          {others.map((o) => (
            <Link key={o.slug} href={`/certificates/${o.slug}`} style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "110px 1fr", gap: "0.9rem", alignItems: "center" }}>
              <div style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: "0.6rem", overflow: "hidden" }}>
                <CertificateCover certificate={o} index={certificates.indexOf(o)} compact />
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
          <Link href="/#certifications" className="mono sweep-link" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", marginTop: "0.4rem" }}>
            All certifications →
          </Link>
        </div>
      </div>

      {/* Body */}
      <article style={{ maxWidth: 1500, margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) 4vw clamp(5rem, 8vw, 7rem)" }}>
        <div className="mono" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "1.4rem" }}>
          <span>{c.date}</span>
          <span style={{ color: "var(--accent)" }}>[{c.issuer}]</span>
        </div>

        <h1 className="display" style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--ink)", maxWidth: "18ch", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          {c.title}
        </h1>

        <div className="detail-body" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "clamp(2.5rem, 5vw, 6rem)", alignItems: "start" }}>
          {/* Story */}
          <div>
            {c.story.map((para) => (
              <p key={para.slice(0, 32)} style={{ fontSize: "clamp(1rem, 1.25vw, 1.15rem)", color: "var(--ink-soft)", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.4rem" }}>
                {para}
              </p>
            ))}

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <a href={c.file} target="_blank" rel="noopener noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", padding: "0.55rem 0.55rem 0.55rem 1.3rem", background: "var(--ink)", color: "var(--paper)", borderRadius: 999, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>
                View certificate
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", color: "#F2EEE3", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>↗</span>
              </a>
              <a href={c.file} download className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", padding: "0.55rem 0.55rem 0.55rem 1.3rem", border: "1px solid var(--line)", color: "var(--ink)", borderRadius: 999, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>
                Download PDF
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--paper-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>↓</span>
              </a>
            </div>
          </div>

          {/* Facts rail */}
          <aside>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1.1rem" }}>
              <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "0.9rem" }}>
                Issued by
              </div>
              <div style={{ fontSize: "0.95rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>{c.issuer}</div>
            </div>
          </aside>
        </div>

        {/* Next */}
        <Link href={`/certificates/${next.slug}`} style={{ textDecoration: "none", display: "block", borderTop: "1px solid var(--line)", marginTop: "clamp(3.5rem, 6vw, 5.5rem)", paddingTop: "2rem" }}>
          <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Next certificate
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
