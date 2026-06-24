import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viora.com";

export const metadata: Metadata = {
  title: {
    default: "VIORA | Luxury Creative Agency",
    template: "%s | VIORA",
  },
  description:
    "VIORA is a luxury creative agency specializing in branding, event management, photography, videography, social media marketing, and digital advertising.",
  keywords: [
    "creative agency",
    "luxury branding",
    "event management",
    "photography",
    "videography",
    "digital marketing",
    "VIORA",
  ],
  authors: [{ name: "VIORA" }],
  creator: "VIORA",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VIORA",
    title: "VIORA | Transforming Brands Into Experiences",
    description:
      "Branding, Events, Photography, and Digital Marketing that create lasting impressions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIORA | Luxury Creative Agency",
    description:
      "Branding, Events, Photography, and Digital Marketing that create lasting impressions.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} min-h-full bg-black font-sans text-foreground antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
