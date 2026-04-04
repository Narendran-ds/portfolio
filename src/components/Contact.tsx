"use client";
import { useRef, useEffect, useState } from "react";

const BG = "radial-gradient(ellipse at 80% 20%, #1f0d00 0%, #0d1117 45%, #060a10 100%)";
const ACCENT = "#F97316";
const ACCENT2 = "#FDBA74";
const BORDER = "rgba(249,115,22,0.15)";
const TEXT = "#FAFAFA";
const MUTED = "rgba(250,250,250,0.4)";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{ background: BG, padding: "8rem 6vw", /* seamless */ }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase", marginBottom: "1.5rem" }}>Get In Touch</div>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Let&apos;s Build Something <span style={{ color: ACCENT }}>Together</span>
          </h2>
          <p style={{ fontSize: "1rem", color: MUTED, lineHeight: 1.8, marginBottom: "3rem" }}>
            Open to SDE and ML fresher roles, freelance projects, and collaborations. Let&apos;s connect and build something great.
          </p>
          <a href="mailto:narendranlofficial@gmail.com" style={{ display: "inline-block", padding: "1rem 3rem", background: ACCENT, borderRadius: 999, color: "#0A0A0A", fontWeight: 700, fontSize: "1rem", textDecoration: "none", letterSpacing: "0.05em", marginBottom: "2.5rem", transition: "all 0.3s", boxShadow: "0 0 40px rgba(249,115,22,0.35)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(249,115,22,0.55)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(249,115,22,0.35)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
            Say Hello →
          </a>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/narendran-l1125" },
              { label: "GitHub", href: "https://github.com/Narendran-ds" },
              { label: "narendranlofficial@gmail.com", href: "mailto:narendranlofficial@gmail.com" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ color: MUTED, fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT2)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}