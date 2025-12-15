import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import "./ImageSlider.css";

// Use Vite's glob import to get all numbered images
const imageModules = import.meta.glob<{ default: string }>('@/assets/[0-9]*.webp', { eager: true });

// Images to exclude
const EXCLUDED_IMAGES = [0, 1, 2, 6, 7, 8, 12, 17];

// Extract and sort images by their numeric filename
const loadImages = (): string[] => {
  const images: { num: number; url: string }[] = [];
  let image21: { num: number; url: string } | null = null;
  
  // Process all imported images
  Object.entries(imageModules).forEach(([path, module]) => {
    // Extract number from path (e.g., "/src/assets/5.webp" -> 5)
    const match = path.match(/(\d+)\.webp$/);
    if (match && module.default) {
      const num = parseInt(match[1], 10);
      // Include images between 0-21 and exclude specified images
      if (num >= 0 && num <= 21 && !EXCLUDED_IMAGES.includes(num)) {
        if (num === 21) {
          // Store 21.webp separately to place it first
          image21 = { num, url: module.default };
        } else {
          images.push({ num, url: module.default });
        }
      }
    }
  });
  
  // Sort by number
  images.sort((a, b) => a.num - b.num);
  
  // Place 21.webp first if it exists
  if (image21) {
    return [image21.url, ...images.map((img) => img.url)];
  }
  
  // Return URLs
  return images.map((img) => img.url);
};

const ImageSlider = () => {
  const isMobile = useIsMobile();
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileImage, setMobileImage] = useState<string | null>(null);
  const nextImageRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load images on mount
  useEffect(() => {
    const loadedImages = loadImages();
    setImages(loadedImages);
    
    // Load 0.webp for mobile
    const loadMobileImage = async () => {
      try {
        const image0Module = await import('@/assets/0.webp');
        if (image0Module.default) {
          setMobileImage(image0Module.default);
        }
      } catch (error) {
        // Silently ignore if 0.webp doesn't exist
      }
    };
    
    if (isMobile) {
      loadMobileImage();
    }
  }, [isMobile]);

  // Preload next image
  useEffect(() => {
    if (images.length <= 1 || !nextImageRef.current) return;
    
    const nextIdx = (currentIndex + 1) % images.length;
    nextImageRef.current.src = images[nextIdx];
  }, [images, currentIndex]);

  // Auto-rotate images with crossfade transition (desktop only)
  useEffect(() => {
    if (isMobile || images.length === 0 || images.length === 1) return;

    const FADE_DURATION = 1500; // 1500ms - within 1200-1800ms range

    const transitionToNext = async () => {
      const nextIdx = (currentIndex + 1) % images.length;
      
      // Preload and decode next image before starting transition
      if (nextImageRef.current) {
        nextImageRef.current.src = images[nextIdx];
        try {
          await nextImageRef.current.decode();
        } catch (error) {
          // If decode fails, continue anyway
        }
      }

      // Now start the single continuous crossfade - both images transition simultaneously
      setIsTransitioning(true);
      
      // After transition completes, update current index only
      setTimeout(() => {
        setCurrentIndex(nextIdx);
        setIsTransitioning(false);
      }, FADE_DURATION);
    };

    intervalRef.current = setInterval(transitionToNext, 7000); // 7 seconds interval

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, currentIndex, isMobile]);

  // Mobile: show static 0.webp only
  if (isMobile) {
    if (!mobileImage) {
      return null;
    }
    
    return (
      <div className="image-slider">
        <div className="image-slider-slide">
          <img
            src={mobileImage}
            alt="Hero image"
            className="image-slider-image image-slider-image--current"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  // Desktop: rotating hero with crossfade
  if (images.length === 0) {
    return null;
  }

  // If only one image, show it without transition
  if (images.length === 1) {
    return (
      <div className="image-slider">
        <div className="image-slider-slide">
          <img
            src={images[0]}
            alt="Hero image"
            className="image-slider-image image-slider-image--current"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  const nextIdx = (currentIndex + 1) % images.length;

  return (
    <div className="image-slider">
      <div className="image-slider-slide">
        {/* Current image - fades out during transition */}
        <img
          key={`current-${currentIndex}`}
          src={images[currentIndex]}
          alt="Hero image"
          className={`image-slider-image image-slider-image--current ${isTransitioning ? "fade-out" : ""}`}
          loading={currentIndex === 0 ? "eager" : "lazy"}
        />
        {/* Next image - fades in during transition, preloaded and decoded */}
        <img
          ref={nextImageRef}
          key={`next-${nextIdx}`}
          src={images[nextIdx]}
          alt="Hero image"
          className={`image-slider-image image-slider-image--next ${isTransitioning ? "fade-in" : ""}`}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ImageSlider;

