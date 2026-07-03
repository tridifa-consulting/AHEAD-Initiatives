import { Checkbox, Field, SaveBar, Select, TextArea, TextInput } from "@/components/admin/ui";
import type { DocumentRow } from "@/lib/types";
import DocumentDrivePick from "./DocumentDrivePick";
import { deleteDocument, saveDocument } from "./actions";

const categories: [DocumentRow["category"], string][] = [
  ["annual_report", "Annual report"], ["financial", "Financial statement"],
  ["fcra_quarterly", "FCRA quarterly"], ["fcra_annual", "FCRA annual"],
  ["mca_filing", "MCA filing"], ["it_return", "IT return"], ["policy", "Policy"],
  ["publication", "Publication"], ["newsletter", "Newsletter"], ["other", "Other"],
];

export default function DocumentForm({
  doc, saved, isAdmin,
}: { doc?: Partial<DocumentRow>; saved?: boolean; isAdmin: boolean }) {
  return (
    <>
      <form action={saveDocument} className="mt-6 space-y-5">
        {doc?.id && <input type="hidden" name="id" value={doc.id} />}
        <Field label="Title">
          <TextInput name="title" required defaultValue={doc?.title ?? ""} />
        </Field>
        <Field label="Description">
          <TextArea name="description" rows={3} defaultValue={doc?.description ?? ""} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Category">
            <Select name="category" defaultValue={doc?.category ?? "publication"}>
              {categories.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </Select>
          </Field>
          <Field label="Collection" hint="e.g. english_publications, aoc">
            <TextInput name="subcategory" defaultValue={doc?.subcategory ?? ""} />
          </Field>
          <Field label="Author">
            <TextInput name="author" defaultValue={doc?.author ?? ""} />
          </Field>
          <Field label="Year" hint="e.g. 2024 or FY 2023-24">
            <TextInput name="year" defaultValue={doc?.year ?? ""} />
          </Field>
          <Field label="Quarter">
            <Select name="quarter" defaultValue={doc?.quarter ?? ""}>
              <option value="">—</option>
              {["Q1", "Q2", "Q3", "Q4"].map((q) => <option key={q}>{q}</option>)}
            </Select>
          </Field>
          <Field label="Language">
            <Select name="language" defaultValue={doc?.language ?? "en"}>
              <option value="en">English</option>
              <option value="bn">Bengali</option>
              <option value="multi">Multiple</option>
            </Select>
          </Field>
        </div>
        <Field label="Tags" hint="Comma-separated">
          <TextInput name="tags" defaultValue={""} />
        </Field>
        <fieldset className="rounded-lg border border-[#16324F]/10 p-4">
          <legend className="px-1 text-sm font-medium text-[#16324F]">File location</legend>
          <DocumentDrivePick initialId={doc?.drive_file_id} initialUrl={doc?.drive_url} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Source">
              <Select name="source" defaultValue={doc?.source ?? "external"}>
                <option value="local">On this website (/pdf/…)</option>
                <option value="external">External link</option>
                <option value="drive">Google Drive</option>
                <option value="storage">Uploaded to storage</option>
              </Select>
            </Field>
            <Field label="Site file path" hint="For files in /public, e.g. /pdf/fcra/…">
              <TextInput name="file_path" defaultValue={doc?.file_path ?? ""} />
            </Field>
            <Field label="External URL">
              <TextInput name="external_url" type="url" defaultValue={doc?.external_url ?? ""} />
            </Field>
          </div>
          <p className="mt-3 text-xs text-[#1F2933]/55">
            Drive files must be shared as “Anyone with the link can view” to open for visitors.
          </p>
        </fieldset>
        <div className="flex flex-wrap items-end gap-5">
          <Field label="Status">
            <Select name="status" defaultValue={doc?.status ?? "published"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </Field>
          <Field label="Order">
            <TextInput name="sort_order" type="number" min={0} defaultValue={doc?.sort_order ?? 0} />
          </Field>
          <Checkbox name="visible" label="Visible" defaultChecked={doc?.visible ?? true} />
          <Checkbox name="file_available" label="File is available" defaultChecked={doc?.file_available ?? true} />
        </div>
        <SaveBar backHref="/admin/documents" saved={saved} />
      </form>
      {doc?.id && isAdmin && (
        <form action={deleteDocument} className="mt-4">
          <input type="hidden" name="id" value={doc.id} />
          <button className="text-sm text-[#C65D3B] hover:underline">Delete this document</button>
        </form>
      )}
    </>
  );
}
