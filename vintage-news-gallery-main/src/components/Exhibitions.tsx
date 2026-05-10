import EventGallery from "@/components/EventGallery";
import { exhibitionsSortedNewestFirst } from "@/data/exhibitionsDetail";
import "./Exhibitions.css";

const Exhibitions = () => {
  const sortedExhibitions = exhibitionsSortedNewestFirst();

  return (
    <section id="exhibitions" className="exhibitions-section">
      <div className="exhibitions-container">
        <div className="exhibitions-header">
          <h2
            className="exhibitions-title"
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.history.replaceState(null, "", "/exhibitions");
            }}
          >
            Exhibitions / Events
          </h2>
          <div className="exhibitions-divider" />
        </div>

        <div className="exhibitions-content">
          {sortedExhibitions.map((exhibition) => (
            <article key={exhibition.id} className="exhibition-item">
              <div className="exhibition-header">
                <h3 className="exhibition-title">{exhibition.title}</h3>
                {exhibition.curator ? (
                  <p className="exhibition-curator">{exhibition.curator}</p>
                ) : null}
              </div>
              <div className="exhibition-details">
                <div className="exhibition-meta">
                  {exhibition.isUpcoming ? (
                    <>
                      <span className="exhibition-upcoming">Upcoming</span>
                      <span className="exhibition-separator" aria-hidden="true">
                        •
                      </span>
                    </>
                  ) : null}
                  <span className="exhibition-date">{exhibition.dateLabel}</span>
                  <span className="exhibition-separator" aria-hidden="true">
                    •
                  </span>
                  <span className="exhibition-location">{exhibition.location}</span>
                </div>
              </div>
              <p className="exhibition-description">{exhibition.description}</p>
              {exhibition.showGallery ? (
                <EventGallery
                  eventSlug={exhibition.slug}
                  eventTitle={exhibition.title}
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;
