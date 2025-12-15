import { Button } from "@/components/ui/button";
import "./Hero.css";
// Note: This component is not currently used (replaced by MuseumHero)
// Image imports removed to reduce bundle size
// import paperplane_video from '@/assets/cover.mp4';
// import nyt_cover_earth from '@/assets/nyt_cover_earth.webp';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Video - Desktop Only */}
      {/* Note: This component is not currently used - video and image imports removed */}
      <div className="hero-bg hero-video" aria-label="Background video placeholder">
        {/* Video removed - component not in use */}
      </div>
      
      <div className="hero-bg hero-image" aria-label="Background image placeholder">
        {/* Image removed - component not in use */}
      </div>
    </section>
  );
};

export default Hero;