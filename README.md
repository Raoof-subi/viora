# VIORA — Luxury Creative Agency Website

A premium corporate website for VIORA, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and a custom PostgreSQL CMS backend.

## Project Structure

```
viora-website/
├── api/              # Express + PostgreSQL backend (port 4000)
├── web/              # Next.js frontend (port 3000)
└── README.md
```

## Prerequisites

- Node.js 20+
- PostgreSQL 14+ (managed via pgAdmin or local install)

## Quick Start

### 1. PostgreSQL Setup (pgAdmin)

1. Open pgAdmin and connect to your local PostgreSQL server
2. Create a new database named `viora`
3. Note your connection details (host, port, username, password)

### 2. API Backend

```bash
cd api
cp .env.example .env
npm install
```

Edit `api/.env`:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/viora
PORT=4000
JWT_SECRET=your-secret-here
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3000
ADMIN_EMAIL=admin@viora.com
ADMIN_PASSWORD=changeme
```

Generate a JWT secret:

```bash
cd web
npm run generate-secrets
```

Copy the same `JWT_SECRET` to both `api/.env` and `web/.env.local`.

Run migration and seed:

```bash
cd api
npm run migrate
npm run seed
npm run dev
```

API runs at [http://localhost:4000](http://localhost:4000)

### 3. Web Frontend

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Edit `web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
JWT_SECRET=same-as-api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

Open [http://localhost:3000](http://localhost:3000)

## Admin CMS Workflow

1. Visit `http://localhost:3000/admin/login`
2. Sign in with seeded credentials (`ADMIN_EMAIL` / `ADMIN_PASSWORD` from `api/.env`)
3. Use the dashboard to:
   - **Site Settings** — edit hero text, contact info, social links
   - **Contact Submissions** — view form messages

Other content (services, portfolio, testimonials, etc.) is seeded in PostgreSQL and served via the public API. Admin CRUD for these sections can be added in future phases.

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/content/page` | Public | Full homepage data |
| POST | `/api/v1/contact` | Public | Submit contact form |
| POST | `/api/v1/auth/login` | Public | Admin login (returns JWT) |
| GET | `/api/v1/auth/me` | JWT | Current user |
| GET | `/api/v1/admin/settings` | JWT | Get site settings |
| PUT | `/api/v1/admin/settings` | JWT | Update site settings |
| GET | `/api/v1/admin/contact-submissions` | JWT | List submissions |
| GET | `/api/v1/admin/users` | JWT | List users (future) |
| POST | `/api/v1/admin/users` | JWT | Create user (future) |

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
- Contact form with validation + PostgreSQL storage
- Password-protected admin CMS with JWT auth
- WhatsApp CTA
- SEO metadata, sitemap, robots.txt, JSON-LD
- Mobile-first responsive design
- Dark luxury theme (black + gold #D4AF37)

## Deployment

- **API**: Deploy `api/` to any Node.js host with PostgreSQL access (Railway, Render, Fly.io, etc.)
- **Web**: Deploy `web/` to Vercel, Netlify, or any Node.js host
- Set all environment variables in both deployments
- Use the same `JWT_SECRET` in both `api` and `web`
- Point `NEXT_PUBLIC_API_URL` to your production API URL
- Update `CORS_ORIGIN` in the API to your production web URL

## Tech Stack

- Next.js 16 (App Router)
- Express.js
- PostgreSQL + pg
- JWT authentication
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form + Zod
- Embla Carousel
