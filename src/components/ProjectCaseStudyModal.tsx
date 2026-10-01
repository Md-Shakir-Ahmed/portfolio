"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/portfolio";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({
  project,
  onClose,
}: ProjectCaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  // When a project is opened, record to localStorage for the "Remembers You" feature!
  useEffect(() => {
    if (project) {
      try {
        localStorage.setItem("shuv0_last_viewed_project", project.shortName);
        localStorage.setItem("shuv0_last_viewed_time", Date.now().toString());
      } catch (err) {
        // Graceful fallback for blocked storage
        console.warn("Storage restricted or unavailable", err);
      }
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window / System Packet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-xl border border-[var(--color-border-active)] bg-[var(--color-surface-modal)] shadow-[0_10px_50px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-4 mb-6 border-b border-[var(--color-border)] gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    letterSpacing: "0.12em",
                    color: "var(--color-primary)",
                  }}
                >
                  SYSTEM_RECORD // {project.id.toUpperCase()}
                </span>

                {project.confidential && (
                  <span className="px-2 py-0.5 rounded text-[0.625rem] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {project.categoryLabel}
                  </span>
                )}

                {!project.confidential && (
                  <span className="px-2 py-0.5 rounded text-[0.625rem] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {project.categoryLabel}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-5">
                {project.logo && (
                  <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-lg bg-[rgba(255,255,255,0.02)] p-1">
                    <img 
                      src={project.logo} 
                      alt={`${project.shortName} Logo`} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                <h3
                  id="modal-title"
                  className="text-2xl sm:text-3xl text-[var(--color-text)] font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.name}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] text-xs text-[var(--color-text-secondary)] transition-all cursor-pointer"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label="Close record"
            >
              [ ESC / CLOSE ]
            </button>
          </div>

          {/* Overview summary */}
          <p className="text-[var(--color-text)] text-base mb-8 leading-relaxed">
            {project.summary}
          </p>

          {/* Case Study Sections */}
          <div className="space-y-6 text-sm">
            {/* Role */}
            <div className="p-4 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span
                className="block text-[var(--color-muted)] mb-1 font-mono text-xs uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                01 // Role & Responsibility
              </span>
              <p className="text-[var(--color-text-secondary)] font-medium">
                {project.role}
              </p>
            </div>

            {/* Problem */}
            <div className="p-4 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span
                className="block text-[var(--color-muted)] mb-1 font-mono text-xs uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                02 // The Problem
              </span>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Architecture */}
            <div className="p-4 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span
                className="block text-[var(--color-muted)] mb-1 font-mono text-xs uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                03 // System Architecture
              </span>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.architecture}
              </p>
            </div>

            {/* Technologies */}
            <div className="p-4 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span
                className="block text-[var(--color-muted)] mb-2 font-mono text-xs uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                04 // Core Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-xs text-[var(--color-primary)] font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge & Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
                <span
                  className="block text-[var(--color-muted)] mb-1 font-mono text-xs uppercase"
                  style={{ letterSpacing: "0.08em" }}
                >
                  05 // Engineering Challenge
                </span>
                <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-4 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
                <span
                  className="block text-[var(--color-muted)] mb-1 font-mono text-xs uppercase"
                  style={{ letterSpacing: "0.08em" }}
                >
                  06 // Operational Outcome
                </span>
                <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Verification Status Banner (Rule 10 & 56) */}
            <div className="p-4 rounded border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-xs text-amber-400 uppercase tracking-wider">
                  Verification Status // Input Pending
                </span>
              </div>
              <p className="text-xs text-amber-300/80 font-mono">
                {project.todoNotes}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
