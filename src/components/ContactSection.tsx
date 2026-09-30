"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { social, identity } from "@/data/portfolio";
import { useScrollReveal, useTextReveal } from "@/lib/animations";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const chipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useScrollReveal(chipRef, { y: 20 });
  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useScrollReveal(leftRef, { delay: 0.1, y: 40 });
  useScrollReveal(formRef, { delay: 0.2, y: 40 });

  const copyEmail = () => {
    navigator.clipboard.writeText(social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${social.email}?subject=${encodeURIComponent(
      subject || "Engineering Collaboration Inquiry"
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="w-full">
      {/* Response Stage Header */}
      <div ref={chipRef} className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
        <span className="font-mono text-xs text-[var(--color-primary)] font-semibold tracking-wider">
          05 // RESPONSE
        </span>
        <div className="w-12 h-px bg-[rgba(255,255,255,0.12)]" />
        <span className="font-mono text-[0.6875rem] text-[var(--color-muted)] tracking-widest uppercase">
          ROUNDTRIP COMPLETED · DIRECT HANDSHAKE
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
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>Let&apos;s</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>build</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>something</span>{" "}
        <span className="word inline-block text-gradient" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", opacity: 0 }}>useful.</span>
      </h2>

      <p className="text-[var(--color-text-secondary)] mb-16 text-base sm:text-lg leading-relaxed max-w-2xl">
        The request packet has completed its journey through the system:{" "}
        <span className="font-mono text-xs text-[var(--color-primary)]">
          CLIENT → API → IDENTITY → DATA → RESPONSE
        </span>
        . If you have an engineering challenge, API infrastructure to scale, or a
        high-impact product to build, let&apos;s connect.
      </p>

      {/* Main Handshake Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pt-8 border-t border-[rgba(255,255,255,0.08)]">
        {/* Left Column: Direct Endpoints */}
        <div
          ref={leftRef}
          className="md:col-span-5 flex flex-col justify-between space-y-8"
          style={{ opacity: 0 }}
        >
          <div>
            <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest block mb-4">
              // Direct Endpoints
            </span>

            {/* Email Address */}
            <div className="mb-6">
              <span className="text-[0.6875rem] font-mono text-[var(--color-muted)] uppercase tracking-wider block mb-1">
                Primary Transmission Channel
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${social.email}`}
                  data-magnetic
                  className="text-lg sm:text-xl font-mono text-white hover:text-[var(--color-primary)] transition-colors select-all"
                >
                  {social.email}
                </a>
                <button
                  onClick={copyEmail}
                  data-magnetic
                  className={`px-2.5 py-1 rounded border text-xs font-mono cursor-pointer transition-all duration-300 ${
                    copied
                      ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-400"
                      : "bg-[#0A0A0E] border-[rgba(255,255,255,0.1)] hover:border-[var(--color-primary)] text-[var(--color-text-secondary)]"
                  }`}
                >
                  {copied ? "✓ COPIED" : "COPY"}
                </button>
              </div>
            </div>

            {/* Curriculum Vitae */}
            <div className="mb-6">
              <span className="text-[0.6875rem] font-mono text-[var(--color-muted)] uppercase tracking-wider block mb-1">
                Credentials & Full History
              </span>
              <a
                href="/MD.Shakir-Ahmed.pdf"
                download="MD.Shakir-Ahmed.pdf"
                data-magnetic
                data-cursor-label="DOWNLOAD"
                className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-primary)] hover:text-white transition-colors group"
              >
                <span>↓ DOWNLOAD CURRICULUM VITAE (PDF)</span>
                <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
              </a>
            </div>
          </div>

          {/* Social Links Row */}
          <div>
            <span className="text-[0.6875rem] font-mono text-[var(--color-muted)] uppercase tracking-wider block mb-3">
              // Network Profiles
            </span>
            <div className="flex flex-wrap gap-4 font-mono text-xs text-[var(--color-text-secondary)]">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="hover:text-white transition-colors group inline-flex items-center gap-1"
              >
                GITHUB <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
              <span>·</span>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="hover:text-white transition-colors group inline-flex items-center gap-1"
              >
                LINKEDIN <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
              <span>·</span>
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="hover:text-white transition-colors group inline-flex items-center gap-1"
              >
                WHATSAPP <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div ref={formRef} className="md:col-span-7" style={{ opacity: 0 }}>
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest block mb-4">
            // Dispatch Message
          </span>

          <form onSubmit={handleSendEmail} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="inquiry-subject"
                className={`block text-[0.6875rem] font-mono mb-2 uppercase transition-colors duration-300 ${
                  focusedField === "subject"
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                Subject / Scope
              </label>
              <input
                id="inquiry-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Backend Architecture / High-throughput API Design"
                className="w-full py-2.5 px-0 bg-transparent border-b border-[rgba(255,255,255,0.15)] text-sm text-white placeholder-[var(--color-muted-dim)] focus:border-[var(--color-primary)] outline-none font-mono transition-all duration-300"
              />
              <div
                className={`absolute bottom-0 left-0 h-px bg-[var(--color-primary)] transition-all duration-500 ${
                  focusedField === "subject" ? "w-full" : "w-0"
                }`}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="inquiry-message"
                className={`block text-[0.6875rem] font-mono mb-2 uppercase transition-colors duration-300 ${
                  focusedField === "message"
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                Message Payload
              </label>
              <textarea
                id="inquiry-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Describe project requirements, tech stack, or inquiry..."
                className="w-full py-2.5 px-0 bg-transparent border-b border-[rgba(255,255,255,0.15)] text-sm text-white placeholder-[var(--color-muted-dim)] focus:border-[var(--color-primary)] outline-none font-mono resize-none transition-all duration-300"
              />
              <div
                className={`absolute bottom-0 left-0 h-px bg-[var(--color-primary)] transition-all duration-500 ${
                  focusedField === "message" ? "w-full" : "w-0"
                }`}
              />
            </div>

            <button
              type="submit"
              data-magnetic
              data-cursor-label="SEND"
              className="group relative px-8 py-3.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-mono font-medium uppercase tracking-wider cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>[ DISPATCH VIA MAIL CLIENT ]</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
