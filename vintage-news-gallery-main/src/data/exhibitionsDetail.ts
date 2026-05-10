/**
 * Full exhibition records for Exhibitions page and home sections.
 * Optional `coverImageUrl` overrides bundled covers from `exhibitionCovers.ts` (public path).
 * Installation galleries: `src/assets/*.webp` matched by slug in EventGallery, or explicit lists in `exhibitionGalleryAssets.ts`.
 */

export interface ExhibitionDetail {
  id: string;
  slug: string;
  title: string;
  /** Shown to visitors (e.g. "February 19, 2026") */
  dateLabel: string;
  /** Used for sorting (ISO 8601 date string, first day of month if only month known) */
  sortDate: string;
  location: string;
  curator?: string;
  description: string;
  /** External related page (venue, registration, article) */
  relatedUrl?: string;
  relatedLinkLabel?: string;
  /** Installation / event photos via EventGallery glob */
  showGallery: boolean;
  /** Optional override: public URL under `public/` (e.g. custom JPEG). Otherwise `exhibitionCovers` maps slug → artwork. */
  coverImageUrl?: string;
  /** Future exhibition — shows a subtle “Upcoming” label on cards and detail */
  isUpcoming?: boolean;
}

export const EXHIBITIONS: ExhibitionDetail[] = [
  {
    id: "global-art-gallery-solo",
    slug: "global-art-gallery-solo",
    title: "Solo Exhibition",
    dateLabel: "May 20 – June 19, 2026",
    sortDate: "2026-05-20",
    location: "Global Art Gallery",
    curator: "Curated by Michal Adler and Dr. Galia Duchin Ariely",
    description:
      "Opening: May 20, 2026, 20:00. Closing: June 19, 2026. Solo exhibition at Global Art Gallery.",
    showGallery: false,
    isUpcoming: true,
  },
  {
    id: "art-gathering",
    slug: "art-gathering",
    title: "Art Gathering",
    dateLabel: "February 19, 2026",
    sortDate: "2026-02-19",
    location: "Tel Aviv",
    curator: "Curated by Or Bitton",
    description:
      "This event presented a selection of works by Dekel Harari within a social setting that encouraged dialogue around media, memory, and contemporary visual culture. The gathering positioned art as a shared experience and a space for conversation.",
    showGallery: true,
  },
  {
    id: "back-on",
    slug: "back-on",
    title: "Back On",
    dateLabel: "March 7, 2026",
    sortDate: "2026-03-07",
    location: "Tel Aviv",
    curator: "Curated by Miriam Marsh",
    description:
      "A group exhibition of Israeli artists exploring Israeli reality and Tel Aviv escapism.",
    showGallery: true,
  },
  {
    id: "super-sparta",
    slug: "super-sparta",
    title: "SUPER SPARTA – Group Exhibition",
    dateLabel: "December 24, 2025",
    sortDate: "2025-12-24",
    location: "Rothschild 69, Tel Aviv",
    curator: "Curated by Shira Nina Tier & Hila Brenner",
    description:
      "A group exhibition exploring contemporary visual culture through diverse artistic voices. The opening event included a social gathering around art, with wine courtesy of Feldstein Winery. The exhibition positions art as a shared experience encouraging dialogue and contemporary reflection.",
    showGallery: true,
  },
  {
    id: "peace-and-goodbye",
    slug: "peace-and-goodbye",
    title: "Peace and Goodbye",
    dateLabel: "September 2025",
    sortDate: "2025-09-01",
    location: "Yaara Open Studio, Jaffa",
    curator: "Curated by Gaby Zeltsman",
    description:
      "Group exhibition in collaboration with Yaara Open Studio, Jaffa. The exhibition explores the moment between faith and rupture through various artistic interpretations of the dove image, featuring works that examine peace symbols and their contemporary relevance.",
    relatedUrl: "https://www.prtfl.co.il/archives/233568",
    relatedLinkLabel: "Read press coverage",
    showGallery: true,
  },
  {
    id: "lotan-gallery-jaffa",
    slug: "lotan-gallery-jaffa",
    title: "Lotan Gallery, Jaffa",
    dateLabel: "January 2024",
    sortDate: "2024-01-01",
    location: "Lotan Gallery, Jaffa",
    curator: "Curated by Orly Dvir",
    description:
      'Group exhibition titled "Rebirth," showcasing four original works.',
    showGallery: true,
  },
  {
    id: "soho-house-jaffa",
    slug: "soho-house-jaffa",
    title: "Solo Exhibition: Soho House Hotel, Jaffa",
    dateLabel: "April 2024",
    sortDate: "2024-04-01",
    location: "Soho House Hotel, Jaffa",
    description:
      "A personal exhibition featuring a series of works showcasing the blend of business and art in a creative journey.",
    showGallery: true,
  },
  {
    id: "tel-aviv-university",
    slug: "tel-aviv-university",
    title: "Tel Aviv University",
    dateLabel: "July 2024",
    sortDate: "2024-07-01",
    location: "Tel Aviv University",
    curator: "Curated by Yaira Yasmin",
    description:
      "Group exhibition displaying three works reflecting on the impact of war and disasters. These pieces explore the emotional and societal aftermath of such events, providing a visual commentary on resilience and recovery.",
    relatedUrl: "https://soclib.tau.ac.il/events/exhibitions/warandpeace",
    relatedLinkLabel: "Library exhibition page",
    showGallery: true,
  },
  {
    id: "ben-ami-gallery",
    slug: "ben-ami-gallery",
    title: "Ben Ami Gallery, Tel Aviv",
    dateLabel: "2024",
    sortDate: "2024-06-01",
    location: "Ben Ami Gallery, Tel Aviv",
    curator: "Curated by Doron Polak",
    description:
      "Group exhibition presenting three pieces that explore the intersection of art and daily life.",
    showGallery: false,
  },
];

export function exhibitionsSortedNewestFirst(): ExhibitionDetail[] {
  return [...EXHIBITIONS].sort(
    (a, b) =>
      new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime(),
  );
}

/** Short lines for CV-style or compact lists */
export const EXHIBITIONS_CHRONOLOGICAL: {
  year: string;
  title: string;
  venueLine: string;
  curator?: string;
}[] = EXHIBITIONS.map((ex) => ({
  year: ex.sortDate.slice(0, 4),
  title: ex.title,
  venueLine: ex.location,
  curator: ex.curator,
}));
