# MGL Realtech Website

## What this is
Corporate website for **MGL Realtech Pvt. Ltd.** — a real estate developer based in Kharkhoda, Sonipat (Haryana), North NCR. Part of **JMN Ventures**.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Fonts:** Playfair Display (serif headings), Cormorant Garamond (display), Inter (body)
- **Aesthetic:** Dark luxury (#121717 bg, white text, #254441 green accent, #c9a96e gold)
- **Node:** >=24 (use `nvm use 24`)

## Design Origin
Cloned from [Elyse Residence](https://elyse-residence-dev.webflow.io/) (Awwwards Honorable Mention, Phenomenon Studio) and revamped with MGL Realtech content and branding. Original used GSAP + Splide; this rebuild uses vanilla React + CSS transitions.

## Commands
```bash
nvm use 24
npm run dev     # → http://localhost:3000
npm run build   # Production build
npm run check   # lint + typecheck + build
```

## Components (src/components/)
| Component | What it does |
|-----------|-------------|
| NavBar | Fixed header, scroll-triggered bg, hamburger menu |
| HeroSection | Full-viewport video bg, giant serif title |
| AboutSection | 2-col grid, parallax image, stat counters |
| ProjectsSection | CSS slider, 3 project types, auto-advance |
| BeliefsSection | Philosophy intro + 5 glassmorphism cards |
| AmenitiesSection | 3-tab interface with image pairs |
| FAQSection | 4-item accordion |
| CTASection | Contact form, glassmorphic card, bg image |
| FooterSection | 3-col: logo, location, contact |

## MGL Realtech Details
- **Phone:** +91-6361618181
- **Email:** info@mglrealtech.com
- **Address:** NH 344P, Kharkhoda, Sonipat, Haryana
- **Stats:** 10+ projects, 7+ years, 500+ happy families, 24/7 support
- **Related project:** Meridian Orchid golf township (see `../meridian-orchid/`)

@AGENTS.md
