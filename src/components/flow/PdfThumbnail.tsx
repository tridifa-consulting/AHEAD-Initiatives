"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FileText,
  LoaderCircle,
} from "lucide-react";

type RenderState =
  | "idle"
  | "loading"
  | "ready"
  | "error";

/**
 * Renders page 1 of a PDF to a canvas using PDF.js.
 *
 * This is used on touch/mobile devices where browsers often replace
 * an iframe PDF preview with their own "Open PDF" interface.
 *
 * The original PDF URL is never changed for the publication link itself.
 * It is proxied only for canvas rendering so PDF.js is not blocked by CORS.
 */
export default function PdfThumbnail({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const hostRef =
    useRef<HTMLDivElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const [nearViewport, setNearViewport] =
    useState(false);

  const [width, setWidth] =
    useState(0);

  const [state, setState] =
    useState<RenderState>("idle");

  /* Render only when the card is near the viewport. */
  useEffect(() => {
    const host = hostRef.current;

    if (!host) return;

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      setNearViewport(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            setNearViewport(
              true
            );
            observer.disconnect();
          }
        },
        {
          rootMargin:
            "240px 0px",
        }
      );

    observer.observe(host);

    return () =>
      observer.disconnect();
  }, []);

  /* Track the actual card width so page 1 is rendered at the right size. */
  useEffect(() => {
    const host = hostRef.current;

    if (!host) return;

    const updateWidth = () => {
      const next =
        Math.round(
          host.getBoundingClientRect()
            .width
        );

      if (next > 0) {
        setWidth(
          (current) =>
            Math.abs(
              current - next
            ) > 8
              ? next
              : current
        );
      }
    };

    updateWidth();

    if (
      typeof ResizeObserver ===
      "undefined"
    ) {
      window.addEventListener(
        "resize",
        updateWidth,
        {
          passive: true,
        }
      );

      return () =>
        window.removeEventListener(
          "resize",
          updateWidth
        );
    }

    const observer =
      new ResizeObserver(
        updateWidth
      );

    observer.observe(host);

    return () =>
      observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !nearViewport ||
      width <= 0
    ) {
      return;
    }

    let cancelled = false;

    let loadingTask:
      | {
          destroy: () =>
            Promise<void>;
        }
      | undefined;

    let renderTask:
      | {
          cancel: () => void;
          promise: Promise<void>;
        }
      | undefined;

    const renderPageOne =
      async () => {
        setState("loading");

        try {
          /*
           * Dynamic import keeps PDF.js out of the initial page bundle.
           */
          const pdfjs =
            await import(
              "pdfjs-dist"
            );

          /*
           * Next 16.2.x/Turbopack has had worker URL regressions.
           * Using PDF.js' published worker through jsDelivr avoids
           * bundling a new Worker(new URL(...)) into this application.
           *
           * If we later want a fully self-hosted worker, we can copy
           * pdf.worker.min.mjs into /public and point workerSrc there.
           */
          if (
            !pdfjs
              .GlobalWorkerOptions
              .workerSrc
          ) {
            pdfjs.GlobalWorkerOptions.workerSrc =
              `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
          }

          if (cancelled) {
            return;
          }

          /*
           * The existing AHEAD PDFs are on the legacy website.
           * An iframe can display a cross-origin PDF, but PDF.js must
           * fetch the bytes and therefore requires CORS.
           *
           * The restricted same-origin route solves that safely.
           */
          const source =
            `/api/pdf-proxy?url=${encodeURIComponent(
              href
            )}`;

          loadingTask =
            pdfjs.getDocument({
              url: source,

              /*
               * We only need page 1. Avoid eagerly fetching the rest of
               * the document when range requests are available.
               */
              disableAutoFetch:
                true,
              disableStream: true,
              rangeChunkSize:
                65536,
            });

          const pdf =
            await loadingTask.promise;

          if (cancelled) {
            await loadingTask.destroy();
            return;
          }

          const page =
            await pdf.getPage(1);

          if (cancelled) {
            await loadingTask.destroy();
            return;
          }

          const canvas =
            canvasRef.current;

          if (!canvas) {
            await loadingTask.destroy();
            return;
          }

          const baseViewport =
            page.getViewport({
              scale: 1,
            });

          /*
           * Fit page 1 to the publication-card width.
           */
          const cssScale =
            width /
            baseViewport.width;

          const viewport =
            page.getViewport({
              scale: cssScale,
            });

          /*
           * Cap DPR to control memory usage on very dense mobile displays.
           */
          const outputScale =
            Math.min(
              window.devicePixelRatio ||
                1,
              1.6
            );

          canvas.width =
            Math.max(
              1,
              Math.floor(
                viewport.width *
                  outputScale
              )
            );

          canvas.height =
            Math.max(
              1,
              Math.floor(
                viewport.height *
                  outputScale
              )
            );

          canvas.style.width =
            `${Math.floor(
              viewport.width
            )}px`;

          canvas.style.height =
            `${Math.floor(
              viewport.height
            )}px`;

          const context =
            canvas.getContext(
              "2d",
              {
                alpha: false,
              }
            );

          if (!context) {
            throw new Error(
              "Canvas 2D context unavailable"
            );
          }

          renderTask =
            page.render({
              canvasContext:
                context,
              viewport,
              transform:
                outputScale !==
                1
                  ? [
                      outputScale,
                      0,
                      0,
                      outputScale,
                      0,
                      0,
                    ]
                  : undefined,
              background:
                "#FFFFFF",
            });

          await renderTask.promise;

          if (!cancelled) {
            setState("ready");
          }

          page.cleanup();
          await loadingTask.destroy();
        } catch (error) {
          if (cancelled) return;

          /*
           * RenderingCancelledException is expected when a card disappears
           * while PDF.js is painting. Everything else becomes a graceful
           * lightweight fallback rather than breaking the publication card.
           */
          const name =
            error instanceof Error
              ? error.name
              : "";

          if (
            name !==
            "RenderingCancelledException"
          ) {
            console.warn(
              `Unable to render PDF thumbnail for "${title}".`,
              error
            );

            setState("error");
          }
        }
      };

    void renderPageOne();

    return () => {
      cancelled = true;

      try {
        renderTask?.cancel();
      } catch {
        // Rendering may already be complete.
      }

      if (loadingTask) {
        void loadingTask.destroy();
      }
    };
  }, [
    href,
    nearViewport,
    title,
    width,
  ]);

  return (
    <div
      ref={hostRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#EEE6D8]"
    >
      {/* Loading / not-yet-rendered state */}
      {state !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#F4EEE3]">
          {state ===
          "loading" ? (
            <LoaderCircle
              aria-hidden
              className="h-7 w-7 animate-spin text-[#0891B2]/55"
            />
          ) : (
            <FileText
              aria-hidden
              className="h-8 w-8 text-[#064E7A]/20"
            />
          )}

          <span className="font-[var(--font-display)] text-[0.56rem] font-extrabold uppercase tracking-[0.16em] text-[#526B75]/46">
            {state === "error"
              ? "PDF preview"
              : "Loading preview"}
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        aria-label={`First page preview of ${title}`}
        className={`block max-h-full max-w-full bg-white transition-opacity duration-300 ${
          state === "ready"
            ? "opacity-100"
            : "opacity-0"
        }`}
      />
    </div>
  );
}
