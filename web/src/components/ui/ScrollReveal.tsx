"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
  duration?: number;
  blur?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
  duration = 0.8,
  blur = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dirMap = {
      up: { y: 50, x: 0 },
      down: { y: -50, x: 0 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 },
    };

    const { x, y } = dirMap[direction];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          x,
          filter: blur ? "blur(8px)" : "blur(0px)",
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [direction, delay, duration, blur]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
