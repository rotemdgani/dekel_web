import { useState, useMemo } from "react";
import SeriesLabel from "./SeriesLabel";
import SeriesFilter from "./SeriesFilter";
import ArtworkModal from "@/components/ui/artwork-modal";
import "./MuseumGallery.css";

interface Artwork {
  id: number;
  title: string;
  category: string;
  price: number;
  medium: string;
  dimensions: string;
  image: string;
  description: string;
  availability: string;
  isLimited: boolean;
  year?: string;
}

interface MuseumGalleryProps {
  artworks: Artwork[];
}

const MuseumGallery = ({ artworks }: MuseumGalleryProps) => {
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cart, setCart] = useState<number[]>([]);

  // Define exact artwork order by series
  const artworkOrder = [
    // Face Card (first)
    { id: 35, series: "face-card" }, // Business & Pleasure
    { id: 37, series: "face-card" }, // Education
    { id: 36, series: "face-card" }, // The Price of Beauty
    
    // Based on a True Story (second)
    { id: 13, series: "based-on-a-true-story" }, // Broken Departure
    { id: 11, series: "based-on-a-true-story" }, // Dove Among Crows
    { id: 7, series: "based-on-a-true-story" }, // Peace Bomber
    { id: 8, series: "based-on-a-true-story" }, // Bride Interrupted
    { id: 15, series: "based-on-a-true-story" }, // Over the Headlines
    
    // The Good Times (third)
    { id: 25, series: "the-good-times" }, // Orange Sky
    { id: 24, series: "the-good-times" }, // OOO
    { id: 26, series: "the-good-times" }, // Pink Fields
    { id: 27, series: "the-good-times" }, // Headline Erased
  ];

  const orderedArtworks = useMemo(() => {
    const artworkMap = new Map(artworks.map(art => [art.id, art]));
    const ordered: Array<{ artwork: Artwork; series: string; isFirstInSeries: boolean }> = [];
    let lastSeries: string | null = null;
    
    artworkOrder.forEach(({ id, series }) => {
      const artwork = artworkMap.get(id);
      if (artwork) {
        const isFirstInSeries = series !== lastSeries;
        ordered.push({
          artwork,
          series,
          isFirstInSeries
        });
        lastSeries = series;
      }
    });
    
    return ordered;
  }, [artworks]);

  const filteredArtworks = useMemo(() => {
    if (!activeSeries) {
      return orderedArtworks;
    }
    return orderedArtworks.filter((item) => item.series === activeSeries);
  }, [orderedArtworks, activeSeries]);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setSelectedImageIndex(0);
    setModalOpen(true);
  };

  const prevImage = () => {
    if (!selectedArtwork) return;
    const images = (selectedArtwork as any).images || [selectedArtwork.image];
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = () => {
    if (!selectedArtwork) return;
    const images = (selectedArtwork as any).images || [selectedArtwork.image];
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const getSizeClass = (index: number) => {
    // Vary sizes subtly for visual rhythm
    const sizes = ["large", "medium", "large", "medium", "large"];
    return sizes[index % sizes.length];
  };

  const getAlignmentClass = (index: number) => {
    // Create a subtle zig-zag pattern: left, right, left, right, (occasionally left again)
    // This creates the "museum walkthrough" rhythm
    const alignments = ["left", "right", "left", "right", "left"];
    return alignments[index % alignments.length];
  };

  return (
    <>
      <section id="gallery" className="museum-gallery">
        <SeriesFilter
          activeSeries={activeSeries}
          onFilterChange={setActiveSeries}
        />

        <div className="museum-gallery-container">
          {filteredArtworks.map((item, index) => {
            const { artwork, isFirstInSeries, series } = item;
            
            // Check if this is Pink Fields or Headline Erased for side-by-side display
            const isPinkFields = artwork.title === "Pink Fields";
            const isHeadlineErased = artwork.title === "Headline Erased";
            const nextItem = filteredArtworks[index + 1];
            const isNextHeadlineErased = nextItem && nextItem.artwork.title === "Headline Erased";
            const prevItem = filteredArtworks[index - 1];
            const isPrevPinkFields = prevItem && prevItem.artwork.title === "Pink Fields";
            
            // Skip Headline Erased if it's being rendered as part of the side-by-side pair
            if (isHeadlineErased && isPrevPinkFields) {
              return null;
            }
            
                                                                             // Special handling for "Business & Pleasure" - make it smaller and right-aligned
              const isBusinessPleasure = artwork.title === "Business & Pleasure";
              // Special handling for "OOO" - make it large with closer title
              const isOOO = artwork.title === "OOO";
                             // Special size handling for specific artworks
               const isOrangeSky = artwork.title === "Orange Sky";
               const isOverHeadlines = artwork.title === "Over the Headlines (Homage to Marc Chagall)";
               const isBrideInterrupted = artwork.title === "Bride Interrupted";
               
               let sizeClass = isBusinessPleasure ? "medium" : isOOO ? "large" : getSizeClass(index);
               
               // Apply special size modifiers
               if (isOrangeSky) {
                 sizeClass = "large-small"; // 5% smaller than large
               } else if (isOverHeadlines) {
                 sizeClass = "medium-small"; // 15% smaller
               } else if (isBrideInterrupted) {
                 sizeClass = "large-small"; // 5% smaller than large
               }
               
                               // Apply special alignment modifiers
                let alignmentClass = isBusinessPleasure ? "right" : getAlignmentClass(index);
                if (isOrangeSky) {
                  alignmentClass = "right"; // Move right
                } else if (isOverHeadlines) {
                  alignmentClass = "left"; // Move left
                } else if (isBrideInterrupted) {
                  alignmentClass = "right"; // Move right
                }

            // Render side-by-side container for Pink Fields + Headline Erased
            if (isPinkFields && isNextHeadlineErased) {
              return (
                <div key={`pair-${artwork.id}-${nextItem.artwork.id}`}>
                  {isFirstInSeries && (
                    <div className="museum-series-label-container">
                      <SeriesLabel
                        series={series}
                        position="left"
                      />
                    </div>
                  )}
                  <div className="museum-artwork-pair">
                    <div className="museum-artwork museum-artwork--pair-item">
                      <div className="museum-artwork-content">
                        <div
                          className="museum-artwork-image-wrapper"
                          onClick={() => handleArtworkClick(artwork)}
                        >
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="museum-artwork-image"
                            loading={index < 6 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                        <div className="museum-artwork-info">
                          <h3 className="museum-artwork-title">{artwork.title}</h3>
                          {artwork.year && (
                            <span className="museum-artwork-year">{artwork.year}</span>
                          )}
                          {artwork.medium && (
                            <p className="museum-artwork-medium">{artwork.medium}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="museum-artwork museum-artwork--pair-item">
                      <div className="museum-artwork-content">
                        <div
                          className="museum-artwork-image-wrapper"
                          onClick={() => handleArtworkClick(nextItem.artwork)}
                        >
                          <img
                            src={nextItem.artwork.image}
                            alt={nextItem.artwork.title}
                            className="museum-artwork-image"
                            loading={index < 6 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                        <div className="museum-artwork-info">
                          <h3 className="museum-artwork-title">{nextItem.artwork.title}</h3>
                          {nextItem.artwork.year && (
                            <span className="museum-artwork-year">{nextItem.artwork.year}</span>
                          )}
                          {nextItem.artwork.medium && (
                            <p className="museum-artwork-medium">{nextItem.artwork.medium}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={artwork.id}>
                {isFirstInSeries && (
                  <div className="museum-series-label-container">
                    <SeriesLabel
                      series={series}
                      position="left"
                    />
                  </div>
                )}
                                                                   <div
                    className={`museum-artwork museum-artwork--${sizeClass} museum-artwork--${alignmentClass}`}
                    data-artwork-title={artwork.title}
                  >
                   <div className={`museum-artwork-content ${isOOO ? "museum-artwork-content--tight" : ""}`}>
                    <div
                      className="museum-artwork-image-wrapper"
                      onClick={() => handleArtworkClick(artwork)}
                    >
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="museum-artwork-image"
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                    <div className="museum-artwork-info">
                      <h3 className="museum-artwork-title">{artwork.title}</h3>
                      {artwork.year && (
                        <span className="museum-artwork-year">{artwork.year}</span>
                      )}
                      {artwork.medium && (
                        <p className="museum-artwork-medium">{artwork.medium}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedArtwork && (
        <ArtworkModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedArtwork(null);
            setSelectedImageIndex(0);
          }}
          artwork={selectedArtwork}
          selectedImageIndex={selectedImageIndex}
          prevImage={prevImage}
          nextImage={nextImage}
          onAddToCart={(id: number) => {
            setCart([...cart, id]);
          }}
          cart={cart}
        />
      )}
    </>
  );
};

export default MuseumGallery;
