"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type CursorState = "default" | "hover" | "card";

interface BracketBox {
  top: number;
  left: number;
  width: number;
  height: number;
}
 
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [bracketBox, setBracketBox] = useState<BracketBox | null>(null);
  const [scanActive, setScanActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  // Recalculate bracket on scroll
  const activeCardRef = useRef<HTMLElement | null>(null);

  const updateBracket = useCallback(() => {
    if (activeCardRef.current) {
      const r = activeCardRef.current.getBoundingClientRect();
      setBracketBox({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      if (cursorRef.current) {
        const { x, y } = posRef.current;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const cardEl = t.closest("[data-cursor='card']") as HTMLElement | null;

      if (cardEl) {
        activeCardRef.current = cardEl;
        const r = cardEl.getBoundingClientRect();
        setBracketBox({ top: r.top, left: r.left, width: r.width, height: r.height });
        setState("card");
        setScanActive(true);
      } else if (t.closest("a") || t.closest("button") || t.closest("[data-cursor='hover']")) {
        activeCardRef.current = null;
        setBracketBox(null);
        setState("hover");
        setScanActive(false);
      } else {
        activeCardRef.current = null;
        setBracketBox(null);
        setState("default");
        setScanActive(false);
      }
    };

    const onLeave = () => {
      setIsVisible(false);
      activeCardRef.current = null;
      setBracketBox(null);
      setState("default");
      setScanActive(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", updateBracket, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", updateBracket);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, updateBracket]);

  const GOLD = "#c9a84c";
  const GOLD_DIM = "rgba(201,168,76,0.45)";
  const WHITE_DIM = "rgba(255,255,255,0.55)";

  const armColor = state === "default" ? WHITE_DIM : GOLD;
  const armLength = state === "card" ? 10 : 8;
  const gap = state === "hover" ? 2 : 5;
  const centerDotSize = state === "hover" ? 5 : 3;

  return (
    <>
      {/* ── Cursor reticle ── */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="-20 -20 40 40"
          style={{
            overflow: "visible",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            transform: state === "card" ? "scale(1.5)" : state === "hover" ? "scale(1.1)" : "scale(1)",
          }}
        >
          {/* Center dot */}
          <circle
            cx="0"
            cy="0"
            r={centerDotSize}
            fill={state === "hover" ? GOLD : "transparent"}
            stroke={armColor}
            strokeWidth={state === "hover" ? 0 : 1.2}
            style={{ transition: "r 0.25s ease, fill 0.25s ease" }}
          />

          {/* Crosshair arms — top, bottom, left, right */}
          {/* Top */}
          <line x1="0" y1={-(gap)} x2="0" y2={-(gap + armLength)} stroke={armColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transition: "stroke 0.2s" }} />
          {/* Bottom */}
          <line x1="0" y1={gap} x2="0" y2={gap + armLength} stroke={armColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transition: "stroke 0.2s" }} />
          {/* Left */}
          <line x1={-(gap)} y1="0" x2={-(gap + armLength)} y2="0" stroke={armColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transition: "stroke 0.2s" }} />
          {/* Right */}
          <line x1={gap} y1="0" x2={gap + armLength} y2="0" stroke={armColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transition: "stroke 0.2s" }} />

          {/* Diagonal ticks — visible on card hover only */}
          {state === "card" && (
            <>
              <line x1="4" y1="-4" x2="7" y2="-7" stroke={GOLD_DIM} strokeWidth="1" strokeLinecap="round" />
              <line x1="-4" y1="-4" x2="-7" y2="-7" stroke={GOLD_DIM} strokeWidth="1" strokeLinecap="round" />
              <line x1="4" y1="4" x2="7" y2="7" stroke={GOLD_DIM} strokeWidth="1" strokeLinecap="round" />
              <line x1="-4" y1="4" x2="-7" y2="7" stroke={GOLD_DIM} strokeWidth="1" strokeLinecap="round" />
            </>
          )}

          {/* Outer pulse ring — card state */}
          {state === "card" && (
            <circle cx="0" cy="0" r="18" fill="none" stroke={GOLD_DIM} strokeWidth="0.8"
              style={{ animation: "reticlePulse 1.8s ease-out infinite" }} />
          )}

          {/* Hover ring */}
          {state === "hover" && (
            <circle cx="0" cy="0" r="14" fill="none" stroke={GOLD} strokeWidth="1"
              style={{ animation: "reticlePulse 1.2s ease-out infinite" }} />
          )}
        </svg>
      </div>

      {/* ── Detection bracket overlay on card ── */}
      {bracketBox && (
        <div
          style={{
            position: "fixed",
            top: bracketBox.top - 6,
            left: bracketBox.left - 6,
            width: bracketBox.width + 12,
            height: bracketBox.height + 12,
            pointerEvents: "none",
            zIndex: 9990,
            animation: "bracketIn 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          {/* Corner brackets — SVG drawn as 4 L-shapes */}
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0, overflow: "visible" }}
          >
            {/* Top-left */}
            <polyline points="20,0 0,0 0,20" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            {/* Top-right */}
            <polyline
              points={`${bracketBox.width - 8},0 ${bracketBox.width + 12},0 ${bracketBox.width + 12},20`}
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            {/* Bottom-left */}
            <polyline
              points={`0,${bracketBox.height - 8} 0,${bracketBox.height + 12} 20,${bracketBox.height + 12}`}
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            {/* Bottom-right */}
            <polyline
              points={`${bracketBox.width - 8},${bracketBox.height + 12} ${bracketBox.width + 12},${bracketBox.height + 12} ${bracketBox.width + 12},${bracketBox.height - 8}`}
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Scan line sweeping through card */}
          {scanActive && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                opacity: 0.5,
                animation: "scanLine 1.6s ease-in-out infinite",
              }}
            />
          )}

          {/* "DETECTED" label tag — top right corner */}
          <div
            style={{
              position: "absolute",
              top: "-22px",
              right: 0,
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: GOLD,
              fontFamily: "monospace",
              opacity: 0.7,
              animation: "fadeTagIn 0.3s 0.1s both",
            }}
          >
            FOCUS
          </div>
        </div>
      )}

      {/* ── Global keyframes ── */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }

        @keyframes reticlePulse {
          0%   { transform: scale(0.85); opacity: 0.8; }
          60%  { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(0.85); opacity: 0; }
        }

        @keyframes bracketIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes scanLine {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 0.5; }
          95%  { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes fadeTagIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 0.7; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
