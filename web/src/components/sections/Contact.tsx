"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MessageCircle, Loader2 } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
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
import { fadeInUp, staggerContainer } from "@/lib/motion";
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

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
    <section id="contact" className="section-padding bg-gradient-to-b from-black via-zinc-950/30 to-black">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's create something extraordinary together"
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.form
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="grid gap-6 sm:grid-cols-2">
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

            <motion.div variants={fadeInUp} className="grid gap-6 sm:grid-cols-2">
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

            <motion.div variants={fadeInUp}>
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

            <motion.div variants={fadeInUp}>
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

            <motion.div variants={fadeInUp}>
              <GoldButton type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </GoldButton>
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
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="glass-card rounded-3xl p-8">
              <h3 className="font-serif text-2xl font-semibold text-gold">Contact Details</h3>
              <ul className="mt-6 space-y-4 text-muted">
                <li>{settings.email}</li>
                <li>{settings.phone}</li>
                <li>{settings.address}</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 transition-colors hover:border-green-500/50 hover:bg-green-500/15"
              >
                <MessageCircle className="h-8 w-8 text-green-400" />
                <div>
                  <p className="font-semibold text-foreground">Chat on WhatsApp</p>
                  <p className="text-sm text-muted">Get a quick response from our team</p>
                </div>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="mb-4 text-sm uppercase tracking-widest text-muted">Follow Us</p>
              <div className="flex gap-4">
                {settings.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-muted transition-all hover:border-gold hover:text-gold"
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
