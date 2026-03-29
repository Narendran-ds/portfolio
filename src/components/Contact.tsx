"use client";
import { useRef, useEffect, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{ background: "#070c1a", padding: "8rem 6vw", borderTop: "1px solid rgba(29,184,160,0.1)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#1db8a0", textTransform: "uppercase", marginBottom: "1.5rem" }}>Get In Touch</div>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#e8eaf0", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Let&apos;s Build Something <span style={{ color: "#1db8a0" }}>Together</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(232,234,240,0.45)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Open to SDE and ML fresher roles, freelance projects, and collaborations. Let&apos;s connect and build something great.
          </p>

          <a href="mailto:narendranlofficial@gmail.com" style={{ display: "inline-block", padding: "1rem 3rem", background: "#1db8a0", borderRadius: 999, color: "#0a0f1e", fontWeight: 700, fontSize: "1rem", textDecoration: "none", letterSpacing: "0.05em", marginBottom: "2.5rem", transition: "all 0.3s", boxShadow: "0 0 30px rgba(29,184,160,0.3)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#15a08a"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px rgba(29,184,160,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1db8a0"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(29,184,160,0.3)"; }}
          >
            Say Hello →
          </a>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/narendran-l1125" },
              { label: "GitHub", href: "https://github.com/Narendran-ds" },
              { label: "narendranlofficial@gmail.com", href: "mailto:narendranlofficial@gmail.com" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(232,234,240,0.4)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1db8a0")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,234,240,0.4)")}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
