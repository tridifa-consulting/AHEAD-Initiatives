"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { NoticeRow } from "@/lib/types";
import { t } from "@/lib/types";

const tone: Record<NoticeRow["severity"], string> = {
  info: "bg-[#16324F] text-[#FAF7F0]",
  warning: "bg-[#E9B44C] text-[#1F2933]",
  urgent: "bg-[#C65D3B] text-white",
};

export default function NoticeBanner({ notices }: { notices: NoticeRow[] }) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = notices.filter((n) => !dismissed.includes(n.id));
  if (visible.length === 0) return null;

  return (
    <div role="status" aria-live="polite">
      {visible.map((n) => (
        <div key={n.id} className={`${tone[n.severity]} px-4 py-2.5 text-sm`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <p>
              {t(n.message)}
              {n.link_url && (
                <a href={n.link_url} className="ml-2 underline underline-offset-2">
                  Learn more
                </a>
              )}
            </p>
            <button
              onClick={() => setDismissed((d) => [...d, n.id])}
              aria-label="Dismiss notice"
              className="shrink-0 rounded p-1 hover:bg-black/10 focus-visible:outline focus-visible:outline-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
