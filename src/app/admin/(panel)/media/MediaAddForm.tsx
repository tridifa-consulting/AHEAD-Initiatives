"use client";

import { useState } from "react";
import DrivePicker, { type DrivePick } from "@/components/admin/DrivePicker";
import { Checkbox, Field, Select, TextInput } from "@/components/admin/ui";
import { addMedia } from "./actions";

/** Add an image: paste a link, use a site path, or pick from Google Drive. */
export default function MediaAddForm() {
  const [pick, setPick] = useState<DrivePick | null>(null);

  return (
    <form action={addMedia} className="rounded-xl border border-[#16324F]/10 bg-white p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <DrivePicker kind="images" onPick={setPick} />
        {pick && (
          <span className="text-sm text-[#2D6A4F]">
            Picked from Drive: <strong>{pick.name}</strong>
          </span>
        )}
      </div>
      {/* Drive pick fills these hidden fields; manual entry works without it */}
      <input type="hidden" name="drive_file_id" value={pick?.driveFileId ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <TextInput name="title" required defaultValue={pick?.name ?? ""} key={pick?.driveFileId ?? "manual"} />
        </Field>
        <Field label="Alt text" hint="Describes the image for screen readers">
          <TextInput name="alt" />
        </Field>
        <Field label="Collection" hint="hero, gallery_education, gallery_food, partners…">
          <TextInput name="collection" required defaultValue="gallery" />
        </Field>
        <Field label="Source">
          <Select name="source" defaultValue={pick ? "drive" : "external"} key={`src-${pick?.driveFileId ?? "m"}`}>
            <option value="external">Image link (URL)</option>
            <option value="drive">Google Drive</option>
            <option value="local">On this website (/…)</option>
          </Select>
        </Field>
        <Field label="Image link (URL)">
          <TextInput name="url" type="url" defaultValue={pick?.thumbnailUrl ?? ""} key={`url-${pick?.driveFileId ?? "m"}`} />
        </Field>
        <Field label="Site file path" hint="e.g. /hero/hero-education.jpg">
          <TextInput name="file_path" />
        </Field>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <Checkbox name="published" label="Publish immediately" defaultChecked />
        <button className="rounded-lg bg-[#2D6A4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#245a42]">
          Add image
        </button>
      </div>
      <p className="mt-3 text-xs text-[#1F2933]/55">
        For Drive images, make sure the file is shared as “Anyone with the link can view”,
        otherwise visitors won&apos;t see it.
      </p>
    </form>
  );
}
