import type { Artwork } from "@/data/artworks";

/** Year string as stored — no re-formatting — prefer explicit `year`, else catalogue `description` */
export function displayYear(work: Artwork): string {
  const y = typeof work.year === "string" ? work.year.trim() : "";
  if (y) return y;
  return (work.description ?? "").trim();
}

export function metadataLine(work: Artwork): string {
  const y = displayYear(work);
  const m = work.medium.trim();
  if (!y) return m;
  if (!m) return y;
  return `${y}, ${m.toLowerCase()}`;
}

/** Normalize dimension strings for catalogue display (× between numbers, en-dash in numeric ranges). */
export function normalizeDimensionsDisplay(dimensions: string): string {
  const raw = dimensions.trim();
  if (!raw) return "";
  let s = raw.replace(/\s*[xX]\s*/g, " × ");
  // Hyphen between digits → en-dash (e.g. 60-80 → 60–80 cm ranges)
  s = s.replace(/(\d)\s*-\s*(\d)/g, "$1–$2");
  return s;
}

/** Single Zwirner-style caption line: year, medium, dimensions */
export function worksGridCaptionMetaLine(work: Artwork): string {
  const base = metadataLine(work);
  const dimsRaw = typeof work.dimensions === "string" ? work.dimensions.trim() : "";
  const dims = normalizeDimensionsDisplay(dimsRaw);
  if (!dims) return base;
  if (!base) return dims;
  return `${base}, ${dims}`;
}

export function inquirePrefill(work: Artwork): string {
  return `I'm interested in ${work.title}.`;
}

export function whatsappInterestMessage(work: Artwork): string {
  return `Hi Dekel, I'm interested in ${work.title}.`;
}

/** Shown in lightbox when `dimensions` is empty — replace in `artworks.ts` when known */
export const PLACEHOLDER_DIMENSIONS = "[Size to be confirmed]";

/** Shown in lightbox when `medium` is empty */
export const PLACEHOLDER_MEDIUM = "[Technique to be confirmed]";

export function lightboxDimensionLine(work: Artwork): string {
  const d = typeof work.dimensions === "string" ? work.dimensions.trim() : "";
  return d || PLACEHOLDER_DIMENSIONS;
}

export function lightboxMediumLine(work: Artwork): string {
  const m = typeof work.medium === "string" ? work.medium.trim() : "";
  return m || PLACEHOLDER_MEDIUM;
}
