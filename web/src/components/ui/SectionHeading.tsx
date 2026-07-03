"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { wordBloom, staggerContainer, defaultViewport, viewportFade } from "@/lib/motion";

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
        "mb-10 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportFade}
        className={cn(
          "flex flex-wrap gap-x-3 gap-y-1 overflow-hidden",
          align === "center" && "justify-center",
        )}
      >
        {words.map((word, index) => (
          <motion.h2
            key={index}
            variants={wordBloom}
            className="font-serif text-4xl font-bold tracking-tight gradient-text md:text-5xl lg:text-6xl"
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
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
