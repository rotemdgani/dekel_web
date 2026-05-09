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

  // Updated curatorial layout order
  const curatorialOrder = [
    // 1. HERO OPENING - Business & Pleasure
    { id: 35, size: "hero-large", align: "center", pair: null },
    
    // 2. STRONG ENTRY PAIR - Before Coffee & Drop (routine/overload)
    { id: 52, size: "medium-large", align: "left", pair: "before-coffee-drop", leftBias: true },
    { id: 51, size: "medium-large", align: "right", pair: "before-coffee-drop" },
    
    // 3. IDENTITY DISRUPTION SECTION
    // Erased
    { id: 37, size: "medium-large", align: "left-offset", pair: null },
    // 21.03.2025
    { id: 41, size: "large", align: "right", pair: null },
    
    // 4. MEDIA/MEMORY PAIR - Headline & Memory
    { id: 49, size: "medium", align: "left", pair: "headline-memory", leftHeavy: true },
    { id: 50, size: "medium", align: "right", pair: "headline-memory" },
    
    // 4a. Cut and Paste (was In the Loop)
    { id: 44, size: "medium", align: "center", pair: null },

    { id: 55, size: "medium-large", align: "center", pair: null },
    { id: 56, size: "small", align: "right-offset", pair: null },

    // 5. POETIC PAUSE - Taped Rose & Taped Anemone
    { id: 39, size: "medium-small", align: "left", pair: "flowers", poeticPause: true },
    { id: 40, size: "medium", align: "right", pair: "flowers", poeticPause: true },

    { id: 57, size: "medium-small", align: "center", pair: null },

    // 6. EXISTENTIAL TRANSITION
    // Used to Be
    { id: 53, size: "medium-large", align: "center", pair: null },
    { id: 59, size: "medium", align: "left-offset", pair: null },
    // Scrabble (conceptual echo, slightly right and lower)
    { id: 54, size: "small", align: "right-offset", pair: null, echo: true },
    // Split Page – placed after Scrabble and before City, Interrupted
    { id: 42, size: "medium-small", align: "center", pair: null },
    { id: 36, size: "medium-small", align: "center", pair: null },

    // 7. CLIMAX SECTION - Nightlife & Bride, Interrupted
    { id: 45, size: "large", align: "left", pair: "climax" },
    { id: 48, size: "medium-large", align: "right-offset", pair: "climax", slightlyLower: true },
    
    // 8. FINAL EXIT - Light Study
    { id: 46, size: "small", align: "center", pair: null, finalExit: true },
  ];

  const orderedArtworks = useMemo(() => {
    const artworkMap = new Map(artworks.map(art => [art.id, art]));
    const ordered: Array<{ 
      artwork: Artwork; 
      size: string; 
      align: string; 
      pair: string | null;
      leftBias?: boolean;
      leftHeavy?: boolean;
      poeticPause?: boolean;
      echo?: boolean;
      slightlyLower?: boolean;
      finalExit?: boolean;
    }> = [];
    
    curatorialOrder.forEach((item) => {
      const artwork = artworkMap.get(item.id);
      if (artwork) {
        ordered.push({
          artwork,
          size: item.size,
          align: item.align,
          pair: item.pair,
          leftBias: item.leftBias,
          leftHeavy: item.leftHeavy,
          poeticPause: item.poeticPause,
          echo: item.echo,
          slightlyLower: item.slightlyLower,
          finalExit: item.finalExit,
        });
      }
    });
    
    return ordered;
  }, [artworks]);

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

  // Render artwork with curatorial layout logic
  const renderArtwork = (item: typeof orderedArtworks[0], index: number) => {
    const { artwork, size, align, pair, leftBias, leftHeavy, poeticPause, echo, slightlyLower, finalExit } = item;
    
    // Handle paired artworks
    if (pair) {
      const pairItems = orderedArtworks.filter(item => item.pair === pair);
      const pairIndex = pairItems.findIndex(item => item.artwork.id === artwork.id);
      
      // Only render the first item of each pair
      if (pairIndex === 0) {
        const secondItem = pairItems[1];
        
        // Poetic pause pair (Taped Rose & Anemone) - centered block
        if (poeticPause) {
          return (
            <div key={`pair-${pair}`} className="museum-artwork-pair museum-artwork-pair--poetic-pause">
              <div className={`museum-artwork museum-artwork--${size} museum-artwork--${align}`}>
                <div className="museum-artwork-content">
                  <div className="museum-artwork-image-wrapper" onClick={() => handleArtworkClick(artwork)}>
                    <img src={artwork.image} alt={artwork.title} className="museum-artwork-image" loading={index < 6 ? "eager" : "lazy"} decoding="async" />
                  </div>
                  <div className="museum-artwork-info">
                    <h3 className="museum-artwork-title">{artwork.title}</h3>
                    {artwork.medium && <p className="museum-artwork-medium">{artwork.medium}</p>}
                  </div>
                </div>
              </div>
              <div className={`museum-artwork museum-artwork--${secondItem.size} museum-artwork--${secondItem.align}`}>
                <div className="museum-artwork-content">
                  <div className="museum-artwork-image-wrapper" onClick={() => handleArtworkClick(secondItem.artwork)}>
                    <img src={secondItem.artwork.image} alt={secondItem.artwork.title} className="museum-artwork-image" loading="lazy" decoding="async" />
                  </div>
                  <div className="museum-artwork-info">
                    <h3 className="museum-artwork-title">{secondItem.artwork.title}</h3>
                    {secondItem.artwork.medium && <p className="museum-artwork-medium">{secondItem.artwork.medium}</p>}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Climax section (City Interrupted & Bride Interrupted)
        if (pair === "climax") {
          return (
            <div key={`pair-${pair}`} className="museum-artwork-pair museum-artwork-pair--climax">
              <div className={`museum-artwork museum-artwork--${size} museum-artwork--${align}`}>
                <div className="museum-artwork-content">
                  <div className="museum-artwork-image-wrapper" onClick={() => handleArtworkClick(artwork)}>
                    <img src={artwork.image} alt={artwork.title} className="museum-artwork-image" loading="lazy" decoding="async" />
                  </div>
                  <div className="museum-artwork-info">
                    <h3 className="museum-artwork-title">{artwork.title}</h3>
                    {artwork.medium && <p className="museum-artwork-medium">{artwork.medium}</p>}
                  </div>
                </div>
              </div>
              <div className={`museum-artwork museum-artwork--${secondItem.size} museum-artwork--${secondItem.align} ${secondItem.slightlyLower ? "museum-artwork--slightly-lower" : ""}`}>
                <div className="museum-artwork-content">
                  <div className="museum-artwork-image-wrapper" onClick={() => handleArtworkClick(secondItem.artwork)}>
                    <img src={secondItem.artwork.image} alt={secondItem.artwork.title} className="museum-artwork-image" loading="lazy" decoding="async" />
                  </div>
                  <div className="museum-artwork-info">
                    <h3 className="museum-artwork-title">{secondItem.artwork.title}</h3>
                    {secondItem.artwork.medium && <p className="museum-artwork-medium">{secondItem.artwork.medium}</p>}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Regular pairs (Before Coffee & Drop, Headline & Memory)
        return (
          <div key={`pair-${pair}`} className={`museum-artwork-pair ${leftBias ? "museum-artwork-pair--left-bias" : ""} ${leftHeavy ? "museum-artwork-pair--left-heavy" : ""}`}>
            <div className={`museum-artwork museum-artwork--${size} museum-artwork--${align}`}>
              <div className="museum-artwork-content">
                <div className="museum-artwork-image-wrapper" onClick={() => handleArtworkClick(artwork)}>
                  <img src={artwork.image} alt={artwork.title} className="museum-artwork-image" loading={index < 6 ? "eager" : "lazy"} decoding="async" />
                </div>
                <div className="museum-artwork-info">
                  <h3 className="museum-artwork-title">{artwork.title}</h3>
                  {artwork.medium && <p className="museum-artwork-medium">{artwork.medium}</p>}
                </div>
              </div>
            </div>
            <div className={`museum-artwork museum-artwork--${secondItem.size} museum-artwork--${secondItem.align}`}>
              <div className="museum-artwork-content">
                <div className="museum-artwork-image-wrapper" onClick={() => handleArtworkClick(secondItem.artwork)}>
                  <img src={secondItem.artwork.image} alt={secondItem.artwork.title} className="museum-artwork-image" loading="lazy" decoding="async" />
                </div>
                <div className="museum-artwork-info">
                  <h3 className="museum-artwork-title">{secondItem.artwork.title}</h3>
                  {secondItem.artwork.medium && <p className="museum-artwork-medium">{secondItem.artwork.medium}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      }
      // Skip second item of pair (already rendered)
      return null;
    }
    
    // Single artworks
    return (
      <div 
        key={artwork.id} 
        className={`museum-artwork museum-artwork--${size} museum-artwork--${align} ${echo ? "museum-artwork--echo" : ""} ${finalExit ? "museum-artwork--final-exit" : ""}`}
      >
        <div className="museum-artwork-content">
          <div className="museum-artwork-image-wrapper" onClick={() => handleArtworkClick(artwork)}>
            <img src={artwork.image} alt={artwork.title} className="museum-artwork-image" loading={index < 6 ? "eager" : "lazy"} decoding="async" />
          </div>
          <div className="museum-artwork-info">
            <h3 className="museum-artwork-title">{artwork.title}</h3>
            {artwork.medium && <p className="museum-artwork-medium">{artwork.medium}</p>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="gallery" className="museum-gallery">
        <div className="museum-gallery-container">
          {orderedArtworks.map((item, index) => renderArtwork(item, index))}
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
