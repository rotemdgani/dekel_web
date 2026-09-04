/**
 * Exhibition list covers — use installation/event photos from `src/assets` when available.
 * Each slug maps to an image from that exhibition or event; unknown slugs use a neutral fallback.
 */

import artGatheringCover from "@/assets/Art_Gathering_0.webp";
import backOnCover from "@/assets/backon2.JPG";
import superSpartaCover from "@/assets/SUPER_SPARTA.webp";
import peaceCover from "@/assets/Peace_and_Goodbye.webp";
import lotanCover from "@/assets/Lotan_Gallery_Jaffa_2.webp";
import sohoCover from "@/assets/Solo_Exhibition_Soho_House_Hotel,_Jaffa.webp";
import tauCover from "@/assets/Tel_Aviv_University.webp";
/** No dedicated Ben Ami install photo in repo — neutral artwork fallback */
import benAmiFallbackCover from "@/assets/Class.webp";
import neutralFallbackCover from "@/assets/Headline.webp";
import globalArtSoloCover from "@/assets/INVITATION_-_GLOBAL_ART_POST_v2_ffff.jpg";
import openStudioSvaCover from "@/assets/Open_studio_nyc_SVA_1.webp";
import behindClosedDoorsCover from "@/assets/Opendoors_exhibition_cover.webp";

const BY_SLUG: Record<string, string> = {
  "behind-closed-doors": behindClosedDoorsCover,
  "open-studio-sva-nyc": openStudioSvaCover,
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
