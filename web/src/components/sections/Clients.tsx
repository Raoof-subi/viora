"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ClientLogo } from "@/types";

interface ClientsProps {
  logos: ClientLogo[];
}

export function Clients({ logos }: ClientsProps) {
  const duplicated = [...logos, ...logos];

  return (
    <section id="clients" className="section-padding overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Clients & Partners"
          subtitle="Trusted by industry leaders and luxury brands"
        />
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-16 px-8">
            {duplicated.map((logo, index) => (
              <a
                key={`${logo._id}-${index}`}
                href={logo.url ?? "#"}
                className="group flex shrink-0 items-center justify-center"
                aria-label={logo.name}
              >
                <div className="relative h-12 w-32 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110">
                  <Image
                    src={logo.logoUrl}
                    alt={logo.name}
                    fill
                    className="object-contain opacity-50 transition-opacity group-hover:opacity-100"
                    sizes="128px"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
