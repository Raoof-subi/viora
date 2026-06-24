"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { portfolioCategories } from "@/data/sample";
import { clipReveal } from "@/lib/motion";
import type { PortfolioItem, PortfolioCategory } from "@/types";

interface PortfolioProps {
  items: PortfolioItem[];
}

export function Portfolio({ items }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative section-padding overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="ambient-glow animate-float bg-gold-dark/10 w-[700px] h-[700px] top-[10%] left-[20%]" style={{ animationDelay: '1s' }} />
        <div className="ambient-glow animate-float bg-white/5 w-[500px] h-[500px] bottom-[20%] right-[-10%]" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        <SectionHeading
          title="Our Portfolio"
          subtitle="A curated selection of our finest work across disciplines"
        />

        <ScrollReveal variant="fadeInUp" className="mb-12 flex flex-wrap justify-center gap-3">
          <div className="glass-card rounded-full p-2 flex flex-wrap gap-2 shadow-[0_0_20px_rgba(212,175,55,0.05)] border-gold/10">
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative rounded-full px-6 py-2.5 text-sm uppercase tracking-widest transition-colors ${
                  activeCategory === cat.id
                    ? "text-black font-semibold"
                    : "text-muted hover:text-gold"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="portfolioFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark shadow-gold-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.article
                key={item._id}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer ${
                  index % 5 === 0 ? "sm:col-span-2 sm:row-span-1" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/5 transition-all duration-500 hover:border-gold/30 hover:shadow-luxury">
                  <motion.div
                    variants={clipReveal}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                  
                  {/* Glowing Overlay */}
                  <div className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="mb-2 text-xs uppercase tracking-[0.2em] text-gold-light drop-shadow-md">
                      {item.category as PortfolioCategory}
                    </span>
                    <h3 className="font-serif text-3xl font-semibold text-white drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 font-light">
                      {item.client} &middot; {item.year}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
