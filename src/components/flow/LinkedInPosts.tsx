"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

const LINKEDIN_PAGE_URL =
  "https://www.linkedin.com/company/theahead-initiatives/";

const INITIAL_VISIBLE = 4;
const BATCH_SIZE = 4;

const LINKEDIN_POSTS = [
  {
    id: "7478431269866090496",
    url: "https://www.linkedin.com/posts/theahead-initiatives_aheadinitiatives-fpsa-exposurevisit-activity-7478431269866090496-81js",
  },
  {
    id: "7472623835490500608",
    url: "https://www.linkedin.com/posts/theahead-initiatives_sustainablelivelihoods-nutritionsecurity-activity-7472623835490500608-8b80",
  },
  {
    id: "7463207707295268865",
    url: "https://www.linkedin.com/posts/theahead-initiatives_aheadinitiatives-socialimpact-educationforall-activity-7463207707295268865-fumZ",
  },
  {
    id: "7459949785249107969",
    url: "https://www.linkedin.com/posts/theahead-initiatives_aheadinitiatives-odishalivelihoodmission-activity-7459949785249107969-xO92",
  },
  {
    id: "7439919402957025280",
    url: "https://www.linkedin.com/posts/theahead-initiatives_womensday-ruralwomen-communityleadership-activity-7439919402957025280-ddwP",
  },
  {
    id: "7431366090024226816",
    url: "https://www.linkedin.com/posts/theahead-initiatives_sustainabledevelopment-waterconservation-activity-7431366090024226816-2RPO",
  },
  {
    id: "7430509126994022400",
    url: "https://www.linkedin.com/posts/theahead-initiatives_numeracyskills-foundationallearning-fln-activity-7430509126994022400-I50C",
  },
  {
    id: "7424360551968919552",
    url: "https://www.linkedin.com/posts/theahead-initiatives_aheadinitiatives-organisationalgovernance-activity-7424360551968919552-oqHM",
  },
  {
    id: "7422210898506797056",
    url: "https://www.linkedin.com/posts/theahead-initiatives_participatorylearning-msc-ruraldevelopment-activity-7422210898506797056-F4za",
  },
  {
    id: "7419718259735781376",
    url: "https://www.linkedin.com/posts/theahead-initiatives_aheadinitiatives-foundationalliteracy-foundationalnumeracy-activity-7419718259735781376-zsGR",
  },
  {
    id: "7419675619996753920",
    url: "https://www.linkedin.com/posts/theahead-initiatives_aheadinitiatives-foodsovereignty-womenatthecenter-activity-7419675619996753920-B5k_",
  },
  {
    id: "7417471554873159680",
    url: "https://www.linkedin.com/posts/theahead-initiatives_communityvoices-msc-grassrootschange-activity-7417471554873159680-2YqF",
  },
] as const;

function LinkedInEmbed({
  post,
  index,
}: {
  post: (typeof LINKEDIN_POSTS)[number];
  index: number;
}) {
  const embedUrl =
    `https://www.linkedin.com/embed/feed/update/urn:li:activity:${post.id}`;

  return (
    <article className="min-w-0 overflow-hidden rounded-[1.35rem] border border-[#064E7A]/10 bg-[#FFFDF8] shadow-[0_8px_26px_rgba(6,78,122,0.055)]">
      <div className="flex items-center justify-between border-b border-[#064E7A]/8 px-4 py-3">
        <span className="font-[var(--font-display)] text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-[#0A66C2]">
          LinkedIn
        </span>

        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open LinkedIn post ${index + 1}`}
          className="inline-flex items-center gap-1.5 font-[var(--font-display)] text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#526B75]/58 transition-colors hover:text-[#075985]"
        >
          Open post
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      <div className="bg-white">
        <iframe
          src={embedUrl}
          title={`AHEAD Initiatives LinkedIn post ${index + 1}`}
          loading="lazy"
          allowFullScreen
          frameBorder="0"
          className="block h-[570px] w-full border-0 sm:h-[600px]"
        />
      </div>
    </article>
  );
}

export default function LinkedInPosts() {
  const [
    visibleCount,
    setVisibleCount,
  ] = useState(
    INITIAL_VISIBLE
  );

  const visiblePosts =
    useMemo(
      () =>
        LINKEDIN_POSTS.slice(
          0,
          visibleCount
        ),
      [visibleCount]
    );

  const hasMore =
    visibleCount <
    LINKEDIN_POSTS.length;

  const showMore = () => {
    setVisibleCount(
      (current) =>
        Math.min(
          current +
            BATCH_SIZE,
          LINKEDIN_POSTS.length
        )
    );
  };

  return (
    <section
      aria-label="Selected updates from AHEAD Initiatives on LinkedIn"
      className="relative border-t border-[#064E7A]/10 pt-10 sm:pt-12"
    >
      <div className="mb-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-[#0A66C2]/45" />

            <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
              LinkedIn
            </span>
          </div>

          <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
            Latest on LinkedIn
          </h3>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#526B75]/65">
            Selected public updates from AHEAD Initiatives.
          </p>
        </div>

        <a
          href={LINKEDIN_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-4 py-2.5 font-[var(--font-display)] text-[0.66rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2]"
        >
          Visit AHEAD on LinkedIn

          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        {visiblePosts.map(
          (
            post,
            index
          ) => (
            <LinkedInEmbed
              key={post.id}
              post={post}
              index={index}
            />
          )
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {hasMore && (
          <button
            type="button"
            onClick={
              showMore
            }
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-5 py-2.5 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2]"
          >
            Show more LinkedIn posts

            <span className="text-[#526B75]/50">
              {Math.min(
                BATCH_SIZE,
                LINKEDIN_POSTS.length -
                  visibleCount
              )}
            </span>

            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        )}

        <a
          href={LINKEDIN_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-5 py-2.5 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985]"
        >
          Visit AHEAD on LinkedIn

          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
