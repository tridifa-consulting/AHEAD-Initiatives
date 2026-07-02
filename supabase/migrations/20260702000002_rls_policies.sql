-- ============================================================
-- AHEAD Initiatives CMS — Row Level Security
-- Model:
--   anon (public website)  : SELECT only, and only published+visible rows
--   staff (admin/editor)   : full read, insert/update on content tables
--   admin                  : additionally people, partners, settings, profiles, delete
-- The service_role key bypasses RLS and is used ONLY in server-side code
-- (YouTube sync job, seed scripts). Never shipped to the browser.
-- ============================================================

alter table public.profiles          enable row level security;
alter table public.site_sections     enable row level security;
alter table public.blog_posts        enable row level security;
alter table public.documents         enable row level security;
alter table public.media_items       enable row level security;
alter table public.videos            enable row level security;
alter table public.social_posts      enable row level security;
alter table public.people            enable row level security;
alter table public.partners          enable row level security;
alter table public.emergency_notices enable row level security;
alter table public.settings          enable row level security;
alter table public.audit_logs        enable row level security;

-- ---------- profiles ----------
create policy "profiles: self read" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles: self update name" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
create policy "profiles: admin manage" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- generic published-content read policies ----------
create policy "sections: public read published" on public.site_sections
  for select using ((status = 'published' and visible) or public.is_staff());
create policy "blog: public read published" on public.blog_posts
  for select using (status = 'published' or public.is_staff());
create policy "documents: public read published" on public.documents
  for select using ((status = 'published' and visible) or public.is_staff());
create policy "media: public read published" on public.media_items
  for select using (status = 'published' or public.is_staff());
create policy "videos: public read published" on public.videos
  for select using (status = 'published' or public.is_staff());
create policy "social: public read published" on public.social_posts
  for select using (status = 'published' or public.is_staff());
create policy "people: public read published" on public.people
  for select using (status = 'published' or public.is_staff());
create policy "partners: public read published" on public.partners
  for select using (status = 'published' or public.is_staff());
create policy "notices: public read active" on public.emergency_notices
  for select using (
    (active and starts_at <= now() and (ends_at is null or ends_at > now()))
    or public.is_staff()
  );
create policy "settings: public read" on public.settings
  for select using (true);   -- only non-sensitive site settings live here

-- ---------- staff write policies (content tables) ----------
create policy "sections: staff write" on public.site_sections
  for insert with check (public.is_staff());
create policy "sections: staff update" on public.site_sections
  for update using (public.is_staff()) with check (public.is_staff());

create policy "blog: staff write" on public.blog_posts
  for insert with check (public.is_staff());
create policy "blog: staff update" on public.blog_posts
  for update using (public.is_staff()) with check (public.is_staff());

create policy "documents: staff write" on public.documents
  for insert with check (public.is_staff());
create policy "documents: staff update" on public.documents
  for update using (public.is_staff()) with check (public.is_staff());

create policy "media: staff write" on public.media_items
  for insert with check (public.is_staff());
create policy "media: staff update" on public.media_items
  for update using (public.is_staff()) with check (public.is_staff());

create policy "videos: staff write" on public.videos
  for insert with check (public.is_staff());
create policy "videos: staff update" on public.videos
  for update using (public.is_staff()) with check (public.is_staff());

create policy "social: staff write" on public.social_posts
  for insert with check (public.is_staff());
create policy "social: staff update" on public.social_posts
  for update using (public.is_staff()) with check (public.is_staff());

create policy "notices: staff write" on public.emergency_notices
  for insert with check (public.is_staff());
create policy "notices: staff update" on public.emergency_notices
  for update using (public.is_staff()) with check (public.is_staff());

-- ---------- admin-only areas ----------
create policy "people: admin write" on public.people
  for insert with check (public.is_admin());
create policy "people: admin update" on public.people
  for update using (public.is_admin()) with check (public.is_admin());
create policy "partners: admin write" on public.partners
  for insert with check (public.is_admin());
create policy "partners: admin update" on public.partners
  for update using (public.is_admin()) with check (public.is_admin());
create policy "settings: admin write" on public.settings
  for insert with check (public.is_admin());
create policy "settings: admin update" on public.settings
  for update using (public.is_admin()) with check (public.is_admin());

-- ---------- deletes: admin only, everywhere ----------
create policy "sections: admin delete"  on public.site_sections     for delete using (public.is_admin());
create policy "blog: admin delete"      on public.blog_posts        for delete using (public.is_admin());
create policy "documents: admin delete" on public.documents         for delete using (public.is_admin());
create policy "media: admin delete"     on public.media_items       for delete using (public.is_admin());
create policy "videos: admin delete"    on public.videos            for delete using (public.is_admin());
create policy "social: admin delete"    on public.social_posts      for delete using (public.is_admin());
create policy "people: admin delete"    on public.people            for delete using (public.is_admin());
create policy "partners: admin delete"  on public.partners          for delete using (public.is_admin());
create policy "notices: admin delete"   on public.emergency_notices for delete using (public.is_admin());

-- ---------- audit logs: staff can write + read, nobody edits ----------
create policy "audit: staff read" on public.audit_logs
  for select using (public.is_staff());
create policy "audit: staff insert" on public.audit_logs
  for insert with check (public.is_staff());
