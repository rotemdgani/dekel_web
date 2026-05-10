/**
 * Per-artwork thumbnail / gallery cell styling on Museum (Index) page.
 * IDs must match `src/data/artworks.ts`.
 */

/** Taped [Rose], Taped [Orchid] — show transparent assets on page background; no gray frame */
export const GALLERY_NATURAL_TRANSPARENCY_IDS = new Set([39, 57]);

/** M&A, Class, Nightlife, Scrabble, Swords to Plowshares — full piece visible, inset with breathing room */
export const GALLERY_CONTAIN_INSET_IDS = new Set([35, 37, 45, 54, 62]);

export function museumImageWrapperClassName(artworkId: number): string {
  let c = "museum-artwork-image-wrapper";
  if (GALLERY_NATURAL_TRANSPARENCY_IDS.has(artworkId)) {
    c += " museum-artwork-image-wrapper--natural-transparency";
  }
  if (GALLERY_CONTAIN_INSET_IDS.has(artworkId)) {
    c += " museum-artwork-image-wrapper--contain-inset";
  }
  return c;
}
