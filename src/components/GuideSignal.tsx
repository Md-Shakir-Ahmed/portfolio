"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import type { SystemStage } from "@/data/portfolio";

interface GuideSignalProps {
  activeStage: SystemStage;
  scrollProgress: number;
}

/**
 * GuideSignal — The Living Data/Request Signal Packet.
 * 
 * Multi-layer visual object:
 * 1. Hyper-intense white/blue energy core
 * 2. Volumetric soft halo bloom
 * 3. 3D orbital rings with counter-rotating satellites
 * 4. Micro-particle trail
 * 5. Smooth spring-based magnetic drift towards user cursor
 */
export default function GuideSignal({ activeStage, scrollProgress }: GuideSignalProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Floating Y position that subtly drifts based on scroll
  const scrollTargetY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollTargetY, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const windowH = window.innerHeight;
    scrollTargetY.set(scrollProgress * (windowH * 0.4));
  }, [scrollProgress, scrollTargetY]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 220) {
        const factor = Math.max(0, 1 - dist / 220) * 14; // max 14px magnetic drift
        mouseX.set((dx / dist) * factor);
        mouseY.set((dy / dist) * factor);
        setIsHovering(true);
      } else {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovering(false);
      }
    },
    [reducedMotion, mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-10 right-10 z-40 pointer-events-none hidden sm:block"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="relative flex items-center justify-center"
      >
        {/* Volumetric Radial Aura Halo */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)",
            filter: "blur(10px)",
            animation: reducedMotion ? "none" : "pulse-halo 3s ease-in-out infinite",
          }}
        />

        {/* 3D Outer Orbital Ring */}
        {!reducedMotion && (
          <div
            className="absolute rounded-full border border-[rgba(59,130,246,0.25)] pointer-events-none"
            style={{
              width: "48px",
              height: "48px",
              transform: "perspective(400px) rotateX(65deg)",
              animation: "orbit-cw 8s linear infinite",
            }}
          >
            {/* Micro Satellite Particle on Outer Ring */}
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_6px_#60A5FA]"
              style={{ position: "absolute", top: "-2px", left: "50%" }}
            />
          </div>
        )}

        {/* 3D Inner Orbital Ring (Counter-rotating) */}
        {!reducedMotion && (
          <div
            className="absolute rounded-full border border-[rgba(167,139,250,0.3)] pointer-events-none"
            style={{
              width: "32px",
              height: "32px",
              transform: "perspective(400px) rotateX(-60deg)",
              animation: "orbit-ccw 5s linear infinite",
            }}
          >
            {/* Micro Satellite Particle on Inner Ring */}
            <div
              className="w-1 h-1 rounded-full bg-[#C084FC] shadow-[0_0_5px_#C084FC]"
              style={{ position: "absolute", bottom: "-1px", right: "20%" }}
            />
          </div>
        )}

        {/* Core Luminous Energy Core */}
        <div
          className="w-3.5 h-3.5 rounded-full bg-[var(--color-primary)] relative z-10 flex items-center justify-center"
          style={{
            boxShadow: `
              0 0 12px var(--color-primary-glow),
              0 0 30px rgba(59, 130, 246, 0.6),
              0 0 60px rgba(59, 130, 246, 0.3)
            `,
            animation: reducedMotion
              ? "none"
              : "pulse-breathe 3.5s ease-in-out infinite",
          }}
        >
          {/* Intense Pure White Center */}
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-95" />
        </div>

        {/* Subtle Stage Label Tag */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-60 pointer-events-none"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            letterSpacing: "0.15em",
            color: "var(--color-muted)",
          }}
        >
          SIG_REQ // {activeStage}
        </div>
      </motion.div>
    </div>
  );
}
