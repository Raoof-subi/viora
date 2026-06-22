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
    <footer className="border-t border-white/5 bg-black">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {settings.tagline}. Crafting luxury brand experiences that inspire
              and endure.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About", "Services", "Portfolio", "Process", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service._id}>
                  <Link
                    href="#services"
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted">
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
                    className="text-muted transition-colors hover:text-gold"
                    aria-label={social.platform}
                  >
                    <SocialIcon platform={social.platform} className="h-5 w-5" />
                  </a>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-muted">
            &copy; {currentYear} {settings.siteName}. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-widest text-muted/60">
            Luxury Creative Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
