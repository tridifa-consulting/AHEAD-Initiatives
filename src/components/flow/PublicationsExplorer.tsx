"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  BookOpen,
  FileText,
  ArrowUpRight,
  X,
  ChevronDown,
} from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import PdfThumbnail from "./PdfThumbnail";

const ease = [0.22, 1, 0.36, 1] as const;

const PAGE_SIZE = 12;

/*
 * "All" deliberately comes last.
 *
 * This prevents the archive from presenting all 82 materials as
 * the default experience and forcing visitors to scroll through
 * the entire library before reaching the following homepage sections.
 */
const shelves = [
  {
    key: "english_publications",
    label: "English",
  },
  {
    key: "bengali_publications",
    label: "Bengali",
  },
  {
    key: "nabodisha",
    label: "Nabodisha",
  },
  {
    key: "other_materials",
    label: "Field Reports",
  },
  {
    key: "all",
    label: "All",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */

function collectionLabel(
  subcategory?: string | null
) {
  return (
    shelves.find(
      (item) =>
        item.key === subcategory
    )?.label ?? ""
  );
}

/*
 * Publication availability is determined from the actual stored
 * document locations, not the legacy file_available boolean.
 *
 * This is important because several older publication rows still have
 * file_available=false even though external PDF links now exist.
 *
 * Priority:
 *   1. external_url
 *   2. drive_url
 *   3. file_path
 *
 * A publication is "In print" only when none of these contains a usable URL.
 */
function publicationHref(
  document: DocumentRow
) {
  const candidates = [
    document.external_url,
    document.drive_url,
    document.file_path,
  ];

  for (const candidate of candidates) {
    if (
      typeof candidate === "string" &&
      candidate.trim().length > 0
    ) {
      return candidate.trim();
    }
  }

  return null;
}

function isPdf(href?: string | null) {
  if (!href) return false;

  const clean = href
    .split("?")[0]
    .split("#")[0]
    .toLowerCase();

  return clean.endsWith(".pdf");
}

/*
 * Browser PDF viewer URL.
 *
 * Nothing about the underlying document URL is altered.
 * The fragment only tells the browser's PDF viewer how we would
 * prefer the first-page preview to be displayed.
 */
function pdfPreviewHref(href: string) {
  return `${href}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
}

/* ─────────────────────────────────────────────────────────────
   Lazy PDF preview
───────────────────────────────────────────────────────────── */

function PdfPreview({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const hostRef =
    useRef<HTMLDivElement>(null);

  const [nearViewport, setNearViewport] =
    useState(false);

  /*
   * Do not mount dozens of browser PDF viewers immediately.
   *
   * The iframe is created only when its publication card is close
   * to the viewport. This matters especially for Bengali / All.
   */
  useEffect(() => {
    const el = hostRef.current;

    if (!el) return;

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      setNearViewport(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setNearViewport(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: "500px 0px",
        }
      );

    observer.observe(el);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative h-full w-full bg-[#EEE6D8]"
    >
      {nearViewport ? (
        <iframe
          src={pdfPreviewHref(href)}
          title={`Preview of ${title}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-white"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText
            aria-hidden
            className="h-9 w-9 text-[#064E7A]/20"
          />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Adaptive PDF preview

   Desktop browsers keep the existing native first-page iframe because
   it already works well there.

   Touch/mobile devices use PDF.js so Android/iOS cannot replace the
   card with their own "PDF / filename / Open" interface.
───────────────────────────────────────────────────────────── */

function AdaptivePdfPreview({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const [mode, setMode] =
    useState<
      "checking" |
      "pdfjs" |
      "native"
    >("checking");

  useEffect(() => {
    const ua =
      navigator.userAgent;

    const mobileOS =
      /Android|iPhone|iPad|iPod/i.test(
        ua
      );

    /*
     * iPadOS can report itself as Macintosh when requesting
     * desktop-class websites.
     */
    const iPadDesktopMode =
      navigator.platform ===
        "MacIntel" &&
      navigator.maxTouchPoints >
        1;

    const coarsePointer =
      typeof window
        .matchMedia ===
      "function"
        ? window.matchMedia(
            "(hover: none) and (pointer: coarse)"
          ).matches
        : false;

    setMode(
      mobileOS ||
        iPadDesktopMode ||
        coarsePointer
        ? "pdfjs"
        : "native"
    );
  }, []);

  if (
    mode === "checking"
  ) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#EEE6D8]">
        <FileText
          aria-hidden
          className="h-9 w-9 text-[#064E7A]/20"
        />
      </div>
    );
  }

  return mode ===
    "pdfjs" ? (
    <PdfThumbnail
      href={href}
      title={title}
    />
  ) : (
    <PdfPreview
      href={href}
      title={title}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Print-only visual cover
───────────────────────────────────────────────────────────── */

function PrintCover({
  document,
  collection,
}: {
  document: DocumentRow;
  collection: string;
}) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#F6EEDC] px-7 py-8">
      {/* Paper detail */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,78,122,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(185,101,67,0.025) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-2">
          <BookOpen
            aria-hidden
            className="h-4 w-4 text-[#0891B2]"
          />

          <span className="font-[var(--font-display)] text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-[#526B75]/70">
            {collection ||
              "AHEAD Publication"}
          </span>
        </div>

        <div className="mt-8 h-px w-10 bg-[#B96543]/60" />
      </div>

      <div className="relative flex flex-1 items-center">
        <h4 className="font-serif text-[1.25rem] font-bold leading-[1.35] tracking-[-0.025em] text-[#064E7A]">
          {document.title}
        </h4>
      </div>

      <div className="relative">
        {document.author && (
          <p className="text-xs font-semibold leading-relaxed text-[#425A64]">
            {document.author}
          </p>
        )}

        <div className="mt-4 inline-flex rounded-full border border-[#064E7A]/10 bg-[#FFF8EA]/75 px-2.5 py-1 font-[var(--font-display)] text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-[#526B75]">
          In print
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Publication card
───────────────────────────────────────────────────────────── */

function PublicationCard({
  document,
  index,
  reduced,
}: {
  document: DocumentRow;
  index: number;
  reduced: boolean | null;
}) {
  const href =
    publicationHref(document);

  const collection =
    collectionLabel(
      document.subcategory
    );

  const downloadable =
    Boolean(href);

  const pdf =
    downloadable &&
    isPdf(href);

  const content = (
    <>
      {/* ── Visual document preview ───────────── */}
      <div className="relative aspect-[3/4] overflow-hidden border-b border-[#064E7A]/10 bg-[#F0E8D9]">
        {href && pdf ? (
          <AdaptivePdfPreview
            href={href}
            title={document.title}
          />
        ) : (
          <PrintCover
            document={document}
            collection={collection}
          />
        )}

        {/* Fine aqua top line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
        />

        {/* Availability badge */}
        <div className="absolute right-3 top-3 z-20">
          {downloadable ? (
            <span className="rounded-full border border-white/30 bg-[#064E7A]/88 px-2.5 py-1 font-[var(--font-display)] text-[0.56rem] font-extrabold uppercase tracking-[0.13em] text-white shadow-sm backdrop-blur-sm">
              PDF
            </span>
          ) : (
            <span className="rounded-full border border-[#064E7A]/10 bg-[#FFF8EA]/92 px-2.5 py-1 font-[var(--font-display)] text-[0.56rem] font-extrabold uppercase tracking-[0.13em] text-[#526B75] shadow-sm backdrop-blur-sm">
              In print
            </span>
          )}
        </div>

        {/* Hover readability wash */}
        {downloadable && (
          <div
            aria-hidden
            className="absolute inset-0 z-10 bg-gradient-to-t from-[#031F2E]/38 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Visual hover action */}
        {downloadable && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#064E7A]/90 px-3.5 py-2 font-[var(--font-display)] text-[0.66rem] font-bold text-white shadow-lg backdrop-blur-md">
              Open resource

              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        )}
      </div>

      {/* ── Metadata ───────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <BookOpen
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 text-[#0891B2]"
            />

            <span className="truncate font-[var(--font-display)] text-[0.58rem] font-extrabold uppercase tracking-[0.17em] text-[#526B75]/68">
              {collection}
            </span>
          </div>

          <span
            aria-hidden
            className="font-[var(--font-display)] text-[0.66rem] font-extrabold tracking-[0.08em] text-[#0891B2]/24"
          >
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-[1.08rem] font-bold leading-[1.35] tracking-[-0.022em] text-[#064E7A]">
          {document.title}
        </h3>

        {document.author && (
          <p className="mt-3 text-[0.73rem] font-bold leading-relaxed text-[#425A64]">
            {document.author}
          </p>
        )}

        {document.description && (
          <p className="mt-2 line-clamp-2 text-[0.72rem] font-medium leading-[1.6] text-[#526B75]/72">
            {document.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <div className="h-px w-full bg-[#064E7A]/8" />

          <div className="pt-3">
            {downloadable ? (
              <span className="inline-flex items-center gap-1.5 font-[var(--font-display)] text-[0.64rem] font-extrabold uppercase tracking-[0.12em] text-[#B96543] transition-colors group-hover:text-[#075985]">
                Open resource

                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            ) : (
              <span className="text-[0.68rem] font-semibold text-[#526B75]/62">
                Available in print
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
              y: 14,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          Math.min(index, 10) *
          0.025,
        duration: 0.35,
        ease,
      }}
      className="h-full"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#064E7A]/11 bg-[#FFFDF8] shadow-[0_10px_30px_rgba(6,78,122,0.065)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/30 hover:shadow-[0_22px_55px_rgba(6,78,122,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0891B2]"
        >
          {content}
        </a>
      ) : (
        <div
          className="flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#064E7A]/11 bg-[#FFFDF8] shadow-[0_10px_30px_rgba(6,78,122,0.065)]"
          title="Available in print from AHEAD"
        >
          {content}
        </div>
      )}
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────────────
   Explorer
───────────────────────────────────────────────────────────── */

export default function PublicationsExplorer({
  items,
}: {
  items: DocumentRow[];
}) {
  /*
   * English is intentionally the default shelf.
   *
   * If for some reason the CMS contains no English publications,
   * fall back to the first populated collection and finally "all".
   */
  const initialShelf = useMemo(() => {
    const preferred =
      shelves
        .filter(
          (shelf) =>
            shelf.key !== "all"
        )
        .find((candidate) =>
          items.some(
            (document) =>
              document.subcategory ===
              candidate.key
          )
        );

    return (
      preferred?.key ?? "all"
    );
  }, [items]);

  const [query, setQuery] =
    useState("");

  const [shelf, setShelf] =
    useState<string>(
      initialShelf
    );

  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const reduced =
    useReducedMotion();

  const counted = useMemo(
    () =>
      shelves.map((entry) => ({
        ...entry,
        count:
          entry.key === "all"
            ? items.length
            : items.filter(
                (document) =>
                  document.subcategory ===
                  entry.key
              ).length,
      })),
    [items]
  );

  const filtered = useMemo(() => {
    const q = query
      .trim()
      .toLowerCase();

    return items.filter(
      (document) =>
        (shelf === "all" ||
          document.subcategory ===
            shelf) &&
        (!q ||
          document.title
            .toLowerCase()
            .includes(q) ||
          (
            document.description ??
            ""
          )
            .toLowerCase()
            .includes(q) ||
          (document.author ?? "")
            .toLowerCase()
            .includes(q))
    );
  }, [items, query, shelf]);

  const visibleItems =
    filtered.slice(
      0,
      visibleCount
    );

  const hasMore =
    visibleCount <
    filtered.length;

  /*
   * Whenever the visitor changes collection or search,
   * collapse back to the first 12 results.
   */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [shelf, query]);

  const changeShelf = (
    key: string
  ) => {
    setShelf(key);
  };

  return (
    <div className="relative">
      {/* ─────────────────────────────────────────
          Archive controls
      ────────────────────────────────────────── */}
      <div className="mb-8 border-b border-[#064E7A]/10 pb-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          {/* Search */}
          <div>
            <div className="mb-2.5 flex items-center gap-3">
              <span className="h-px w-7 bg-[#0891B2]/55" />

              <span className="font-[var(--font-display)] text-[0.66rem] font-extrabold uppercase tracking-[0.24em] text-[#526B75]">
                Search the archive
              </span>
            </div>

            <div className="relative max-w-2xl">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#064E7A]/38"
              />

              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(
                    event.target.value
                  )
                }
                placeholder={`Search ${items.length} published materials…`}
                className="w-full rounded-2xl border border-[#064E7A]/12 bg-[#FFFDF8] py-3.5 pl-11 pr-11 text-sm font-medium text-[#243841] outline-none transition-all duration-200 placeholder:text-[#526B75]/45 focus:border-[#0891B2]/42 focus:shadow-[0_0_0_4px_rgba(8,145,178,0.08)]"
              />

              <AnimatePresence>
                {query && (
                  <motion.button
                    type="button"
                    initial={{
                      opacity: 0,
                      scale: 0.75,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.75,
                    }}
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#064E7A]/42 transition-colors hover:bg-[#064E7A]/6 hover:text-[#064E7A]"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Result count */}
          <div className="hidden min-w-24 text-right lg:block">
            <div className="font-[var(--font-display)] text-2xl font-extrabold tracking-[-0.04em] text-[#064E7A]">
              {filtered.length}
            </div>

            <div className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#526B75]/60">
              {filtered.length === 1
                ? "material"
                : "materials"}
            </div>
          </div>
        </div>

        {/* Collection index */}
        <div
          role="group"
          aria-label="Filter by collection"
          className="mt-5 flex flex-wrap gap-2"
        >
          {counted.map(
            (entry) => {
              const active =
                shelf === entry.key;

              return (
                <motion.button
                  key={entry.key}
                  type="button"
                  onClick={() =>
                    changeShelf(
                      entry.key
                    )
                  }
                  aria-pressed={
                    active
                  }
                  whileTap={
                    reduced
                      ? {}
                      : {
                          scale: 0.97,
                        }
                  }
                  className="relative overflow-hidden rounded-full border px-4 py-2 font-[var(--font-display)] text-[0.7rem] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2]"
                  style={{
                    color: active
                      ? "#FFFFFF"
                      : "#425A64",
                    borderColor:
                      active
                        ? "rgba(6,78,122,0.92)"
                        : "rgba(6,78,122,0.11)",
                    backgroundColor:
                      active
                        ? "#064E7A"
                        : "rgba(255,253,248,0.75)",
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="publication-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#064E7A] to-[#075985]"
                      transition={{
                        duration: 0.25,
                        ease,
                      }}
                    />
                  )}

                  <span className="relative">
                    {entry.label}

                    <span
                      className={`ml-1.5 ${
                        active
                          ? "text-white/62"
                          : "text-[#526B75]/45"
                      }`}
                    >
                      {entry.count}
                    </span>
                  </span>
                </motion.button>
              );
            }
          )}
        </div>

        <div className="mt-4 text-xs font-semibold text-[#526B75]/62 lg:hidden">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "material"
            : "materials"}
        </div>
      </div>

      {/* ─────────────────────────────────────────
          Visual knowledge library
      ────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="rounded-[1.5rem] border border-dashed border-[#064E7A]/18 bg-[#FFF8EA]/45 px-6 py-14 text-center"
          >
            <BookOpen
              aria-hidden
              className="mx-auto h-7 w-7 text-[#0891B2]/50"
            />

            <p className="mt-4 text-sm font-semibold text-[#425A64]">
              No results for
              {" "}
              &ldquo;{query}&rdquo;
            </p>

            <p className="mt-1 text-xs text-[#526B75]/60">
              Try a different word or clear the search.
            </p>
          </motion.div>
        ) : (
          <motion.ul
            key={`${shelf}-${query}`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.18,
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleItems.map(
              (
                document,
                index
              ) => (
                <PublicationCard
                  key={
                    document.id
                  }
                  document={
                    document
                  }
                  index={index}
                  reduced={
                    reduced
                  }
                />
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────
          Progressive reveal
      ────────────────────────────────────────── */}
      {hasMore && (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount(
                (current) =>
                  Math.min(
                    current +
                      PAGE_SIZE,
                    filtered.length
                  )
              )
            }
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-5 py-2.5 font-[var(--font-display)] text-[0.72rem] font-bold text-[#064E7A] shadow-[0_6px_18px_rgba(6,78,122,0.05)] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD]"
          >
            Show more

            <span className="text-[#526B75]/55">
              {Math.min(
                PAGE_SIZE,
                filtered.length -
                  visibleCount
              )}
            </span>

            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

      {/* Count after progressive loading */}
      {filtered.length >
        PAGE_SIZE && (
        <p className="mt-4 text-center text-[0.68rem] font-medium text-[#526B75]/55">
          Showing{" "}
          {Math.min(
            visibleCount,
            filtered.length
          )}{" "}
          of {filtered.length} materials
        </p>
      )}

      {/* Archive note */}
      <div className="mt-8 border-t border-[#064E7A]/8 pt-5">
        <p className="text-xs font-medium leading-relaxed text-[#526B75]/62">
          Publications without a digital file link are available in print from AHEAD&apos;s office.
        </p>
      </div>
    </div>
  );
}
