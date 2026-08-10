"use client";
import { useEffect, useState } from "react";
import { useReveal, EASE } from "./useReveal";

function openMail(subject = "") {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const email = "narendranlofficial@gmail.com";
  if (isMobile) {
    window.location.href = `mailto:${email}${subject ? `?su=${encodeURIComponent(subject)}` : ""}`;
  } else {
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject || "Hi Narendran — Let's Connect")}`,
      "_blank"
    );
  }
}

export default function Contact() {
  const { ref, vis } = useReveal<HTMLElement>(0.15);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "#171310",
        color: "#F2EEE3",
        padding: "clamp(7rem, 12vw, 11rem) 4vw 0",
        borderRadius: "2.5rem 2.5rem 0 0",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(242,238,227,0.15)",
            paddingTop: "1.2rem",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            fontSize: "0.68rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(242,238,227,0.4)",
          }}
        >
          <span style={{ color: "#E8500A" }}>( 07 )</span>
          <span>Contact</span>
          <span>Open to SDE & ML roles</span>
        </div>

        <h2
          className="display"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "#F2EEE3",
            marginBottom: "3rem",
          }}
        >
          {[
            <>Have an <span className="serif" style={{ color: "#E8500A" }}>idea</span>?</>,
            <>Let&apos;s <span className="serif" style={{ color: "#E8500A" }}>build</span> it.</>,
          ].map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  transform: vis ? "none" : "translateY(110%)",
                  transition: `transform 1s ${EASE} ${0.1 + i * 0.15}s`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <button
          onClick={() => openMail()}
          className="mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0.7rem 0.7rem 0.7rem 1.8rem",
            borderRadius: 999,
            border: "1px solid rgba(242,238,227,0.25)",
            background: "transparent",
            color: "#F2EEE3",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: `all 0.5s ${EASE}`,
            marginBottom: "clamp(4rem, 8vw, 7rem)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F2EEE3";
            e.currentTarget.style.color = "#171310";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#F2EEE3";
          }}
        >
          narendranlofficial@gmail.com
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#E8500A",
              color: "#F2EEE3",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            ↗
          </span>
        </button>

        {/* Footer bar */}
        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.25rem",
            borderTop: "1px solid rgba(242,238,227,0.12)",
            padding: "1.8rem 0",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(242,238,227,0.4)",
          }}
        >
          <span>© {new Date().getFullYear()} Narendran L</span>
          <div style={{ display: "flex", gap: "1.75rem" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/narendran-l1125" },
              { label: "GitHub", href: "https://github.com/Narendran-ds" },
              { label: "Resume", href: "/Narendran_L_resume.pdf" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(242,238,227,0.55)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8500A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,238,227,0.55)")}
              >
                {l.label}
              </a>
            ))}
          </div>
          <span>Chennai, IN — {time} IST</span>
        </div>
      </div>
    </section>
  );
}
