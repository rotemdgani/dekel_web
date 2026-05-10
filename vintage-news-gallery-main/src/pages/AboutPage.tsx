import aboutPortrait from "@/assets/dekel profile.webp";
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
        My name is Dekel Harari. I&apos;m a contemporary mixed-media artist based
        in Israel.
      </p>
      <p>
        My work is about routine — and the moment habit takes the wheel and the
        mind stops asking questions.
      </p>
      <p>
        I work with newspapers as my main material. Not because of what&apos;s
        written in them, and not because they&apos;re free, but because of what
        they are as objects. The most ordinary thing there is: it arrives, gets
        read, gets thrown away, and tomorrow another one shows up exactly like
        it. Routine, printed.
      </p>
      <p>
        But the newspaper isn&apos;t really the subject. It&apos;s a stand-in.
        For the feed, the notification, the headline — for everything that enters
        the mind before we&apos;ve had a chance to decide what we&apos;re actually
        thinking.
      </p>
      <p>I change its job.</p>
      <p>
        I cut it, paint on it, build with it. Headlines become texture. Faces
        dissolve. Figures lose their features — not from a single blow, but from
        repetition.
      </p>
      <p>
        I come from a place where this mechanism runs at a higher setting. Where
        an air-raid siren fits between washing the dishes and taking out the
        trash. Where an explosion becomes white noise, like an old air conditioner.
        Where war becomes a fifth season.
      </p>
      <p>The shock doesn&apos;t disappear. It gets absorbed. It becomes wallpaper.</p>
      <p>The question isn&apos;t what we do.</p>
      <p>It&apos;s the moment it stops being habit and starts being choice.</p>
      <p>
        And what else we might choose differently, if we actually stopped to
        think.
      </p>
    </div>
    <p className="about-signature">— Dekel Harari</p>
  </article>
);

export default AboutPage;
