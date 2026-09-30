"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemSections, identity, social, type SystemStage } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";

interface SpatialNavigationProps {
  activeStage: SystemStage;
  onNavigate: (sectionId: string) => void;
  scrollProgress?: number;
}

export default function SpatialNavigation({
  activeStage,
  onNavigate,
  scrollProgress = 0,
}: SpatialNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [brandHovered, setBrandHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ghHovered, setGhHovered] = useState(false);
  const [cvHovered, setCvHovered] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Track scroll position to compact the navigation rail
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle keyboard navigation for mobile drawer
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    },
    [mobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleStageClick = (sectionId: string) => {
    onNavigate(sectionId);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* ─── DESKTOP & MOBILE HEADER SHELL ────────────────────── */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 pointer-events-none transition-all duration-500 ease-out ${
          scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
            scrolled
              ? "px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-[#050508]/90 backdrop-blur-md border border-[rgba(255,255,255,0.09)] shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
              : "px-3 py-1.5 bg-transparent border border-transparent"
          }`}
        >
          {/* ─── LEFT: PERSONAL IDENTITY WITH STATUS ────────── */}
          <div
            onClick={() => handleStageClick("hero")}
            onMouseEnter={() => setBrandHovered(true)}
            onMouseLeave={() => setBrandHovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleStageClick("hero");
            }}
            className="pointer-events-auto flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-lg focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] outline-none transition-all"
            aria-label="Scroll to top / Hero"
          >
            {/* Live Status Indicator Dot */}
            <div className="relative flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary-glow)]" />
              {!reducedMotion && (
                <span className="absolute w-4 h-4 rounded-full bg-[var(--color-primary)]/30 animate-ping pointer-events-none" />
              )}
            </div>

            {/* Identity & Sub-label with smooth roll swap */}
            <div className="flex flex-col text-left font-mono leading-tight">
              <span className="text-sm sm:text-base text-white font-bold tracking-wider group-hover:text-[#60A5FA] transition-colors">
                SHAKIR.AHMED
              </span>
              <div className="relative h-[16px] overflow-hidden text-xs text-[var(--color-muted)] tracking-wider uppercase">
                <AnimatePresence mode="wait" initial={false}>
                  {brandHovered ? (
                    <motion.span
                      key="hovered"
                      initial={reducedMotion ? undefined : { y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reducedMotion ? undefined : { y: -10, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="block text-[#93C5FD] whitespace-nowrap font-medium"
                    >
                      BACKEND ENGINEER · RAJSHAHI, BD
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={reducedMotion ? undefined : { y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reducedMotion ? undefined : { y: 10, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="block whitespace-nowrap"
                    >
                      BACKEND / SYSTEMS
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ─── CENTER: SYSTEM NAVIGATION RAIL (DESKTOP) ──── */}
          <nav
            className="hidden md:flex pointer-events-auto items-center px-3 sm:px-4 py-1.5 rounded-full bg-[#08080C]/90 border border-[rgba(255,255,255,0.08)] shadow-inner relative"
            aria-label="System Navigation Rail"
          >
            {/* The physical horizontal bus wire running behind all nodes */}
            <div
              className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent pointer-events-none -z-0"
              aria-hidden="true"
            />

            <div className="flex items-center gap-1 sm:gap-1.5 relative z-10">
              {systemSections.map((sec, idx) => {
                const isActive = activeStage === sec.stage;

                return (
                  <div key={sec.stage} className="flex items-center">
                    <button
                      onClick={() => handleStageClick(sec.sectionId)}
                      className={`group relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-[0.8125rem] font-mono transition-all duration-300 cursor-pointer flex items-center gap-2 outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] ${
                        isActive
                          ? "text-white font-bold"
                          : "text-[rgba(255,255,255,0.55)] hover:text-white"
                      }`}
                      style={{ letterSpacing: "0.06em" }}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Jump to stage ${sec.stage}: ${sec.label}`}
                    >
                      {/* Active / Inactive Signal Node */}
                      <div className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
                        {isActive ? (
                          <motion.span
                            layoutId={reducedMotion ? undefined : "system-signal-dot"}
                            className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"
                            style={{
                              boxShadow:
                                "0 0 10px #60A5FA, 0 0 18px rgba(59, 130, 246, 0.7)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 28,
                            }}
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.25)] group-hover:bg-[rgba(255,255,255,0.7)] transition-colors" />
                        )}
                      </div>

                      {/* Stage Name */}
                      <span>{sec.stage}</span>

                      {/* Active Traveling Capsule Aura */}
                      {isActive && (
                        <motion.div
                          layoutId={reducedMotion ? undefined : "system-signal-pill"}
                          className="absolute inset-0 rounded-full bg-[rgba(59,130,246,0.12)] border border-[rgba(59,130,246,0.38)] -z-10 shadow-[0_0_15px_rgba(59,130,246,0.18)]"
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 28,
                          }}
                        />
                      )}
                    </button>

                    {/* Connecting Signal Arrow Between Stations */}
                    {idx < systemSections.length - 1 && (
                      <span
                        className="text-[rgba(255,255,255,0.25)] font-mono text-xs select-none px-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* ─── RIGHT: SYSTEM STATUS & COMPACT ACTIONS ─────── */}
          <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
            {/* System Indicator: Signal Telemetry */}
            <div
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0A0A0E] border border-[rgba(255,255,255,0.08)] font-mono text-xs tracking-wider text-[var(--color-muted)] group cursor-default select-none transition-colors hover:border-[rgba(59,130,246,0.35)]"
              title="System connection telemetry"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0" />
              <div className="relative h-[16px] overflow-hidden w-[105px]">
                <span className="block group-hover:-translate-y-full transition-transform duration-300 text-[var(--color-muted)]">
                  SIGNAL ACTIVE
                </span>
                <span className="block group-hover:-translate-y-full transition-transform duration-300 text-emerald-400 absolute top-full left-0 whitespace-nowrap font-medium">
                  SCROLL TO TRACE
                </span>
              </div>
            </div>

            {/* Compact Action: [ GH ↗ ] with subtle expansion */}
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setGhHovered(true)}
              onMouseLeave={() => setGhHovered(false)}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0E] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.35)] font-mono text-xs sm:text-[0.8125rem] text-[var(--color-text-secondary)] hover:text-white transition-all duration-300 focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] outline-none overflow-hidden"
              aria-label="View source on GitHub"
            >
              <span className="text-[var(--color-muted-dim)]">[</span>
              <div className="relative h-[16px] flex items-center justify-center min-w-[46px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {ghHovered ? (
                    <motion.span
                      key="gh-expanded"
                      initial={reducedMotion ? undefined : { y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reducedMotion ? undefined : { y: -10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1 text-white font-medium whitespace-nowrap"
                    >
                      <span>SOURCE</span>
                      <span className="text-[#60A5FA]">→</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="gh-compact"
                      initial={reducedMotion ? undefined : { y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reducedMotion ? undefined : { y: 10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>GH</span>
                      <span className="text-[var(--color-muted)] text-xs">↗</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[var(--color-muted-dim)]">]</span>
            </a>

            {/* Compact Action: [ CV ↓ ] with subtle expansion */}
            <a
              href={getAssetPath(social.cvDownloadUrl)}
              download="MD.Shakir-Ahmed.pdf"
              onMouseEnter={() => setCvHovered(true)}
              onMouseLeave={() => setCvHovered(false)}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0E] border border-[rgba(59,130,246,0.35)] hover:border-[var(--color-primary)] font-mono text-xs sm:text-[0.8125rem] text-white transition-all duration-300 hover:shadow-[0_0_18px_rgba(59,130,246,0.3)] focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] outline-none overflow-hidden"
              aria-label="Download Curriculum Vitae PDF"
            >
              <span className="text-[rgba(59,130,246,0.6)]">[</span>
              <div className="relative h-[16px] flex items-center justify-center min-w-[42px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {cvHovered ? (
                    <motion.span
                      key="cv-expanded"
                      initial={reducedMotion ? undefined : { y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reducedMotion ? undefined : { y: -10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1 text-[#60A5FA] font-medium whitespace-nowrap"
                    >
                      <span>RESUME</span>
                      <span>↓</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="cv-compact"
                      initial={reducedMotion ? undefined : { y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reducedMotion ? undefined : { y: 10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1 whitespace-nowrap"
                    >
                      <span className="text-[#60A5FA] font-medium">CV</span>
                      <span className="text-[#60A5FA] text-xs">↓</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[rgba(59,130,246,0.6)]">]</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg bg-[#0A0A0E] border border-[rgba(255,255,255,0.12)] text-white hover:border-[var(--color-primary)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] outline-none"
              aria-label={mobileMenuOpen ? "Close system menu" : "Open system navigation"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5">
                <span
                  className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                  }`}
                />
                <span
                  className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE SYSTEM NAVIGATION DRAWER ──────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#030303]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile System Navigation"
          >
            {/* Top Bar of Mobile Drawer */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)]" />
                <span className="font-mono text-sm font-bold text-white tracking-widest uppercase">
                  SHAKIR.AHMED // SYS_NAV
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs text-[var(--color-muted)] hover:text-white px-3 py-1.5 rounded-lg bg-[#0A0A0E] border border-[rgba(255,255,255,0.1)] transition-colors"
                aria-label="Close menu"
              >
                [ ESC / ✕ ]
              </button>
            </div>

            {/* Center: Vertical Connected Rail of Stages */}
            <div className="py-8 my-auto relative">
              <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest block mb-6 font-semibold">
                // SYSTEM NAVIGATION
              </span>

              {/* Vertical Continuous Rail Line */}
              <div
                className="absolute left-[19px] top-[72px] bottom-[28px] w-px bg-gradient-to-b from-[var(--color-primary)] via-[rgba(255,255,255,0.15)] to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="space-y-6 relative z-10">
                {systemSections.map((sec, idx) => {
                  const isActive = activeStage === sec.stage;

                  return (
                    <button
                      key={sec.stage}
                      onClick={() => handleStageClick(sec.sectionId)}
                      className="w-full flex items-center gap-4 text-left group cursor-pointer focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] outline-none rounded-lg p-1.5 transition-all"
                    >
                      {/* Node Indicator */}
                      <div className="relative flex items-center justify-center w-5 h-5 shrink-0 bg-[#030303] rounded-full">
                        {isActive ? (
                          <div className="relative flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_12px_#3B82F6]" />
                            {!reducedMotion && (
                              <span className="absolute w-5 h-5 rounded-full bg-[var(--color-primary)]/30 animate-ping pointer-events-none" />
                            )}
                          </div>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.25)] group-hover:bg-white transition-colors" />
                        )}
                      </div>

                      {/* Station Index & Label */}
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`font-mono text-xs ${
                            isActive ? "text-[#60A5FA] font-bold" : "text-[var(--color-muted-dim)]"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className={`font-mono text-base tracking-wider transition-colors ${
                            isActive
                              ? "text-white font-bold"
                              : "text-[var(--color-muted)] group-hover:text-white"
                          }`}
                        >
                          {sec.stage}
                        </span>
                        <span className="text-[0.625rem] font-mono text-[var(--color-muted-dim)] hidden sm:inline">
                          — {sec.sublabel}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom: Fast External Handshake Actions */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row gap-3">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0A0A0E] border border-[rgba(255,255,255,0.1)] font-mono text-xs text-white hover:border-[var(--color-primary)] transition-colors"
              >
                <span>GITHUB ↗</span>
              </a>

              <a
                href={getAssetPath(social.cvDownloadUrl)}
                download="MD.Shakir-Ahmed.pdf"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-primary)] text-white font-mono text-xs font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
              >
                <span>DOWNLOAD CV ↓</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
