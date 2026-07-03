"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FileText, ExternalLink, ChevronDown } from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import { documentHref } from "@/lib/types";

const tabs: { key: string; label: string; categories: DocumentRow["category"][] }[] = [
  { key: "annual",   label: "Annual Reports",      categories: ["annual_report"] },
  { key: "fcra",     label: "FCRA",                categories: ["fcra_quarterly", "fcra_annual"] },
  { key: "mca",      label: "MCA & IT Returns",    categories: ["mca_filing", "it_return"] },
  { key: "policy",   label: "Policies",            categories: ["policy"] },
  { key: "founding", label: "Founding Documents",  categories: ["other"] },
];

export default function DocumentShelf({ items }: { items: DocumentRow[] }) {
  const [tab, setTab] = useState("annual");
  const [expandedFcra, setExpandedFcra] = useState(false);
  const reduced = useReducedMotion();
  const current = tabs.find((x) => x.key === tab)!;
  const rows = items.filter((d) => current.categories.includes(d.category));
  const showRows = (tab === "fcra" && !expandedFcra) ? rows.slice(0, 12) : rows;

  return (
    <div>
      {/* Tab bar */}
      <div role="tablist" aria-label="Document type" className="mb-6 flex flex-wrap gap-2">
        {tabs.map((x) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={tab === x.key}
            onClick={() => setTab(x.key)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9B44C]"
            style={{ color: tab === x.key ? "#16324F" : "rgba(250,247,240,0.65)" }}
          >
            {tab === x.key && (
              <motion.span
                layoutId="shelf-tab"
                className="absolute inset-0 rounded-full bg-[#FAF7F0]"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative">{x.label}</span>
          </button>
        ))}
      </div>

      {/* File list */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={tab}
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? {} : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="divide-y divide-[#FAF7F0]/10 rounded-2xl border border-[#FAF7F0]/12 overflow-hidden"
        >
          {showRows.map((d, i) => {
            const href = documentHref(d);
            return (
              <motion.li
                key={d.id}
                initial={reduced ? {} : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.03 }}
              >
                <a
                  href={href ?? "#reports"}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#FAF7F0]/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9B44C]"
                >
                  <FileText aria-hidden className="h-4 w-4 shrink-0 text-[#E9B44C] transition-transform duration-200 group-hover:scale-110" />
                  <span className="min-w-0 flex-1 truncate text-sm text-[#FAF7F0]/90">{d.title}</span>
                  {d.year && <span className="hidden shrink-0 text-xs text-[#FAF7F0]/40 sm:block">{d.year}</span>}
                  {d.quarter && <span className="shrink-0 rounded bg-[#FAF7F0]/8 px-1.5 py-0.5 text-[11px] text-[#FAF7F0]/55">{d.quarter}</span>}
                  {d.source === "external" && <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#FAF7F0]/30 group-hover:text-[#FAF7F0]/70" />}
                  {!href && <span className="text-xs text-[#FAF7F0]/35">pending</span>}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>

      {tab === "fcra" && rows.length > 12 && (
        <motion.button
          onClick={() => setExpandedFcra((e) => !e)}
          className="mt-4 flex items-center gap-2 text-sm text-[#FAF7F0]/55 hover:text-[#E9B44C]"
          whileHover={reduced ? {} : { x: 2 }}
        >
          <motion.span animate={reduced ? {} : { rotate: expandedFcra ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
          {expandedFcra ? "Show fewer filings" : `Show all ${rows.length} filings`}
        </motion.button>
      )}

      <p className="mt-5 text-xs text-[#FAF7F0]/40">
        FCRA reg. 147120965 · CIN U85300WB2009NPL134655 · Documents marked <ExternalLink className="mx-0.5 inline h-3 w-3" /> open on AHEAD&apos;s records archive.
      </p>
    </div>
  );
}
