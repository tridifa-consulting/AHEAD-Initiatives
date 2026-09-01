

import {
  useEffect,
  useRef,
} from "react";
import Script from "next/script";
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

export default function XPosts() {
  const postsRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.twttr?.widgets &&
      postsRef.current
    ) {
      window.twttr.widgets.load(
        postsRef.current
      );
    }
  }, []);

  const loadWidgets =
    () => {
      if (
        window.twttr?.widgets &&
        postsRef.current
      ) {
        window.twttr.widgets.load(
          postsRef.current
        );
      }
    };

  return (
    <section
      aria-label="Selected updates from AHEAD Initiatives on X"
      className="relative border-t border-[#064E7A]/10 pt-10 sm:pt-12"
    >
      <div className="mb-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
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
            Selected public updates from AHEAD Initiatives.
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

      <div
        ref={postsRef}
        className="grid items-start gap-5 lg:grid-cols-2"
      >
        <article className="min-w-0 overflow-hidden rounded-[1.35rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-3 shadow-[0_8px_26px_rgba(6,78,122,0.055)] sm:p-4">
          <div className="mx-auto w-full max-w-[550px]">
            <blockquote
              className="twitter-tweet"
              data-theme="light"
              data-dnt="true"
            >
              <p
                lang="en"
                dir="ltr"
              >
                Hi!
                <br />
                <br />
                We are AHEAD Initiatives—working alongside rural communities to build a future rooted in Food Sovereignty, Eco-Livelihoods, and Intergenerational Lifelong Learning.
                <br />
                <br />
                We believe that lasting change begins with people, local knowledge, and collective action.
                <a href="https://x.com/hashtag/AHEADInitiatives?src=hash&ref_src=twsrc%5Etfw">
                  #AHEADInitiatives
                </a>{" "}
                <a href="https://t.co/N624IIkmLQ">
                  pic.twitter.com/N624IIkmLQ
                </a>
              </p>
              &mdash; AHEAD Initiatives (@AHEADInitiates){" "}
              <a href="https://x.com/AHEADInitiates/status/2080200623631524312?ref_src=twsrc%5Etfw">
                July 23, 2026
              </a>
            </blockquote>
          </div>
        </article>

        <article className="min-w-0 overflow-hidden rounded-[1.35rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-3 shadow-[0_8px_26px_rgba(6,78,122,0.055)] sm:p-4">
          <div className="mx-auto w-full max-w-[550px]">
            <blockquote
              className="twitter-tweet"
              data-theme="light"
              data-dnt="true"
            >
              <p
                lang="en"
                dir="ltr"
              >
                AHEAD Initiatives held its Annual General Meeting on 1 August 2026, with individual &amp; institutional members and five Board Members in attendance.
                <br />
                <br />
                The Director&apos;s Report &amp; Statutory Audit Report were presented, discussed and duly passed.
                <a href="https://x.com/hashtag/AHEADInitiatives?src=hash&ref_src=twsrc%5Etfw">
                  #AHEADInitiatives
                </a>{" "}
                <a href="https://x.com/hashtag/AGM2026?src=hash&ref_src=twsrc%5Etfw">
                  #AGM2026
                </a>{" "}
                <a href="https://x.com/hashtag/GoodGovernance?src=hash&ref_src=twsrc%5Etfw">
                  #GoodGovernance
                </a>{" "}
                <a href="https://t.co/k08H310JNH">
                  pic.twitter.com/k08H310JNH
                </a>
              </p>
              &mdash; AHEAD Initiatives (@AHEADInitiates){" "}
              <a href="https://x.com/AHEADInitiates/status/2088243220488868117?ref_src=twsrc%5Etfw">
                August 14, 2026
              </a>
            </blockquote>
          </div>
        </article>
      </div>

      <div className="mt-7 flex justify-center sm:hidden">
        <a
          href={X_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#064E7A]/14 bg-[#FFFDF8] px-5 py-2.5 font-[var(--font-display)] text-[0.68rem] font-bold text-[#064E7A] transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#EAFBFD] hover:text-[#075985]"
        >
          Visit AHEAD on X

          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <Script
        id="x-widgets"
        src="https://platform.x.com/widgets.js"
        strategy="lazyOnload"
        charSet="utf-8"
        onLoad={loadWidgets}
      />
    </section>
  );
}
