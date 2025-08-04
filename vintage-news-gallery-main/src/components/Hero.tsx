import { Button } from "@/components/ui/button";
import BlurImage from "@/components/ui/blur-image";
import "./Hero.css";
import paperplane_video from '@/assets/cover.mp4';
import nyt_cover_earth from '@/assets/nyt_cover_earth.webp';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Video - Desktop Only */}
      <video
        className="hero-bg hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster=""
        aria-label="Background video of a paper plane artwork on blue sky"
      >
        <source src={paperplane_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Background Image - Mobile Only */}
      <BlurImage
        className="hero-bg hero-image"
        src={nyt_cover_earth}
        alt="Earth artwork background"
        loading="eager"
      />
    </section>
  );
};

export default Hero;