import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import {
  explicitGalleryItemsForSlug,
  type ExhibitionGalleryItem,
} from "@/data/exhibitionGalleryAssets";
import "./EventGallery.css";

interface EventGalleryProps {
  eventSlug: string;
  eventTitle: string;
}

const galleryVideoProps = {
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
  preload: "metadata" as const,
};

function slideLabel(item: ExhibitionGalleryItem, index: number, title: string) {
  if (item.kind === "video") {
    return `${title} — Video`;
  }
  return `${title} — Image ${index + 1}`;
}

const EventGallery = ({ eventSlug, eventTitle }: EventGalleryProps) => {
  const [items, setItems] = useState<ExhibitionGalleryItem[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const explicit = explicitGalleryItemsForSlug(eventSlug);
    if (explicit?.length) {
      setItems(explicit);
      return;
    }

    const loadEventImages = () => {
      try {
        const eventsModules = import.meta.glob<{ default: string }>(
          "@/assets/events/*.{webp,WEBP}",
          { eager: true },
        );

        const rootModules = import.meta.glob<{ default: string }>(
          "@/assets/*.{webp,WEBP}",
          { eager: true },
        );

        const allModules = { ...eventsModules, ...rootModules };
        const loadedImages: string[] = [];

        const normalizedSlug = eventSlug.toLowerCase();
        const slugWithSpaces = normalizedSlug.replace(/-/g, " ");
        const slugWithHyphens = normalizedSlug;
        const slugWords = normalizedSlug.split(/-|\s+/).filter((w) => w.length > 0);

        const exactHyphenPattern = new RegExp(
          `^${slugWithHyphens.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(_\\d+)?$`,
          "i",
        );
        const exactSpacePattern = new RegExp(
          `^${slugWithSpaces.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(_\\d+)?$`,
          "i",
        );

        Object.entries(allModules).forEach(([path, module]) => {
          const filename = path.split("/").pop() || path.split("\\").pop() || "";

          if (!filename.match(/\.webp$/i)) {
            return;
          }

          const nameWithoutExt = filename.replace(/\.webp$/i, "").toLowerCase();
          const matchesExactHyphen = exactHyphenPattern.test(nameWithoutExt);
          const matchesExactSpace = exactSpacePattern.test(nameWithoutExt);
          const containsAllWords =
            slugWords.length > 0 &&
            slugWords.every((word) => nameWithoutExt.includes(word));
          const firstWordMatch =
            slugWords.length > 0 && nameWithoutExt.includes(slugWords[0]);

          if (
            (matchesExactHyphen ||
              matchesExactSpace ||
              (containsAllWords && firstWordMatch)) &&
            module.default
          ) {
            loadedImages.push(module.default);
          }
        });

        loadedImages.sort();

        if (loadedImages.length > 0) {
          setItems(loadedImages.map((src) => ({ kind: "image" as const, src })));
        }
      } catch (error) {
        console.error(`EventGallery: Error loading images for event: ${eventSlug}`, error);
      }
    };

    loadEventImages();
  }, [eventSlug]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsZoomed(false);
    lightboxVideoRef.current?.pause();
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const current = items[lightboxIndex];
    if (current?.kind === "video") return;

    const img = e.currentTarget
      .closest(".event-gallery-lightbox")
      ?.querySelector(".event-gallery-lightbox-image") as HTMLImageElement | null;
    if (img) {
      const canZoom = img.getAttribute("data-can-zoom") === "true";
      if (canZoom || isZoomed) {
        setIsZoomed(!isZoomed);
      }
    }
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, items.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const current = items[lightboxIndex];
    if (current?.kind !== "video") {
      lightboxVideoRef.current?.pause();
      return;
    }
    const video = lightboxVideoRef.current;
    if (!video) return;
    void video.play().catch(() => undefined);
  }, [lightboxOpen, lightboxIndex, items]);

  if (items.length === 0) {
    return null;
  }

  const currentItem = items[lightboxIndex];

  return (
    <>
      <div className={`event-gallery ${lightboxOpen ? "event-gallery--disabled" : ""}`}>
        <div className="event-gallery-grid">
          {items.map((item, index) => (
            <div
              key={`${item.kind}-${item.src}`}
              className="event-gallery-item"
              onClick={() => openLightbox(index)}
            >
              {item.kind === "video" ? (
                <video
                  src={item.src}
                  className="event-gallery-image event-gallery-video"
                  aria-label={slideLabel(item, index, eventTitle)}
                  {...galleryVideoProps}
                />
              ) : (
                <img
                  src={item.src}
                  alt={slideLabel(item, index, eventTitle)}
                  className="event-gallery-image"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
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
                prevSlide(e);
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>
            <button
              className="event-gallery-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide(e);
              }}
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
            {currentItem?.kind === "image" ? (
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
            ) : null}
            <div
              className="event-gallery-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem?.kind === "video" ? (
                <video
                  ref={lightboxVideoRef}
                  src={currentItem.src}
                  className="event-gallery-lightbox-video"
                  {...galleryVideoProps}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={currentItem.src}
                  alt={slideLabel(currentItem, lightboxIndex, eventTitle)}
                  className={`event-gallery-lightbox-image ${isZoomed ? "event-gallery-lightbox-image--zoomed" : ""}`}
                  onClick={(e) => e.stopPropagation()}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const naturalWidth = img.naturalWidth;
                    const naturalHeight = img.naturalHeight;
                    const viewportWidth = window.innerWidth * 0.9;
                    const viewportHeight = window.innerHeight * 0.9;
                    const canZoom =
                      naturalWidth <= viewportWidth &&
                      naturalHeight <= viewportHeight;
                    if (!canZoom && isZoomed) {
                      setIsZoomed(false);
                    }
                    img.setAttribute("data-can-zoom", canZoom.toString());
                  }}
                />
              )}
              {items.length > 1 ? (
                <div className="event-gallery-lightbox-counter">
                  {lightboxIndex + 1} / {items.length}
                </div>
              ) : null}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default EventGallery;
