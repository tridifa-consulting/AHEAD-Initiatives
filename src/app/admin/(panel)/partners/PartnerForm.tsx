import { Bilingual, Field, SaveBar, Select, TextInput } from "@/components/admin/ui";
import type { I18nText } from "@/lib/types";
import { deletePartner, savePartner } from "./actions";

type Partner = {
  id?: string; name?: string; kind?: string; url?: string | null;
  description?: I18nText; status?: string; sort_order?: number;
};

export default function PartnerForm({ partner, saved }: { partner?: Partner; saved?: boolean }) {
  return (
    <>
      <form action={savePartner} className="mt-6 space-y-5">
        {partner?.id && <input type="hidden" name="id" value={partner.id} />}
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Name">
            <TextInput name="name" required defaultValue={partner?.name ?? ""} />
          </Field>
          <Field label="Type">
            <Select name="kind" defaultValue={partner?.kind ?? "institutional"}>
              <option value="csr">CSR partner</option>
              <option value="institutional">Institutional</option>
              <option value="government">Government</option>
              <option value="network">Network</option>
              <option value="donor">Donor</option>
              <option value="other">Other</option>
            </Select>
          </Field>
          <Field label="Website">
            <TextInput name="url" type="url" defaultValue={partner?.url ?? ""} />
          </Field>
        </div>
        <Bilingual label="About the partnership" name="description" en={partner?.description?.en} bn={partner?.description?.bn} rows={3} />
        <div className="flex items-end gap-5">
          <Field label="Status">
            <Select name="status" defaultValue={partner?.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </Field>
          <Field label="Order">
            <TextInput name="sort_order" type="number" min={0} defaultValue={partner?.sort_order ?? 0} />
          </Field>
        </div>
        <SaveBar backHref="/admin/partners" saved={saved} />
      </form>
      {partner?.id && (
        <form action={deletePartner} className="mt-4">
          <input type="hidden" name="id" value={partner.id} />
          <button className="text-sm text-[#C65D3B] hover:underline">Delete this partner</button>
        </form>
      )}
    </>
  );
}
