import "server-only";
import { revalidatePath } from "next/cache";
import { requireStaff, type Staff } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Pull a bilingual jsonb value from paired form fields (name_en / name_bn). */
export function packI18n(form: FormData, name: string): Record<string, string> {
  const out: Record<string, string> = {};
  const en = String(form.get(`${name}_en`) ?? "").trim();
  const bn = String(form.get(`${name}_bn`) ?? "").trim();
  if (en) out.en = en;
  if (bn) out.bn = bn;
  return out;
}

export function str(form: FormData, name: string): string {
  return String(form.get(name) ?? "").trim();
}

export function bool(form: FormData, name: string): boolean {
  return form.get(name) === "on";
}

/**
 * Run an authenticated admin mutation:
 * verify staff → execute → audit → revalidate the public page.
 * The staff-session Supabase client enforces RLS as the backstop.
 */
export async function mutate(
  action: "create" | "update" | "delete" | "publish" | "unpublish",
  entity: string,
  fn: (db: SupabaseClient, staff: Staff) => Promise<string | null>
): Promise<void> {
  const staff = await requireStaff();
  const db = await createClient();
  const entityId = await fn(db, staff);
  await logAudit(staff.id, action, entity, entityId);
  revalidatePath("/");
  revalidatePath("/admin");
}
