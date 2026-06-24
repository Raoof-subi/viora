"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { scrollToSection } from "@/lib/utils";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const headlineWords = settings.heroHeadline.split(" ");

  return (
    <section id="hero" ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="ambient-glow animate-float bg-gold/20 w-[600px] h-[600px] top-[-10%] left-[-10%]" />
        <div className="ambient-glow animate-float bg-white/10 w-[400px] h-[400px] bottom-[10%] right-[-5%]" style={{ animationDelay: '2s' }} />
        <div className="ambient-glow animate-float bg-gold-light/10 w-[500px] h-[500px] top-[40%] left-[60%]" style={{ animationDelay: '4s' }} />
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-gold md:text-sm font-semibold drop-shadow-md"
        >
          Luxury Creative Agency
        </motion.p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 overflow-hidden">
          {headlineWords.map((word, i) => (
            <motion.h1
              key={i}
              variants={{
                hidden: { y: "100%", opacity: 0, rotate: 5 },
                visible: { y: "0%", opacity: 1, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 100 } }
              }}
              className="font-serif text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl drop-shadow-2xl"
            >
              {word}
            </motion.h1>
          ))}
        </div>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/80 md:text-xl font-light"
        >
          {settings.heroSubheading}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <GoldButton size="lg" onClick={() => scrollToSection("portfolio")}>
            View Our Work
          </GoldButton>
          <GoldButton
            size="lg"
            variant="outline"
            glow={false}
            onClick={() => scrollToSection("contact")}
            className="border-white/20 hover:border-gold hover:text-gold transition-colors"
          >
            Start a Project
          </GoldButton>
        </motion.div>
      </motion.div>

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
          <ChevronDown className="h-10 w-10 drop-shadow-lg" />
        </motion.div>
      </motion.button>
    </section>
  );
}
