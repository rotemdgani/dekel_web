import ImageSlider from "./ImageSlider";
import "./MuseumHero.css";

const MuseumHero = () => {
  return (
    <>
      <section id="home" className="museum-hero-slider">
        <ImageSlider />
      </section>
      <section className="museum-hero">
        <div className="museum-hero-content">
          <div className="museum-hero-text">
            <p className="museum-statement">
              We think we&apos;re thinking.
            </p>
            <p className="museum-statement">
              We feel we&apos;re feeling.
            </p>
            <p className="museum-statement">
              We believe we&apos;re deciding.
            </p>
            <p className="museum-statement">
              The same newspaper in the morning, the same scroll on the phone, the same route to work.
            </p>
            <p className="museum-statement">
              Actions repeated until the mind learns to perform them without asking.
            </p>
            <p className="museum-statement">
              Over time, habit turns into identity.
            </p>
            <p className="museum-statement">
              My work focuses on that moment.
            </p>
            <p className="museum-statement">
              Between genuine thought and automatic response.
            </p>
            <p className="museum-statement">
              Between lives that are experienced and lives that are executed.
            </p>
            <p className="museum-statement">
              The newspaper in my work is not a tool for reading, but raw material.
            </p>
            <p className="museum-statement">
              A layer of noise, overload, and repetition.
            </p>
            <p className="museum-statement">
              Not to tell a story,
            </p>
            <p className="museum-statement">
              but to ask:
            </p>
            <p className="museum-statement">
              Where does habit end, and where does choice begin?
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MuseumHero;
