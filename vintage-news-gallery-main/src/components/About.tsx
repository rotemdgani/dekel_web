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
                Dekel Harari is a contemporary artist who transforms newspaper media into vibrant 
                modern and pop art compositions. Working at the intersection of traditional collage 
                and contemporary aesthetics, his pieces explore the relationship between mass media, 
                cultural memory, and artistic expression.
              </p>

              <p className="about-paragraph">
                Each artwork begins with carefully selected newspaper fragments, which are then 
                reimagined through modern art techniques and pop art sensibilities. This process 
                creates a unique dialogue between the ephemeral nature of news and the permanence 
                of fine art, resulting in pieces that are both timely and timeless.
              </p>

              <p className="about-paragraph">
                Dekel's work has gained recognition for its innovative approach to mixed media, 
                combining traditional newspaper collage with bold modern elements that speak to 
                contemporary culture and visual communication.
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
            <div className="about-quote-content">
              <div className="about-quote-mark">"</div>
              <blockquote className="about-quote-text">
                The newspaper is not just my canvas—it's my collaborator. Each headline, 
                each fragment carries its own story, and my art emerges from the conversation 
                between these stories and contemporary visual language.
              </blockquote>
              <div className="about-quote-mark rotate-180">"</div>
            </div>
            <div className="about-quote-author">
              <p className="about-quote-name">Dekel Harari</p>
              <p className="about-quote-role">Modern & Pop Art with Newspaper Collage</p>
            </div>
            <div className="about-quote-image">
              <img src={dekel} alt="Dekel Harari Portrait" className="about-quote-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;