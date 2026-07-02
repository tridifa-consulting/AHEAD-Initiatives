# Phase 1 — Foundation (Database, Seed, Document Ingestion)

## What this phase delivered

**1. Next.js 16 conventions confirmed** (from `node_modules/next/dist/docs/`):
- `middleware.ts` is now **`proxy.ts`** — the admin auth gate (Phase 3) uses this convention.
- Caching uses **Cache Components**: `cacheComponents: true` in `next.config.ts`, `use cache` + `cacheTag()` on data readers, `revalidateTag()` in publish actions. The public page will use `cacheTag('sections')`, `cacheTag('documents')`, etc., so admin publishes go live in seconds without redeploys.
- Server Actions (`'use server'`) remain the mutation mechanism.

**2. Database schema** — `supabase/migrations/20260702000001_initial_schema.sql`
12 tables: `profiles`, `site_sections`, `blog_posts`, `documents`, `media_items`,
`videos`, `social_posts`, `people`, `partners`, `emergency_notices`, `settings`,
`audit_logs`. Bilingual fields are `jsonb` (`{"en": …, "bn": …}`). New auth users
auto-receive a `profiles` row (default role `editor`; promote to `admin` in the table).

**3. Row Level Security** — `supabase/migrations/20260702000002_rls_policies.sql`
- Anonymous visitors: `SELECT` only, and only `published` + `visible` rows
  (notices additionally time-windowed).
- `editor`: read everything, write content tables.
- `admin`: additionally people, partners, settings, profiles, and all deletes.
- `service_role` key bypasses RLS and is **server-only** (`src/lib/supabase/admin.ts`
  imports `server-only`, so importing it client-side is a build error).

**4. Seed data** — `supabase/seed.sql` (idempotent; safe to re-run)
Everything migrated verbatim from the existing site — nothing invented:
- 17 site sections (12 chapters + 5 work areas). Sections with no verified
  content yet (field stories, blog, media, social, partners) are seeded as
  **draft** and await AHEAD's content through the admin panel.
- 172 documents: 9 annual reports, 33 FCRA quarterly entries, 9 FCRA annual
  statements, 18 MCA filings, 9 IT returns, 10 policies, MoA, brochure, and
  all 82 publications (catalog metadata; `file_available=false` until files
  are attached).
- 26 people (7 board, 3 project directors, 16 field team) with
  **`show_email=false`** by default pending consent confirmation.
- 4 hero/brand media items; org/channel/SEO settings.

**5. FCRA self-hosting** — `public/pdf/fcra/` (27 valid PDFs, ~14 MB)
Rebuilt as proper PDFs from the supplied page scans and named on a stable
scheme (`fcra-quarterly-fy2016-17-q1.pdf`, `fcra-annual-fy2016-17.pdf`).
Seed rows point at these local paths. Entries we do **not** yet have files for
(FCRA quarterly FY 21-22 Q2 → FY 24-25 Q1, FCRA annual FY 21-22 → FY 24-25,
all MCA/IT/policy files) remain `source='external'` pointing at the legacy
host, so nothing breaks — replace them via the admin document manager as
AHEAD supplies files.

**6. Supabase client helpers** — `src/lib/supabase/{client,server,admin}.ts`
and `.env.example` documenting every key Phase 2–5 will need.

## How to apply

```bash
# each migration, in order, then the seed:
supabase db push        # or apply via the Supabase SQL editor / MCP
psql < supabase/seed.sql
```

Set env vars from `.env.example` in Vercel + `.env.local`.

## Deliberately not done in Phase 1
- Public pages still render their hardcoded content (Phase 2 switches them to
  DB reads chapter by chapter — the site never breaks mid-migration).
- The two pre-existing 404 nav links (`/resources/av`, `/resources/gallery`)
  are resolved in Phase 2 when the nav becomes the chapter navigator with
  301 redirects from all old routes.
- `database.types.ts` generation (`supabase gen types`) — run after the
  migrations are applied to the chosen project.

## Open items for AHEAD
1. FCRA files newer than FY 22-23 Q1; MCA, IT-return, and policy PDFs.
2. Per-person consent for showing emails publicly.
3. YouTube channel ID (for Phase 5 sync) and confirmation of admin users.

---

## Live database (applied 2 July 2026)

- **Project:** `ahead-initiatives` (ref `nrboxjudvxjgdmbjsgug`), region ap-south-1 (Mumbai), $0/month plan
- **URL:** `https://nrboxjudvxjgdmbjsgug.supabase.co`
- **Publishable key** (safe for browser): `sb_publishable_vjPOuI7OmWFL94vVaESbGg_XXbumw9b`
- **Service role key:** retrieve from Supabase Dashboard → Project Settings → API. Set it
  only as a server-side env var (`SUPABASE_SERVICE_ROLE_KEY`), never in client code.

Applied migrations: `initial_schema`, `rls_policies`,
`people_email_column_privacy`, `harden_functions_private_schema`.
Seeded and verified: 17 sections · 172 documents · 26 people · 4 media · 3 settings.

Anonymous-role verification: drafts hidden (12/17 sections visible), audit logs
hidden, base `people` table blocked, `people_public` view exposes 26 rows with
**zero** email/phone values (all masked pending consent).

Security advisors: clean except one documented, intentional lint —
`people_public` is a SECURITY DEFINER view by design (it is the masking layer).

### First admin user
1. Supabase Dashboard → Authentication → Add user (email + password).
2. A profile row is auto-created with role `editor`. Promote to admin:
   `update public.profiles set role = 'admin' where full_name = '<email>';`

### Env vars for Vercel + .env.local
```
NEXT_PUBLIC_SUPABASE_URL=https://nrboxjudvxjgdmbjsgug.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vjPOuI7OmWFL94vVaESbGg_XXbumw9b
SUPABASE_SERVICE_ROLE_KEY=<from dashboard, server-only>
```
