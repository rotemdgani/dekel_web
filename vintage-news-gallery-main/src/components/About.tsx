import "./About.css";
import dekelProfile from '@/assets/dekel_profile.webp'

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
              My name is Dekel Harari, and I&apos;m the artist behind the works you&apos;re seeing here.
              </p>

              <p className="about-paragraph">
              I&apos;m a contemporary mixed-media artist, and my work looks at routine, repetition, information overload, and the moment habit takes the wheel and the mind stops asking questions.
              </p>

              <p className="about-paragraph">
              I work with newspapers as a main material.
              </p>

              <p className="about-paragraph">
              Not because of what&apos;s written in them, and not because they&apos;re free, but because of what they feel like as objects.
              </p>

              <p className="about-paragraph">
              What do I do with them?
              </p>

              <p className="about-paragraph">
              I change their job.
              </p>

              <p className="about-paragraph">
              Instead of reading them and tossing them out, I cut them, paint on them, and build with them. Sometimes I even sell them, if someone insists.
              </p>

              <p className="about-paragraph">
              The question isn&apos;t what we do,
              </p>

              <p className="about-paragraph">
              but when it stops being habit and starts being choice.
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