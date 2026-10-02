import aboutPortrait from "@/assets/hero_open_studios_2026_b.webp";
import "./AboutPage.css";

const AboutPage = () => (
  <article className="about-editorial">
    <p className="about-kicker">About</p>
    <figure className="about-portrait-wrap">
      <img
        src={aboutPortrait}
        alt="Dekel Harari"
        className="about-portrait"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <div className="about-body">
      <p>
        I&apos;m a mixed-media artist living and working in Tel Aviv.
      </p>
      <p>
        I work on newspapers — the most ordinary of objects, read once, thrown
        away, and replaced the next morning by another just like it. Routine,
        printed. I paint on them, cut them, frame them. Faces fold into
        headlines and dissolve into columns; a luxury ad swallows a face; a
        flower is taped into a gilded frame like something worth keeping. The
        figures aren&apos;t the people in the stories, but the ones reading
        them.
      </p>
      <p>
        I&apos;m interested in what repetition does to us — how the exceptional
        becomes background, and how what we take in every day quietly becomes
        part of who we are. I come from Israel, where alarm and routine often
        share the same afternoon. The shock doesn&apos;t disappear. It gets
        absorbed. It becomes wallpaper.
      </p>
    </div>
    <p className="about-signature">— Dekel Harari</p>
  </article>
);

export default AboutPage;
