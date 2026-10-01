"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 600, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 35 });

  useEffect(() => {
    // Only enable on desktop with pointer device
    if ("ontouchstart" in window) return;
    const mql = window.matchMedia("(hover: hover) and (min-width: 768px)");
    if (!mql.matches) return;

    // Add custom cursor class to body (enables cursor:none in CSS)
    document.body.classList.add("has-custom-cursor");

    // Store reference to currently hovered element
    let hoveredElement: HTMLElement | null = null;
    let originalTransform = "";

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Magnetic pull logic
      if (hoveredElement && hoveredElement.hasAttribute("data-magnetic")) {
        const rect = hoveredElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center (max 0.3 factor)
        const dx = (e.clientX - centerX) * 0.3;
        const dy = (e.clientY - centerY) * 0.3;
        
        // Use gsap if available, otherwise fallback to style
        hoveredElement.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        hoveredElement.style.transition = "transform 0.1s ease-out";
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const closest = target.closest("[data-magnetic], [data-cursor-label], a, button") as HTMLElement;
      if (closest) {
        setIsHovering(true);
        if (closest.hasAttribute("data-magnetic")) {
          hoveredElement = closest;
          originalTransform = closest.style.transform;
        }
      }
    };

    const handleElementLeave = (e: Event) => {
      setIsHovering(false);
      if (hoveredElement) {
        // Reset transform smoothly
        hoveredElement.style.transform = originalTransform || "translate3d(0,0,0)";
        hoveredElement.style.transition = "transform 0.5s ease-out";
        
        // Remove style after transition if it was empty originally
        if (!originalTransform) {
          setTimeout(() => {
             if (hoveredElement && !hoveredElement.style.transform.includes('translate3d')) {
               hoveredElement.style.transform = "";
             }
          }, 500);
        }
        hoveredElement = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseout", handleElementLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseout", handleElementLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          width: isHovering ? 48 : isClicking ? 6 : 10,
          height: isHovering ? 48 : isClicking ? 6 : 10,
          borderRadius: "50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="bg-white"
      />
    </motion.div>
  );
}
