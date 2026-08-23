"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import { documentHref } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const tabs: {
  key: string;
  label: string;
  categories: DocumentRow["category"][];
}[] = [
  {
    key: "annual",
    label: "Annual Reports",
    categories: ["annual_report"],
  },
  {
    key: "fcra",
    label: "FCRA",
    categories: [
      "fcra_quarterly",
      "fcra_annual",
    ],
  },
  {
    key: "mca",
    label: "MCA & IT Returns",
    categories: [
      "mca_filing",
      "it_return",
    ],
  },
  {
    key: "policy",
    label: "Policies",
    categories: ["policy"],
  },
  {
    key: "founding",
    label: "Founding Documents",
    categories: ["other"],
  },
];

/* ─────────────────────────────────────────────────────────────
   ANNUAL REPORT ARCHIVE
───────────────────────────────────────────────────────────── */

function AnnualShelf({
  rows,
  reduced,
}: {
  rows: DocumentRow[];
  reduced: boolean | null;
}) {
  const sorted = [...rows].sort(
    (a, b) =>
      (b.year ?? "").localeCompare(
        a.year ?? ""
      )
  );

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {sorted.map(
        (document, index) => {
          const href =
            documentHref(document);

          const card = (
            <div className="relative flex h-full min-h-[185px] flex-col overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[0.045] p-5 transition-all duration-300 group-hover:border-[#67E8F9]/32 group-hover:bg-white/[0.075]">
              {/* Archival top rule */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#67E8F9]/75 via-[#B9F6FF]/35 to-[#D8A441]/55"
              />

              {/* Quiet record number */}
              <span
                aria-hidden
                className="absolute right-4 top-3 font-[var(--font-display)] text-[2.2rem] font-extrabold leading-none tracking-[-0.05em] text-white/[0.045]"
              >
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="font-serif text-[2.35rem] font-bold leading-none tracking-[-0.045em] text-[#FFF8EA] sm:text-[2.65rem]">
                  {document.year}
                </div>

                <p className="mt-3 max-w-[11rem] text-[0.7rem] font-medium leading-[1.55] text-white/58">
                  Annual Report &amp;
                  Financial Statements
                </p>
              </div>

              <div className="relative mt-auto pt-6">
                <div className="mb-4 h-px w-full bg-white/9" />

                {href ? (
                  <span className="inline-flex items-center gap-1.5 font-[var(--font-display)] text-[0.64rem] font-extrabold uppercase tracking-[0.12em] text-[#FFE08A] transition-colors group-hover:text-[#B9F6FF]">
                    Open PDF

                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                ) : (
                  <span className="font-[var(--font-display)] text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/35">
                    Document to be attached
                  </span>
                )}
              </div>
            </div>
          );

          return (
            <motion.li
              key={document.id}
              initial={
                reduced
                  ? {}
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0,
              }}
              transition={{
                duration: 0.42,
                delay:
                  Math.min(
                    index,
                    6
                  ) * 0.045,
                ease,
              }}
              className="h-full"
            >
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-[1.35rem] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#67E8F9] motion-reduce:hover:translate-y-0"
                >
                  {card}
                </a>
              ) : (
                <div className="group h-full opacity-70">
                  {card}
                </div>
              )}
            </motion.li>
          );
        }
      )}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────
   DOCUMENT RECORD ROW
───────────────────────────────────────────────────────────── */

