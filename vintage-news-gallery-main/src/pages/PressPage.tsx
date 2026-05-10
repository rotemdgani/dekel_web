import { pressSortedNewestFirst } from "@/data/pressArticles";
import type { PressArticle } from "@/data/pressArticles";
import "./PressPage.css";

function isLiveUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function PressMeta({ article }: { article: PressArticle }) {
  const { source, dateLabel } = article;
  if (!source && !dateLabel) return null;
  return (
    <p className="press-detail-meta">
      {source ? (
        <span className="press-detail-source">{source}</span>
      ) : null}
      {source && dateLabel ? (
        <span className="press-detail-sep" aria-hidden="true">
          ·
        </span>
      ) : null}
      {dateLabel ? (
        <span className="press-detail-date">{dateLabel}</span>
      ) : null}
    </p>
  );
}

const PressCard = ({ article }: { article: PressArticle }) => {
  const img = article.imageUrl;
  return (
    <article
      className={`press-detail-card ${!img ? "press-detail-card--no-image" : ""}`}
    >
      {img ? (
        <div className="press-detail-visual">
          <img
            src={img}
            alt=""
            className="press-detail-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div className="press-detail-body">
        <h2 className="press-detail-title">{article.title}</h2>
        <PressMeta article={article} />
        {article.excerpt ? (
          <p className="press-detail-excerpt">{article.excerpt}</p>
        ) : null}
        {isLiveUrl(article.linkUrl) ? (
          <p className="press-detail-actions">
            <a
              href={article.linkUrl}
              className="press-detail-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.linkLabel ?? "Read article"}
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
};

const PressPage = () => {
  const articles = pressSortedNewestFirst();
  return (
    <div className="press-editorial">
      <p className="press-kicker">Press / Articles</p>
      <p className="press-lead">
        Selected press coverage, interviews, and features.
      </p>
      <div className="press-detail-list">
        {articles.map((article) => (
          <PressCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default PressPage;
