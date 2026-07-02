import Reveal from "./Reveal";

/**
 * A chapter of the single-flow page.
 * The numbered plate encodes real sequence — the page is literally
 * a guided reading order — and anchors the scroll-spy navigation.
 */
export default function Chapter({
  slug,
  number,
  title,
  subtitle,
  tone = "paper",
  children,
}: {
  slug: string;
  number: number;
  title: string;
  subtitle?: string;
  tone?: "paper" | "white" | "ink";
  children: React.ReactNode;
}) {
  const bg =
    tone === "ink"
      ? "bg-[#16324F] text-[#FAF7F0]"
      : tone === "white"
        ? "bg-white text-[#1F2933]"
        : "bg-[#FAF7F0] text-[#1F2933]";
  const rule = tone === "ink" ? "border-[#FAF7F0]/20" : "border-[#16324F]/15";
  const sub = tone === "ink" ? "text-[#FAF7F0]/70" : "text-[#1F2933]/65";

  return (
    <section id={slug} className={`${bg} scroll-mt-20 py-16 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className={`mb-10 flex items-baseline gap-4 border-b ${rule} pb-5 sm:mb-14`}>
            <span aria-hidden className="font-serif text-sm tracking-[0.25em] text-[#C65D3B]">
              {String(number).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
              {subtitle && <p className={`mt-1 text-sm sm:text-base ${sub}`}>{subtitle}</p>}
            </div>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
