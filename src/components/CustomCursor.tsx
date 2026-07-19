"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type CursorState = "default" | "hover" | "card";

interface BoxRect {
  top: number; left: number; width: number; height: number;
}

export default function CustomCursor() {
  const cursorRef     = useRef<HTMLDivElement>(null);
  const posRef        = useRef({ x: -300, y: -300 });
  const rafRef        = useRef<number>(0);

  const [state,       setState]      = useState<CursorState>("default");
  const [isVisible,   setIsVisible]  = useState(false);
  const [cardBox,     setCardBox]    = useState<BoxRect | null>(null);
  const [scanActive,  setScanActive] = useState(false);
  const activeCardRef = useRef<HTMLElement | null>(null);

  const GOLD     = "#E8500A";
  const GOLD_DIM = "rgba(232,80,10,0.45)";
  const WHITE    = "rgba(242,238,227,0.9)";

  const updateCardRect = useCallback(() => {
    if (activeCardRef.current) {
      const r = activeCardRef.current.getBoundingClientRect();
      setCardBox({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
  }, []);

  // ── RAF position loop ────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      if (cursorRef.current) {
        const { x, y } = posRef.current;
        cursorRef.current.style.transform =
          `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Mouse events ─────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const cardEl = t.closest<HTMLElement>("[data-cursor='card']");

      if (cardEl) {
        activeCardRef.current = cardEl;
        const r = cardEl.getBoundingClientRect();
        setCardBox({ top: r.top, left: r.left, width: r.width, height: r.height });
        setState("card");
        setScanActive(true);
      } else if (
        t.closest("a") ||
        t.closest("button") ||
        t.closest<HTMLElement>("[data-cursor='hover']")
      ) {
        activeCardRef.current = null;
        setCardBox(null);
        setState("hover");
        setScanActive(false);
      } else {
        activeCardRef.current = null;
        setCardBox(null);
        setState("default");
        setScanActive(false);
      }
    };

    const onLeave = () => {
      setIsVisible(false);
      activeCardRef.current = null;
      setCardBox(null);
      setState("default");
      setScanActive(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", updateCardRect, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", updateCardRect);
    };
  }, [isVisible, updateCardRect]);

  // ── Cursor visual values ─────────────────────────────────
  const armColor = state === "default" ? WHITE : GOLD;
  const armLen   = state === "card" ? 11 : 8;
  const gap      = state === "hover" ? 2 : 5;
  const dotR     = state === "hover" ? 5 : 3;
  const dotFill  = state === "hover" ? GOLD : "transparent";
  const dotStroke = state === "hover" ? 0 : 1.2;
  const scale    = state === "card" ? 1.55 : state === "hover" ? 1.1 : 1;

  return (
    <>
      {/* ── Cursor reticle ── */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
          mixBlendMode: state === "default" ? "difference" : "normal",
        }}
      >
        <svg
          width="44" height="44" viewBox="-22 -22 44 44"
          style={{
            overflow: "visible",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            transform: `scale(${scale})`,
          }}
        >
          <circle cx="0" cy="0" r={dotR}
            fill={dotFill} stroke={armColor} strokeWidth={dotStroke}
            style={{ transition: "r 0.25s, fill 0.25s, stroke 0.25s" }} />

          {/* 4 crosshair arms */}
          {([
            ["0", `-${gap}`, "0", `-${gap + armLen}`],
            ["0", `${gap}`,  "0", `${gap + armLen}`],
            [`-${gap}`, "0", `-${gap + armLen}`, "0"],
            [`${gap}`,  "0", `${gap + armLen}`,  "0"],
          ] as string[][]).map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={armColor} strokeWidth="1.5" strokeLinecap="round"
              style={{ transition: "stroke 0.2s" }} />
          ))}

          {/* Diagonal ticks — card state only */}
          {state === "card" && (
            [[ 4,-4, 7,-7],[-4,-4,-7,-7],[ 4, 4, 7, 7],[-4, 4,-7, 7]].map(
              ([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={GOLD_DIM} strokeWidth="1" strokeLinecap="round" />
              )
            )
          )}

          {/* Pulse ring — card */}
          {state === "card" && (
            <circle cx="0" cy="0" r="20" fill="none"
              stroke={GOLD_DIM} strokeWidth="0.8"
              style={{ animation: "reticlePulse 1.8s ease-out infinite" }} />
          )}

          {/* Pulse ring — hover */}
          {state === "hover" && (
            <circle cx="0" cy="0" r="15" fill="none"
              stroke={GOLD} strokeWidth="1"
              style={{ animation: "reticlePulse 1.2s ease-out infinite" }} />
          )}
        </svg>
      </div>

      {/* ── Detection bracket overlay ── */}
      {cardBox && (
        <div
          style={{
            position: "fixed",
            top:    cardBox.top  - 7,
            left:   cardBox.left - 7,
            width:  cardBox.width  + 14,
            height: cardBox.height + 14,
            pointerEvents: "none",
            zIndex: 9990,
            animation: "bracketIn 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <svg width="100%" height="100%"
            style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {/* Top-left */}
            <polyline points="22,0 0,0 0,22"
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            {/* Top-right */}
            <polyline
              points={`${cardBox.width - 8},0 ${cardBox.width + 14},0 ${cardBox.width + 14},22`}
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            {/* Bottom-left */}
            <polyline
              points={`0,${cardBox.height - 8} 0,${cardBox.height + 14} 22,${cardBox.height + 14}`}
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            {/* Bottom-right */}
            <polyline
              points={`${cardBox.width - 8},${cardBox.height + 14} ${cardBox.width + 14},${cardBox.height + 14} ${cardBox.width + 14},${cardBox.height - 8}`}
              fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Scan line inside the card */}
          {scanActive && (
            <div style={{
              position: "absolute", left: 0, right: 0, height: "1px",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              opacity: 0.55,
              animation: "scanLine 1.6s ease-in-out infinite",
            }} />
          )}

          {/* FOCUS label */}
          <div style={{
            position: "absolute", top: "-22px", right: 0,
            fontSize: "9px", letterSpacing: "0.18em",
            color: GOLD, fontFamily: "monospace", opacity: 0.75,
            animation: "fadeTagIn 0.25s 0.08s both",
          }}>
            FOCUS
          </div>
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }

        @keyframes reticlePulse {
          0%   { transform: scale(0.85); opacity: 0.8; }
          60%  { transform: scale(1.2);  opacity: 0.15; }
          100% { transform: scale(0.85); opacity: 0; }
        }
        @keyframes bracketIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes scanLine {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 0.55; }
          95%  { opacity: 0.55; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fadeTagIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 0.75; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}