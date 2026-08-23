"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  Users,
} from "lucide-react";
import type { PersonRow } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   ORGANISATIONAL GROUPS

   Order is intentional and preserves the institutional hierarchy:
   Board → Project Directors → Core Field Team → Advisors
───────────────────────────────────────────────────────────── */

const groups: {
  key: PersonRow["group_name"];
  label: string;
}[] = [
  {
    key: "board",
    label: "Board of Directors",
  },
  {
    key: "project_directors",
    label: "Project Directors",
  },
  {
    key: "field_team",
    label: "Core Field Team",
  },
  {
    key: "advisors",
    label: "Advisors",
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
   FOUNDER FEATURE
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
        {/* Portrait */}
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

        {/* Founder information */}
        <figcaption>
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
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0,
        margin: "0px 0px -5% 0px",
      }}
      transition={{
        duration: 0.4,
        delay: Math.min(index, 7) * 0.03,
        ease,
      }}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-5 shadow-[0_8px_28px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/28 hover:shadow-[0_18px_42px_rgba(6,78,122,0.11)] sm:p-6">
        {/* Aqua top rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
        />

        {/* Quiet corner motif */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-[#0891B2]/8 bg-[#67E8F9]/5 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Identity */}
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

        {/* Email */}
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
   PEOPLE GROUP
───────────────────────────────────────────────────────────── */

function PeopleGroup({
  label,
  members,
  portraits,
  groupIndex,
}: {
  label: string;
  members: PersonRow[];
  portraits: Record<string, string>;
  groupIndex: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      aria-label={label}
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: 10,
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
        duration: 0.45,
        delay: groupIndex * 0.04,
        ease,
      }}
    >
      {/* Group header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#064E7A]/9 pb-5">
        <div>
          <h4 className="font-serif text-[1.35rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.55rem]">
            {label}
          </h4>

          <p className="mt-1.5 font-[var(--font-display)] text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#526B75]/52">
            {members.length}{" "}
            {members.length === 1
              ? "member"
              : "members"}
          </p>
        </div>

        {/* Quiet category sequence */}
        <span
          aria-hidden
          className="font-[var(--font-display)] text-[2.6rem] font-extrabold leading-none tracking-[-0.06em] text-[#0891B2]/8"
        >
          {String(
            groupIndex + 1
          ).padStart(2, "0")}
        </span>
      </div>

      {/* Every profile is visible */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map(
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
      </ul>
    </motion.section>
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
   * Preserve only categories that actually exist in the supplied data.
   * No category or person is invented.
   */
  const populatedGroups = groups
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
    );

  if (
    !founder &&
    populatedGroups.length === 0
  ) {
    return null;
  }

  const totalPeople =
    populatedGroups.reduce(
      (total, group) =>
        total +
        group.members.length,
      0
    );

  return (
    <div className="space-y-16 lg:space-y-20">
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
      {populatedGroups.length > 0 && (
        <section
          aria-label="AHEAD team and governance"
          className="relative"
        >
          {/* Overall directory heading */}
          <motion.div
            initial={
              reduced
                ? {}
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              ease,
            }}
            className="mb-10 grid gap-5 border-b border-[#064E7A]/10 pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
          >
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

            {/* Total count */}
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
          </motion.div>

          {/* ─────────────────────────────────────
              ALL GROUPS — VISIBLE SEQUENTIALLY
          ────────────────────────────────────── */}
          <div className="space-y-14 lg:space-y-16">
            {populatedGroups.map(
              (
                group,
                groupIndex
              ) => (
                <PeopleGroup
                  key={group.key}
                  label={group.label}
                  members={
                    group.members
                  }
                  portraits={
                    portraits
                  }
                  groupIndex={
                    groupIndex
                  }
                />
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}
