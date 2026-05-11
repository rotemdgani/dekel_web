import { useEffect, useCallback, useMemo } from "react";
import type { Artwork } from "@/data/artworks";
import type { WorksSectionSlug } from "@/data/worksSections";
import {
  displayYear,
  lightboxDimensionLine,
  lightboxMediumLine,
} from "@/lib/workDisplay";
import "./WorksLightbox.css";

export interface LightboxNavigation {
  current: Artwork;
  sectionSlug: WorksSectionSlug;
  sectionWorks: Artwork[];
}

interface WorksLightboxProps {
  navigation: LightboxNavigation | null;
  onClose: () => void;
  onNavigate: (work: Artwork) => void;
  onClickInquire: () => void;
}

const WorksLightbox = ({
  navigation,
  onClose,
  onNavigate,
  onClickInquire,
}: WorksLightboxProps) => {
  const sectionIndex =
    navigation && navigation.sectionWorks.length
      ? navigation.sectionWorks.findIndex((w) => w.id === navigation.current.id)
      : -1;
  const prevWork =
    sectionIndex > 0 ? navigation.sectionWorks[sectionIndex - 1] : null;
  const nextWork =
    sectionIndex >= 0 && sectionIndex < navigation.sectionWorks.length - 1
      ? navigation.sectionWorks[sectionIndex + 1]
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
    if (prevWork) urls.push(prevWork.image);
    if (nextWork) urls.push(nextWork.image);
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
  const yearLine = displayYear(w);
  const sizeLine = lightboxDimensionLine(w);
  const techniqueLine = lightboxMediumLine(w);

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
              aria-label="Previous artwork"
              onClick={() => onNavigate(prevWork)}
            >
              ←
            </button>
          )}
          {nextWork && (
            <button
              type="button"
              className="wl-arrow wl-arrow-right"
              aria-label="Next artwork"
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
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={w.image}
            alt={w.title}
            className="wl-img"
            onClick={(ev) => ev.stopPropagation()}
            draggable={false}
          />
        </div>

        <div className="wl-caption">
          <h2 className="wl-title">{w.title}</h2>
          <div className="wl-details" role="group" aria-label="Artwork details">
            {yearLine.length > 0 ? (
              <p className="wl-line wl-line-year">{yearLine}</p>
            ) : null}
            <p className="wl-line">{sizeLine}</p>
            <p className="wl-line">{techniqueLine}</p>
          </div>
          <button type="button" className="wl-inquire-outline" onClick={onClickInquire}>
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorksLightbox;
