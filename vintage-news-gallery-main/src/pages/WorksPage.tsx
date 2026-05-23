import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

/** Finale block: 3-up row then Username centered alone (SUBJECTS, REMOVED) */
const SUBJECTS_REMOVED_FINALE_IDS = [37, 50, 55, 53] as const;
const SUBJECTS_REMOVED_USERNAME_ID = 53;

/** Centered pair row: Swords to Plowshares + Coverage (DAILY MATERIAL) */
const DAILY_MATERIAL_CENTERED_PAIR_IDS = [62, 66] as const;

/** Centered pair row: Subtext + Scrabble (CROSSWORDS) */
const CROSSWORDS_CENTERED_PAIR_IDS = [43, 54] as const;

type FilterKey = "all" | WorksSectionSlug;

function sectionSlugForArtworkId(id: number): WorksSectionSlug {
  for (const sec of WORKS_SECTIONS) {
    if (sec.orderedIds.includes(id)) return sec.slug;
  }
  return "subjects-removed";
}

const WorksPage = () => {
  const location = useLocation();
  const map = useMemo(() => artworkMapFromList(artworks), []);

  /** Full catalogue order for lightbox prev/next across all sections */
  const allGalleryWorks = useMemo(() => {
    const out: Artwork[] = [];
    for (const sec of WORKS_SECTIONS) {
      for (const oid of sec.orderedIds) {
        const w = map.get(oid);
        if (w) out.push(w);
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
    setLightbox({
      current: work,
      sectionSlug: slug,
      sectionWorks: allGalleryWorks,
    });
  };

  const openInquire = (work: Artwork) => {
    setLightbox(null);
    setInquire(work);
  };

  const renderWorkItemInner = (work: Artwork, slug: WorksSectionSlug) => (
    <>
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
    </>
  );

  const renderWorkItem = (work: Artwork, slug: WorksSectionSlug) => (
    <li key={work.id} className="works-item">
      {renderWorkItemInner(work, slug)}
    </li>
  );

  const renderSubjectsRemovedGrid = (
    works: Artwork[],
    slug: WorksSectionSlug,
  ) => {
    const finaleSet = new Set<number>(SUBJECTS_REMOVED_FINALE_IDS);
    const regularWorks = works.filter((work) => !finaleSet.has(work.id));
    const finaleWorks = SUBJECTS_REMOVED_FINALE_IDS.map((id) =>
      works.find((work) => work.id === id),
    ).filter((work): work is Artwork => !!work);

    const nodes: ReactNode[] = regularWorks.map((work) =>
      renderWorkItem(work, slug),
    );

    if (finaleWorks.length === 0) {
      return nodes;
    }

    const topRow = finaleWorks.filter(
      (work) => work.id !== SUBJECTS_REMOVED_USERNAME_ID,
    );
    const username = finaleWorks.find(
      (work) => work.id === SUBJECTS_REMOVED_USERNAME_ID,
    );

    nodes.push(
      <li key="subjects-finale" className="works-item works-item--finale-block">
        <div className="works-finale-grid">
          {topRow.map((work) => (
            <div key={work.id} className="works-finale-cell">
              {renderWorkItemInner(work, slug)}
            </div>
          ))}
          {username ? (
            <div className="works-finale-solo">
              {renderWorkItemInner(username, slug)}
            </div>
          ) : null}
        </div>
      </li>,
    );

    return nodes;
  };

  const renderDailyMaterialGrid = (
    works: Artwork[],
    slug: WorksSectionSlug,
  ) => {
    const pairSet = new Set<number>(DAILY_MATERIAL_CENTERED_PAIR_IDS);
    const regularWorks = works.filter((work) => !pairSet.has(work.id));
    const pairWorks = DAILY_MATERIAL_CENTERED_PAIR_IDS.map((id) =>
      works.find((work) => work.id === id),
    ).filter((work): work is Artwork => !!work);

    const nodes: ReactNode[] = regularWorks.map((work) =>
      renderWorkItem(work, slug),
    );

    if (pairWorks.length === 0) {
      return nodes;
    }

    nodes.push(
      <li
        key="daily-material-centered-pair"
        className="works-item works-item--centered-pair-row"
      >
        <div className="works-centered-pair-inner">
          {pairWorks.map((work) => (
            <div key={work.id} className="works-centered-pair-cell">
              {renderWorkItemInner(work, slug)}
            </div>
          ))}
        </div>
      </li>,
    );

    return nodes;
  };

  const renderCenteredPairRow = (
    pairWorks: Artwork[],
    slug: WorksSectionSlug,
    rowKey: string,
  ): ReactNode | null => {
    if (pairWorks.length === 0) {
      return null;
    }

    return (
      <li key={rowKey} className="works-item works-item--centered-pair-row">
        <div className="works-centered-pair-inner">
          {pairWorks.map((work) => (
            <div key={work.id} className="works-centered-pair-cell">
              {renderWorkItemInner(work, slug)}
            </div>
          ))}
        </div>
      </li>
    );
  };

  const renderCrosswordsGrid = (works: Artwork[], slug: WorksSectionSlug) => {
    const pairWorks = CROSSWORDS_CENTERED_PAIR_IDS.map((id) =>
      works.find((work) => work.id === id),
    ).filter((work): work is Artwork => !!work);

    const pairRow = renderCenteredPairRow(
      pairWorks,
      slug,
      "crosswords-centered-pair",
    );

    return pairRow ? [pairRow] : [];
  };

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
              meta.slug === "subjects-removed"
                ? "works-grid works-grid--subjects-removed"
                : "works-grid"
            }
          >
            {meta.slug === "subjects-removed"
              ? renderSubjectsRemovedGrid(works, meta.slug)
              : meta.slug === "daily-material"
                ? renderDailyMaterialGrid(works, meta.slug)
                : meta.slug === "crosswords"
                  ? renderCrosswordsGrid(works, meta.slug)
                  : works.map((work) => renderWorkItem(work, meta.slug))}
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
            sectionSlug: sectionSlugForArtworkId(work.id),
            sectionWorks: allGalleryWorks,
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
