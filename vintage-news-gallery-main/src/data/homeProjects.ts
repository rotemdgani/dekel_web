import type { WorksSectionSlug } from "@/data/worksSections";

import imgHeadline from "@/assets/Headline.webp";
import imgCut from "@/assets/Cut.webp";
import imgFramed from "@/assets/Constrained Bloom_Anemone.webp";

export interface HomeProject {
  slug: WorksSectionSlug;
  imageUrl: string;
  title: string;
  yearRange: string;
  description: string;
}

export const HOME_PROJECTS: HomeProject[] = [
  {
    slug: "subjects-removed",
    imageUrl: imgHeadline,
    title: "Subjects, Removed",
    yearRange: "2024–2025",
    description:
      "Portraits of people who no longer have faces. Not because something happened to them — because nothing did. The same morning, the same scroll, the same headline, repeated until the features wear off. What remains is posture, the outline of a presence that used to ask questions.",
  },
  {
    slug: "daily-material",
    imageUrl: imgCut,
    title: "Daily Material",
    yearRange: "2024–2025",
    description:
      "The newspaper as object, not as message. It arrives in the morning, gets read, gets thrown away, and tomorrow another one shows up exactly like it. Here it is cut, torn, painted over — refusing the disposal it was designed for. A material meant to be forgotten, kept.",
  },
  {
    slug: "framed-for-display",
    imageUrl: imgFramed,
    title: "Framed for Display",
    yearRange: "2025",
    description:
      "Ordinary objects placed inside elaborate gold frames — the kind that signal importance before the viewer has decided whether anything important is there. A flower taped to paper. A scrap. The frame asks to be taken seriously. The work asks why we agreed.",
  },
];
