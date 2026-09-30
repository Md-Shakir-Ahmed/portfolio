"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import type { SystemStage } from "@/data/portfolio";

interface GuideNodeProps {
  activeStage: SystemStage;
  scrollProgress: number;
}

/**
 * GuideNode — The Abstract Glowing Request/Signal Packet.
 * The primary visual character of the entire portfolio.
 * 
 * Behaviors:
 * - Glides along the vertical system spine as the visitor scrolls through stages.
 * - Emits a breathing radial pulse with concentric signal ripples.
 * - Gently reacts to cursor proximity via spring physics (magnetic pull).
 * - Reacts to section arrivals with a brief haptic glow burst.
 */
export default function GuideNode({ activeStage, scrollProgress }: GuideNodeProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isProximityHover, setIsProximityHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor springs
  const mouseOffsetX = useMotionValue(0);
  const mouseOffsetY = useMotionValue(0);
  const springX = useSpring(mouseOffsetX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseOffsetY, { stiffness: 60, damping: 18 });

  // Spring for smooth spine translation (covers ~65% of viewport height on desktop)
  const nodeTargetY = useMotionValue(0);
  const smoothY = useSpring(nodeTargetY, { stiffness: 70, damping: 22 });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Update node Y position along the vertical spine track
  useEffect(() => {
    if (typeof window === "undefined") return;
    const windowH = window.innerHeight;
    const trackSpan = windowH * 0.55; // matches spine height in SystemSpine
    const startY = windowH * 0.22;
    nodeTargetY.set(startY + scrollProgress * trackSpan);
  }, [scrollProgress, nodeTargetY]);

  // Magnetic proximity effect (within 160px)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nodeCenterX = rect.left + rect.width / 2;
      const nodeCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - nodeCenterX;
      const dy = e.clientY - nodeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 160) {
        const factor = Math.max(0, 1 - distance / 160) * 8; // max 8px displacement
        mouseOffsetX.set((dx / distance) * factor);
        mouseOffsetY.set((dy / distance) * factor);
        setIsProximityHover(true);
      } else {
        mouseOffsetX.set(0);
        mouseOffsetY.set(0);
        setIsProximityHover(false);
      }
    },
    [reducedMotion, mouseOffsetX, mouseOffsetY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="fixed left-6 xl:left-8 z-50 pointer-events-none hidden lg:block"
      style={{ top: 0 }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          y: smoothY,
          x: springX,
        }}
        className="relative flex items-center justify-center -translate-y-1/2"
      >
        {/* Core Luminous Packet Dot */}
        <div
          className="w-3.5 h-3.5 rounded-full bg-[var(--color-primary)] relative z-10"
          style={{
            boxShadow: `
              0 0 10px var(--color-primary-glow),
              0 0 25px rgba(59, 130, 246, 0.4),
              0 0 50px rgba(59, 130, 246, 0.2)
            `,
            animation: reducedMotion
              ? "none"
              : "pulse-breathe 3.5s ease-in-out infinite",
          }}
        >
          {/* Inner intense energy point */}
          <div className="absolute inset-1 rounded-full bg-white opacity-80" />
        </div>

        {/* Concentric Signal Waveform 1 */}
        {!reducedMotion && (
          <span
            className="absolute rounded-full border border-[var(--color-primary)] pointer-events-none"
            style={{
              width: "28px",
              height: "28px",
              animation: "ripple 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite",
              opacity: isProximityHover ? 0.6 : 0.25,
            }}
          />
        )}

        {/* Concentric Signal Waveform 2 */}
        {!reducedMotion && (
          <span
            className="absolute rounded-full border border-[#8B5CF6] pointer-events-none"
            style={{
              width: "44px",
              height: "44px",
              animation: "ripple 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite 1.4s",
              opacity: isProximityHover ? 0.4 : 0.15,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
