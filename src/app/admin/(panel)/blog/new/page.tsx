import { requireStaff } from "@/lib/auth";
import PostForm from "../PostForm";

export const metadata = { title: "New post — AHEAD Admin", robots: { index: false } };

export default async function NewPost() {
  const staff = await requireStaff();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">New post</h1>
      <PostForm isAdmin={staff.role === "admin"} />
    </div>
  );
}
