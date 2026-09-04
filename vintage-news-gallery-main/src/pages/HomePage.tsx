import { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import coverDesktopUrl from "@/assets/fp.webp";
import coverMobileUrl from "@/assets/Headline.webp";

import { HOMEPAGE_HERO_TITLE } from "@/config/site";
import { NOTICE_ANCHOR_ID } from "@/data/noticeCopy";
import {
  HOME_SERIES_SECTION_ID,
  scrollToElementById,
} from "@/lib/scrollToHash";

import HomeOffThePress from "@/components/HomeOffThePress";
import HomeProjects from "@/components/HomeProjects";
import Notice from "@/components/Notice";

import "./HomePage.css";

const HERO_PRELOAD_ATTR = "data-home-hero-preload";
const MOBILE_HERO_MQ = "(max-width: 768px)";

const HERO_ALT =
  "Headline — a figure in a black turtleneck against a wall of newspaper, the head absent";

function syncHeroPreload() {
  const isMobile = window.matchMedia(MOBILE_HERO_MQ).matches;
  const href = isMobile ? coverMobileUrl : coverDesktopUrl;
  const media = isMobile ? MOBILE_HERO_MQ : "(min-width: 769px)";

  let link = document.head.querySelector<HTMLLinkElement>(
    `link[${HERO_PRELOAD_ATTR}]`,
  );
  if (!link) {
    link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.setAttribute(HERO_PRELOAD_ATTR, "1");
    document.head.appendChild(link);
  }
  link.href = href;
  link.media = media;
}

const HomePage = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    syncHeroPreload();
    const mq = window.matchMedia(MOBILE_HERO_MQ);
    const onChange = () => syncHeroPreload();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      document.head.querySelector(`link[${HERO_PRELOAD_ATTR}]`)?.remove();
    };
  }, []);

  useLayoutEffect(() => {
    const hash = location.hash.replace(/^#/, "");
    if (hash !== HOME_SERIES_SECTION_ID && hash !== NOTICE_ANCHOR_ID) return;

    const timer = window.setTimeout(() => {
      scrollToElementById(hash);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <>
      <div className="home-editorial" id="home">
        <section className="home-hero-viewport" aria-label="Cover artwork">
          <picture className="home-hero-picture">
            <source media={MOBILE_HERO_MQ} srcSet={coverMobileUrl} />
            <img
              src={coverDesktopUrl}
              alt={HERO_ALT}
              className="home-hero-img"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <div className="home-hero-scrim" aria-hidden="true" />

          <div className="home-hero-content">
            <h1 className="home-hero-title">{HOMEPAGE_HERO_TITLE}</h1>

            <Link className="home-hero-cta" to={`/#${HOME_SERIES_SECTION_ID}`}>
              View All Works →
            </Link>
          </div>
        </section>
      </div>

      <HomeProjects />
      <HomeOffThePress />
      <Notice className="works-notice--home" />
    </>
  );
};

export default HomePage;
