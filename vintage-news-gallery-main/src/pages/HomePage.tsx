import { Link } from "react-router-dom";

import coverImageUrl from "@/assets/fp.webp";

import { HOMEPAGE_HERO_TITLE } from "@/config/site";

import HomeProjects from "@/components/HomeProjects";

import "./HomePage.css";


const HomePage = () => (
  <>
    <div className="home-editorial" id="home">
      <section className="home-hero-viewport" aria-label="Cover artwork">
        <img
          src={coverImageUrl}
          alt=""
          className="home-hero-img"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <div className="home-hero-scrim" aria-hidden="true" />

        <div className="home-hero-content">
          <h1 className="home-hero-title">{HOMEPAGE_HERO_TITLE}</h1>

          <Link className="home-hero-cta" to="/works">
            View All Works →
          </Link>
        </div>
      </section>
    </div>

    <HomeProjects />
  </>
);



export default HomePage;

