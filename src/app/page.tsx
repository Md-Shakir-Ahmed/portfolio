"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import SpatialNavigation from "@/components/SpatialNavigation";
import GuideSignal from "@/components/GuideSignal";
import MemoryBanner from "@/components/MemoryBanner";
import AboutSection from "@/components/AboutSection";
import StackSection from "@/components/StackSection";
import IdentiCoreArchitecture from "@/components/IdentiCoreArchitecture";
import ProjectGraph from "@/components/ProjectGraph";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import SmoothScroll from "@/components/SmoothScroll";
import { systemSections, identity, social, type SystemStage } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";

// Lazy load MagneticCursor to avoid SSR issues and improve initial load
const MagneticCursor = dynamic(() => import("@/components/MagneticCursor"), {
  ssr: false,
});

export default function Home() {
  const [activeStage, setActiveStage] = useState<SystemStage>("CLIENT");
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / docHeight)) : 0;
    setScrollProgress(progress);

    // Track active stage based on section positioning
    for (let i = systemSections.length - 1; i >= 0; i--) {
      const el = document.getElementById(systemSections[i].sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setActiveStage(systemSections[i].stage);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleEnterSystem = () => {
    scrollToSection("about");
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-[#030303] text-[#FAFAFA] flex flex-col overflow-x-hidden">
        {/* ─── Custom Magnetic Cursor ─────────────────────────── */}
        <MagneticCursor />

        {/* ─── Spatial Floating Navigation ─────────────────── */}
        <SpatialNavigation
          activeStage={activeStage}
          onNavigate={scrollToSection}
          scrollProgress={scrollProgress}
        />

        {/* ─── The Guide Signal (Living Request Packet) ────── */}
        <GuideSignal
          activeStage={activeStage}
          scrollProgress={scrollProgress}
        />

        {/* ─── Returning Visitor Memory System ─────────────── */}
        <MemoryBanner />

        {/* ─── Main Content Canvas ─── */}
        <main className="flex-1 w-full">
          {/* 01 // CLIENT — Hero Spatial Initialization & Portrait */}
          <HeroSection onEnterSystem={handleEnterSystem} />

          {/* 02 // API — Engineering Identity & Mindset */}
          <section
            id="about"
            className="system-section"
            aria-label="Engineering Identity"
          >
            <AboutSection />
          </section>

          {/* 03 // IDENTITY — Stack & IdentiCore Architecture */}
          <section
            id="stack"
            className="system-section"
            aria-label="Stack and Architecture"
          >
            <StackSection />
            <IdentiCoreArchitecture />
          </section>

          {/* 04 // DATA — Project Graph & Experience */}
          <section
            id="projects"
            className="system-section"
            aria-label="Projects and Experience"
          >
            <ProjectGraph />
            <div className="mt-32 sm:mt-40 pt-16 border-t border-[rgba(255,255,255,0.08)]">
              <ExperienceSection />
            </div>
          </section>

          {/* 05 // RESPONSE — Handshake & Direct Endpoints */}
          <section
            id="contact"
            className="system-section"
            aria-label="Contact and Handshake"
          >
            <ContactSection />
          </section>
        </main>

        {/* ─── Minimal Telemetry Footer ────────────────────── */}
        <footer className="w-full py-12 px-4 sm:px-6 md:px-8 border-t border-[rgba(255,255,255,0.06)] bg-[#030303] text-xs font-mono text-[var(--color-muted-dim)]">
          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              <span className="text-white font-medium">
                {identity.name}
              </span>
              <span>—</span>
              <span>{identity.positioning}</span>
            </div>
            <div className="flex items-center gap-4 text-[var(--color-muted)]">
              <a href={`mailto:${social.email}`} className="hover:text-white transition-colors">
                EMAIL
              </a>
              <span>·</span>
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                GITHUB
              </a>
              <span>·</span>
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                LINKEDIN
              </a>
              <span>·</span>
              <a href={getAssetPath(social.cvDownloadUrl)} download="MD.Shakir-Ahmed.pdf" className="text-[var(--color-primary)] hover:underline">
                CV.PDF
              </a>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
