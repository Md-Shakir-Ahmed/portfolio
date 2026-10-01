"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  experience,
  education,
  achievements,
  type Experience,
  type EducationItem,
  type Achievement,
} from "@/data/portfolio";
import { useScrollReveal, useStaggerReveal, useTextReveal, useCountUp } from "@/lib/animations";

export default function ExperienceSection() {
  const [activeExpId, setActiveExpId] = useState<string | null>(
    "varendra-university-se"
  );
  const [activeAchievementIndex, setActiveAchievementIndex] =
    useState<number>(0);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const algoRef = useRef<HTMLDivElement>(null);
  const constRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useStaggerReveal(careerRef, ".career-item", { stagger: 0.15 });
  useStaggerReveal(eduRef, ".edu-item", { stagger: 0.2 });
  useScrollReveal(algoRef, { y: 50 });
  useScrollReveal(constRef, { y: 40 });
  useCountUp(counterRef, 300, 2.5, "+");

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Algorithm footprint platforms
  const platforms = [
    {
      id: "codeforces",
      name: "Codeforces",
      stat: "Max Rating 1370",
      sub: "50+ Online Contests",
      detail:
        "Pre-Rating 909 · Participated in 50+ official rated rounds.",
    },
    {
      id: "uri",
      name: "URI / beecrowd",
      stat: "150+ Solved",
      sub: "C, C++, Python",
      detail:
        "150+ problems in data structures, math & ad-hoc logic.",
    },
    {
      id: "uva",
      name: "UVa Online Judge",
      stat: "70+ Solved",
      sub: "Graph & DP",
      detail:
        "70+ classical algorithmic problems focused on graph theory.",
    },
    {
      id: "lightoj",
      name: "LightOJ",
      stat: "60+ Solved",
      sub: "Combinatorics",
      detail:
        "60+ problem submissions in number theory and dynamic programming.",
    },
  ];

  // Leadership & Awards Constellation nodes
  const constellationNodes = [
    {
      id: "vupc-pres",
      label: "CLUB LEADERSHIP",
      title: "President, Varendra University Programming Club",
      category: "Leadership",
      year: "2022 — 2023",
      detail:
        "Organized competitive programming training camps, intra-university workshops, and contest coaching for junior student engineers.",
      x: 180,
      y: 80,
    },
    {
      id: "icpc-regional",
      label: "ICPC REGIONAL",
      title: "ICPC Regional Contestant (4+ Onsite Competitions)",
      category: "Competitive Programming",
      year: "2020",
      detail:
        "Represented university in ICPC 2020 and multiple national contest arenas across Bangladesh.",
      x: 80,
      y: 200,
    },
    {
      id: "intra-univ",
      label: "CONTEST CHAMPION",
      title: "Champion, Intra University Programming Contest",
      category: "Contest Champion",
      year: "2021",
      detail:
        "Achieved First Place among all university teams in algorithmic problem solving and time efficiency.",
      x: 340,
      y: 110,
    },
    {
      id: "it-quiz",
      label: "IT & TECH FEST",
      title: "Champion, IT QUIZ 2022 & Project Showcase",
      category: "Honors",
      year: "2020, 2022",
      detail:
        "Won first place in IT Quiz 2022 and Virtual Tech Fest Project Showcase 2020.",
      x: 270,
      y: 240,
    },
    {
      id: "debate-robo",
      label: "DEBATE & ROBOTICS",
      title: "Runner-up Tech Debate 2022 & Robo Soccer Champion",
      category: "Co-curricular",
      year: "2020, 2022",
      detail:
        "Runner-up in Tech Debate 2022 and Champion in Intra Department Robo Soccer 2020 at Varendra University.",
      x: 160,
      y: 320,
    },
  ];

  const activeAchievement =
    constellationNodes[activeAchievementIndex] || constellationNodes[0];

  return (
    <div className="w-full text-[var(--color-text)] flex flex-col gap-24 sm:gap-32">
      {/* ─── SECTION HEADER ─── */}
      <div>
        <span
          className="font-mono text-xs text-[var(--color-primary)] tracking-widest uppercase block mb-3"
          style={{ letterSpacing: "0.15em" }}
        >
          // TRAJECTORY & ALGORITHMIC FOUNDATION
        </span>
        <h2
          ref={headlineRef}
          className="text-[var(--color-text)] font-extrabold tracking-tight max-w-3xl"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            perspective: "600px",
          }}
        >
          <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>Career</span>{" "}
          <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>path,</span>{" "}
          <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>academics</span>{" "}
          <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>&</span>{" "}
          <span className="word inline-block text-gradient" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>algorithmic&nbsp;footprint.</span>
        </h2>
      </div>

      {/* â•â•â• PART 1: EXPERIENCE — VISUAL TIMELINE â•â•â• */}
      <div className="w-full">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            01 / CAREER PATH
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        {/* Vertical Career Path with Traveling Signal Spine */}
        <div ref={careerRef} className="relative pl-8 sm:pl-16 md:pl-24">
          {/* Continuous Vertical Signal Rail */}
          <div className="absolute left-2 sm:left-4 md:left-6 top-4 bottom-4 w-px bg-gradient-to-b from-[var(--color-primary)] via-[rgba(255,255,255,0.1)] to-transparent">
            {/* Animated traveling signal pulse */}
            {!reducedMotion && (
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-16 -left-[2px] absolute bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent"
                style={{ filter: "blur(1px)" }}
              />
            )}
          </div>

          <div className="space-y-20 sm:space-y-28">
            {experience.map((exp, idx) => {
              const isExpanded = activeExpId === exp.id;

              return (
                <div key={exp.id} className="career-item relative group" style={{ opacity: 0 }}>
                  {/* Station Node on Career Path */}
                  <div
                    onClick={() =>
                      setActiveExpId(isExpanded ? null : exp.id)
                    }
                    className="absolute -left-[29px] sm:-left-[45px] md:-left-[53px] top-2 cursor-pointer z-10"
                    aria-label={`Toggle details for ${exp.company}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-500 flex items-center justify-center ${exp.current
                          ? "bg-[var(--color-bg)] border-2 border-[var(--color-primary)] shadow-[0_0_16px_var(--color-primary-glow)] scale-110"
                          : "bg-[var(--color-bg)] border border-[rgba(255,255,255,0.3)] group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_8px_var(--color-primary-glow)]"
                        }`}
                    >
                      {exp.current && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Main Company Milestone Presentation */}
                  <div>
                    {/* Date and Location Line */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--color-muted)] mb-2">
                      <span className="text-[var(--color-primary)] font-medium">
                        {exp.dates}
                      </span>
                      <span>·</span>
                      <span>{exp.location}</span>
                      {exp.current && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ACTIVE ROLE
                          </span>
                        </>
                      )}
                    </div>

                    {/* Large Typography: Company Name & Logo */}
                    <div
                      onClick={() => setActiveExpId(isExpanded ? null : exp.id)}
                      className="flex items-center gap-4 cursor-pointer group mb-2"
                    >
                      {exp.logo && (
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-[0_4px_24px_rgba(0,0,0,0.5)] group-hover:shadow-[0_4px_32px_var(--color-primary-glow)] transition-all duration-300">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} Logo`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3
                        className="text-3xl sm:text-4xl text-[var(--color-text)] font-bold group-hover:text-[var(--color-primary)] transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-display)",
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {exp.company}
                      </h3>
                    </div>

                    {/* Role / Designation */}
                    <p className="font-mono text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 mb-4">
                      {exp.title}
                    </p>

                    {/* High-level Summary Statement */}
                    <p className="text-[var(--color-muted)] text-base sm:text-lg max-w-3xl leading-relaxed mb-4">
                      {exp.summary}
                    </p>

                    {/* Interactive Reveal Toggle */}
                    <button
                      onClick={() =>
                        setActiveExpId(isExpanded ? null : exp.id)
                      }
                      data-magnetic
                      className="font-mono text-xs text-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors cursor-pointer inline-flex items-center gap-2 mb-4 group/btn"
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                      }}
                    >
                      <span>
                        {isExpanded
                          ? "[ HIDE RESPONSIBILITIES ]"
                          : "[ VIEW VERIFIED SCOPE & WORK ]"}
                      </span>
                      <span className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1">
                        {isExpanded ? "▲" : "→"}
                      </span>
                    </button>

                    {/* Responsibilities list (Smooth accordion reveal) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1] as const,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-6 space-y-5 max-w-3xl border-l-2 border-[rgba(59,130,246,0.3)] pl-6 my-2">
                            {exp.responsibilities.map((resp, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                className="flex items-start gap-4 text-sm sm:text-base text-[var(--color-text-secondary)] leading-loose"
                              >
                                <span className="text-[var(--color-primary)] font-mono text-xs mt-1.5 shrink-0 opacity-80 bg-[var(--color-primary)]/10 px-1.5 py-0.5 rounded">
                                  0{i + 1}
                                </span>
                                <span>{resp}</span>
                              </motion.div>
                            ))}

                            {/* Tech Stack tags */}
                            <div className="flex flex-wrap gap-2.5 pt-6 mt-2 border-t border-[rgba(255,255,255,0.05)]">
                              {exp.technologies.map((t) => (
                                <span
                                  key={t}
                                  className="font-mono text-xs text-[var(--color-muted)] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] px-2.5 py-1 rounded-md"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* â•â•â• PART 2: EDUCATION — EDITORIAL LAYOUT â•â•â• */}
      <div className="w-full">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            02 / ACADEMIC MILESTONES
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        <div ref={eduRef} className="space-y-16 sm:space-y-20">
          {education.map((edu, idx) => (
            <div key={edu.id} className="edu-item relative group" style={{ opacity: 0 }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
                {/* Large Milestone Number */}
                <div className="lg:col-span-2">
                  <span className="font-mono text-3xl sm:text-4xl lg:text-5xl text-[rgba(255,255,255,0.1)] font-bold group-hover:text-[var(--color-primary)] transition-colors duration-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Degree & Department */}
                <div className="lg:col-span-6">
                  <h3
                    className="text-[var(--color-text)] font-bold mb-2 tracking-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                      lineHeight: 1.15,
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-[var(--color-primary)] uppercase tracking-wider mb-4">
                    {edu.department}
                  </p>
                  <div className="space-y-1 text-sm text-[var(--color-muted)] leading-relaxed">
                    {edu.highlights.map((h, i) => (
                      <p key={i}>— {h}</p>
                    ))}
                  </div>
                </div>

                {/* Institution & Timeframe */}
                <div className="lg:col-span-4 flex flex-col lg:items-end text-left lg:text-right">
                  <span
                    className="text-base sm:text-lg text-[var(--color-text-secondary)] font-medium mb-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {edu.institution}
                  </span>
                  <span
                    className="font-mono text-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 border"
                    style={{
                      backgroundColor:
                        edu.status === "Completed"
                          ? "rgba(16, 185, 129, 0.08)"
                          : "rgba(59, 130, 246, 0.08)",
                      borderColor:
                        edu.status === "Completed"
                          ? "rgba(16, 185, 129, 0.25)"
                          : "rgba(59, 130, 246, 0.25)",
                      color:
                        edu.status === "Completed" ? "#34D399" : "#60A5FA",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          edu.status === "Completed" ? "#10B981" : "#3B82F6",
                        boxShadow:
                          edu.status === "Completed"
                            ? "0 0 6px rgba(16, 185, 129, 0.5)"
                            : "0 0 6px rgba(59, 130, 246, 0.5)",
                      }}
                    />
                    {edu.status}
                  </span>
                </div>
              </div>

              {idx < education.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-[rgba(255,255,255,0.1)] via-[rgba(255,255,255,0.05)] to-transparent mt-16 sm:mt-20" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* â•â•â• PART 3: COMPETITIVE PROGRAMMING — ALGORITHMIC FOOTPRINT â•â•â• */}
      <div className="w-full">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            03 / ALGORITHMIC FOOTPRINT
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        <div
          ref={algoRef}
          className="relative py-12 sm:py-20 px-6 sm:px-12 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Subtle Background Radial Aura */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(59,130,246,0.2) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
            {[
              { x2: "20%", y2: "25%", id: "codeforces" },
              { x2: "80%", y2: "28%", id: "uri" },
              { x2: "22%", y2: "78%", id: "uva" },
              { x2: "78%", y2: "75%", id: "lightoj" },
            ].map((line) => (
              <line
                key={line.id}
                x1="50%"
                y1="50%"
                x2={line.x2}
                y2={line.y2}
                stroke={
                  hoveredPlatform === line.id
                    ? "#3B82F6"
                    : "rgba(255,255,255,0.08)"
                }
                strokeWidth={hoveredPlatform === line.id ? "2" : "1"}
                strokeDasharray="4 4"
                className="transition-all duration-500"
              />
            ))}
          </svg>

          {/* Center Hub: 300+ Counter */}
          <div className="relative z-10 text-center my-8 sm:my-12">
            <div
              className="font-extrabold text-[var(--color-text)] tracking-tighter"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(4.5rem, 12vw, 8.5rem)",
                lineHeight: 0.9,
              }}
            >
              <span ref={counterRef}>0</span>
            </div>
            <p
              className="font-mono text-xs sm:text-sm tracking-widest text-[var(--color-muted)] uppercase mt-4"
              style={{ letterSpacing: "0.2em" }}
            >
              ALGORITHMIC PROBLEMS SOLVED
            </p>
            <p className="text-xs text-[var(--color-muted-dim)] max-w-md mx-auto mt-2">
              Competitive programming across international online judges building
              core algorithmic efficiency and deterministic thinking.
            </p>
          </div>

          {/* Platform Nodes */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
            {platforms.map((p) => {
              const isHovered = hoveredPlatform === p.id;
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredPlatform(p.id)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered
                          ? "bg-[var(--color-primary)] shadow-[0_0_12px_var(--color-primary-glow)] scale-150"
                          : "bg-[rgba(255,255,255,0.2)]"
                        }`}
                    />
                    <span className="font-mono text-xs text-[var(--color-text)] font-semibold">
                      {p.name}
                    </span>
                  </div>

                  <span className="font-mono text-sm sm:text-base text-[var(--color-primary)] font-bold">
                    {p.stat}
                  </span>

                  <span className="text-xs text-[var(--color-muted)] mt-1">
                    {p.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* â•â•â• PART 4: LEADERSHIP & ACHIEVEMENTS — CONSTELLATION â•â•â• */}
      <div ref={constRef} className="w-full" style={{ opacity: 0 }}>
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            04 / LEADERSHIP & HONORS CONSTELLATION
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Constellation Visual Graph */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[400px] w-full rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center p-4">
            <svg
              viewBox="0 0 440 380"
              className="w-full h-full select-none"
            >
              <defs>
                <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor="#3B82F6"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor="#3B82F6"
                    stopOpacity="0"
                  />
                </radialGradient>
                <filter id="constellation-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connecting lines */}
              <line x1="180" y1="80" x2="340" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="180" y1="80" x2="80" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="80" y1="200" x2="160" y2="320" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="340" y1="110" x2="270" y2="240" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="270" y1="240" x2="160" y2="320" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="80" y1="200" x2="270" y2="240" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 4" />

              {/* Constellation Nodes */}
              {constellationNodes.map((node, index) => {
                const isActive = activeAchievementIndex === index;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onClick={() => setActiveAchievementIndex(index)}
                    onMouseEnter={() => setActiveAchievementIndex(index)}
                  >
                    {isActive && (
                      <circle
                        r="24"
                        fill="url(#hub-glow)"
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      r={isActive ? "14" : "9"}
                      fill="#0A0A10"
                      stroke={isActive ? "#3B82F6" : "rgba(255,255,255,0.25)"}
                      strokeWidth={isActive ? "2" : "1"}
                      filter={isActive ? "url(#constellation-glow)" : undefined}
                      className="transition-all duration-300"
                    />

                    <circle
                      r={isActive ? "5" : "3"}
                      fill={isActive ? "#60A5FA" : "rgba(255,255,255,0.5)"}
                    />

                    <text
                      y={isActive ? "28" : "22"}
                      textAnchor="middle"
                      fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.35)"}
                      fontSize={isActive ? "10" : "8"}
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.08em"
                      className="transition-all duration-200"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <span className="absolute bottom-3 left-4 font-mono text-[0.625rem] text-[var(--color-muted-dim)]">
              // HOVER OR TAP NODES TO INSPECT
            </span>
          </div>

          {/* Right: Selected Node Detail */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAchievement.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-wider">
                    {activeAchievement.category}
                  </span>
                  <span className="text-[var(--color-muted-dim)]">·</span>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {activeAchievement.year}
                  </span>
                </div>

                <h4
                  className="text-[var(--color-text)] font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    lineHeight: 1.15,
                  }}
                >
                  {activeAchievement.title}
                </h4>

                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                  {activeAchievement.detail}
                </p>

                {/* Sub-selectors */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  {constellationNodes.map((n, i) => (
                    <button
                      key={n.id}
                      onClick={() => setActiveAchievementIndex(i)}
                      data-magnetic
                      className={`font-mono text-[0.6875rem] px-2.5 py-1 rounded transition-all duration-300 ${activeAchievementIndex === i
                          ? "text-[var(--color-text)] bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.3)] shadow-[0_0_8px_rgba(59,130,246,0.2)]"
                          : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                        }`}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

