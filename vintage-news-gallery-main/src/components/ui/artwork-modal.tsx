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
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

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
                  <span className="artwork-modal-detail-value">{artwork.dimensions}</span>
                </div>
              </div>
              
              <div className="artwork-modal-details-row">
                <div className="artwork-modal-detail-item">
                  <span className="artwork-modal-detail-label">Price</span>
                  <span className="artwork-modal-detail-value artwork-modal-price">{formatPrice(artwork.price)}</span>
                </div>
                <div className="artwork-modal-detail-item">
                  <span className="artwork-modal-detail-label">Availability</span>
                  <span className={`artwork-modal-detail-value artwork-modal-availability ${artwork.availability === 'SOLD' ? 'sold' : 'available'}`}>
                    {artwork.availability}
                  </span>
                </div>
              </div>
              
              {artwork.description && (
                <div className="artwork-modal-description">
                  <p>{artwork.description}</p>
                </div>
              )}
              
              <div className="artwork-modal-actions">
                <Button
                  className="artwork-modal-add-to-cart-btn"
                  onClick={() => onAddToCart(artwork.id)}
                  disabled={cart.includes(artwork.id) || artwork.availability === 'SOLD'}
                >
                  {cart.includes(artwork.id) ? "In Collection" : artwork.availability === 'SOLD' ? "Sold" : "Purchase Artwork"}
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