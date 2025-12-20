import { useState, useMemo } from "react";
import SeriesLabel from "./SeriesLabel";
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
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cart, setCart] = useState<number[]>([]);

  // Define exact artwork order by series
  const artworkOrder = [
    // 1. Taped Rose
    { id: 39, series: "flowers" }, // Taped Rose
    
    // 2. Taped Anemone
    { id: 40, series: "flowers" }, // Taped Anemone
    
    // 3. In the Loop
    { id: 44, series: "in-the-loop" }, // In the Loop
    
    // 4. Business & Pleasure
    { id: 35, series: "face-card" }, // Business & Pleasure
    
    // 5. Education
    { id: 37, series: "face-card" }, // Education
    
    // 6. Between Layers
    { id: 41, series: "under-layers-rope" }, // Between Layers
    
    // 7. Subtext
    { id: 43, series: "unreadable" }, // Subtext
    
    // 8. The Price of Beauty
    { id: 36, series: "face-card" }, // The Price of Beauty
    
    // 9. Split Page
    { id: 42, series: "under-layers-rope" }, // Split Page
    
    // 10. Bride Interrupted
    { id: 48, series: "other" }, // Bride, Interrupted
    
    // 11. City Interrupted
    { id: 45, series: "other" }, // City, Interrupted
    
    // 12. Light Study
    { id: 46, series: "other" }, // Light Study
    
    // 13. Over the City
    { id: 47, series: "other" }, // Over the city (Homage to Mark Chagall)
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
    return orderedArtworks;
  }, [orderedArtworks]);

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
        <div className="museum-gallery-container">
          {filteredArtworks.map((item, index) => {
            const { artwork, isFirstInSeries, series } = item;
            
            // Check for flowers pair (Taped Rose and Anemone)
            const isTapedRose = artwork.title === "Taped Rose";
            const isTapedAnemone = artwork.title === "Taped Anemone";
            const nextItem = filteredArtworks[index + 1];
            const isNextTapedAnemone = nextItem && nextItem.artwork.title === "Taped Anemone";
            const prevItem = filteredArtworks[index - 1];
            const isPrevTapedRose = prevItem && prevItem.artwork.title === "Taped Rose";
            
            // Check for Between Layers and Split Page (now separate rows)
            const isSplitPage = artwork.title === "Split Page";
            const isBetweenLayers = artwork.title === "Between Layers";
            const isSubtext = artwork.title === "Subtext";
            const isOverTheCity = artwork.title === "Over the city (Homage to Mark Chagall)";
            
            // Skip if being rendered as part of a stack
            if (isTapedAnemone && isPrevTapedRose) {
              return null;
            }
            
                                                                             // Special handling for "Business & Pleasure" - make it smaller and right-aligned
              const isBusinessPleasure = artwork.title === "Business & Pleasure";
               
               let sizeClass = isBusinessPleasure ? "medium" : getSizeClass(index);
               
               // Make Between Layers and Subtext bigger
               if (isBetweenLayers) {
                 sizeClass = "large";
               } else if (isSubtext) {
                 sizeClass = "large";
               }
               
               // Make Over the City smaller (30% reduction)
               if (isOverTheCity) {
                 sizeClass = "small";
               }
               
                               // Apply special alignment modifiers
                let alignmentClass = isBusinessPleasure ? "right" : isSubtext ? "center" : isOverTheCity ? "center" : getAlignmentClass(index);

            // Render vertical stack for Flowers (Taped Rose on top row, Taped Anemone on second row)
            // No series label for flowers - clear two-row hierarchy
            if (isTapedRose && isNextTapedAnemone) {
              return (
                <div key={`stack-${artwork.id}-${nextItem.artwork.id}`} className="museum-artwork-flowers-stack">
                  <div className="museum-artwork-stack museum-artwork-stack--flowers">
                    {/* Taped Rose - Top Row, Dominant */}
                    <div className="museum-artwork museum-artwork--stack-item museum-artwork--flowers-top">
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
                    {/* Taped Anemone - Second Row, Smaller */}
                    <div className="museum-artwork museum-artwork--stack-item museum-artwork--flowers-bottom">
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
                {/* Don't show series labels for flowers, rope artworks, unreadable, in-the-loop, face-card, or other */}
                {isFirstInSeries && 
                 series !== "flowers" && 
                 series !== "under-layers-rope" && 
                 series !== "unreadable" &&
                 series !== "in-the-loop" &&
                 series !== "face-card" &&
                 series !== "other" && (
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
