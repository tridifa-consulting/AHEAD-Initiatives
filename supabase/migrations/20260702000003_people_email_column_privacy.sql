-- Column-level privacy for people contact details.
-- RLS is row-level only; a direct anon API query could read the
-- email column even with show_email=false. Fix:
--   * anon loses direct SELECT on public.people
--   * anon reads via people_public, which masks email/phone
--     unless the person has opted in (show_email/show_phone)
--   * authenticated staff keep full table access via RLS
-- Note: this view is intentionally SECURITY DEFINER (flagged by the
-- Supabase linter). It filters to published rows and masks contact
-- columns, which is exactly why anon is allowed to read through it.

create view public.people_public
with (security_invoker = off) as
  select id, name, role, group_name, bio, photo_media_id, sort_order,
         case when show_email then email end as email,
         case when show_phone then phone end as phone,
         created_at, updated_at
  from public.people
  where status = 'published';

grant select on public.people_public to anon, authenticated;
revoke select on public.people from anon;
