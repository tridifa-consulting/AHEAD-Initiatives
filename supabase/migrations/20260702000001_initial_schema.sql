-- ============================================================
-- AHEAD Initiatives CMS — Initial Schema
-- Phase 1 foundation. All editable site content lives here.
-- Bilingual fields use jsonb: { "en": "...", "bn": "..." }
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- shared helpers ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------- admin user profiles / roles ----------
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

-- auto-create a profile when an auth user is created
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- helper used by RLS policies
create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','editor')
  );
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------- content status domain ----------
-- 'draft' = only visible in admin preview; 'published' = public
-- (kept as a check constraint rather than enum for easy evolution)

-- ---------- site_sections: chapters of the single-flow page ----------
create table public.site_sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,              -- 'hero','story','philosophy','work',...
  parent_slug text,                       -- e.g. work sub-areas under 'work'
  title jsonb not null default '{}',      -- { en, bn }
  subtitle jsonb not null default '{}',
  body jsonb not null default '{}',       -- { en: markdown, bn: markdown }
  media jsonb not null default '[]',      -- ordered array of media/document refs
  extra jsonb not null default '{}',      -- section-specific structured data (stats, timeline items…)
  sort_order int not null default 0,
  status text not null default 'draft' check (status in ('draft','published')),
  visible boolean not null default true,
  created_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_sections_order on public.site_sections (sort_order);
create trigger trg_sections_updated before update on public.site_sections
  for each row execute function public.set_updated_at();

-- ---------- blog_posts ----------
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null default '{}',
  excerpt jsonb not null default '{}',
  body jsonb not null default '{}',
  cover_media_id uuid,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_blog_published on public.blog_posts (status, published_at desc);
create trigger trg_blog_updated before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ---------- documents: reports, FCRA, policies, publications ----------
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null check (category in
    ('annual_report','financial','fcra_quarterly','fcra_annual',
     'mca_filing','it_return','policy','publication','newsletter','other')),
  subcategory text,                       -- e.g. 'english_publications','bengali_publications','nabodisha','aoc','mgt'
  author text,
  year text,                              -- '2024' or 'FY 2023-24'
  quarter text,                           -- 'Q1'..'Q4'
  language text not null default 'en' check (language in ('en','bn','multi')),
  tags text[] not null default '{}',
  source text not null default 'local' check (source in ('local','drive','storage','external')),
  file_path text,                         -- '/pdf/...' for local, storage path for storage
  external_url text,                      -- legacy-host or other external URL
  drive_file_id text,
  drive_url text,
  mime_type text default 'application/pdf',
  thumbnail_url text,
  file_available boolean not null default true,  -- false = metadata known, file pending from AHEAD
  status text not null default 'published' check (status in ('draft','published')),
  visible boolean not null default true,
  sort_order int not null default 0,
  created_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_documents_cat on public.documents (category, year desc, sort_order);
create trigger trg_documents_updated before update on public.documents
  for each row execute function public.set_updated_at();

-- ---------- media_items: images ----------
create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  alt_text jsonb not null default '{}',
  caption jsonb not null default '{}',
  collection text,                        -- 'hero','gallery_education','gallery_food','partners','people',...
  source text not null default 'local' check (source in ('local','drive','storage','external')),
  file_path text,
  url text,
  drive_file_id text,
  mime_type text,
  width int, height int,
  status text not null default 'published' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_media_collection on public.media_items (collection, sort_order);
create trigger trg_media_updated before update on public.media_items
  for each row execute function public.set_updated_at();

alter table public.blog_posts
  add constraint fk_blog_cover foreign key (cover_media_id)
  references public.media_items (id) on delete set null;

-- ---------- videos: YouTube (auto-synced + manual) ----------
create table public.videos (
  id uuid primary key default gen_random_uuid(),
  youtube_video_id text not null unique,
  title text not null,
  description text,
  thumbnail_url text,
  duration text,
  playlist text,
  published_at timestamptz,
  featured boolean not null default false,
  sync_source text not null default 'auto' check (sync_source in ('auto','manual')),
  status text not null default 'published' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_videos_pub on public.videos (status, published_at desc);
create trigger trg_videos_updated before update on public.videos
  for each row execute function public.set_updated_at();

-- ---------- social_posts: manual LinkedIn/social cards ----------
create table public.social_posts (
  id uuid primary key default gen_random_uuid(),
  platform text not null default 'linkedin' check (platform in ('linkedin','facebook','instagram','x','other')),
  title text not null,
  description text,
  link_url text,
  image_media_id uuid references public.media_items on delete set null,
  posted_at date,
  status text not null default 'published' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_social_updated before update on public.social_posts
  for each row execute function public.set_updated_at();

-- ---------- people: board, team ----------
create table public.people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  group_name text not null check (group_name in ('board','project_directors','field_team','advisors')),
  bio jsonb not null default '{}',
  email text,
  show_email boolean not null default false,   -- privacy default: hidden
  phone text,
  show_phone boolean not null default false,
  photo_media_id uuid references public.media_items on delete set null,
  sort_order int not null default 0,
  status text not null default 'published' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_people_group on public.people (group_name, sort_order);
create trigger trg_people_updated before update on public.people
  for each row execute function public.set_updated_at();

-- ---------- partners ----------
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null default 'institutional' check (kind in ('csr','institutional','government','network','donor','other')),
  description jsonb not null default '{}',
  url text,
  logo_media_id uuid references public.media_items on delete set null,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_partners_updated before update on public.partners
  for each row execute function public.set_updated_at();

-- ---------- emergency_notices ----------
create table public.emergency_notices (
  id uuid primary key default gen_random_uuid(),
  message jsonb not null default '{}',
  link_url text,
  severity text not null default 'info' check (severity in ('info','warning','urgent')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  active boolean not null default false,
  created_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_notices_updated before update on public.emergency_notices
  for each row execute function public.set_updated_at();

-- ---------- settings: singleton key/value ----------
create table public.settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_by uuid references auth.users,
  updated_at timestamptz not null default now()
);
create trigger trg_settings_updated before update on public.settings
  for each row execute function public.set_updated_at();

-- ---------- audit_logs ----------
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor uuid references auth.users,
  action text not null,                   -- 'create','update','delete','publish','unpublish','sync'
  entity text not null,                   -- table name
  entity_id text,
  diff jsonb,
  at timestamptz not null default now()
);
create index idx_audit_at on public.audit_logs (at desc);
