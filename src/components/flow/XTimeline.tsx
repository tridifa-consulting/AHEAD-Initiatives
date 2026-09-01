"use client";

import Script from "next/script";

export default function XTimeline() {
  return (
    <section
      aria-label="Latest updates from AHEAD Initiatives on X"
      className="relative border-t border-[#064E7A]/10 pt-10 sm:pt-12"
    >
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <span className="h-px w-8 bg-[#064E7A]/45" />

          <span className="font-[var(--font-display)] text-[0.63rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/70">
            X
          </span>
        </div>

        <h3 className="font-serif text-[1.55rem] font-bold tracking-[-0.025em] text-[#064E7A] sm:text-[1.8rem]">
          Latest on X
        </h3>
      </div>

      <div className="overflow-hidden rounded-[1.4rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-4 shadow-[0_8px_28px_rgba(6,78,122,0.055)]">
        <a
          className="twitter-timeline"
          href="https://x.com/AHEADInitiates?ref_src=twsrc%5Etfw"
        >
          Posts by AHEADInitiates
        </a>
      </div>

      <Script
        src="https://platform.x.com/widgets.js"
        strategy="lazyOnload"
        charSet="utf-8"
      />
    </section>
  );
}
