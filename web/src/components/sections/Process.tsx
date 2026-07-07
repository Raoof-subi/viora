"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientBlob } from "@/components/ui/GradientBlob";
import type { ProcessStep } from "@/types";

interface ProcessProps {
  steps: ProcessStep[];
}

const CARD_W = 450;
const CARD_GAP = 64;
const AUTO_INTERVAL = 4000;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function CardContent({ step }: { step: ProcessStep }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-light/5 opacity-50 pointer-events-none" />
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
    </>
  );
}

export function Process({ steps }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [vpWidth, setVpWidth] = useState(0);
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = steps.length;

  useEffect(() => {
    const handle = () => setVpWidth(window.innerWidth);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (reducedMotion || !isVisible || isHovered || total < 2) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setActiveStep((p) => (p + 1) % total);
    }, AUTO_INTERVAL);
  }, [isVisible, isHovered, total, reducedMotion, clearTimer]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  useEffect(() => {
    const handle = () => {
      if (document.hidden) {
        clearTimer();
      } else {
        startTimer();
      }
    };
    document.addEventListener("visibilitychange", handle);
    return () => {
      document.removeEventListener("visibilitychange", handle);
      clearTimer();
    };
  }, [startTimer, clearTimer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveStep((p) => Math.min(p + 1, total - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveStep((p) => Math.max(p - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  const cw = isDesktop ? CARD_W : Math.min(CARD_W, vpWidth - 48);
  const cg = isDesktop ? CARD_GAP : 16;
  const cs = cw + cg;
  const offset = Math.max(0, (vpWidth - cw) / 2);
  const tx = offset - activeStep * cs;

  const goTo = (i: number) => setActiveStep(Math.max(0, Math.min(i, total - 1)));

  if (total === 0) return null;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GradientBlob color="gold" size="lg" className="top-[10%] left-[5%]" />
      <GradientBlob color="warm" size="md" className="bottom-[10%] right-[5%]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <SectionHeading
          title="Our Process"
          subtitle="A refined approach to delivering exceptional results"
          align="left"
        />

        <div className="relative mt-16 md:mt-24">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex items-stretch"
              style={{ gap: cg }}
              animate={{ x: reducedMotion ? 0 : tx }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 70, damping: 25 }
              }
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step._id}
                  animate={
                    reducedMotion
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: i === activeStep ? 1.05 : 0.92,
                          opacity: i === activeStep ? 1 : 0.5,
                        }
                  }
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onClick={() => goTo(i)}
                  className="shrink-0 rounded-3xl border border-surface-border bg-bg-secondary/40 backdrop-blur-md shadow-luxury relative flex flex-col justify-between overflow-hidden p-8 md:p-10 cursor-pointer"
                  style={{
                    width: cw,
                    height: isDesktop ? 440 : undefined,
                    minHeight: isDesktop ? undefined : 320,
                  }}
                >
                  <CardContent step={step} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-10 md:mt-12">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="focus:outline-none"
                aria-label={`Step ${i + 1}`}
              >
                <motion.div
                  animate={
                    reducedMotion
                      ? { width: 8, backgroundColor: "rgba(255,255,255,0.2)" }
                      : {
                          width: i === activeStep ? 24 : 8,
                          backgroundColor:
                            i === activeStep
                              ? "#d4af37"
                              : "rgba(255,255,255,0.2)",
                        }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-2 rounded-full"
                />
              </button>
            ))}
          </div>

          {!reducedMotion && total > 1 && (
            <>
              <button
                onClick={() => goTo(activeStep - 1)}
                disabled={activeStep === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-bg-secondary/60 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/30 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed z-10"
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 4L6 10L12 16" />
                </svg>
              </button>
              <button
                onClick={() => goTo(activeStep + 1)}
                disabled={activeStep === total - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-bg-secondary/60 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/30 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed z-10"
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 4L14 10L8 16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
