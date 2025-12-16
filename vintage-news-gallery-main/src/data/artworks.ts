import business_pleasure from '@/assets/Business_&_Pleasure.webp';
import price_of_beauty from '@/assets/The Price of Beauty.webp';
import education from '@/assets/Education.webp';
import red_gift_yellow_card from '@/assets/red_gift_yellow_card.webp';
import profile_vintage from '@/assets/profile_vintage.webp';
import constrained_bloom_rose from '@/assets/Constrained Bloom_ROSE.webp';
import constrained_bloom_anemone from '@/assets/Constrained Bloom_Anemone.webp';
import under_layers from '@/assets/Under_Layers.webp';
import on_a_rope from '@/assets/On_a_rope.webp';
import unreadable from '@/assets/UNREADABLE.webp';
import in_the_loop from '@/assets/In_the_loop.webp';

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
  // Flowers series (first on the site)
  {
    id: 39,
    title: "Taped Rose",
    category: "flowers",
    price: 0,
    medium: "Mixed media on wood",
    dimensions: "",
    image: constrained_bloom_rose,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 40,
    title: "Taped Anemone",
    category: "flowers",
    price: 0,
    medium: "Mixed media on wood",
    dimensions: "",
    image: constrained_bloom_anemone,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  // Between Layers + Split Page section
  {
    id: 41,
    title: "Between Layers",
    category: "under-layers-rope",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "",
    image: under_layers,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 42,
    title: "Split Page",
    category: "under-layers-rope",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "",
    image: on_a_rope,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  // Subtext (alone)
  {
    id: 43,
    title: "Subtext",
    category: "unreadable",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "",
    image: unreadable,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  // In the Loop
  {
    id: 44,
    title: "In the Loop",
    category: "in-the-loop",
    price: 0,
    medium: "Mixed media on wood",
    dimensions: "",
    image: in_the_loop,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  // Face Card series
  {
    id: 2,
    title: "Side Note",
    category: "face-card",
    price: 900,
    medium: "Newspaper collage with acrylic",
    dimensions: "27.9\" x 35.6\" - Unframed (frame not included)",
    image: profile_vintage,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 35,
    title: "Business & Pleasure",
    category: "face-card",
    price: 1500,
    medium: "Mixed media on wood",
    dimensions: "60\" x 80\" - Includes the frame",
    image: business_pleasure,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 37,
    title: "Education",
    category: "face-card",
    price: 900,
    medium: "Mixed media on wood",
    dimensions: "30\" x 40\" - Includes the frame",
    image: education,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 36,
    title: "The Price of Beauty",
    category: "face-card",
    price: 1200,
    medium: "Mixed media on wood",
    dimensions: "40\" x 60\" - Includes the frame",
    image: price_of_beauty,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  // Present series
  {
    id: 19,
    title: "To You",
    category: "present",
    price: 1100,
    medium: "Newspaper collage and distressed acrylic on canvas",
    dimensions: "60\" x 80\" x 3\"",
    image: red_gift_yellow_card,
    description: "",
    availability: "Available",
    isLimited: false,
  },
];
