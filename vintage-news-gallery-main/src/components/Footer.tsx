import { Instagram, Mail, Phone } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-brand-title">DEKEL HARARI</h3>
            <p className="footer-brand-text">
              Contemporary artist creating modern and pop art compositions through 
              innovative newspaper collage techniques.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-links-title">Navigation</h4>
            <nav className="footer-nav">
              <a href="#home" className="footer-link">Home</a>
              <a href="#store" className="footer-link">Store</a>
              <a href="#gallery" className="footer-link">Gallery</a>
              <a href="#press" className="footer-link">Press</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#contact" className="footer-link">Contact</a>
            </nav>
          </div>

          <div className="footer-contact">
            <h4 className="footer-contact-title">Connect</h4>
            <div className="footer-contact-details">
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <span className="footer-contact-text">dekelpalmz@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <span className="footer-contact-text">+972 050-7451500</span>
              </div>
              <div className="footer-contact-item">
                <Instagram className="footer-contact-icon" />
                <a 
                  href="https://www.instagram.com/dekelharari" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-contact-text"
                >
                  @dekelharari
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © 2025 Dekel Harari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;