import { useCallback, useEffect, useMemo } from "react";
import type { Artwork } from "@/data/artworks";
import { artworkAlt, isVideoArtwork } from "@/data/artworks";
import type { WorksSectionSlug } from "@/data/worksSections";
import {
  displayYear,
  lightboxDimensionLine,
  lightboxMediumLine,
} from "@/lib/workDisplay";
import "./WorksLightbox.css";

/** Shared lightbox media — works catalogue and exhibition galleries */
export interface LightboxItem {
  id: number | string;
  title: string;
  image: string;
  mediaType?: "image" | "video";
  video?: string;
  medium?: string;
  dimensions?: string;
  description?: string;
  /** Present when opened from the works catalogue (enables Inquire) */
  artwork?: Artwork;
}

export interface LightboxNavigation {
  current: LightboxItem;
  items: LightboxItem[];
  /** Works section slug when navigating the catalogue */
  sectionSlug?: WorksSectionSlug;
}

interface WorksLightboxProps {
  navigation: LightboxNavigation | null;
  onClose: () => void;
  onNavigate: (item: LightboxItem) => void;
  onClickInquire?: () => void;
}

function itemIsVideo(item: LightboxItem): boolean {
  if (item.artwork) return isVideoArtwork(item.artwork);
  return item.mediaType === "video" && typeof item.video === "string" && item.video.length > 0;
}

export function artworkToLightboxItem(work: Artwork): LightboxItem {
  return {
    id: work.id,
    title: work.title,
    image: work.image,
    mediaType: work.mediaType,
    video: work.video,
    medium: work.medium,
    dimensions: work.dimensions,
    description: work.description,
    artwork: work,
  };
}

const WorksLightbox = ({
  navigation,
  onClose,
  onNavigate,
  onClickInquire,
}: WorksLightboxProps) => {
  const items = navigation?.items ?? [];

  const sectionIndex = navigation
    ? items.findIndex((w) => w.id === navigation.current.id)
    : -1;
  const prevWork =
    sectionIndex > 0 ? items[sectionIndex - 1] : null;
  const nextWork =
    sectionIndex >= 0 && sectionIndex < items.length - 1
      ? items[sectionIndex + 1]
      : null;

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!navigation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && prevWork) onNavigate(prevWork);
      if (e.key === "ArrowRight" && nextWork) onNavigate(nextWork);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, close, onNavigate, prevWork, nextWork]);

  useEffect(() => {
    document.body.style.overflow = navigation ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navigation]);

  const preloadUrls = useMemo(() => {
    if (!navigation) return [];
    const urls: string[] = [];
    if (prevWork && !itemIsVideo(prevWork)) urls.push(prevWork.image);
    if (nextWork && !itemIsVideo(nextWork)) urls.push(nextWork.image);
    return urls;
  }, [navigation, prevWork, nextWork]);

  useEffect(() => {
    preloadUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [preloadUrls]);

  if (!navigation) return null;

  const w = navigation.current;
  const isVideo = itemIsVideo(w);
  const yearLine = w.artwork
    ? displayYear(w.artwork)
    : (w.description ?? "").trim();
  const sizeLine = w.artwork
    ? lightboxDimensionLine(w.artwork)
    : (w.dimensions ?? "").trim();
  const techniqueLine = w.artwork
    ? lightboxMediumLine(w.artwork)
    : (w.medium ?? "").trim();
  const altText = w.artwork
    ? artworkAlt(w.artwork)
    : w.medium
      ? `${w.title}, ${w.medium}`
      : w.title;

  return (
    <div
      className="wl-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={w.title}
    >
      <button type="button" className="wl-close" aria-label="Close" onClick={close}>
        ×
      </button>

      {(prevWork || nextWork) && (
        <>
          {prevWork && (
            <button
              type="button"
              className="wl-arrow wl-arrow-left"
              aria-label="Previous"
              onClick={() => onNavigate(prevWork)}
            >
              ←
            </button>
          )}
          {nextWork && (
            <button
              type="button"
              className="wl-arrow wl-arrow-right"
              aria-label="Next"
              onClick={() => onNavigate(nextWork)}
            >
              →
            </button>
          )}
        </>
      )}

      <button
        type="button"
        className="wl-backdrop-hit"
        aria-label="Close"
        tabIndex={-1}
        onClick={close}
      />

      <div className="wl-panel">
        <div className="wl-image-wrap">
          {isVideo && w.video ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              key={String(w.id)}
              className="wl-img wl-video"
              src={w.video}
              controls
              playsInline
              onClick={(ev) => ev.stopPropagation()}
            />
          ) : (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              src={w.image}
              alt={altText}
              className="wl-img"
              onClick={(ev) => ev.stopPropagation()}
              draggable={false}
            />
          )}
        </div>

        <div className="wl-caption">
          <h2 className="wl-title">{w.title}</h2>
          <div className="wl-details" role="group" aria-label="Details">
            {yearLine.length > 0 ? (
              <p className="wl-line wl-line-year">{yearLine}</p>
            ) : null}
            {sizeLine.length > 0 ? (
              <p className="wl-line">{sizeLine}</p>
            ) : null}
            {techniqueLine.length > 0 ? (
              <p className="wl-line">{techniqueLine}</p>
            ) : null}
          </div>
          {onClickInquire && w.artwork ? (
            <button type="button" className="wl-inquire-outline" onClick={onClickInquire}>
              Inquire
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WorksLightbox;
