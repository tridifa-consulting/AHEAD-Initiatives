"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  X,
} from "lucide-react";
import type { NoticeRow } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Visual treatments deliberately stay within AHEAD's established
 * institutional blue / aqua / beige / terracotta system.
 *
 * No notice content is changed here.
 */
const tone: Record<
  NoticeRow["severity"],
  {
    surface: string;
    text: string;
    muted: string;
    accent: string;
    border: string;
    hover: string;
    dismissHover: string;
    rule: string;
  }
> = {
  info: {
    surface:
      "linear-gradient(90deg, #053B5E 0%, #064E7A 54%, #075985 100%)",
    text: "#FFF8EA",
    muted: "rgba(255,255,255,0.76)",
    accent: "#67E8F9",
    border: "rgba(103,232,249,0.20)",
    hover: "#B9F6FF",
    dismissHover: "rgba(255,255,255,0.10)",
    rule:
      "linear-gradient(90deg, #67E8F9 0%, #A5F3FC 65%, #D8A441 100%)",
  },

  warning: {
    surface:
      "linear-gradient(90deg, #F4E7C6 0%, #FFF3D7 50%, #F8E8BB 100%)",
    text: "#064E7A",
    muted: "rgba(52,75,85,0.78)",
    accent: "#B57A21",
    border: "rgba(181,122,33,0.22)",
    hover: "#075985",
    dismissHover: "rgba(6,78,122,0.07)",
    rule:
      "linear-gradient(90deg, #D8A441 0%, #E7C46B 62%, #B96543 100%)",
  },

  urgent: {
    surface:
      "linear-gradient(90deg, #A84931 0%, #B96543 55%, #A84B35 100%)",
    text: "#FFF8EA",
    muted: "rgba(255,248,234,0.82)",
    accent: "#FFE29A",
    border: "rgba(255,226,154,0.22)",
    hover: "#FFE29A",
    dismissHover: "rgba(255,255,255,0.10)",
    rule:
      "linear-gradient(90deg, #FFE29A 0%, #F7C969 62%, #67E8F9 100%)",
  },
};

export default function NoticeBanner({
  notices,
}: {
  notices: NoticeRow[];
}) {
  const [dismissed, setDismissed] =
    useState<string[]>([]);

  const reduced =
    useReducedMotion();

  const visible =
    notices.filter(
      (notice) =>
        !dismissed.includes(
          notice.id
        )
    );

  const dismiss = (
    id: string
  ) => {
    setDismissed(
      (current) =>
        current.includes(id)
          ? current
          : [...current, id]
    );
  };

  return (
    <AnimatePresence initial={false}>
      {visible.map(
        (notice) => {
          const style =
            tone[
              notice.severity
            ];

          const urgent =
            notice.severity ===
            "urgent";

          return (
            <motion.aside
              key={notice.id}
              role={
                urgent
                  ? "alert"
                  : "status"
              }
              aria-live={
                urgent
                  ? "assertive"
                  : "polite"
              }
              initial={
                reduced
                  ? {}
                  : {
                      height: 0,
                      opacity: 0,
                    }
              }
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={
                reduced
                  ? {}
                  : {
                      height: 0,
                      opacity: 0,
                    }
              }
              transition={{
                duration: 0.32,
                ease,
              }}
              className="relative z-[55] overflow-hidden"
              style={{
                background:
                  style.surface,
                color:
                  style.text,
                borderBottom: `1px solid ${style.border}`,
              }}
            >
              {/* Fine AHEAD identity rule */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background:
                    style.rule,
                }}
              />

              {/* Very quiet archival texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize:
                    "38px 38px",
                }}
              />

              <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
                {/* Small severity marker */}
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    borderColor:
                      style.border,
                    backgroundColor:
                      urgent
                        ? "rgba(255,255,255,0.08)"
                        : notice.severity ===
                            "warning"
                          ? "rgba(255,255,255,0.34)"
                          : "rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className={`rounded-full ${
                      urgent
                        ? "h-2.5 w-2.5"
                        : "h-2 w-2"
                    }`}
                    style={{
                      backgroundColor:
                        style.accent,
                      boxShadow: urgent
                        ? `0 0 0 4px ${style.accent}18`
                        : undefined,
                    }}
                  />
                </span>

                {/* Notice content */}
                <p
                  className="min-w-0 flex-1 text-[0.78rem] font-semibold leading-relaxed sm:text-[0.82rem]"
                  style={{
                    color:
                      style.muted,
                  }}
                >
                  <span
                    style={{
                      color:
                        style.text,
                    }}
                  >
                    {t(
                      notice.message
                    )}
                  </span>

                  {notice.link_url && (
                    <>
                      {" "}

                      <a
                        href={
                          notice.link_url
                        }
                        className="group ml-1 inline-flex items-center gap-1 border-b pb-[1px] font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{
                          color:
                            style.accent,
                          borderColor:
                            `${style.accent}66`,
                          outlineColor:
                            style.accent,
                        }}
                        onMouseEnter={(
                          event
                        ) => {
                          event.currentTarget.style.color =
                            style.hover;
                        }}
                        onMouseLeave={(
                          event
                        ) => {
                          event.currentTarget.style.color =
                            style.accent;
                        }}
                      >
                        Learn more

                        <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </>
                  )}
                </p>

                {/* Dismiss */}
                <button
                  type="button"
                  onClick={() =>
                    dismiss(
                      notice.id
                    )
                  }
                  aria-label="Dismiss notice"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    color:
                      style.text,
                    borderColor:
                      style.border,
                    outlineColor:
                      style.accent,
                  }}
                  onMouseEnter={(
                    event
                  ) => {
                    event.currentTarget.style.backgroundColor =
                      style.dismissHover;
                  }}
                  onMouseLeave={(
                    event
                  ) => {
                    event.currentTarget.style.backgroundColor =
                      "transparent";
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.aside>
          );
        }
      )}
    </AnimatePresence>
  );
}
