"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/portfolio";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import { useScrollReveal, useTextReveal, useStaggerReveal } from "@/lib/animations";

export default function ProjectGraph() {
  const [selectedModalProject, setSelectedModalProject] =
    useState<Project | null>(null);
  const [focusedProjectId, setFocusedProjectId] = useState<string>("btrc-lims");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const chipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const dossierRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);

  useScrollReveal(chipRef, { y: 20 });
  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useScrollReveal(graphRef, { delay: 0.1, y: 40 });
  useStaggerReveal(projectListRef, ".project-item", { stagger: 0.08 });

  // Positions for nodes on the desktop SVG graph canvas (800x420)
  const nodeCoordinates: Record<string, { x: number; y: number }> = {
    "btrc-lims": { x: 180, y: 120 },
    "brcp-wenp": { x: 140, y: 280 },
    ebs: { x: 380, y: 100 },
    queuepro: { x: 340, y: 330 },
    identicore: { x: 500, y: 210 },
    cricgeo: { x: 680, y: 140 },
    "applied-ml-pipeline": { x: 670, y: 310 },
  };

  const categoryColors: Record<string, string> = {
    Government: "#38BDF8",
    Enterprise: "#3B82F6",
    Product: "#34D399",
    Identity: "#A78BFA",
    ML: "#F59E0B",
  };

  const activeProject =
    projects.find((p) => p.id === focusedProjectId) || projects[0];

  const hoveredNode = projects.find((p) => p.id === hoveredNodeId);

  return (
    <div className="w-full">
      {/* Stage subhead */}
      <div ref={chipRef} className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
        <span className="font-mono text-xs text-[var(--color-primary)] font-semibold tracking-wider">
          04 // DATA
        </span>
        <div className="w-12 h-px bg-[rgba(255,255,255,0.12)]" />
        <span className="font-mono text-[0.6875rem] text-[var(--color-muted)] tracking-widest uppercase">
          SYSTEM RECORDS & SPATIAL NODE GRAPH
        </span>
      </div>

      <h2
        ref={headlineRef}
        className="mb-6 text-[var(--color-text)] max-w-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          perspective: "600px",
        }}
      >
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>Verified</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>system</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>records</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>&</span>{" "}
        <span className="word inline-block text-gradient" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>node&nbsp;architecture.</span>
      </h2>

      <p className="text-[var(--color-text-secondary)] mb-16 max-w-3xl text-base sm:text-lg leading-relaxed">
        Projects in this system exist as data nodes within an interconnected
        graph. Connections indicate shared architecture patterns, identity
        tokens, or business integrations. Select any node or project to unpack
        its architectural dossier.
      </p>

      {/* ─── Desktop Interactive Node Graph Canvas ─── */}
      <div
        ref={graphRef}
        className="hidden md:block mb-16 p-6 sm:p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(255,255,255,0.06)]">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-wider">
            INTERACTIVE GRAPH // HOVER TO TRACE CONNECTIONS · CLICK TO INSPECT
          </span>

          <span className="font-mono text-xs text-[var(--color-primary)]">
            {hoveredNode
              ? `FOCUSED: ${hoveredNode.shortName}`
              : `ACTIVE: ${activeProject.shortName}`}
          </span>
        </div>

        <div className="relative w-full aspect-[16/8] max-h-[420px] bg-[var(--color-bg)] rounded-2xl border border-[rgba(255,255,255,0.04)]">
          <svg viewBox="0 0 800 420" className="w-full h-full select-none">
            <defs>
              <pattern
                id="graph-grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                  fill="rgba(255,255,255,0.04)"
                />
              </pattern>
              {/* Glow filters for different categories */}
              <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#graph-grid)" />

            {/* Connection Lines between nodes */}
            {projects.map((sourceProject) => {
              const sourceCoord = nodeCoordinates[sourceProject.id];
              if (!sourceCoord) return null;

              return sourceProject.connectionIds.map((targetId) => {
                const targetCoord = nodeCoordinates[targetId];
                if (!targetCoord) return null;

                const isConnected =
                  focusedProjectId === sourceProject.id ||
                  focusedProjectId === targetId ||
                  hoveredNodeId === sourceProject.id ||
                  hoveredNodeId === targetId;

                return (
                  <line
                    key={`${sourceProject.id}-${targetId}`}
                    x1={sourceCoord.x}
                    y1={sourceCoord.y}
                    x2={targetCoord.x}
                    y2={targetCoord.y}
                    stroke={
                      isConnected
                        ? categoryColors[sourceProject.category] || "#3B82F6"
                        : "rgba(255, 255, 255, 0.06)"
                    }
                    strokeWidth={isConnected ? "2" : "1"}
                    strokeDasharray={isConnected ? "6 3" : "2 3"}
                    filter={isConnected ? "url(#glow-blue)" : undefined}
                    className="transition-all duration-500"
                  />
                );
              });
            })}

            {/* Project Nodes */}
            {projects.map((project) => {
              const coord = nodeCoordinates[project.id];
              if (!coord) return null;

              const isSelected = focusedProjectId === project.id;
              const isHovered = hoveredNodeId === project.id;
              const color = categoryColors[project.category] || "#3B82F6";

              return (
                <g
                  key={project.id}
                  transform={`translate(${coord.x}, ${coord.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNodeId(project.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setFocusedProjectId(project.id)}
                >
                  {/* Outer pulse aura */}
                  {(isSelected || isHovered) && (
                    <>
                      <circle
                        r="36"
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        strokeOpacity="0.3"
                        className="animate-ping"
                      />
                      <circle
                        r="28"
                        fill={`${color}08`}
                        filter="url(#glow-strong)"
                      />
                    </>
                  )}

                  {/* Node Circle */}
                  <circle
                    r={isSelected ? "24" : "18"}
                    fill={isSelected ? `${color}30` : "#0A0A10"}
                    stroke={color}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    strokeOpacity={isSelected || isHovered ? 1 : 0.4}
                    className="transition-all duration-300"
                  />

                  {/* Center Dot */}
                  <circle r="4" fill={color} />

                  {/* Label */}
                  <text
                    y={isSelected ? "38" : "32"}
                    fill={isSelected ? "#FFFFFF" : "#888888"}
                    fontSize={isSelected ? "11" : "10"}
                    fontFamily="var(--font-mono)"
                    fontWeight={isSelected ? "600" : "400"}
                    textAnchor="middle"
                    className="transition-all duration-200"
                  >
                    {project.shortName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ─── Editorial Architectural Dossier ─── */}
      <div className="pt-8 border-t border-[rgba(255,255,255,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Project Index Rail */}
          <div ref={projectListRef} className="lg:col-span-5 flex flex-col space-y-2">
            <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest mb-4 block">
              // Project Directory
            </span>

            {projects.map((p, index) => {
              const isSelected = p.id === focusedProjectId;
              const color = categoryColors[p.category] || "#3B82F6";
              return (
                <button
                  key={p.id}
                  onClick={() => setFocusedProjectId(p.id)}
                  data-magnetic
                  className={`project-item flex items-center justify-between p-3.5 rounded-xl text-left cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "text-[var(--color-text)] border"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: `${color}12`,
                          borderColor: `${color}40`,
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--color-muted-dim)]">
                      0{index + 1}
                    </span>
                    <span className="font-medium text-sm">{p.name}</span>
                  </div>

                  <span
                    className="font-mono text-[0.625rem] px-2 py-0.5 rounded uppercase"
                    style={{
                      color,
                      backgroundColor: `${color}15`,
                    }}
                  >
                    {p.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Dossier */}
          <div ref={dossierRef} className="lg:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{
                        color:
                          categoryColors[activeProject.category] || "#3B82F6",
                      }}
                    >
                      {activeProject.categoryLabel}
                    </span>
                    <span className="text-[var(--color-muted-dim)]">·</span>
                    <span className="font-mono text-xs text-[var(--color-muted)]">
                      {activeProject.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 mb-4">
                    {activeProject.logo && (
                      <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-lg bg-[rgba(255,255,255,0.02)] p-1">
                        <img 
                          src={activeProject.logo} 
                          alt={`${activeProject.shortName} Logo`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h3
                      className="text-2xl sm:text-3xl text-[var(--color-text)] font-bold tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {activeProject.name}
                    </h3>
                  </div>

                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {activeProject.summary}
                  </p>
                </div>

                {/* Problem vs Architecture Solution */}
                <div className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <span className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-1">
                      // The Architectural Challenge
                    </span>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>

                  <div>
                    <span
                      className="font-mono text-xs uppercase tracking-wider block mb-1"
                      style={{
                        color:
                          categoryColors[activeProject.category] || "#3B82F6",
                      }}
                    >
                      // Implemented Solution
                    </span>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {activeProject.architecture}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tokens */}
                <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="font-mono text-[0.6875rem] text-[var(--color-muted)] uppercase tracking-wider block mb-2">
                    Engineered With:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[0.6875rem] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Unpack Full Case Study Modal Button */}
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedModalProject(activeProject)}
                    data-magnetic
                    data-cursor-label="VIEW"
                    className="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors cursor-pointer group"
                  >
                    <span>
                      [ UNPACK FULL CASE STUDY SPECIFICATIONS ]
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  );
}

