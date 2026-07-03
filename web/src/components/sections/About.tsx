"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Eye } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { OrganicCard } from "@/components/ui/OrganicCard";
import { bloomIn } from "@/lib/motion";
import type { AboutContent } from "@/types";

interface AboutProps {
  about: AboutContent;
}

function MissionVisionCard({
  number,
  icon: Icon,
  title,
  text,
  delay,
  glowColor,
}: {
  number: string;
  icon: typeof Target;
  title: string;
  text: string;
  delay: number;
    glowColor: "gold" | "warm";

}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay,
      }}
      className="group relative"
    >
      <OrganicCard glowColor={glowColor} className="h-full p-8 md:p-10">
        <div className="absolute -right-6 -top-6 select-none text-[120px] font-bold leading-none text-white/[0.015] md:text-[160px]">
          {number}
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/20">
            <Icon className="h-7 w-7" />
          </div>

          <h3 className="font-serif text-2xl font-semibold text-white md:text-3xl">
            {title}
          </h3>

          <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-24" />

          <p className="mt-6 leading-relaxed text-text-secondary transition-colors duration-500 group-hover:text-text-primary/90">
            {text}
          </p>
        </div>
      </OrganicCard>
    </motion.div>
  );
}

export function About({ about }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ["start center", "end center"],
  });
  const statsScale = useTransform(statsProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const statsOpacity = useTransform(statsProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[clamp(6rem,20vw,18rem)] font-bold text-white/[0.015] tracking-tight">
          V
        </span>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <GradientBlob color="gold" size="lg" className="top-[-15%] right-[-10%] animate-pulse-glow" parallax parallaxSpeed={0.3} />
        <GradientBlob color="warm" size="md" className="bottom-[10%] left-[-10%]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <motion.div
          variants={bloomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            About Us
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          {about.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-2xl text-lg text-white/50 md:text-xl font-light"
        >
          {about.intro}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-full origin-left bg-gradient-to-r from-gold/50 via-gold/20 to-transparent"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <MissionVisionCard
            number="01"
            icon={Target}
            title="Our Mission"
            text={about.mission}
            delay={0}
            glowColor="gold"
          />
          <MissionVisionCard
            number="02"
            icon={Eye}
            title="Our Vision"
            text={about.vision}
            delay={0.15}
            glowColor="warm"
          />
        </div>

        <motion.div
          ref={statsRef}
          style={{ scale: statsScale, opacity: statsOpacity }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-gradient-to-r from-surface via-surface-hover to-surface">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
              {about.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="relative py-10 text-center"
                >
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-gold/40" />

                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-serif text-4xl font-bold gradient-text md:text-5xl"
                  />
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-text-muted/80">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
