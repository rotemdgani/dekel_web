import women2_framed from '@/assets/women2_framed.webp';
import business_pleasure from '@/assets/Business_&_Pleasure.webp';
import price_of_beauty from '@/assets/The Price of Beauty.webp';
import education from '@/assets/Education.webp';
import dove_among_crawl from '@/assets/dove_among_crawls.webp';
import b2 from '@/assets/b2.webp';
import telaviv_rocket from '@/assets/telaviv_rocket.webp';
import nyt_cover_earth from '@/assets/nyt_cover_earth.webp';
import shagal_over_the_city from '@/assets/shagal_over_the_city.webp';
import news_vs_bussines from '@/assets/news_vs_bussines.webp';
import red_gift_yellow_card from '@/assets/red_gift_yellow_card.webp';
import orange_sky from '@/assets/orange_sky.webp';
import pink_line from '@/assets/pink_line.webp';
import pink_fileds from '@/assets/pink_fileds.webp';
import paved_by_heroes from '@/assets/Paved by Heroes.webp';
import ooo from '@/assets/ooo.webp';
import profile_vintage from '@/assets/profile_vintage.webp';

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
  // The Good Times series
  {
    id: 25,
    title: "Orange Sky",
    category: "the-good-times",
    price: 2500,
    medium: "Acrylic on Canvas",
    dimensions: "120\" x 80\"",
    image: orange_sky,
    description: "",
    availability: "SOLD",
    isLimited: false,
  },
  {
    id: 24,
    title: "OOO",
    category: "the-good-times",
    price: 2500,
    medium: "Acrylic on Canvas",
    dimensions: "120\" x 80\"",
    image: ooo,
    description: "",
    availability: "SOLD",
    isLimited: false,
  },
  {
    id: 26,
    title: "Pink Fields",
    category: "the-good-times",
    price: 2500,
    medium: "Acrylic on Canvas",
    dimensions: "120\" x 80\"",
    image: pink_fileds,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 27,
    title: "Headline Erased",
    category: "the-good-times",
    price: 2500,
    medium: "Acrylic on Canvas",
    dimensions: "120\" x 80\"",
    image: pink_line,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  // Based on a True Story series
  {
    id: 11,
    title: "Dove Among Crows",
    category: "based-on-a-true-story",
    price: 2500,
    medium: "Mixed media and acrylic paints",
    dimensions: "110\" x 100\"",
    image: dove_among_crawl,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 7,
    title: "Peace Bomber",
    category: "based-on-a-true-story",
    price: 2500,
    medium: "Mixed media and acrylic paints",
    dimensions: "110\" x 100\"",
    image: b2,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 14,
    title: "Blinded Earth",
    category: "based-on-a-true-story",
    price: 1900,
    medium: "Mixed media and acrylic paints",
    dimensions: "60\" x 80\"",
    image: nyt_cover_earth,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 13,
    title: "Broken Departure",
    category: "based-on-a-true-story",
    price: 2100,
    medium: "Mixed media and acrylic paints",
    dimensions: "110\" x 100\" - Includes black wooden frame with glass",
    image: news_vs_bussines,
    description: "",
    availability: "Available",
    isLimited: false,
  },
  {
    id: 15,
    title: "Over the Headlines (Homage to Marc Chagall)",
    category: "based-on-a-true-story",
    price: 2500,
    medium: "Mixed media and acrylic paints",
    dimensions: "60\" x 80\"",
    image: shagal_over_the_city,
    description: "",
    availability: "SOLD",
    isLimited: false,
  },
  {
    id: 38,
    title: "Paved by Heroes",
    category: "based-on-a-true-story",
    price: 2500,
    medium: "Mixed media and acrylic on newspaper",
    dimensions: "90\" × 110\"",
    image: paved_by_heroes,
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
    medium: "Acrylic and newspaper collage on wood",
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
    medium: "Acrylic and newspaper collage on wood",
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
    medium: "Acrylic and newspaper collage on wood",
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
