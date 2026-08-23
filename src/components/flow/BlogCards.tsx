"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostRow } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   DATE
───────────────────────────────────────────────────────────── */

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED / FIRST UPDATE
───────────────────────────────────────────────────────────── */

function FeaturedPost({
  post,
  reduced,
}: {
  post: BlogPostRow;
  reduced: boolean | null;
}) {
  return (
    <motion.article
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "0px 0px -10% 0px",
      }}
      transition={{
        duration: 0.6,
        ease,
      }}
      className="lg:col-span-2"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[1.8rem] border border-[#67E8F9]/20 bg-[#064E7A] p-7 text-white shadow-[0_20px_60px_rgba(6,78,122,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,78,122,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67E8F9] sm:p-9"
      >
        {/* Background atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(103,232,249,0.16),transparent_24rem),radial-gradient(circle_at_5%_100%,rgba(216,164,65,0.09),transparent_20rem),linear-gradient(135deg,#053B5E_0%,#064E7A_58%,#075985_100%)]"
        />

        {/* Quiet archival grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* Aqua top rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#67E8F9] via-[#A5F3FC] to-[#D8A441]"
        />

        <div className="relative flex h-full flex-col">
          {/* Date */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {post.published_at ? (
              <time className="font-[var(--font-display)] text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-[#B9F6FF]/75">
                {formatDate(
                  post.published_at
                )}
              </time>
            ) : (
              <span />
            )}

            <span
              aria-hidden
              className="font-[var(--font-display)] text-[2.8rem] font-extrabold leading-none tracking-[-0.06em] text-white/[0.07]"
            >
              01
            </span>
          </div>

          {/* Main content */}
          <div className="my-auto py-7">
            <h3 className="max-w-3xl font-serif text-[1.9rem] font-bold leading-[1.2] tracking-[-0.035em] text-[#FFF8EA] sm:text-[2.35rem]">
              {t(post.title)}
            </h3>

            {t(post.excerpt) && (
              <p className="mt-5 max-w-2xl text-[0.96rem] font-medium leading-[1.8] text-white/68">
                {t(post.excerpt)}
              </p>
            )}
          </div>

          {/* Action */}
          <div className="mt-auto border-t border-white/12 pt-5">
            <span className="inline-flex items-center gap-2 font-[var(--font-display)] text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#B9F6FF] transition-colors duration-200 group-hover:text-[#FFE29A]">
              Read more

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   STANDARD UPDATE
───────────────────────────────────────────────────────────── */

function PostCard({
  post,
  index,
  reduced,
}: {
  post: BlogPostRow;
  index: number;
  reduced: boolean | null;
}) {
  return (
    <motion.article
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: 16,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: 0.48,
        delay:
          Math.min(index, 6) *
          0.055,
        ease,
      }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-6 shadow-[0_8px_28px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/28 hover:shadow-[0_18px_42px_rgba(6,78,122,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0891B2]"
      >
        {/* Top identity rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
        />

        {/* Corner atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full border border-[#0891B2]/8 bg-[#67E8F9]/5 transition-transform duration-500 group-hover:scale-110"
        />

        <div className="relative flex h-full flex-col">
          {/* Date + sequence */}
          <div className="flex items-start justify-between gap-4">
            {post.published_at ? (
              <time className="font-[var(--font-display)] text-[0.61rem] font-bold uppercase tracking-[0.16em] text-[#526B75]/58">
                {formatDate(
                  post.published_at
                )}
              </time>
            ) : (
              <span />
            )}

            <span
              aria-hidden
              className="font-[var(--font-display)] text-[2rem] font-extrabold leading-none tracking-[-0.05em] text-[#0891B2]/10"
            >
              {String(
                index + 1
              ).padStart(2, "0")}
            </span>
          </div>

          {/* Editorial rule */}
          <div
            aria-hidden
            className="mt-5 h-px w-9 bg-[#B96543]/55"
          />

          {/* Title */}
          <h3 className="mt-5 font-serif text-[1.2rem] font-bold leading-[1.35] tracking-[-0.025em] text-[#064E7A] sm:text-[1.28rem]">
            {t(post.title)}
          </h3>

          {/* Excerpt */}
          {t(post.excerpt) && (
            <p className="mt-3 flex-1 text-[0.82rem] font-medium leading-[1.75] text-[#526B75]/72">
              {t(post.excerpt)}
            </p>
          )}

          {/* Read action */}
          <div className="mt-6 border-t border-[#064E7A]/8 pt-4">
            <span className="inline-flex items-center gap-2 font-[var(--font-display)] text-[0.67rem] font-extrabold uppercase tracking-[0.13em] text-[#B96543] transition-colors duration-200 group-hover:text-[#075985]">
              Read more

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   BLOG / FIELD UPDATE COLLECTION
───────────────────────────────────────────────────────────── */

export default function BlogCards({
  posts,
}: {
  posts: BlogPostRow[];
}) {
  const reduced = useReducedMotion();

  /*
   * Preserve the original empty-state wording exactly.
   */
  if (posts.length === 0) {
    return (
      <div className="rounded-[1.4rem] border border-dashed border-[#064E7A]/16 bg-[#FFFDF8]/65 px-6 py-10 text-center">
        <p className="text-sm font-medium text-[#526B75]/65">
          Updates from the field will appear here.
        </p>
      </div>
    );
  }

  const [featured, ...rest] =
    posts;

  return (
    <div className="relative">
      {/* Quiet atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-20 -z-10 h-64 w-64 rounded-full bg-[#67E8F9]/7 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-[#D8A441]/6 blur-3xl"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Latest / first post gets editorial prominence */}
        <FeaturedPost
          post={featured}
          reduced={reduced}
        />

        {/* Remaining posts */}
        {rest.map(
          (post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index + 1}
              reduced={reduced}
            />
          )
        )}
      </div>
    </div>
  );
}
