/**
 * Homepage “Off the Press” — curated press and exhibition highlights.
 * Exhibitions first, then the three press articles together.
 */

import themarkerArticleImg from "@/assets/the_marker_pic_for_article.webp";
import portfolioArticleImg from "@/assets/protfolio_pic_for_article.webp";
import openStudioSvaCover from "@/assets/Open_studio_nyc_SVA_1.webp";
import behindClosedDoorsCover from "@/assets/Opendoors_exhibition_cover.webp";
import globalArtSoloCover from "@/assets/INVITATION_-_GLOBAL_ART_POST_v2_ffff.jpg";

/** Featured image from the My News article (og:image) */
const MYNEWS_DEKELHARARI_FEATURED =
  "https://mynews.co.il/wp-content/uploads/2026/05/Archive.jpg";

export interface OffThePressItem {
  id: string;
  title: string;
  /** Publication or venue */
  source: string;
  dateLabel: string;
  excerpt: string;
  imageUrl: string;
  linkUrl: string;
  /** Omit to hide the text CTA under the card (image may still link) */
  linkLabel?: string;
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
    id: "behind-closed-doors-2026",
    title: "Behind Closed Doors",
    source: "HOM Gallery, Brooklyn",
    dateLabel: "August 31, 2026",
    excerpt:
      "Group exhibition exploring the lives that unfold in the spaces we inhabit.",
    imageUrl: behindClosedDoorsCover,
    linkUrl: "/exhibitions#exhibition-behind-closed-doors",
    imageMode: "cover",
    imagePosition: "center 40%",
  },
  {
    id: "open-studio-sva-nyc-2026",
    title: "Open Studio — SVA NYC",
    source: "School of Visual Arts, New York",
    dateLabel: "August 2026",
    excerpt:
      "Open studio marking the Fine Art residency at the School of Visual Arts.",
    imageUrl: openStudioSvaCover,
    linkUrl: "/exhibitions#exhibition-open-studio-sva-nyc",
    imageMode: "cover",
    imagePosition: "center 35%",
  },
  {
    id: "global-art-gallery-solo-2026",
    title: "Solo Exhibition",
    source: "Global Art Gallery",
    dateLabel: "May 20 – June 19, 2026",
    excerpt:
      "Solo exhibition at Global Art Gallery, curated by Michal Adler and Dr. Galia Duchin Ariely.",
    imageUrl: globalArtSoloCover,
    linkUrl: "/exhibitions#exhibition-global-art-gallery-solo",
    imageMode: "cover",
    imagePosition: "center center",
  },
  {
    id: "themarker-tel-aviv-open-house-2026",
    title:
      "In Tel Aviv, Something Is Always Happening, and You Need to Learn to Say No",
    source: "TheMarker",
    dateLabel: "May 22, 2026",
    excerpt:
      "Open House feature on life in Tel Aviv and how the city’s pace enters the work.",
    imageUrl: themarkerArticleImg,
    linkUrl:
      "https://www.themarker.com/realestate/openhouse/2026-05-22/ty-article-magazine/.premium/0000019e-3189-d0db-a79e-f9db59820000",
    linkLabel: "Read article",
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
      "From business to mixed-media — newspapers and headlines as a visual language.",
    imageUrl: portfolioArticleImg,
    linkUrl: "https://www.prtfl.co.il/archives/251898",
    linkLabel: "Read article",
    external: true,
    imageMode: "cover",
    imagePosition: "center top",
  },
  {
    id: "mynews-dekelharari-global-art-2026",
    title:
      "dd/mmm/yyyy (day.month.year) — Solo Exhibition by Dekel Harari at Global Art Gallery, Tel Aviv",
    source: "My News",
    dateLabel: "May 24, 2026",
    excerpt:
      "Dekel Harari uses newspapers in his work to explore the tension between information, routine, and identity.",
    imageUrl: MYNEWS_DEKELHARARI_FEATURED,
    linkUrl:
      "https://mynews.co.il/entertainment/exhibitions-and-art/dekelharari-2405/",
    linkLabel: "Read article",
    external: true,
    imageMode: "cover",
    imagePosition: "center center",
  },
];
