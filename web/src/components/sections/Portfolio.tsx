"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioCategories } from "@/data/sample";
import { fadeInUp } from "@/lib/motion";
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
    <section id="portfolio" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Our Portfolio"
          subtitle="A curated selection of our finest work across disciplines"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative rounded-full px-6 py-2.5 text-sm uppercase tracking-widest transition-colors ${
                activeCategory === cat.id
                  ? "text-black"
                  : "text-muted hover:text-gold"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="portfolioFilter"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.article
                key={item._id}
                layout
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-3xl ${
                  index % 5 === 0 ? "sm:col-span-2 sm:row-span-1" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="mb-1 text-xs uppercase tracking-widest text-gold">
                      {item.category as PortfolioCategory}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
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
