"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBlobProps {
  className?: string;
  color?: "gold" | "warm" | "bronze" | "pale";
  size?: "sm" | "md" | "lg";
  parallax?: boolean;
  parallaxSpeed?: number;
}

const colorMap: Record<string, string> = {
  gold: "bg-gold/30",
  warm: "bg-gold-warm/30",
  bronze: "bg-gold-bronze/30",
  pale: "bg-gold-pale/30",
};

const sizeMap: Record<string, string> = {
  sm: "w-[180px] h-[180px] md:w-[300px] md:h-[300px]",
  md: "w-[240px] h-[240px] md:w-[500px] md:h-[500px]",
  lg: "w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px]",
};

export function GradientBlob({
  className,
  color = "gold",
  size = "lg",
  parallax = false,
  parallaxSpeed = 0.2,
}: GradientBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallaxSpeed * 120, parallaxSpeed * -120]);

  const colorClass = colorMap[color] ?? colorMap.gold;
  const sizeClass = sizeMap[size] ?? sizeMap.lg;

  const blob = (
    <div
      ref={ref}
      className={cn("ambient-blob", colorClass, sizeClass, className)}
      aria-hidden="true"
    />
  );

  if (parallax) {
    return <motion.div style={{ y }} className="absolute pointer-events-none z-0">{blob}</motion.div>;
  }

  return blob;
}
