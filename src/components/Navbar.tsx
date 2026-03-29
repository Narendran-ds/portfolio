"use client";
import { useEffect, useState } from "react";

const links = ["About", "Work", "Experience", "Stack", "Contact"];

export default function Navbar() {
  const [onCanvas, setOnCanvas] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const canvasHeight = window.innerHeight * 7;
      setOnCanvas(window.scrollY < canvasHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.2rem 6vw",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: onCanvas ? "transparent" : "rgba(10,15,30,0.92)",
      backdropFilter: onCanvas ? "none" : "blur(20px)",
      WebkitBackdropFilter: onCanvas ? "none" : "blur(20px)",
      borderBottom: onCanvas ? "none" : "1px solid rgba(29,184,160,0.12)",
      transition: "all 0.6s ease",
    }}>


      {/* Centered links */}
      <div style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "2.5rem", alignItems: "center",
      }} className="nav-links">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontSize: "0.82rem",
            color: onCanvas ? "rgba(255,255,255,0.85)" : "rgba(232,234,240,0.65)",
            textDecoration: "none", letterSpacing: "0.12em",
            textTransform: "uppercase", transition: "color 0.2s",
            textShadow: onCanvas ? "0 2px 12px rgba(0,0,0,0.9)" : "none",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#1db8a0")}
            onMouseLeave={e => (e.currentTarget.style.color = onCanvas ? "rgba(255,255,255,0.85)" : "rgba(232,234,240,0.65)")}>
            {l}
          </a>
        ))}
      </div>

      {/* Right side — Resume + Hire Me */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {/* Resume download */}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
          fontSize: "0.8rem", color: onCanvas ? "rgba(255,255,255,0.7)" : "rgba(232,234,240,0.5)",
          textDecoration: "none", letterSpacing: "0.08em",
          textShadow: onCanvas ? "0 2px 12px rgba(0,0,0,0.9)" : "none",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "#1db8a0")}
          onMouseLeave={e => (e.currentTarget.style.color = onCanvas ? "rgba(255,255,255,0.7)" : "rgba(232,234,240,0.5)")}>
          Resume ↗
        </a>

        {/* Hire Me */}
        <a href="mailto:narendranlofficial@gmail.com" style={{
          padding: "0.5rem 1.4rem",
          border: "1px solid rgba(29,184,160,0.9)",
          borderRadius: 999, color: "#1db8a0",
          fontSize: "0.82rem", textDecoration: "none",
          letterSpacing: "0.08em", transition: "all 0.25s",
          whiteSpace: "nowrap",
          background: onCanvas ? "rgba(0,0,0,0.2)" : "transparent",
          backdropFilter: "blur(10px)",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#1db8a0";
            (e.currentTarget as HTMLAnchorElement).style.color = "#0a0f1e";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = onCanvas ? "rgba(0,0,0,0.2)" : "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#1db8a0";
          }}>
          Hire Me
        </a>
      </div>

      <style>{`@media(max-width:768px){.nav-links{display:none!important}}`}</style>
    </nav>
  );
}