"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { OrganicCard } from "@/components/ui/OrganicCard";
import { fadeInUp } from "@/lib/motion";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="testimonials" ref={sectionRef} className="relative section-padding overflow-hidden">
      <GradientBlob color="gold" size="lg" className="top-[20%] left-[-15%] animate-pulse-glow" />
      <GradientBlob color="warm" size="md" className="bottom-[10%] right-[-10%]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Client Testimonials"
          subtitle="Trusted by leading luxury brands worldwide"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_80%] lg:flex-[0_0_60%]"
                >
                  <OrganicCard glowColor="gold" className="mx-auto max-w-3xl p-8 md:p-12">
                    <motion.div style={{ y: quoteY }}>
                      <Quote className="mb-6 h-10 w-10 text-accent-violet/40" />
                    </motion.div>
                    <blockquote className="font-serif text-xl leading-relaxed text-text-primary md:text-2xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-accent-violet/30">
                        <Image
                          src={testimonial.photoUrl}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{testimonial.name}</p>
                        <p className="text-sm gradient-text">{testimonial.company}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className="text-accent-warm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </OrganicCard>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={scrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-surface-border text-text-secondary transition-colors hover:border-accent-violet/30 hover:text-accent-violet"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? "w-8 bg-accent-violet"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-surface-border text-text-secondary transition-colors hover:border-accent-violet/30 hover:text-accent-violet"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
