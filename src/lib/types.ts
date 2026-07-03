/** Bilingual text: { en: "...", bn: "..." } */
export type I18nText = { en?: string; bn?: string };

export type SiteSection = {
  id: string;
  slug: string;
  parent_slug: string | null;
  title: I18nText;
  subtitle: I18nText;
  body: I18nText;
  media: unknown[];
  extra: Record<string, unknown>;
  sort_order: number;
  status: "draft" | "published";
  visible: boolean;
};

export type DocumentRow = {
  id: string;
  title: string;
  description: string | null;
  category:
    | "annual_report" | "financial" | "fcra_quarterly" | "fcra_annual"
    | "mca_filing" | "it_return" | "policy" | "publication"
    | "newsletter" | "other";
  subcategory: string | null;
  author: string | null;
  year: string | null;
  quarter: string | null;
  language: "en" | "bn" | "multi";
  source: "local" | "drive" | "storage" | "external";
  file_path: string | null;
  external_url: string | null;
  drive_file_id: string | null;
  drive_url: string | null;
  thumbnail_url: string | null;
  file_available: boolean;
  status: "draft" | "published";
  visible: boolean;
  sort_order: number;
};

export type PersonRow = {
  id: string;
  name: string;
  role: string | null;
  group_name: "founder" | "board" | "project_directors" | "field_team" | "advisors";
  bio: I18nText;
  email: string | null; // masked by people_public unless opted in
  phone: string | null;
  photo_media_id: string | null;
  sort_order: number;
};

export type MediaRow = {
  id: string;
  title: string | null;
  alt_text: I18nText;
  caption: I18nText;
  collection: string | null;
  file_path: string | null;
  url: string | null;
  sort_order: number;
};

export type VideoRow = {
  id: string;
  youtube_video_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  published_at: string | null;
  featured: boolean;
};

export type SocialPostRow = {
  id: string;
  platform: string;
  title: string;
  description: string | null;
  link_url: string | null;
  posted_at: string | null;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: I18nText;
  excerpt: I18nText;
  published_at: string | null;
};

export type NoticeRow = {
  id: string;
  message: I18nText;
  link_url: string | null;
  severity: "info" | "warning" | "urgent";
};

/** Resolve bilingual text with graceful fallback. */
export function t(v: I18nText | null | undefined, lang: "en" | "bn" = "en"): string {
  if (!v) return "";
  return v[lang] ?? v.en ?? v.bn ?? "";
}

/** Public href for a document row, or null when no file is attached. */
export function documentHref(d: Pick<DocumentRow, "source" | "file_path" | "external_url" | "drive_url" | "file_available">): string | null {
  if (!d.file_available) return null;
  if (d.source === "external") return d.external_url;
  if (d.source === "drive") return d.drive_url ?? d.external_url;
  return d.file_path; // local + storage paths are served by the site
}

export type PartnerRow = {
  id: string;
  name: string;
  kind: string;
  description: I18nText;
  url: string | null;
  sort_order: number;
};
