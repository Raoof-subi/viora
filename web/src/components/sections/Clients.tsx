"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp } from "@/lib/motion";
import type { ClientLogo } from "@/types";

interface ClientsProps {
  logos: ClientLogo[];
}

export function Clients({ logos }: ClientsProps) {
  const duplicated = [...logos, ...logos];

  return (
    <section id="clients" className="relative section-padding overflow-hidden bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Clients & Partners"
          subtitle="Trusted by industry leaders and luxury brands"
        />
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mt-4"
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-bg-primary to-transparent" />

        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-16 px-8">
            {duplicated.map((logo, index) => (
              <a
                key={`${logo._id}-${index}`}
                href={logo.url ?? "#"}
                className="group flex shrink-0 items-center justify-center"
                aria-label={logo.name}
              >
                <div className="relative h-12 w-32 transition-all duration-500 group-hover:scale-110">
                  <Image
                    src={logo.logoUrl}
                    alt={logo.name}
                    fill
                    className="object-contain opacity-40 transition-opacity group-hover:opacity-100"
                    sizes="128px"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
