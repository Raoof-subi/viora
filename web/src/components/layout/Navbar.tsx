"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { FluidButton } from "@/components/ui/FluidButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/ui/Logo";
import { scrollToSection } from "@/lib/utils";
import type { SiteSettings } from "@/types";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Portfolio", href: "portfolio" },
  { label: "Process", href: "process" },
  { label: "Contact", href: "contact" },
];

interface NavbarProps {
  settings: SiteSettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-surface-border bg-bg-primary/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo size="md" priority />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </button>
          ))}
          <FluidButton size="sm" onClick={() => handleNavClick("contact")}>
            Start a Project
          </FluidButton>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="text-text-primary" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="sr-only">{settings.logoText}</SheetTitle>
              <Logo size="md" />
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-lg uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </button>
              ))}
              <FluidButton onClick={() => handleNavClick("contact")}>
                Start a Project
              </FluidButton>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
