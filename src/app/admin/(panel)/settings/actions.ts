"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { str } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  org_email: z.string().email(),
  channels_linkedin: z.string().url().optional().or(z.literal("")),
  channels_nabodisha: z.string().url().optional().or(z.literal("")),
});

export async function saveSettings(form: FormData) {
  const admin = await requireAdmin();
  schema.parse({
    org_email: str(form, "org_email"),
    channels_linkedin: str(form, "channels_linkedin"),
    channels_nabodisha: str(form, "channels_nabodisha"),
  });

  const db = await createClient();
  const updates: [string, Record<string, string>][] = [
    ["org", {
      name: str(form, "org_name"),
      legal: str(form, "org_legal"),
      cin: str(form, "org_cin"),
      licence: str(form, "org_licence"),
      fcra: str(form, "org_fcra"),
      address: str(form, "org_address"),
      phone: str(form, "org_phone"),
      email: str(form, "org_email"),
    }],
    ["channels", {
      youtube_handle: str(form, "channels_youtube_handle"),
      youtube_channel_id: str(form, "channels_youtube_channel_id"),
      linkedin: str(form, "channels_linkedin"),
      nabodisha: str(form, "channels_nabodisha"),
      legacy_site: str(form, "channels_legacy_site"),
    }],
    ["seo", {
      default_title: str(form, "seo_default_title"),
      default_description: str(form, "seo_default_description"),
    }],
  ];

  for (const [key, value] of updates) {
    const { error } = await db.from("settings").upsert({ key, value, updated_by: admin.id });
    if (error) throw new Error(error.message);
  }
  await logAudit(admin.id, "update", "settings", null);
  revalidatePath("/");
  redirect("/admin/settings?saved=1");
}
