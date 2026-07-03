import Reveal from "./Reveal";

/** A documentary interstitial: one verified sentence, given the whole frame. */
export default function PullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <figure className="bg-[#16324F] px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-4xl">
        <blockquote className="border-l-2 border-[#E9B44C] pl-6 sm:pl-10">
          <p className="font-serif text-2xl font-medium leading-snug text-[#FAF7F0] sm:text-3xl lg:text-[2.5rem] lg:leading-[1.25]">
            {text}
          </p>
        </blockquote>
        {attribution && (
          <figcaption className="mt-6 pl-6 text-sm uppercase tracking-[0.2em] text-[#FAF7F0]/60 sm:pl-10">
            {attribution}
          </figcaption>
        )}
      </Reveal>
    </figure>
  );
}
