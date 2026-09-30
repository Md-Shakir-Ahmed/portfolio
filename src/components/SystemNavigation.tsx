"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemSections, identity, type SystemStage } from "@/data/portfolio";

/**
 * SystemNavigation — Signal trace rail (desktop) / minimal bar (mobile)
 *
 * Desktop: Fixed left rail with system stage markers and progress indicator
 * Mobile: Auto-hide top bar appearing on scroll-up
 */
export default function SystemNavigation() {
  const [activeStage, setActiveStage] = useState<SystemStage>("CLIENT");
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? currentScrollY / docHeight : 0;
    setScrollProgress(progress);

    // Auto-hide on mobile: show on scroll up, hide on scroll down
    if (currentScrollY < 100) {
      setVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setLastScrollY(currentScrollY);

    // Determine active section
    for (let i = systemSections.length - 1; i >= 0; i--) {
      const el = document.getElementById(systemSections[i].sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          setActiveStage(systemSections[i].stage);
          break;
        }
      }
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ─── Desktop: Left Rail Navigation ─────────────── */}
      <nav
        className="fixed left-0 top-0 h-full z-40 hidden lg:flex flex-col items-center justify-center"
        style={{ width: "var(--nav-width)" }}
        aria-label="System navigation"
      >
        {/* Progress line background */}
        <div className="absolute left-1/2 -translate-x-1/2 h-48 w-px bg-[var(--color-border)]" />

        {/* Progress line fill */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-[var(--color-primary)] origin-top"
          style={{
            height: "192px",
            scaleY: scrollProgress,
            top: "calc(50% - 96px)",
          }}
        />

        {/* Section markers */}
        <div className="relative flex flex-col gap-8 items-center">
          {systemSections.map((section) => {
            const isActive = section.stage === activeStage;
            return (
              <button
                key={section.stage}
                onClick={() => scrollToSection(section.sectionId)}
                className="group relative flex items-center gap-3 cursor-pointer bg-transparent border-none"
                aria-label={`Navigate to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Node dot */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)]"
                      : "bg-[var(--color-muted-dim)] group-hover:bg-[var(--color-muted)]"
                  }`}
                />

                {/* Label (appears on hover) */}
                <span
                  className={`font-mono-sm absolute left-6 whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "opacity-100 text-[var(--color-primary)]"
                      : "opacity-0 group-hover:opacity-70 text-[var(--color-muted)]"
                  }`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {section.stage}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─── Mobile: Auto-hide Top Bar ─────────────────── */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed top-0 left-0 right-0 z-40 lg:hidden glass"
            aria-label="System navigation"
          >
            <div className="flex items-center justify-between px-4 py-3">
              {/* System name */}
              <span
                className="text-[var(--color-muted)]"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                }}
              >
                {identity.systemName}
              </span>

              {/* Stage indicators */}
              <div className="flex items-center gap-1.5">
                {systemSections.map((section) => {
                  const isActive = section.stage === activeStage;
                  return (
                    <button
                      key={section.stage}
                      onClick={() => scrollToSection(section.sectionId)}
                      className={`px-2 py-1 rounded transition-all duration-200 bg-transparent border-none cursor-pointer ${
                        isActive
                          ? "text-[var(--color-text)]"
                          : "text-[var(--color-muted-dim)]"
                      }`}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.08em",
                      }}
                      aria-label={`Navigate to ${section.label}`}
                    >
                      {section.stage.slice(0, 3)}
                    </button>
                  );
                })}
              </div>

              {/* Pulse dot */}
              <div
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"
                style={{
                  boxShadow: "0 0 6px var(--color-primary-glow)",
                }}
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
