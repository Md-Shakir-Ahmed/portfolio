"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import { projects } from "@/data/portfolio";

export default function ProjectReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Only apply on desktop where horizontal scroll makes sense
    const mql = window.matchMedia("(min-width: 1024px)");
    if (!mql.matches || !containerRef.current || !wrapperRef.current) return;

    const panels = gsap.utils.toArray(".project-panel") as HTMLElement[];
    if (panels.length === 0) return;

    const tl = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + containerRef.current!.offsetWidth * panels.length,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden bg-[var(--color-bg)]">
      <div 
        ref={wrapperRef}
        className="flex w-full h-[100vh]"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 lg:p-24 relative overflow-hidden"
          >
            {/* Background Parallax Image or Gradient */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ background: `radial-gradient(circle at center, var(--color-primary), transparent 60%)` }} />
            
            <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column: Live architectural diagram */}
              <div className="flex flex-col space-y-6">
                <div className="flex items-center gap-6">
                  {project.logo && (
                    <div className="relative shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image 
                        src={getAssetPath(project.logo)} 
                        alt={`${project.shortName} Logo`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="inline-block">
                    <span className="font-mono text-xs text-[var(--color-primary)] px-3 py-1 border border-[var(--color-primary)]/30 rounded-full bg-[var(--color-primary)]/10">
                      0{index + 1} / {project.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[var(--color-text)]">
                  {project.name}
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)]">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="font-mono text-[0.6875rem] text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right Column: Problem, Architecture, Outcome */}
              <div className="flex flex-col space-y-8 p-8 bg-[var(--color-surface)]/80 backdrop-blur-md rounded-2xl border border-[var(--color-border)] shadow-xl">
                <div>
                  <h4 className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider mb-2">
                    // The Architectural Challenge
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-wider mb-2">
                    // Implemented Solution
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
                {project.outcome && (
                  <div>
                    <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider mb-2">
                      // Verifiable Outcome
                    </h4>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                )}
                <button
                  data-magnetic
                  className="mt-4 px-6 py-3 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs font-bold uppercase hover:bg-[var(--color-primary)] transition-colors self-start"
                >
                  View Case Study →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
