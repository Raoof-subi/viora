import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { getPageData } from "@/lib/data";

const LoadingScreen = dynamic(() =>
  import("@/components/layout/LoadingScreen").then((mod) => mod.LoadingScreen)
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://viora.com";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings, services } = await getPageData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: siteUrl,
    description: settings.heroSubheading,
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
    },
    sameAs: settings.socialLinks.map((s) => s.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingScreen />
      <ScrollProgress />
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} services={services} />
    </>
  );
}
