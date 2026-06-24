"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { wordReveal, staggerContainer, defaultViewport, viewportFade } from "@/lib/motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "mb-6 flex items-center gap-4",
          align === "center" && "justify-center"
        )}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold drop-shadow-md">Viora</span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportFade}
        className={cn("flex flex-wrap gap-x-3 gap-y-1 overflow-hidden", align === "center" && "justify-center")}
        style={{ perspective: 1200 }}
      >
        {words.map((word, index) => (
          <motion.h2
            key={index}
            variants={wordReveal}
            className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg"
          >
            {word}
          </motion.h2>
        ))}
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
