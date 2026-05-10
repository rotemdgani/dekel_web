import { Link } from "react-router-dom";

import aboutPortrait from "@/assets/dekel profile.webp";

import "./HomeAboutExcerpt.css";

const HomeAboutExcerpt = () => (
  <section className="home-about-excerpt" aria-labelledby="home-about-excerpt-heading">
    <div className="home-about-excerpt-inner">
      <figure className="home-about-excerpt-figure">
        <img
          src={aboutPortrait}
          alt="Dekel Harari"
          className="home-about-excerpt-img"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="home-about-excerpt-copy">
        <p className="home-about-excerpt-kicker" id="home-about-excerpt-heading">
          A note from the artist
        </p>
        <p className="home-about-excerpt-body">
          My name is Dekel Harari. I&apos;m a contemporary mixed-media artist based
          in Israel. My work is about routine — and the moment habit takes the
          wheel and the mind stops asking questions.
        </p>
        <Link className="home-about-excerpt-link" to="/about">
          Read more →
        </Link>
      </div>
    </div>
  </section>
);

export default HomeAboutExcerpt;
