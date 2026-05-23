import type { Artwork } from './artworks';

export type WorksSectionSlug = 'subjects-removed' | 'daily-material' | 'framed-for-display' | 'crosswords';

export interface WorksSectionMeta {
  slug: WorksSectionSlug;
  title: string;
  yearRange: string;
  description: string;
  orderedIds: number[];
}

/** Section order & artwork order per redesign brief */
export const WORKS_SECTIONS: WorksSectionMeta[] = [
  {
    slug: 'subjects-removed',
    title: 'SUBJECTS, REMOVED',
    yearRange: '2024–2025',
    description: 'Faces edited out for your convenience.',
    orderedIds: [52, 49, 51, 56, 65, 41, 53, 50, 55],
  },
  {
    slug: 'daily-material',
    title: 'DAILY MATERIAL',
    yearRange: '2024–2025',
    description: 'Tomorrow\'s recycling, today.',
    orderedIds: [37, 61, 67, 63, 60, 64, 45, 68, 42, 62, 66],
  },
  {
    slug: 'framed-for-display',
    title: 'FRAMED FOR DISPLAY',
    yearRange: '2025',
    description: 'Objects pre-approved for institutional viewing.',
    orderedIds: [40, 39, 57, 36, 35, 59],
  },
  {
    slug: 'crosswords',
    title: 'CROSSWORDS',
    yearRange: '2025',
    description: 'Letters arranged. Meaning optional.',
    orderedIds: [43, 54],
  },
];

export function flattenSectionsToWorks(
  map: Map<number, Artwork>,
  sections: WorksSectionMeta[] = WORKS_SECTIONS
): { artwork: Artwork; sectionSlug: WorksSectionSlug }[] {
  const out: { artwork: Artwork; sectionSlug: WorksSectionSlug }[] = [];
  for (const sec of sections) {
    for (const id of sec.orderedIds) {
      const a = map.get(id);
      if (a) out.push({ artwork: a, sectionSlug: sec.slug });
    }
  }
  return out;
}
