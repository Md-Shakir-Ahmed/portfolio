"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
}

export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Skip entirely for reduced motion users
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isActive = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      // Fewer particles on mobile for performance
      const isMobile = width < 768;
      const maxCount = isMobile ? 40 : 80;
      const count = Math.min(Math.floor((width * height) / 18000), maxCount);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.25 + 0.03,
        targetOpacity: Math.random() * 0.25 + 0.03,
      }));
    };

    const draw = () => {
      if (!isActive) return;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const connectionDistance = width < 768 ? 80 : 100;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gentle opacity drift
        p.opacity += (p.targetOpacity - p.opacity) * 0.015;
        if (Math.random() < 0.003) {
          p.targetOpacity = Math.random() * 0.3 + 0.03;
        }

        // Mouse repulsion (desktop only)
        if (mx > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = ((120 - dist) / 120) * 0.3;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 155, 255, ${p.opacity})`;
        ctx.fill();

        // Draw sparse connections (skip some pairs for perf)
        for (let j = i + 1; j < particles.length; j += 2) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = dx2 * dx2 + dy2 * dy2;
          const maxDist2 = connectionDistance * connectionDistance;

          if (dist2 < maxDist2) {
            const alpha = (1 - Math.sqrt(dist2) / connectionDistance) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Pause when not visible (save battery)
    const handleVisibility = () => {
      if (document.hidden) {
        isActive = false;
        cancelAnimationFrame(animationRef.current);
      } else {
        isActive = true;
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    initParticles();
    animationRef.current = requestAnimationFrame(draw);

    const resizeHandler = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", resizeHandler);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeHandler);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className || ""}`}
      style={{ opacity: 0.5 }}
      aria-hidden="true"
    />
  );
}
