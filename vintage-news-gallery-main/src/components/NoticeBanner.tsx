import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { Link, useLocation } from "react-router-dom";

import {
  NOTICE_ANCHOR_ID,
  NOTICE_BANNER_ITEM,
  NOTICE_LEAD,
  NOTICE_TITLE,
} from "@/data/noticeCopy";
import { scrollToElementById } from "@/lib/scrollToHash";
import {
  readNoticeSeen,
  writeNoticeSeen,
} from "@/lib/noticeSeenStorage";

import "./NoticeBanner.css";

/**
 * Satirical NOTICE banner in the visual slot of a consent bar.
 * Collects nothing, gates nothing, grants no permissions.
 */
const NoticeBanner = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leaveTimer = useRef<number | null>(null);
  const leavingRef = useRef(false);

  useEffect(() => {
    if (!readNoticeSeen()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.classList.remove("has-notice-banner");
      return;
    }
    document.body.classList.add("has-notice-banner");
    return () => document.body.classList.remove("has-notice-banner");
  }, [visible]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current != null) {
        window.clearTimeout(leaveTimer.current);
      }
    };
  }, []);

  const dismiss = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    writeNoticeSeen();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setVisible(false);
      setLeaving(false);
      return;
    }

    setLeaving(true);
    leaveTimer.current = window.setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 220);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  if (!visible) {
    return null;
  }

  const path = location.pathname;
  const hasInlineNotice = path === "/" || path === "/works";

  const onReadFull = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!hasInlineNotice) return;
    event.preventDefault();
    scrollToElementById(NOTICE_ANCHOR_ID);
  };

  return (
    <div
      className={`notice-banner${leaving ? " notice-banner--leaving" : ""}`}
      role="region"
      aria-label="Notice"
    >
      <div className="notice-banner-inner">
        <div className="notice-banner-copy">
          <p className="notice-banner-heading">{NOTICE_TITLE}</p>
          <p className="notice-banner-lead">{NOTICE_LEAD}</p>
          <p className="notice-banner-item">
            <span className="notice-banner-num" aria-hidden="true">
              1.
            </span>
            {NOTICE_BANNER_ITEM}{" "}
            <Link
              to={
                hasInlineNotice
                  ? `#${NOTICE_ANCHOR_ID}`
                  : `/works#${NOTICE_ANCHOR_ID}`
              }
              className="notice-banner-full"
              onClick={onReadFull}
            >
              Read the full notice →
            </Link>
          </p>
        </div>
        <button
          type="button"
          className="notice-banner-btn"
          onClick={dismiss}
        >
          I have read and understood
        </button>
      </div>
    </div>
  );
};

export default NoticeBanner;
