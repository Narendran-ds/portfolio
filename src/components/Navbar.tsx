"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "/works" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
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

  useEffect(() => {
    if (solid) return;
    const onScroll = () => {
      const canvasHeight = window.innerHeight * 7;
      setOnCanvas(window.scrollY < canvasHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const ink = onCanvas ? "rgba(242,238,227,0.92)" : "var(--ink)";
  const inkSoft = onCanvas ? "rgba(242,238,227,0.6)" : "var(--ink-soft)";

  return (
    <>
      {/* Wordmark — top left, outside the pill */}
      <a
        href="/"
        className="mono"
        style={{
          position: "fixed",
          top: "1.6rem",
          left: "4vw",
          zIndex: 110,
          fontSize: "0.7rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: ink,
          textDecoration: "none",
          transition: "color 0.6s cubic-bezier(0.32,0.72,0,1)",
          lineHeight: 1.5,
        }}
      >
        Narendran L<br />
        <span style={{ color: inkSoft }}>Chennai, IN</span>
      </a>

      {/* Island pill nav */}
      <nav
        style={{
          position: "fixed",
          top: "1.4rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 110,
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.4rem",
          borderRadius: 999,
          background: onCanvas ? "rgba(23,19,16,0.35)" : "rgba(242,238,227,0.75)",
          border: `1px solid ${onCanvas ? "rgba(242,238,227,0.14)" : "rgba(23,19,16,0.12)"}`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          transition: "background 0.6s cubic-bezier(0.32,0.72,0,1), border-color 0.6s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }} className="nav-links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="mono"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: inkSoft,
                textDecoration: "none",
                padding: "0.55rem 0.9rem",
                borderRadius: 999,
                transition: "color 0.3s cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E8500A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = inkSoft)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={openContact}
          className="mono"
          style={{
            padding: "0.55rem 1.2rem",
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
      </nav>

      {/* Resume — top right */}
      <a
        href="/Narendran_L_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mono"
        style={{
          position: "fixed",
          top: "1.9rem",
          right: "4vw",
          zIndex: 110,
          fontSize: "0.7rem",
          letterSpacing: "0.22em",
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

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </>
  );
}
