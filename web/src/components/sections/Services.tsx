"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  const setVideoRef = useCallback((id: string) => (el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(id, el);
    } else {
      videoRefs.current.delete(id);
    }
  }, []);

  return (
    <section id="services" className="relative section-padding bg-black overflow-hidden z-10">
      <ParallaxGlow
        className="bg-gold/5 w-[500px] h-[500px] top-[20%] left-[-15%]"
        speed={0.3}
      />
      <ParallaxGlow
        className="bg-gold/10 w-[600px] h-[600px] bottom-[-10%] right-[-10%]"
        speed={0.5}
      />

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
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1200 }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Palette;
            const isHovered = hoveredId === service._id;

            return (
              <motion.div key={service._id} variants={scaleReveal}>
                <GlassCard className="group relative h-full min-h-[280px] cursor-pointer overflow-hidden transform-gpu">
                  {/* Video background — always mounted, toggled via opacity */}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/60" />
                    </div>
                  )}

                  <div
                    onMouseEnter={() => handleMouseEnter(service._id)}
                    onMouseLeave={() => handleMouseLeave(service._id)}
                    className="relative z-10 h-full"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-black group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted group-hover:text-white/80 transition-colors duration-300">
                      {service.description}
                    </p>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2 overflow-hidden border-t border-white/10"
                    >
                      <div className="pt-4">
                        {service.subServices.map((sub) => (
                          <div
                            key={sub}
                            className="flex items-center gap-2 text-sm text-gold-light drop-shadow-sm"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
                            {sub}
                          </div>
                        ))}
                      </div>
                    </motion.div>
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

function ParallaxGlow({
  className,
  speed = 0.2,
}: {
  className: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute pointer-events-none z-0 ambient-glow ${className}`}
    />
  );
}
