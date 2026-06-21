"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Calendar,
  Camera,
  Share2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Calendar,
  Camera,
  Share2,
  TrendingUp,
};

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-black via-zinc-950/50 to-black">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive creative solutions tailored for luxury brands"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Palette;
            const isHovered = hoveredId === service._id;

            return (
              <motion.div key={service._id} variants={fadeInUp}>
                <GlassCard
                  className="group relative h-full min-h-[280px] cursor-pointer overflow-hidden"
                  hover={false}
                >
                  <div
                    onMouseEnter={() => setHoveredId(service._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="h-full"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-2 overflow-hidden border-t border-white/10 pt-4"
                        >
                          {service.subServices.map((sub) => (
                            <li
                              key={sub}
                              className="flex items-center gap-2 text-sm text-gold/80"
                            >
                              <span className="h-1 w-1 rounded-full bg-gold" />
                              {sub}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
