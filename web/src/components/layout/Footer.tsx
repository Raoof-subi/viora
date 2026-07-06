import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcons";
import type { SiteSettings, Service } from "@/types";

interface FooterProps {
  settings: SiteSettings;
  services: Service[];
}

export function Footer({ settings, services }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-surface-border bg-bg-primary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-violet/40 to-transparent" />

      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {settings.tagline}. Crafting luxury brand experiences that inspire
              and endure.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest gradient-text">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Services", "About", "Portfolio", "Process", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest gradient-text">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service._id}>
                  <Link
                    href="#services"
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest gradient-text">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>{settings.email}</li>
              <li>{settings.phone}</li>
              <li>{settings.address}</li>
            </ul>
            <div className="mt-6 flex gap-4">
              {settings.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary transition-colors hover:text-accent-violet"
                  aria-label={social.platform}
                >
                  <SocialIcon platform={social.platform} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-8 md:flex-row">
          <p className="text-sm text-text-secondary">
            &copy; {currentYear} {settings.siteName}. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-widest text-text-muted/60">
            Luxury Creative Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
