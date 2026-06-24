"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Workflow,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { perspectiveReveal, staggerContainer, viewportFade } from "@/lib/motion";
import type { Feature } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Brain,
  Workflow,
  BarChart3,
};

interface WhyVioraProps {
  features: Feature[];
}

export function WhyViora({ features }: WhyVioraProps) {
  return (
    <section id="why-viora" className="section-padding bg-gradient-to-b from-black via-zinc-950/30 to-black">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Why Choose Viora"
          subtitle="The difference that sets us apart in luxury creative services"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportFade}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: 1200 }}
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            return (
              <motion.div key={feature._id} variants={perspectiveReveal}>
                <GlassCard className="h-full text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
