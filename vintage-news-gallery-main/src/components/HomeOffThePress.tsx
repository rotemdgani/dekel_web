import { Link } from "react-router-dom";

import { HOME_OFF_THE_PRESS } from "@/data/homeOffThePress";
import type { OffThePressItem } from "@/data/homeOffThePress";

import "./HomeOffThePress.css";

function OffThePressLink({ item }: { item: OffThePressItem }) {
  if (item.external) {
    return (
      <a
        href={item.linkUrl}
        className="home-off-the-press-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.linkLabel}
      </a>
    );
  }

  return (
    <Link to={item.linkUrl} className="home-off-the-press-cta">
      {item.linkLabel}
    </Link>
  );
}

function imageClassName(item: OffThePressItem): string {
  const mode = item.imageMode ?? "cover";
  return `home-off-the-press-img home-off-the-press-img--${mode}`;
}

function OffThePressVisual({ item }: { item: OffThePressItem }) {
  const img = (
    <div className="home-off-the-press-image-wrapper">
      <img
        src={item.imageUrl}
        alt=""
        className={imageClassName(item)}
        style={
          item.imageMode === "cover" && item.imagePosition
            ? { objectPosition: item.imagePosition }
            : undefined
        }
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  if (item.external) {
    return (
      <a
        href={item.linkUrl}
        className="home-off-the-press-visual"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} — ${item.linkLabel}`}
      >
        {img}
      </a>
    );
  }

  return (
    <Link
      to={item.linkUrl}
      className="home-off-the-press-visual"
      aria-label={`${item.title} — ${item.linkLabel}`}
    >
      {img}
    </Link>
  );
}

const HomeOffThePress = () => (
  <section
    className="home-off-the-press"
    id="off-the-press"
    aria-labelledby="home-off-the-press-heading"
  >
    <div className="home-off-the-press-container">
      <header className="home-off-the-press-header">
        <h2 id="home-off-the-press-heading" className="home-off-the-press-title">
          Off the Press
        </h2>
      </header>

      <ul className="home-off-the-press-grid">
        {HOME_OFF_THE_PRESS.map((item) => (
          <li key={item.id} className="home-off-the-press-card">
            <OffThePressVisual item={item} />
            <div className="home-off-the-press-body">
              <p className="home-off-the-press-meta">
                <span className="home-off-the-press-source">{item.source}</span>
                <span className="home-off-the-press-sep" aria-hidden="true">
                  ·
                </span>
                <span className="home-off-the-press-date">{item.dateLabel}</span>
              </p>
              <h3 className="home-off-the-press-heading">{item.title}</h3>
              <p className="home-off-the-press-excerpt">{item.excerpt}</p>
              <OffThePressLink item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomeOffThePress;
