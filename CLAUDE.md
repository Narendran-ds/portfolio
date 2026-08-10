# Narendran L — Portfolio

Personal portfolio of Narendran L (github.com/Narendran-ds) — Next.js 14 (App Router, static export-style pages), TypeScript, inline-style components, deployed on Vercel.

## Commands

- `npm run dev` — dev server on :3000 (also configured in `.claude/launch.json` as `portfolio-dev`)
- `npm run build` — production build (runs type-check + lint)

## Design system (July 2026 redesign)

The site was fully redesigned from a dark orange/navy "AI-template" look to a light editorial
style inspired by landonorris.com (light palette) and alche.studio (immersive/editorial feel).

**Palette** — CSS variables in `src/app/globals.css`:
- `--paper` `#F2EEE3` warm cream background, `--paper-2` `#EAE5D6` hover surface
- `--ink` `#171310` near-black text, plus `--ink-soft` / `--ink-faint` alpha steps
- `--accent` `#E8500A` burnt orange (ties the light theme to the fiery hero video)
- `--line` hairline rule color — sections use ruled 1px borders, not cards

**Typography** — loaded via `next/font/google` in `src/app/layout.tsx`, exposed as CSS variables:
- Archivo (`--font-display`, class `display`) — 800/900-weight display headings
  (Syne was rejected as "vibe-coded"/hard to read — keep headings readable)
- Fraunces (`--font-serif`, class `serif`) — **landonorris.com-style accent words**: big
  statements are uppercase Archivo with 1–2 serif words per headline in `--accent` orange
  (see hero S2/S3, About statement, Contact headline). Use this treatment for any new
  large statement; don't set whole headings in Fraunces.
- Space Grotesk (`--font-grotesk`) — body, weight 300
- IBM Plex Mono (`--font-mono`, class `mono`) — micro-labels, uppercase letterspaced eyebrows

**Smooth scroll** — Lenis (`src/components/SmoothScroll.tsx`, mounted in layout). It also
intercepts same-page `#hash` links. `scroll-behavior: smooth` is intentionally NOT set in CSS.

**Recurring patterns**:
- Every section opens with a ruled mono header row: `( NN ) — Section name — right label`
- Reveal-on-scroll via the shared `useReveal` hook (`src/components/useReveal.ts`) +
  shared easing `EASE = cubic-bezier(0.22,1,0.36,1)`
- Fixed film-grain overlay: `.grain::after` in globals.css (keep it cheap — static tile,
  no animation; an animated 200% layer previously caused paint problems)
- Marquee keyframes (`marqueeLeft`/`marqueeRight`) live in globals.css

## Architecture / components

Page composition in `src/app/page.tsx`, all sections in `src/components/`:

- `ScrollyCanvas.tsx` — **the scroll-driven video hero. Do not replace it.** 120 webp frames
  in `public/sequence/` drawn to canvas over a 700vh pin. Loads 10 frames eagerly then the rest.
  Cream editorial preloader (big % counter). Three overlay states fade in/out by scroll progress.
- `Navbar.tsx` — **flat full-width bar, zipforgex.in style** (not a floating pill — reworked
  Aug 2026 to match the user's own live product's navbar). One row: bold wordmark with accent
  "L" + small location tag (left), plain uppercase mono links with no background chips
  (center-right), dark "N" avatar badge + Resume link + Hire me button (right). Swaps
  light/dark text based on whether the viewport is still over the (dark) hero canvas.
- `About.tsx` — section 01: staggered line-reveal statement, bio split with ruled stat rows.
- `Skills.tsx` — section 02: four numbered capability rows (grid: index / display title / detail).
- `Projects.tsx` — section 03: **alche-style pinned showcase** — scroll flips through featured
  works one at a time (designed cover right, meta + one-liner + tag pills left). Links into the
  works system below.
- `Experience.tsx` — section 04: Syncorb internship + B.Tech, split-grid ruled rows.
- `Certifications.tsx` — section 05: **alche-style pinned showcase**, same mechanics as
  `Projects.tsx` (own scroll listener + pin, not shared) — scroll flips through certificates
  one at a time via `CertificateCover.tsx` (same palette language as `ProjectCover.tsx`,
  issuer instead of categories). "View certificate" links into the certificates system below.
