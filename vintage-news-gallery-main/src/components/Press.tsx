import "./Press.css";

const Press = () => {
  const pressItems = [
    {
      title: "Dekel Harari: Transforming Newspaper into Art",
      source: "DA Magazine",
      date: "July 18, 2025",
      link: "https://www.da-magazine.co.il/%D7%90%D7%95%D7%9E%D7%A0%D7%95%D7%AA/dekel-harari/",
      content: "In a stunning display of creativity, Dekel Harari redefines modern art by weaving newspaper clippings into vibrant pop art masterpieces. This Tel Aviv-based artist has captivated audiences with his unique approach, blending the ephemeral nature of news with timeless artistic expression.",
    },
    {
      title: "Innovative Solutions: Dekel Harari's Biotech Inspiration",
      source: "TLV Times",
      date: "July 15, 2025",
      link: "https://tlvtimes.co.il/מדינת-תל-אביב/מנכל-חברת-הביוטק-שמצא-פתרון-לבעיית-השח/",
      content: "Harari's latest work draws inspiration from biotech innovations, merging art with science. His recent piece, showcased in Tel Aviv, highlights a fusion of cutting-edge ideas and traditional collage techniques, earning praise from local critics.",
    },
    {
      title: "War and Peace Exhibition",
      source: "Tel Aviv University Library",
      date: "2025",
      link: "https://soclib.tau.ac.il/events/exhibitions/warandpeace",
      content: "Dekel Harari's work is featured in the War and Peace Exhibition at Tel Aviv University Library, showcasing his unique approach to contemporary art and media critique through newspaper collage techniques.",
    },
  ];

  const exhibitions = [
    {
      title: "Solo Exhibition: Soho House Hotel, Jaffa",
      date: "April 2024",
      description: "A personal exhibition featuring a collection of works showcasing the blend of business and art in a creative journey.",
    },
    {
      title: "Lotan Gallery, Jaffa",
      date: "January 2024",
      description: "Group exhibition titled \"Rebirth,\" curated by Orly Dvir, showcasing four original works.",
    },
    {
      title: "Tel Aviv University",
      date: "July 2024",
      description: "Group exhibition curated by Yaira Yasmin, displaying three works reflecting on the impact of war and disasters. These pieces explore the emotional and societal aftermath of such events, providing a visual commentary on resilience and recovery.",
    },
    {
      title: "Ben Ami Gallery, Tel Aviv",
      date: "2024",
      description: "Group exhibition curated by Doron Polak, presenting three pieces that explore the intersection of art and daily life.",
    },
  ];

  return (
    <section id="press" className="press-section">
      <div className="press-container">
        <div className="press-header">
          <h2 className="press-title">Press Coverage</h2>
          <div className="press-divider"></div>
          <p className="press-subtitle">
            Step into the world of Dekel Harari as featured in leading publications.
          </p>
        </div>

        <div className="press-content">
          {pressItems.map((item, index) => (
            <article key={index} className="press-article">
              <h3 className="press-article-headline">{item.title}</h3>
              <div className="press-article-columns">
                <p className="press-article-text">{item.content}</p>
              </div>
              <div className="press-article-footer">
                <span className="press-article-source">{item.source}</span> | 
                <span className="press-article-date">{item.date}</span>
                {item.link ? (
                  <a href={item.link} className="press-article-link" target="_blank" rel="noopener noreferrer">
                    Read Full Article
                  </a>
                ) : (
                  <span className="press-article-link-disabled">
                    Link Temporarily Unavailable
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Exhibitions Section */}
        <div className="exhibitions-section">
          <h3 className="exhibitions-title">Exhibitions</h3>
          <ul className="exhibitions-list">
            {exhibitions.map((exhibition, index) => (
              <li key={index} className="exhibition-item">
                <div className="exhibition-header">
                  <span className="exhibition-title">{exhibition.title}</span>
                  <span className="exhibition-date">– {exhibition.date}</span>
                </div>
                <p className="exhibition-description">{exhibition.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Press;