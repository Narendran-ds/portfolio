"use client";
import { useEffect, useRef, useState } from "react";

/** IntersectionObserver reveal — returns a ref and visibility flag. */
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, vis };
}

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