function VaultRow({
  document,
  index,
  reduced,
}: {
  document: DocumentRow;
  index: number;
  reduced: boolean | null;
}) {
  const href =
    documentHref(document);

  const content = (
    <>
      {/* Sequence marker */}
      <span
        aria-hidden
        className="hidden w-8 shrink-0 font-[var(--font-display)] text-[0.57rem] font-extrabold tracking-[0.08em] text-[#67E8F9]/45 sm:block"
      >
        {String(
          index + 1
        ).padStart(2, "0")}
      </span>

      {/* Small document marker */}
      <span
        aria-hidden
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#67E8F9]/18 bg-[#67E8F9]/[0.06]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#67E8F9]/75" />
      </span>

      {/* Main title */}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.8rem] font-semibold leading-5 text-white/88 transition-colors group-hover:text-white sm:text-[0.84rem]">
          {document.title}
        </span>
      </span>

      {/* Metadata */}
      <span className="hidden shrink-0 items-center gap-2 md:flex">
        {document.year && (
          <span className="font-[var(--font-display)] text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white/36">
            {document.year}
          </span>
        )}

        {document.quarter && (
          <span className="rounded-md border border-[#67E8F9]/12 bg-[#67E8F9]/[0.06] px-2 py-1 font-[var(--font-display)] text-[0.54rem] font-extrabold uppercase tracking-[0.1em] text-[#B9F6FF]/62">
            {document.quarter}
          </span>
        )}

        {href &&
          (document.source ===
          "external" ? (
            <span
              title="External record"
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/28 transition-colors group-hover:text-[#B9F6FF]/80"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          ) : (
            <span className="rounded-full border border-[#67E8F9]/12 bg-[#67E8F9]/[0.07] px-2.5 py-1 font-[var(--font-display)] text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-[#8EE6E9]">
              On-site
            </span>
          ))}
      </span>

      {/* Mobile metadata */}
      <span className="flex shrink-0 items-center gap-1.5 md:hidden">
        {document.quarter && (
          <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[0.55rem] font-bold text-white/50">
            {document.quarter}
          </span>
        )}

        {href &&
        document.source ===
          "external" ? (
          <ExternalLink className="h-3.5 w-3.5 text-white/30" />
        ) : href ? (
          <span className="h-1.5 w-1.5 rounded-full bg-[#67E8F9]/70" />
        ) : null}
      </span>
    </>
  );

  return (
    <motion.li
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              x: -8,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.3,
        delay:
          Math.min(
            index,
            8
          ) * 0.025,
        ease,
      }}
      className="border-b border-white/[0.075] last:border-0"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-[54px] items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-[#67E8F9]/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#67E8F9] sm:px-5"
        >
          {content}
        </a>
      ) : (
        <div className="group flex min-h-[54px] items-center gap-3 px-4 py-3 opacity-50 sm:px-5">
          {content}

          <span className="hidden shrink-0 font-[var(--font-display)] text-[0.52rem] font-bold uppercase tracking-[0.1em] text-white/40 lg:block">
            document to be attached
          </span>
        </div>
      )}
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────────────
   DOCUMENT VAULT
───────────────────────────────────────────────────────────── */

