import type { PageData } from "@/types";
import pageData from "@/data/page.json";

export const sampleData = pageData as PageData;

export const portfolioCategories = [
  { id: "all", label: "All Work" },
  { id: "branding", label: "Branding" },
  { id: "events", label: "Events" },
  { id: "photography", label: "Photography" },
  { id: "marketing", label: "Marketing Campaigns" },
] as const;

export const projectTypes = [
  "Branding",
  "Event Management",
  "Photography & Videography",
  "Social Media Marketing",
  "Digital Advertising",
  "Other",
];
