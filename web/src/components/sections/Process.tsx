"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { ProcessStep } from "@/types";

interface ProcessProps {
  steps: ProcessStep[];
}

export function Process({ steps }: ProcessProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="section-padding bg-gradient-to-b from-black via-zinc-950/50 to-black">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Our Process"
          subtitle="A refined approach to delivering exceptional results"
        />

        <div className="relative">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block md:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-gold via-gold to-gold/30"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 md:space-y-24"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step._id}
                variants={fadeInUp}
                className={`relative flex flex-col gap-8 md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div className="glass-card rounded-3xl p-8">
                    <span className="font-serif text-5xl font-bold text-gold/30">
                      0{step.step}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-8 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-black md:left-1/2 md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
