"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FluidButton } from "@/components/ui/FluidButton";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { gsap } from "@/lib/gsap";
import { scrollToSection } from "@/lib/utils";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

function splitIntoChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block char" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export function Hero({ settings }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
      );

      tl.fromTo(
        ".hero-char",
        { opacity: 0, y: 80, filter: "blur(12px)", rotationX: 30 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          rotationX: 0,
          duration: 1,
          stagger: { each: 0.025, from: "random" },
          ease: "back.out(1.2)",
        },
        "-=0.5",
      );

      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4",
      );

      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
        "-=0.3",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GradientBlob color="gold" size="lg" className="top-[-20%] left-[-15%] animate-pulse-glow" />
        <GradientBlob color="warm" size="md" className="top-[50%] right-[-15%]" />
        <GradientBlob color="bronze" size="lg" className="bottom-[-25%] left-[30%]" />
      </div>

      <motion.div style={{ y, scale: bgScale, opacity: bgOpacity }} className="absolute inset-0">
        {!videoFailed && settings.heroVideoUrl ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={settings.heroPosterUrl}
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover scale-105"
          >
            <source src={settings.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${settings.heroPosterUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/60 to-bg-primary" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12">
        <p ref={labelRef} className="mb-6 text-xs uppercase tracking-[0.5em] text-gold font-semibold md:text-sm">
          Luxury Creative Agency
        </p>

        <h1 ref={headlineRef} className="font-serif text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
          {splitIntoChars(settings.heroHeadline)}
        </h1>

        <p ref={subheadRef} className="mx-auto mt-8 max-w-2xl text-lg text-white/70 md:text-xl font-light">
          {settings.heroSubheading}
        </p>

        <div ref={ctasRef} className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <span className="hero-cta inline-block">
            <FluidButton size="lg" onClick={() => scrollToSection("portfolio")}>
              View Our Work
            </FluidButton>
          </span>
          <span className="hero-cta inline-block">
            <FluidButton
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
            >
              Start a Project
            </FluidButton>
          </span>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-gold hover:text-gold-light transition-colors"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-10 w-10" />
        </motion.div>
      </motion.button>
    </section>
  );
}
