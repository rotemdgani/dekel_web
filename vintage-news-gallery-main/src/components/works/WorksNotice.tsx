import {
  NOTICE_ITEMS,
  NOTICE_LEAD,
  NOTICE_SIGN,
  NOTICE_THANKS,
} from "@/data/noticeCopy";
import "./WorksNotice.css";

const WorksNotice = () => (
  <aside className="works-notice" aria-labelledby="works-notice-heading">
    <div className="works-notice-rule-wrap">
      <hr className="works-notice-hr" />
    </div>
    <div className="works-notice-inner">
      <h2 id="works-notice-heading" className="works-notice-title">
        Notice
      </h2>
      <p className="works-notice-date-stub" aria-hidden="true">
        [dd/mm/yyyy]
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

export default WorksNotice;
