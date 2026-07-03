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
        <Chapter slug="story" number={num("story")} title={t(bySlug["story"].title)} subtitle={t(bySlug["story"].subtitle)}>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <Reveal>
              <Prose text={t(bySlug["story"].body)} className="max-w-3xl text-[#1F2933]/85" />
            </Reveal>
            <Reveal delay={100}>
              <dl className="h-fit rounded-2xl border border-[#16324F]/10 bg-white p-6 text-sm shadow-sm">
                <div className="mb-4 border-b border-dashed border-[#16324F]/15 pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C65D3B]">
                  From the record
                </div>
                <div className="pb-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">Registered</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.registered}</dd>
                </div>
                <div className="border-t border-[#16324F]/10 py-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">CIN</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.cin}</dd>
                </div>
                <div className="border-t border-[#16324F]/10 py-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">MCA licence</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.licence}</dd>
                </div>
                <div className="border-t border-[#16324F]/10 pt-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">FCRA registration</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.fcra}</dd>
                </div>
              </dl>
            </Reveal>
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
          <div className="space-y-14">
            {t(bySlug["contact"].body) && (
              <Reveal>
                <Prose text={t(bySlug["contact"].body)} className="max-w-3xl text-[#1F2933]/85" />
              </Reveal>
            )}
            <ContactBlock
              org={(settings.org ?? {}) as Record<string, string>}
              channels={(settings.channels ?? {}) as Record<string, string>}
            />
            <PeopleGrid people={people} portraits={portraits} />
          </div>
        </Chapter>
      )}
    </>
  );
}
