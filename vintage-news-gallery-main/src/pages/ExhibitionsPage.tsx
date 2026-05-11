import EventGallery from "@/components/EventGallery";
import { coverImageForExhibitionSlug } from "@/data/exhibitionCovers";
import {
  exhibitionsSortedNewestFirst,
  type ExhibitionDetail,
} from "@/data/exhibitionsDetail";
import "./ExhibitionsPage.css";

function isLiveUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Show main cover on mobile (others stay hidden to avoid duplicating gallery hero). */
const EXHIBITION_SLUG_SHOW_COVER_MOBILE = "global-art-gallery-solo";

const ExhibitionCard = ({ ex }: { ex: ExhibitionDetail }) => {
  const cover = ex.coverImageUrl ?? coverImageForExhibitionSlug(ex.slug);
  const cardClass =
    ex.slug === EXHIBITION_SLUG_SHOW_COVER_MOBILE
      ? "exhibitions-detail-card exhibitions-detail-card--cover-mobile-on"
      : "exhibitions-detail-card";
  return (
    <li
      className={cardClass}
      id={`exhibition-${ex.slug}`}
    >
      <div className="exhibitions-detail-visual">
        {ex.isUpcoming ? (
          <span className="exhibitions-detail-upcoming-badge" aria-hidden="true">
            Upcoming
          </span>
        ) : null}
        <img
          src={cover}
          alt={ex.title}
          className="exhibitions-detail-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="exhibitions-detail-body">
        <p className="exhibitions-detail-date">{ex.dateLabel}</p>
        {ex.isUpcoming ? (
          <p className="exhibitions-detail-upcoming-inline">Upcoming</p>
        ) : null}
        <h2 className="exhibitions-detail-title">{ex.title}</h2>
        <p className="exhibitions-detail-location">{ex.location}</p>
        {ex.curator ? (
          <p className="exhibitions-detail-curator">{ex.curator}</p>
        ) : null}
        <p className="exhibitions-detail-desc">{ex.description}</p>
        {isLiveUrl(ex.relatedUrl) ? (
          <p className="exhibitions-detail-actions">
            <a
              href={ex.relatedUrl}
              className="exhibitions-detail-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ex.relatedLinkLabel ?? "Related link"}
            </a>
          </p>
        ) : null}
        {ex.showGallery ? (
          <div className="exhibitions-detail-gallery">
            <EventGallery eventSlug={ex.slug} eventTitle={ex.title} />
          </div>
        ) : null}
      </div>
    </li>
  );
};

const ExhibitionsPage = () => {
  const list = exhibitionsSortedNewestFirst();
  return (
    <div className="exhibitions-editorial">
      <p className="exhibitions-kicker">Exhibitions</p>
      <p className="exhibitions-lead">Selected exhibitions and events.</p>
      <ul className="exhibitions-detail-list">
        {list.map((ex) => (
          <ExhibitionCard key={ex.id} ex={ex} />
        ))}
      </ul>
    </div>
  );
};

export default ExhibitionsPage;
