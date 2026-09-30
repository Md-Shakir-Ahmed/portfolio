"use client";

import { useState, useRef, useEffect } from "react";
import { identity, social, projects, techStack } from "@/data/portfolio";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "sys --status",
      output: "SHUV0://SYSTEM v2.6.4 (x86_64-shakir-kernel) · All backend subsystems operational. Type 'help' for available commands.",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const commandList = [
    "help",
    "whoami",
    "focus",
    "stack",
    "projects",
    "identicore",
    "contact",
    "ping",
    "clear",
  ];

  const handleCommand = (cmdToRun?: string) => {
    const rawCmd = (cmdToRun ?? input).trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    let response: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        response = (
          <div className="space-y-1">
            <p className="text-blue-400 font-semibold">Available system commands:</p>
            <p><span className="text-amber-400">whoami</span> — Display engineer identity & core profile</p>
            <p><span className="text-amber-400">focus</span> — Engineering specializations & system principles</p>
            <p><span className="text-amber-400">stack</span> — Active production technologies & frameworks</p>
            <p><span className="text-amber-400">projects</span> — List all indexed systems & verified records</p>
            <p><span className="text-amber-400">identicore</span> — Inspect IdentiCore identity & SSO architecture</p>
            <p><span className="text-amber-400">contact</span> — Get direct communication endpoints</p>
            <p><span className="text-amber-400">ping</span> — Test client-to-system latency</p>
            <p><span className="text-amber-400">clear</span> — Flush terminal output buffer</p>
          </div>
        );
        break;

      case "whoami":
        response = `${identity.name} — ${identity.positioning} based in ${identity.location}. Software Engineer at Varendra University, formerly Business Automation Limited.`;
        break;

      case "focus":
        response = `DOMAINS: APIs, Business Systems, SaaS Architecture, Identity/SSO, Microservices, Relational Database Optimization, Applied ML.`;
        break;

      case "stack":
        response = `CORE STACK: ${techStack.map((t) => t.name).slice(0, 12).join(", ")}... and more.`;
        break;

      case "projects":
        response = (
          <div className="space-y-1">
            <p className="text-emerald-400 font-semibold">Indexed System Records:</p>
            {projects.map((p) => (
              <p key={p.id}>
                • <strong className="text-white">{p.shortName}</strong> [{p.category}] — {p.categoryLabel}
              </p>
            ))}
          </div>
        );
        break;

      case "identicore":
        response = `IdentiCore: Centralized Identity, OAuth 2.0 / OIDC & Token Delegation Gateway powered by Keycloak. Eliminates auth duplication across microservices.`;
        break;

      case "contact":
        response = (
          <div className="space-y-1">
            <p>Email: <a href={`mailto:${social.email}`} className="text-blue-400 underline">{social.email}</a></p>
            <p>GitHub: <a href={social.github} target="_blank" rel="noreferrer" className="text-blue-400 underline">{social.github}</a></p>
            <p>LinkedIn: <a href={social.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{social.linkedin}</a></p>
            <p>WhatsApp: <a href={social.whatsapp} target="_blank" rel="noreferrer" className="text-blue-400 underline">{social.phone}</a></p>
          </div>
        );
        break;

      case "ping":
        response = `64 bytes from shuv0.system: icmp_seq=1 ttl=64 time=0.42ms [ACKNOWLEDGED]`;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = `Command not recognized: "${rawCmd}". Type 'help' for valid system commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: response }]);
    setInput("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="mt-20 p-6 rounded border border-[var(--color-border)] bg-[#070709]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span
            className="ml-2 text-xs text-[var(--color-muted)] font-mono"
            style={{ fontSize: "0.6875rem" }}
          >
            shakir@shuv0-server:~ (interactive-cli)
          </span>
        </div>

        <span
          className="text-[0.625rem] font-mono text-[var(--color-muted-dim)] hidden sm:inline"
        >
          TTY // BASH_EMULATOR
        </span>
      </div>

      {/* Quick Action Chips for Fast Interaction */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4 pb-3 border-b border-[var(--color-border)]">
        <span className="text-[0.625rem] font-mono text-[var(--color-muted-dim)] mr-1">
          QUICK EXEC:
        </span>
        {commandList.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded text-[0.625rem] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-white transition-all cursor-pointer"
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Terminal Output Body */}
      <div className="font-mono text-xs text-[var(--color-text-secondary)] space-y-3 min-h-[140px] max-h-[300px] overflow-y-auto pr-2">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-[var(--color-primary)]">
              <span>visitor@shuv0:~$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4 text-[var(--color-text-secondary)] leading-relaxed">
              {item.output}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand();
        }}
        className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center gap-2"
      >
        <span className="font-mono text-xs text-[var(--color-primary)] select-none">
          visitor@shuv0:~$
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command (e.g. 'help', 'whoami', 'projects')..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-[var(--color-muted-dim)]"
          aria-label="Terminal command input"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[0.6875rem] font-mono text-[var(--color-primary)] hover:border-[var(--color-primary)] cursor-pointer"
        >
          EXEC
        </button>
      </form>
    </div>
  );
}
