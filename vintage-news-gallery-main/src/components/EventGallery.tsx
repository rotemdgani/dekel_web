import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { explicitGalleryImagesForSlug } from "@/data/exhibitionGalleryAssets";
import "./EventGallery.css";

interface EventGalleryProps {
  eventSlug: string;
  eventTitle: string;
}

const EventGallery = ({ eventSlug, eventTitle }: EventGalleryProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const explicit = explicitGalleryImagesForSlug(eventSlug);
    if (explicit?.length) {
      setImages(explicit);
      return;
    }

    // Use Vite's glob import to load images from events folder or root assets
    // Images are named: <slug>.webp or <slug>_1.webp, <slug>_2.webp, etc.
    const loadEventImages = () => {
      try {
        // Try events folder first, then fall back to root assets folder
        // Prioritize WEBP files
        const eventsModules = import.meta.glob<{ default: string }>(
          '@/assets/events/*.{webp,WEBP}',
          { eager: true }
        );
        
        const rootModules = import.meta.glob<{ default: string }>(
          '@/assets/*.{webp,WEBP}',
          { eager: true }
        );

        // Combine both sources
        const allModules = { ...eventsModules, ...rootModules };

        const loadedImages: string[] = [];
        
        // Normalize slug for matching: convert to lowercase, replace hyphens with spaces
        // This helps match old files like "Art Gathering_0.webp" with slug "art-gathering"
        const normalizedSlug = eventSlug.toLowerCase();
        const slugWithSpaces = normalizedSlug.replace(/-/g, ' ');
        const slugWithHyphens = normalizedSlug;
        
        // Split slug into words for flexible matching
        const slugWords = normalizedSlug.split(/-|\s+/).filter(w => w.length > 0);
        
        // Create patterns for matching
        const exactHyphenPattern = new RegExp(`^${slugWithHyphens.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(_\\d+)?$`, 'i');
        const exactSpacePattern = new RegExp(`^${slugWithSpaces.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(_\\d+)?$`, 'i');
        
        Object.entries(allModules).forEach(([path, module]) => {
          // Extract filename from path (Vite returns paths like "/src/assets/filename.webp")
          const filename = path.split('/').pop() || path.split('\\').pop() || '';
          
          // Only process WEBP files
          if (!filename.match(/\.webp$/i)) {
            return;
          }
          
          // Remove extension and convert to lowercase for comparison
          const nameWithoutExt = filename.replace(/\.webp$/i, '').toLowerCase();
          
          // Try multiple matching strategies
          const matchesExactHyphen = exactHyphenPattern.test(nameWithoutExt);
          const matchesExactSpace = exactSpacePattern.test(nameWithoutExt);
          
          // More flexible: check if filename contains all slug words (order doesn't matter)
          const containsAllWords = slugWords.length > 0 && slugWords.every(word => nameWithoutExt.includes(word));
          
          // Also check if the first significant word matches (for titles with extra text)
          const firstWordMatch = slugWords.length > 0 && nameWithoutExt.includes(slugWords[0]);
          
          // Match if any of these conditions are true
          if ((matchesExactHyphen || matchesExactSpace || (containsAllWords && firstWordMatch)) && module.default) {
            loadedImages.push(module.default);
          }
        });

        // Sort alphabetically by filename
        loadedImages.sort();

        if (loadedImages.length > 0) {
          setImages(loadedImages);
        }
      } catch (error) {
        console.error(`EventGallery: Error loading images for event: ${eventSlug}`, error);
      }
    };

    loadEventImages();
  }, [eventSlug, eventTitle]);

  // Note: We do NOT lock body scroll - allow background page to scroll
  // while the modal stays fixed on screen

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false); // Reset zoom when opening
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsZoomed(false);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only allow zoom if image fits at 100% size
    const img = e.currentTarget.closest('.event-gallery-lightbox')?.querySelector('.event-gallery-lightbox-image') as HTMLImageElement;
    if (img) {
      const canZoom = img.getAttribute('data-can-zoom') === 'true';
      if (canZoom || isZoomed) {
        setIsZoomed(!isZoomed);
      }
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false); // Reset zoom when changing images
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false); // Reset zoom when changing images
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  // Don't render if no images
  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className={`event-gallery ${lightboxOpen ? 'event-gallery--disabled' : ''}`}>
        <div className="event-gallery-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className="event-gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`${eventTitle} - Image ${index + 1}`}
                className="event-gallery-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - Rendered via Portal to document.body */}
      {lightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={lightboxRef}
          className="event-gallery-lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            className="event-gallery-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage(e);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>
          <button
            className="event-gallery-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage(e);
            }}
            aria-label="Next image"
          >
            <ChevronRight />
          </button>
          <button
            className="event-gallery-lightbox-zoom"
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom(e);
            }}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            title={isZoomed ? "Zoom out to fit" : "Zoom to actual size"}
          >
            {isZoomed ? <ZoomOut /> : <ZoomIn />}
          </button>
          <div 
            className="event-gallery-lightbox-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`${eventTitle} - Image ${lightboxIndex + 1}`}
              className={`event-gallery-lightbox-image ${isZoomed ? 'event-gallery-lightbox-image--zoomed' : ''}`}
              onClick={(e) => e.stopPropagation()} /* Prevent image click from closing */
              onLoad={(e) => {
                // Check if image at 100% size fits in viewport
                const img = e.currentTarget;
                const naturalWidth = img.naturalWidth;
                const naturalHeight = img.naturalHeight;
                const viewportWidth = window.innerWidth * 0.90; // 90vw
                const viewportHeight = window.innerHeight * 0.90; // 90vh
                
                // If image is smaller than viewport, allow zoom
                // Otherwise, disable zoom button
                const canZoom = naturalWidth <= viewportWidth && naturalHeight <= viewportHeight;
                if (!canZoom && isZoomed) {
                  setIsZoomed(false);
                }
                // Store canZoom in data attribute for CSS if needed
                img.setAttribute('data-can-zoom', canZoom.toString());
              }}
            />
            {images.length > 1 && (
              <div className="event-gallery-lightbox-counter">
                {lightboxIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default EventGallery;
