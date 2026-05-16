import m_and_a from '@/assets/M&A.webp';
import gia_certified from '@/assets/GIA Certified.webp';
import class_img from '@/assets/Class.webp';
import constrained_bloom_rose from '@/assets/Constrained Bloom_ROSE.webp';
import constrained_bloom_anemone from '@/assets/Constrained Bloom_Anemone.webp';
import date_2103 from '@/assets/21.03.2025.webp';
import split_page from '@/assets/Split Page.webp';
import subtext_img from '@/assets/Subtext.webp';
import cut_artwork from '@/assets/Cut.webp';
import paste_artwork from '@/assets/Paste.webp';
import nightlife from '@/assets/Nightlife.webp';
import headline from '@/assets/Headline.webp';
import loading_img from '@/assets/Loading....webp';
import read_more_img from '@/assets/Read More....webp';
import before_coffee from '@/assets/Before coffee.webp';
import username_img from '@/assets/Username.webp';
import subscriber_img from '@/assets/Subscriber.webp';
import scrabble from '@/assets/Scrabble.webp';
import to_be_continued from '@/assets/To be continued.webp';
import ceo from '@/assets/CEO.webp';
import taped_orchid from '@/assets/Taped [Orchid].png';
import legacy from '@/assets/Legacy.webp';
import archive_img from '@/assets/Archive.webp';
import earth_img from '@/assets/Earth.webp';
import swords_img from '@/assets/Swords to Plowshares.webp';

/** Used for contact / schema; not shown as price on site */
const NO_PRICE = 0;

export interface Artwork {
  id: number;
  title: string;
  category: string;
  price: number;
  medium: string;
  dimensions: string;
  image: string;
  description: string;
  availability: string;
  isLimited: boolean;
  year?: string;
}

/** Single source of truth for all works on the redesigned site */
export const artworks: Artwork[] = [
  {
    id: 41,
    title: '21.03.2025',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '35 x 57 cm',
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
    dimensions: '40 x 52 cm',
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
    dimensions: '90 x 110 cm',
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
    dimensions: '90 x 70 cm',
    image: ceo,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 37,
    title: 'Class',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '41 x 45 cm',
    image: class_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 49,
    title: 'Headline',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '120 x 80 cm',
    image: headline,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 50,
    title: 'Loading',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '120 x 80 cm',
    image: loading_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 51,
    title: 'Read More',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '90 x 110 cm',
    image: read_more_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 43,
    title: 'Subtext',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '50 x 75 cm',
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
    dimensions: '120 x 80 cm',
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
    dimensions: '59 x 75 cm',
    image: username_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 65,
    title: 'Subscriber',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '90 x 110 cm',
    image: subscriber_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 63,
    title: 'Cut',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas on wood',
    dimensions: '52×80 cm',
    image: cut_artwork,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 61,
    title: 'Earth',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '60 x 80 cm',
    image: earth_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 64,
    title: 'Paste',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas on wood',
    dimensions: '52×80 cm',
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
    dimensions: '35 x 57 cm',
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
    dimensions: '56 x 37 cm',
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
    dimensions: '69×81 cm',
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
    dimensions: '43 x 45 cm including frame',
    image: gia_certified,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 59,
    title: 'Legacy',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on wood',
    dimensions: '60 x 80 cm including frame',
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
    dimensions: '51 x 61 cm including frame',
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
    dimensions: '50 x 75 cm',
    image: nightlife,
    description: '2025',
    availability: 'Unavailable',
    isLimited: false,
  },
  {
    id: 54,
    title: 'Scrabble',
    category: 'gallery',
    price: NO_PRICE,
    medium: 'Mixed media on canvas',
    dimensions: '36 x 29 cm',
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
    dimensions: '[dimensions TBD]',
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
    dimensions: '71 x 88 cm',
    image: constrained_bloom_rose,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
];

export function artworkMapFromList(list: typeof artworks) {
  return new Map(list.map((a) => [a.id, a]));
}
