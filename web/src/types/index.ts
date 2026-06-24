export type PortfolioCategory =
  | "branding"
  | "events"
  | "photography"
  | "marketing";

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheading: string;
  heroVideoUrl?: string;
  heroPosterUrl?: string;
  logoText: string;
  email: string;
  phone: string;
  address: string;
  whatsappNumber: string;
  socialLinks: { platform: string; url: string }[];
}

export interface AboutContent {
  title: string;
  intro: string;
  mission: string;
  vision: string;
  stats: { label: string; value: number; suffix?: string }[];
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  subServices: string[];
  icon: string;
  videoUrl?: string;
}

export interface PortfolioItem {
  _id: string;
  title: string;
  slug: string;
  category: PortfolioCategory;
  client: string;
  year: number;
  description: string;
  imageUrl: string;
}

export interface Feature {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  company: string;
  quote: string;
  photoUrl: string;
  rating: number;
}

export interface ProcessStep {
  _id: string;
  step: number;
  title: string;
  description: string;
}

export interface ClientLogo {
  _id: string;
  name: string;
  logoUrl: string;
  url?: string;
}

export interface PageData {
  settings: SiteSettings;
  about: AboutContent;
  services: Service[];
  portfolio: PortfolioItem[];
  features: Feature[];
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
  clientLogos: ClientLogo[];
}
