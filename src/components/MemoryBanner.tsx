"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

/**
 * MemoryBanner — "The System That Remembers You"
 *
 * Reads localStorage to detect returning visitors.
 * Shows a small, tasteful banner — not a modal or popup.
 * Gracefully degrades if localStorage is unavailable.
 */

interface MemoryData {
  lastViewedProject: string | null;
  visitCount: number;
  lastVisit: string | null;
}

function readMemory(): MemoryData {
  try {
    const raw = localStorage.getItem("shuv0_memory");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // localStorage unavailable or corrupt — graceful degradation
  }
  return { lastViewedProject: null, visitCount: 0, lastVisit: null };
}

export function writeMemory(projectId: string) {
  try {
    const current = readMemory();
    localStorage.setItem(
      "shuv0_memory",
      JSON.stringify({
        lastViewedProject: projectId,
        visitCount: current.visitCount + 1,
        lastVisit: new Date().toISOString(),
      })
    );
  } catch {
    // Silent fail — memory is optional
  }
}

export function incrementVisit() {
  try {
    const current = readMemory();
    localStorage.setItem(
      "shuv0_memory",
      JSON.stringify({
        ...current,
        visitCount: current.visitCount + 1,
        lastVisit: new Date().toISOString(),
      })
    );
  } catch {
    // Silent fail
  }
}

export default function MemoryBanner() {
  const [memory, setMemory] = useState<MemoryData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const data = readMemory();
    if (data.lastViewedProject && data.visitCount > 0) {
      setMemory(data);
    }
    incrementVisit();
  }, []);

  const projectName = memory?.lastViewedProject
    ? projects.find((p) => p.id === memory.lastViewedProject)?.shortName ??
      memory.lastViewedProject
    : null;

  if (!memory || !projectName || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 1.5 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass rounded-lg px-5 py-3 flex items-center gap-4 max-w-md"
        role="status"
        aria-live="polite"
      >
        {/* Pulse dot */}
        <div
          className="w-2 h-2 rounded-full bg-[var(--color-primary)] flex-shrink-0"
          style={{
            boxShadow: "0 0 8px var(--color-primary-glow)",
          }}
        />

        <div className="flex flex-col gap-0.5">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.12em",
              color: "var(--color-muted)",
              textTransform: "uppercase",
            }}
          >
            WELCOME BACK
          </span>
          <span
            className="text-[var(--color-text-secondary)]"
            style={{ fontSize: "0.8125rem" }}
          >
            You were exploring{" "}
            <span className="text-[var(--color-text)] font-medium">
              {projectName}
            </span>
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-200 bg-transparent border-none cursor-pointer ml-2 text-lg leading-none"
          aria-label="Dismiss welcome message"
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
