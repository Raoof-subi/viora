"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeInUp,
  scaleReveal,
  clipReveal,
  perspectiveReveal,
  slideInLeft,
  slideInRight,
  staggerContainer,
  defaultViewport,
} from "@/lib/motion";

const variantMap: Record<string, Variants> = {
  fadeInUp,
  scaleReveal,
  clipReveal,
  perspectiveReveal,
  slideInLeft,
  slideInRight,
  staggerContainer,
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?:
    | "fadeInUp"
    | "scaleReveal"
    | "clipReveal"
    | "perspectiveReveal"
    | "slideInLeft"
    | "slideInRight"
    | "staggerContainer";
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span";
}

export function ScrollReveal({
  children,
  variant = "fadeInUp",
  delay = 0,
  className,
  as = "div",
}: ScrollRevealProps) {
  const selected = variantMap[variant] ?? fadeInUp;

  const variants: Variants = {
    hidden: selected.hidden,
    visible: {
      ...selected.visible,
      transition: {
        ...(typeof selected.visible === "object" && selected.visible !== null && "transition" in selected.visible
          ? (selected.visible as { transition?: Record<string, unknown> }).transition
          : {}),
        delay,
      },
    },
  };

  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
