import "./About.css";
import dekel from '@/assets/dekel-portrait.jpg'

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <div className="about-header">
              <h2 className="about-title">
                ABOUT
                <br />
                <span className="text-accent">DEKEL HARARI</span>
              </h2>
              <div className="about-divider"></div>
            </div>

            <div className="about-text">
              <p className="about-paragraph">
              Dekel Harari is a Tel Aviv-based contemporary artist who deconstructs and reconstructs newspaper media into striking visual narratives. Working with mixed media and acrylic on canvas, his practice exists at the crossroads of conceptual art, media critique, and contemporary aesthetics.
              </p>

              <p className="about-paragraph">
              His distinctive approach involves dismantling newspapers and reassembling them as symbols of rebuilding - creating a powerful metaphor for how we construct and reconstruct our understanding of reality. Each piece offers a personal interpretation of current events, transforming the mundane into the extraordinary through the lens of beauty and imagination.
              </p>

              <p className="about-paragraph">
              Dekel's work explores the tension between routine and wonder, presenting minimalist compositions with sharp, deliberate messages. His pieces function as visual commentaries that challenge viewers to reconsider their relationship with information consumption and media representation.
              </p>

              <p className="about-paragraph">
              Dekel Harari's works offer a fresh perspective on the reality surrounding us - they don't merely document time, but invite the viewer to rebuild it anew.              </p>
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
              <img src={dekel} alt="Dekel Harari Portrait" className="about-quote-img" />
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