import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ArtworkModal from "@/components/ui/artwork-modal";
import "./Store.css";
import butterflies from '@/assets/butterflies.jpg'
import profile_vintage from '@/assets/profile_vintage.png'
import enjoy from '@/assets/enjoy.png'

const Store = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  const products = [
    {
      id: 1,
      title: "Urban Chronicles",
      category: "Original Artwork",
      price: 1200,
      originalPrice: null,
      medium: "Newspaper collage with acrylic on canvas",
      dimensions: "24\" x 36\"",
      image: butterflies,
      description: "A vibrant composition merging newspaper fragments with contemporary pop art elements. This original piece explores urban narratives through Dekel's signature collage technique.",
      availability: "Available",
      isLimited: false,
    },
    {
      id: 2,
      title: "Memory Fragments",
      category: "Original Artwork",
      price: 950,
      originalPrice: 1100,
      medium: "Mixed media with modern techniques",
      dimensions: "18\" x 24\"",
      image: profile_vintage,
      description: "Abstract modern interpretation using newspaper as a contemporary artistic medium. Limited time special pricing.",
      availability: "Available",
      isLimited: true,
    },
    {
      id: 3,
      title: "Pop Culture Echo",
      category: "Original Artwork",
      price: 1400,
      originalPrice: null,
      medium: "Newspaper collage with pop art styling",
      dimensions: "30\" x 40\"",
      image: enjoy,
      description: "Bold pop art composition that transforms news media into vibrant contemporary statements. Dekel's largest piece in the current collection.",
      availability: "Available",
      isLimited: false,
    },
  ];

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="store" className="store-section">
      <ArtworkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        artwork={selectedArtwork}
      />
      <div className="store-container">
        <div className="store-header">
          <h2 className="store-title">
            <span className="text-accent">ART</span> STORE
          </h2>
          <div className="store-divider"></div>
          <p className="store-subtitle">
            Original artworks by Dekel Harari available for purchase. Each piece comes with a certificate of authenticity.
          </p>
        </div>

        <div className="store-info-bar">
          <div className="store-info-grid">
            <div>
              <h4 className="store-info-title">Free Shipping</h4>
              <p className="store-info-text">On all original artworks within the US</p>
            </div>
            <div>
              <h4 className="store-info-title">Certificate Included</h4>
              <p className="store-info-text">Each artwork comes with authenticity certificate</p>
            </div>
            <div>
              <h4 className="store-info-title">Secure Packaging</h4>
              <p className="store-info-text">Professional art shipping and handling</p>
            </div>
          </div>
        </div>

        <div className="store-grid">
          {products.map((product) => (
            <Card key={product.id} className="store-card">
              <div className="store-card-image">
                <img
                  src={product.image}
                  alt={product.title}
                  className="store-image"
                />
                <div className="store-overlay">
                  <div className="store-overlay-actions">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleFavorite(product.id)}
                      className="store-favorite-btn"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-accent text-accent" : ""}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setSelectedArtwork({
                          title: product.title,
                          image: product.image,
                          description: product.description,
                          medium: product.medium,
                          dimensions: product.dimensions,
                          price: formatPrice(product.price),
                        });
                        setModalOpen(true);
                      }}
                      className="store-view-btn"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="store-badges">
{/*                   {product.isLimited && (
                    <Badge variant="destructive" className="store-badge-special">
                      Special Price
                    </Badge>
                  )} */}
                  <Badge variant="secondary" className="store-badge-category">
                    {product.category}
                  </Badge>
                </div>
              </div>
              <div className="store-card-content">
                <h3 className="store-card-title">{product.title}</h3>
                <p className="store-card-details">
                  {product.medium} • {product.dimensions}
                </p>
                <p className="store-card-description">{product.description}</p>
                <div className="store-card-pricing">
                  <span className="store-card-price">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="store-card-original-price">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <p className="store-card-availability">{product.availability}</p>
                </div>
                <div className="store-card-actions">
                  <Button
                    className="store-add-to-cart"
                    onClick={() => addToCart(product.id)}
                    disabled={cart.includes(product.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {cart.includes(product.id) ? "In Cart" : "Add to Cart"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavorite(product.id)}
                    className="store-favorite-icon"
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-accent text-accent" : ""}`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="store-cart-summary">
            <Card className="store-cart-card">
              <h4 className="store-cart-title">Cart Summary</h4>
              <div className="store-cart-items">
                {cart.map((id) => {
                  const product = products.find((p) => p.id === id);
                  return product ? (
                    <div key={id} className="store-cart-item">
                      <span>{product.title}</span>
                      <span>{formatPrice(product.price)}</span>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="store-cart-total">
                <span>Total:</span>
                <span>
                  {formatPrice(
                    cart.reduce((total, id) => {
                      const product = products.find((p) => p.id === id);
                      return total + (product?.price || 0);
                    }, 0)
                  )}
                </span>
              </div>
              <Button className="store-checkout-btn">Proceed to Checkout</Button>
            </Card>
          </div>
        )}

        <div className="store-custom-work">
          <Card className="store-custom-card">
            <h3 className="store-custom-title">Commission Custom Work</h3>
            <p className="store-custom-text">
              Interested in a custom piece? Dekel Harari accepts commissions for personalized artworks 
              that blend your vision with his signature newspaper collage and modern art style.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="store-custom-btn"
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

export default Store;