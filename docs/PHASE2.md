# Phase 2 — Single-Flow Public Website

## What shipped

**The single-flow page (`/`)** — a chaptered scroll composed entirely from the
database. Chapters render in reading order: Hero → Story → Philosophy → Work →
Publications → Reports → Contact. Draft chapters (Field Stories, Blog, Media,
Social, Partners) are hidden from anonymous readers by RLS itself — the moment
AHEAD publishes them from the admin panel (Phase 3), they appear in both the
page and the navigator with no code change.

**Chapter navigator** (`ChapterNav`) — sticky, scroll-spy via
IntersectionObserver, `aria-current` on the active chapter, horizontally
scrollable pill bar on mobile that auto-centres the active chapter. Signature
element: a hairline **reading thread** beneath the bar (green → terracotta →
marigold) that fills with scroll progress.

**Design system** — grounded in AHEAD's own identity rather than a template:
ink navy `#16324F`, paper `#FAF7F0`, alluvial green `#2D6A4F`, laterite
terracotta `#C65D3B`, marigold accent `#E9B44C`. Display type is Source Serif 4
(a scholarly serif for an institution defined by its 82 publications); Inter
stays for body/UI continuity. Numbered chapter plates encode the page's real
reading sequence.

**Section components** (all in `src/components/flow/`):
- `Hero` — photographic cross-fade, serif thesis, verified stats band
- `Prose` — safe markdown-lite renderer (no `dangerouslySetInnerHTML`)
- `WorkCards` — the five areas, linking to the legacy deep-dive prose
- `PublicationsExplorer` — client-side search + collection filter over all 82
  titles; titles without files render as "available in print"
- `DocumentShelf` — the transparency archive on ink ground: tabs for Annual
  Reports / FCRA / MCA & IT / Policies / Founding documents
- `PeopleGrid` — board, project directors, field team; emails appear only for
  people with `show_email = true` (currently none, pending consent)
- `ContactBlock`, `NoticeBanner` (live emergency notices with dismiss),
  `Reveal` (scroll reveal, fully inert under `prefers-reduced-motion`)

**Routing changes**
- `/about`, `/contact`, `/resources/print` → 301 to their chapters (content is
  fully in the DB and rendered in the flow; no content lost)
- `/resources/av`, `/resources/gallery` (previously 404!) → 302 to the nearest
  chapters until AV/gallery content is migrated
- `/initiatives` kept live under a legacy route group with the old header —
  its long-form prose is not yet fully migrated; Work cards link to it as
  "Read the full story"

**SEO & accessibility** — `sitemap.ts`, `robots.ts` (disallows `/admin`),
JSON-LD `NGO` schema, `metadataBase`/canonical, semantic landmarks, visible
focus rings, keyboard-reachable everything, reduced-motion respected in nav
thread, hero cross-fade, and reveals.

## Caching model
Page uses ISR (`revalidate = 300`) with the cookie-free anon Supabase client
(`src/lib/supabase/public.ts`) so it stays statically renderable. Phase 3
publish actions will call `revalidatePath("/")` for near-instant updates.

## Verified in this environment
- `eslint` clean, `tsc --noEmit` clean
- `next build` compiles and generates all routes (fonts + DB prerender were
  stubbed only for the sandbox test because this container cannot reach
  fonts.googleapis.com or supabase.co; on Vercel both work normally)

## First-deploy checklist
1. Set env vars in Vercel (see docs/PHASE1.md): `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `NEXT_PUBLIC_SITE_URL`.
2. Deploy; confirm `/` renders all six published chapters.
3. Spot-check: a publication search, an FCRA download from `/pdf/fcra/…`,
   a legacy-host document link, `/about` redirecting to `/#story`.
