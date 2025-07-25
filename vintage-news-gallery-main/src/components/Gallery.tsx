import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ArtworkModal from "@/components/ui/artwork-modal";
import "./Gallery.css";

import women2 from '@/assets/women2.png'
import profile_vintage from '@/assets/profile_vintage.png'
import shagal from '@/assets/shagal.jpg'
import earth from '@/assets/earth.jpg'
import oldman_vintage from '@/assets/oldman_vintage.png'
import profile_vintage2 from '@/assets/profile2_vintage.png'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  const artworks = [
    {
      id: 1,
      title: "Diamond Cut",
      category: "newspaper-portraits",
      price: "$1,200",
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: women2,
      description: "A  sharp silhouette of a woman in a wide-brimmed hat, made from newspaper clippings. Her diamond-shaped earrings stand out against the headlines, blending elegance with quiet observation.",
    },
    {
      id: 2,
      title: "Side Note",
      category: "newspaper-portraits",
      price: "$1,200",
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: profile_vintage,
      description: "A  woman’s side profile made entirely from newspaper clippings, with a single paper flower above her head. Clean lines, bold contrast, and quiet presence.",
    },
    {
      id: 3,
      title: "Half Truth",
      category: "newspaper-portraits",
      price: "$1,200",
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: oldman_vintage,
      description: "A bearded face, only partially revealed, built from layered newspaper text. Headlines and fragments replace skin – blending identity with information, and truth with omission.",
    },
    {
      id: 4,
      title: "The Reader",
      category: "newspaper-portraits",
      price: "$1,200",
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: profile_vintage2,
      description: "A  silhouette of a woman holding a newspaper, her figure shaped from the very headlines she reads. The act of reading becomes part of her form – quiet, focused, and made of the stories that surround her.",
    },
    {
      id: 5,
      title: "Memory Fragments",
      category: "modern-art",
      price: "$950",
      medium: "Mixed media with modern techniques",
      dimensions: "18\" x 24\"",
      image: shagal,
      description: "Abstract modern interpretation using newspaper as a contemporary artistic medium.",
    },
    {
      id: 6,
      title: "Pop Culture Echo",
      category: "pop-art",
      price: "$1,400",
      medium: "Newspaper collage with pop art styling",
      dimensions: "30\" x 40\"",
      image: earth,
      description: "Bold pop art composition that transforms news media into vibrant contemporary statements.",
    },
  ];

  const categories = [
    { id: "all", label: "All Works" },
    { id: "newspaper-portraits", label: "Newspaper Portraits" },
    { id: "modern-art", label: "Modern Art" },
    { id: "pop-art", label: "Pop Art" },
  ];

  const filteredArtworks = selectedCategory === "all"
    ? artworks
    : artworks.filter((artwork) => artwork.category === selectedCategory);

  return (
    <section id="gallery" className="gallery-section">
      <ArtworkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        artwork={selectedArtwork}
      />
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">GALLERY</h2>
          <div className="gallery-divider"></div>
          <p className="gallery-subtitle">
            Dekel Harari's contemporary works blending newspaper collage with modern and pop art aesthetics
          </p>
        </div>

        <div className="gallery-filters">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              aria-label={`Filter by ${category.label}`}
              className="gallery-filter-btn"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="gallery-card">
              <div
                className="gallery-card-image"
                onClick={() => {
                  setSelectedArtwork(artwork);
                  setModalOpen(true);
                }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedArtwork(artwork);
                    setModalOpen(true);
                  }
                }}
                aria-label={`View ${artwork.title} in detail`}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="gallery-image"
                />
              </div>
              <div className="gallery-card-content">
                <h3 className="gallery-card-title">{artwork.title}</h3>
                <p className="gallery-card-details">
                  {artwork.medium} • {artwork.dimensions}
                </p>
                <p className="gallery-card-description">{artwork.description}</p>
                <div className="gallery-card-footer">
                  <span className="gallery-card-price">{artwork.price}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedArtwork(artwork);
                      setModalOpen(true);
                    }}
                    aria-label={`Inquire about ${artwork.title}`}
                    className="gallery-card-btn"
                  >
                    Inquire
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="gallery-footer">
          <Button variant="outline" size="lg" className="gallery-view-more">
            View Complete Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;