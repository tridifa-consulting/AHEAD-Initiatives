"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FileText, ExternalLink, ChevronDown, ArrowUpRight, CircleDashed } from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import { documentHref } from "@/lib/types";

const tabs: { key: string; label: string; categories: DocumentRow["category"][] }[] = [
  { key: "annual",   label: "Annual Reports",     categories: ["annual_report"] },
  { key: "fcra",     label: "FCRA",               categories: ["fcra_quarterly", "fcra_annual"] },
  { key: "mca",      label: "MCA & IT Returns",   categories: ["mca_filing", "it_return"] },
  { key: "policy",   label: "Policies",           categories: ["policy"] },
  { key: "founding", label: "Founding Documents", categories: ["other"] },
];

/** Annual reports as an archive shelf: one plate per year, oldest to newest. */
function AnnualShelf({ rows, reduced }: { rows: DocumentRow[]; reduced: boolean | null }) {
  const sorted = [...rows].sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""));
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {sorted.map((d, i) => {
        const href = documentHref(d);
        return (
          <motion.li
            key={d.id}
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
          >
            <a
              href={href ?? "#reports"}
              target={href ? "_blank" : undefined}
              rel={href ? "noopener noreferrer" : undefined}
              className="group flex h-full flex-col justify-between rounded-2xl border border-[#FAF7F0]/12 bg-[#FAF7F0]/[0.04] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E9B44C]/40 hover:bg-[#FAF7F0]/[0.08] motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9B44C]"
            >
              <div>
                <div className="font-serif text-4xl font-semibold text-[#FAF7F0]">{d.year}</div>
                <div className="mt-1 text-xs leading-snug text-[#FAF7F0]/55">Annual Report &amp; Financial Statements</div>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#E9B44C]">
                Open PDF
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </span>
            </a>
          </motion.li>
        );
      })}
    </ul>
  );
}

/** The rest of the vault: year-aware rows with availability indicators. */
function VaultList({ rows, expandable, reduced }: { rows: DocumentRow[]; expandable: boolean; reduced: boolean | null }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expandable && !expanded ? rows.slice(0, 12) : rows;
  return (
    <>
      <ul className="overflow-hidden rounded-2xl border border-[#FAF7F0]/12">
        {shown.map((d, i) => {
          const href = documentHref(d);
          return (
            <motion.li
              key={d.id}
              initial={reduced ? {} : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i, 8) * 0.03 }}
              className="border-b border-[#FAF7F0]/8 last:border-0"
            >
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#FAF7F0]/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9B44C]">
                  <FileText aria-hidden className="h-4 w-4 shrink-0 text-[#E9B44C]" />
                  <span className="min-w-0 flex-1 truncate text-sm text-[#FAF7F0]/90">{d.title}</span>
                  {d.year && <span className="hidden shrink-0 text-xs text-[#FAF7F0]/40 sm:block">{d.year}</span>}
                  {d.quarter && <span className="shrink-0 rounded bg-[#FAF7F0]/8 px-1.5 py-0.5 text-[11px] text-[#FAF7F0]/55">{d.quarter}</span>}
                  {d.source === "external"
                    ? <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#FAF7F0]/30 group-hover:text-[#FAF7F0]/70" />
                    : <span className="shrink-0 rounded-full bg-[#2D6A4F]/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#7fc8a5]">on-site</span>}
                </a>
              ) : (
                <div className="flex min-h-11 items-center gap-3 px-5 py-3.5 opacity-55">
                  <CircleDashed aria-hidden className="h-4 w-4 shrink-0 text-[#FAF7F0]/40" />
                  <span className="min-w-0 flex-1 truncate text-sm text-[#FAF7F0]/70">{d.title}</span>
                  <span className="shrink-0 text-[11px] text-[#FAF7F0]/40">document to be attached</span>
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>
      {expandable && rows.length > 12 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 flex min-h-11 items-center gap-2 text-sm text-[#FAF7F0]/55 hover:text-[#E9B44C]"
        >
          <motion.span animate={reduced ? {} : { rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
          {expanded ? "Show fewer filings" : `Show all ${rows.length} filings`}
        </button>
      )}
    </>
  );
}

export default function DocumentShelf({ items }: { items: DocumentRow[] }) {
  const [tab, setTab] = useState("annual");
  const reduced = useReducedMotion();
  const current = tabs.find((x) => x.key === tab)!;
  const rows = useMemo(
    () => items.filter((d) => current.categories.includes(d.category)),
    [items, current]
  );

  return (
    <div>
      <div role="tablist" aria-label="Document type" className="mb-7 flex flex-wrap gap-2">
        {tabs.map((x) => {
          const count = items.filter((d) => x.categories.includes(d.category)).length;
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={tab === x.key}
              onClick={() => setTab(x.key)}
              className="relative min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9B44C]"
              style={{ color: tab === x.key ? "#16324F" : "rgba(250,247,240,0.6)" }}
            >
              {tab === x.key && (
                <motion.span layoutId="shelf-tab" className="absolute inset-0 rounded-full bg-[#FAF7F0]"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} />
              )}
              <span className="relative">{x.label} <span className="opacity-55">({count})</span></span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? {} : { opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          {tab === "annual"
            ? <AnnualShelf rows={rows} reduced={reduced} />
            : <VaultList rows={rows} expandable={tab === "fcra"} reduced={reduced} />}
        </motion.div>
      </AnimatePresence>

      <p className="mt-6 text-xs text-[#FAF7F0]/40">
        FCRA reg. 147120965 · CIN U85300WB2009NPL134655 · <span className="text-[#7fc8a5]">on-site</span> documents are
        served from this website; <ExternalLink className="mx-0.5 inline h-3 w-3" /> marks AHEAD&apos;s records archive.
      </p>
    </div>
  );
}
