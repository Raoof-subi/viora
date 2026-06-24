"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/types";

interface ProcessProps {
  steps: ProcessStep[];
}

function ProcessCard({ step, index, progress, total }: { step: ProcessStep, index: number, progress: MotionValue<number>, total: number }) {
  const isFirst = index === 0;
  const N = total;
  
  const detachStart = index * 0.12;
  const detachEnd = (index + 1) * 0.12;
  const returnStart = 0.75;
  
  const inputs = [];
  const yOut = [];
  const xOut = [];
  const opacityOut = [];
  const scaleOut = [];

  // 1. Initial Stack State
  inputs.push(0);
  yOut.push(index * 30);
  xOut.push(index * 30);
  opacityOut.push(1);
  scaleOut.push(1 - index * 0.05);

  // 2. Move to front
  if (detachStart > 0) {
    inputs.push(detachStart);
    yOut.push(0);
    xOut.push(0);
    opacityOut.push(1);
    scaleOut.push(1);
  }

  // 3. Detach (fly UP)
  inputs.push(detachEnd);
  yOut.push(-800);
  xOut.push(0);
  opacityOut.push(0);
  scaleOut.push(1);

  // 4. Wait out of screen, position ready for drop-in
  if (returnStart > detachEnd) {
    inputs.push(returnStart);
    yOut.push(-800);
    xOut.push((index - 2) * 240); // 240px spacing
    opacityOut.push(0);
    scaleOut.push(0.5);
  }

  // 5. Final horizontal layout drop-in
  inputs.push(1);
  yOut.push(0);
  xOut.push((index - 2) * 240);
  opacityOut.push(1);
  scaleOut.push(0.5);

  const y = useTransform(progress, inputs, yOut);
  const x = useTransform(progress, inputs, xOut);
  const opacity = useTransform(progress, inputs, opacityOut);
  const scale = useTransform(progress, inputs, scaleOut);

  // Z-index ensures the first card is on top initially
  const zIndex = total - index;

  return (
    <motion.div
      style={{ x, y, opacity, scale, zIndex }}
      className="absolute inset-0 p-8 md:p-12 rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden origin-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <h2 className="relative z-10 font-serif text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
        0{step.step}
      </h2>
      
      <div className="relative z-10">
        <h3 className="font-serif text-3xl md:text-4xl font-semibold text-white drop-shadow-md">
          {step.title}
        </h3>
        <div className="mt-4 h-px w-16 bg-gold" />
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/70 font-light">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Process({ steps }: ProcessProps) {
  const targetRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="process" ref={targetRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        
        {/* Ambient Glows with scroll parallax */}
        <motion.div ref={glowRef} style={{ y: glowY }} className="absolute pointer-events-none z-0">
          <div className="ambient-glow animate-float bg-gold/10 w-[500px] h-[500px] top-[10%] left-[10%]" />
        </motion.div>
        <motion.div style={{ y: glowY2 }} className="absolute pointer-events-none z-0">
          <div className="ambient-glow animate-float bg-gold-dark/10 w-[600px] h-[600px] bottom-[10%] right-[10%]" style={{ animationDelay: '2s' }} />
        </motion.div>

        <div className="absolute top-24 left-0 w-full z-10 px-6 md:px-12 lg:px-20 pointer-events-none">
          <SectionHeading
            title="Our Process"
            subtitle="A refined approach to delivering exceptional results"
            align="left"
          />
        </div>

        {/* Card Stack Container */}
        <div className="relative w-[340px] md:w-[450px] h-[450px] md:h-[550px] z-10 mt-16 md:mt-0">
          {steps.map((step, index) => (
            <ProcessCard 
              key={step._id} 
              step={step} 
              index={index} 
              progress={scrollYProgress} 
              total={steps.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
