import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Bilingual, Checkbox, Field, SaveBar, Select } from "@/components/admin/ui";
import { saveSection } from "../actions";
import type { I18nText } from "@/lib/types";

export const metadata = { title: "Edit chapter — AHEAD Admin", robots: { index: false } };

export default async function EditSection({
  params, searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireStaff();
  const { slug } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: s } = await supabase.from("site_sections").select("*").eq("slug", slug).single();
  if (!s) notFound();

  const title = s.title as I18nText, subtitle = s.subtitle as I18nText, body = s.body as I18nText;

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">
        Edit chapter · {title.en ?? slug}
      </h1>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        In the body, leave a blank line between paragraphs; start lines with “- ” for a bullet
        list; wrap words in **double asterisks** for bold.
      </p>
      <form action={saveSection} className="mt-6 space-y-5">
        <input type="hidden" name="slug" value={s.slug} />
        <Bilingual label="Title" name="title" en={title.en} bn={title.bn} />
        <Bilingual label="Subtitle" name="subtitle" en={subtitle.en} bn={subtitle.bn} />
        <Bilingual label="Body" name="body" en={body.en} bn={body.bn} rows={10} />
        <div className="flex flex-wrap items-end gap-5">
          <Field label="Status" hint="Draft chapters are hidden from visitors">
            <Select name="status" defaultValue={s.status}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </Field>
          <Checkbox name="visible" label="Visible on the page" defaultChecked={s.visible} />
        </div>
        <SaveBar backHref="/admin/sections" saved={saved === "1"} />
      </form>
    </div>
  );
}
