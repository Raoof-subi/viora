"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Eye } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeInUp } from "@/lib/motion";
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
}: {
  number: string;
  icon: typeof Target;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 20,
        delay,
      }}
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 md:p-10 transition-all duration-700 hover:border-gold/30 hover:shadow-luxury">
        {/* Background decorative number */}
        <div className="absolute -right-6 -top-6 select-none text-[120px] font-bold leading-none text-white/[0.02] md:text-[160px]">
          {number}
        </div>

        {/* Hover gradient sweep */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Animated border glow on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-3xl ring-1 ring-gold/20" />
          <div className="absolute inset-0 rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.1)]" />
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:from-gold/30 group-hover:to-gold/10">
            <Icon className="h-7 w-7" />
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl font-semibold text-white md:text-3xl drop-shadow-md">
            {title}
          </h3>

          {/* Gold divider */}
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-24" />

          {/* Text */}
          <p className="mt-6 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">
            {text}
          </p>
        </div>
      </div>
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
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Full-screen watermark */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[clamp(6rem,20vw,18rem)] font-bold text-white/[0.015] tracking-tight">
          V
        </span>
      </motion.div>

      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="ambient-glow animate-float bg-gold/10 w-[600px] h-[600px] top-[-15%] right-[-10%]" />
        <div className="ambient-glow animate-float bg-gold-dark/10 w-[500px] h-[500px] bottom-[10%] left-[-10%]" style={{ animationDelay: '3s' }} />
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        {/* Heading */}
        <motion.div
          variants={fadeInUp}
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
          className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg"
        >
          {about.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-2xl text-lg text-white/60 md:text-xl font-light"
        >
          {about.intro}
        </motion.p>

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-full origin-left bg-gradient-to-r from-gold/50 via-gold/20 to-transparent"
        />

        {/* Mission & Vision Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <MissionVisionCard
            number="01"
            icon={Target}
            title="Our Mission"
            text={about.mission}
            delay={0}
          />
          <MissionVisionCard
            number="02"
            icon={Eye}
            title="Our Vision"
            text={about.vision}
            delay={0.15}
          />
        </div>

        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          style={{ scale: statsScale, opacity: statsOpacity }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] via-white/[0.05] to-white/[0.03]">
            {/* Top decorative shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="grid grid-cols-3 divide-x divide-white/5">
              {about.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="relative py-10 text-center"
                >
                  {/* Decorative dot */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-gold/40" />

                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-serif text-4xl font-bold text-gold md:text-5xl drop-shadow-md"
                  />
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted/80">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom decorative shimmer */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
