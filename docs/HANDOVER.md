# AHEAD Initiatives — Project Handover
**Prepared for:** Tridifa Consulting · **Date:** 3 July 2026
**Phase covered:** Foundation → Public flow → Admin CMS → Documentary/legacy completeness → Phase 2.6 (Midas Touch & UX Stabilisation)

---

## 1. Project overview
A single-flow, chapter-based storytelling website for AHEAD Initiatives with a
no-code admin CMS. Public visitors scroll one guided documentary-style flow
(Story → Philosophy → Work → Field → Publications → Updates → Media → Social →
Reports → Partners → Contact); authorised AHEAD staff manage every word,
document, photograph, film, person, and notice from `/admin` without a
developer. All content is database-backed (Supabase) with row-level security;
publishing triggers `revalidatePath` so the live site updates in seconds.

**Stack:** Next.js 16.2.6 (App Router, `proxy.ts` convention) · React 19 ·
TypeScript · Tailwind CSS v4 · framer-motion · Supabase (Postgres + Auth + RLS)
· Google Picker (ready, keys pending) · YouTube Data API v3 (ready, key
pending) · Vercel (hosting + daily cron).

## 2. Live URLs
- **Vercel preview:** https://ahead-initiatives.vercel.app *(redeploy with the
  env vars below to activate the new build)*
- **Production domain:** `www.aheadinitiatives.in` — cutover pending (see §10)
- **Repository:** `github.com/tridifa-consulting/AHEAD-Initiatives` (apply the
  delivered changeset to `main`)
- **Legacy site (content source of record):** https://www.aheadinitiatives.in

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)
```
NEXT_PUBLIC_SUPABASE_URL=https://nrboxjudvxjgdmbjsgug.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vjPOuI7OmWFL94vVaESbGg_XXbumw9b
SUPABASE_SERVICE_ROLE_KEY=   ← retrieve per §4; NEVER commit or expose client-side
NEXT_PUBLIC_SITE_URL=https://www.aheadinitiatives.in
CRON_SECRET=                 ← any long random string; used by the YouTube cron
# Future integrations (features stay gracefully disabled until set):
YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=          ← or set in Admin → Site settings
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_PICKER_API_KEY=
```
The two `NEXT_PUBLIC_SUPABASE_*` values are safe for browsers (RLS enforces
access). The service-role key bypasses RLS — server only.

## 4. Supabase
- **Project:** `ahead-initiatives`, ref `nrboxjudvxjgdmbjsgug`, region
  `ap-south-1` (Mumbai), $0/month plan.
- **Tables:** `profiles` (roles) · `site_sections` (17 chapters, bilingual
  jsonb) · `blog_posts` · `documents` (172: reports, FCRA, MCA, IT, policies,
  82 publications) · `media_items` (280+: hero, 191 field photos, 66 films,
  27 portraits) · `videos` · `social_posts` · `people` (27 incl. founder) ·
  `partners` · `emergency_notices` · `settings` · `audit_logs`.
- **RLS:** anonymous = published/visible rows only; `editor` = content writes;
  `admin` = people/partners/settings + deletes. `people_public` view masks
  email/phone unless per-person consent flags are true. Helper functions live
  in the `private` schema (not REST-exposed). Migrations in
  `supabase/migrations/` are the source of truth.
- **Service-role key:** Supabase Dashboard → Project Settings → API → service_role.
- **First admin:** Dashboard → Authentication → Add user → then run
  `update public.profiles set role='admin' where full_name='<their email>';`

## 5. Admin login
- **URL:** `https://<deployed-domain>/admin` (login at `/admin/login`).
- Create/promote the first admin per §4. Additional users: same flow; they
  default to `editor`.
- **Credentials handover:** create the first admin with a temporary password in
  the Supabase dashboard and share it via a password manager or verbally —
  never in Git, email threads, or this document. Force a password change on
  first login (Supabase → user → send password recovery).

## 6. Content status
**Complete & verified:** all 17 chapters' copy · 82 publication catalogue
entries · 9 annual reports (on-site PDFs) · 27 FCRA files FY 16-17 → FY 22-23 Q1
(rebuilt, self-hosted) · founder memorial · 27 people with portraits ·
14 documentaries + 52 learning films · 191 field photographs · org settings.

**Partially complete:** FCRA/MCA/IT/policy entries newer than the supplied set
link to the legacy host (working, but AHEAD should supply files so they can be
self-hosted via Admin → Documents). Publications are catalogue-only
(`file_available=false`) — the UI shows "available in print" and never renders
a broken link.

**Needed from AHEAD (client-needed list):**
1. FCRA quarterly files FY 21-22 Q2 → FY 24-25 Q1; FCRA annual FY 21-22 →
   FY 24-25; all MCA (AOC-4, MGT-7), IT-return, and policy PDFs.
2. PDF files for any publications they want downloadable (attach via Admin →
   Documents → edit → File location).
3. Legacy pages not yet migrated: **av3** (Other Languages), **av4**
   (Miscellaneous), **g3** (Open Learning), **g4** (Miscellaneous) — add via
   Admin → Images/Videos using the same URL patterns as av1/av2/g1/g2.
