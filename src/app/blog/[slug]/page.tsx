import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { draftMode } from "next/headers";
import Prose from "@/components/flow/Prose";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import { t, type I18nText } from "@/lib/types";

export const revalidate = 300;

async function getPost(slug: string) {
  const { isEnabled } = await draftMode();
  const db = isEnabled ? await createClient() : createPublicClient();
  const { data } = await db
    .from("blog_posts")
    .select("slug, title, excerpt, body, tags, published_at")
    .eq("slug", slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${t(post.title as I18nText)} — AHEAD Initiatives`,
    description: t(post.excerpt as I18nText) || undefined,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-[#FAF7F0]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Link href="/#blog" className="inline-flex items-center gap-1.5 text-sm text-[#2D6A4F] hover:underline">
          <ArrowLeft className="h-4 w-4" /> All updates
        </Link>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-[#16324F] sm:text-4xl">
          {t(post.title as I18nText)}
        </h1>
        {post.published_at && (
          <time className="mt-2 block text-sm text-[#1F2933]/55">
            {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        )}
        <div className="mt-8">
          <Prose text={t(post.body as I18nText)} className="text-[#1F2933]/85" />
        </div>
      </div>
    </article>
  );
}
