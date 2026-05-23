/**
 * Explicit per-slug gallery media lists when files are not matched by EventGallery’s
 * webp glob (e.g. JPG install photos). Keys are exhibition `slug` values.
 *
 * Global Art Gallery solo: video first, then `global-art-exhibition-1.webp` … `5.webp`
 */

import backOn1 from "@/assets/backon1.JPG";
import backOn2 from "@/assets/backon2.JPG";
import backOn3 from "@/assets/backon3.JPG";
import globalArtExhibitionVideo from "@/assets/global art exhibition video.MOV";
import globalArtExhibition1 from "@/assets/global-art-exhibition-1.webp";
import globalArtExhibition2 from "@/assets/global-art-exhibition-2.webp";
import globalArtExhibition3 from "@/assets/global-art-exhibition-3.webp";
import globalArtExhibition4 from "@/assets/global-art-exhibition-4.webp";
import globalArtExhibition5 from "@/assets/global-art-exhibition-5.webp";

export type ExhibitionGalleryItem =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string };

const EXHIBITION_GALLERY_BY_SLUG: Record<string, readonly ExhibitionGalleryItem[]> =
  {
    "back-on": [
      { kind: "image", src: backOn1 },
      { kind: "image", src: backOn2 },
      { kind: "image", src: backOn3 },
    ],
    "global-art-gallery-solo": [
      { kind: "video", src: globalArtExhibitionVideo },
      { kind: "image", src: globalArtExhibition1 },
      { kind: "image", src: globalArtExhibition2 },
      { kind: "image", src: globalArtExhibition3 },
      { kind: "image", src: globalArtExhibition4 },
      { kind: "image", src: globalArtExhibition5 },
    ],
  };

/** Bundled gallery items for this slug, or null to use glob discovery in EventGallery */
export function explicitGalleryItemsForSlug(
  slug: string,
): ExhibitionGalleryItem[] | null {
  const list = EXHIBITION_GALLERY_BY_SLUG[slug];
  return list ? [...list] : null;
}
