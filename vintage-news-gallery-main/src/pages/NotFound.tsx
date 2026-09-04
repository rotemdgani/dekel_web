import { Link } from "react-router-dom";

import {
  NOTICE_DATE_STUB,
  NOTICE_ITEMS,
  NOTICE_LEAD,
  NOTICE_SIGN,
  NOTICE_THANKS,
  NOTICE_TITLE,
} from "@/data/noticeCopy";
import "./NotFound.css";

const NotFound = () => (
  <div className="notfound-notice">
    <p className="notfound-eyebrow">404</p>
    <h1 className="notfound-notice-title">{NOTICE_TITLE}</h1>
    <p className="notfound-date" aria-hidden="true">
      {NOTICE_DATE_STUB}
    </p>
    <p className="notfound-lead">{NOTICE_LEAD}</p>
    <ol className="notfound-list">
      {NOTICE_ITEMS.map((text, i) => (
        <li key={i} className="notfound-item">
          {text}
        </li>
      ))}
    </ol>
    <p className="notfound-thanks">{NOTICE_THANKS}</p>
    <p className="notfound-sign">{NOTICE_SIGN}</p>
    <p className="notfound-recovery">
      <Link className="notfound-recovery-link" to="/works">
        ← Return to Works
      </Link>
    </p>
  </div>
);

export default NotFound;
