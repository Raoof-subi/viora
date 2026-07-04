"use client";

import { useRef, useEffect } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { gsap } from "@/lib/gsap";
import type { ProcessStep } from "@/types";

interface ProcessProps {
  steps: ProcessStep[];
}

export function Process({ steps }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !sticky || !container || cards.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop: cards fly out AND then spread out side-by-side
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          pin: sticky,
          anticipatePin: 1,
        },
      });

      const total = cards.length;
      const durationPerCard = 0.35 / total;
      const colWidth = 100 / total;

      cards.forEach((card) => {
        card.style.position = "absolute";
        card.style.top = "0";
        card.style.bottom = "0";
      });

      gsap.set(cards, {
        xPercent: 0,
        scale: 1,
        opacity: 1,
        zIndex: (i) => total - i,
      });
      gsap.set(cards.slice(1), { xPercent: (_i) => _i * 8 + 8, scale: (_i) => 1 - (_i + 1) * 0.05 });

      tl.to(container, { width: "90vw", duration: 0.4, ease: "power3.inOut" }, 0.35);

      cards.forEach((card, i) => {
        const flyOutStart = 0.05 + i * durationPerCard;

        if (i > 0) {
          tl.to(
            card,
            {
              xPercent: 0,
              scale: 1,
              duration: durationPerCard * 0.5,
              ease: "power2.out",
              zIndex: total,
            },
            i * durationPerCard,
          );
        }

        tl.to(
          card,
          {
            y: "-120vh",
            opacity: 0,
            scale: 0.8,
            duration: durationPerCard * 0.5,
            ease: "power2.in",
            zIndex: total - i,
          },
          flyOutStart,
        );

        tl.to(
          card,
          {
            left: `${i * colWidth}%`,
            right: `${(total - 1 - i) * colWidth}%`,
            y: "8vh",
            opacity: 1,
            scale: 1,
            duration: durationPerCard * 0.8,
            ease: "back.out(1.5)",
            zIndex: 1,
          },
          0.4,
        );
      });
    });

    // Mobile: cards only fly out one by one, NO spreading out side-by-side
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          pin: sticky,
          anticipatePin: 1,
        },
      });

      const total = cards.length;
      const durationPerCard = 1 / total;

      cards.forEach((card) => {
        card.style.position = "absolute";
        card.style.top = "0";
        card.style.bottom = "0";
      });

      gsap.set(cards, {
        xPercent: 0,
        scale: 1,
        opacity: 1,
        zIndex: (i) => total - i,
      });
      gsap.set(cards.slice(1), { xPercent: (_i) => _i * 8 + 8, scale: (_i) => 1 - (_i + 1) * 0.05 });

      cards.forEach((card, i) => {
        const flyOutStart = i * durationPerCard;

        if (i > 0) {
          tl.to(
            card,
            {
              xPercent: 0,
              scale: 1,
              duration: durationPerCard * 0.3,
              ease: "power2.out",
              zIndex: total,
            },
            i * durationPerCard - durationPerCard * 0.25,
          );
        }

        tl.to(
          card,
          {
            y: "-120vh",
            opacity: 0,
            scale: 0.8,
            duration: durationPerCard * 0.75,
            ease: "power2.in",
            zIndex: total - i,
          },
          flyOutStart,
        );
      });
    });

    return () => mm.revert();
  }, [steps.length]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  return (
    <section id="process" ref={sectionRef} className="relative h-[400vh] md:h-[600vh]">
      <div ref={stickyRef} className="flex h-screen items-center justify-center overflow-visible">
        <GradientBlob color="gold" size="lg" className="top-[10%] left-[5%]" />
        <GradientBlob color="warm" size="md" className="bottom-[10%] right-[5%]" />

        <div className="absolute top-8 md:top-32 left-0 w-full z-10 px-6 md:px-12 lg:px-20 pointer-events-none">
          <SectionHeading
            title="Our Process"
            subtitle="A refined approach to delivering exceptional results"
            align="left"
          />
        </div>

        <div ref={containerRef} className="relative z-10 mt-36 md:mt-0 md:translate-y-24" style={{ width: "min(360px, calc(100vw - 3rem))", height: "min(500px, 60vh)" }}>
          {steps.map((step, index) => (
            <div
              key={step._id}
              ref={setCardRef(index)}
              className="absolute inset-0 rounded-2xl md:rounded-3xl border border-surface-border bg-bg-secondary shadow-card flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold-light/5 opacity-50 pointer-events-none" />

              <h2 className="relative z-10 font-serif text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mt-6 ml-6 md:mt-8 md:ml-8">
                0{step.step}
              </h2>

              <div className="relative z-10 pb-6 px-6 md:pb-10 md:px-8">
                <h3 className="font-serif text-xl md:text-3xl font-semibold text-white">
                  {step.title}
                </h3>
                <div className="mt-3 md:mt-4 h-px w-12 md:w-16 bg-gradient-to-r from-gold to-gold-light" />
                <p className="mt-4 md:mt-6 text-sm md:text-lg leading-relaxed text-white/70 font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
