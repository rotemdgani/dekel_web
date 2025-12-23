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
import city from '@/assets/City.webp';
import light_study from '@/assets/Light Study.webp';
import bride_under_attack from '@/assets/bride_under_attack.webp';
import over_the_city from '@/assets/over_the_city.webp';

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
  // 1. Taped Rose
  {
    id: 39,
    title: "Taped Rose",
    category: "flowers",
    price: 0,
    medium: "Mixed media on wood",
    dimensions: "65 x 50 cm",
    image: constrained_bloom_rose,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 2. Taped Anemone
  {
    id: 40,
    title: "Taped Anemone",
    category: "flowers",
    price: 0,
    medium: "Mixed media on wood",
    dimensions: "60 x 48 cm",
    image: constrained_bloom_anemone,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 3. In the Loop
  {
    id: 44,
    title: "In the Loop",
    category: "in-the-loop",
    price: 0,
    medium: "Mixed media on wood",
    dimensions: "30 x 60 cm",
    image: in_the_loop,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 4. Business & Pleasure
  {
    id: 35,
    title: "Business & Pleasure",
    category: "face-card",
    price: 1500,
    medium: "Mixed media on wood",
    dimensions: "60\" x 80\" - Includes the frame",
    image: business_pleasure,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 5. Education
  {
    id: 37,
    title: "Erased",
    category: "face-card",
    price: 900,
    medium: "Mixed media on wood",
    dimensions: "30\" x 40\" - Includes the frame",
    image: education,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 6. Between Layers
  {
    id: 41,
    title: "Between Layers",
    category: "under-layers-rope",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "35 x 57 cm",
    image: under_layers,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 7. Subtext
  {
    id: 43,
    title: "Subtext",
    category: "unreadable",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "50 x 75 cm",
    image: unreadable,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 8. The Price of Beauty
  {
    id: 36,
    title: "Beauty",
    category: "face-card",
    price: 1200,
    medium: "Mixed media on wood",
    dimensions: "40\" x 60\" - Includes the frame",
    image: price_of_beauty,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 9. Split Page
  {
    id: 42,
    title: "Split Page",
    category: "under-layers-rope",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "35 x 57 cm",
    image: on_a_rope,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 10. Bride Interrupted
  {
    id: 48,
    title: "Bride, Interrupted",
    category: "other",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "90 x 110 cm",
    image: bride_under_attack,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 11. City Interrupted
  {
    id: 45,
    title: "City, Interrupted",
    category: "other",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "50 x 75 cm",
    image: city,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 12. Light Study
  {
    id: 46,
    title: "Light Study",
    category: "other",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "50 x 75 cm",
    image: light_study,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
  // 13. Over the City
  {
    id: 47,
    title: "Over the city Homage to Marc Chagall",
    category: "other",
    price: 0,
    medium: "Mixed media on canvas",
    dimensions: "60 x 80 cm",
    image: over_the_city,
    description: "2025",
    availability: "Available",
    isLimited: false,
  },
];
