"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { portfolioCategories } from "@/data/sample";
import { gsap, Flip, ScrollTrigger } from "@/lib/gsap";
import type { PortfolioItem, PortfolioCategory } from "@/types";

interface PortfolioProps {
  items: PortfolioItem[];
}

export function Portfolio({ items }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const prevItemsRef = useRef<PortfolioItem[]>([]);

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const animateFilter = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    prevItemsRef.current = filtered;
    const state = Flip.getState(".portfolio-item", { props: "transform,opacity" });

    gsap.set(".portfolio-item", {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
    });

    gsap.to(".portfolio-item", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      stagger: { each: 0.06, from: "start" },
      duration: 0.6,
      ease: "power2.out",
    });

    Flip.from(state, {
      duration: 0.5,
      stagger: 0.04,
      ease: "power2.out",
      scale: true,
      absolute: true,
    });
  }, [filtered]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".portfolio-item", {
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { opacity: 0, y: 40, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.08, duration: 0.8, ease: "power2.out" },
          );
        },
        start: "top 85%",
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setTimeout(animateFilter, 50);
  };

  return (
    <section id="portfolio" className="relative section-padding overflow-hidden">
      <GradientBlob color="gold" size="lg" className="top-[10%] right-[-15%] animate-pulse-glow" />
      <GradientBlob color="bronze" size="md" className="bottom-[20%] left-[-10%]" />

      <div className="relative mx-auto max-w-7xl z-10">
        <SectionHeading
          title="Our Portfolio"
          subtitle="A curated selection of our finest work across disciplines"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <div className="organic-card rounded-full p-2 flex flex-wrap gap-2 border-surface-border">
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative rounded-full px-6 py-2.5 text-sm uppercase tracking-widest transition-colors ${
                  activeCategory === cat.id
                    ? "text-black font-semibold"
                    : "text-text-secondary hover:text-gold"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="portfolioFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {filtered.map((item, index) => (
            <article
              key={item._id}
              className={`portfolio-item group relative overflow-hidden rounded-3xl cursor-pointer ${
                index % 5 === 0 ? "sm:col-span-2 sm:row-span-1" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-surface-border transition-all duration-500 hover:border-gold/20">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                  className="w-full h-full"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                <div className="absolute inset-0 bg-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="mb-2 text-xs uppercase tracking-[0.2em] text-gold-light">
                    {item.category as PortfolioCategory}
                  </span>
                  <h3 className="font-serif text-3xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 font-light">
                    {item.client} &middot; {item.year}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
