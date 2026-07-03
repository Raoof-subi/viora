"use client";

import { motion } from "framer-motion";

export function MarqueeText() {
  const text = "LUXURY • STRATEGY • DESIGN • DEVELOPMENT • MARKETING • ";

  return (
    <div className="relative py-8 flex overflow-hidden border-y border-surface-border bg-bg-secondary/50 backdrop-blur-md">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <div className="flex gap-4 px-4 text-2xl md:text-3xl lg:text-4xl font-serif text-white/10 tracking-widest uppercase">
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </motion.div>
    </div>
  );
}
