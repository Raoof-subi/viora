"use client";

import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

export function WhatsAppButton({ whatsappNumber }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button after 200ms delay for a premium entrance feel
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (!whatsappNumber) return null;

  // Clean phone number: remove any non-digit characters for wa.me URL
  const cleanNumber = whatsappNumber.replace(/[^\d]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  console.log("WhatsAppButton state:", { whatsappNumber, isVisible });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-[100] flex items-center justify-center p-3 rounded-full border border-surface-border bg-bg-secondary/80 backdrop-blur-md shadow-card hover:border-gold/30 hover:shadow-gold-glow transition-all duration-500 group hover:px-5 ${
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-4 pointer-events-none"
      }`}
      style={{ textDecoration: "none" }}
    >
      {/* Pulse Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-gold/5 group-hover:animate-ping -z-10" />

      {/* Sliding Tooltip Text */}
      <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap text-xs uppercase tracking-widest text-white/80 font-medium transition-all duration-500 ease-out group-hover:max-w-[120px] group-hover:mr-3">
        Chat With Us
      </span>

      {/* WhatsApp Icon Wrapper with Golden Accents */}
      <div className="flex h-6 w-6 items-center justify-center text-[#25D366] group-hover:text-gold transition-colors duration-300">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.364a9.92 9.92 0 0 0 4.808 1.246h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.67-1.037-5.18-2.92-7.065A9.9 9.9 0 0 0 12.012 2zm5.72 14.286c-.244.686-1.42 1.31-1.95 1.385-.482.068-.973.125-2.825-.609-2.37-.937-3.896-3.34-4.015-3.498-.118-.158-.962-1.28-1.008-2.483a2.64 2.64 0 0 1 .803-1.947c.244-.226.544-.298.723-.298.18 0 .36.002.518.01.168.007.394-.063.616.471.226.544.773 1.884.839 2.02.067.135.11.293.02.473-.09.18-.135.293-.27.451-.136.158-.286.353-.408.473-.135.136-.277.283-.12.552.157.27.7 1.15 1.503 1.864.647.575 1.194.752 1.493.9.3.15.474.128.653-.075.18-.203.774-.902.981-1.21.207-.308.414-.256.699-.15.286.105 1.81.854 2.122 1.01.312.156.52.233.595.36.075.129.075.743-.169 1.43z" />
        </svg>
      </div>
    </a>
  );
}
