"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { AboutContent } from "@/types";

interface AboutProps {
  about: AboutContent;
}

export function About({ about }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      <motion.div
        style={{ y: lineY }}
        className="pointer-events-none absolute right-0 top-1/4 hidden h-96 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent lg:block"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading title={about.title} subtitle={about.intro} align="left" />

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="mb-3 font-serif text-2xl text-gold">Mission</h3>
              <p className="leading-relaxed text-muted">{about.mission}</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="mb-3 font-serif text-2xl text-gold">Vision</h3>
              <p className="leading-relaxed text-muted">{about.vision}</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
          >
            {about.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="glass-card rounded-3xl p-8 text-center"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-serif text-5xl font-bold text-gold md:text-6xl"
                />
                <p className="mt-3 text-sm uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
