import type { WorksSectionSlug } from "@/data/worksSections";

/** Same assets as the corresponding works on /works */
import developing_story from "@/assets/Developing_Story_.webp";
import earth_img from "@/assets/Earth.webp";
import taped_anemone from "@/assets/Constrained_Bloom_Anemone.webp";
import off_register from "@/assets/Off-Register.webp";

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
    title: "Subject Implied",
    yearRange: "2026",
    description: "Faces edited out for your convenience.",
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
    imageUrl: off_register,
    title: "All the News That's Fit to Print",
    yearRange: "2022",
    description: "Everything fit to print — none of it here.",
  },
];
