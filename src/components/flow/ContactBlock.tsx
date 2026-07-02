import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

/** Contact details and support pathways, from verified org settings. */
export default function ContactBlock({
  org,
  channels,
}: {
  org: Record<string, string>;
  channels: Record<string, string>;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border border-[#16324F]/10 bg-white p-6 sm:p-8">
        <h3 className="font-serif text-lg font-semibold text-[#16324F]">Registered office</h3>
        <ul className="mt-4 space-y-3 text-sm text-[#1F2933]/80">
          <li className="flex items-start gap-2.5">
            <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#C65D3B]" />
            {org.address}
          </li>
          <li className="flex items-center gap-2.5">
            <Phone aria-hidden className="h-4 w-4 shrink-0 text-[#C65D3B]" />
            <a href={`tel:${(org.phone ?? "").replace(/[^+\d]/g, "")}`} className="hover:underline">{org.phone}</a>
          </li>
          <li className="flex items-center gap-2.5">
            <Mail aria-hidden className="h-4 w-4 shrink-0 text-[#C65D3B]" />
            <a href={`mailto:${org.email}`} className="hover:underline">{org.email}</a>
          </li>
        </ul>
        <p className="mt-6 border-t border-[#16324F]/10 pt-4 text-xs leading-relaxed text-[#1F2933]/55">
          {org.legal}. CIN {org.cin} · Licence {org.licence} · FCRA {org.fcra}.
        </p>
      </div>
      <div className="rounded-xl border border-[#16324F]/10 bg-white p-6 sm:p-8">
        <h3 className="font-serif text-lg font-semibold text-[#16324F]">Elsewhere</h3>
        <ul className="mt-4 space-y-3 text-sm">
          {channels.nabodisha && (
            <li>
              <a href={channels.nabodisha} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[#2D6A4F] hover:underline">
                Nabodisha — the platform for rural teachers <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          )}
          {channels.linkedin && (
            <li>
              <a href={channels.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[#2D6A4F] hover:underline">
                AHEAD Initiatives on LinkedIn <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          )}
          {channels.youtube_handle && (
            <li>
              <a href={`https://www.youtube.com/${channels.youtube_handle}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[#2D6A4F] hover:underline">
                AHEAD on YouTube ({channels.youtube_handle}) <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          )}
        </ul>
        <p className="mt-6 border-t border-[#16324F]/10 pt-4 text-sm leading-relaxed text-[#1F2933]/75">
          To support AHEAD&apos;s work or explore an institutional partnership, write to{" "}
          <a href={`mailto:${org.email}`} className="text-[#C65D3B] hover:underline">{org.email}</a>.
        </p>
      </div>
    </div>
  );
}
