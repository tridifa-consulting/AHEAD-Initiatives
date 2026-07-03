import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Enable/disable draft preview. Only signed-in staff may toggle it;
 * with draft mode on, the public page renders through the staff
 * session, so RLS reveals draft rows — a true preview of unpublished
 * content, secured by the same policies as the admin panel.
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const url = new URL(request.url);
  const draft = await draftMode();
  if (url.searchParams.get("disable") === "1") {
    draft.disable();
    redirect("/admin");
  }
  draft.enable();
  redirect(url.searchParams.get("to") ?? "/");
}
