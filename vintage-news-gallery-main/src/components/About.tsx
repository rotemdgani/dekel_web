import "./About.css";
import dekelProfile from '@/assets/dekel_profile_copy.webp'

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <div className="about-header">
              <h2
                className="about-title"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.history.replaceState(null, '', '/about');
                }}
              >
                BETWEEN THE HEADLINES
                <br />
                <span className="text-accent"></span>
              </h2>
              <div className="about-divider"></div>
            </div>

            <div className="about-text">
              <p className="about-paragraph">
                My name is Dekel Harari. I&apos;m a contemporary mixed-media artist based
                in Tel Aviv.
              </p>

              <p className="about-paragraph">
                My work is about routine - and the moment habit takes the wheel and the mind
                stops asking questions.
              </p>

              <p className="about-paragraph">
                I work with newspapers as my main material. Not because of what&apos;s
                written in them, and not because they&apos;re free, but because of what they
                are as objects. The most ordinary thing there is: it arrives, gets read,
                gets thrown away, and tomorrow another one shows up exactly like it.
                Routine, printed.
              </p>

              <p className="about-paragraph">
                But the newspaper isn&apos;t really the subject. It&apos;s a stand-in. For the
                feed, the notification, the headline - for everything that enters the mind
                before we&apos;ve had a chance to decide what we&apos;re actually thinking.
              </p>

              <p className="about-paragraph">I change its job.</p>

              <p className="about-paragraph">
                I cut it, paint on it, build with it. Headlines become texture. Faces
                dissolve. Figures lose their features - not from a single blow, but from
                repetition.
              </p>

              <p className="about-paragraph">
                I come from a place where this mechanism runs at a higher setting. Where an
                air-raid siren fits between washing the dishes and taking out the trash.
                Where an explosion becomes white noise, like an old air conditioner. Where war
                becomes a fifth season.
              </p>

              <p className="about-paragraph">
                The shock doesn&apos;t disappear. It gets absorbed. It becomes wallpaper.
              </p>

              <p className="about-paragraph">The question isn&apos;t what we do.</p>

              <p className="about-paragraph">
                It&apos;s the moment it stops being habit and starts being choice.
              </p>

              <p className="about-paragraph">
                And what else we might choose differently, if we actually stopped to think.
              </p>
            </div>
{/* 
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-number">75+</div>
                <div className="about-stat-label">Artworks Created</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">15</div>
                <div className="about-stat-label">Gallery Shows</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">10</div>
                <div className="about-stat-label">Years Practice</div>
              </div>
            </div> */}
          </div>

          <div className="about-quote">
            <div className="about-quote-image-container">
              <img src={dekelProfile} alt="Dekel Harari Profile" className="about-quote-img" loading="lazy" />
            </div>
            <div className="about-quote-content">

              <p className="about-quote-text">
              </p>
            </div>
            <div className="about-quote-author">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;