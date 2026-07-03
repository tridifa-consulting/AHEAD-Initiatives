import "server-only";
import { createClient } from "@/lib/supabase/server";

/** Record an admin action. Failures are logged, never fatal. */
export async function logAudit(
  actor: string,
  action: "create" | "update" | "delete" | "publish" | "unpublish" | "sync",
  entity: string,
  entityId: string | null,
  diff?: Record<string, unknown>
) {
  const supabase = await createClient();
  const { error } = await supabase.from("audit_logs").insert({
    actor, action, entity, entity_id: entityId, diff: diff ?? null,
  });
  if (error) console.error("audit log failed:", error.message);
}
