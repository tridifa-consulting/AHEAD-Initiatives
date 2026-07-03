import { Field, SaveBar, Select, TextArea, TextInput } from "@/components/admin/ui";
import { deleteSocialPost, saveSocialPost } from "./actions";

type Card = {
  id?: string; platform?: string; title?: string; description?: string | null;
  link_url?: string | null; posted_at?: string | null; status?: string;
};

export default function SocialForm({ card, saved, isAdmin }: { card?: Card; saved?: boolean; isAdmin: boolean }) {
  return (
    <>
      <form action={saveSocialPost} className="mt-6 space-y-5">
        {card?.id && <input type="hidden" name="id" value={card.id} />}
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Platform">
            <Select name="platform" defaultValue={card?.platform ?? "linkedin"}>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="x">X (Twitter)</option>
              <option value="other">Other</option>
            </Select>
          </Field>
          <Field label="Posted on">
            <TextInput name="posted_at" type="date" defaultValue={card?.posted_at ?? ""} />
          </Field>
          <Field label="Status">
            <Select name="status" defaultValue={card?.status ?? "published"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </Field>
        </div>
        <Field label="Title">
          <TextInput name="title" required defaultValue={card?.title ?? ""} />
        </Field>
        <Field label="Short description">
          <TextArea name="description" rows={3} defaultValue={card?.description ?? ""} />
        </Field>
        <Field label="Link to the original post">
          <TextInput name="link_url" type="url" defaultValue={card?.link_url ?? ""} />
        </Field>
        <SaveBar backHref="/admin/social" saved={saved} />
      </form>
      {card?.id && isAdmin && (
        <form action={deleteSocialPost} className="mt-4">
          <input type="hidden" name="id" value={card.id} />
          <button className="text-sm text-[#C65D3B] hover:underline">Delete this card</button>
        </form>
      )}
    </>
  );
}
