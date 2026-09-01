"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
} from "lucide-react";

const X_PROFILE_URL =
  "https://x.com/AHEADInitiates";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (
          element?: HTMLElement
        ) => void;
      };
    };
  }
}

function loadXWidgets() {
  return new Promise<void>(
    (resolve, reject) => {
      if (
        window.twttr?.widgets
      ) {
        resolve();
        return;
      }

      const existing =
        document.querySelector<HTMLScriptElement>(
          'script[src="https://platform.x.com/widgets.js"]'
        );

      if (existing) {
        existing.addEventListener(
          "load",
          () => resolve(),
          { once: true }
        );
        existing.addEventListener(
          "error",
          () =>
            reject(
              new Error(
                "Unable to load X widgets."
              )
            ),
          { once: true }
        );
        return;
      }

      const script =
        document.createElement(
          "script"
        );

      script.src =
        "https://platform.x.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";

      script.onload = () =>
        resolve();

      script.onerror = () =>
        reject(
          new Error(
            "Unable to load X widgets."
          )
        );

      document.body.appendChild(
        script
      );
    }
  );
}

export default function XTimeline() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const embedRef =
    useRef<HTMLDivElement>(null);

  const [
    shouldLoad,
    setShouldLoad,
  ] = useState(false);

  const [
    failed,
    setFailed,
  ] = useState(false);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      setShouldLoad(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries.some(
              (entry) =>
                entry.isIntersecting
            )
          ) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          rootMargin:
            "500px 0px",
          threshold: 0,
        }
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    let cancelled = false;

    loadXWidgets()
      .then(() => {
        if (cancelled) {
          return;
        }

        const container =
          embedRef.current;

        if (
          container &&
          window.twttr?.widgets
        ) {
          window.twttr.widgets.load(
            container
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  return (
    <section
      ref={sectionRef}
      aria-label="Latest updates from AHEAD Initiatives on X"
      className="relative border-t border-[#064E7A]/10 pt-10 sm:pt-12"
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-[#064E7A]/45" />

            <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
              X
            </span>
          </div>

          <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
            Latest on X
          </h3>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#526B75]/65">
            Recent public updates from AHEAD Initiatives.
          </p>
        </div>

        <a
          href={X_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-4 py-2.5 font-[var(--font-display)] text-[0.66rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2]"
        >
          Visit AHEAD on X

          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="overflow-hidden rounded-[1.4rem] border border-[#064E7A]/10 bg-[#FFFDF8] shadow-[0_8px_28px_rgba(6,78,122,0.055)]">
        {!shouldLoad && (
          <div className="flex min-h-[360px] items-center justify-center px-6 py-12">
            <div className="text-center">
              <div className="mx-auto mb-3 h-2 w-2 rounded-full bg-[#0891B2]/55" />

              <p className="text-sm font-medium text-[#526B75]/60">
                X updates will load as you approach this section.
              </p>
            </div>
          </div>
        )}

        {failed ? (
          <div className="flex min-h-[260px] items-center justify-center px-6 py-12">
            <div className="max-w-md text-center">
              <p className="font-serif text-lg font-bold text-[#064E7A]">
                Visit AHEAD on X
              </p>

              <p className="mt-2 text-sm font-medium leading-relaxed text-[#526B75]/65">
                The embedded timeline is temporarily unavailable.
              </p>

              <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#064E7A]/14 bg-white px-4 py-2.5 font-[var(--font-display)] text-[0.66rem] font-bold text-[#064E7A] transition-colors hover:border-[#0891B2]/35 hover:bg-[#EAFBFD]"
              >
                Open X profile

                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ) : (
          shouldLoad && (
            <div
              ref={embedRef}
              className="mx-auto max-w-[900px] px-2 py-2 sm:px-4 sm:py-4"
            >
              <a
                className="twitter-timeline"
                data-height="560"
                data-theme="light"
                data-dnt="true"
                data-chrome="noheader nofooter noborders transparent"
                href={X_PROFILE_URL}
              >
                Posts by AHEADInitiates
              </a>
            </div>
          )
        )}
      </div>
    </section>
  );
}