- `TechStack.tsx` — section 06: two logo marquees (brand SVGs in `public/icons/`, downloaded
  from cdn.simpleicons.org in ink #171310) + a static readable grouped-skills grid below.
- `Contact.tsx` — section 07: dark (`#171310`) rounded-top footer, line-reveal headline, big
  email pill button, live IST clock.
- `CustomCursor.tsx` — reticle cursor; default state uses `mix-blend-mode: difference` so it
  self-inverts between dark hero and cream sections. Cards tagged `data-cursor="card"` get the
  bracket/scan treatment.

## Works system (added in second pass)

- **`src/data/projects.ts`** is the single source of truth: 15 projects (every public repo on
  github.com/Narendran-ds incl. small ones) with slug, date, categories, tags, one-liner, full
  story paragraphs, highlights, links, and cover variant. Add new repos here — everything else
  (home showcase, /works grid, detail pages, category counts) derives from it.
- **`src/components/ProjectCover.tsx`** — designed minimal covers (NO screenshots; the old
  `public/projects/*.png` are unused by design, user asked for palette-locked covers instead).
  Four variants: ink / cream / accent-orange / tan, plus-grid pattern, giant outlined 2-letter
  mark, accent bar, title. Deterministic per project via `variant` + `mark` fields.
- **`/works`** (`src/app/works/page.tsx` + `WorksGrid.tsx`) — alche-style listing: sticky
  category sidebar with counts (`All [15]`), client-side filtering, 2-col cover grid.
- **`/works/[slug]`** (`src/app/works/[slug]/page.tsx`) — SSG detail pages: hero cover,
  "more works" rail, meta, huge title, story paragraphs, highlights, tools, next-project link.
- Navbar takes a `solid` prop (true on subpages = always light-theme text) and "Work" links
  to `/works`; section links are `/#about`-style absolute paths.

## Certifications system (added third pass)

- **`src/data/certificates.ts`** — same single-source-of-truth pattern as `projects.ts`:
  slug, title, issuer, date, `oneLiner`, `story` paragraphs, `file` (PDF path under
  `public/certificates/`), cover `variant`/`mark`, plus a `getCertificate(slug)` helper.
  Add new certificates here — the pinned homepage showcase and detail pages derive from it.
- **`/certificates/[slug]`** (`src/app/certificates/[slug]/page.tsx`) — SSG detail pages,
  same layout as `/works/[slug]`: hero cover, "other certificates" rail, story paragraphs,
  "View certificate" (opens PDF) + "Download PDF" buttons, next-certificate link.
- Navbar has a "Certifications" link (`/#certifications`), alongside Work/About/Experience/Contact.
- PDFs live in `public/certificates/`, named descriptively (not the original download names).

## Gotchas

- **framer-motion `useTransform(value, fn)` memoizes `fn`** — closure state captured at first
  render never updates. This bit us; the horizontal scroll now uses a plain passive scroll
  listener writing `style.transform` directly (same pattern as ScrollyCanvas).
- Components use inline styles + small `<style>` tags for media queries — keep that convention;
  Tailwind is installed but essentially unused.
- Contact/nav email buttons open Gmail compose on desktop, `mailto:` on mobile.
- `.claude/skills/` holds 26 design/frontend skills copied from the old `E:\Nari\portfolio`
  project (high-end-visual-design, design-taste-frontend, impeccable, etc.). The redesign was
  calibrated against `high-end-visual-design`.
- **Browser-automation screenshots: don't force `window.scrollTo()` against Lenis.** Lenis owns
  the scroll position via its own rAF loop; a JS-forced jump fights it and produces a permanent
  crossfade/ghosting artifact on the pinned showcases (two cards' text overlapping) in every
  subsequent screenshot, no matter how long you wait. Use real wheel scroll (the `computer` tool's
  `scroll` action) instead — Lenis handles that natively and settles cleanly.
- **First 1-2 clicks after a fresh page navigation in dev mode can silently no-op** (nav link
  clicks, etc.) — Next dev's on-demand compile/hydration isn't always done yet even after a short
  wait. Not a real bug; if a click seems to do nothing right after `navigate`, retry once before
  concluding something is broken.

## History

- Jul 2026 (pass 1): full light-theme editorial redesign. Everything except ScrollyCanvas
  mechanics rewritten: new palette, fonts, nav, all sections, cursor colors.
- Jul 2026 (pass 2, user feedback): Syne → Archivo (readability), Lenis smooth scroll,
  screenshots → designed minimal covers, alche-style works system (/works + detail pages),
  tech stack logos + static skills, hero name forced to one line, outdated "AI intern @
  Syncorb" hero line replaced (internship is completed — it's history in Experience only).
- Aug 2026 (pass 3): added root `README.md` (with live screenshots in `docs/screenshots/`);
  added Certifications section (05) — Syncorb internship completion + Cognizant Technoverse
  Hackathon 2026 certificates, pushing TechStack/Contact to 06/07. Rebuilt as a full alche-style
  pinned showcase mirroring `Projects.tsx` (initial static-grid version was reworked per
  feedback), with `/certificates/[slug]` detail pages mirroring `/works/[slug]`, and
  "Projects"/"Certifications" Navbar links. Navbar itself rebuilt from a floating pill into
  a flat full-width bar matching zipforgex.in (user's own product) at their request.
- Note: running `npm run build` while the dev server is up corrupts `.next` — restart the
  dev server after production builds.
