"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── GSAP ScrollTrigger Plugin (lazy loaded) ────────────
let ScrollTriggerPlugin: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

async function ensureScrollTrigger() {
  if (!ScrollTriggerPlugin) {
    const mod = await import("gsap/ScrollTrigger");
    ScrollTriggerPlugin = mod.ScrollTrigger;
    gsap.registerPlugin(ScrollTriggerPlugin);
  }
  return ScrollTriggerPlugin;
}

// ─── Internal helpers ───────────────────────────────────
function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Make elements visible even if GSAP fails to animate them */
function ensureVisible(elements: NodeListOf<Element> | Element) {
  const els = elements instanceof NodeList ? Array.from(elements) : [elements];
  els.forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  });
}

// ─── Staggered Text Reveal ──────────────────────────────
export function useTextReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    triggerOnScroll?: boolean;
  }
) {
  // Stable ref for options
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");
    if (words.length === 0) return;

    if (prefersReducedMotion()) {
      ensureVisible(words);
      return;
    }

    const {
      delay = 0,
      stagger = 0.05,
      duration = 0.8,
      triggerOnScroll = false,
    } = optsRef.current || {};

    // Safety: reveal after timeout in case GSAP/ScrollTrigger fails
    const safetyTimer = setTimeout(() => ensureVisible(words), 3000);

    if (triggerOnScroll) {
      ensureScrollTrigger().then(() => {
        gsap.fromTo(
          words,
          { y: 35, opacity: 0, rotateX: -20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration,
            stagger,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onComplete: () => clearTimeout(safetyTimer),
          }
        );
      });
    } else {
      gsap.fromTo(
        words,
        { y: 40, opacity: 0, rotateX: -25 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration,
          stagger,
          delay,
          ease: "expo.out",
          onComplete: () => clearTimeout(safetyTimer),
        }
      );
    }

    return () => {
      clearTimeout(safetyTimer);
      gsap.killTweensOf(words);
    };
  }, [ref]);
}

// ─── Fade-In Up on Scroll ───────────────────────────────
export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
    start?: string;
  }
) {
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      ensureVisible(el);
      return;
    }

    const {
      delay = 0,
      duration = 0.9,
      y = 40,
      start = "top 85%",
    } = optsRef.current || {};

    const safetyTimer = setTimeout(() => ensureVisible(el), 3000);

    ensureScrollTrigger().then(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
          onComplete: () => clearTimeout(safetyTimer),
        }
      );
    });

    return () => {
      clearTimeout(safetyTimer);
      gsap.killTweensOf(el);
    };
  }, [ref]);
}

// ─── Parallax on Scroll ─────────────────────────────────
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number = 50
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    ensureScrollTrigger().then(() => {
      gsap.to(el, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      gsap.killTweensOf(el);
    };
  }, [ref, speed]);
}

// ─── Stagger children reveal on scroll ──────────────────
export function useStaggerReveal(
  ref: React.RefObject<HTMLElement | null>,
  childSelector: string = ".stagger-item",
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
  }
) {
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (children.length === 0) return;

    if (prefersReducedMotion()) {
      ensureVisible(children);
      return;
    }

    const {
      delay = 0,
      stagger = 0.08,
      duration = 0.6,
    } = optsRef.current || {};

    const safetyTimer = setTimeout(() => ensureVisible(children), 3000);

    ensureScrollTrigger().then(() => {
      gsap.fromTo(
        children,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onComplete: () => clearTimeout(safetyTimer),
        }
      );
    });

    return () => {
      clearTimeout(safetyTimer);
      gsap.killTweensOf(children);
    };
  }, [ref, childSelector]);
}

// ─── Utility: Split text into word spans ────────────────
export function SplitText({
  children,
  className,
  as: Tag = "div",
}: {
  children: string;
  className?: string;
  as?: React.ElementType;
}) {
  const words = children.split(" ");
  return (
    <Tag className={className} style={{ perspective: "600px" }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word inline-block"
          style={{
            willChange: "transform, opacity",
            transformOrigin: "center bottom",
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

// ─── Counter animation on scroll ────────────────────────
export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  endValue: number,
  duration: number = 2,
  suffix: string = ""
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = endValue + suffix;
      return;
    }

    const safetyTimer = setTimeout(() => {
      el.textContent = endValue + suffix;
    }, 4000);

    ensureScrollTrigger().then(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: endValue,
        duration,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
        onComplete: () => clearTimeout(safetyTimer),
      });
    });

    return () => {
      clearTimeout(safetyTimer);
      gsap.killTweensOf(el);
    };
  }, [ref, endValue, duration, suffix]);
}
