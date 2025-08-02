import { Button } from "@/components/ui/button";
import "./Hero.css";
import paperplane_video from '@/assets/paperplane_video.mp4';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Video */}
      <video
        className="hero-bg"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Background video of a paper plane artwork on blue sky"
      >
        <source src={paperplane_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Scroll Indicator */}
      <div className="hero-scrollWrap">
        <div className="hero-scrollBar"></div>
      </div>
    </section>
  );
};

export default Hero;