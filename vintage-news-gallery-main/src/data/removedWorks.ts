/**
 * Works removed from the public catalogue but kept for later restore.
 * Not included in WORKS_SECTIONS / /works.
 */

import type { Artwork } from './artworks';

/** Repo filename has a typo ("behaind"); this is The Story Behind the Story.mp4 */
import story_behind_the_story_video from '@/assets/the_story_behaind_the_story.mp4';

export const REMOVED_WORKS: Artwork[] = [
  {
    id: 73,
    title: 'The Story Behind the Story',
    category: 'gallery',
    price: 0,
    medium: 'Video',
    dimensions: '—',
    image: '',
    video: story_behind_the_story_video,
    mediaType: 'video',
    description: '2025',
    availability: 'Available',
    isLimited: false,
  },
];
