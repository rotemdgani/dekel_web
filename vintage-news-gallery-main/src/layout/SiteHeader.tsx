import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SiteHeader.css";

const navPaths = [
  { label: "Works", to: "/works" },
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
  }, [location.pathname]);

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
            const active = location.pathname === item.to;
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
