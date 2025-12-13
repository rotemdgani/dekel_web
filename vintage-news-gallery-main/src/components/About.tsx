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
              Dekel Harari is a Tel Aviv–based contemporary artist whose work unfolds between two opposing forces - the quiet permanence of nature, and the restless pulse of daily news.
              </p>

              <p className="about-paragraph">
              My works begin with headlines, often before I'm even aware of their impact. Some are born from actual events; others from the emotional residue they leave behind. I was not trained to escape reality - I was shaped by it. I grew up inside routine, deadlines, noise, offices, and the fragile moments of silence in between. Painting became the way I paused the world. Not to reject it or romanticize it - but to understand it.
              </p>

              <p className="about-paragraph">
              I use newspapers because they are temporary - printed to be consumed, then forgotten. When I paint over them, I'm not erasing information but reclaiming it. Transforming noise into form, surface into memory. I try to make painting a way to understand what cannot be reported.
              </p>

              <p className="about-paragraph">
              My practice lives between the eternal - sky, love, silence, breath - and the urgent rhythm of headlines. In that narrow space between what happened and what we felt, my work takes shape. Not as documentation, but as a quiet rewrite of reality.
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