"use client";

import { useRef } from "react";
import { useScrollReveal, useStaggerReveal, useTextReveal } from "@/lib/animations";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  // All animation hooks now have internal safety fallbacks
  useScrollReveal(chipRef, { delay: 0, y: 20 });
  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useScrollReveal(narrativeRef, { delay: 0.1, y: 30 });
  useScrollReveal(focusRef, { delay: 0.15, y: 30 });
  useStaggerReveal(pillarsRef, ".pillar-item", { stagger: 0.1 });

  const pillars = [
    {
      num: "01",
      code: "RESILIENCE",
      title: "Fault-Tolerant APIs & Services",
      desc: "Architecting idempotent endpoints, strict validation pipelines, and comprehensive error handling that keep business systems reliable under volatile conditions.",
    },
    {
      num: "02",
      code: "DATA_INTEGRITY",
      title: "Relational Modeling & Query Tuning",
      desc: "Designing normalized schemas, managing ACID transactions, and optimizing complex query execution plans across millions of records with MySQL and PostgreSQL.",
    },
    {
      num: "03",
      code: "ZERO_TRUST",
      title: "Identity, SSO & Token Topology",
      desc: "Integrating centralized identity with Keycloak, OAuth 2.0 / OIDC, and cryptographic JWT verification to enforce seamless access delegation across services.",
    },
    {
      num: "04",
      code: "MODULARITY",
      title: "Microservices & Clean Architecture",
      desc: "Decoupling monolithic business logic into isolated, domain-driven services communicating via structured REST protocols and asynchronous event queues.",
    },
  ];

  const focusAreas = [
    "High-Throughput RESTful APIs",
    "Relational Schema Optimization",
    "Keycloak & OAuth 2.0 / OIDC SSO",
    "Distributed Microservice Topologies",
    "Applied Machine Learning Pipelines",
  ];

  return (
    <div ref={sectionRef} className="w-full">
      {/* Section Stage Label */}
      <div
        ref={chipRef}
        className="flex items-center gap-3 mb-8"
        style={{ opacity: 0 }}
      >
        <span
          className="text-[var(--color-primary)] font-semibold tracking-wider"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
        >
          02
        </span>
        <div className="w-8 h-px bg-[rgba(255,255,255,0.15)]" />
        <span
          className="text-[var(--color-muted)] tracking-widest uppercase"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem" }}
        >
          Engineering Identity
        </span>
      </div>

      {/* Section Headline */}
      <h2
        ref={headlineRef}
        className="mb-10 text-[var(--color-text)] max-w-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.25rem, 5vw, 4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          perspective: "600px",
        }}
      >
        <span className="word inline-block" style={{ opacity: 0 }}>Building</span>{" "}
        <span className="word inline-block" style={{ opacity: 0 }}>the</span>{" "}
        <span className="word inline-block" style={{ opacity: 0 }}>invisible</span>{" "}
        <span className="word inline-block" style={{ opacity: 0 }}>systems</span>{" "}
        <span className="word inline-block" style={{ opacity: 0 }}>that</span>{" "}
        <span className="word inline-block text-gradient" style={{ opacity: 0 }}>
          power&nbsp;digital&nbsp;products.
        </span>
      </h2>

      {/* ─── Split Layout: Story + Focus Areas ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Left: Personal Story (scannable paragraphs) */}
        <div
          ref={narrativeRef}
          className="lg:col-span-7 space-y-5 text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed"
          style={{ opacity: 0 }}
        >
          <p className="text-[var(--color-text)] font-medium text-lg sm:text-xl leading-relaxed">
            I am a <strong>Backend-focused Software Engineer</strong> with a
            systems-first mindset — designing the backbone of modern web
            applications.
          </p>

          <p>
            With over <span className="text-[var(--color-text)] font-semibold">4+ years</span> of
            hands-on software engineering experience, I currently serve as Software Engineer at{" "}
            <span className="text-[var(--color-text)] font-semibold">Varendra University</span>.
            Previously at{" "}
            <span className="text-[var(--color-text)] font-semibold">Business Automation Limited</span>,
            architecting mission-critical government regulatory portals (BTRC LIMS, BRCP WENP) and
            high-throughput enterprise systems (EBS, QueuePro).
          </p>

          <p>
            My engineering philosophy is rooted in algorithmic rigor — over 300+
            problems solved on Codeforces, URI, and UVa. I treat code as state
            machines that must guarantee correctness and data integrity.
          </p>
        </div>

        {/* Right: Focus Areas List */}
        <div
          ref={focusRef}
          className="lg:col-span-5 lg:pl-4"
          style={{ opacity: 0 }}
        >
          <span
            className="text-[var(--color-primary)] uppercase tracking-widest mb-5 block"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem" }}
          >
            Core Focus Areas
          </span>

          <div className="space-y-3">
            {focusAreas.map((area, index) => (
              <div
                key={area}
                className="flex items-center gap-3 py-3 border-b border-[var(--color-border)] group hover:border-[var(--color-border-active)] transition-all duration-300 cursor-default"
              >
                <span
                  className="text-[var(--color-muted-dim)] group-hover:text-[var(--color-primary)] transition-colors shrink-0"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem" }}
                >
                  0{index + 1}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
                  {area}
                </span>
                <span className="ml-auto w-0 h-px bg-[var(--color-primary)] group-hover:w-6 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Architectural Pillars ─── */}
      <div ref={pillarsRef} className="pt-10 border-t border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center justify-between mb-10">
          <h3
            className="uppercase tracking-widest text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem" }}
          >
            Core Architectural Pillars
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.code}
              className="pillar-item relative flex flex-col items-start group cursor-default p-6 rounded-2xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-all duration-500"              style={{ opacity: 0 }}
            >
              {/* Number & Code */}
              <div className="flex items-center gap-3 mb-2.5">
                <span
                  className="font-bold text-[rgba(255,255,255,0.06)] group-hover:text-[var(--color-primary-subtle)] transition-colors duration-500"
                  style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}
                >
                  {pillar.num}
                </span>
                <span
                  className="text-[var(--color-primary)] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem" }}
                >
                  {pillar.code}
                </span>
              </div>

              <h4
                className="text-lg sm:text-xl text-[var(--color-text)] font-medium mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pillar.title}
              </h4>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {pillar.desc}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[var(--color-primary)] to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