4. Partner names/logos (legacy site shows only a flat image).
5. Bengali copy for every chapter (fields exist on every editor as the বাংলা
   tab) and confirmation of the exact wording of the "Go to the people…" credo
   before it is added to the Philosophy manifesto.
6. Per-person consent for public emails (Admin → People → checkbox).
7. YouTube channel ID; Google Cloud credentials (see §10).

## 7. Deployment
```bash
npm install
npm run lint && npm run build   # both pass clean
```
Vercel: import the repo → set env vars (§3) → deploy. `vercel.json` registers
the daily YouTube cron automatically. Database is already migrated and seeded —
no DB steps required for deploy.

## 8. Maintenance guide (for AHEAD staff)
- **Edit a chapter:** Admin → Page chapters → pick chapter → edit EN/বাংলা →
  Status: Published → Save. Live in seconds.
- **Add a document:** Admin → Documents → Add document → fill title, category,
  year, language → File location (site path, external URL, or Drive once
  enabled) → Save. Untick "File is available" if the PDF isn't ready yet.
- **Add photos:** Admin → Images → choose a collection (`hero`,
  `gallery_education`, `gallery_food`, `av_documentaries`, `av_learning`,
  `people`) → add by URL/path/Drive.
- **Videos:** Admin → Videos → paste any YouTube link. Once the API key is set,
  the channel syncs itself nightly; manual entries are never overwritten.
- **People:** Admin → People (admin role) → consent checkboxes control whether
  email/phone appear publicly.
- **Emergency banner:** Admin → Notices → message, urgency colour, optional
  end-time, "Show now".
- **Preview drafts:** left rail → "Preview drafts on site".

## 9. Security notes
- The **service-role key** bypasses all RLS. Server-only env var; the code
  imports it behind `server-only` so a client import fails the build.
- **people_public** masks contact columns; the base `people` table is not
  readable anonymously. Emails appear only with `show_email=true`.
- Every admin mutation is zod-validated, role-checked server-side, and written
  to `audit_logs` with the actor.
- The YouTube cron endpoint requires `Authorization: Bearer $CRON_SECRET`.
- Never commit `.env*` files (gitignored; `.env.example` documents the keys).

## 10. Known limitations & next phases
1. **Google Drive picker** — UI shipped and wired; renders disabled until
   `NEXT_PUBLIC_GOOGLE_CLIENT_ID` + `NEXT_PUBLIC_GOOGLE_PICKER_API_KEY` exist
   (Google Cloud project → OAuth Web client + Picker API key; authorised
   origin = site URL). Drive files must be link-shared to display.
2. **YouTube auto-sync** — shipped; activates when `YOUTUBE_API_KEY` and the
   channel ID are set. Runs 03:00 UTC daily; logged to `audit_logs`.
3. **LinkedIn** — official company-content APIs need partner approval, so the
   shipped path is the manual Social cards module (API-compliant). Revisit only
   if AHEAD obtains LinkedIn Marketing API access.
4. **Bengali mirror** — schema and admin are fully bilingual; public rendering
   currently serves English with Bengali fallback. A `/bn` variant is a
   follow-on once AHEAD supplies the copy (§6.5).
5. **Domain cutover** — point `www.aheadinitiatives.in` DNS to Vercel *after*
   ingesting the remaining legacy PDFs (§6.1,3), since some documents and all
   gallery/film files currently load from that host. Safe order: ingest files →
   verify links → cut DNS → keep legacy paths 301-redirecting if possible.
6. `/initiatives` long-form prose still renders from the legacy page component;
   migrate it into the work chapters via the admin editor at leisure.

---

## Phase 2.6 acceptance criteria — verification record (3 July 2026)
| Criterion | Status |
|---|---|
| Hero metrics render correctly (never 0/-1) | ✓ Real value server-rendered; count-up is enhancement-only; malformed CMS data falls back to the four verified constants |
| Scroll no longer jumps or misaligns | ✓ Root cause removed (`scrollIntoView` page-nudge → horizontal-only nav centring); `scroll-padding-top` on `html`; smooth scroll on anchor clicks only; reduced-motion honoured |
| Sections visually stronger | ✓ Manifesto philosophy, connected work-system layout, archive record card, year-plate annual shelf, marquee galleries, deeper hero scrim |
| Field gallery richer + more source-backed categories | ✓ Four verified category strips (Activity-based learning · Education · Home gardens & NRM · Food & nutrition), auto-drift right→left, pause on hover/focus, manual arrows, lightbox |
| Publications: no broken download actions | ✓ Metadata-only titles show an "In print" chip and are not links |
| Media: visual preview cards | ✓ Poster play-cards (documentaries) + grouped 52-film index + YouTube embeds |
| Reports interactive & credible | ✓ Vault with counted tabs, annual-report year plates, on-site vs archive vs "document to be attached" indicators |
| People/contact polished | ✓ Founder memorial, portraits, consent-gated emails, support-text closing with pull-quote |
| No secrets committed | ✓ `.env*` gitignored; service-role key referenced by name only |
| Handover document | ✓ `docs/HANDOVER.md` (all 10 sections) |
| Build passes | ✓ `eslint` clean · `tsc` clean · `next build` 25/25 pages |
