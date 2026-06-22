# VIORA — Luxury Creative Agency Website

A premium corporate website for VIORA, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Site content, admin credentials, and form submissions are stored as **JSON files in your Git repository** — no database or separate backend required.

## How data is stored

| Data | File | How to update |
|------|------|----------------|
| Admin login | `web/src/data/admin.json` | Edit the file, commit, and push |
| Site content | `web/src/data/page.json` | Admin CMS (with GitHub storage) or edit the file directly |
| Contact submissions | `web/src/data/contact-submissions.json` | Saved automatically when GitHub storage is configured |

### Local development

Writes go to `web/data/local/` on your machine. No extra setup needed.

### Vercel / production

Vercel cannot save files on its server. For the admin CMS and contact form to **save** data in production, connect your GitHub repo:

1. Copy `web/src/config/storage.example.json` to `web/src/config/storage.json` (already present)
2. Fill in your GitHub username and repo name:
   ```json
   {
     "github": {
       "owner": "your-github-username",
       "repo": "viora",
       "branch": "main",
       "token": "ghp_your_token_here"
     },
     "files": {
       "page": "web/src/data/page.json",
       "contactSubmissions": "web/src/data/contact-submissions.json"
     }
   }
   ```
3. Create a [GitHub personal access token](https://github.com/settings/tokens) with **Contents: Read and write** on this repo
4. Paste the token into `storage.json`, commit, and push — no Vercel environment variables needed

The app reads and writes JSON files directly in your repo via the GitHub API. Changes appear on the site after the next deployment (or immediately if you fetch from GitHub at runtime).

## Quick Start

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin CMS

1. Visit `/admin/login`
2. Sign in with credentials from `web/src/data/admin.json` (default: `admin@viora.com` / `changeme`)
3. Change the password in `admin.json` and push to deploy the new credentials

## Project Structure

```
web/
├── src/
│   ├── config/storage.json      # GitHub file storage config
│   └── data/
│       ├── admin.json           # Admin credentials
│       ├── page.json            # Site content
│       └── contact-submissions.json
└── data/local/                  # Local dev writes only (gitignored)
```

## Deployment (Vercel)

1. Set **Root Directory** to `web`
2. Configure `src/config/storage.json` with your GitHub repo + token (see above)
3. Deploy — login works from `admin.json` with no env vars required

Optional: set `JWT_SECRET` in Vercel env vars or `web/.env.local` for a stronger session key.

## Tech Stack

- Next.js 16 (App Router)
- JSON file storage (local disk + GitHub API)
- JWT authentication (jose)
- TypeScript, Tailwind CSS v4, Framer Motion
