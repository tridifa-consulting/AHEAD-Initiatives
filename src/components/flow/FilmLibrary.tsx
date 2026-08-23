"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const LEARNING_BATCH = 8;

/* ─────────────────────────────────────────────────────────────
   VIDEO PREVIEW HELPERS
───────────────────────────────────────────────────────────── */

function seekToMiddle(video: HTMLVideoElement) {
  if (
    !Number.isFinite(video.duration) ||
    video.duration <= 0
  ) {
    return;
  }

  const middle = Math.max(
    0.5,
    Math.min(
      video.duration - 0.25,
      video.duration * 0.5
    )
  );

  try {
    video.currentTime = middle;
  } catch {
    /* Browser may not allow seeking until metadata is ready. */
  }
}

function preparePreview(video: HTMLVideoElement) {
  video.muted = true;
  video.pause();
  seekToMiddle(video);
}

/* ─────────────────────────────────────────────────────────────
   FULL FILM PLAYER
───────────────────────────────────────────────────────────── */

function FilmPlayer({
  film,
  onClose,
}: {
  film: MediaRow;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow =
        previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={film.title ?? "Film"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031F2E]/96 p-4 backdrop-blur-sm"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-black shadow-[0_35px_100px_rgba(0,0,0,0.55)]"
        initial={
          reduced
            ? {}
            : {
                scale: 0.96,
                opacity: 0,
              }
        }
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={
          reduced
            ? {}
            : {
                scale: 0.96,
                opacity: 0,
              }
        }
        transition={{
          duration: 0.3,
          ease,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <video
          src={film.url ?? undefined}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full bg-black"
        >
          <track kind="captions" />
        </video>

        <div className="border-t border-white/10 bg-[#071D2A] px-5 py-4 sm:px-7 sm:py-5">
          <h4 className="font-serif text-xl font-bold text-[#FFF8EA]">
            {film.title}
          </h4>

          {t(film.caption) && (
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-white/65">
              {t(film.caption)}
            </p>
          )}
        </div>
      </motion.div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close film"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-all duration-200 hover:border-[#67E8F9]/55 hover:bg-[#064E7A]/75 hover:text-[#B9F6FF]"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED DOCUMENTARY
───────────────────────────────────────────────────────────── */

function FeaturedDocumentary({
  film,
  index,
  total,
  onPlay,
}: {
  film: MediaRow;
  index: number;
  total: number;
  onPlay: () => void;
}) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const reduced =
    useReducedMotion();

  const startPreview = () => {
    if (reduced) return;

    const video =
      videoRef.current;

    if (!video) return;

    video.muted = true;

    video.play().catch(() => {});
  };

  const stopPreview = () => {
    const video =
      videoRef.current;

    if (!video) return;

    video.pause();
    seekToMiddle(video);
  };

  return (
    <motion.div
      key={film.id}
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
      transition={{
        duration: 0.45,
        ease,
      }}
      className="overflow-hidden rounded-[1.8rem] border border-[#064E7A]/12 bg-[#071D2A] shadow-[0_24px_70px_rgba(6,78,122,0.15)]"
    >
      <div
        className="group relative aspect-[16/8.4] min-h-[290px] overflow-hidden bg-[#031F2E]"
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
      >
        <video
          ref={videoRef}
          src={film.url ?? ""}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) =>
            preparePreview(
              event.currentTarget
            )
          }
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Bottom readability only — the film itself remains visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#031F2E]/86 via-[#031F2E]/24 to-transparent"
        />

        {/* Archive label */}
        <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-black/28 px-3 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67E8F9]" />

            <span className="font-[var(--font-display)] text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-white/82">
              AHEAD Film Archive
            </span>
          </div>
        </div>

        {/* Sequence */}
        <div className="absolute right-5 top-5 rounded-full border border-white/14 bg-black/25 px-3 py-2 font-[var(--font-display)] text-[0.62rem] font-extrabold tracking-[0.14em] text-white/78 backdrop-blur-sm sm:right-7 sm:top-7">
          {String(index + 1).padStart(
            2,
            "0"
          )}

          <span className="mx-2 text-white/30">
            /
          </span>

          {String(total).padStart(
            2,
            "0"
          )}
        </div>

        {/* Main play */}
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play: ${film.title}`}
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#FFF8EA]/94 text-[#064E7A] shadow-[0_16px_42px_rgba(0,0,0,0.28)] transition-all duration-300 hover:scale-110 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67E8F9] sm:h-24 sm:w-24"
        >
          <Play className="ml-1 h-8 w-8 fill-current sm:h-9 sm:w-9" />
        </button>

        {/* Film title */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
          <div className="max-w-3xl">
            <div className="mb-2 font-[var(--font-display)] text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-[#67E8F9]">
              Documentary
            </div>

            <h4 className="font-serif text-2xl font-bold leading-tight tracking-[-0.025em] text-[#FFF8EA] sm:text-3xl">
              {film.title}
            </h4>

            {t(film.caption) && (
              <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/72 sm:text-base">
                {t(film.caption)}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DOCUMENTARY THUMBNAIL
───────────────────────────────────────────────────────────── */

function DocumentaryThumbnail({
  film,
  index,
  active,
  onSelect,
}: {
  film: MediaRow;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const reduced =
    useReducedMotion();

  const startPreview = () => {
    if (reduced) return;

    const video =
      videoRef.current;

    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  };

  const stopPreview = () => {
    const video =
      videoRef.current;

    if (!video) return;

    video.pause();
    seekToMiddle(video);
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      aria-pressed={active}
      className={`group relative w-[230px] shrink-0 overflow-hidden rounded-[1.15rem] border text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0891B2] ${
        active
          ? "border-[#0891B2]/50 bg-[#064E7A] shadow-[0_14px_32px_rgba(6,78,122,0.18)]"
          : "border-[#064E7A]/10 bg-[#FFFDF8] hover:-translate-y-1 hover:border-[#0891B2]/30 hover:shadow-[0_12px_28px_rgba(6,78,122,0.10)]"
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-[#031F2E]">
        <video
          ref={videoRef}
          src={film.url ?? ""}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) =>
            preparePreview(
              event.currentTarget
            )
          }
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent"
        />

        <div className="absolute bottom-2.5 left-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#FFF8EA]/94 text-[#064E7A] shadow-sm">
          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
        </div>

        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/35 px-2 py-1 font-[var(--font-display)] text-[0.55rem] font-extrabold tracking-[0.1em] text-white/82 backdrop-blur-sm">
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </span>

        {active && (
          <motion.div
            layoutId="documentary-active"
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#67E8F9] via-[#A5F3FC] to-[#D8A441]"
          />
        )}
      </div>

      <div className="p-3.5">
        <div
          className={`line-clamp-2 font-serif text-sm font-bold leading-[1.35] ${
            active
              ? "text-[#FFF8EA]"
              : "text-[#064E7A]"
          }`}
        >
          {film.title}
        </div>

        {t(film.caption) && (
          <div
            className={`mt-1 line-clamp-1 text-[0.64rem] font-medium ${
              active
                ? "text-white/55"
                : "text-[#526B75]/58"
            }`}
          >
            {t(film.caption)}
          </div>
        )}
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   DOCUMENTARY SELECTOR RAIL
───────────────────────────────────────────────────────────── */

function DocumentaryRail({
  films,
  selectedIndex,
  onSelect,
}: {
  films: MediaRow[];
  selectedIndex: number;
  onSelect: (
    index: number
  ) => void;
}) {
  const railRef =
    useRef<HTMLDivElement>(null);

  const reduced =
    useReducedMotion();

  const nudge = (
    direction: 1 | -1
  ) => {
    railRef.current?.scrollBy({
      left: direction * 320,
      behavior:
        reduced
          ? "auto"
          : "smooth",
    });
  };

  return (
    <div className="relative mt-5">
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous documentaries"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] text-[#064E7A]/70 transition-colors hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#064E7A]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next documentaries"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] text-[#064E7A]/70 transition-colors hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#064E7A]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={railRef}
        className="scrollbar-none overflow-x-auto pb-3"
      >
        <div className="flex w-max gap-3">
          {films.map(
            (film, index) => (
              <DocumentaryThumbnail
                key={film.id}
                film={film}
                index={index}
                active={
                  index ===
                  selectedIndex
                }
                onSelect={() =>
                  onSelect(index)
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LEARNING FILM VISUAL CARD
───────────────────────────────────────────────────────────── */

function LearningFilmCard({
  film,
  index,
  onPlay,
}: {
  film: MediaRow;
  index: number;
  onPlay: () => void;
}) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const reduced =
    useReducedMotion();

  const startPreview = () => {
    if (reduced) return;

    const video =
      videoRef.current;

    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  };

  const stopPreview = () => {
    const video =
      videoRef.current;

    if (!video) return;

    video.pause();
    seekToMiddle(video);
  };

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
      exit={
        reduced
          ? {}
          : {
              opacity: 0,
            }
      }
      transition={{
        duration: 0.35,
        delay:
          Math.min(
            index,
            8
          ) * 0.035,
        ease,
      }}
      className="h-full"
    >
      <button
        type="button"
        onClick={onPlay}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        aria-label={`Play: ${film.title}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-[1.3rem] border border-[#064E7A]/10 bg-[#FFFDF8] text-left shadow-[0_8px_24px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/30 hover:shadow-[0_18px_42px_rgba(6,78,122,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0891B2]"
      >
        {/* Actual film thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#031F2E]">
          <video
            ref={videoRef}
            src={film.url ?? ""}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={(event) =>
              preparePreview(
                event.currentTarget
              )
            }
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />

          {/* Minimal contrast */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#031F2E]/55 to-transparent"
          />

          {/* Sequence number */}
          <div className="absolute left-3 top-3 rounded-full border border-white/18 bg-black/28 px-2.5 py-1 font-[var(--font-display)] text-[0.55rem] font-extrabold tracking-[0.12em] text-white/82 backdrop-blur-sm">
            {String(
              index + 1
            ).padStart(2, "0")}
          </div>

          {/* Play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#FFF8EA]/94 text-[#064E7A] shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </div>

          {/* Hover hint */}
          <div className="absolute bottom-3 right-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="rounded-full border border-white/18 bg-black/32 px-2.5 py-1 font-[var(--font-display)] text-[0.54rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              Previewing
            </span>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 font-[var(--font-display)] text-[0.56rem] font-extrabold uppercase tracking-[0.17em] text-[#0891B2]/65">
            Learning Film
          </div>

          <h4 className="font-serif text-[0.98rem] font-bold leading-[1.35] tracking-[-0.018em] text-[#064E7A]">
            {film.title}
          </h4>

          {t(film.caption) && (
            <p className="mt-2 line-clamp-2 text-[0.68rem] font-medium leading-[1.55] text-[#526B75]/65">
              {t(film.caption)}
            </p>
          )}

          <div className="mt-auto pt-4">
            <div className="h-px w-full bg-[#064E7A]/8" />

            <span className="mt-3 inline-flex items-center gap-1.5 font-[var(--font-display)] text-[0.61rem] font-extrabold uppercase tracking-[0.12em] text-[#B96543] transition-colors group-hover:text-[#075985]">
              Watch film

              <Play className="h-3 w-3 fill-current" />
            </span>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN FILM LIBRARY
───────────────────────────────────────────────────────────── */

export default function FilmLibrary({
  documentaries,
  learning,
}: {
  documentaries: MediaRow[];
  learning: MediaRow[];
}) {
  const [
    selectedDocumentary,
    setSelectedDocumentary,
  ] = useState(0);

  const [
    visibleLearning,
    setVisibleLearning,
  ] = useState(
    LEARNING_BATCH
  );

  const [
    playing,
    setPlaying,
  ] =
    useState<MediaRow | null>(
      null
    );

  const featured =
    documentaries[
      selectedDocumentary
    ];

  const shownLearning =
    learning.slice(
      0,
      visibleLearning
    );

  const hasMoreLearning =
    visibleLearning <
    learning.length;

  const canCollapseLearning =
    visibleLearning >
    LEARNING_BATCH;

  const showMore = () => {
    setVisibleLearning(
      (current) =>
        Math.min(
          current +
            LEARNING_BATCH,
          learning.length
        )
    );
  };

  const collapseLearning = () => {
    setVisibleLearning(
      LEARNING_BATCH
    );
  };

  return (
    <div className="space-y-20">
      {/* ───────────────────────────────────────
          DOCUMENTARY COLLECTION
      ──────────────────────────────────────── */}
      {documentaries.length >
        0 && (
        <section
          aria-label="Documentaries"
          className="relative"
        >
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-8 bg-[#0891B2]/55" />

                <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
                  Documentary Collection
                </span>
              </div>

              <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
                Stories of Hope and Initiative
              </h3>

              <p className="mt-2 text-sm font-medium text-[#526B75]/65">
                Field documentaries produced by AHEAD&apos;s studio — hover to preview, click to watch.
              </p>
            </div>

            <div className="font-[var(--font-display)] text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#0891B2]/60">
              {documentaries.length} films
            </div>
          </div>

          {featured && (
            <FeaturedDocumentary
              film={featured}
              index={
                selectedDocumentary
              }
              total={
                documentaries.length
              }
              onPlay={() =>
                setPlaying(
                  featured
                )
              }
            />
          )}

          {documentaries.length >
            1 && (
            <DocumentaryRail
              films={
                documentaries
              }
              selectedIndex={
                selectedDocumentary
              }
              onSelect={
                setSelectedDocumentary
              }
            />
          )}
        </section>
      )}

      {/* ───────────────────────────────────────
          LEARNING FOR ALL
      ──────────────────────────────────────── */}
      {learning.length > 0 && (
        <section
          aria-label="Learning for All film library"
          className="relative"
        >
          {/* Header */}
          <div className="mb-7 grid gap-4 border-b border-[#064E7A]/10 pb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-8 bg-[#B96543]/55" />

                <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
                  Learning Film Archive
                </span>
              </div>

              <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
                Learning for All — {learning.length} Films
              </h3>

              <p className="mt-2 text-sm font-medium text-[#526B75]/65">
                Bengali films, translations and animations for rural schools.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="font-[var(--font-display)] text-2xl font-extrabold tracking-[-0.035em] text-[#064E7A]">
                {learning.length}
              </div>

              <div className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#526B75]/55">
                films in archive
              </div>
            </div>
          </div>

          {/* Visual learning archive */}
          <motion.ul
            layout
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence initial={false}>
              {shownLearning.map(
                (
                  film,
                  index
                ) => (
                  <LearningFilmCard
                    key={
                      film.id
                    }
                    film={
                      film
                    }
                    index={
                      index
                    }
                    onPlay={() =>
                      setPlaying(
                        film
                      )
                    }
                  />
                )
              )}
            </AnimatePresence>
          </motion.ul>

          {/* Progressive disclosure */}
          {(hasMoreLearning ||
            canCollapseLearning) && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#064E7A]/8 pt-5">
              <div className="text-[0.68rem] font-medium text-[#526B75]/58">
                Showing{" "}
                {Math.min(
                  visibleLearning,
                  learning.length
                )}{" "}
                of {learning.length} films
              </div>

              <div className="flex items-center gap-3">
                {canCollapseLearning && (
                  <button
                    type="button"
                    onClick={
                      collapseLearning
                    }
                    className="font-[var(--font-display)] text-[0.68rem] font-bold text-[#526B75]/65 transition-colors hover:text-[#064E7A]"
                  >
                    Show fewer
                  </button>
                )}

                {hasMoreLearning && (
                  <button
                    type="button"
                    onClick={
                      showMore
                    }
                    className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-4 py-2 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/32 hover:bg-[#EAFBFD]"
                  >
                    Show more films

                    <span className="text-[#526B75]/50">
                      {Math.min(
                        LEARNING_BATCH,
                        learning.length -
                          visibleLearning
                      )}
                    </span>

                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ───────────────────────────────────────
          FULL PLAYER
      ──────────────────────────────────────── */}
      <AnimatePresence>
        {playing && (
          <FilmPlayer
            film={playing}
            onClose={() =>
              setPlaying(null)
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
