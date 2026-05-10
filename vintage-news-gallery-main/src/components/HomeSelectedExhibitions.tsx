import { Link } from "react-router-dom";

import { coverImageForExhibitionSlug } from "@/data/exhibitionCovers";
import {
  homeExhibitionPreviewItems,
  previewExhibitionDescription,
} from "@/data/homeExhibitionsPreview";

import "./HomeSelectedExhibitions.css";

const HomeSelectedExhibitions = () => {
  const items = homeExhibitionPreviewItems();

  return (
    <section
      className="home-selected-exhibitions"
      aria-labelledby="home-selected-exhibitions-heading"
    >
      <div className="home-selected-exhibitions-inner">
        <header className="home-selected-exhibitions-header">
          <h2
            className="home-selected-exhibitions-kicker"
            id="home-selected-exhibitions-heading"
          >
            Selected Exhibitions
          </h2>
          <p className="home-selected-exhibitions-lead">
            Recent and forthcoming highlights.
          </p>
        </header>

        <ul className="home-selected-exhibitions-grid">
          {items.map((ex) => {
            const cover = ex.coverImageUrl ?? coverImageForExhibitionSlug(ex.slug);
            const href = `/exhibitions#exhibition-${ex.slug}`;
            return (
              <li key={ex.id} className="home-selected-exhibitions-card">
                <Link
                  to={href}
                  className="home-selected-exhibitions-visual"
                  aria-label={`${ex.title} — view exhibition details`}
                >
                  <img
                    src={cover}
                    alt=""
                    className="home-selected-exhibitions-img"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <div className="home-selected-exhibitions-body">
                  <p className="home-selected-exhibitions-date">{ex.dateLabel}</p>
                  <h3 className="home-selected-exhibitions-title">{ex.title}</h3>
                  <p className="home-selected-exhibitions-location">{ex.location}</p>
                  <p className="home-selected-exhibitions-desc">
                    {previewExhibitionDescription(ex.description)}
                  </p>
                  <Link to={href} className="home-selected-exhibitions-cta">
                    View details →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="home-selected-exhibitions-all">
          <Link to="/exhibitions" className="home-selected-exhibitions-all-link">
            View All Exhibitions →
          </Link>
        </p>
      </div>
    </section>
  );
};

export default HomeSelectedExhibitions;
