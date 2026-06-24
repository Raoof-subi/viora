"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      // Check if the target or any of its parents is a clickable element
      const isClickable = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer");
      setIsPointer(!!isClickable);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Hide on small devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Small dot that follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold pointer-events-none mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Outer ring that lags behind slightly */}
      <motion.div
        className="fixed top-0 left-0 z-[99] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold pointer-events-none mix-blend-screen flex items-center justify-center shadow-gold-glow backdrop-blur-[2px]"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.5 : 1,
          backgroundColor: isPointer ? "rgba(212, 175, 55, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <motion.span 
          className="text-[10px] font-bold text-gold uppercase tracking-widest"
          animate={{ opacity: isPointer ? 1 : 0, scale: isPointer ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
    </>
  );
}
