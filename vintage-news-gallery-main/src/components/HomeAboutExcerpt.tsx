import { Link } from "react-router-dom";

import aboutPortrait from "@/assets/dekel_profile.webp";

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
          I&apos;m a mixed-media artist living and working in Tel Aviv. I work on
          newspapers — the most ordinary of objects, read once, thrown away, and
          replaced the next morning by another just like it. The figures aren&apos;t
          the people in the stories, but the ones reading them.
        </p>
        <Link className="home-about-excerpt-link" to="/about">
          Read more →
        </Link>
      </div>
    </div>
  </section>
);

export default HomeAboutExcerpt;
