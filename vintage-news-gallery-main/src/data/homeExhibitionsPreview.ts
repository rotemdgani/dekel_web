/**
 * Curated exhibition slugs for the homepage preview (order = display order).
 * Not the full list — see `exhibitionsDetail.ts` for all records.
 */

import type { ExhibitionDetail } from "./exhibitionsDetail";
import { EXHIBITIONS } from "./exhibitionsDetail";

export const HOME_EXHIBITION_PREVIEW_SLUGS = [
  "back-on",
  "art-gathering",
  "super-sparta",
  "peace-and-goodbye",
] as const;

export function homeExhibitionPreviewItems(): ExhibitionDetail[] {
  const bySlug = new Map(EXHIBITIONS.map((e) => [e.slug, e]));
  return HOME_EXHIBITION_PREVIEW_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (e): e is ExhibitionDetail => e != null,
  );
}

/** Short line for cards; breaks at word when possible */
export function previewExhibitionDescription(
  description: string,
  maxLen = 190,
): string {
  const t = description.trim();
  if (t.length <= maxLen) return t;
  const cut = t.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > 60 ? lastSpace : maxLen;
  return `${cut.slice(0, end).trim()}…`;
}
