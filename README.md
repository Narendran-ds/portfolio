# Narendran L — Portfolio

Personal portfolio built with Next.js 14 (App Router), TypeScript, and a
scroll-driven canvas hero — a light, editorial design system inspired by
[landonorris.com](https://landonorris.com) and [alche.studio](https://alche.studio).

## Highlights

- **Scroll-driven video hero** — 120 WebP frames drawn to a `<canvas>` and scrubbed
  by scroll position over a 700vh pin, with a cream editorial preloader.
- **Alche-style pinned project showcase** — scroll flips through featured work
  one piece at a time; a full `/works` grid and per-project detail pages sit behind it.
- **15 real projects**, each with a designed, palette-locked cover (no
  screenshots) generated deterministically per project.
- **Certifications section** — internship and hackathon certificates, linked
  straight to the source PDFs.
- Smooth scrolling via [Lenis](https://github.com/darkroomengineering/lenis),
  scroll-reveal animations, a self-inverting reticle cursor, and a
  floating island navbar that swaps light/dark based on scroll position.

## Tech stack

- **Framework:** Next.js 14 (App Router), TypeScript, React 18
- **Motion:** Framer Motion, Lenis smooth scroll, custom canvas scroll-scrubbing
- **Styling:** inline styles + small `<style>` tags for media queries (no CSS framework dependency)
- **Fonts:** Archivo (display), Fraunces (accent statements), Space Grotesk (body), IBM Plex Mono (labels)
- **Deployment:** Vercel

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build (type-check + lint included)
npm run start   # serve the production build
```

> Don't run `npm run build` while `npm run dev` is active — it corrupts the
> shared `.next` build cache. Stop the dev server first.

## Project structure

```
src/
  app/                Route entrypoints (/, /works, /works/[slug])
  components/         One file per section (About, Skills, Projects,
                       Experience, Certifications, TechStack, Contact, …)
  data/
    projects.ts       Single source of truth for all 15 projects
    certificates.ts   Certificates shown in the Certifications section
public/
  sequence/           Hero canvas frame sequence (WebP)
  certificates/       Certificate PDFs
  icons/              Tech-stack brand SVGs
```

Adding a new project is a matter of adding one entry to `src/data/projects.ts` —
the home showcase, `/works` grid, detail pages, and category counts all derive
from it. Certificates work the same way via `src/data/certificates.ts`.

## Design system

Full conventions (palette, type scale, animation easing, section patterns,
known gotchas) are documented in [`CLAUDE.md`](./CLAUDE.md).

## Contact

- Email: [narendranlofficial@gmail.com](mailto:narendranlofficial@gmail.com)
- GitHub: [github.com/Narendran-ds](https://github.com/Narendran-ds)
