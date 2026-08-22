import Chapter from "@/components/flow/Chapter";
import ChapterNav, { type Chapter as NavChapter } from "@/components/flow/ChapterNav";
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
  getActiveNotices, getBlogPosts, getDocuments, getMedia, getPartners,
  getPeople, getSections, getSettings, getSocialPosts, getVideos,
} from "@/lib/content";
import { createClient } from "@/lib/supabase/server";
import { t } from "@/lib/types";

/**
 * The single-flow site. Every chapter renders from the database;
 * RLS hides draft chapters from anonymous readers, so unfinished
 * sections (field stories, blog, media, social, partners) simply
 * do not appear until AHEAD publishes them from the admin panel.
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
  social: "Social",
  reports: "Reports",
  partners: "Partners",
  contact: "Contact",
};

export default async function Home() {
  // Draft preview: staff sessions read through RLS, which reveals drafts.
  const { isEnabled: preview } = await draftMode();
  const db = preview ? await createClient() : undefined;
  const [sections, documents, people, heroSlides, notices, settings, videos, socialPosts, blogPosts, partners,
    galleryEdu, galleryFood, avDocs, avLearning, portraitRows] = await Promise.all([
    getSections(db), getDocuments(db), getPeople(db), getMedia("hero", db), getActiveNotices(db),
    getSettings(db), getVideos(9, db), getSocialPosts(8, db), getBlogPosts(6, db), getPartners(db),
    getMedia("gallery_education", db), getMedia("gallery_food", db),
    getMedia("av_documentaries", db), getMedia("av_learning", db), getMedia("people", db),
  ]);
  const portraits = Object.fromEntries(
    portraitRows.map((m) => [m.id, m.url ?? m.file_path ?? ""]).filter(([, u]) => u)
  ) as Record<string, string>;

  const bySlug = Object.fromEntries(sections.map((s) => [s.slug, s]));
  const workAreas = sections.filter((s) => s.parent_slug === "work");
  const publications = documents.filter((d) => d.category === "publication");
  const transparency = documents.filter((d) => d.category !== "publication");
  const hero = bySlug["hero"];
  const heroStats = ((hero?.extra?.stats as { value: string; label: string }[]) ?? []);
  const registration = (bySlug["story"]?.extra?.registration ?? {}) as Record<string, string>;

  const chapterOrder = ["story", "philosophy", "work", "field", "publications", "blog", "media", "social", "reports", "partners", "contact"];
  const present = chapterOrder.filter((slug) => bySlug[slug]);
  const chapters: NavChapter[] = present.map((slug) => ({ slug, label: navLabels[slug] ?? slug }));
  const num = (slug: string) => present.indexOf(slug) + 1;

  return (
    <>
      {preview && <DraftBanner />}
      <NoticeBanner notices={notices} />
      <ChapterNav chapters={chapters} />

      {hero && (
        <Hero
          title={t(hero.title)}
          subtitle={t(hero.subtitle)}
          stats={heroStats}
          slides={heroSlides}
        />
      )}

      {bySlug["story"] && (
        <Chapter
          slug="story"
          number={num("story")}
          title={t(bySlug["story"].title)}
          subtitle={t(bySlug["story"].subtitle)}
        >
          <div className="relative">
            {/* Subtle archival surface behind the story content */}
            <div
              aria-hidden
              className="absolute -inset-x-4 -inset-y-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(223,175,69,0.12),transparent_24rem),linear-gradient(180deg,rgba(255,250,241,0.72),rgba(247,239,228,0.52))] sm:-inset-x-8 lg:-inset-x-10"
            />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
              <Reveal>
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -left-5 top-1 hidden h-full w-px bg-gradient-to-b from-[#b85c38]/45 via-[#dfaf45]/28 to-transparent lg:block"
                  />

                  <div className="rounded-[1.75rem] border border-[#14314d]/10 bg-[#fffaf1]/62 p-6 shadow-[0_16px_42px_rgba(16,42,67,0.06)] backdrop-blur-sm sm:p-8 lg:p-9">
                    <div
                      aria-hidden
                      className="mb-7 h-px w-full bg-gradient-to-r from-[#b85c38]/45 via-[#dfaf45]/28 to-transparent"
                    />

                    <Prose
                      text={t(bySlug["story"].body)}
                      className="max-w-3xl text-[#17212b]/82"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <dl className="relative h-fit overflow-hidden rounded-[1.5rem] border border-[#14314d]/12 bg-[#fffaf1]/88 p-6 text-sm shadow-[0_18px_48px_rgba(16,42,67,0.10)] backdrop-blur-sm">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b85c38]/80 via-[#dfaf45]/65 to-[#2f5f46]/55"
                  />

                  <div
                    aria-hidden
                    className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-[#dfaf45]/12"
                  />

                  <div className="relative mb-5 border-b border-dashed border-[#14314d]/16 pb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b85c38]">
                    From the record
                  </div>

                  <div className="relative pb-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17212b]/46">
                      Registered
                    </dt>
                    <dd className="mt-1 font-medium leading-relaxed text-[#14314d]">
                      {registration.registered}
                    </dd>
                  </div>

                  <div className="relative border-t border-[#14314d]/10 py-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17212b]/46">
                      CIN
                    </dt>
                    <dd className="mt-1 break-words font-medium leading-relaxed text-[#14314d]">
                      {registration.cin}
                    </dd>
                  </div>

                  <div className="relative border-t border-[#14314d]/10 py-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17212b]/46">
                      MCA licence
                    </dt>
                    <dd className="mt-1 break-words font-medium leading-relaxed text-[#14314d]">
                      {registration.licence}
                    </dd>
                  </div>

                  <div className="relative border-t border-[#14314d]/10 pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17212b]/46">
                      FCRA registration
                    </dt>
                    <dd className="mt-1 break-words font-medium leading-relaxed text-[#14314d]">
                      {registration.fcra}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </Chapter>
      )}

      {bySlug["philosophy"] && (() => {
        // The seeded body is "**Vision:** … **Mission:**\n- …\n- …" — split it
        // into a manifesto lockup; fall back to prose if the shape ever changes.
        const raw = t(bySlug["philosophy"].body);
        const visionMatch = /\*\*Vision:\*\*\s*([\s\S]*?)(?=\n\s*\n|\*\*Mission)/.exec(raw);
        const missions = [...raw.matchAll(/^- (.+)$/gm)].map((m) => m[1]);
        const vision = visionMatch?.[1]?.trim();
        return (
          <Chapter slug="philosophy" number={num("philosophy")} title={t(bySlug["philosophy"].title)} tone="white">
            {vision && missions.length > 0
              ? <Manifesto vision={vision} missions={missions} />
              : <Reveal><Prose text={raw} className="max-w-3xl text-[#1F2933]/85" /></Reveal>}
          </Chapter>
        );
      })()}

      {bySlug["work"] && (
        <Chapter slug="work" number={num("work")} title={t(bySlug["work"].title)} subtitle={t(bySlug["work"].subtitle)}>
          <WorkCards areas={workAreas} />
        </Chapter>
      )}

      {bySlug["field"] && (
        <Chapter slug="field" number={num("field")} title={t(bySlug["field"].title)} subtitle={t(bySlug["field"].subtitle)} tone="white">
          <div className="space-y-10">
            <Reveal>
              <Prose text={t(bySlug["field"].body)} className="max-w-3xl text-[#1F2933]/85" />
            </Reveal>
            <GalleryFilmstrip title="Activity based learning" images={galleryEdu.filter((m) => m.title === "Activity based learning")} />
            <GalleryFilmstrip title="Education initiative" images={galleryEdu.filter((m) => m.title !== "Activity based learning")} />
            <GalleryFilmstrip title="Home gardens & natural resource management" images={galleryFood.filter((m) => m.title === "Home gardens" || m.title === "Natural resource management" || m.title === "Afforestation")} />
            <GalleryFilmstrip title="Food & nutrition" images={galleryFood.filter((m) => m.title === "Food & nutrition")} />
          </div>
        </Chapter>
      )}

      {bySlug["publications"] && (
        <Chapter slug="publications" number={num("publications")} title={t(bySlug["publications"].title)} subtitle={`${publications.length} published materials across four collections`} tone="white">
          <PublicationsExplorer items={publications} />
        </Chapter>
      )}

      {bySlug["blog"] && (
        <Chapter slug="blog" number={num("blog")} title={t(bySlug["blog"].title)} subtitle={t(bySlug["blog"].subtitle)}>
          <BlogCards posts={blogPosts} />
        </Chapter>
      )}

      {bySlug["media"] && (
        <Chapter slug="media" number={num("media")} title={t(bySlug["media"].title)} subtitle={t(bySlug["media"].subtitle)} tone="white">
          <div className="space-y-14">
            <FilmLibrary documentaries={avDocs} learning={avLearning} />
            {videos.length > 0 && (
              <section aria-label="From our YouTube channel">
                <h3 className="mb-5 font-serif text-lg font-semibold text-[#16324F]">From our YouTube channel</h3>
                <VideoGrid videos={videos} />
              </section>
            )}
          </div>
        </Chapter>
      )}

      {bySlug["social"] && (
        <Chapter slug="social" number={num("social")} title={t(bySlug["social"].title)}>
          <SocialCards posts={socialPosts} />
        </Chapter>
      )}

      {bySlug["reports"] && (
        <Chapter slug="reports" number={num("reports")} title={t(bySlug["reports"].title)} subtitle={t(bySlug["reports"].subtitle)} tone="ink">
          <DocumentShelf items={transparency} />
        </Chapter>
      )}

      {bySlug["partners"] && (
        <Chapter slug="partners" number={num("partners")} title={t(bySlug["partners"].title)} subtitle={t(bySlug["partners"].subtitle)} tone="white">
          <PartnersGrid partners={partners} />
        </Chapter>
      )}

      <PullQuote
        text="Our efforts would be misplaced and meaningless if we are not able to evoke the humanity in all of us to support our simple initiatives."
        attribution="AHEAD Initiatives — Support our Initiatives"
      />

      {bySlug["contact"] && (
        <Chapter slug="contact" number={num("contact")} title={t(bySlug["contact"].title)}>
          <div className="space-y-16">
            {t(bySlug["contact"].body) && (
              <Reveal>
                <Prose text={t(bySlug["contact"].body)} className="mx-auto max-w-3xl text-center text-lg text-[#1F2933]/85" />
              </Reveal>
            )}
            {/* Team first — governance and field team — then how to reach us */}
            <PeopleGrid people={people} portraits={portraits} />
            <div className="border-t border-[#16324F]/10 pt-14">
              <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-[#16324F]">Reach out &amp; collaborate</h3>
              <ContactBlock
                org={(settings.org ?? {}) as Record<string, string>}
                channels={(settings.channels ?? {}) as Record<string, string>}
              />
            </div>
          </div>
        </Chapter>
      )}
    </>
  );
}
