"use client";

import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Mail,
  ChevronDown,
  ArrowUpRight,
  Users,
} from "lucide-react";
import type { PersonRow } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const FIELD_INITIAL = 8;

const groups: {
  key: PersonRow["group_name"];
  label: string;
  shortLabel: string;
}[] = [
  {
    key: "board",
    label: "Board of Directors",
    shortLabel: "Board",
  },
  {
    key: "project_directors",
    label: "Project Directors",
    shortLabel: "Project Directors",
  },
  {
    key: "field_team",
    label: "Core Field Team",
    shortLabel: "Field Team",
  },
  {
    key: "advisors",
    label: "Advisors",
    shortLabel: "Advisors",
  },
];

/* ─────────────────────────────────────────────────────────────
   PORTRAIT
───────────────────────────────────────────────────────────── */

function Portrait({
  src,
  name,
  size = "md",
}: {
  src?: string;
  name: string;
  size?: "md" | "lg";
}) {
  const dimensions =
    size === "lg"
      ? "h-28 w-28 sm:h-32 sm:w-32"
      : "h-20 w-20";

  const initials = name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  if (!src) {
    return (
      <span
        aria-hidden
        className={`flex ${dimensions} shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#0891B2]/16 bg-gradient-to-br from-[#EAFBFD] to-[#F6EEDC] font-serif text-lg font-bold text-[#064E7A]/55`}
      >
        {initials}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      width={size === "lg" ? 128 : 80}
      height={size === "lg" ? 128 : 80}
      className={`${dimensions} shrink-0 rounded-full object-cover`}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   FOUNDER
───────────────────────────────────────────────────────────── */

function FounderFeature({
  founder,
  portrait,
}: {
  founder: PersonRow;
  portrait?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.figure
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "0px 0px -10% 0px",
      }}
      transition={{
        duration: 0.65,
        ease,
      }}
      className="relative overflow-hidden rounded-[2rem] border border-[#67E8F9]/22 bg-[#064E7A] text-white shadow-[0_24px_70px_rgba(6,78,122,0.18)]"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(103,232,249,0.17),transparent_26rem),radial-gradient(circle_at_10%_100%,rgba(216,164,65,0.10),transparent_22rem),linear-gradient(135deg,#053B5E_0%,#064E7A_55%,#075985_100%)]"
      />

      {/* Archival grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Aqua identity line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#67E8F9] via-[#A5F3FC] to-[#D8A441]"
      />

      <div className="relative grid gap-7 p-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:p-9 lg:p-10">
        {/* Founder portrait */}
        <div className="relative w-fit">
          <div
            aria-hidden
            className="absolute -inset-2 rounded-full border border-[#67E8F9]/22"
          />

          <div
            aria-hidden
            className="absolute -inset-1 rounded-full border border-[#D8A441]/28"
          />

          <div className="relative overflow-hidden rounded-full border-[3px] border-[#FFF8EA]/80 bg-[#FFF8EA] shadow-[0_12px_34px_rgba(0,0,0,0.25)]">
            <Portrait
              src={portrait}
              name={founder.name}
              size="lg"
            />
          </div>
        </div>

        <figcaption>
          {/* Founder label */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-9 bg-[#67E8F9]/65" />

            <span className="font-[var(--font-display)] text-[0.64rem] font-extrabold uppercase tracking-[0.28em] text-[#FFE29A]">
              Our Founder &amp; Inspirer
            </span>
          </div>

          <div className="font-serif text-[1.8rem] font-bold leading-tight tracking-[-0.03em] text-[#FFF8EA] sm:text-[2.25rem]">
            {founder.name}
          </div>

          {founder.role && (
            <div className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-white/72 sm:text-[0.95rem]">
              {founder.role}
            </div>
          )}

          {t(founder.bio) && (
            <div className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">
              {t(founder.bio)}
            </div>
          )}

          {founder.email && (
            <a
              href={`mailto:${founder.email}`}
              className="group mt-5 inline-flex items-center gap-2 border-b border-[#67E8F9]/30 pb-1 text-xs font-bold text-[#B9F6FF] transition-colors hover:border-[#FFE29A]/60 hover:text-[#FFE29A]"
            >
              <Mail className="h-3.5 w-3.5" />

              {founder.email}

              <ArrowUpRight className="h-3 w-3 opacity-55 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </figcaption>
      </div>
    </motion.figure>
  );
}

/* ─────────────────────────────────────────────────────────────
   PERSON CARD
───────────────────────────────────────────────────────────── */

function PersonCard({
  person,
  portrait,
  index,
}: {
  person: PersonRow;
  portrait?: string;
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.li
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
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.38,
        delay: Math.min(index, 8) * 0.035,
        ease,
      }}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-5 shadow-[0_8px_28px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/28 hover:shadow-[0_18px_42px_rgba(6,78,122,0.11)] sm:p-6">
        {/* Top aqua rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
        />

        {/* Quiet decorative circle */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-[#0891B2]/8 bg-[#67E8F9]/5 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Person identity */}
        <div className="relative flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="overflow-hidden rounded-full border-2 border-[#FFFDF8] shadow-[0_5px_16px_rgba(6,78,122,0.12)] ring-1 ring-[#0891B2]/14">
              <Portrait
                src={portrait}
                name={person.name}
              />
            </div>
          </div>

          <div className="min-w-0 pt-1">
            <h4 className="font-serif text-[1.05rem] font-bold leading-[1.3] tracking-[-0.018em] text-[#064E7A]">
              {person.name}
            </h4>

            {person.role && (
              <p className="mt-1.5 text-[0.72rem] font-semibold leading-[1.55] text-[#526B75]/78">
                {person.role}
              </p>
            )}
          </div>
        </div>

        {/* Biography */}
        {t(person.bio) && (
          <p className="relative mt-4 text-[0.76rem] font-medium leading-[1.7] text-[#526B75]/68">
            {t(person.bio)}
          </p>
        )}

        {/* Contact */}
        {person.email && (
          <div className="relative mt-auto pt-5">
            <div className="mb-3 h-px w-full bg-[#064E7A]/8" />

            <a
              href={`mailto:${person.email}`}
              title={person.email}
              className="group/mail inline-flex max-w-full items-center gap-2 text-[0.67rem] font-semibold text-[#075985] transition-colors hover:text-[#0891B2]"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-[#0891B2]" />

              <span className="truncate">
                {person.email}
              </span>

              <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-all duration-200 group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5 group-hover/mail:opacity-60" />
            </a>
          </div>
        )}
      </article>
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PEOPLE DIRECTORY
───────────────────────────────────────────────────────────── */

export default function PeopleGrid({
  people,
  portraits,
}: {
  people: PersonRow[];
  portraits: Record<string, string>;
}) {
  const reduced = useReducedMotion();

  const founder = people.find(
    (person) =>
      person.group_name === "founder"
  );

  /*
   * Only expose groups that actually contain people.
   * Nothing is invented if a group is absent from the CMS.
   */
  const availableGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          members: people.filter(
            (person) =>
              person.group_name === group.key
          ),
        }))
        .filter(
          (group) =>
            group.members.length > 0
        ),
    [people]
  );

  const [activeGroup, setActiveGroup] =
    useState<PersonRow["group_name"]>(
      availableGroups[0]?.key ?? "board"
    );

  const [showAllFieldTeam, setShowAllFieldTeam] =
    useState(false);

  const active =
    availableGroups.find(
      (group) =>
        group.key === activeGroup
    ) ?? availableGroups[0];

  if (!founder && availableGroups.length === 0) {
    return null;
  }

  const visibleMembers =
    active?.key === "field_team" &&
    !showAllFieldTeam
      ? active.members.slice(
          0,
          FIELD_INITIAL
        )
      : active?.members ?? [];

  const hiddenFieldMembers =
    active?.key === "field_team"
      ? Math.max(
          0,
          active.members.length -
            FIELD_INITIAL
        )
      : 0;

  const totalPeople =
    availableGroups.reduce(
      (sum, group) =>
        sum + group.members.length,
      0
    );

  const selectGroup = (
    key: PersonRow["group_name"]
  ) => {
    setActiveGroup(key);

    /*
     * Return field-team progressive disclosure to its
     * compact state when navigating between groups.
     */
    setShowAllFieldTeam(false);
  };

  return (
    <div className="space-y-16">
      {/* ───────────────────────────────────────
          FOUNDER
      ──────────────────────────────────────── */}
      {founder && (
        <FounderFeature
          founder={founder}
          portrait={
            portraits[
              founder.photo_media_id ?? ""
            ]
          }
        />
      )}

      {/* ───────────────────────────────────────
          OUR PEOPLE
      ──────────────────────────────────────── */}
      {availableGroups.length > 0 && (
        <section aria-label="AHEAD team and governance">
          {/* Directory header */}
          <div className="mb-7 grid gap-5 border-b border-[#064E7A]/10 pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-8 bg-[#0891B2]/55" />

                <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.24em] text-[#526B75]/68">
                  Governance &amp; Team
                </span>
              </div>

              <h3 className="font-serif text-[1.8rem] font-bold tracking-[-0.03em] text-[#064E7A] sm:text-[2.15rem]">
                Our People
              </h3>
            </div>

            <div className="flex items-center gap-3 lg:text-right">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0891B2]/12 bg-[#EAFBFD] text-[#075985]">
                <Users className="h-4 w-4" />
              </div>

              <div>
                <div className="font-[var(--font-display)] text-xl font-extrabold leading-none text-[#064E7A]">
                  {totalPeople}
                </div>

                <div className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.18em] text-[#526B75]/52">
                  people
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────
              GROUP NAVIGATION
          ────────────────────────────────────── */}
          <div
            role="tablist"
            aria-label="Team groups"
            className="scrollbar-none mb-8 flex gap-2 overflow-x-auto pb-2"
          >
            {availableGroups.map(
              (group) => {
                const current =
                  active?.key ===
                  group.key;

                return (
                  <button
                    key={group.key}
                    type="button"
                    role="tab"
                    aria-selected={current}
                    onClick={() =>
                      selectGroup(
                        group.key
                      )
                    }
                    className={`relative shrink-0 overflow-hidden rounded-full border px-4 py-2.5 font-[var(--font-display)] text-[0.7rem] font-bold transition-all duration-250 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2] ${
                      current
                        ? "border-[#064E7A] text-white shadow-[0_8px_20px_rgba(6,78,122,0.14)]"
                        : "border-[#064E7A]/11 bg-[#FFFDF8] text-[#425A64] hover:border-[#0891B2]/25 hover:bg-[#EAFBFD]/55"
                    }`}
                  >
                    {current && (
                      <motion.span
                        layoutId="people-group"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#064E7A] to-[#075985]"
                        transition={{
                          duration: 0.25,
                          ease,
                        }}
                      />
                    )}

                    <span className="relative">
                      {group.shortLabel}

                      <span
                        className={`ml-1.5 ${
                          current
                            ? "text-white/58"
                            : "text-[#526B75]/42"
                        }`}
                      >
                        {group.members.length}
                      </span>
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {/* Active group context */}
          {active && (
            <div className="mb-6 flex items-end justify-between gap-5">
              <div>
                <motion.h4
                  key={active.key}
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
                    ease,
                  }}
                  className="font-serif text-[1.3rem] font-bold text-[#064E7A]"
                >
                  {active.label}
                </motion.h4>

                <p className="mt-1 text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-[#526B75]/52">
                  {active.members.length}{" "}
                  {active.members.length === 1
                    ? "member"
                    : "members"}
                </p>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────
              PEOPLE GRID
          ────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.key}
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
                  duration: 0.2,
                }}
              >
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <AnimatePresence initial={false}>
                    {visibleMembers.map(
                      (person, index) => (
                        <PersonCard
                          key={person.id}
                          person={person}
                          portrait={
                            portraits[
                              person.photo_media_id ??
                                ""
                            ]
                          }
                          index={index}
                        />
                      )
                    )}
                  </AnimatePresence>
                </ul>

                {/* Field-team progressive disclosure */}
                {active.key === "field_team" &&
                  active.members.length >
                    FIELD_INITIAL && (
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#064E7A]/8 pt-5">
                      <div className="text-[0.68rem] font-medium text-[#526B75]/58">
                        Showing{" "}
                        {showAllFieldTeam
                          ? active.members.length
                          : Math.min(
                              FIELD_INITIAL,
                              active.members.length
                            )}{" "}
                        of{" "}
                        {active.members.length}{" "}
                        team members
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setShowAllFieldTeam(
                            (current) =>
                              !current
                          )
                        }
                        className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-4 py-2 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/32 hover:bg-[#EAFBFD]"
                      >
                        {showAllFieldTeam
                          ? "Show fewer"
                          : `View all ${active.members.length} team members`}

                        <motion.span
                          animate={
                            reduced
                              ? {}
                              : {
                                  rotate:
                                    showAllFieldTeam
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
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}
    </div>
  );
}
