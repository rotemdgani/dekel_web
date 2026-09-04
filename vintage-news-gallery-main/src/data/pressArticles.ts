/**
 * Press and articles — each `linkUrl` must point at the cited piece and match title/excerpt/image.
 * Remote `imageUrl` values may be used for outlet-hosted feature images (https only).
 *
 * **Order:** Lists use `pressSortedNewestFirst()` — sort is by `sortDate` (ISO `YYYY-MM-DD`) descending.
 * Keep `dateLabel` in sync with the real publication/exhibition date; do not rely on array order here.
 */

import peaceArticleImg from "@/assets/Peace_and_Goodbye.webp";
import daMagazinePressImg from "@/assets/shagal_over_the_city.webp";
import tauArticleImg from "@/assets/Tel_Aviv_University.webp";
import tlvTimesPressPortrait from "@/assets/dekel-portrait.webp";
import themarkerArticleImg from "@/assets/the_marker_pic_for_article.webp";
import portfolioArticleImg from "@/assets/protfolio_pic_for_article.webp";

/** Featured image from the My News article (og:image) */
const MYNEWS_DEKELHARARI_FEATURED =
  "https://mynews.co.il/wp-content/uploads/2026/05/Archive.jpg";

export interface PressArticle {
  id: string;
  title: string;
  /** Publication or outlet name */
  source?: string;
  /** Human-readable date for display */
  dateLabel?: string;
  /** ISO date for ordering (newest first) */
  sortDate: string;
  excerpt?: string;
  linkUrl: string;
  linkLabel?: string;
  /** Bundled image URL; omit only when no image is available */
  imageUrl?: string;
  /** Language of the original article when not English (UI label stays English) */
  language?: string;
}

export const PRESS_ARTICLES: PressArticle[] = [
  {
    id: "mynews-dekelharari-global-art-2026",
    /* English rendering of the My News headline (original is Hebrew) */
    title:
      "dd/mmm/yyyy (day.month.year) — Solo Exhibition by Dekel Harari at Global Art Gallery, Tel Aviv",
    source: "My News",
    dateLabel: "May 24, 2026",
    sortDate: "2026-05-24",
    language: "Hebrew",
    excerpt:
      "Dekel Harari uses newspapers in his work to explore the tension between information, routine, and identity. A profile covering his solo exhibition at Global Art Gallery, Tel Aviv.",
    linkUrl:
      "https://mynews.co.il/entertainment/exhibitions-and-art/dekelharari-2405/",
    linkLabel: "Read article",
    imageUrl: MYNEWS_DEKELHARARI_FEATURED,
  },
  {
    id: "themarker-tel-aviv-open-house-2026",
    title:
      "In Tel Aviv, Something Is Always Happening, and You Need to Learn to Say No",
    source: "TheMarker",
    dateLabel: "May 22, 2026",
    sortDate: "2026-05-22",
    excerpt:
      "A TheMarker Open House feature on Dekel Harari's life in Tel Aviv — his move to the city, and how the urban pace, routine, and constant movement connect to his personal and creative world.",
    linkUrl:
      "https://www.themarker.com/realestate/openhouse/2026-05-22/ty-article-magazine/.premium/0000019e-3189-d0db-a79e-f9db59820000",
    linkLabel: "Read article",
    imageUrl: themarkerArticleImg,
  },
  {
    id: "portfolio-whats-happening-dekel-harari-2026",
    title: "What's Happening // Dekel Harari",
    source: "Portfolio Magazine",
    dateLabel: "May 20, 2026",
    sortDate: "2026-05-20",
    excerpt:
      "A Portfolio Magazine profile on Dekel Harari's path from business to contemporary mixed-media art, and his use of newspapers, headlines, and everyday materials as a visual language.",
    linkUrl: "https://www.prtfl.co.il/archives/251898",
    linkLabel: "Read article",
    imageUrl: portfolioArticleImg,
  },
  {
    id: "tlv-times-dekel-biotech-art-2024",
    title:
      "From Biotech CEO to Contemporary Artist: Dekel Harari's Life Between Work, News, and Painting",
    source: "TLV Times",
    dateLabel: "July 18, 2024",
    sortDate: "2024-07-18",
    excerpt:
      "An interview with Dekel Harari about balancing a leadership role in biotech with a growing studio practice, exploring newspaper collage, creative burnout, breakdance, and the War and Peace exhibition at Tel Aviv University.",
    linkUrl:
      "https://tlvtimes.co.il/%D7%9E%D7%93%D7%99%D7%A0%D7%AA-%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91/%D7%9E%D7%A0%D7%9B%D7%9C-%D7%97%D7%91%D7%A8%D7%AA-%D7%94%D7%91%D7%99%D7%95%D7%98%D7%A7-%D7%A9%D7%9E%D7%A6%D7%90-%D7%A4%D7%AA%D7%A8%D7%95%D7%9F-%D7%9C%D7%91%D7%A2%D7%99%D7%99%D7%AA-%D7%94%D7%A9%D7%97/",
    linkLabel: "Read Article",
    imageUrl: tlvTimesPressPortrait,
  },
  {
    id: "peace-goodbye-portfolio",
    title: "Peace and Goodbye: From the White Dove to the Black Bag",
    source: "Portfolio Magazine",
    dateLabel: "September 8, 2025",
    sortDate: "2025-09-08",
    excerpt:
      "Portfolio Magazine on the group exhibition “Peace and Goodbye,” exploring faith, rupture, and the dove symbol through painting, photography, video, installation, and object — with curator Gaby Zeltsman asking whether peace symbols still hold meaning after war.",
    linkUrl: "https://www.prtfl.co.il/archives/233568",
    linkLabel: "Read article",
    imageUrl: peaceArticleImg,
  },
  {
    id: "dek-el-da-magazine",
    title: 'The artist bringing “news” the channels don’t show',
    source: "D+A Magazine",
    dateLabel: "December 2025",
    sortDate: "2025-12-01",
    excerpt:
      "D+A Magazine profiles Dekel Harari’s collages from the daily press — turning pessimistic newsprint into optimistic pop imagery, and tracing his path from biotech leadership to full-time studio practice after October 7.",
    linkUrl:
      "https://www.da-magazine.co.il/%D7%90%D7%95%D7%9E%D7%A0%D7%95%D7%AA/dekel-harari/",
    linkLabel: "Read article",
    imageUrl: daMagazinePressImg,
  },
  /*
   * TODO: Tel Aviv University Library listing — confirm one calendar date (opening, page date, etc.).
   * `dateLabel` / `sortDate` use year-level fallback until verified.
   */
  {
    id: "tau-war-and-peace",
    title: 'Group exhibition: “War and Peace”',
    source: "Tel Aviv University Library",
    dateLabel: "2025",
    sortDate: "2025-01-01",
    excerpt:
      "Library exhibition page for “War and Peace” at the Social Sciences Library, Tel Aviv University — including Dekel Harari among the participating artists (curator: Yaira Yasmin).",
    linkUrl: "https://soclib.tau.ac.il/events/exhibitions/warandpeace",
    linkLabel: "Read more",
    imageUrl: tauArticleImg,
  },
];

export function pressSortedNewestFirst(): PressArticle[] {
  return [...PRESS_ARTICLES].sort(
    (a, b) =>
      new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime(),
  );
}
