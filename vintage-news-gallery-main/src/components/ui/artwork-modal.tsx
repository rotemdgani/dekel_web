import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import "./artwork-model.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ArtworkModalProps {
  open: boolean;
  onClose: () => void;
  artwork: any;
  selectedImageIndex: number;
  prevImage: () => void;
  nextImage: () => void;
  onAddToCart: (artworkId: number) => void;
  cart: number[];
}

const ArtworkModal = ({ 
  open, 
  onClose, 
  artwork, 
  selectedImageIndex, 
  prevImage, 
  nextImage, 
  onAddToCart, 
  cart 
}: ArtworkModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  
  if (!artwork) return null;

  const images = artwork.images || [artwork.image];
  
  // Price formatting function commented out for future reactivation if needed
  /*
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };
  */

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="artwork-modal-content">
          <DialogHeader>
            <DialogTitle className="artwork-modal-title">{artwork.title}</DialogTitle>
          </DialogHeader>
          
          <div className="artwork-modal-body">
            <div className="artwork-modal-image-container" onClick={handleImageClick}>
              <img
                src={images[selectedImageIndex]}
                alt={`${artwork.title} - Image ${selectedImageIndex + 1}`}
                className="artwork-modal-image"
              />
              {images.length > 1 && (
                <div className="artwork-modal-navigation">
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="artwork-modal-nav-btn">
                    <ChevronLeft />
                  </button>
                  <span className="artwork-modal-index">{selectedImageIndex + 1} / {images.length}</span>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="artwork-modal-nav-btn">
                    <ChevronRight />
                  </button>
                </div>
              )}
            </div>
            
            <div className="artwork-modal-details">
              <div className="artwork-modal-details-row">
                <div className="artwork-modal-detail-item">
                  <span className="artwork-modal-detail-label">Medium</span>
                  <span className="artwork-modal-detail-value">{artwork.medium}</span>
                </div>
                <div className="artwork-modal-detail-item">
                  <span className="artwork-modal-detail-label">Dimensions</span>
                  <div className="artwork-modal-detail-value">
                    <div>{artwork.dimensions.split(' - ')[0]}</div>
                    {artwork.dimensions.includes(' - ') && (
                      <div className="artwork-modal-frame-info">{artwork.dimensions.split(' - ')[1]}</div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Price and Availability indicators commented out for future reactivation if needed
              <div className="artwork-modal-details-row">
                {artwork.availability !== 'SOLD' && (
                  <div className="artwork-modal-detail-item">
                    <span className="artwork-modal-detail-label">Price</span>
                    <span className="artwork-modal-detail-value artwork-modal-price">{formatPrice(artwork.price)}</span>
                  </div>
                )}
                <div className="artwork-modal-detail-item">
                  <span className="artwork-modal-detail-label">Availability</span>
                  <span className={`artwork-modal-detail-value artwork-modal-availability ${artwork.availability === 'SOLD' ? 'sold' : 'available'}`}>
                    {artwork.availability}
                  </span>
                </div>
              </div>
              */}
              
              {artwork.description && (
                <div className="artwork-modal-description">
                  <p>{artwork.description}</p>
                </div>
              )}
              
              <div className="artwork-modal-actions">
                {/* Commented out for future reactivation if needed
                <Button
                  className="artwork-modal-add-to-cart-btn"
                  onClick={() => onAddToCart(artwork.id)}
                  disabled={cart.includes(artwork.id) || artwork.availability === 'SOLD'}
                >
                  {cart.includes(artwork.id) ? "In Collection" : artwork.availability === 'SOLD' ? "Sold" : "Purchase Artwork"}
                </Button>
                
                <Button
                  className="artwork-modal-inquire-btn"
                  onClick={() => {
                    const artworkName = `Artwork: ${artwork.title}`;
                    const subject = `I have a question about the artwork ${artwork.title}`;
                    const encodedArtworkName = encodeURIComponent(artworkName);
                    const encodedSubject = encodeURIComponent(subject);
                    
                    // Close the modal first
                    onClose();
                    
                    // Navigate to contact page with parameters
                    setTimeout(() => {
                      // Set the hash with parameters (no message parameter)
                      window.location.hash = `contact?artwork=${encodedArtworkName}&subject=${encodedSubject}`;
                      
                      // Scroll to contact section
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  variant="outline"
                >
                  Inquire about this artwork
                </Button>
                */}
                
                <Button
                  className="artwork-modal-whatsapp-btn"
                  onClick={() => {
                    const message = `Hi, I'm interested in the artwork "${artwork.title}". Can you please provide more information about availability and pricing?`;
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappUrl = `https://wa.me/972507451500?text=${encodedMessage}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  variant="default"
                >
                  Ask about this piece
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Zoom Overlay */}
      <div className={`artwork-modal-image-zoom-overlay ${isZoomed ? 'active' : ''}`} onClick={handleZoomClose}>
        <img
          src={images[selectedImageIndex]}
          alt={`${artwork.title} - Zoomed View`}
          className="artwork-modal-zoom-image"
          onClick={(e) => e.stopPropagation()}
        />
        <button className="artwork-modal-zoom-close" onClick={handleZoomClose}>
          <X />
        </button>
      </div>
    </>
  );
};

export default ArtworkModal;