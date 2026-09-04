import type { Artwork } from './artworks';

export type WorksSectionSlug =
  | 'subjects-removed'
  | 'daily-material'
  | 'framed-for-display'
  | 'all-the-news-thats-fit-to-print';

/** Retired series slug — redirect `/works#crosswords` → `/works` */
export const RETIRED_WORKS_HASHES = ['crosswords'] as const;

export interface WorksSectionMeta {
  slug: WorksSectionSlug;
  title: string;
  yearRange: string;
  description: string;
  orderedIds: number[];
}

/** Section order & artwork order */
export const WORKS_SECTIONS: WorksSectionMeta[] = [
  {
    slug: 'subjects-removed',
    title: 'SUBJECT IMPLIED',
    yearRange: '2026',
    description: 'Faces edited out for your convenience.',
    orderedIds: [
      69, // Developing Story
      70, // Clarification
      71, // Above the Fold
      72, // Continued on A1
      52, // Before Coffee
      49, // Headline
      50, // Loading...
      51, // Read More...
      55, // To Be Continued
      65, // Subscriber
      41, // 21.03.2025
    ],
  },
  {
    slug: 'daily-material',
    title: 'DAILY MATERIAL',
    yearRange: '2023–2025',
    description:
      'It arrives, it is read, it is thrown away. Here it refuses.',
    orderedIds: [
      61, // Earth
      67, // Flying Information
      74, // Wings
      45, // Nightlife
      43, // Subtext
      62, // Swords to Plowshares
      42, // Split Page
      63, // Cut
      64, // Paste
      56, // CEO
    ],
  },
  {
    slug: 'framed-for-display',
    title: 'FRAMED FOR DISPLAY',
    yearRange: '2025',
    description: 'Gold, and whatever it agreed to hold.',
    orderedIds: [
      40, // Taped [Anemone]
      39, // Taped [Rose]
      57, // Taped [Orchid]
      59, // Legacy
      60, // Archive (with frame)
      53, // Username
      35, // M&A
      36, // GIA Certified
      37, // Class
      54, // Scrabble
    ],
  },
  {
    slug: 'all-the-news-thats-fit-to-print',
    title: "ALL THE NEWS THAT'S FIT TO PRINT",
    yearRange: '2022',
    description: "Everything fit to print — none of it here.",
    orderedIds: [
      75, // Wire Photo
      76, // Filler
      79, // Off-Register
      77, // Light Study
      78, // Below the Fold
    ],
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
