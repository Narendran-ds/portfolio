"use client";
import { useEffect, useState } from "react";

const links = ["About", "Work", "Experience", "Stack", "Contact"];

function openContact() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = "mailto:narendranlofficial@gmail.com";
  } else {
    window.open("https://mail.google.com/mail/?view=cm&to=narendranlofficial@gmail.com&su=Hi%20Narendran%20-%20Let's%20Connect", "_blank");
  }
}

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
      background: onCanvas ? "transparent" : "rgba(6,10,16,0.92)",
      backdropFilter: onCanvas ? "none" : "blur(20px)",
      WebkitBackdropFilter: onCanvas ? "none" : "blur(20px)",
      borderBottom: onCanvas ? "none" : "1px solid rgba(249,115,22,0.12)",
      transition: "all 0.6s ease",
    }}>


      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "2.5rem", alignItems: "center" }} className="nav-links">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontSize: "0.82rem",
            color: onCanvas ? "rgba(255,255,255,0.85)" : "rgba(250,250,250,0.55)",
            textDecoration: "none", letterSpacing: "0.12em",
            textTransform: "uppercase", transition: "color 0.2s",
            textShadow: onCanvas ? "0 2px 12px rgba(0,0,0,0.9)" : "none",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#F97316")}
            onMouseLeave={e => (e.currentTarget.style.color = onCanvas ? "rgba(255,255,255,0.85)" : "rgba(250,250,250,0.55)")}>
            {l}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <a href="/Narendran_L_resume.pdf" target="_blank" rel="noopener noreferrer" style={{
          fontSize: "0.8rem", color: onCanvas ? "rgba(255,255,255,0.6)" : "rgba(250,250,250,0.4)",
          textDecoration: "none", letterSpacing: "0.08em",
          textShadow: onCanvas ? "0 2px 12px rgba(0,0,0,0.9)" : "none", transition: "color 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "#F97316")}
          onMouseLeave={e => (e.currentTarget.style.color = onCanvas ? "rgba(255,255,255,0.6)" : "rgba(250,250,250,0.4)")}>
          Resume ↗
        </a>
        <button onClick={openContact} style={{
          padding: "0.5rem 1.4rem", border: "1px solid rgba(249,115,22,0.8)",
          borderRadius: 999, color: "#F97316", fontSize: "0.82rem",
          cursor: "pointer", letterSpacing: "0.08em", transition: "all 0.25s",
          whiteSpace: "nowrap", background: onCanvas ? "rgba(0,0,0,0.2)" : "transparent",
          backdropFilter: "blur(10px)",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#F97316"; (e.currentTarget as HTMLButtonElement).style.color = "#0A0A0A"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = onCanvas ? "rgba(0,0,0,0.2)" : "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#F97316"; }}>
          Hire Me
        </button>
      </div>
      <style>{`@media(max-width:768px){.nav-links{display:none!important}}`}</style>
    </nav>
  );
}
