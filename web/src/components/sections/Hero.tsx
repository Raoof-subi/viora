"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { scrollToSection } from "@/lib/utils";
import type { SiteSettings } from "@/types";

interface HeroProps {
  settings: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {!videoFailed && settings.heroVideoUrl ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={settings.heroPosterUrl}
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover"
          >
            <source src={settings.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${settings.heroPosterUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-gold md:text-sm"
        >
          Luxury Creative Agency
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="font-serif text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          {settings.heroHeadline}
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          {settings.heroSubheading}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <GoldButton size="lg" onClick={() => scrollToSection("portfolio")}>
            View Our Work
          </GoldButton>
          <GoldButton
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
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
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-gold"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
