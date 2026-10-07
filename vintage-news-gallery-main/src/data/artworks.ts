import developing_story from '@/assets/Developing_Story_v2.webp';
import the_story_behind_the_story from '@/assets/The_Story_Behind_the_Story_v2.webp';
import op_ed from '@/assets/Op-Ed_v4.webp';
import breaking from '@/assets/Breaking.webp';
import time_sensitive from '@/assets/Time_Sensitive.webp';
import full_page from '@/assets/Full_Page.webp';
import celebrating_luck from '@/assets/Celebrating_Luck.webp';
import placement from '@/assets/Placement.webp';
import clarification from '@/assets/Clarification_v2.webp';
import above_the_fold from '@/assets/Above_the_Fold_v2.webp';
import continued_on_a1 from '@/assets/Continued_on_A1.webp';
import wings_img from '@/assets/wings.webp';
import m_and_a from '@/assets/M&A.webp';
import gia_certified from '@/assets/GIA_Certified.webp';
import class_img from '@/assets/Class.webp';
import constrained_bloom_rose from '@/assets/Constrained_Bloom_ROSE.webp';
import constrained_bloom_anemone from '@/assets/Constrained_Bloom_Anemone.webp';
import date_2103 from '@/assets/21.03.2025.webp';
import split_page from '@/assets/Split_Page.webp';
import subtext_img from '@/assets/Subtext.webp';
import cut_and_paste from '@/assets/Cut_and_Paste.webp';
import paste_artwork from '@/assets/Paste.webp';
import nightlife from '@/assets/Nightlife.webp';
import headline from '@/assets/Headline_v2.webp';
import loading_img from '@/assets/Loading_v2.webp';
import read_more_img from '@/assets/Read_More....webp';
import before_coffee from '@/assets/Before_coffee.webp';
import username_img from '@/assets/Username.webp';
import subscriber_img from '@/assets/Subscriber.webp';
import scrabble from '@/assets/Scrabble.webp';
import to_be_continued from '@/assets/To_be_continued_v2.webp';
import ceo from '@/assets/CEO.webp';
import taped_orchid from '@/assets/Taped_[Orchid].webp';
import legacy from '@/assets/Legacy.webp';
import archive_img from '@/assets/archive_with_frame.webp';
import earth_img from '@/assets/Earth.webp';
import flying_information from '@/assets/Flying_information.webp';
import swords_img from '@/assets/Swords_to_Plowshares.webp';
import wire_photo from '@/assets/Wire_Photo.webp';
import filler_img from '@/assets/Filler.webp';
import light_study from '@/assets/Light_Study.webp';
import below_the_fold from '@/assets/Below_the_Fold.webp';
import off_register from '@/assets/Off-Register.webp';

/** Used for contact / schema; not shown as price on site */
const NO_PRICE = 0;

export type ArtworkMediaType = 'image' | 'video';

export interface Artwork {
  id: number;
  title: string;
  category: string;
  price: number;
  medium: string;
  dimensions: string;
  /** Catalogue image URL; unused when `mediaType` is `video` */
  image: string;
  description: string;
  availability: string;
  isLimited: boolean;
  year?: string;
  /** Hidden from the site for now (kept in the catalogue, not deleted) */
  hidden?: boolean;
  mediaType?: ArtworkMediaType;
  /** Video source when `mediaType` is `video` */
  video?: string;
  /**
   * Opens the lightbox on the light page ground instead of the default dark one.
   * For works whose own edges are pale — torn paper, raw canvas — where a dark
   * ground turns the edge into a halo.
   */
  lightboxGround?: 'light';
  /** Taller grid frame for very tall works (e.g. 1:2 formats), or a wider one for diptychs, so they don't look tiny */
  thumbAspect?: 'tall' | 'wide';
}

export function isVideoArtwork(work: Artwork): boolean {
  return work.mediaType === 'video' && typeof work.video === 'string' && work.video.length > 0;
}

/** Alt text: work title + medium */
export function artworkAlt(work: Artwork): string {
  return `${work.title}, ${work.medium}`;
}

