import type { WorksSectionSlug } from "@/data/worksSections";

/** Same assets as the corresponding works on /works */
import developing_story from "@/assets/Developing_Story_v2.webp";
import time_sensitive from "@/assets/Time_Sensitive.webp";
import earth_img from "@/assets/Earth.webp";
import taped_anemone from "@/assets/Constrained_Bloom_Anemone.webp";
import wire_photo from "@/assets/Wire_Photo.webp";

export interface HomeProject {
  slug: WorksSectionSlug;
  /** Explicit series cover — does not follow catalogue order */
  imageUrl: string;
  title: string;
  yearRange: string;
  description: string;
}

export const HOME_PROJECTS: HomeProject[] = [
  {
    slug: "subjects-removed",
    imageUrl: developing_story,
    title: "Subject Removed",
    yearRange: "2025–2026",
    description: "Faces edited out for your convenience.",
  },
  {
    slug: "sponsored-content",
    imageUrl: time_sensitive,
    title: "Sponsored Content",
    yearRange: "2026",
    description: "Next to the news, a world where nothing ever happens.",
  },
  {
    slug: "daily-material",
    imageUrl: earth_img,
    title: "Daily Material",
    yearRange: "2023–2025",
    description:
      "It arrives, it is read, it is thrown away. Here it refuses.",
  },
  {
    slug: "framed-for-display",
    imageUrl: taped_anemone,
    title: "Framed for Display",
    yearRange: "2025",
    description: "Gold, and whatever it agreed to hold.",
  },
  {
    slug: "all-the-news-thats-fit-to-print",
    imageUrl: wire_photo,
    title: "All the News That's Fit to Print",
    yearRange: "2022",
    description: "The front page, turned into wallpaper.",
  },
];
