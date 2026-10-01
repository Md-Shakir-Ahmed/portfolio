"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IdentiCoreArchitecture() {
  const [animating, setAnimating] = useState(false);
  const [flowStep, setFlowStep] = useState(0);
  const [showTokenPayload, setShowTokenPayload] = useState(false);

  const steps = [
    {
      label: "IDLE · READY",
      detail: "Gateway listening for inbound client authentication requests.",
      highlight: null,
    },
    {
      label: "STEP 1: INBOUND REQUEST",
      detail: "Client dispatches credentials / authorization code to IdentiCore Gateway.",
      highlight: "client-to-identicore",
    },
    {
      label: "STEP 2: OIDC DELEGATION",
      detail: "IdentiCore validates authorization against Keycloak Identity Provider.",
      highlight: "identicore-to-keycloak",
    },
    {
      label: "STEP 3: TOKEN ISSUANCE",
      detail: "Keycloak issues cryptographically signed RS256 JWT access token.",
      highlight: "keycloak-to-identicore",
    },
    {
      label: "STEP 4: SERVICE DISPATCH",
      detail: "IdentiCore injects verified identity claims to downstream microservices.",
      highlight: "identicore-to-services",
    },
    {
      label: "STEP 5: SECURE RESPONSE",
      detail: "Service processes request with RBAC context and responds to client.",
      highlight: "services-response",
    },
  ];

  const triggerFlow = () => {
    if (animating) return;
    setAnimating(true);
    setFlowStep(1);

    const timeouts = [
      setTimeout(() => setFlowStep(2), 1400),
      setTimeout(() => setFlowStep(3), 2800),
      setTimeout(() => setFlowStep(4), 4200),
      setTimeout(() => setFlowStep(5), 5600),
      setTimeout(() => {
        setFlowStep(0);
        setAnimating(false);
      }, 7200),
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  return (
    <div className="mt-28 pt-12 border-t border-[rgba(255,255,255,0.08)] relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[var(--color-border)] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)]" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                color: "var(--color-primary)",
                textTransform: "uppercase",
              }}
            >
              ARCHITECTURE DEEP-DIVE // ZERO-TRUST IDENTITY
            </span>
          </div>
          <h3
            className="text-2xl text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            IdentiCore — Centralized SSO & Microservice Gateway
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTokenPayload(!showTokenPayload)}
            className="px-3 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-muted)] text-xs text-[var(--color-text-secondary)] transition-all cursor-pointer"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem" }}
          >
            {showTokenPayload ? "HIDE JWT CLAIMS" : "INSPECT JWT CLAIMS"}
          </button>

          <button
            onClick={triggerFlow}
            disabled={animating}
            className={`px-4 py-1.5 rounded text-xs transition-all duration-300 cursor-pointer ${
              animating
                ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)] border border-[var(--color-primary)] opacity-70"
                : "bg-[var(--color-primary)] text-[var(--color-text)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] font-medium"
            }`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.08em" }}
          >
            {animating ? "SIMULATION RUNNING..." : "TRIGGER AUTH FLOW"}
          </button>
        </div>
      </div>

      {/* Telemetry Status Bar */}
      <div className="mb-8 p-3 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${animating ? "bg-amber-400 animate-ping" : "bg-emerald-500"}`}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text)",
              letterSpacing: "0.05em",
            }}
          >
            STATUS: {steps[flowStep].label}
          </span>
        </div>
        <span
          className="text-xs text-[var(--color-text-secondary)]"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem" }}
        >
          {steps[flowStep].detail}
        </span>
      </div>

      {/* SVG Interactive Architecture Diagram */}
      <div className="relative w-full max-w-full min-w-0 overflow-x-auto py-6">
        <div className="min-w-[680px] max-w-4xl mx-auto">
          <svg viewBox="0 0 800 360" className="w-full h-auto select-none">
            <defs>
              {/* Glow filter */}
              <filter id="blue-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Linear Gradients */}
              <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connection Lines */}
            {/* Keycloak <-> IdentiCore */}
            <line
              x1="200"
              y1="180"
              x2="380"
              y2="180"
              stroke={flowStep === 2 || flowStep === 3 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
              strokeWidth={flowStep === 2 || flowStep === 3 ? "2.5" : "1.5"}
              strokeDasharray={flowStep === 2 || flowStep === 3 ? "6 3" : "none"}
              className="transition-all duration-300"
            />

            {/* Inbound Client -> IdentiCore */}
            <line
              x1="50"
              y1="180"
              x2="100"
              y2="180"
              stroke={flowStep === 1 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
              strokeWidth={flowStep === 1 ? "2.5" : "1.5"}
              strokeDasharray={flowStep === 1 ? "6 3" : "none"}
            />

            {/* IdentiCore -> Service A (Top) */}
            <path
              d="M 460 160 C 520 160, 540 80, 620 80"
              fill="none"
              stroke={flowStep === 4 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
              strokeWidth={flowStep === 4 ? "2" : "1"}
              strokeDasharray={flowStep === 4 ? "4 2" : "none"}
              className="transition-all duration-300"
            />

            {/* IdentiCore -> Service B (Middle) */}
            <line
              x1="460"
              y1="180"
              x2="620"
              y2="180"
              stroke={flowStep === 4 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
              strokeWidth={flowStep === 4 ? "2" : "1"}
              strokeDasharray={flowStep === 4 ? "4 2" : "none"}
              className="transition-all duration-300"
            />

            {/* IdentiCore -> Service C (Bottom) */}
            <path
              d="M 460 200 C 520 200, 540 280, 620 280"
              fill="none"
              stroke={flowStep === 4 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
              strokeWidth={flowStep === 4 ? "2" : "1"}
              strokeDasharray={flowStep === 4 ? "4 2" : "none"}
              className="transition-all duration-300"
            />

            {/* ─── NODE: Inbound Client ─────────────────── */}
            <g transform="translate(10, 150)">
              <rect
                width="80"
                height="60"
                rx="6"
                fill="#0c0d12"
                stroke={flowStep === 1 ? "#3B82F6" : "rgba(255,255,255,0.15)"}
                strokeWidth="1.5"
              />
              <text x="40" y="28" fill="#888888" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
                CLIENT
              </text>
              <text x="40" y="44" fill="#FAFAFA" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle">
                CONSUMER
              </text>
            </g>

            {/* ─── NODE: Keycloak (OIDC Authority) ──────── */}
            <g transform="translate(110, 130)">
              <rect
                width="140"
                height="100"
                rx="8"
                fill="#0e1015"
                stroke={flowStep === 2 || flowStep === 3 ? "#8B5CF6" : "rgba(255,255,255,0.15)"}
                strokeWidth={flowStep === 2 || flowStep === 3 ? "2" : "1.5"}
                filter={flowStep === 2 || flowStep === 3 ? "url(#blue-glow)" : "none"}
              />
              <text x="70" y="32" fill="#A78BFA" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="1">
                IDENTITY PROVIDER
              </text>
              <text x="70" y="55" fill="#FAFAFA" fontSize="13" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
                KEYCLOAK
              </text>
              <text x="70" y="75" fill="#666666" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
                OAuth 2.0 / OIDC · RS256
              </text>
            </g>

            {/* ─── NODE: IdentiCore Gateway (Center) ─────── */}
            <g transform="translate(320, 115)">
              <rect
                width="170"
                height="130"
                rx="10"
                fill="#0D1117"
                stroke={flowStep > 0 ? "#3B82F6" : "rgba(59,130,246,0.3)"}
                strokeWidth="2"
                filter="url(#blue-glow)"
              />
              <text x="85" y="35" fill="#3B82F6" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="1">
                CORE GATEWAY
              </text>
              <text x="85" y="62" fill="#FAFAFA" fontSize="16" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
                IDENTICORE
              </text>
              <text x="85" y="85" fill="#888888" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
                JWT Validation & RBAC
              </text>
              <text x="85" y="105" fill="#555555" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
                Zero-Trust Token Exchange
              </text>
            </g>

            {/* ─── NODES: Downstream Microservices ────────── */}
            {/* Service A */}
            <g transform="translate(620, 50)">
              <rect
                width="140"
                height="60"
                rx="6"
                fill="#0c0d12"
                stroke={flowStep === 4 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
                strokeWidth="1.5"
              />
              <text x="70" y="26" fill="#888888" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
                MICROSERVICE 01
              </text>
              <text x="70" y="44" fill="#FAFAFA" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle">
                Enterprise Business
              </text>
            </g>

            {/* Service B */}
            <g transform="translate(620, 150)">
              <rect
                width="140"
                height="60"
                rx="6"
                fill="#0c0d12"
                stroke={flowStep === 4 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
                strokeWidth="1.5"
              />
              <text x="70" y="26" fill="#888888" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
                MICROSERVICE 02
              </text>
              <text x="70" y="44" fill="#FAFAFA" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle">
                Regulatory Licensing
              </text>
            </g>

            {/* Service C */}
            <g transform="translate(620, 250)">
              <rect
                width="140"
                height="60"
                rx="6"
                fill="#0c0d12"
                stroke={flowStep === 4 ? "#3B82F6" : "rgba(255,255,255,0.12)"}
                strokeWidth="1.5"
              />
              <text x="70" y="26" fill="#888888" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
                MICROSERVICE 03
              </text>
              <text x="70" y="44" fill="#FAFAFA" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle">
                Queue & Realtime
              </text>
            </g>

            {/* Dynamic Traveling Packet Animation */}
            {flowStep === 1 && (
              <circle cx="80" cy="180" r="5" fill="#3B82F6" filter="url(#blue-glow)">
                <animate attributeName="cx" from="50" to="120" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}

            {flowStep === 2 && (
              <circle cx="260" cy="180" r="5" fill="#8B5CF6" filter="url(#blue-glow)">
                <animate attributeName="cx" from="250" to="340" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}

            {flowStep === 3 && (
              <circle cx="340" cy="180" r="5" fill="#3B82F6" filter="url(#blue-glow)">
                <animate attributeName="cx" from="340" to="250" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}

            {flowStep === 4 && (
              <g>
                <circle cx="530" cy="120" r="4" fill="#3B82F6" filter="url(#blue-glow)" />
                <circle cx="530" cy="180" r="4" fill="#3B82F6" filter="url(#blue-glow)" />
                <circle cx="530" cy="240" r="4" fill="#3B82F6" filter="url(#blue-glow)" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* JWT Claims Inspection Panel */}
      <AnimatePresence>
        {showTokenPayload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 rounded bg-black border border-[var(--color-border)] font-mono text-xs overflow-x-auto"
          >
            <div className="flex items-center justify-between mb-2 text-[var(--color-muted)] text-[0.6875rem]">
              <span>SAMPLE DECODED JWT PAYLOAD // ENCRYPTED RS256</span>
              <span className="text-emerald-500">SIGNATURE_VERIFIED</span>
            </div>
            <pre className="text-blue-300">
{`{
  "iss": "https://auth.system/realms/production",
  "sub": "usr_99841_shakir",
  "aud": ["identicore-gateway", "service-ebs", "service-lims"],
  "roles": ["system_admin", "api_operator", "tenant_owner"],
  "scope": "openid email profile roles",
  "iat": 1727611200,
  "exp": 1727614800,
  "tenant_id": "org_gov_bd"
}`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

