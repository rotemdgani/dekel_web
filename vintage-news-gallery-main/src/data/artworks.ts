import m_and_a from '@/assets/M&A.webp';
import gia_certified from '@/assets/GIA Certified.webp';
import class_img from '@/assets/Class.webp';
import constrained_bloom_rose from '@/assets/Constrained Bloom_ROSE.webp';
import constrained_bloom_anemone from '@/assets/Constrained Bloom_Anemone.webp';
import date_2103 from '@/assets/21.03.2025.webp';
import split_page from '@/assets/Split Page.webp';
import in_the_loop from '@/assets/In_the_loop.webp';
import nightlife from '@/assets/Nightlife.webp';
import light_study from '@/assets/Light Study.webp';
import bride_under_attack from '@/assets/bride_under_attack.webp';
import headline from '@/assets/Headline.webp';
import loading_img from '@/assets/Loading....webp';
import read_more_img from '@/assets/Read More....webp';
import before_coffee from '@/assets/Before coffee.webp';
import username_img from '@/assets/Username.webp';
import scrabble from '@/assets/Scrabble.webp';
import to_be_continued from '@/assets/To be continued.webp';
import ceo from '@/assets/CEO.webp';
import taped_orchid from '@/assets/Taped [Orchid].png';
import legacy from '@/assets/Legacy.webp';

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

export const artworks: Artwork[] = [
  {
    id: 39,
    title: 'Taped [Rose]',
    category: 'flowers',
    price: 0,
    medium: 'Mixed media on wood',
    dimensions: '71 x 88 cm',
    image: constrained_bloom_rose,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 40,
    title: 'Taped Anemone',
    category: 'flowers',
    price: 0,
    medium: 'Mixed media on wood',
    dimensions: '69×81 cm',
    image: constrained_bloom_anemone,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 35,
    title: 'M&A',
    category: 'face-card',
    price: 1500,
    medium: 'Mixed media on wood',
    dimensions: '51 x 61 cm including frame',
    image: m_and_a,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 37,
    title: 'Class',
    category: 'face-card',
    price: 900,
    medium: 'Mixed media on wood',
    dimensions: '41 x 45 cm',
    image: class_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 41,
    title: '21.03.2025',
    category: 'under-layers-rope',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '35 x 57 cm',
    image: date_2103,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 42,
    title: 'Split Page',
    category: 'under-layers-rope',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '35 x 57 cm',
    image: split_page,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 36,
    title: 'GIA Certified',
    category: 'face-card',
    price: 1200,
    medium: 'Mixed media on wood',
    dimensions: '43 x 45 cm including frame',
    image: gia_certified,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 48,
    title: 'Bride, Interrupted',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '90 x 110 cm',
    image: bride_under_attack,
    description: '2025',
    availability: 'Unavailable',
    isLimited: false,
  },
  {
    id: 45,
    title: 'Nightlife',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '50 x 75 cm',
    image: nightlife,
    description: '2025',
    availability: 'Unavailable',
    isLimited: false,
  },
  {
    id: 46,
    title: 'Light Study',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '50 x 75 cm',
    image: light_study,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 49,
    title: 'Headline',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '120 x 80 cm',
    image: headline,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 50,
    title: 'Loading...',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '120 x 80 cm',
    image: loading_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 44,
    title: 'Cut and Paste',
    category: 'in-the-loop',
    price: 0,
    medium: 'Mixed media on canvas on wood',
    dimensions: '52×80 cm',
    image: in_the_loop,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 51,
    title: 'Read More...',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '90 x 110 cm',
    image: read_more_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 52,
    title: 'Before Coffee',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '90 x 110 cm',
    image: before_coffee,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 53,
    title: 'Username',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '59 x 75 cm',
    image: username_img,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 54,
    title: 'Scrabble',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '36 x 29 cm',
    image: scrabble,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 55,
    title: 'To be continued',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '120 x 80 cm',
    image: to_be_continued,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 56,
    title: 'CEO',
    category: 'other',
    price: 0,
    medium: 'Mixed media on canvas',
    dimensions: '90 x 70 cm',
    image: ceo,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 57,
    title: 'Taped [Orchid]',
    category: 'flowers',
    price: 0,
    medium: '',
    dimensions: '',
    image: taped_orchid,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
  {
    id: 59,
    title: 'Legacy',
    category: 'other',
    price: 0,
    medium: 'Mixed media on wood',
    dimensions: '60 x 80 cm including frame',
    image: legacy,
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
];
