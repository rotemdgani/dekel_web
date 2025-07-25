import { Button } from "@/components/ui/button";
import "./Hero.css";
import paperplane from '@/assets/paperplane.png';

const heroArtwork = paperplane;

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Image */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroArtwork})` }}
        aria-label="Paper plane artwork on blue sky"
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-grid">
          {/* Left side - Text Content */}
          <div className="hero-textCol">
            {/* Minimal Text */}
{/*             <div className="hero-minimalText">
              <p className="hero-brand">DEKEL HARARI</p>
              <p className="hero-tagline">אמנות בטיסה</p>
            </div> */}

            {/* Single CTA Button */}
{/*             <div className="hero-ctas">
              <Button
                variant="outline"
                size="lg"
                className="hero-exploreBtn"
                onClick={() =>
                  document.getElementById("gallery")?.scrollIntoView({
                    behavior: "smooth"
                  })
                }
                aria-label="Explore Art Gallery"
              >
                גלה עוד
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scrollWrap">
        <div className="hero-scrollBar"></div>
      </div>
    </section>
  );
};

export default Hero;