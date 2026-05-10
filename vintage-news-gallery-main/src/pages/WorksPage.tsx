import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Artwork } from "@/data/artworks";
import { artworks, artworkMapFromList } from "@/data/artworks";
import {
  WORKS_SECTIONS,
  type WorksSectionSlug,
} from "@/data/worksSections";
import WorksLightbox, {
  type LightboxNavigation,
} from "@/components/works/WorksLightbox";
import WorksInquireModal from "@/components/works/WorksInquireModal";
import WorksNotice from "@/components/works/WorksNotice";
import { worksGridCaptionMetaLine } from "@/lib/workDisplay";
import "./WorksPage.css";

const STICKY_OFFSET = 140; /* header + filter + small offset */

type FilterKey = "all" | WorksSectionSlug;

const WorksPage = () => {
  const location = useLocation();
  const map = useMemo(() => artworkMapFromList(artworks), []);

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

  const sectionWorksMap = useMemo(() => {
    const m = new Map<WorksSectionSlug, Artwork[]>();
    grouped.forEach(({ meta, works }) => m.set(meta.slug, works));
    return m;
  }, [grouped]);

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

  /** Deep link from homepage project cards: /works#subjects-removed, etc. */
  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id || !WORKS_SECTIONS.some((s) => s.slug === id)) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.hash, location.pathname]);

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
    const list = sectionWorksMap.get(slug) ?? [];
    setLightbox({ current: work, sectionSlug: slug, sectionWorks: list });
  };

  const openInquire = (work: Artwork) => {
    setLightbox(null);
    setInquire(work);
  };

  const renderWorkItem = (work: Artwork, slug: WorksSectionSlug) => (
    <li key={work.id} className="works-item">
      <button
        type="button"
        className="works-thumb-btn"
        onClick={() => openLightbox(work, slug)}
      >
        <span className="works-aspect">
          <img
            src={work.image}
            alt={work.title}
            className="works-thumb-img"
            loading="lazy"
          />
        </span>
      </button>
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
          className={
            meta.slug === "crosswords"
              ? "works-section-anchor works-section--crosswords"
              : "works-section-anchor"
          }
          ref={(el) => {
            sectionEls.current[meta.slug] = el;
          }}
        >
          {idx > 0 ? <hr className="works-section-rule" /> : null}

          <div className="works-section-heading-row">
            <h2 className="section-title-allcaps">{meta.title}</h2>
            <span className="works-section-years">{meta.yearRange}</span>
          </div>
          <p className="works-section-blurb">{meta.description}</p>

          <ul
            className={
              meta.slug === "crosswords"
                ? "works-grid works-grid--crosswords-pair"
                : "works-grid"
            }
          >
            {works.map((work) => renderWorkItem(work, meta.slug))}
          </ul>
        </section>
      ))}

      <WorksNotice />

      <WorksLightbox
        navigation={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(work) => {
          if (!lightbox) return;
          setLightbox({
            current: work,
            sectionSlug: lightbox.sectionSlug,
            sectionWorks: lightbox.sectionWorks,
          });
        }}
        onClickInquire={() => {
          if (!lightbox) return;
          openInquire(lightbox.current);
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
