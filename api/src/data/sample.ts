import { pool } from "../config/db";
import type { PageData } from "../types";

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const sampleData: PageData = {
  settings: {
    siteName: "VIORA",
    tagline: "Creative Agency",
    heroHeadline: "Transforming Brands Into Experiences",
    heroSubheading:
      "Branding, Events, Photography, and Digital Marketing that create lasting impressions.",
    heroVideoUrl: "/videos/hero.mp4",
    heroPosterUrl: unsplash("photo-1497366216548-37526070297c", 1920),
    logoText: "VIORA",
    email: "hello@viora.com",
    phone: "+1 (555) 123-4567",
    address: "123 Luxury Avenue, New York, NY 10001",
    whatsappNumber: "+15551234567",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "facebook", url: "https://facebook.com" },
    ],
  },
  about: {
    title: "About Viora",
    intro:
      "VIORA is a luxury creative agency where strategy meets artistry. We craft immersive brand experiences that resonate with discerning audiences and elevate businesses to iconic status.",
    mission:
      "To transform visionary ideas into unforgettable brand experiences through creative excellence, strategic thinking, and flawless execution.",
    vision:
      "To be the world's most trusted creative partner for luxury brands seeking to make a lasting impact in an ever-evolving digital landscape.",
    stats: [
      { label: "Years of Experience", value: 12, suffix: "+" },
      { label: "Projects Completed", value: 350, suffix: "+" },
      { label: "Clients Served", value: 180, suffix: "+" },
    ],
  },
  services: [
    { _id: "1", title: "Branding", slug: "branding", description: "Craft distinctive brand identities that command attention and build lasting recognition.", icon: "Palette", subServices: ["Brand Strategy", "Logo Design", "Brand Identity", "Packaging Design"] },
    { _id: "2", title: "Event Management", slug: "event-management", description: "Design and execute premium events that leave guests inspired and brands elevated.", icon: "Calendar", subServices: ["Corporate Events", "Product Launches", "Conferences", "Exhibitions"] },
    { _id: "3", title: "Photography & Videography", slug: "photography-videography", description: "Capture your brand story through cinematic visuals that evoke emotion and desire.", icon: "Camera", subServices: ["Commercial Photography", "Event Coverage", "Product Shoots", "Corporate Films"] },
    { _id: "4", title: "Social Media Marketing", slug: "social-media-marketing", description: "Build engaged communities and amplify your brand voice across every platform.", icon: "Share2", subServices: ["Social Media Management", "Content Creation", "Paid Advertising", "Influencer Campaigns"] },
    { _id: "5", title: "Digital Advertising", slug: "digital-advertising", description: "Drive measurable growth with data-driven campaigns that convert and captivate.", icon: "TrendingUp", subServices: ["PPC Campaigns", "Display Advertising", "Retargeting", "Analytics & Reporting"] },
  ],
  portfolio: [
    { _id: "p1", title: "Aurelia Luxury Rebrand", slug: "aurelia-rebrand", category: "branding", client: "Aurelia Hotels", year: 2025, description: "Complete brand identity overhaul for a five-star hotel group.", imageUrl: unsplash("photo-1561070791-2526d30994b5") },
    { _id: "p2", title: "Nova Tech Identity", slug: "nova-tech", category: "branding", client: "Nova Technologies", year: 2024, description: "Minimalist brand system for an AI startup.", imageUrl: unsplash("photo-1558655146-d09347e92766") },
    { _id: "p3", title: "Velvet Fashion Week", slug: "velvet-fashion", category: "branding", client: "Velvet Couture", year: 2024, description: "Seasonal campaign identity and collateral.", imageUrl: unsplash("photo-1558769132-cb1aea458c5e") },
    { _id: "p4", title: "Summit Global Conference", slug: "summit-conference", category: "events", client: "Summit Corp", year: 2025, description: "500-person corporate conference with immersive staging.", imageUrl: unsplash("photo-1540575467063-178a50c2df87") },
    { _id: "p5", title: "Elite Product Launch", slug: "elite-launch", category: "events", client: "Elite Motors", year: 2024, description: "Exclusive automotive reveal event in Dubai.", imageUrl: unsplash("photo-1511578314322-379afb476865") },
    { _id: "p6", title: "Gala Night Experience", slug: "gala-night", category: "events", client: "Prestige Foundation", year: 2024, description: "Charity gala with 300 VIP guests.", imageUrl: unsplash("photo-1505373877841-8d25f2941293") },
    { _id: "p7", title: "Artisan Watch Campaign", slug: "artisan-watch", category: "photography", client: "Chronos", year: 2025, description: "Product photography for luxury timepieces.", imageUrl: unsplash("photo-1523275335684-37898b6baf30") },
    { _id: "p8", title: "Coastal Resort Film", slug: "coastal-resort", category: "photography", client: "Azure Resorts", year: 2024, description: "Cinematic brand film for a Maldives resort.", imageUrl: unsplash("photo-1506905925346-21bda4d32df4") },
    { _id: "p9", title: "Chef's Table Series", slug: "chefs-table", category: "photography", client: "Maison Dining", year: 2024, description: "Editorial food photography series.", imageUrl: unsplash("photo-1414235077428-338989a2e8c0") },
    { _id: "p10", title: "Bloom Skincare Launch", slug: "bloom-skincare", category: "marketing", client: "Bloom Beauty", year: 2025, description: "Integrated digital campaign across social and paid media.", imageUrl: unsplash("photo-1522335789203-aabd1fc54bc9") },
    { _id: "p11", title: "Horizon Real Estate", slug: "horizon-realestate", category: "marketing", client: "Horizon Properties", year: 2024, description: "Lead generation campaign for luxury properties.", imageUrl: unsplash("photo-1486406146926-c627a92ad1ab") },
    { _id: "p12", title: "Pulse Fitness Campaign", slug: "pulse-fitness", category: "marketing", client: "Pulse Athletics", year: 2024, description: "Influencer-driven social media campaign.", imageUrl: unsplash("photo-1571019614242-c5c5dee9f50b") },
  ],
  features: [
    { _id: "f1", title: "Creative Excellence", description: "Award-winning creative team delivering visually stunning work that sets industry standards.", icon: "Sparkles" },
    { _id: "f2", title: "Strategic Thinking", description: "Every creative decision is backed by data-driven strategy and deep market insights.", icon: "Brain" },
    { _id: "f3", title: "End-to-End Execution", description: "From concept to delivery, we manage every detail so you can focus on your business.", icon: "Workflow" },
    { _id: "f4", title: "Measurable Results", description: "Transparent reporting and KPI tracking ensure your investment delivers real ROI.", icon: "BarChart3" },
  ],
  testimonials: [
    { _id: "t1", name: "Sarah Mitchell", company: "Aurelia Hotels", quote: "VIORA transformed our brand identity completely. Their attention to detail and luxury aesthetic exceeded every expectation. Our guest engagement has increased by 40% since the rebrand.", photoUrl: unsplash("photo-1494790108377-be9c29b29330", 200), rating: 5 },
    { _id: "t2", name: "James Chen", company: "Nova Technologies", quote: "Working with VIORA on our product launch was seamless. They handled everything from creative direction to on-site execution. The event was talked about for months.", photoUrl: unsplash("photo-1472099645785-5658abf4ff4e", 200), rating: 5 },
    { _id: "t3", name: "Elena Rodriguez", company: "Bloom Beauty", quote: "Their social media strategy doubled our online following in six months. VIORA understands luxury branding like no other agency we've worked with.", photoUrl: unsplash("photo-1438761681033-6461ffad8d80", 200), rating: 5 },
    { _id: "t4", name: "Michael Okonkwo", company: "Horizon Properties", quote: "The photography and video content VIORA produced for our properties is simply breathtaking. It has become the cornerstone of all our marketing materials.", photoUrl: unsplash("photo-1507003211169-0a1dd7228f2d", 200), rating: 5 },
  ],
  processSteps: [
    { _id: "s1", step: 1, title: "Discovery", description: "We immerse ourselves in your brand, audience, and goals through in-depth research and workshops." },
    { _id: "s2", step: 2, title: "Strategy", description: "A tailored roadmap is crafted, aligning creative direction with measurable business objectives." },
    { _id: "s3", step: 3, title: "Creative Development", description: "Our team brings concepts to life through design, content creation, and iterative refinement." },
    { _id: "s4", step: 4, title: "Execution", description: "Flawless production and deployment across all channels, events, and touchpoints." },
    { _id: "s5", step: 5, title: "Delivery", description: "Final assets delivered with comprehensive reporting, analytics, and ongoing support." },
  ],
  clientLogos: [
    { _id: "c1", name: "Aurelia", logoUrl: unsplash("photo-1611162617474-5b21e939e113", 120) },
    { _id: "c2", name: "Nova", logoUrl: unsplash("photo-1611532736597-de2d4265fba3", 120) },
    { _id: "c3", name: "Velvet", logoUrl: unsplash("photo-1614680376593-902f74cfd0e5", 120) },
    { _id: "c4", name: "Summit", logoUrl: unsplash("photo-1611162616305-c69b3037a141", 120) },
    { _id: "c5", name: "Elite", logoUrl: unsplash("photo-1614680376578-d85a9e5fe599", 120) },
    { _id: "c6", name: "Chronos", logoUrl: unsplash("photo-1611532736328-9b1b4462e237", 120) },
    { _id: "c7", name: "Azure", logoUrl: unsplash("photo-1611162616475-46b635cb6848", 120) },
    { _id: "c8", name: "Bloom", logoUrl: unsplash("photo-1614680376739-4145a5e2240f", 120) },
  ],
};
