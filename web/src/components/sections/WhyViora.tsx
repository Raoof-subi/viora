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
import { OrganicCard } from "@/components/ui/OrganicCard";
import { GradientBlob } from "@/components/ui/GradientBlob";
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

const glowColors = ["gold", "warm", "bronze", "gold"] as const;

export function WhyViora({ features }: WhyVioraProps) {
  return (
    <section id="why-viora" className="relative section-padding bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary overflow-hidden">
      <GradientBlob color="bronze" size="lg" className="top-[-10%] left-[30%] animate-pulse-glow" />
      <GradientBlob color="gold" size="md" className="bottom-[10%] right-[-10%]" />

      <div className="relative z-10 mx-auto max-w-7xl">
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
          {features.map((feature, idx) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            const glowColor = glowColors[idx % glowColors.length];
            return (
              <motion.div key={feature._id} variants={perspectiveReveal}>
                <OrganicCard glowColor={glowColor} className="h-full text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </OrganicCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
