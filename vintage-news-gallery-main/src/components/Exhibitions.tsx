import "./Exhibitions.css";
import EventGallery from "./EventGallery";

// Utility function to generate slug from title
// lowercase, spaces to hyphens, remove punctuation (letters/numbers only)
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove punctuation, keep only letters, numbers, spaces, hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Parse date string to Date object for sorting
const parseDate = (dateString: string): Date => {
  // Try to parse various date formats
  // "December 24, 2025 | 19:00" -> "December 24, 2025"
  // "February 19, 18:30" -> assume current year
  // "September 2025" -> "September 1, 2025"
  // "April 2024" -> "April 1, 2024"
  // "2024" -> "January 1, 2024"
  
  let cleanDate = dateString.split('|')[0].trim();
  
  // If only month and year, add day 1
  const monthYearMatch = cleanDate.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    cleanDate = `${monthYearMatch[1]} 1, ${monthYearMatch[2]}`;
  }
  
  // If only year, add January 1
  if (/^\d{4}$/.test(cleanDate)) {
    cleanDate = `January 1, ${cleanDate}`;
  }
  
  // If month and day but no year, assume current year (2025)
  const monthDayMatch = cleanDate.match(/^([A-Za-z]+)\s+(\d{1,2})$/);
  if (monthDayMatch) {
    cleanDate = `${monthDayMatch[1]} ${monthDayMatch[2]}, 2025`;
  }
  
  const parsed = new Date(cleanDate);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed; // Return epoch if invalid
};

const Exhibitions = () => {
  const exhibitions = [
    {
      title: "SUPER SPARTA – Group Exhibition",
      curator: "Curated by Shira Nina Tier & Hila Brenner",
      date: "December 24, 2025",
      location: "Rothschild 69, Tel Aviv",
      description: "A group exhibition exploring contemporary visual culture through diverse artistic voices. The opening event will include a social gathering around art, with wine courtesy of Feldstein Winery. The exhibition positions art as a shared experience encouraging dialogue and contemporary reflection.",
      slug: "super-sparta",
    },
    {
      title: "Art Gathering",
      curator: "Curated by Or Bitton",
      date: "February 19, 2026",
      location: "Tel Aviv",
      description: "This event presented a selection of works by Dekel Harari within a social setting that encouraged dialogue around media, memory, and contemporary visual culture. The gathering positioned art as a shared experience and a space for conversation.",
      slug: "art-gathering",
    },
    {
      title: "Peace and Goodbye",
      curator: "Curated by Gaby Zeltsman",
      date: "September 2025",
      location: "Yaara Open Studio, Jaffa",
      description: "Group exhibition in collaboration with Yaara Open Studio, Jaffa. The exhibition explores the moment between faith and rupture through various artistic interpretations of the dove image, featuring works that examine peace symbols and their contemporary relevance.",
      slug: "peace-and-goodbye",
    },
    {
      title: "Solo Exhibition: Soho House Hotel, Jaffa",
      date: "April 2024",
      location: "Soho House Hotel, Jaffa",
      description: "A personal exhibition featuring a series of works showcasing the blend of business and art in a creative journey.",
      slug: "soho-house-jaffa",
    },
    {
      title: "Tel Aviv University",
      curator: "Curated by Yaira Yasmin",
      date: "July 2024",
      location: "Tel Aviv University",
      description: "Group exhibition displaying three works reflecting on the impact of war and disasters. These pieces explore the emotional and societal aftermath of such events, providing a visual commentary on resilience and recovery.",
      slug: "tel-aviv-university",
    },
    {
      title: "Lotan Gallery, Jaffa",
      curator: "Curated by Orly Dvir",
      date: "January 2024",
      location: "Lotan Gallery, Jaffa",
      description: "Group exhibition titled \"Rebirth,\" showcasing four original works.",
      slug: "lotan-gallery-jaffa",
    },
    {
      title: "Ben Ami Gallery, Tel Aviv",
      curator: "Curated by Doron Polak",
      date: "2024",
      location: "Ben Ami Gallery, Tel Aviv",
      description: "Group exhibition presenting three pieces that explore the intersection of art and daily life.",
      slug: "ben-ami-gallery",
    },
  ];

  // Sort exhibitions chronologically (newest first)
  const sortedExhibitions = [...exhibitions].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });

  return (
    <section id="exhibitions" className="exhibitions-section">
      <div className="exhibitions-container">
        <div className="exhibitions-header">
          <h2
            className="exhibitions-title"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.history.replaceState(null, '', '/exhibitions');
            }}
          >
            Exhibitions / Events
          </h2>
          <div className="exhibitions-divider"></div>
        </div>

        <div className="exhibitions-content">
          {sortedExhibitions.map((exhibition, index) => (
            <article key={index} className="exhibition-item">
              <div className="exhibition-header">
                <h3 className="exhibition-title">{exhibition.title}</h3>
                {exhibition.curator && (
                  <p className="exhibition-curator">{exhibition.curator}</p>
                )}
              </div>
              <div className="exhibition-details">
                <div className="exhibition-meta">
                  <span className="exhibition-date">{exhibition.date}</span>
                  {exhibition.location && (
                    <>
                      <span className="exhibition-separator">•</span>
                      <span className="exhibition-location">{exhibition.location}</span>
                    </>
                  )}
                </div>
              </div>
              <p className="exhibition-description">{exhibition.description}</p>
              {exhibition.slug !== "ben-ami-gallery" && (
                <EventGallery 
                  eventSlug={exhibition.slug || generateSlug(exhibition.title)} 
                  eventTitle={exhibition.title}
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;
