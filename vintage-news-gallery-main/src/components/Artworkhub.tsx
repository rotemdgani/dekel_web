import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ArtworkModal from "@/components/ui/artwork-modal";
import "./ArtworkHub.css";

import women2 from '@/assets/women2.png';
import profile_vintage from '@/assets/profile_vintage.png';
import shagal from '@/assets/shagal.jpg';
import earth from '@/assets/earth.jpg';
import oldman_vintage from '@/assets/oldman_vintage.png';
import profile_vintage2 from '@/assets/profile2_vintage.png';
import butterflies from '@/assets/butterflies.jpg';
import enjoy from '@/assets/enjoy.png';

const ArtworkHub = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  const artworks = [
    {
      id: 1,
      title: "Diamond Cut",
      category: "newspaper-portraits",
      price: 1200,
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: women2,
      description: "A sharp silhouette of a woman in a wide-brimmed hat, made from newspaper clippings. Her diamond-shaped earrings stand out against the headlines.",
      availability: "Available",
      isLimited: false,
    },
    {
      id: 2,
      title: "Side Note",
      category: "newspaper-portraits",
      price: 1200,
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: profile_vintage,
      description: "A woman’s side profile made entirely from newspaper clippings, with a single paper flower above her head. Clean lines and bold contrast.",
      availability: "Available",
      isLimited: false,
    },
    {
      id: 3,
      title: "Half Truth",
      category: "newspaper-portraits",
      price: 1200,
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: oldman_vintage,
      description: "A bearded face, only partially revealed, built from layered newspaper text. Headlines blend with identity.",
      availability: "Available",
      isLimited: false,
    },
    {
      id: 4,
      title: "The Reader",
      category: "newspaper-portraits",
      price: 1200,
      medium: "Newspaper collage with acrylic",
      dimensions: "24\" x 36\"",
      image: profile_vintage2,
      description: "A silhouette of a woman holding a newspaper, her figure shaped from headlines she reads. Quiet and focused.",
      availability: "Available",
      isLimited: false,
    },
    {
      id: 5,
      title: "Memory Fragments",
      category: "modern-art",
      price: 950,
      originalPrice: 1100,
      medium: "Mixed media with modern techniques",
      dimensions: "18\" x 24\"",
      image: shagal,
      description: "Abstract modern interpretation using newspaper as a contemporary medium. Limited time pricing.",
      availability: "Available",
      isLimited: true,
    },
    {
      id: 6,
      title: "Pop Culture Echo",
      category: "pop-art",
      price: 1400,
      medium: "Newspaper collage with pop art styling",
      dimensions: "30\" x 40\"",
      image: earth,
      description: "Bold pop art composition transforming news media into vibrant statements.",
      availability: "Available",
      isLimited: false,
    },
    {
      id: 7,
      title: "Urban Chronicles",
      category: "original-artwork",
      price: 1200,
      medium: "Newspaper collage with acrylic on canvas",
      dimensions: "24\" x 36\"",
      image: butterflies,
      description: "A vibrant composition merging newspaper fragments with pop art elements. Explores urban narratives.",
      availability: "Available",
      isLimited: false,
    },
    {
      id: 8,
      title: "Pop Culture Echo",
      category: "original-artwork",
      price: 1400,
      medium: "Newspaper collage with pop art styling",
      dimensions: "30\" x 40\"",
      image: enjoy,
      description: "Bold pop art composition, Dekel’s largest piece in the current collection.",
      availability: "Available",
      isLimited: false,
    },
  ];

  const categories = [
    "Newspaper Portraits",
    "Modern Art",
    "Pop Art",
    "Original Artwork",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = (productId: number) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
      toast({
        title: "Added to Cart",
        description: "Artwork has been added to your cart.",
      });
    } else {
      toast({
        title: "Already in Cart",
        description: "This artwork is already in your cart.",
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      toast({
        title: "Removed from Favorites",
        description: "Artwork removed from your favorites.",
      });
    } else {
      setFavorites([...favorites, productId]);
      toast({
        title: "Added to Favorites",
        description: "Artwork added to your favorites.",
      });
    }
  };

  return (
    <section id="artworkhub" className="artwork-hub-section">
      <ArtworkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        artwork={selectedArtwork}
      />
      <div className="artwork-hub-container">
        <div className="artwork-hub-header">
          <h1 className="artwork-hub-banner">DEKEL’S ART SPACE</h1>
          <h2 className="artwork-hub-title">Gallery & Shop</h2>
          <div className="artwork-hub-divider"></div>
          <p className="artwork-hub-subtitle">View and buy Dekel Harari’s stunning modern artworks</p>
        </div>

        <div className="artwork-hub-content">
          {categories.map((category) => {
            const categoryArtworks = artworks.filter(artwork => artwork.category === category.toLowerCase().replace(" ", "-"));
            if (categoryArtworks.length > 0) {
              return (
                <div key={category} className="artwork-hub-category-section">
                  <h3 className="artwork-hub-category-title">{category}</h3>
                  <div className="artwork-hub-category-grid">
                    {categoryArtworks.map((artwork) => (
                      <article key={artwork.id} className="artwork-hub-article">
                        <div className="artwork-hub-article-image">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="artwork-hub-image"
                            loading="lazy"
                          />
                          <div className="artwork-hub-overlay">
                            <div className="artwork-hub-overlay-actions">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => toggleFavorite(artwork.id)}
                                className="artwork-hub-favorite-btn"
                              >
                                <Heart
                                  className={`w-4 h-4 ${favorites.includes(artwork.id) ? "fill-accent text-accent" : ""}`}
                                />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                  setSelectedArtwork({
                                    title: artwork.title,
                                    image: artwork.image,
                                    description: artwork.description,
                                    medium: artwork.medium,
                                    dimensions: artwork.dimensions,
                                    price: formatPrice(artwork.price),
                                  });
                                  setModalOpen(true);
                                }}
                                className="artwork-hub-view-btn"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="artwork-hub-badges">
{/*                             {artwork.isLimited && (
                              <Badge variant="destructive" className="artwork-hub-badge-special">
                                Special Price
                              </Badge>
                            )} */}
                            <Badge variant="secondary" className="artwork-hub-badge-category">
                              {artwork.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="artwork-hub-article-content">
                          <h3 className="artwork-hub-article-title">{artwork.title}</h3>
                          <p className="artwork-hub-article-details">
                            {artwork.medium} • {artwork.dimensions}
                          </p>
                          <p className="artwork-hub-article-description">{artwork.description}</p>
                          <div className="artwork-hub-article-footer">
                            <span className="artwork-hub-article-price">{formatPrice(artwork.price)}</span>
                            {artwork.originalPrice && (
                              <span className="artwork-hub-article-original-price">
                                {formatPrice(artwork.originalPrice)}
                              </span>
                            )}
                            <p className="artwork-hub-article-availability">{artwork.availability}</p>
                            <Button
                              className="artwork-hub-add-to-cart"
                              onClick={() => addToCart(artwork.id)}
                              disabled={cart.includes(artwork.id)}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {cart.includes(artwork.id) ? "In Cart" : "Add to Cart"}
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {cart.length > 0 && (
          <div className="artwork-hub-cart-summary">
            <Card className="artwork-hub-cart-card">
              <h4 className="artwork-hub-cart-title">Cart Summary</h4>
              <div className="artwork-hub-cart-items">
                {cart.map((id) => {
                  const product = artworks.find((p) => p.id === id);
                  return product ? (
                    <div key={id} className="artwork-hub-cart-item">
                      <span>{product.title}</span>
                      <span>{formatPrice(product.price)}</span>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="artwork-hub-cart-total">
                <span>Total:</span>
                <span>
                  {formatPrice(
                    cart.reduce((total, id) => {
                      const product = artworks.find((p) => p.id === id);
                      return total + (product?.price || 0);
                    }, 0)
                  )}
                </span>
              </div>
              <Button className="artwork-hub-checkout-btn">Proceed to Checkout</Button>
            </Card>
          </div>
        )}

        <div className="artwork-hub-custom-work">
          <Card className="artwork-hub-custom-card">
            <h3 className="artwork-hub-custom-title">Commission Custom Work</h3>
            <p className="artwork-hub-custom-text">
              Interested in a custom piece? Dekel Harari accepts commissions for personalized artworks 
              that blend your vision with his modern art style.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="artwork-hub-custom-btn"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Request Commission
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArtworkHub;