/**
 * Homepage “Off the Press” — curated press and exhibition highlights.
 * Update this list when adding new homepage features (newest / most relevant first).
 */

import themarkerArticleImg from "@/assets/the marker_pic for article.webp";
import portfolioArticleImg from "@/assets/protfolio_pic for article.webp";
import globalArtSoloCover from "@/assets/INVITATION - GLOBAL ART_POST v2 ffff.jpg";

export interface OffThePressItem {
  id: string;
  title: string;
  /** Publication or venue */
  source: string;
  dateLabel: string;
  excerpt: string;
  imageUrl: string;
  linkUrl: string;
  linkLabel: string;
  /** External URLs open in a new tab */
  external?: boolean;
  /**
   * `cover` — fills the frame (landscape photos).
   * `fit-height` — scales to full frame height without cropping (posters / portraits).
   */
  imageMode?: "cover" | "fit-height";
  /** Used with `cover` mode */
  imagePosition?: string;
}

export const HOME_OFF_THE_PRESS: OffThePressItem[] = [
  {
    id: "themarker-tel-aviv-open-house-2026",
    title:
      "In Tel Aviv, Something Is Always Happening, and You Need to Learn to Say No",
    source: "TheMarker",
    dateLabel: "May 22, 2026",
    excerpt:
      "A TheMarker Open House feature about Dekel Harari's life in Tel Aviv, his move to the city, and how the urban pace, routine, and constant movement connect to his personal and creative world.",
    imageUrl: themarkerArticleImg,
    linkUrl:
      "https://www.themarker.com/realestate/openhouse/2026-05-22/ty-article-magazine/.premium/0000019e-3189-d0db-a79e-f9db59820000",
    linkLabel: "Read More",
    external: true,
    imageMode: "cover",
    imagePosition: "center",
  },
  {
    id: "portfolio-whats-happening-dekel-harari-2026",
    title: "What's Happening // Dekel Harari",
    source: "Portfolio Magazine",
    dateLabel: "May 20, 2026",
    excerpt:
      "A Portfolio Magazine profile on Dekel Harari's path from business to contemporary mixed-media art, and his use of newspapers, headlines, and everyday materials as a visual language.",
    imageUrl: portfolioArticleImg,
    linkUrl: "https://www.prtfl.co.il/archives/251898",
    linkLabel: "Read More",
    external: true,
    imageMode: "cover",
    imagePosition: "center top",
  },
  {
    id: "global-art-gallery-solo-2026",
    title: "Current Solo Exhibition",
    source: "Global Art Gallery, Tel Aviv",
    dateLabel: "May 20 – June 19, 2026",
    excerpt:
      "Dekel Harari's solo exhibition at Global Art Gallery brings together works that explore routine, headlines, urban life, and the tension between daily information and personal identity.",
    imageUrl: globalArtSoloCover,
    linkUrl: "/exhibitions#exhibition-global-art-gallery-solo",
    linkLabel: "View",
    imageMode: "fit-height",
  },
];
