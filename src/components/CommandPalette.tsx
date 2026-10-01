"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemSections, social } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";

interface CommandPaletteProps {
  onNavigate: (sectionId: string) => void;
}

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
  category: string;
  icon: string;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    // Navigation
    ...systemSections.map((sec) => ({
      id: `nav-${sec.sectionId}`,
      label: `${sec.label}`,
      shortcut: `0${sec.index + 1}`,
      action: () => {
        onNavigate(sec.sectionId);
        setIsOpen(false);
      },
      category: "Navigation",
      icon: "→",
    })),
    // Actions
    {
      id: "copy-email",
      label: "Copy Email Address",
      action: () => {
        navigator.clipboard.writeText(social.email);
        setIsOpen(false);
      },
      category: "Actions",
      icon: "✉",
    },
    {
      id: "download-cv",
      label: "Download CV (PDF)",
      action: () => {
        const a = document.createElement("a");
        a.href = getAssetPath(social.cvDownloadUrl);
        a.download = "MD.Shakir-Ahmed.pdf";
        a.click();
        setIsOpen(false);
      },
      category: "Actions",
      icon: "↓",
    },
    {
      id: "open-github",
      label: "Open GitHub Profile",
      action: () => {
        window.open(social.github, "_blank");
        setIsOpen(false);
      },
      category: "External",
      icon: "↗",
    },
    {
      id: "open-linkedin",
      label: "Open LinkedIn Profile",
      action: () => {
        window.open(social.linkedin, "_blank");
        setIsOpen(false);
      },
      category: "External",
      icon: "↗",
    },
  ];

  const filtered = query
    ? commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setActiveIndex(0);
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].action();
      }
    },
    [isOpen, filtered, activeIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="cmd-palette-backdrop"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="cmd-palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            {/* Search Input */}
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-dim)]"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
              >
                ⌘
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="cmd-palette-input"
                style={{ paddingLeft: "2.5rem" }}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-dim)] text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ESC
              </span>
            </div>

            {/* Results */}
            <div className="cmd-palette-results">
              {filtered.length === 0 && (
                <div className="p-6 text-center text-sm text-[var(--color-muted)]">
                  No commands found for &ldquo;{query}&rdquo;
                </div>
              )}

              {/* Group by category */}
              {["Navigation", "Actions", "External"].map((cat) => {
                const items = filtered.filter((cmd) => cmd.category === cat);
                if (items.length === 0) return null;

                return (
                  <div key={cat}>
                    <div
                      className="px-4 pt-3 pb-1 text-[var(--color-muted-dim)] uppercase tracking-widest"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                      }}
                    >
                      {cat}
                    </div>
                    {items.map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          data-active={globalIndex === activeIndex}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          className="cmd-palette-item w-full text-left"
                        >
                          <span className="text-[var(--color-primary)] text-sm shrink-0 w-5 text-center">
                            {cmd.icon}
                          </span>
                          <span>{cmd.label}</span>
                          {cmd.shortcut && (
                            <span className="cmd-palette-item-shortcut">
                              {cmd.shortcut}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer hint */}
            <div
              className="px-4 py-2.5 border-t border-[var(--color-border)] flex items-center justify-between"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--color-muted-dim)",
              }}
            >
              <span>↑↓ navigate · ↵ select · esc close</span>
              <span className="text-[var(--color-primary)]">⌘K</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
