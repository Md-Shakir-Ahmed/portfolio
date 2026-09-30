"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  techStack,
  pipelineSteps,
  type PipelineStep,
} from "@/data/portfolio";
import { useScrollReveal, useStaggerReveal, useTextReveal } from "@/lib/animations";

// ─── 3D Tilt Card Component ────────────────────────────
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function StackSection() {
  const [activeStep, setActiveStep] = useState<PipelineStep>(pipelineSteps[0]);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useScrollReveal(chipRef, { y: 20 });
  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useScrollReveal(pipelineRef, { delay: 0.1, y: 50 });
  useStaggerReveal(matrixRef, ".domain-row", { stagger: 0.1 });

  // Group verified technologies into architectural layers
  const domains = [
    {
      code: "01",
      name: "CORE BACKEND ENGINE",
      items: techStack.filter((t) => t.category === "Backend Core"),
      color: "#3B82F6",
    },
    {
      code: "02",
      name: "DATA & PERSISTENCE",
      items: techStack.filter((t) => t.category === "Databases & Cache"),
      color: "#06B6D4",
    },
    {
      code: "03",
      name: "IDENTITY & ZERO-TRUST",
      items: techStack.filter((t) => t.category === "Identity & Security"),
      color: "#A78BFA",
    },
    {
      code: "04",
      name: "DISTRIBUTED ARCHITECTURE & DEVOPS",
      items: techStack.filter(
        (t) =>
          t.category === "Architecture & Distributed" ||
          t.category === "Infrastructure & DevOps"
      ),
      color: "#34D399",
    },
    {
      code: "05",
      name: "APPLIED ML & DATA PIPELINES",
      items: techStack.filter((t) => t.category === "Applied ML & Data"),
      color: "#F59E0B",
    },
  ];

  const currentHoveredItem = techStack.find((t) => t.name === hoveredTech);

  return (
    <div className="w-full">
      {/* Stage Subhead */}
      <div ref={chipRef} className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
        <span className="font-mono text-xs text-[var(--color-primary)] font-semibold tracking-wider">
          03 // IDENTITY
        </span>
        <div className="w-12 h-px bg-[rgba(255,255,255,0.12)]" />
        <span className="font-mono text-[0.6875rem] text-[var(--color-muted)] tracking-widest uppercase">
          ACCESS TOPOLOGY & TECHNICAL ECOSYSTEM
        </span>
      </div>

      <h2
        ref={headlineRef}
        className="mb-6 text-white max-w-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          perspective: "600px",
        }}
      >
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>Verified</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>technical</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>stack</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>&</span>{" "}
        <span className="word inline-block text-gradient" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>engineering&nbsp;pipeline.</span>
      </h2>

      <p className="text-[var(--color-text-secondary)] mb-16 max-w-3xl text-base sm:text-lg leading-relaxed">
        My technical toolset is deliberately focused on high-reliability backend
        systems, relational databases, centralized authentication topologies, and
        distributed architectures. Every tool listed below is verified against
        active production usage.
      </p>

      {/* ─── Part 1: How I Build (3D Tilting Pipeline Cards) ─── */}
      <div ref={pipelineRef} className="mb-28 pt-8 border-t border-[rgba(255,255,255,0.08)]" style={{ opacity: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[rgba(255,255,255,0.06)] gap-2">
          <div>
            <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest block mb-1">
              // Engineering Pipeline — How I Build
            </span>
            <p className="text-xs text-[var(--color-muted)]">
              Deterministic workflow from problem discovery to zero-downtime
              release.
            </p>
          </div>
          <span className="font-mono text-[0.6875rem] text-[var(--color-muted-dim)]">
            PHASE {activeStep.number} / 05
          </span>
        </div>

        {/* Pipeline Step Stations with 3D Tilt */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {pipelineSteps.map((step) => {
            const isActive = step.id === activeStep.id;
            return (
              <TiltCard key={step.id} className="w-full">
                <button
                  onClick={() => setActiveStep(step)}
                  data-magnetic
                  className={`w-full flex flex-col items-start p-4 text-left cursor-pointer transition-all duration-300 border-b-2 rounded-xl ${
                    isActive
                      ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.08)] shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                      : "border-transparent hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.02)]"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.6875rem] ${
                      isActive
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-muted-dim)]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider mt-1 ${
                      isActive
                        ? "text-white"
                        : "text-[var(--color-muted)]"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              </TiltCard>
            );
          })}
        </div>

        {/* Active Phase Specification */}
        <TiltCard className="w-full">
          <div className="py-6 px-4 sm:px-8 bg-[#050508] border border-[rgba(255,255,255,0.06)] rounded-2xl hover:border-[rgba(59,130,246,0.15)] transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <h3
                className="text-xl sm:text-2xl text-white font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {activeStep.title} — {activeStep.summary}
              </h3>
            </div>

            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base mb-6 leading-relaxed max-w-3xl">
              {activeStep.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
              <span className="font-mono text-[0.6875rem] text-[var(--color-muted)] uppercase tracking-wider mr-2">
                Deliverables:
              </span>
              {activeStep.deliverables.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded bg-[#0A0A0E] border border-[rgba(255,255,255,0.08)] font-mono text-[0.6875rem] text-white hover:border-[var(--color-primary)] transition-colors"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>

      {/* ─── Part 2: Technical Ecosystem Matrix ─── */}
      <div ref={matrixRef} className="pt-8 border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-12 border-b border-[rgba(255,255,255,0.06)] gap-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              // Technical Ecosystem Matrix
            </h3>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              Hover any technology to view architectural role and production
              verification.
            </p>
          </div>
          <span className="font-mono text-[0.6875rem] text-[var(--color-muted-dim)]">
            23 VERIFIED PRODUCTION TECHNOLOGIES
          </span>
        </div>

        {/* Live Detail Telemetry Strip */}
        <div className="min-h-[50px] mb-8 py-3 px-4 rounded-xl bg-[#08080C] border border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-mono transition-all duration-300">
          {currentHoveredItem ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-sm">
                  {currentHoveredItem.name}
                </span>
                <span className="text-[var(--color-muted)]">|</span>
                <span className="text-[var(--color-text-secondary)]">
                  {currentHoveredItem.description}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[var(--color-primary)]">
                  LEVEL: {currentHoveredItem.level.toUpperCase()}
                </span>
                <span className="text-emerald-400">● VERIFIED</span>
              </div>
            </div>
          ) : (
            <span className="text-[var(--color-muted-dim)] tracking-wider">
              HOVER A TECHNOLOGY TO INSPECT ARCHITECTURAL APPLICATION
            </span>
          )}
        </div>

        {/* Architectural Layers List */}
        <div className="space-y-12">
          {domains.map((domain) => (
            <div
              key={domain.name}
              className="domain-row grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline py-4 border-b border-[rgba(255,255,255,0.05)]"
              style={{ opacity: 0 }}
            >
              {/* Domain Name */}
              <div className="lg:col-span-4 flex items-center gap-3">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: domain.color }}
                >
                  {domain.code}
                </span>
                <span className="font-mono text-xs tracking-wider text-white font-medium uppercase">
                  {domain.name}
                </span>
              </div>

              {/* Technologies List with Glow on Hover */}
              <div className="lg:col-span-8 flex flex-wrap gap-2.5">
                {domain.items.map((tech) => {
                  const isHovered = hoveredTech === tech.name;
                  return (
                    <button
                      key={tech.name}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      data-magnetic
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                        isHovered
                          ? "text-white scale-110"
                          : "bg-[#0A0A0E] text-[var(--color-text-secondary)] border border-[rgba(255,255,255,0.08)] hover:border-[var(--color-primary)] hover:text-white"
                      }`}
                      style={
                        isHovered
                          ? {
                              backgroundColor: domain.color,
                              boxShadow: `0 0 20px ${domain.color}60`,
                            }
                          : {}
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isHovered
                            ? "bg-white"
                            : tech.level === "Primary"
                            ? "bg-[var(--color-primary)]"
                            : tech.level === "Advanced"
                            ? "bg-purple-400"
                            : "bg-emerald-400"
                        }`}
                      />
                      <span>{tech.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
