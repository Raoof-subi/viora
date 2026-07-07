"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MessageCircle, Loader2 } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FluidButton } from "@/components/ui/FluidButton";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { OrganicCard } from "@/components/ui/OrganicCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectTypes } from "@/data/sample";
import { slideInLeft, slideInRight, defaultViewport } from "@/lib/motion";
import type { SiteSettings } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  settings: SiteSettings;
}

export function Contact({ settings }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const { submitLead } = await import("@/lib/firebase-client");
      await submitLead(data);
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hello VIORA, I'd like to discuss a project.")}`;

  return (
    <section id="contact" className="relative section-padding bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary overflow-hidden">
      <GradientBlob color="gold" size="lg" className="top-[30%] right-[-15%] animate-pulse-glow" />
      <GradientBlob color="warm" size="md" className="bottom-[10%] left-[-10%]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's create something extraordinary together"
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.form
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <motion.div variants={slideInLeft} className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your name" className="mt-2" {...register("name")} />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your company" className="mt-2" {...register("company")} />
              </div>
            </motion.div>

            <motion.div variants={slideInLeft} className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="you@company.com" className="mt-2" {...register("email")} />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" className="mt-2" {...register("phone")} />
              </div>
            </motion.div>

            <motion.div variants={slideInLeft}>
              <Label>Project Type *</Label>
              <Select onValueChange={(value) => setValue("projectType", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType && (
                <p className="mt-1 text-xs text-red-400">{errors.projectType.message}</p>
              )}
            </motion.div>

            <motion.div variants={slideInLeft}>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                className="mt-2"
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
              )}
            </motion.div>

            <motion.div variants={slideInLeft}>
              <FluidButton type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </FluidButton>
              {status === "success" && (
                <p className="mt-3 text-sm text-green-400">
                  Thank you! We&apos;ll be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
            </motion.div>
          </motion.form>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-8"
          >
            <motion.div variants={slideInRight}>
              <OrganicCard glowColor="gold" className="p-8">
                <h3 className="font-serif text-2xl font-semibold gradient-text">Contact Details</h3>
                <ul className="mt-6 space-y-4 text-text-secondary">
                  <li>{settings.email}</li>
                  <li>{settings.phone}</li>
                  <li>{settings.address}</li>
                </ul>
              </OrganicCard>
            </motion.div>

            <motion.div variants={slideInRight}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 transition-colors hover:border-green-500/50 hover:bg-green-500/15"
              >
                <MessageCircle className="h-8 w-8 text-green-400" />
                <div>
                  <p className="font-semibold text-text-primary">Chat on WhatsApp</p>
                  <p className="text-sm text-text-secondary">Get a quick response from our team</p>
                </div>
              </a>
            </motion.div>

            <motion.div variants={slideInRight}>
              <p className="mb-4 text-sm uppercase tracking-widest text-text-secondary">Follow Us</p>
              <div className="flex gap-4">
                {settings.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-surface-border text-text-secondary transition-all hover:border-accent-violet/30 hover:text-accent-violet"
                    aria-label={social.platform}
                  >
                    <SocialIcon platform={social.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
