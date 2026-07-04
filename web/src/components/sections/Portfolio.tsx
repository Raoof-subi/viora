"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { PortfolioLightbox } from "@/components/ui/PortfolioLightbox";
import { portfolioCategories } from "@/data/sample";
import { gsap, Flip, ScrollTrigger } from "@/lib/gsap";
import type { PortfolioItem } from "@/types";

interface PortfolioProps {
  items: PortfolioItem[];
}

type LayoutSize = "large" | "medium" | "wide";

const layoutPattern: LayoutSize[] = [
  "large", "medium", "medium", "wide",
];

const layoutClasses: Record<LayoutSize, string> = {
  large: "col-span-1 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/3] sm:aspect-auto",
  medium: "col-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1 aspect-[4/3] sm:aspect-auto",
  wide: "col-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1 aspect-[16/9] sm:aspect-auto",
};

function buildCategoryCounts(items: PortfolioItem[]) {
  const counts: Record<string, number> = { all: Math.min(items.length, 4) };
  for (const cat of portfolioCategories) {
    if (cat.id === "all") continue;
    const catItems = items.filter((i) => i.category === cat.id);
    counts[cat.id] = Math.min(catItems.length, 4);
  }
  return counts;
}

export function Portfolio({ items }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const filtered = (
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory)
  ).slice(0, 4);

  const categoryCounts = buildCategoryCounts(items);

  const setCardRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  }, []);

  const handleFilterChange = useCallback(
    (catId: string) => {
      const grid = gridRef.current;
      if (!grid) return;

      const state = Flip.getState(".bento-item", { props: "transform,opacity" });

      gsap.set(".bento-item", { opacity: 0, scale: 0.92, filter: "blur(6px)" });

      setActiveCategory(catId);

      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.out",
          scale: true,
          absolute: true,
          onComplete: () => {
            gsap.to(".bento-item", {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              stagger: { each: 0.05, from: "start" },
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });
      });
    },
    [],
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".bento-item", {
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { opacity: 0, y: 50, filter: "blur(8px)", scale: 0.93 },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              stagger: 0.06,
              duration: 0.8,
              ease: "power3.out",
            },
          );
        },
        start: "top 88%",
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!filterRef.current || !underlineRef.current) return;

    const activeBtn = filterRef.current.querySelector(`[data-cat="${activeCategory}"]`);
    if (!activeBtn) return;

    gsap.to(underlineRef.current, {
      left: (activeBtn as HTMLElement).offsetLeft,
      width: (activeBtn as HTMLElement).offsetWidth,
      top: (activeBtn as HTMLElement).offsetTop,
      height: (activeBtn as HTMLElement).offsetHeight,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [activeCategory]);

  const handleCardHover = useCallback(
    (id: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRefs.current.get(id);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      gsap.to(card.querySelector(".parallax-image") as HTMLElement, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [],
  );

  const handleCardLeave = useCallback((id: string) => () => {
    const card = cardRefs.current.get(id);
    if (!card) return;
    gsap.to(card.querySelector(".parallax-image") as HTMLElement, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? filtered.length - 1 : prev - 1,
    );
  const nextLightbox = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : prev === filtered.length - 1 ? 0 : prev + 1,
    );

  return (
    <>
      <section id="portfolio" className="relative section-padding overflow-hidden">
        <GradientBlob color="gold" size="lg" className="top-[10%] right-[-15%] animate-pulse-glow" />
        <GradientBlob color="bronze" size="md" className="bottom-[20%] left-[-10%]" />

        <div className="relative mx-auto max-w-7xl z-10">
          <SectionHeading
            title="Our Portfolio"
            subtitle="A curated selection of our finest work across disciplines"
          />

          <div ref={filterRef} className="relative mx-auto mb-14 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1 rounded-full border border-surface-border bg-bg-secondary/40 backdrop-blur-md max-w-max z-10">
            {portfolioCategories.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  data-cat={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`relative px-4 py-2 text-[10px] sm:text-xs uppercase tracking-widest transition-colors duration-300 rounded-full z-10 ${
                    activeCategory === cat.id
                      ? "text-gold font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat.label}
                  <span className="ml-1 text-[9px] opacity-60">({count})</span>
                </button>
              );
            })}

            <div
              ref={underlineRef}
              className="absolute bg-gradient-to-r from-gold/15 to-gold-light/5 border border-gold/15 rounded-full z-0 pointer-events-none"
              style={{ width: 0 }}
            />
          </div>

          <div
            ref={gridRef}
            className="grid auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[260px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filtered.map((item, index) => {
              const layout = layoutPattern[index % layoutPattern.length];
              const cls = layoutClasses[layout];

              return (
                <article
                  key={item._id}
                  ref={setCardRef(item._id)}
                  onMouseMove={handleCardHover(item._id)}
                  onMouseLeave={handleCardLeave(item._id)}
                  onClick={() => openLightbox(index)}
                  className={`bento-item group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer ${cls}`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-surface-border transition-all duration-500">
                    
                    {/* Glowing gold border overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-transparent bg-gradient-to-r from-gold/50 via-gold-light/80 to-gold-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] -mask-composite:source-out p-[1.5px]" />

                    <div className="parallax-image absolute -inset-2 transition-transform duration-700 scale-110">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Ambient subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/40 to-transparent opacity-80 sm:opacity-50 transition-opacity duration-500 group-hover:opacity-85" />
                    
                    {/* Golden overlay shine on hover */}
                    <div className="absolute inset-0 bg-gold/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Floating Glassmorphic Metadata Panel */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/[0.06] bg-bg-secondary/70 backdrop-blur-md shadow-luxury transition-all duration-500 ease-out z-10
                      translate-y-0 opacity-100 
                      sm:translate-y-6 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] sm:text-xs uppercase tracking-[0.25em] text-gold-light font-semibold">
                            {item.category}
                          </span>
                          <span className="text-[9px] sm:text-xs text-white/50 font-mono">
                            {item.year}
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight mt-0.5">
                          {item.title}
                        </h3>
                        
                        <div className="h-[1px] w-full bg-white/[0.08] mt-2 mb-1" />
                        
                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/70 font-light">
                          <span>{item.client}</span>
                          <span className="text-gold flex items-center gap-1 font-medium group-hover:underline">
                            View Work &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )}
            )}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={filtered}
          activeIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </>
  );
}
