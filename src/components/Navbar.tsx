"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Work", href: "/works" },
  { label: "Projects", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
];

function openContact() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = "mailto:narendranlofficial@gmail.com";
  } else {
    window.open(
      "https://mail.google.com/mail/?view=cm&to=narendranlofficial@gmail.com&su=Hi%20Narendran%20-%20Let's%20Connect",
      "_blank"
    );
  }
}

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [onCanvas, setOnCanvas] = useState(!solid);
  const [hidden, setHidden] = useState(false);
  const [elevated, setElevated] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!solid) {
        const canvasHeight = window.innerHeight * 7;
        setOnCanvas(y < canvasHeight - window.innerHeight);
      }
      // zipforgex.in pattern: hide on scroll down, reveal with an elevated
      // surface on scroll up; stay flat/transparent right at the top.
      if (y < 80) {
        setHidden(false);
        setElevated(false);
      } else if (y > lastY.current) {
        setHidden(true);
      } else {
        setHidden(false);
        setElevated(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const ink = onCanvas ? "rgba(242,238,227,0.94)" : "var(--ink)";
  const inkSoft = onCanvas ? "rgba(242,238,227,0.62)" : "var(--ink-soft)";

  return (
    <>
      {/* Flat full-width bar — zipforgex.in style: no pill at rest, hides on
          scroll down, reappears as an elevated floating card on scroll up. */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.6rem 4vw",
          margin: elevated ? "0.8rem 1.1rem" : "0",
          borderRadius: elevated ? "1.4rem" : "0",
          background: elevated ? (onCanvas ? "rgba(23,19,16,0.92)" : "rgba(242,238,227,0.94)") : "transparent",
          border: elevated ? `1px solid ${onCanvas ? "rgba(242,238,227,0.14)" : "rgba(23,19,16,0.1)"}` : "1px solid transparent",
          backdropFilter: elevated ? "blur(16px)" : "none",
          WebkitBackdropFilter: elevated ? "blur(16px)" : "none",
          boxShadow: elevated ? "0 24px 60px -24px rgba(23,19,16,0.35)" : "none",
          transform: hidden ? "translateY(-130%)" : "translateY(0)",
          transition:
            "transform 0.45s cubic-bezier(0.32,0.72,0,1), margin 0.45s cubic-bezier(0.32,0.72,0,1), border-radius 0.45s cubic-bezier(0.32,0.72,0,1), background 0.4s cubic-bezier(0.32,0.72,0,1), box-shadow 0.4s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Wordmark — left */}
        <a
          href="/"
          className="display"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.6rem",
            fontSize: "1.1rem",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: ink,
            textDecoration: "none",
            transition: "color 0.6s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          Narendran<span style={{ color: "#E8500A" }}>L</span>
          <span
            className="mono"
            style={{
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: inkSoft,
            }}
          >
            Chennai, IN
          </span>
        </a>

        {/* Plain-text links — center-right */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="mono"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: inkSoft,
                textDecoration: "none",
                transition: "color 0.3s cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E8500A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = inkSoft)}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Avatar badge + resume + CTA — right */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div
            className="nav-avatar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              className="display"
              aria-hidden
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#171310",
                color: "#E8500A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              N
            </span>
            <a
              href="/Narendran_L_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mono resume-link"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: inkSoft,
                textDecoration: "none",
                transition: "color 0.4s cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E8500A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = inkSoft)}
            >
              Resume ↗
            </a>
          </div>

          <button
            onClick={openContact}
            className="mono"
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: 999,
              border: "none",
              background: "#E8500A",
              color: "#F2EEE3",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1), background 0.4s cubic-bezier(0.32,0.72,0,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.background = "#171310";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#E8500A";
            }}
          >
            Hire me
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-avatar .resume-link { display: none !important; }
        }
      `}</style>
    </>
  );
}
