import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Field, SaveBar, TextArea, TextInput } from "@/components/admin/ui";
import { saveSettings } from "./actions";

export const metadata = { title: "Site settings — AHEAD Admin", robots: { index: false } };

export default async function SettingsPage({
  searchParams,
}: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("key, value");
  const s = Object.fromEntries((data ?? []).map((r) => [r.key, r.value as Record<string, string>]));
  const org = s.org ?? {}, ch = s.channels ?? {}, seo = s.seo ?? {};

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Site settings</h1>
      <p className="mt-1 text-sm text-[#1F2933]/65">Admin only. These details appear across the website.</p>
      <form action={saveSettings} className="mt-6 space-y-6">
        <fieldset className="rounded-lg border border-[#16324F]/10 p-4">
          <legend className="px-1 text-sm font-medium text-[#16324F]">Organisation</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name"><TextInput name="org_name" defaultValue={org.name ?? ""} /></Field>
            <Field label="Legal form"><TextInput name="org_legal" defaultValue={org.legal ?? ""} /></Field>
            <Field label="CIN"><TextInput name="org_cin" defaultValue={org.cin ?? ""} /></Field>
            <Field label="MCA licence"><TextInput name="org_licence" defaultValue={org.licence ?? ""} /></Field>
            <Field label="FCRA registration"><TextInput name="org_fcra" defaultValue={org.fcra ?? ""} /></Field>
            <Field label="Phone"><TextInput name="org_phone" defaultValue={org.phone ?? ""} /></Field>
            <Field label="Email"><TextInput name="org_email" type="email" required defaultValue={org.email ?? ""} /></Field>
            <Field label="Address"><TextInput name="org_address" defaultValue={org.address ?? ""} /></Field>
          </div>
        </fieldset>
        <fieldset className="rounded-lg border border-[#16324F]/10 p-4">
          <legend className="px-1 text-sm font-medium text-[#16324F]">Channels</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="YouTube handle" hint="e.g. @aheadinitiatives4836">
              <TextInput name="channels_youtube_handle" defaultValue={ch.youtube_handle ?? ""} />
            </Field>
            <Field label="YouTube channel ID" hint="Needed for automatic video sync (next phase)">
              <TextInput name="channels_youtube_channel_id" defaultValue={ch.youtube_channel_id ?? ""} />
            </Field>
            <Field label="LinkedIn page"><TextInput name="channels_linkedin" type="url" defaultValue={ch.linkedin ?? ""} /></Field>
            <Field label="Nabodisha"><TextInput name="channels_nabodisha" type="url" defaultValue={ch.nabodisha ?? ""} /></Field>
            <Field label="Legacy site"><TextInput name="channels_legacy_site" defaultValue={ch.legacy_site ?? ""} /></Field>
          </div>
        </fieldset>
        <fieldset className="rounded-lg border border-[#16324F]/10 p-4">
          <legend className="px-1 text-sm font-medium text-[#16324F]">Search engines</legend>
          <Field label="Default page title">
            <TextInput name="seo_default_title" defaultValue={seo.default_title ?? ""} />
          </Field>
          <div className="mt-4">
            <Field label="Default description">
              <TextArea name="seo_default_description" rows={3} defaultValue={seo.default_description ?? ""} />
            </Field>
          </div>
        </fieldset>
        <SaveBar backHref="/admin" saved={saved === "1"} />
      </form>
    </div>
  );
}
