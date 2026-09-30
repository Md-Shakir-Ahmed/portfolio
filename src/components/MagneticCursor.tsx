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

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-magnetic], [data-cursor-label], a, button")) {
        setIsHovering(true);
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
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