function VaultList({
  rows,
  expandable,
  reduced,
}: {
  rows: DocumentRow[];
  expandable: boolean;
  reduced: boolean | null;
}) {
  const [expanded, setExpanded] =
    useState(false);

  const shown =
    expandable && !expanded
      ? rows.slice(0, 12)
      : rows;

  return (
    <>
      <div className="overflow-hidden rounded-[1.4rem] border border-white/12 bg-white/[0.025] shadow-[0_14px_38px_rgba(0,0,0,0.08)]">
        <ul>
          {shown.map(
            (document, index) => (
              <VaultRow
                key={document.id}
                document={document}
                index={index}
                reduced={reduced}
              />
            )
          )}
        </ul>
      </div>

      {expandable &&
        rows.length > 12 && (
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-[0.65rem] font-medium text-white/35">
              Showing{" "}
              {expanded
                ? rows.length
                : 12}{" "}
              of {rows.length}
            </p>

            <button
              type="button"
              onClick={() =>
                setExpanded(
                  (current) =>
                    !current
                )
              }
              className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 font-[var(--font-display)] text-[0.65rem] font-bold text-white/68 transition-all duration-200 hover:border-[#67E8F9]/30 hover:bg-[#67E8F9]/[0.07] hover:text-[#B9F6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#67E8F9]"
            >
              {expanded
                ? "Show fewer filings"
                : `Show all ${rows.length} filings`}

              <motion.span
                animate={
                  reduced
                    ? {}
                    : {
                        rotate:
                          expanded
                            ? 180
                            : 0,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>
          </div>
        )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   DOCUMENT SHELF
───────────────────────────────────────────────────────────── */

export default function DocumentShelf({
  items,
}: {
  items: DocumentRow[];
}) {
  const [tab, setTab] =
    useState("annual");

  const reduced =
    useReducedMotion();

  const current =
    tabs.find(
      (item) =>
        item.key === tab
    ) ?? tabs[0];

  const rows = useMemo(
    () =>
      items.filter(
        (document) =>
          current.categories.includes(
            document.category
          )
      ),
    [items, current]
  );

  return (
    <div className="relative">
      {/* ───────────────────────────────────────
          CATEGORY NAVIGATION
      ──────────────────────────────────────── */}

      <div className="mb-8">
        <div
          role="tablist"
          aria-label="Document type"
          className="scrollbar-none flex gap-1 overflow-x-auto border-b border-white/10 pb-4"
        >
          {tabs.map((item) => {
            const count =
              items.filter(
                (document) =>
                  item.categories.includes(
                    document.category
                  )
              ).length;

            const currentTab =
              tab === item.key;

            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={
                  currentTab
                }
                onClick={() =>
                  setTab(item.key)
                }
                className={`group relative shrink-0 rounded-full px-4 py-2.5 text-[0.72rem] font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9] sm:text-[0.76rem] ${
                  currentTab
                    ? "text-[#064E7A]"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {currentTab && (
                  <motion.span
                    layoutId="shelf-tab"
                    className="absolute inset-0 rounded-full bg-[#FFF8EA] shadow-[0_8px_22px_rgba(0,0,0,0.12)]"
                    transition={{
                      duration: 0.24,
                      ease,
                    }}
                  />
                )}

                {!currentTab && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-200 group-hover:bg-white/[0.045]"
                  />
                )}

                <span className="relative z-10">
                  {item.label}

                  <span
                    className={`ml-1.5 ${
                      currentTab
                        ? "text-[#064E7A]/45"
                        : "text-white/28"
                    }`}
                  >
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active collection summary */}
        <div className="mt-5 flex items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#67E8F9]/55" />

              <span className="font-[var(--font-display)] text-[0.56rem] font-extrabold uppercase tracking-[0.18em] text-[#B9F6FF]/50">
                Records archive
              </span>
            </div>

            <div className="mt-2 font-serif text-lg font-bold text-[#FFF8EA]">
              {current.label}
            </div>
          </div>

          <div className="text-right">
            <div className="font-serif text-2xl font-bold leading-none text-[#FFF8EA]">
              {rows.length}
            </div>

            <div className="mt-1 font-[var(--font-display)] text-[0.52rem] font-bold uppercase tracking-[0.15em] text-white/35">
              documents
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────
          CONTENT
      ──────────────────────────────────────── */}

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={
            reduced
              ? {}
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={
            reduced
              ? {}
              : {
                  opacity: 0,
                  y: -5,
                }
          }
          transition={{
            duration: 0.22,
            ease,
          }}
        >
          {rows.length === 0 ? (
            <div className="rounded-[1.35rem] border border-dashed border-white/12 bg-white/[0.025] px-6 py-12 text-center text-sm text-white/42">
              No documents are currently listed in this collection.
            </div>
          ) : tab === "annual" ? (
            <AnnualShelf
              rows={rows}
              reduced={reduced}
            />
          ) : (
            <VaultList
              rows={rows}
              expandable={
                tab === "fcra"
              }
              reduced={reduced}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ───────────────────────────────────────
          VERIFIED FOOTNOTE
      ──────────────────────────────────────── */}

      <div className="mt-7 border-t border-white/8 pt-5">
        <p className="text-[0.64rem] font-medium leading-relaxed text-white/38">
          FCRA reg. 147120965 · CIN
          U85300WB2009NPL134655 ·{" "}

          <span className="font-semibold text-[#8EE6E9]/75">
            on-site
          </span>{" "}
          documents are served from
          this website;{" "}

          <ExternalLink className="mx-0.5 inline h-3 w-3 align-[-2px] text-white/38" />{" "}

          marks AHEAD&apos;s records
          archive.
        </p>
      </div>
    </div>
  );
}
