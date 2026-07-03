import { Bilingual, Field, SaveBar, Select, TextInput } from "@/components/admin/ui";
import type { I18nText } from "@/lib/types";
import { deletePost, savePost } from "./actions";

type Post = {
  id?: string; slug?: string; title?: I18nText; excerpt?: I18nText;
  body?: I18nText; tags?: string[]; status?: string;
};

export default function PostForm({ post, saved, isAdmin }: { post?: Post; saved?: boolean; isAdmin: boolean }) {
  return (
    <>
      <form action={savePost} className="mt-6 space-y-5">
        {post?.id && <input type="hidden" name="id" value={post.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Web address (slug)" hint="lowercase-with-hyphens, e.g. srijangan-opens-in-satali">
            <TextInput name="slug" required pattern="[a-z0-9-]+" defaultValue={post?.slug ?? ""} />
          </Field>
          <Field label="Tags" hint="Comma-separated">
            <TextInput name="tags" defaultValue={(post?.tags ?? []).join(", ")} />
          </Field>
        </div>
        <Bilingual label="Title" name="title" en={post?.title?.en} bn={post?.title?.bn} />
        <Bilingual label="Short summary" name="excerpt" en={post?.excerpt?.en} bn={post?.excerpt?.bn} rows={3} />
        <Bilingual label="Post body" name="body" en={post?.body?.en} bn={post?.body?.bn} rows={14} />
        <Field label="Status" hint="Publishing sets the post's date the first time">
          <Select name="status" defaultValue={post?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
        <SaveBar backHref="/admin/blog" saved={saved} />
      </form>
      {post?.id && isAdmin && (
        <form action={deletePost} className="mt-4">
          <input type="hidden" name="id" value={post.id} />
          <button className="text-sm text-[#C65D3B] hover:underline">Delete this post</button>
        </form>
      )}
    </>
  );
}
