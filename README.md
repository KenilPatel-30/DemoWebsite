# Belluno Cafe — Editorial Luxury Website

A cinematic, editorial web experience for **Belluno Cafe**, Surat — designed in
the spirit of Aesop, COS and Blue Bottle. Warm paper tones, huge display
typography, a light-studio 3D hero, scroll storytelling and real photography of
the venue.

## Tech Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** — bespoke warm-paper design system
- **React Three Fiber / Three.js / drei / postprocessing** — the 3D hero
- **GSAP + ScrollTrigger** — pinned horizontal menu & gallery
- **Lenis** — smooth scrolling, synced with ScrollTrigger
- **Framer Motion** — reveals, split-text, micro-interactions, custom cursor
- **React Hook Form + Zod** — validated reservation form
- **sharp** — build-time image cleaning (dev only)

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Design language

- **Palette** — paper `#F7F4EE`, section `#F2EEE7`, primary `#8B4513`, coffee
  `#5A3726`, accent `#C18A53`, ink `#1C1C1C`, hairline `rgba(0,0,0,.06)`.
  No gradients, no glow, very soft shadows.
- **Type** — Fraunces (editorial display, 700, -3% tracking) + Inter (body,
  18px / 1.8). Body measure capped at 680px.
- **Layout** — every section a different composition: split, offset, broken
  grid, alternating cinematic panels. Motion is `power4.out`, 0.8–1.2s, no bounce.

## Structure

Loader (black, rotating bean) → Hero (split type + light-studio 3D cup) →
Coffee Story → Menu (four cinematic per-category sections) → Why Belluno
(editorial blocks + animated stats) → Gallery (pinned horizontal parallax) →
Testimonials → Reservation + Map → Footer.

## Real photography pipeline

The `images/` folder at the project root holds the original Google-Maps photos
of the venue. They were cleaned (chrome cropped, optimized) into
`public/venue/venue-01…44.jpg` by the dev scripts:

```bash
node scripts/process.mjs   # crop bottom chrome, optimize all → public/venue
node scripts/salvage.mjs   # tailored crops for the wide interior/exterior shots
```

`scripts/contact-sheet.jpg` is an index of all processed frames. Image → section
assignments live in `lib/site.ts` (`IMG`) and `lib/content.ts` (`GALLERY`).
Swap or extend those maps to change any picture.

## Two things to wire before launch

1. **Reservation form** — `components/sections/Contact.tsx` validates and
   simulates a submit (logs the payload). Connect `onSubmit` to your email /
   booking service (Resend, Formspree, a route handler).
2. **Business details** — phone, hours, social links and SEO copy live in
   `lib/site.ts` (they also feed the JSON-LD structured data).

## Performance & SEO

- The WebGL bundle is `dynamic(ssr:false)` — excluded from first paint
  (initial shared JS ~103 kB).
- All photography lazy-loads with responsive `sizes`; served as AVIF/WebP.
- `schema.org` `CafeOrCoffeeShop` JSON-LD, dynamic OG/Twitter images,
  `robots.txt`, `sitemap.xml`, semantic HTML, `prefers-reduced-motion` support.
