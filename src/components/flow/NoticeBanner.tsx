"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { NoticeRow } from "@/lib/types";
import { t } from "@/lib/types";

const tone: Record<NoticeRow["severity"], string> = {
  info:    "bg-[#16324F] text-[#FAF7F0]",
  warning: "bg-[#E9B44C] text-[#1F2933]",
  urgent:  "bg-[#C65D3B] text-white",
};

export default function NoticeBanner({ notices }: { notices: NoticeRow[] }) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const reduced = useReducedMotion();
  const visible = notices.filter((n) => !dismissed.includes(n.id));

  return (
    <AnimatePresence initial={false}>
      {visible.map((n) => (
        <motion.div
          key={n.id}
          initial={reduced ? {} : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduced ? {} : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`overflow-hidden ${tone[n.severity]}`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm sm:px-6">
            <p>
              {t(n.message)}
              {n.link_url && (
                <a href={n.link_url} className="ml-2 underline underline-offset-2">Learn more</a>
              )}
            </p>
            <button
              onClick={() => setDismissed((d) => [...d, n.id])}
              aria-label="Dismiss notice"
              className="shrink-0 rounded-full p-1 hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
