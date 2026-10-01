"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { social, identity } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";
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
        className="mb-6 text-[var(--color-text)] max-w-4xl"
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
                  className="text-lg sm:text-xl font-mono text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 select-all"
                >
                  {social.email}
                </a>
                <button
                  onClick={copyEmail}
                  data-magnetic
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-all duration-300 ${
                    copied
                      ? "bg-emerald-500/15 border-emerald-400/30 text-[var(--color-emerald)] shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-secondary)]"
                  }`}
                >
                  {copied ? "✓ COPIED!" : "COPY EMAIL"}
                </button>
              </div>
            </div>

            {/* Curriculum Vitae */}
            <div className="mb-6">
              <span className="text-[0.6875rem] font-mono text-[var(--color-muted)] uppercase tracking-wider block mb-1">
                Credentials & Full History
              </span>
              <a
                href={getAssetPath(social.cvDownloadUrl)}
                download="MD.Shakir-Ahmed.pdf"
                data-magnetic
                data-cursor-label="DOWNLOAD"
                className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors group"
              >
                <span>↓ DOWNLOAD CURRICULUM VITAE (PDF)</span>
                <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
              </a>
            </div>

            {/* Calendar Booking */}
            <div className="mb-6">
              <span className="text-[0.6875rem] font-mono text-[var(--color-muted)] uppercase tracking-wider block mb-1">
                Direct Meeting
              </span>
              <a
                href="https://cal.com/shakir-ahmed"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-cursor-label="BOOK"
                className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors group"
              >
                <span>âœ‰ BOOK ENGINEERING SCREEN (CAL.COM)</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Social Links Row */}
          <div>
            <span className="text-[0.6875rem] font-mono text-[var(--color-muted)] uppercase tracking-wider block mb-3">
              // Network Profiles
            </span>
            <div className="flex flex-wrap gap-2.5 font-mono text-xs">
              {[
                {
                  name: "GITHUB",
                  href: social.github,
                  icon: (
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                  hoverBorder: "hover:border-[rgba(255,255,255,0.4)]",
                  hoverGlow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]",
                  accentColor: "group-hover:text-[var(--color-text)]",
                },
                {
                  name: "LINKEDIN",
                  href: social.linkedin,
                  icon: (
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 0 0 1.58-1.59c0-.88-.71-1.59-1.58-1.59a1.59 1.59 0 0 0-1.59 1.59c0 .88.71 1.59 1.59 1.59M7.85 18.5V10.13H5.06V18.5h2.79z" />
                    </svg>
                  ),
                  hoverBorder: "hover:border-[#0A66C2]/60",
                  hoverGlow: "hover:shadow-[0_0_15px_rgba(10,102,194,0.25)]",
                  accentColor: "group-hover:text-[#38BDF8]",
                },
                {
                  name: "WHATSAPP",
                  href: social.whatsapp,
                  icon: (
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.33 7.33 9.07 7.4 8.87 7.62C8.65 7.85 8.04 8.42 8.04 9.58C8.04 10.74 8.89 11.85 9.01 12.01C9.13 12.18 10.66 14.54 13.04 15.56C15.01 16.41 15.42 16.24 15.86 16.2C16.48 16.14 17.26 15.71 17.43 15.24C17.6 14.77 17.6 14.37 17.55 14.28C17.5 14.2 17.34 14.14 17.06 14C16.78 13.86 15.44 13.2 15.19 13.11C14.94 13.02 14.76 12.97 14.58 13.25C14.4 13.53 13.88 14.14 13.72 14.32C13.56 14.5 13.4 14.53 13.12 14.39C12.84 14.25 11.94 13.95 10.87 13C10.04 12.26 9.48 11.35 9.32 11.07C9.16 10.79 9.3 10.64 9.44 10.5C9.57 10.37 9.73 10.16 9.87 10C10.01 9.84 10.06 9.73 10.15 9.55C10.24 9.37 10.19 9.21 10.12 9.07C10.05 8.93 9.53 7.65 9.31 7.13C9.1 6.62 8.89 6.69 8.73 6.68C8.58 6.67 8.41 6.67 8.24 6.67" />
                    </svg>
                  ),
                  hoverBorder: "hover:border-[#25D366]/60",
                  hoverGlow: "hover:shadow-[0_0_15px_rgba(37,211,102,0.25)]",
                  accentColor: "group-hover:text-[#34D399]",
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0A0E] border border-[rgba(255,255,255,0.08)] text-[var(--color-text-secondary)] font-mono text-xs transition-all duration-300 ${item.hoverBorder} ${item.hoverGlow}`}
                >
                  <span className={`transition-colors duration-300 ${item.accentColor}`}>
                    {item.icon}
                  </span>
                  <span className={`transition-colors duration-300 ${item.accentColor} font-medium`}>
                    {item.name}
                  </span>
                  <span className="text-[var(--color-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-[0.6875rem]">
                    ↗
                  </span>
                </a>
              ))}
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
                className="w-full py-2.5 px-0 bg-transparent border-b border-[rgba(255,255,255,0.15)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted-dim)] focus:border-[var(--color-primary)] outline-none font-mono transition-all duration-300"
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
                className="w-full py-2.5 px-0 bg-transparent border-b border-[rgba(255,255,255,0.15)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted-dim)] focus:border-[var(--color-primary)] outline-none font-mono resize-none transition-all duration-300"
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
              className="group relative px-8 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-bg)] text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.45)] hover:scale-105 active:scale-95"
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

