import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type TouchEvent,
} from "react";
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

const HISTORY_STATE_KEY = "__worksLightbox";
const FORCE_CLOSE_EVENT = "works-lightbox-close";

type LightboxHistoryState = { [HISTORY_STATE_KEY]?: boolean };

function itemIsVideo(item: LightboxItem): boolean {
  if (item.artwork) return isVideoArtwork(item.artwork);
  return item.mediaType === "video" && typeof item.video === "string" && item.video.length > 0;
}

function measureHeaderClearance(): number {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return 80;
  const bottom = header.getBoundingClientRect().bottom;
  return Math.max(0, Math.ceil(bottom));
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
  const isOpen = navigation != null;

  const scrollYRef = useRef(0);
  const historyPushedRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const sectionIndex = navigation
    ? items.findIndex((w) => w.id === navigation.current.id)
    : -1;
  const prevWork =
    sectionIndex > 0 ? items[sectionIndex - 1] : null;
  const nextWork =
    sectionIndex >= 0 && sectionIndex < items.length - 1
      ? items[sectionIndex + 1]
      : null;

  const applyHeaderClearance = useCallback(() => {
    const clearance = measureHeaderClearance();
    const el = overlayRef.current;
    if (el) {
      el.style.setProperty("--wl-header-clearance", `${clearance}px`);
    }
    document.documentElement.style.setProperty(
      "--wl-header-clearance",
      `${clearance}px`,
    );
  }, []);

  const close = useCallback(() => {
    const state = window.history.state as LightboxHistoryState | null;
    if (historyPushedRef.current && state?.[HISTORY_STATE_KEY]) {
      window.history.back();
      return;
    }
    onClose();
  }, [onClose]);

  /** Open / close: history entry, body lock, scroll restore, header measure */
  useEffect(() => {
    if (!isOpen) return;

    scrollYRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.classList.add("wl-open");
    applyHeaderClearance();

    const state = window.history.state as LightboxHistoryState | null;
    if (!state?.[HISTORY_STATE_KEY]) {
      window.history.pushState({ [HISTORY_STATE_KEY]: true }, "");
      historyPushedRef.current = true;
    } else {
      historyPushedRef.current = true;
    }

    const onPopState = () => {
      historyPushedRef.current = false;
      onClose();
    };

    const onForceClose = () => {
      historyPushedRef.current = false;
      const st = window.history.state as LightboxHistoryState | null;
      if (st?.[HISTORY_STATE_KEY]) {
        window.history.replaceState(null, "", window.location.href);
      }
      onClose();
    };

    const onResize = () => applyHeaderClearance();

    window.addEventListener("popstate", onPopState);
    window.addEventListener(FORCE_CLOSE_EVENT, onForceClose);
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    const header = document.querySelector(".site-header");
    const ro =
      typeof ResizeObserver !== "undefined" && header
        ? new ResizeObserver(() => applyHeaderClearance())
        : null;
    if (header && ro) ro.observe(header);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener(FORCE_CLOSE_EVENT, onForceClose);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      ro?.disconnect();
      document.body.style.overflow = "";
      document.body.classList.remove("wl-open");
      document.documentElement.style.removeProperty("--wl-header-clearance");

      /* Parent closed without history.back (e.g. Inquire) — drop the entry */
      if (historyPushedRef.current) {
        const st = window.history.state as LightboxHistoryState | null;
        if (st?.[HISTORY_STATE_KEY]) {
          window.history.replaceState(null, "", window.location.href);
        }
        historyPushedRef.current = false;
      }

      const y = scrollYRef.current;
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
    };
  }, [isOpen, onClose, applyHeaderClearance]);

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

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx > 0 && prevWork) onNavigate(prevWork);
    else if (dx < 0 && nextWork) onNavigate(nextWork);
  };

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
  const lightGround = w.artwork?.lightboxGround === "light";

  return (
    <div
      ref={overlayRef}
      className={`wl-overlay${lightGround ? " wl-overlay-light" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={w.title}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
