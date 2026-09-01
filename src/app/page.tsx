import Chapter from "@/components/flow/Chapter";
import ChapterNav, {
  type Chapter as NavChapter,
} from "@/components/flow/ChapterNav";
import ContactBlock from "@/components/flow/ContactBlock";
import DocumentShelf from "@/components/flow/DocumentShelf";
import Hero from "@/components/flow/Hero";
import NoticeBanner from "@/components/flow/NoticeBanner";
import PeopleGrid from "@/components/flow/PeopleGrid";
import Prose from "@/components/flow/Prose";
import PullQuote from "@/components/flow/PullQuote";
import Manifesto from "@/components/flow/Manifesto";
import GalleryFilmstrip from "@/components/flow/GalleryFilmstrip";
import FilmLibrary from "@/components/flow/FilmLibrary";
import PublicationsExplorer from "@/components/flow/PublicationsExplorer";
import Reveal from "@/components/flow/Reveal";
import WorkCards from "@/components/flow/WorkCards";
import { draftMode } from "next/headers";
import DraftBanner from "@/components/flow/DraftBanner";
import BlogCards from "@/components/flow/BlogCards";
import PartnersGrid from "@/components/flow/PartnersGrid";
import SocialCards from "@/components/flow/SocialCards";
import VideoGrid from "@/components/flow/VideoGrid";

import {
  getActiveNotices,
  getBlogPosts,
  getDocuments,
  getMedia,
  getPeople,
  getSections,
  getSettings,
  getSocialPosts,
  getVideos,
} from "@/lib/content";

import { createClient } from "@/lib/supabase/server";
import { getYouTubeFeedVideos } from "@/lib/youtube-feed";
import { t, type MediaRow } from "@/lib/types";

/**
 * The single-flow site.
 *
 * Most chapters render when their corresponding database section is
 * published. RLS keeps draft sections hidden from anonymous readers.
 *
 * Partners are established public content and are intentionally rendered
 * independently of Supabase/CMS using local assets in the website repository.
 *
 * ISR keeps the page static; admin publish actions will call
 * revalidatePath("/") for near-instant updates (Phase 3).
 */
export const revalidate = 300;

const navLabels: Record<string, string> = {
  story: "Story",
  philosophy: "Philosophy",
  work: "Work",
  field: "Field Stories",
  publications: "Publications",
  blog: "Updates",
  media: "Media",
  reports: "Reports",
  partners: "Partners",
  contact: "Contact",
};


/**
 * Hero slideshow is intentionally local and independent of Supabase.
 *
 * This preserves the three existing hero photographs and adds the
 * three new photographs in the same sequence.
 *
 * Expected files:
 *   public/hero/hero-children-sunset.jpg
 *   public/hero/hero-education.jpg
 *   public/hero/hero-farmland.jpg
 *   public/hero/hero-agri.jpg
 *   public/hero/hero-solar.jpg
 *   public/hero/hero-plant.jpg
 */
const HERO_SLIDES = [
  {
    id: "hero-children-sunset",
    title: "Children playing at sunset in rural India",
    alt_text: {
      en: "Children playing at sunset in rural India",
    },
    caption: {},
    collection: "hero",
    source: "local",
    file_path: "/hero/hero-children-sunset.jpg",
    url: null,
    drive_file_id: null,
    status: "published",
    sort_order: 1,
  },
  {
    id: "hero-education",
    title: "Children learning with slates in a rural school",
    alt_text: {
      en: "Children learning with slates in a rural school",
    },
    caption: {},
    collection: "hero",
    source: "local",
    file_path: "/hero/hero-education.jpg",
    url: null,
    drive_file_id: null,
    status: "published",
    sort_order: 3,
  },
  {
    id: "hero-farmland",
    title: "Aerial view of lush green farmlands in Eastern India",
    alt_text: {
      en: "Aerial view of lush green farmlands in Eastern India",
    },
    caption: {},
    collection: "hero",
    source: "local",
    file_path: "/hero/hero-farmland.jpg",
    url: null,
    drive_file_id: null,
    status: "published",
    sort_order: 0,
  },
  {
    id: "hero-agri",
    title: "hero-agri.jpg",
    alt_text: {},
    caption: {},
    collection: "hero",
    source: "local",
    file_path: "/hero/hero-agri.jpg",
    url: null,
    drive_file_id: null,
    status: "published",
    sort_order: 2,
  },
  {
    id: "hero-solar",
    title: "hero-solar.jpg",
    alt_text: {},
    caption: {},
    collection: "hero",
    source: "local",
    file_path: "/hero/hero-solar.jpg",
    url: null,
    drive_file_id: null,
    status: "published",
    sort_order: 4,
  },
  {
    id: "hero-plant",
    title: "hero-plant.jpg",
    alt_text: {},
    caption: {},
    collection: "hero",
    source: "local",
    file_path: "/hero/hero-plant.jpg",
    url: null,
    drive_file_id: null,
    status: "published",
    sort_order: 5,
  },
] as unknown as MediaRow[];

