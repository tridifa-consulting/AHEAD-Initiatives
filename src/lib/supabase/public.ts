import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Public read-only client — anon key, NO cookies/session.
 * Used by the public site's server components so pages remain
 * statically renderable (ISR); reading cookies would force
 * dynamic rendering. RLS restricts this client to published rows.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
