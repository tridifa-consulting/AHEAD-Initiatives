# Phases 3–5 — Admin Panel, Google Drive, YouTube Sync

## Admin panel (Phase 3)

**Access:** `/admin` — gated by `src/proxy.ts` (Next 16 Proxy), which refreshes
the Supabase session and redirects anonymous visitors to `/admin/login`.
Authorisation is re-checked server-side in every layout and action
(`requireStaff` / `requireAdmin`), and RLS remains the final backstop.

**Modules** (left rail; horizontal bar on phones):

| Module | Who | What it does |
|---|---|---|
| Dashboard | staff | Counts, chapters waiting to publish, recent activity |
| Page chapters | staff | Edit every chapter's EN/BN title, subtitle, body; draft⇄publish |
| Blog & updates | staff | Create/edit posts (slug, bilingual body, tags); first publish stamps the date |
| Documents | staff | Full library: category, year, language, tags, source (site path / external / **Drive**), availability, visibility |
| Images | staff | Collections (hero, gallery_…); add by URL, site path, or **Drive picker** |
| Videos | staff | Add by pasting any YouTube link; feature/hide; auto-sync status |
| Social cards | staff | Manual LinkedIn/social highlights (API-compliant fallback) |
| Notices | staff | Site-wide banner: bilingual message, urgency colour, optional end time |
| People | **admin** | Board/team CRUD with explicit consent checkboxes for email/phone |
| Partners | **admin** | Confirmed partners only; chapter appears once published |
| Site settings | **admin** | Org facts, channel links, YouTube channel ID, SEO defaults |

**Publishing model:** every save calls `revalidatePath("/")`, so the public
page refreshes within seconds — no redeploys. Every mutation is zod-validated
and written to `audit_logs` with the actor.

**Preview:** "Preview drafts on site" enables Next draft mode; the public page
then reads through the staff session, so RLS reveals draft chapters — a true
preview secured by the same policies as the panel. A marigold banner with
"Exit preview" shows while active.

## Google Drive (Phase 4)

`DrivePicker` (documents + images variants) uses Google Identity Services +
the Picker API, entirely client-side with a read-only Drive scope; the chosen
file's ID/URL/thumbnail land in the form and save to the database. Without
credentials the button renders disabled with an explanation, so nothing breaks
before the Google Cloud project exists.

**To enable:** create a Google Cloud project → OAuth client ID (Web,
authorised origin = the site URL) → enable Picker API → API key. Set
`NEXT_PUBLIC_GOOGLE_CLIENT_ID` and `NEXT_PUBLIC_GOOGLE_PICKER_API_KEY`.
Drive-hosted files must be shared "Anyone with the link can view" (the admin
UI reminds editors of this).

## YouTube auto-sync (Phase 5)

`GET /api/sync/youtube` — authenticated with `Authorization: Bearer
$CRON_SECRET`; Vercel Cron calls it daily at 03:00 UTC (`vercel.json`). It
reads the channel's uploads playlist via YouTube Data API v3 and upserts the
latest 25 videos. Manually added rows are never overwritten; admins can hide
any synced video. Runs are recorded in the audit log.

**To enable:** set `YOUTUBE_API_KEY` and either `YOUTUBE_CHANNEL_ID` (env) or
the channel ID in Admin → Site settings, plus `CRON_SECRET`.
The channel ID for @aheadinitiatives4836 is visible at
youtube.com → the channel → Share → Copy channel ID (starts with `UC`).

## Public site additions
- Chapters for Field Stories, Blog, Media (privacy-enhanced
  youtube-nocookie embeds), Social, Partners — all render automatically the
  moment their chapter is published and content exists.
- `/blog/[slug]` post pages, linked from the Updates chapter.
- Site-wide SEO title/description now read from Admin → Site settings, with
  the verified values as fallback.

## Verified in this environment
`eslint` clean · `tsc --noEmit` clean · full `next build` generating all 30
routes with the Proxy registered (fonts + DB prerender stubbed only for the
sandbox; both work normally on Vercel).

## Deploy checklist (cumulative)
1. Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`, `CRON_SECRET`;
   later: `YOUTUBE_API_KEY`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`,
   `NEXT_PUBLIC_GOOGLE_PICKER_API_KEY`.
2. Create the first admin user (docs/PHASE1.md) and sign in at `/admin`.
3. Publish the draft chapters as content becomes ready.
