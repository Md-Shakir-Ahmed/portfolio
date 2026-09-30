"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemSections, identity, social, type SystemStage } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";

interface SpatialNavigationProps {
  activeStage: SystemStage;
  onNavigate: (sectionId: string) => void;
  scrollProgress: number;
}

export default function SpatialNavigation({
  activeStage,
  onNavigate,
  scrollProgress,
}: SpatialNavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 py-4 sm:py-5 pointer-events-none">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand System Logo */}
        <div
          onClick={() => onNavigate("hero")}
          className="pointer-events-auto flex items-center gap-2.5 cursor-pointer group px-3 py-1.5 rounded-full bg-[#0A0A0E]/80 backdrop-blur-md border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300"
        >
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)]" />
          <span
            className="font-mono text-xs text-white tracking-widest uppercase font-semibold"
            style={{ fontSize: "0.6875rem" }}
          >
            {identity.systemName}
            <span className="hidden sm:inline text-[var(--color-muted)] font-normal ml-1">
              // ARCHITECTURE
            </span>
          </span>
        </div>

        {/* Center: System Stage Stations Track (Desktop) */}
        <nav
          className="hidden md:flex pointer-events-auto items-center px-4 py-1.5 rounded-full bg-[#0A0A0E]/80 backdrop-blur-md border border-[var(--color-border)] shadow-2xl relative"
          aria-label="System Stations"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            {systemSections.map((sec, idx) => {
              const isActive = activeStage === sec.stage;
              return (
                <button
                  key={sec.stage}
                  onClick={() => onNavigate(sec.sectionId)}
                  className={`relative px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "text-white font-medium"
                      : "text-[var(--color-muted)] hover:text-white"
                  }`}
                  style={{ fontSize: "0.6875rem", letterSpacing: "0.08em" }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)] scale-125"
                        : "bg-[var(--color-muted-dim)]"
                    }`}
                  />
                  <span>{sec.stage}</span>

                  {isActive && (
                    <motion.div
                      layoutId="active-stage-pill"
                      className="absolute inset-0 rounded-full bg-[var(--color-primary-subtle)] border border-[rgba(59,130,246,0.3)] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right: Handshake Actions */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-[#0A0A0E]/80 backdrop-blur-md border border-[var(--color-border)] hover:border-[var(--color-primary)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-white transition-all duration-300"
            style={{ fontSize: "0.6875rem" }}
          >
            GITHUB ↗
          </a>

          <a
            href={getAssetPath(social.cvDownloadUrl)}
            download="MD.Shakir-Ahmed.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-mono font-medium hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300"
            style={{ fontSize: "0.6875rem", letterSpacing: "0.05em" }}
          >
            <span>[ GET CV ]</span>
          </a>
        </div>
      </div>
    </header>
  );
}
