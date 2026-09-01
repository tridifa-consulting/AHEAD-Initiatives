"use client";

import {
  ArrowUpRight,
} from "lucide-react";

const FACEBOOK_PUBLIC_URL =
  "https://www.facebook.com/people/AHEAD-Initiatives/61582729498601/";

/**
 * The Page Plugin is intentionally pointed at the stable numeric Page URL,
 * not the public /people/... route. Meta's Page Plugin can fail silently
 * when it does not recognise the supplied public route as an embeddable Page.
 */
const FACEBOOK_PLUGIN_PAGE_URL =
  "https://www.facebook.com/61582729498601";

const FACEBOOK_EMBED_URL =
  "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F61582729498601&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false";

export default function FacebookPageFeed() {
  return (
    <section
      aria-label="Latest updates from AHEAD Initiatives on Facebook"
      className="relative border-t border-[#064E7A]/10 pt-10 sm:pt-12"
    >
      <div className="mb-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-[#1877F2]/45" />

            <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
              Facebook
            </span>
          </div>

          <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
            Latest on Facebook
          </h3>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#526B75]/65">
            Recent public updates from AHEAD Initiatives.
          </p>
        </div>

        <a
          href={FACEBOOK_PUBLIC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-4 py-2.5 font-[var(--font-display)] text-[0.66rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2]"
        >
          Visit AHEAD on Facebook
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="overflow-hidden rounded-[1.4rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-3 shadow-[0_8px_28px_rgba(6,78,122,0.055)] sm:p-4">
        <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-[1rem] bg-white">
          <iframe
            src={FACEBOOK_EMBED_URL}
            title="AHEAD Initiatives Facebook timeline"
            loading="lazy"
            width="500"
            height="620"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="block h-[620px] w-full border-0"
          />
        </div>
      </div>

      <div className="mt-7 flex justify-center sm:hidden">
        <a
          href={FACEBOOK_PUBLIC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-5 py-2.5 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985]"
        >
          Visit AHEAD on Facebook
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
