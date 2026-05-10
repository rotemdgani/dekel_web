import { Link } from "react-router-dom";
import { INSTAGRAM_URL } from "@/config/site";
import "./SiteFooter.css";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-line">
          <span className="site-footer-meta">
            © {year} DEKEL HARARI
          </span>
          <span className="site-footer-dot" aria-hidden="true">
            ·
          </span>
          <a
            className="site-footer-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM
          </a>
          <span className="site-footer-dot" aria-hidden="true">
            ·
          </span>
          <Link className="site-footer-link" to="/press">
            PRESS
          </Link>
          <span className="site-footer-dot" aria-hidden="true">
            ·
          </span>
          <Link className="site-footer-link" to="/contact">
            CONTACT
          </Link>
        </p>
        <p className="site-footer-legal">
          <Link className="site-footer-legal-link" to="/privacy">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
