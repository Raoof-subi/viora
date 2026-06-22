import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().min(1),
  message: z.string().min(10),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1),
  tagline: z.string(),
  heroHeadline: z.string().min(1),
  heroSubheading: z.string().min(1),
  heroVideoUrl: z.string().optional(),
  heroPosterUrl: z.string().optional(),
  logoText: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  whatsappNumber: z.string(),
  socialLinks: z.array(
    z.object({
      platform: z.string(),
      url: z.string(),
    })
  ),
});
