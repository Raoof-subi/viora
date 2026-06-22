# VIORA — Luxury Creative Agency Website

A premium corporate website for VIORA, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. All content, settings, contact submissions, and admin credentials are stored in local JSON files — no separate backend or database required.

## Project Structure

```
viora-website/
├── web/              # Next.js app (port 3000)
│   ├── src/data/     # Default page content and admin credentials
│   └── data/local/   # Writable runtime data (settings, submissions)
└── README.md
```

## Prerequisites

- Node.js 20+

## Quick Start

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

For production, generate a JWT secret:

```bash
cd web
npm run generate-secrets
```

Copy the output into `web/.env.local` as `JWT_SECRET`.

## Admin CMS

1. Visit `http://localhost:3000/admin/login`
2. Sign in with credentials from `web/src/data/admin.json` (default: `admin@viora.com` / `changeme`)
3. Use the dashboard to:
   - **Site Settings** — edit hero text, contact info, social links (saved to `data/local/page.json`)
   - **Contact Submissions** — view form messages (stored in `data/local/contact-submissions.json`)

## Local Data Files

| File | Purpose |
|------|---------|
| `web/src/data/page.json` | Default homepage content |
| `web/src/data/admin.json` | Default admin credentials |
| `web/data/local/page.json` | Saved settings override (created on first save) |
| `web/data/local/admin.json` | Optional admin credentials override |
| `web/data/local/contact-submissions.json` | Contact form submissions |

Set `LOCAL_DATA_PATH` in `.env.local` to use a custom path for page data.

## Features

- Full-screen hero with video background (poster fallback)
- Sticky transparent navbar with scroll blur
- Scroll progress indicator
- Premium loading screen
- Animated statistics counters
- Glassmorphism service cards with hover reveal
- Portfolio filtering with Framer Motion transitions
- Testimonial carousel (Embla)
- Process timeline with scroll animation
- Infinite client logo marquee
- Contact form with validation and JSON file storage
- Password-protected admin CMS with JWT auth
- WhatsApp CTA
- SEO metadata, sitemap, robots.txt, JSON-LD
- Mobile-first responsive design
- Dark luxury theme (black + gold #D4AF37)

## Deployment (Vercel)

1. Set the Vercel project **Root Directory** to `web`
2. Deploy — **no environment variables required** for admin login
3. Optional: set `JWT_SECRET` for a stronger session signing key (available on Vercel's free Hobby plan under Project Settings → Environment Variables)
4. Optional: set `NEXT_PUBLIC_SITE_URL` to your production URL

Default admin login: `admin@viora.com` / `changeme` (from `src/data/admin.json`). Change the password in that file and redeploy.

Writable data in `data/local/` does not persist on Vercel's serverless filesystem. Settings and contact submissions will reset between deployments unless you use external storage.

## Tech Stack

- Next.js 16 (App Router)
- JWT authentication (jose)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form + Zod
- Embla Carousel
