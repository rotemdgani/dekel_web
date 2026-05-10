/**
 * Exhibition list covers — use installation/event photos from `src/assets` when available.
 * Each slug maps to an image from that exhibition or event; unknown slugs use a neutral fallback.
 */

import artGatheringCover from "@/assets/Art Gathering_0.webp";
import backOnCover from "@/assets/backon2.JPG";
import superSpartaCover from "@/assets/SUPER SPARTA.webp";
import peaceCover from "@/assets/Peace and Goodbye.webp";
import lotanCover from "@/assets/Lotan Gallery Jaffa_2.webp";
import sohoCover from "@/assets/Solo Exhibition Soho House Hotel, Jaffa.webp";
import tauCover from "@/assets/Tel_Aviv_University.webp";
/** No dedicated Ben Ami install photo in repo — neutral artwork fallback */
import benAmiFallbackCover from "@/assets/Class.webp";
import neutralFallbackCover from "@/assets/Headline.webp";
import globalArtSoloCover from "@/assets/INVITATION - GLOBAL ART_POST v2 ffff.jpg";

const BY_SLUG: Record<string, string> = {
  "global-art-gallery-solo": globalArtSoloCover,
  "art-gathering": artGatheringCover,
  "back-on": backOnCover,
  "super-sparta": superSpartaCover,
  "peace-and-goodbye": peaceCover,
  "lotan-gallery-jaffa": lotanCover,
  "soho-house-jaffa": sohoCover,
  "tel-aviv-university": tauCover,
  "ben-ami-gallery": benAmiFallbackCover,
};

/** Resolved cover src for an exhibition slug (bundled asset URL). */
export function coverImageForExhibitionSlug(slug: string): string {
  return BY_SLUG[slug] ?? neutralFallbackCover;
}
