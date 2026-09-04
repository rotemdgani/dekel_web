import {
  NOTICE_ANCHOR_ID,
  NOTICE_DATE_STUB,
  NOTICE_ITEMS,
  NOTICE_LEAD,
  NOTICE_SIGN,
  NOTICE_THANKS,
  NOTICE_TITLE,
} from "@/data/noticeCopy";

import "./Notice.css";

type NoticeProps = {
  /** Extra class for page-specific layout (e.g. home padding). */
  className?: string;
};

/**
 * Full NOTICE artwork block — shared by /works and the home page.
 * Class names / styles match the former WorksNotice for an unchanged /works look.
 */
const Notice = ({ className }: NoticeProps) => {
  const headingId = `${NOTICE_ANCHOR_ID}-heading`;
  const classes = ["works-notice", className].filter(Boolean).join(" ");

  return (
    <aside
      id={NOTICE_ANCHOR_ID}
      className={classes}
      aria-labelledby={headingId}
    >
      <div className="works-notice-rule-wrap">
        <hr className="works-notice-hr" />
      </div>
      <div className="works-notice-inner">
        <h2 id={headingId} className="works-notice-title">
          {NOTICE_TITLE}
        </h2>
        <p className="works-notice-date-stub" aria-hidden="true">
          {NOTICE_DATE_STUB}
        </p>
        <p className="works-notice-lead">{NOTICE_LEAD}</p>
        <ol className="works-notice-list">
          {NOTICE_ITEMS.map((text, i) => (
            <li key={i} className="works-notice-item">
              {text}
            </li>
          ))}
        </ol>
        <p className="works-notice-thanks">{NOTICE_THANKS}</p>
        <p className="works-notice-sign">{NOTICE_SIGN}</p>
      </div>
    </aside>
  );
};

export default Notice;
