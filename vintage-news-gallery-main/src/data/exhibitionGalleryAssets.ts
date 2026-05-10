/**
 * Explicit per-slug gallery image lists when files are not matched by EventGallery’s
 * webp glob (e.g. JPG install photos). Keys are exhibition `slug` values.
 */

import backOn1 from "@/assets/backon1.JPG";
import backOn2 from "@/assets/backon2.JPG";
import backOn3 from "@/assets/backon3.JPG";

const EXHIBITION_GALLERY_BY_SLUG: Record<string, readonly string[]> = {
  "back-on": [backOn1, backOn2, backOn3],
};

/** Bundled gallery URLs for this slug, or null to use glob discovery in EventGallery */
export function explicitGalleryImagesForSlug(slug: string): string[] | null {
  const list = EXHIBITION_GALLERY_BY_SLUG[slug];
  return list ? [...list] : null;
}
