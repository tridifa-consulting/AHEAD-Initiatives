import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import PostForm from "../PostForm";

export const metadata = { title: "Edit post — AHEAD Admin", robots: { index: false } };

export default async function EditPost({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (!post) notFound();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Edit post</h1>
      <PostForm post={post} saved={saved === "1"} isAdmin={staff.role === "admin"} />
    </div>
  );
}
