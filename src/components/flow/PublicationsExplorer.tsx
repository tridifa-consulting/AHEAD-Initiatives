"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  BookOpen,
  Download,
  X,
  ArrowUpRight,
} from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import { documentHref } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const shelves = [
  {
    key: "all",
    label: "All 82",
    count: 0,
  },
  {
    key: "english_publications",
    label: "English",
    count: 0,
  },
  {
    key: "bengali_publications",
    label: "Bengali",
    count: 0,
  },
  {
    key: "nabodisha",
    label: "Nabodisha",
    count: 0,
  },
  {
    key: "other_materials",
    label: "Field Reports",
    count: 0,
  },
];

function collectionLabel(
  subcategory?: string | null
) {
  const shelf = shelves.find(
    (s) => s.key === subcategory
  );

  return shelf?.label.replace(/\s+\d+$/, "") ?? "";
}

export default function PublicationsExplorer({
  items,
}: {
  items: DocumentRow[];
}) {
  const [query, setQuery] = useState("");
  const [shelf, setShelf] = useState("all");

  const inputRef =
    useRef<HTMLInputElement>(null);

  const reduced = useReducedMotion();

  const counted = shelves.map((s) => ({
    ...s,
    count:
      s.key === "all"
        ? items.length
        : items.filter(
            (d) =>
              d.subcategory === s.key
          ).length,
  }));

  const filtered = useMemo(() => {
    const q =
      query.trim().toLowerCase();

    return items.filter(
      (d) =>
        (shelf === "all" ||
          d.subcategory === shelf) &&
        (!q ||
          d.title
            .toLowerCase()
            .includes(q) ||
          (d.description ?? "")
            .toLowerCase()
            .includes(q) ||
          (d.author ?? "")
            .toLowerCase()
            .includes(q))
    );
  }, [items, query, shelf]);

  return (
    <div className="relative">
      {/* ──────────────────────────────────────────
          Archive controls
      ─────────────────────────────────────────── */}
      <div className="mb-9 border-b border-[#064E7A]/10 pb-7">
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
                onChange={(e) =>
                  setQuery(
                    e.target.value
                  )
                }
                placeholder={`Search ${items.length} published materials…`}
                className="w-full rounded-2xl border border-[#064E7A]/12 bg-[#FFFDF8] py-3.5 pl-11 pr-11 text-sm font-medium text-[#243841] outline-none transition-all duration-200 placeholder:text-[#526B75]/48 focus:border-[#0891B2]/42 focus:shadow-[0_0_0_4px_rgba(8,145,178,0.08)]"
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
          <div className="hidden text-right lg:block">
            <div className="font-[var(--font-display)] text-2xl font-extrabold tracking-[-0.04em] text-[#064E7A]">
              {filtered.length}
            </div>

            <div className="mt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#526B75]/65">
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
          className="mt-5 flex flex-wrap gap-x-1 gap-y-2"
        >
          {counted.map((s) => {
            const active =
              shelf === s.key;

            return (
              <motion.button
                key={s.key}
                type="button"
                onClick={() =>
                  setShelf(s.key)
                }
                aria-pressed={active}
                whileTap={
                  reduced
                    ? {}
                    : { scale: 0.97 }
                }
                className="relative overflow-hidden rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2]"
                style={{
                  color: active
                    ? "#FFFFFF"
                    : "#425A64",
                  borderColor: active
                    ? "rgba(6,78,122,0.92)"
                    : "rgba(6,78,122,0.10)",
                  backgroundColor: active
                    ? "#064E7A"
                    : "rgba(255,253,248,0.72)",
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
                  {s.label.replace(
                    /\s+\d+$/,
                    ""
                  )}

                  <span
                    className={`ml-1.5 ${
                      active
                        ? "text-white/60"
                        : "text-[#526B75]/48"
                    }`}
                  >
                    {s.count}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile result count */}
        <div className="mt-4 text-xs font-semibold text-[#526B75]/65 lg:hidden">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "material"
            : "materials"}{" "}
          found
        </div>
      </div>

      {/* ──────────────────────────────────────────
          Publication archive
      ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-[1.5rem] border border-dashed border-[#064E7A]/18 bg-[#FFF8EA]/45 px-6 py-14 text-center"
          >
            <BookOpen
              aria-hidden
              className="mx-auto h-6 w-6 text-[#0891B2]/55"
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
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map(
              (d, i) => {
                const href =
                  documentHref(d);

                const collection =
                  collectionLabel(
                    d.subcategory
                  );

                const cardContent = (
                  <>
                    {/* Top archival rule */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
                    />

                    {/* Quiet archive number */}
                    <span
                      aria-hidden
                      className="absolute right-5 top-5 font-[var(--font-display)] text-[2.3rem] font-extrabold leading-none tracking-[-0.06em] text-[#0891B2]/8"
                    >
                      {String(
                        i + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* Collection + availability */}
                    <div className="relative flex min-h-7 items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <BookOpen
                          aria-hidden
                          className="mt-[1px] h-4 w-4 shrink-0 text-[#0891B2]"
                        />

                        {collection && (
                          <span className="font-[var(--font-display)] text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[#526B75]/68">
                            {collection}
                          </span>
                        )}
                      </div>

                      {!href && (
                        <span className="relative z-10 shrink-0 rounded-full border border-[#064E7A]/8 bg-[#064E7A]/5 px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.12em] text-[#526B75]/72">
                          In print
                        </span>
                      )}
                    </div>

                    {/* Publication title */}
                    <div className="relative mt-7 flex-1">
                      <h3 className="max-w-[95%] font-serif text-[1.1rem] font-bold leading-[1.35] tracking-[-0.022em] text-[#064E7A] sm:text-[1.16rem]">
                        {d.title}
                      </h3>

                      {(d.author ||
                        d.description) && (
                        <div className="mt-4 space-y-2">
                          {d.author && (
                            <p className="text-xs font-bold leading-relaxed text-[#425A64]">
                              {d.author}
                            </p>
                          )}

                          {d.description && (
                            <p className="line-clamp-3 text-[0.78rem] font-medium leading-[1.65] text-[#526B75]/78">
                              {d.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card action */}
                    <div className="relative mt-7 border-t border-[#064E7A]/9 pt-4">
                      {href ? (
                        <span className="inline-flex items-center gap-2 font-[var(--font-display)] text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[#B96543] transition-colors duration-200 group-hover:text-[#075985]">
                          Open resource

                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 font-[var(--font-display)] text-[0.7rem] font-bold text-[#526B75]/65">
                          Available in print
                        </span>
                      )}
                    </div>
                  </>
                );

                return (
                  <motion.li
                    key={d.id}
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
                    transition={{
                      delay:
                        Math.min(
                          i,
                          12
                        ) * 0.025,
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
                        className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[1.4rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-6 shadow-[0_8px_28px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/28 hover:shadow-[0_20px_48px_rgba(6,78,122,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0891B2]"
                      >
                        {cardContent}
                      </a>
                    ) : (
                      <div
                        className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[1.4rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-6 shadow-[0_8px_28px_rgba(6,78,122,0.055)]"
                        title="Available in print from AHEAD"
                      >
                        {cardContent}
                      </div>
                    )}
                  </motion.li>
                );
              }
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────
          Archive note
      ─────────────────────────────────────────── */}
      <div className="mt-7 flex items-start gap-3 border-t border-[#064E7A]/8 pt-5">
        <Download
          aria-hidden
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0891B2]/55"
        />

        <p className="text-xs font-medium leading-relaxed text-[#526B75]/62">
          Titles without a download link are available in print from AHEAD&apos;s office.
        </p>
      </div>
    </div>
  );
}