export default async function Home() {
  // Draft preview: staff sessions read through RLS, which reveals drafts.
  const { isEnabled: preview } = await draftMode();

  const db = preview
    ? await createClient()
    : undefined;

  const [
    sections,
    documents,
    people,
    notices,
    settings,
    fallbackVideos,
    youtubeFeedVideos,
    socialPosts,
    blogPosts,
    galleryEdu,
    galleryFood,
    avDocs,
    avLearning,
    portraitRows,
  ] = await Promise.all([
    getSections(db),
    getDocuments(db),
    getPeople(db),
    getActiveNotices(db),
    getSettings(db),
    getVideos(9, db),
    getYouTubeFeedVideos(9),
    getSocialPosts(8, db),
    getBlogPosts(6, db),
    getMedia("gallery_education", db),
    getMedia("gallery_food", db),
    getMedia("av_documentaries", db),
    getMedia("av_learning", db),
    getMedia("people", db),
  ]);

  // Prefer the official YouTube Atom feed. The existing CMS/Supabase
  // video rows remain a temporary fallback while the migration is phased in.
  const videos =
    youtubeFeedVideos && youtubeFeedVideos.length > 0
      ? youtubeFeedVideos
      : fallbackVideos;

  const portraits =
    Object.fromEntries(
      portraitRows
        .map((m) => [
          m.id,
          m.url ??
            m.file_path ??
            "",
        ])
        .filter(([, u]) => u)
    ) as Record<string, string>;

  const bySlug =
    Object.fromEntries(
      sections.map((s) => [
        s.slug,
        s,
      ])
    );

  const workAreas =
    sections.filter(
      (s) =>
        s.parent_slug ===
        "work"
    );

  const publications =
    documents.filter(
      (d) =>
        d.category ===
        "publication"
    );

  const transparency =
    documents.filter(
      (d) =>
        d.category !==
        "publication"
    );

  const hero =
    bySlug["hero"];

  const heroStats =
    ((hero?.extra?.stats as {
      value: string;
      label: string;
    }[]) ?? []);

  const registration =
    (bySlug["story"]?.extra
      ?.registration ??
      {}) as Record<
      string,
      string
    >;

  const chapterOrder = [
    "story",
    "philosophy",
    "work",
    "field",
    "publications",
    "blog",
    "media",
    "reports",
    "partners",
    "contact",
  ];

  /**
   * Partners are established public content migrated directly from
   * AHEAD's existing website. This chapter is intentionally independent
   * of Supabase/CMS and therefore always remains in the public flow.
   */
  const present =
    chapterOrder.filter(
      (slug) => {
        if (
          slug ===
          "partners"
        ) {
          return true;
        }

        return Boolean(
          bySlug[slug]
        );
      }
    );

  const chapters: NavChapter[] =
    present.map((slug) => ({
      slug,
      label:
        navLabels[slug] ??
        slug,
    }));

  const num = (
    slug: string
  ) =>
    present.indexOf(slug) +
    1;

  return (
    <>
      {preview && (
        <DraftBanner />
      )}

      <NoticeBanner
        notices={notices}
      />

      <ChapterNav
        chapters={chapters}
      />

      {/* ─────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────── */}

      {hero && (
        <Hero
          title={t(hero.title)}
          subtitle={t(
            hero.subtitle
          )}
          stats={heroStats}
          slides={HERO_SLIDES}
        />
      )}

      {/* ─────────────────────────────────────────────
          OUR STORY
      ───────────────────────────────────────────── */}

      {bySlug["story"] && (
        <Chapter
          slug="story"
          number={num("story")}
          title={t(
            bySlug["story"]
              .title
          )}
          subtitle={t(
            bySlug["story"]
              .subtitle
          )}
        >
          <div className="relative">
            {/* Decorative atmosphere only */}

            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#67E8F9]/10 blur-3xl"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#D8A441]/8 blur-3xl"
            />

            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
              {/* Story narrative */}

              <Reveal>
                <article className="relative overflow-hidden rounded-[1.75rem] border border-[#064E7A]/12 bg-[#FFF8EA]/90 shadow-[0_20px_60px_rgba(6,78,122,0.08)]">
                  {/* Vertical identity accent */}

                  <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
                  />

                  <div className="px-7 py-8 sm:px-9 sm:py-10 lg:px-11 lg:py-12">
                    {/* Archival divider */}

                    <div
                      aria-hidden
                      className="mb-8 flex items-center gap-3"
                    >
                      <span className="h-px w-12 bg-[#0891B2]/55" />

                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D8A441]" />

                      <span className="h-px flex-1 bg-gradient-to-r from-[#D8A441]/35 to-transparent" />
                    </div>

                    <Prose
                      text={t(
                        bySlug[
                          "story"
                        ].body
                      )}
                      className="max-w-3xl text-[1.03rem] font-medium leading-[1.85] text-[#243841] sm:text-[1.08rem]"
                    />
                  </div>
                </article>
              </Reveal>

              {/* Institutional record */}

              <Reveal delay={100}>
                <aside className="relative">
                  {/* Soft depth around the record */}

                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-[#0891B2]/8 via-transparent to-[#D8A441]/10 blur-xl"
                  />

                  <dl className="relative overflow-hidden rounded-[1.75rem] border border-[#064E7A]/14 bg-[#FFFBF2] shadow-[0_20px_55px_rgba(6,78,122,0.10)]">
                    {/* Top identity stripe */}

                    <div
                      aria-hidden
                      className="h-1.5 w-full bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
                    />

                    <div className="p-7 sm:p-8">
                      {/* Record heading */}

                      <div className="mb-6">
                        <div className="flex items-center gap-3">
                          <span className="h-px w-8 bg-[#B96543]/70" />

                          <div className="font-[var(--font-display)] text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-[#B96543]">
                            From the
                            record
                          </div>
                        </div>

                        <div className="mt-5 h-px w-full bg-gradient-to-r from-[#064E7A]/16 via-[#0891B2]/12 to-transparent" />
                      </div>

                      {/* Registered */}

                      <div className="pb-5">
                        <dt className="font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#526B75]">
                          Registered
                        </dt>

                        <dd className="mt-1.5 font-[var(--font-display)] text-[0.98rem] font-bold text-[#064E7A]">
                          {
                            registration.registered
                          }
                        </dd>
                      </div>

                      {/* CIN */}

                      <div className="border-t border-[#064E7A]/10 py-5">
                        <dt className="font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#526B75]">
                          CIN
                        </dt>

                        <dd className="mt-1.5 break-words font-[var(--font-display)] text-[0.94rem] font-bold leading-relaxed text-[#064E7A]">
                          {
                            registration.cin
                          }
                        </dd>
                      </div>

                      {/* MCA licence */}

                      <div className="border-t border-[#064E7A]/10 py-5">
                        <dt className="font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#526B75]">
                          MCA
                          licence
                        </dt>

                        <dd className="mt-1.5 font-[var(--font-display)] text-[0.98rem] font-bold text-[#064E7A]">
                          {
                            registration.licence
                          }
                        </dd>
                      </div>

                      {/* FCRA registration */}

                      <div className="border-t border-[#064E7A]/10 pt-5">
                        <dt className="font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#526B75]">
                          FCRA
                          registration
                        </dt>

                        <dd className="mt-1.5 font-[var(--font-display)] text-[0.98rem] font-bold text-[#064E7A]">
                          {
                            registration.fcra
                          }
                        </dd>
                      </div>
                    </div>

                    {/* Bottom archival accent */}

                    <div
                      aria-hidden
                      className="h-[3px] w-full bg-gradient-to-r from-[#D8A441]/65 via-[#B96543]/45 to-transparent"
                    />
                  </dl>
                </aside>
              </Reveal>
            </div>
          </div>
        </Chapter>
      )}

      {/* ─────────────────────────────────────────────
          PHILOSOPHY & MISSION
      ───────────────────────────────────────────── */}

      {bySlug[
        "philosophy"
      ] &&
        (() => {
          // The seeded body is "**Vision:** … **Mission:**\n- …\n- …" — split it
          // into a manifesto lockup; fall back to prose if the shape ever changes.

          const raw = t(
            bySlug[
              "philosophy"
            ].body
          );

          const visionMatch =
            /\*\*Vision:\*\*\s*([\s\S]*?)(?=\n\s*\n|\*\*Mission)/.exec(
              raw
            );

          const missions = [
            ...raw.matchAll(
              /^- (.+)$/gm
            ),
          ].map(
            (m) => m[1]
          );

          const vision =
            visionMatch?.[1]?.trim();

          return (
            <Chapter
              slug="philosophy"
              number={num(
                "philosophy"
              )}
              title={t(
                bySlug[
                  "philosophy"
                ].title
              )}
              tone="white"
            >
              {vision &&
              missions.length >
                0 ? (
                <Manifesto
                  vision={
                    vision
                  }
                  missions={
                    missions
                  }
                />
              ) : (
                <Reveal>
                  <Prose
                    text={raw}
                    className="max-w-3xl text-[#1F2933]/85"
                  />
                </Reveal>
              )}
            </Chapter>
          );
        })()}

      {/* ─────────────────────────────────────────────
          AREAS OF WORK
      ───────────────────────────────────────────── */}

      {bySlug["work"] && (
        <Chapter
          slug="work"
          number={num("work")}
          title={t(
            bySlug["work"]
              .title
          )}
          subtitle={t(
            bySlug["work"]
              .subtitle
          )}
        >
          <WorkCards
            areas={workAreas}
          />
        </Chapter>
      )}

      {/* ─────────────────────────────────────────────
          FIELD STORIES
      ───────────────────────────────────────────── */}

      {bySlug["field"] && (
        <Chapter
          slug="field"
          number={num("field")}
          title={t(
            bySlug["field"]
              .title
          )}
          subtitle={t(
            bySlug["field"]
              .subtitle
          )}
          tone="white"
        >
          <div className="space-y-10">
            <Reveal>
              <Prose
                text={t(
                  bySlug[
                    "field"
                  ].body
                )}
                className="max-w-3xl text-[#1F2933]/85"
              />
            </Reveal>

            <GalleryFilmstrip
              title="Activity based learning"
              images={galleryEdu.filter(
                (m) =>
                  m.title ===
                  "Activity based learning"
              )}
            />

            <GalleryFilmstrip
              title="Education initiative"
              images={galleryEdu.filter(
                (m) =>
                  m.title !==
                  "Activity based learning"
              )}
            />

            <GalleryFilmstrip
              title="Home gardens & natural resource management"
              images={galleryFood.filter(
                (m) =>
                  m.title ===
                    "Home gardens" ||
                  m.title ===
                    "Natural resource management" ||
                  m.title ===
                    "Afforestation"
              )}
            />

            <GalleryFilmstrip
              title="Food & nutrition"
              images={galleryFood.filter(
                (m) =>
                  m.title ===
                  "Food & nutrition"
              )}
            />
          </div>
        </Chapter>
      )}

      {/* ─────────────────────────────────────────────
          PUBLICATIONS
      ───────────────────────────────────────────── */}

      {bySlug[
        "publications"
      ] && (
        <Chapter
          slug="publications"
          number={num(
            "publications"
          )}
          title={t(
            bySlug[
              "publications"
            ].title
          )}
          subtitle={`${publications.length} published materials across four collections`}
          tone="white"
        >
          <PublicationsExplorer
            items={publications}
          />
        </Chapter>
      )}

      {/* ─────────────────────────────────────────────
          UPDATES / BLOG
      ───────────────────────────────────────────── */}

      {bySlug["blog"] && (
        <Chapter
          slug="blog"
          number={num("blog")}
          title={t(
            bySlug["blog"]
              .title
          )}
          subtitle={t(
            bySlug["blog"]
              .subtitle
          )}
        >
          <BlogCards
            posts={blogPosts}
          />
        </Chapter>
      )}

    {/* ─────────────────────────────────────────────
    VIDEOS & SOCIAL MEDIA
───────────────────────────────────────────── */}

{bySlug["media"] && (
  <Chapter
    slug="media"
    number={num("media")}
    title="Videos & Social Media"
    subtitle="Documentaries, learning films and recent updates from AHEAD's digital channels"
    tone="white"
  >
    <div className="space-y-14">
      <FilmLibrary
        documentaries={avDocs}
        learning={avLearning}
      />

      {videos.length > 0 && (
        <section
          aria-label="From our YouTube channel"
          className="relative border-t border-[#064E7A]/10 pt-10 sm:pt-12"
        >
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B96543]/55" />

              <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
                YouTube
              </span>
            </div>

            <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
              From our YouTube channel
            </h3>
          </div>

          <VideoGrid videos={videos} />

          <div className="mt-7 flex justify-center">
            <a
              href="https://www.youtube.com/@aheadinitiatives4836"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-5 py-2.5 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985]"
            >
              Visit our YouTube channel
              <span aria-hidden>↗</span>
            </a>
          </div>
        </section>
      )}

      <SocialCards posts={socialPosts} />
    </div>
  </Chapter>
)}

      {/* ─────────────────────────────────────────────
          REPORTS & TRANSPARENCY
      ───────────────────────────────────────────── */}

      {bySlug[
        "reports"
      ] && (
        <Chapter
          slug="reports"
          number={num(
            "reports"
          )}
          title={t(
            bySlug[
              "reports"
            ].title
          )}
          subtitle={t(
            bySlug[
              "reports"
            ].subtitle
          )}
          tone="ink"
        >
          <DocumentShelf
            items={
              transparency
            }
          />
        </Chapter>
      )}

      {/* ─────────────────────────────────────────────
          PARTNERS

          Established public content migrated from
          AHEAD's existing website.

          This chapter is intentionally independent
          of Supabase/CMS.
      ───────────────────────────────────────────── */}

      <Chapter
        slug="partners"
        number={num(
          "partners"
        )}
        title="Our present Partners"
        tone="white"
      >
        <PartnersGrid />
      </Chapter>

      {/* ─────────────────────────────────────────────
          PULL QUOTE
      ───────────────────────────────────────────── */}

      <PullQuote
        text="Our efforts would be misplaced and meaningless if we are not able to evoke the humanity in all of us to support our simple initiatives."
        attribution="AHEAD Initiatives — Support our Initiatives"
      />

      {/* ─────────────────────────────────────────────
          CONTACT / GOVERNANCE / TEAM
      ───────────────────────────────────────────── */}

      {bySlug[
        "contact"
      ] && (
        <Chapter
          slug="contact"
          number={num(
            "contact"
          )}
          title={t(
            bySlug[
              "contact"
            ].title
          )}
        >
          <div className="space-y-16">
            {t(
              bySlug[
                "contact"
              ].body
            ) && (
              <Reveal>
                <Prose
                  text={t(
                    bySlug[
                      "contact"
                    ].body
                  )}
                  className="mx-auto max-w-3xl text-center text-lg text-[#1F2933]/85"
                />
              </Reveal>
            )}

            {/* Team first — governance and field team — then how to reach us */}

            <PeopleGrid
              people={people}
              portraits={
                portraits
              }
            />

            <div className="border-t border-[#16324F]/10 pt-14">
              <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-[#16324F]">
                Reach out
                &amp;
                collaborate
              </h3>

              <ContactBlock
                org={
                  (settings.org ??
                    {}) as Record<
                    string,
                    string
                  >
                }
                channels={
                  (settings.channels ??
                    {}) as Record<
                    string,
                    string
                  >
                }
              />
            </div>
          </div>
        </Chapter>
      )}
    </>
  );
}
