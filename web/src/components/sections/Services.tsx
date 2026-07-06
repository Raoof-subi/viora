"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Calendar,
  Camera,
  Share2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrganicCard } from "@/components/ui/OrganicCard";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { scaleReveal, defaultViewport } from "@/lib/motion";
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
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredId(id);
    const video = videoRefs.current.get(id);
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback((id: string) => {
    const video = videoRefs.current.get(id);
    if (video) {
      video.pause();
    }
    setHoveredId(null);
  }, []);

  const setVideoRef = useCallback(
    (id: string) => (el: HTMLVideoElement | null) => {
      if (el) {
        videoRefs.current.set(id, el);
      } else {
        videoRefs.current.delete(id);
      }
    },
    [],
  );

  const glowColors = ["gold", "warm", "bronze"] as const;

  return (
    <section id="services" className="relative px-6 py-12 md:px-12 md:py-24 lg:px-20 lg:py-32 bg-bg-primary overflow-hidden z-10">
      <GradientBlob color="gold" size="lg" className="top-[20%] left-[-15%]" parallax parallaxSpeed={0.3} />
      <GradientBlob color="warm" size="md" className="bottom-[-10%] right-[-10%]" />

      <div className="relative mx-auto max-w-7xl z-10">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive creative solutions tailored for luxury brands"
        />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1200 }}
        >
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] ?? Palette;
            const isHovered = hoveredId === service._id;
            const glowColor = glowColors[idx % glowColors.length];

            return (
              <motion.div key={service._id} variants={scaleReveal}>
                <OrganicCard
                  glowColor={glowColor}
                  className="group relative h-full min-h-[130px] md:min-h-[280px] cursor-pointer overflow-hidden transform-gpu p-4 md:p-6"
                >
                  {service.videoUrl && (
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <video
                        ref={setVideoRef(service._id)}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        src={service.videoUrl}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/75 to-bg-primary/60" />
                    </div>
                  )}

                  <div
                    onMouseEnter={() => handleMouseEnter(service._id)}
                    onMouseLeave={() => handleMouseLeave(service._id)}
                    className="relative z-10 h-full"
                  >
                    <div className="flex flex-row items-center gap-3 mb-2 md:flex-col md:items-start md:mb-4">
                      <div className="flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold/80 group-hover:scale-110 group-hover:text-black shrink-0">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <h3 className="font-serif text-lg md:text-2xl font-semibold text-text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-1 md:mt-3 text-xs md:text-sm leading-relaxed text-text-secondary transition-colors duration-300 group-hover:text-text-primary/80">
                      {service.description}
                    </p>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 md:mt-4 space-y-2 overflow-hidden border-t border-surface-border"
                    >
                      <div className="pt-2 md:pt-4">
                        {service.subServices.map((sub) => (
                          <div
                            key={sub}
                            className="flex items-center gap-2 text-xs md:text-sm text-gold-light"
                          >
                            <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-gold" />
                            {sub}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </OrganicCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
