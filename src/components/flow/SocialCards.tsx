

import {
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Globe2,
} from "lucide-react";
import type { SocialPostRow } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

type DisplayPost =
  SocialPostRow & {
    image_url?: string | null;
    thumbnail_url?: string | null;
    media_url?: string | null;
  };

function platformLabel(
  platform?: string | null
) {
  const value =
    (platform ?? "")
      .trim()
      .toLowerCase();

  if (value === "x" || value === "twitter") {
    return "X";
  }

  if (value === "youtube") {
    return "YouTube";
  }

  if (value === "linkedin") {
    return "LinkedIn";
  }

  if (value === "instagram") {
    return "Instagram";
  }

  if (value === "facebook" || value === "meta") {
    return "Facebook";
  }

  if (value === "threads") {
    return "Threads";
  }

  return platform?.trim() || "Social";
}

function formatDate(
  value?: string | null
) {
  if (!value) return "";

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function SocialCard({
  post,
  index,
  reduced,
}: {
  post: DisplayPost;
  index: number;
  reduced: boolean | null;
}) {
  const platform =
    platformLabel(
      post.platform
    );

  const date =
    formatDate(
      post.posted_at
    );

  const image =
    post.image_url ??
    post.thumbnail_url ??
    post.media_url ??
    null;

  const content = (
    <>
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-[#064E7A]/9 bg-[#E8E1D4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#031F2E]/28 to-transparent"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[#67E8F9]"
            />

            <span className="font-[var(--font-display)] text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[#075985]">
              {platform}
            </span>
          </div>

          <span
            aria-hidden
            className="font-[var(--font-display)] text-[0.62rem] font-extrabold tracking-[0.08em] text-[#0891B2]/25"
          >
            {String(
              index + 1
            ).padStart(
              2,
              "0"
            )}
          </span>
        </div>

        <h4 className="mt-4 font-serif text-[1.08rem] font-bold leading-[1.32] tracking-[-0.022em] text-[#064E7A] sm:text-[1.15rem]">
          {post.title}
        </h4>

        {post.description && (
          <p className="mt-2.5 line-clamp-4 text-[0.78rem] font-medium leading-[1.65] text-[#526B75]/76 sm:text-[0.82rem]">
            {
              post.description
            }
          </p>
        )}

        <div className="mt-auto pt-5">
          <div className="h-px w-full bg-[#064E7A]/8" />

          <div className="flex items-center justify-between gap-4 pt-3.5">
            <span className="text-[0.67rem] font-semibold text-[#526B75]/58">
              {date}
            </span>

            {post.link_url && (
              <span className="inline-flex items-center gap-1.5 font-[var(--font-display)] text-[0.62rem] font-extrabold uppercase tracking-[0.11em] text-[#B96543] transition-colors group-hover:text-[#075985]">
                View post

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <motion.li
      layout
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 6,
      }}
      transition={{
        duration: 0.35,
        delay:
          Math.min(
            index,
            5
          ) * 0.035,
        ease,
      }}
      className="h-full"
    >
      {post.link_url ? (
        <a
          href={
            post.link_url
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#064E7A]/10 bg-[#FFFDF8] shadow-[0_8px_26px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/28 hover:shadow-[0_18px_44px_rgba(6,78,122,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0891B2]"
        >
          {content}
        </a>
      ) : (
        <article className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#064E7A]/10 bg-[#FFFDF8] shadow-[0_8px_26px_rgba(6,78,122,0.055)]">
          {content}
        </article>
      )}
    </motion.li>
  );
}

/**
 * Unified presentation layer for AHEAD's social activity.
 *
 * Today it accepts the existing SocialPostRow[] data source.
 * Later, YouTube / LinkedIn / Instagram / Facebook / X connectors can
 * normalize into the same structure without redesigning this section.
 */
export default function SocialCards({
  posts,
}: {
  posts: SocialPostRow[];
}) {
  const reduced =
    useReducedMotion();

  const displayPosts =
    posts as DisplayPost[];

  const platforms =
    useMemo(() => {
      const values =
        displayPosts
          .map((post) =>
            platformLabel(
              post.platform
            )
          )
          .filter(Boolean);

      return [
        "All",
        ...Array.from(
          new Set(values)
        ),
      ];
    }, [displayPosts]);

  const [
    selected,
    setSelected,
  ] =
    useState("All");

  const filtered =
    useMemo(
      () =>
        selected === "All"
          ? displayPosts
          : displayPosts.filter(
              (post) =>
                platformLabel(
                  post.platform
                ) === selected
            ),
      [
        displayPosts,
        selected,
      ]
    );

  if (
    displayPosts.length === 0
  ) {
    return null;
  }

  return (
    <section
      aria-label="AHEAD social media updates"
      className="relative border-t border-[#064E7A]/10 pt-10 sm:pt-12"
    >
      {/* Section header */}
      <div className="mb-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-[#0891B2]/55" />

            <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
              Across AHEAD&apos;s digital channels
            </span>
          </div>

          <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
            Social Media Updates
          </h3>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#526B75]/65">
            A glance at AHEAD&apos;s recent public updates across its connected social platforms.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#0891B2]/58">
          <Globe2 className="h-3.5 w-3.5" />
          {displayPosts.length} updates
        </div>
      </div>

      {/* Platform filters */}
      {platforms.length >
        2 && (
        <div
          role="group"
          aria-label="Filter social media updates by platform"
          className="mb-6 flex flex-wrap gap-2"
        >
          {platforms.map(
            (platform) => {
              const active =
                selected ===
                platform;

              return (
                <button
                  key={
                    platform
                  }
                  type="button"
                  onClick={() =>
                    setSelected(
                      platform
                    )
                  }
                  aria-pressed={
                    active
                  }
                  className={`rounded-full border px-3.5 py-2 font-[var(--font-display)] text-[0.66rem] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2] ${
                    active
                      ? "border-[#064E7A] bg-[#064E7A] text-[#FFF8EA] shadow-[0_5px_14px_rgba(6,78,122,0.12)]"
                      : "border-[#064E7A]/11 bg-[#FFFDF8]/80 text-[#425A64] hover:border-[#0891B2]/28 hover:bg-[#EAFBFD]"
                  }`}
                >
                  {
                    platform
                  }
                </button>
              );
            }
          )}
        </div>
      )}

      <AnimatePresence
        mode="popLayout"
      >
        <motion.ul
          layout
          key={selected}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map(
            (
              post,
              index
            ) => (
              <SocialCard
                key={
                  post.id
                }
                post={
                  post
                }
                index={
                  index
                }
                reduced={
                  reduced
                }
              />
            )
          )}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
