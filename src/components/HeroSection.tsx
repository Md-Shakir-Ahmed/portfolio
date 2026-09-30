"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { identity, social } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";
import ParticleField from "./ParticleField";

interface HeroSectionProps {
  onEnterSystem: () => void;
}

export default function HeroSection({ onEnterSystem }: HeroSectionProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const bootLineRef = useRef<HTMLDivElement>(null);

  // 3D Parallax tilt for portrait (desktop only, subtle)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springRotateX = useSpring(mouseY, { stiffness: 45, damping: 20 });
  const springRotateY = useSpring(mouseX, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // ─── GSAP Cinematic Entrance Sequence ─────────────────
  useEffect(() => {
    // Always mark loaded after a maximum wait to guarantee visibility
    const safetyTimer = setTimeout(() => setLoaded(true), 2500);

    if (reducedMotion) {
      setLoaded(true);
      clearTimeout(safetyTimer);
      return;
    }

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        setLoaded(true);
        clearTimeout(safetyTimer);
      },
    });

    // 1. Boot line sweeps across
    if (bootLineRef.current) {
      tl.fromTo(
        bootLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        0
      );
      tl.to(
        bootLineRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        0.5
      );
    }

    // 2. Status chip appears
    if (chipRef.current) {
      tl.fromTo(
        chipRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        0.2
      );
    }

    // 3. Name words reveal with masked text motion (staggered)
    if (nameRef.current) {
      const words = nameRef.current.querySelectorAll(".hero-word");
      if (words.length > 0) {
        tl.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: -20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.3
        );
      }
    }

    // 4. Role slides in
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.55
      );
    }

    // 5. Value proposition appears
    if (narrativeRef.current) {
      tl.fromTo(
        narrativeRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.7
      );
    }

    // 6. Tags stagger in
    if (tagsRef.current) {
      const tags = tagsRef.current.querySelectorAll(".tag-item");
      tl.fromTo(
        tags,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        },
        0.85
      );
    }

    // 7. CTA becomes available
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        1.0
      );
    }

    // 8. Portrait enters from right
    if (portraitRef.current) {
      tl.fromTo(
        portraitRef.current,
        { x: 40, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        0.35
      );
    }

    // 9. Metrics ribbon
    if (metricsRef.current) {
      tl.fromTo(
        metricsRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        1.0
      );
    }

    return () => {
      tl.kill();
      clearTimeout(safetyTimer);
    };
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mouseX.set(nx * 5);
    mouseY.set(-ny * 5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Split the name into words for staggered reveal
  const nameWords = useMemo(() => identity.name.split(" "), []);

  // Determine initial visibility: if reducedMotion OR loaded, show everything
  const vis = reducedMotion || loaded;

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center px-5 sm:px-6 md:px-8 lg:px-12 select-none overflow-hidden"
      aria-label="Portfolio introduction — Md. Shakir Ahmed"
    >
      {/* ─── Particle Network Background ─────────────────── */}
      <ParticleField />

      {/* ─── Subtle Blueprint Grid ───────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ─── Ambient Depth: Radial Gradients ─────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* ─── System Boot Line ────────────────────────────── */}
      {!reducedMotion && (
        <div
          ref={bootLineRef}
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent origin-left pointer-events-none"
          style={{ opacity: 0.6, transformOrigin: "left center" }}
          aria-hidden="true"
        />
      )}

      {/* ─── Main Content Grid ───────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">

        {/* Left Column: Narrative & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Status Chip */}
          <div
            ref={chipRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)]/80 border border-[var(--color-border)] mb-6 backdrop-blur-sm"
            style={{ opacity: vis ? 1 : 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
            <span
              className="text-[var(--color-text-secondary)] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem" }}
            >
              Available for opportunities
            </span>
          </div>

          {/* ─── H1: Md. Shakir Ahmed — ALWAYS VISIBLE ──── */}
          <h1
            ref={nameRef}
            className="text-white font-extrabold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              perspective: "600px",
            }}
          >
            {nameWords.map((word, i) => (
              <span
                key={i}
                className="hero-word inline-block overflow-hidden"
                style={{
                  opacity: vis ? 1 : 0,
                  willChange: reducedMotion ? "auto" : "transform, opacity",
                  transformOrigin: "center bottom",
                }}
              >
                {word}
                {i < nameWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>

          {/* Role / Subtitle */}
          <div ref={subtitleRef} style={{ opacity: vis ? 1 : 0 }}>
            <h2
              className="text-[var(--color-text-secondary)] font-medium mb-5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.15rem, 2.2vw, 1.75rem)",
                lineHeight: 1.35,
              }}
            >
              Backend-focused{" "}
              <span className="text-gradient font-semibold">
                Software Engineer
              </span>
            </h2>
          </div>

          {/* Value Proposition */}
          <p
            ref={narrativeRef}
            className="text-[var(--color-muted)] text-base sm:text-lg mb-7 max-w-xl leading-relaxed"
            style={{ opacity: vis ? 1 : 0 }}
          >
            Architecting high-throughput APIs, distributed business systems, and
            zero-trust identity frameworks for government and enterprise
            platforms.
          </p>

          {/* Expertise Tags */}
          <div
            ref={tagsRef}
            className="flex flex-wrap items-center gap-2 mb-8"
            style={{ opacity: vis ? 1 : 0 }}
          >
            {[
              "HIGH-THROUGHPUT APIS",
              "BUSINESS SYSTEMS",
              "SAAS ARCHITECTURE",
              "KEYCLOAK & SSO",
              "MICROSERVICES",
              "APPLIED ML",
            ].map((tag) => (
              <span
                key={tag}
                className="tag-item px-2.5 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(59,130,246,0.3)] hover:text-white transition-all duration-300 cursor-default"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3"
            style={{ opacity: vis ? 1 : 0 }}
          >
            {/* Primary CTA: Scroll to projects */}
            <button
              onClick={onEnterSystem}
              data-magnetic
              className="group relative px-7 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white active:scale-[0.97]"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
              }}
              aria-label="Scroll to explore selected work and case studies"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>EXPLORE WORK</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                aria-hidden="true"
              />
            </button>

            {/* Secondary CTA: Download CV */}
            <a
              href={getAssetPath(social.cvDownloadUrl)}
              download="MD.Shakir-Ahmed.pdf"
              data-magnetic
              className="px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(59,130,246,0.3)] hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
              }}
            >
              <span className="flex items-center gap-2">
                <span>↓</span>
                <span>DOWNLOAD CV</span>
              </span>
            </a>
          </div>

          {/* ─── Request Lifecycle Trace (animated) ──────── */}
          {!reducedMotion && loaded && (
            <div
              className="mt-8 flex items-center gap-1.5 overflow-hidden"
              aria-hidden="true"
            >
              {["CLIENT", "API", "IDENTITY", "DATA", "RESPONSE"].map((step, i) => (
                <span key={step} className="flex items-center gap-1.5">
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + i * 0.15, duration: 0.4 }}
                    className="text-[var(--color-muted-dim)] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem" }}
                  >
                    {step}
                  </motion.span>
                  {i < 4 && (
                    <motion.span
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 0.4, scaleX: 1 }}
                      transition={{ delay: 1.7 + i * 0.15, duration: 0.3 }}
                      className="text-[var(--color-primary)]"
                      style={{ fontSize: "0.5rem" }}
                    >
                      →
                    </motion.span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ─── Right Column: Portrait & System Card ──────── */}
        <div
          ref={portraitRef}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
          style={{ opacity: vis ? 1 : 0 }}
        >
          <motion.div
            style={
              reducedMotion
                ? {}
                : {
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformPerspective: 1000,
                  }
            }
            className="relative w-full max-w-[380px] aspect-[4/5]"
          >
            {/* Subtle glow behind portrait */}
            <div
              className="absolute inset-6 rounded-3xl pointer-events-none -z-10"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
                animation: reducedMotion ? "none" : "pulse-halo 5s ease-in-out infinite",
              }}
              aria-hidden="true"
            />

            {/* Portrait Image */}
            <div
              className="relative w-full h-full overflow-hidden rounded-2xl"
              style={{
                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
            >
              <Image
                src={getAssetPath("/shakir-ahmed.png")}
                alt="Md. Shakir Ahmed — Backend-focused Software Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                priority
                className="object-cover object-top"
                style={{
                  filter: "grayscale(0.15) contrast(1.04) brightness(0.98)",
                  transition: "filter 0.6s ease, transform 0.6s ease",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0) contrast(1.08) brightness(1.02)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0.15) contrast(1.04) brightness(0.98)";
                }}
              />
            </div>
          </motion.div>

          {/* Stat Strip */}
          <div
            ref={metricsRef}
            className="w-full max-w-[380px] mt-5 pt-4 border-t border-[var(--color-border)] grid grid-cols-3 gap-3"
            style={{ opacity: vis ? 1 : 0 }}
          >
            {[
              { value: "4+", label: "YRS EXPERIENCE" },
              { value: "300+", label: "PROBLEMS SOLVED" },
              { value: "5+", label: "GOV SYSTEMS" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span
                  className="text-white font-bold"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[var(--color-muted)] mt-1"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.08em" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator ────────────────────────────── */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 1.8, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span
            className="text-[var(--color-muted-dim)] tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem" }}
          >
            SCROLL
          </span>
          {!reducedMotion && (
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-7 rounded-full border border-[rgba(255,255,255,0.12)] flex items-start justify-center pt-1"
            >
              <div className="w-0.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-70" />
            </motion.div>
          )}
        </motion.div>
      )}
    </section>
  );
}
