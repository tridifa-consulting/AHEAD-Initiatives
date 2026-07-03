import { Bilingual, Checkbox, Field, SaveBar, Select, TextInput } from "@/components/admin/ui";
import type { I18nText } from "@/lib/types";
import { deleteNotice, saveNotice } from "./actions";

type Notice = {
  id?: string; message?: I18nText; severity?: string;
  link_url?: string | null; ends_at?: string | null; active?: boolean;
};

export default function NoticeForm({ notice, saved, isAdmin }: { notice?: Notice; saved?: boolean; isAdmin: boolean }) {
  return (
    <>
      <form action={saveNotice} className="mt-6 space-y-5">
        {notice?.id && <input type="hidden" name="id" value={notice.id} />}
        <Bilingual label="Message" name="message" en={notice?.message?.en} bn={notice?.message?.bn} rows={2} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Urgency">
            <Select name="severity" defaultValue={notice?.severity ?? "info"}>
              <option value="info">Information (navy)</option>
              <option value="warning">Warning (marigold)</option>
              <option value="urgent">Urgent (terracotta)</option>
            </Select>
          </Field>
          <Field label="Link (optional)">
            <TextInput name="link_url" type="url" defaultValue={notice?.link_url ?? ""} />
          </Field>
          <Field label="Ends on (optional)" hint="Notice hides itself after this date">
            <TextInput
              name="ends_at" type="datetime-local"
              defaultValue={notice?.ends_at ? notice.ends_at.slice(0, 16) : ""}
            />
          </Field>
        </div>
        <Checkbox name="active" label="Show this notice on the website now" defaultChecked={notice?.active ?? false} />
        <SaveBar backHref="/admin/notices" saved={saved} />
      </form>
      {notice?.id && isAdmin && (
        <form action={deleteNotice} className="mt-4">
          <input type="hidden" name="id" value={notice.id} />
          <button className="text-sm text-[#C65D3B] hover:underline">Delete this notice</button>
        </form>
      )}
    </>
  );
}
