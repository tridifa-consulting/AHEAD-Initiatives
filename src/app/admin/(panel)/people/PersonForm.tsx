import { Bilingual, Checkbox, Field, SaveBar, Select, TextInput } from "@/components/admin/ui";
import type { I18nText } from "@/lib/types";
import { deletePerson, savePerson } from "./actions";

type Person = {
  id?: string; name?: string; role?: string | null; group_name?: string;
  bio?: I18nText; email?: string | null; show_email?: boolean;
  phone?: string | null; show_phone?: boolean; status?: string; sort_order?: number;
};

export default function PersonForm({ person, saved }: { person?: Person; saved?: boolean }) {
  return (
    <>
      <form action={savePerson} className="mt-6 space-y-5">
        {person?.id && <input type="hidden" name="id" value={person.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <TextInput name="name" required defaultValue={person?.name ?? ""} />
          </Field>
          <Field label="Role / designation">
            <TextInput name="role" defaultValue={person?.role ?? ""} />
          </Field>
          <Field label="Group">
            <Select name="group_name" defaultValue={person?.group_name ?? "field_team"}>
              <option value="board">Board of Directors</option>
              <option value="project_directors">Project Directors</option>
              <option value="field_team">Core Field Team</option>
              <option value="advisors">Advisors</option>
            </Select>
          </Field>
          <Field label="Order within group">
            <TextInput name="sort_order" type="number" min={0} defaultValue={person?.sort_order ?? 0} />
          </Field>
        </div>
        <Bilingual label="Short bio (optional)" name="bio" en={person?.bio?.en} bn={person?.bio?.bn} rows={3} />
        <fieldset className="rounded-lg border border-[#16324F]/10 p-4">
          <legend className="px-1 text-sm font-medium text-[#16324F]">Contact details & consent</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email">
              <TextInput name="email" type="email" defaultValue={person?.email ?? ""} />
            </Field>
            <Field label="Phone">
              <TextInput name="phone" defaultValue={person?.phone ?? ""} />
            </Field>
          </div>
          <div className="mt-3 flex flex-wrap gap-5">
            <Checkbox name="show_email" label="This person consents to their email being public" defaultChecked={person?.show_email ?? false} />
            <Checkbox name="show_phone" label="…and their phone number" defaultChecked={person?.show_phone ?? false} />
          </div>
          <p className="mt-2 text-xs text-[#1F2933]/55">
            Contact details stay hidden on the website unless the boxes above are ticked.
          </p>
        </fieldset>
        <Field label="Status">
          <Select name="status" defaultValue={person?.status ?? "published"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
        <SaveBar backHref="/admin/people" saved={saved} />
      </form>
      {person?.id && (
        <form action={deletePerson} className="mt-4">
          <input type="hidden" name="id" value={person.id} />
          <button className="text-sm text-[#C65D3B] hover:underline">Remove this person</button>
        </form>
      )}
    </>
  );
}
