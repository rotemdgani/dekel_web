import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HOME_SERIES_SECTION_ID } from "@/lib/scrollToHash";
import "./SiteHeader.css";

const navPaths = [
  { label: "Works", to: `/#${HOME_SERIES_SECTION_ID}` },
  { label: "About", to: "/about" },
  { label: "Exhibitions", to: "/exhibitions" },
  { label: "Press", to: "/press" },
  { label: "Contact", to: "/contact" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="site-header editorial-header mobile-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          DEKEL HARARI
        </Link>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="site-nav-toggle-bars" aria-hidden="true">
            <span className="site-nav-toggle-bar" />
            <span className="site-nav-toggle-bar" />
            <span className="site-nav-toggle-bar" />
          </span>
        </button>

        <nav className={`site-nav ${mobileOpen ? "site-nav-open" : ""}`}>
          {navPaths.map((item, i) => {
            const onHomeSeries =
              location.pathname === "/" &&
              location.hash.replace(/^#/, "") === HOME_SERIES_SECTION_ID;
            const active =
              item.to === `/#${HOME_SERIES_SECTION_ID}`
                ? onHomeSeries
                : location.pathname === item.to;
            return (
              <span key={item.to} className="site-nav-item">
                <Link
                  to={item.to}
                  className={`site-nav-link ${active ? "site-nav-link-active" : ""}`}
                >
                  {item.label}
                </Link>
                {i < navPaths.length - 1 ? (
                  <span className="site-nav-dot" aria-hidden="true">
                    ·
                  </span>
                ) : null}
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
