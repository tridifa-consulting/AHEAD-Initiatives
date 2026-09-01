"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
} from "lucide-react";

const FACEBOOK_PUBLIC_URL =
  "https://www.facebook.com/people/AHEAD-Initiatives/61582729498601/";

const FACEBOOK_PLUGIN_PAGE_URL =
  "https://www.facebook.com/61582729498601";

const MIN_PLUGIN_WIDTH = 280;
const MAX_PLUGIN_WIDTH = 500;

export default function FacebookPageFeed() {
  const frameWrapRef =
    useRef<HTMLDivElement>(null);

  const [
    pluginWidth,
    setPluginWidth,
  ] = useState(
    MAX_PLUGIN_WIDTH
  );

  useEffect(() => {
    const element =
      frameWrapRef.current;

    if (!element) return;

    const updateWidth =
      () => {
        const width =
          Math.floor(
            element
              .getBoundingClientRect()
              .width
          );

        setPluginWidth(
          Math.max(
            MIN_PLUGIN_WIDTH,
            Math.min(
              MAX_PLUGIN_WIDTH,
              width
            )
          )
        );
      };

    updateWidth();

    const observer =
      new ResizeObserver(
        updateWidth
      );

    observer.observe(
      element
    );

    return () =>
      observer.disconnect();
  }, []);

  const isCompact =
    pluginWidth < 400;

  const pluginHeight =
    isCompact
      ? 540
      : 600;

  const embedUrl =
    useMemo(() => {
      const params =
        new URLSearchParams({
          href: FACEBOOK_PLUGIN_PAGE_URL,
          tabs: "timeline",
          width:
            String(
              pluginWidth
            ),
          height:
            String(
              pluginHeight
            ),
          small_header:
            isCompact
              ? "true"
              : "false",
          adapt_container_width:
            "true",
          hide_cover:
            "false",
          show_facepile:
            "false",
        });

      return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
    }, [
      isCompact,
      pluginHeight,
      pluginWidth,
    ]);

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
          className="hidden min-h-10 w-fit items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-4 py-2.5 font-[var(--font-display)] text-[0.66rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2] sm:inline-flex"
        >
          Visit AHEAD on Facebook
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mx-auto max-w-[560px]">
        <div className="overflow-hidden rounded-[1.35rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-2.5 shadow-[0_8px_28px_rgba(6,78,122,0.055)] sm:p-4">
          <div
            ref={frameWrapRef}
            className="mx-auto w-full max-w-[500px] overflow-hidden rounded-[0.9rem] bg-white"
          >
            <iframe
              key={`${pluginWidth}-${pluginHeight}`}
              src={embedUrl}
              title="AHEAD Initiatives Facebook timeline"
              loading="lazy"
              width={pluginWidth}
              height={pluginHeight}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              style={{
                width:
                  `${pluginWidth}px`,
                height:
                  `${pluginHeight}px`,
                maxWidth:
                  "100%",
              }}
              className="mx-auto block border-0"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center sm:hidden">
          <a
            href={FACEBOOK_PUBLIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-5 py-2.5 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2]"
          >
            Visit AHEAD on Facebook
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
