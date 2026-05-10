import { Link } from "react-router-dom";
import { pressSortedNewestFirst } from "@/data/pressArticles";
import "./Press.css";

function isLiveUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const Press = () => {
  const pressItems = pressSortedNewestFirst();

  return (
    <section id="press" className="press-section">
      <div className="press-container">
        <div className="press-header">
          <h2 className="press-title">
            <Link to="/press" className="press-title-link">
              Press / Articles
            </Link>
          </h2>
          <div className="press-divider" />
          <p className="press-subtitle">
            Press coverage, interviews, and features — with links to full articles.
          </p>
        </div>

        <div className="press-content">
          {pressItems.map((item) => (
            <article
              key={item.id}
              className={`press-article ${!item.imageUrl ? "press-article--no-image" : ""}`}
            >
              {item.imageUrl ? (
                <div className="press-article-visual">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="press-article-thumb"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : null}
              <h3 className="press-article-headline">{item.title}</h3>
              {item.excerpt ? (
                <div className="press-article-columns">
                  <p className="press-article-text">{item.excerpt}</p>
                </div>
              ) : null}
              <div className="press-article-footer">
                {item.source ? (
                  <span className="press-article-source">{item.source}</span>
                ) : null}
                {item.source && item.dateLabel ? (
                  <span className="press-article-sep" aria-hidden="true">
                    |
                  </span>
                ) : null}
                {item.dateLabel ? (
                  <span className="press-article-date">{item.dateLabel}</span>
                ) : null}
                {isLiveUrl(item.linkUrl) ? (
                  <a
                    href={item.linkUrl}
                    className="press-article-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.linkLabel ?? "Read article"}
                  </a>
                ) : (
                  <span className="press-article-link-disabled">
                    Link to be added
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Press;
