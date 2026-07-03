"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrganicCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: "gold" | "warm" | "bronze" | "pale";
}

const glowMap: Record<string, string> = {
  gold: "rgba(212, 175, 55, 0.08)",
  warm: "rgba(198, 148, 46, 0.08)",
  bronze: "rgba(154, 123, 46, 0.08)",
  pale: "rgba(240, 215, 140, 0.08)",
};

export function OrganicCard({
  children,
  className,
  hover = true,
  glowColor = "gold",
}: OrganicCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const glow = glowMap[glowColor] ?? glowMap.gold;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn("organic-card relative overflow-hidden p-6", className)}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-500"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${glow}, transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: opacity * 0.5,
          background:
            "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(232,197,71,0.06) 50%, rgba(184,150,46,0.06) 100%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
