import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Artwork } from "@/data/artworks";
import { artworks, artworkAlt, artworkMapFromList, isVideoArtwork } from "@/data/artworks";
import {
  RETIRED_WORKS_HASHES,
  WORKS_SECTIONS,
  type WorksSectionSlug,
} from "@/data/worksSections";
import WorksLightbox, {
  artworkToLightboxItem,
  type LightboxItem,
  type LightboxNavigation,
} from "@/components/works/WorksLightbox";
import WorksInquireModal from "@/components/works/WorksInquireModal";
import Notice from "@/components/Notice";
import { NOTICE_ANCHOR_ID } from "@/data/noticeCopy";
import { worksGridCaptionMetaLine } from "@/lib/workDisplay";
import "./WorksPage.css";

const STICKY_OFFSET = 140; /* header + filter + small offset */

type FilterKey = "all" | WorksSectionSlug;

function sectionSlugForArtworkId(id: number): WorksSectionSlug {
  for (const sec of WORKS_SECTIONS) {
    if (sec.orderedIds.includes(id)) return sec.slug;
  }
  return "subjects-removed";
}

const WorksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const map = useMemo(() => artworkMapFromList(artworks), []);

  /** Full catalogue order for lightbox prev/next across all sections */
  const allGalleryItems = useMemo(() => {
    const out: LightboxItem[] = [];
    for (const sec of WORKS_SECTIONS) {
      for (const oid of sec.orderedIds) {
        const w = map.get(oid);
        if (w) out.push(artworkToLightboxItem(w));
      }
    }
    return out;
  }, [map]);

  const grouped = useMemo(
    () =>
      WORKS_SECTIONS.map((meta) => ({
        meta,
        works: meta.orderedIds
          .map((id) => map.get(id))
          .filter((w): w is Artwork => !!w),
      })),
    [map],
  );

  const [filterActive, setFilterActive] = useState<FilterKey>("all");
  const [lightbox, setLightbox] = useState<LightboxNavigation | null>(null);
  const [inquire, setInquire] = useState<Artwork | null>(null);

  const sectionEls = useRef<Partial<Record<WorksSectionSlug, HTMLElement | null>>>(
    {},
  );

  const tickActiveSection = useCallback(() => {
    const y = window.scrollY + STICKY_OFFSET;
    let current: FilterKey = "all";
    for (const { meta } of grouped) {
      const el = sectionEls.current[meta.slug];
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= y) current = meta.slug;
    }
    setFilterActive(current);
  }, [grouped]);

  useEffect(() => {
    const onScroll = () => tickActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    tickActiveSection();
    return () => window.removeEventListener("scroll", onScroll);
  }, [tickActiveSection]);

  /** Deep link from homepage series cards; redirect retired hashes */
  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;

    if ((RETIRED_WORKS_HASHES as readonly string[]).includes(id)) {
      navigate("/works", { replace: true });
      return;
    }

    const isNotice = id === NOTICE_ANCHOR_ID;
    if (!isNotice && !WORKS_SECTIONS.some((s) => s.slug === id)) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.hash, location.pathname, navigate]);

  const scrollToTopWorks = () => {
    document.getElementById("works-top")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToSlug = (slug: WorksSectionSlug) => {
    document
      .getElementById(slug)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openLightbox = (work: Artwork, slug: WorksSectionSlug) => {
    setLightbox({
      current: artworkToLightboxItem(work),
      items: allGalleryItems,
      sectionSlug: slug,
    });
  };

  const openInquire = (work: Artwork) => {
    setLightbox(null);
    setInquire(work);
  };

  const renderWorkMedia = (work: Artwork, slug: WorksSectionSlug) => {
    if (isVideoArtwork(work)) {
      return (
        <button
          type="button"
          className="works-thumb-btn works-thumb-btn--video"
          onClick={() => openLightbox(work, slug)}
          aria-label={`View ${work.title}`}
        >
          <span className="works-aspect works-aspect--video">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              className="works-video"
              src={work.video}
              autoPlay
              muted
              loop
              playsInline
            />
          </span>
        </button>
      );
    }

    return (
      <button
        type="button"
        className="works-thumb-btn"
        onClick={() => openLightbox(work, slug)}
        aria-label={`View ${work.title}`}
      >
        <span className="works-aspect">
          <img
            src={work.image}
            alt={artworkAlt(work)}
            className="works-thumb-img"
            loading="lazy"
            decoding="async"
          />
        </span>
      </button>
    );
  };

  const renderWorkItem = (work: Artwork, slug: WorksSectionSlug) => (
    <li key={work.id} className="works-item">
      {renderWorkMedia(work, slug)}
      <div className="works-caption">
        <p className="works-caption-title">{work.title}</p>
        <p className="works-caption-meta">
          {worksGridCaptionMetaLine(work)}
        </p>
        <button
          type="button"
          className="works-inquire"
          onClick={(e) => {
            e.stopPropagation();
            openInquire(work);
          }}
        >
          Inquire
        </button>
      </div>
    </li>
  );

  return (
    <div className="works-page editorial-works-root">
      <div className="works-filter-bar" id="works-top">
        <div className="works-filter-inner">
          <button
            type="button"
            className={`works-filter-link ${filterActive === "all" ? "works-filter-link-active" : ""}`}
            onClick={scrollToTopWorks}
          >
            ALL
          </button>
          <span className="works-filter-sep" aria-hidden="true">
            ·
          </span>
          {WORKS_SECTIONS.map((s, i) => (
            <span key={s.slug} className="works-filter-group">
              <button
                type="button"
                className={`works-filter-link ${filterActive === s.slug ? "works-filter-link-active" : ""}`}
                onClick={() => scrollToSlug(s.slug)}
              >
                {s.title}
              </button>
              {i < WORKS_SECTIONS.length - 1 ? (
                <span className="works-filter-sep" aria-hidden="true">
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>

      {grouped.map(({ meta, works }, idx) => (
        <section
          key={meta.slug}
          id={meta.slug}
          className="works-section-anchor"
          ref={(el) => {
            sectionEls.current[meta.slug] = el;
          }}
        >
          {idx > 0 ? <hr className="works-section-rule" /> : null}

          <div className="works-section-layout">
            <aside className="works-section-intro">
              <div className="works-section-heading-row">
                <h2 className="section-title-allcaps">{meta.title}</h2>
                <span className="works-section-years">{meta.yearRange}</span>
              </div>
              <p className="works-section-blurb">{meta.description}</p>
            </aside>

            <ul className="works-grid">
              {works.map((work) => renderWorkItem(work, meta.slug))}
            </ul>
          </div>
        </section>
      ))}

      <Notice />

      <WorksLightbox
        navigation={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(item) => {
          if (!lightbox) return;
          const artwork = item.artwork;
          setLightbox({
            current: item,
            items: allGalleryItems,
            sectionSlug: artwork
              ? sectionSlugForArtworkId(artwork.id)
              : lightbox.sectionSlug,
          });
        }}
        onClickInquire={() => {
          if (!lightbox?.current.artwork) return;
          openInquire(lightbox.current.artwork);
        }}
      />

      <WorksInquireModal
        artwork={inquire}
        onClose={() => setInquire(null)}
      />
    </div>
  );
};

export default WorksPage;
