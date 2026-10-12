import { useEffect, useRef, useState } from "react";

/**
 * Minimalist Cinematic Custom Cursor
 * Inspired by Kage's precision dot cursor with smooth trailing aura and hover magnetism.
 * Safely disables on mobile/touch devices and respect prefers-reduced-motion.
 */
export function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on touch screens or reduced motion
    const isTouch = window.matchMedia("(hover: none)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReduced) return;

    let targetX = -100;
    let targetY = -100;
    let auraX = -100;
    let auraY = -100;
    let rafId: number;

    const onPointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    };

    const onPointerLeave = () => {
      setIsVisible(false);
    };

    const render = () => {
      // Damped trailing aura lag
      auraX += (targetX - auraX) * 0.18;
      auraY += (targetY - auraY) * 0.18;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[data-cursor]"))
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[100] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 transition-opacity duration-300 shadow-[0_0_12px_#38bdf8] ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isActive ? "scale-150 bg-white shadow-[0_0_18px_#ffffff]" : ""}`}
      />

      {/* Trailing Soft Atmosphere Aura */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-primary/10 transition-all duration-300 backdrop-blur-[1px] ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isActive ? "size-12 border-cyan-400/80 bg-cyan-400/15" : "size-8 border-primary/30"}`}
      />
    </>
  );
}
