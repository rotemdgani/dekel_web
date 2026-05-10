import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookieConsentStorage";

import "./CookieConsent.css";

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readCookieConsent() == null) {
      setOpen(true);
    }
  }, []);

  const commit = (value: CookieConsentValue) => {
    writeCookieConsent(value);
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie notice"
    >
      <div className="cookie-consent-panel">
        <button
          type="button"
          className="cookie-consent-close"
          aria-label="Decline and close"
          onClick={() => commit("declined")}
        >
          ×
        </button>
        <p className="cookie-consent-text">
          This website uses cookies to improve your browsing experience.{" "}
          <Link to="/privacy" className="cookie-consent-privacy">
            Privacy Policy
          </Link>
        </p>
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn-primary"
            onClick={() => commit("accepted")}
          >
            Accept
          </button>
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn-secondary"
            onClick={() => commit("declined")}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