/** Single source of truth for all works on the redesigned site */
const allArtworks: Artwork[] = [
  {
    id: 41,
    title: '21.03.2025',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '57 × 35 cm',
    image: date_2103,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 60,
    title: 'Archive',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '52 × 40 cm',
    image: archive_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 52,
    title: 'Before Coffee',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '110 × 90 cm',
    image: before_coffee,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 56,
    title: 'CEO',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '90 × 70 cm',
    image: ceo,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 37,
    title: 'Class',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '45 × 41 cm',
    image: class_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 49,
    title: 'Nightfall',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '120 × 80 cm',
    image: headline,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 50,
    title: 'Lorem Ipsum',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '120 × 80 cm',
    image: loading_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 51,
    title: 'Read More...',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '110 × 90 cm',
    image: read_more_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 43,
    title: 'Subtext',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '75 × 50 cm',
    image: subtext_img,
    description: '2025',
    availability: 'Unavailable',
    isLimited: false,
  },
  {
    id: 55,
    title: 'To Be Continued',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '120 × 80 cm',
    image: to_be_continued,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 53,
    title: 'Username',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '75 × 59 cm',
    image: username_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 65,
    title: 'Subscriber',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '110 × 90 cm',
    image: subscriber_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 63,
    title: 'Cut and Paste',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas on wood',
    dimensions: 'Diptych, 80 × 52 cm each',
    image: cut_and_paste,
    description: '2025',
    availability: 'Available',
    isLimited: false,
    thumbAspect: 'wide',
  },
  {
    id: 61,
    title: 'Earth',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '80 × 60 cm',
    image: earth_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 67,
    title: 'Flying Information',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '28 × 35 cm',
    image: flying_information,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 64,
    title: 'Paste',
    hidden: true, // shown as the right panel of 'Cut and Paste' (id 63)
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas on wood',
    dimensions: '80 × 52 cm',
    image: paste_artwork,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 42,
    title: 'Split Page',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '57 × 35 cm',
    image: split_page,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 62,
    title: 'Swords to Plowshares',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '56 × 37 cm',
    image: swords_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 40,
    title: 'Taped [Anemone]',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '81 × 69 cm',
    image: constrained_bloom_anemone,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 36,
    title: 'GIA Certified',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '45 × 43 cm including frame',
    image: gia_certified,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 59,
    title: 'Legacy',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '80 × 60 cm including frame',
    image: legacy,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 35,
    title: 'M&A',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '51 × 61 cm including frame',
    image: m_and_a,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 45,
    title: 'Nightlife',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '75 × 50 cm',
    image: nightlife,
    description: '2025',
    availability: 'Unavailable',
    isLimited: false,
  },
  {
    id: 54,
    title: 'Scrabble',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '29 × 36 cm',
    image: scrabble,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 57,
    title: 'Taped [Orchid]',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '81 × 69 cm',
    image: taped_orchid,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 39,
    title: 'Taped [Rose]',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '81 × 69 cm',
    image: constrained_bloom_rose,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 80,
    title: 'The Story Behind the Story',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '76.2 × 61 cm',
    image: the_story_behind_the_story,
    description: '2026',
    availability: 'Available',
    isLimited: false,
    lightboxGround: 'light',
  },
  {
    id: 81,
    title: 'Everyone Else',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '55 × 36 cm',
    image: op_ed,
    description: '2026',
    availability: 'Available',
    isLimited: false,
    lightboxGround: 'light',
  },
  {
    id: 82,
    title: 'Embargo',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '90 × 70 cm',
    image: breaking,
    description: '2026',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 83,
    title: 'Time Sensitive',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '55 × 36 cm',
    image: time_sensitive,
    description: '2026',
    availability: 'Available',
    isLimited: false,
    lightboxGround: 'light',
  },
  {
    id: 84,
    title: 'The Garden Was Free',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '55 × 36 cm',
    image: full_page,
    description: '2026',
    availability: 'Available',
    isLimited: false,
    lightboxGround: 'light',
  },
  {
    id: 85,
    title: 'Celebrating Luck',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '55 × 36 cm',
    image: celebrating_luck,
    description: '2026',
    availability: 'Available',
    isLimited: false,
    lightboxGround: 'light',
  },
  {
    id: 86,
    title: 'Placement',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '55 × 36 cm',
    image: placement,
    description: '2026',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 69,
    title: 'Developing Story',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '76.2 × 61 cm',
    image: developing_story,
    description: '2026',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 70,
    title: 'Clarification',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '76.2 × 61 cm',
    image: clarification,
    description: '2026',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 71,
    title: 'Above the Fold',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '76.2 × 61 cm',
    image: above_the_fold,
    description: '2026',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 72,
    title: 'Continued on A1',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '121.9 × 61 cm',
    image: continued_on_a1,
    description: '2026',
    availability: 'Available',
    thumbAspect: 'tall',
    isLimited: false,
  },
  {
    id: 74,
    title: 'Wings',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media',
    dimensions: '61 × 76.2 cm',
    image: wings_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 75,
    title: 'Wire Photo',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Acrylic on canvas',
    dimensions: '120 × 80 cm',
    image: wire_photo,
    description: '2022',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 76,
    title: 'Filler',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Acrylic on canvas',
    dimensions: '120 × 80 cm',
    image: filler_img,
    description: '2022',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 77,
    title: 'Light Study',
    hidden: true, // not shown on the site for now
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Acrylic on canvas',
    dimensions: '80 × 60 cm',
    image: light_study,
    description: '2022',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 78,
    title: 'Below the Fold',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Acrylic on canvas',
    dimensions: '120 × 80 cm',
    image: below_the_fold,
    description: '2022',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 79,
    title: 'Off-Register',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Acrylic on canvas',
    dimensions: '120 × 80 cm',
    image: off_register,
    description: '2022',
    availability: 'Available',
    isLimited: false,
  },
];

/** Works shown on the site (anything marked `hidden: true` is left out) */
export const artworks: Artwork[] = allArtworks.filter((work) => !work.hidden);

export function artworkMapFromList(list: typeof artworks) {
  return new Map(list.map((a) => [a.id, a]));
}
