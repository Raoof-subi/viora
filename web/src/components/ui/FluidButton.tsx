"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FluidButtonProps extends ButtonProps {
  gradient?: "gold-warm" | "warm-bronze" | "bronze-light" | "light-gold";
}

const gradientMap: Record<string, string> = {
  "gold-warm": "from-gold via-gold-warm to-gold",
  "warm-bronze": "from-gold-warm via-gold-bronze to-gold-warm",
  "bronze-light": "from-gold-bronze via-gold-light to-gold-bronze",
  "light-gold": "from-gold-light via-gold via-gold-light",
};

export function FluidButton({
  className,
  gradient = "gold-warm",
  variant = "default",
  children,
  ...props
}: FluidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.15;
    const y = (e.clientY - top - height / 2) * 0.15;
    setPosition({ x, y });
  };

  const gradientClass = gradientMap[gradient] ?? gradientMap["gold-warm"];

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative inline-block"
    >
      {variant === "default" && (
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-gold-light via-gold to-gold-deep opacity-75 blur-sm group-hover:opacity-100 transition duration-500" />
      )}
      <Button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPosition({ x: 0, y: 0 })}
        variant={variant}
        className={cn(
          "relative transition-all duration-300",
          variant === "default" &&
            cn("bg-gradient-to-r gradient-shift text-black border-0 shadow-glow-violet hover:shadow-glow-cyan", gradientClass),
          variant === "outline" &&
            "border-gold/30 bg-transparent text-gold hover:bg-gold/10 hover:border-gold",
          variant === "ghost" &&
            "text-text-secondary hover:text-gold hover:bg-gold/5",
          className,
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        {variant === "default" && (
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-45deg] animate-[shine_3s_ease-in-out_infinite]" />
        )}
      </Button>
    </motion.div>
  );
}
