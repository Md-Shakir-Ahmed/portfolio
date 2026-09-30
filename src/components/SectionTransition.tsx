"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SystemStage } from "@/data/portfolio";

interface SectionTransitionProps {
  stage: SystemStage;
  index: number;
  label: string;
  children: React.ReactNode;
  id: string;
}

/**
 * SectionTransition — Wraps each section with the system stage label
 * and a reveal animation. Provides consistent section structure.
 */
export default function SectionTransition({
  stage,
  index,
  label,
  children,
  id,
}: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-[60vh] py-20 sm:py-28 px-6 sm:px-10 lg:px-12 w-full max-w-5xl mx-auto"
      aria-label={label}
    >
      {/* System stage label — trace style */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-12 flex items-center gap-3"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.12em",
            color: "var(--color-muted-dim)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="w-8 h-px bg-[var(--color-border)]" />

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.1em",
            color: "var(--color-primary)",
            textTransform: "uppercase",
          }}
        >
          {stage}
        </span>
      </motion.div>

      {/* Section content with stagger reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
