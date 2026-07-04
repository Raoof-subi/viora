"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import type { PortfolioItem } from "@/types";

interface PortfolioLightboxProps {
  items: PortfolioItem[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PortfolioLightbox({
  items,
  activeIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: PortfolioLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(activeIndex);
  const item = items[activeIndex];

  const animateOpen = useCallback(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    tl.fromTo(contentRef.current, { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
    tl.fromTo(infoRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
  }, []);

  const animateClose = useCallback(
    (callback: () => void) => {
      const tl = gsap.timeline({
        onComplete: callback,
      });
      tl.to(infoRef.current, { opacity: 0, y: 10, duration: 0.2, ease: "power2.in" });
      tl.to(contentRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" }, "-=0.15");
      tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" }, "-=0.15");
    },
    [],
  );

  const animateSlide = useCallback(
    (direction: "prev" | "next") => {
      const x = direction === "next" ? 60 : -60;
      gsap.fromTo(contentRef.current, { opacity: 0, x, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(infoRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.1 });
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return;

    if (activeIndex !== prevIndexRef.current) {
      animateSlide(activeIndex > prevIndexRef.current ? "next" : "prev");
    } else {
      animateOpen();
    }
    prevIndexRef.current = activeIndex;
  }, [isOpen, activeIndex, animateOpen, animateSlide]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        animateClose(onClose);
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onPrev, onNext, animateClose]);

  const handleClose = () => {
    animateClose(onClose);
  };

  if (!isOpen || !item) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-bg-primary/80 text-text-secondary transition-colors hover:border-gold/30 hover:text-gold md:top-8 md:right-8"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-surface-border bg-bg-primary/80 text-text-secondary transition-colors hover:border-gold/30 hover:text-gold md:left-6"
        aria-label="Previous project"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-surface-border bg-bg-primary/80 text-text-secondary transition-colors hover:border-gold/30 hover:text-gold md:right-6"
        aria-label="Next project"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto flex w-full max-w-6xl flex-col-reverse gap-6 px-4 md:flex-row md:gap-10 md:px-8"
      >
        <div ref={imageRef} className="relative w-full md:flex-[2] aspect-[4/3] md:aspect-auto md:max-h-[80vh] overflow-hidden rounded-2xl md:rounded-3xl">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>

        <div ref={infoRef} className="flex flex-col justify-end md:flex-1 md:py-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            {item.category}
          </span>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
            {item.title}
          </h3>
          <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-base">
            {item.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm text-text-secondary">
              {item.client}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span className="text-sm text-gold-light">{item.year}</span>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  const diff = i - activeIndex;
                  if (diff > 0) for (let j = 0; j < diff; j++) onNext();
                  else for (let j = 0; j < Math.abs(diff); j++) onPrev();
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
