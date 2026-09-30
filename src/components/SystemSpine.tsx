"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemSections, identity, type SystemStage } from "@/data/portfolio";

interface SystemSpineProps {
  activeStage: SystemStage;
  onNavigate: (sectionId: string) => void;
  scrollProgress: number;
}

/**
 * SystemSpine — The continuous vertical network bus rail.
 * Desktop: Left-fixed circuit trace rail with station nodes.
 * Mobile: Ultra-slim top status telemetry bar.
 * Prevents any content clipping by establishing a fixed 64px spatial rail.
 */
export default function SystemSpine({
  activeStage,
  onNavigate,
  scrollProgress,
}: SystemSpineProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <>
      {/* ─── Desktop Vertical System Spine (Left Rail) ─── */}
      <nav
        className="fixed left-0 top-0 bottom-0 w-16 xl:w-20 z-40 hidden lg:flex flex-col items-center justify-between py-8 select-none pointer-events-auto"
        aria-label="System Pipeline Spine"
      >
        {/* Top telemetry icon */}
        <div className="flex flex-col items-center gap-1.5">
          <span
            className="text-[0.5625rem] font-mono tracking-widest text-[var(--color-muted-dim)] uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            SYS://BUS
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)]" />
        </div>

        {/* Central Stations Track */}
        <div className="relative flex flex-col items-center justify-center h-[55vh]">
          {/* Background rail trace line */}
          <div className="absolute top-0 bottom-0 w-px bg-[var(--color-border)]" />

          {/* Active progressive laser fill */}
          <motion.div
            className="absolute top-0 w-px bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] origin-top shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            style={{
              height: "100%",
              scaleY: Math.max(0.05, scrollProgress),
            }}
          />

          {/* Station Nodes */}
          <div className="relative z-10 flex flex-col justify-between h-full py-2">
            {systemSections.map((sec, index) => {
              const isActive = activeStage === sec.stage;
              const isPassed = index <= systemSections.findIndex((s) => s.stage === activeStage);

              return (
                <div
                  key={sec.stage}
                  className="relative flex items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredStage(sec.stage)}
                  onMouseLeave={() => setHoveredStage(null)}
                  onClick={() => onNavigate(sec.sectionId)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Jump to stage ${sec.stage}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onNavigate(sec.sectionId);
                    }
                  }}
                >
                  {/* Station Node Marker */}
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "bg-[#030303] border-2 border-[var(--color-primary)] shadow-[0_0_12px_var(--color-primary-glow)] scale-125"
                        : isPassed
                        ? "bg-[var(--color-primary)] border border-transparent shadow-[0_0_6px_rgba(59,130,246,0.4)]"
                        : "bg-[#0A0A0A] border border-[var(--color-border)] group-hover:border-[var(--color-muted)]"
                    }`}
                  >
                    {isActive && (
                      <div className="w-1 h-1 rounded-full bg-[var(--color-primary)] animate-pulse" />
                    )}
                  </div>

                  {/* Station Monospaced Flyout Label */}
                  <div
                    className={`absolute left-7 px-2.5 py-1 rounded bg-[#0A0A0D] border border-[var(--color-border)] shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none ${
                      isActive || hoveredStage === sec.stage
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[0.625rem] font-mono text-[var(--color-primary)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.6875rem] font-mono tracking-wider text-white">
                        {sec.stage}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Counter */}
        <div className="flex flex-col items-center gap-1 text-[var(--color-muted-dim)]">
          <span className="text-[0.625rem] font-mono">
            {Math.round(scrollProgress * 100)}%
          </span>
          <span
            className="text-[0.5625rem] font-mono uppercase tracking-widest"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            SIGNAL
          </span>
        </div>
      </nav>

      {/* ─── Mobile Slim Telemetry Header (< 1024px) ───── */}
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-[#030303]/90 backdrop-blur-md border-b border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)]" />
          <span className="font-mono text-xs text-white tracking-wider">
            SHUV0://{activeStage}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {systemSections.map((sec) => (
            <button
              key={sec.stage}
              onClick={() => onNavigate(sec.sectionId)}
              className={`px-1.5 py-0.5 rounded text-[0.625rem] font-mono transition-all ${
                activeStage === sec.stage
                  ? "bg-[var(--color-primary)] text-white font-semibold"
                  : "text-[var(--color-muted)] hover:text-white"
              }`}
            >
              {sec.stage.slice(0, 3)}
            </button>
          ))}
        </div>
      </header>
    </>
  );
}
