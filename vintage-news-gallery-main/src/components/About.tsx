import "./About.css";
import dekel from '@/assets/dekel-portrait.jpg'

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
              Dekel Harari is a Tel Aviv–based contemporary artist whose practice unfolds at the intersection of timeless foundations and the fleeting noise of daily news.
              </p>

              <p className="about-paragraph">
              His work emerges from the tension between two worlds:
              The classical world – nature, sky, love, eternal elements that embody beauty and breath.
              And the news-driven world – a relentless flood of information, shifting headlines, a gray and grown-up routine that overwhelms us.
              </p>

              <p className="about-paragraph">
              Between the two, art takes shape – a pause where time stands still, and the everyday is dismantled and rebuilt. Harari does not document reality; he proposes to reconstruct it. Not as a report, but as a new gaze that returns wonder to the ordinary.
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
              <img src={dekel} alt="Dekel Harari Portrait" className="about-quote-img" loading="lazy" />
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