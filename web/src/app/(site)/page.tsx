import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyViora } from "@/components/sections/WhyViora";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { getPageData } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getPageData();

  console.log('data ---', data)

  return (
    <>
      <Hero settings={data.settings} />
      <MarqueeText />
      <About about={data.about} />
      <Services services={data.services} />
      <Portfolio items={data.portfolio} />
      <MarqueeText />
      <WhyViora features={data.features} />
      <Testimonials testimonials={data.testimonials} />
      <Process steps={data.processSteps} />
      <Clients logos={data.clientLogos} />
      <Contact settings={data.settings} />
    </>
  );
}
