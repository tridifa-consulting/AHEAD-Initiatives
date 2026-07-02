-- Security hardening from Supabase advisor findings:
-- 1. Move helper functions out of the REST-exposed `public` schema
--    so they cannot be invoked via /rest/v1/rpc/*. Policies and
--    triggers reference functions by OID, so they keep working.
-- 2. Pin search_path on set_updated_at.

create schema if not exists private;
grant usage on schema private to anon, authenticated;

alter function public.set_updated_at() set search_path = public;

alter function public.is_staff() set schema private;
alter function public.is_admin() set schema private;
alter function public.handle_new_user() set schema private;
alter function public.set_updated_at() set schema private;

revoke execute on function private.handle_new_user() from anon, authenticated;
