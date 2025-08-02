import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import "./artwork-model.css";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ArtworkModalProps {
  open: boolean;
  onClose: () => void;
  artwork: any;
  selectedImageIndex: number;
  prevImage: () => void;
  nextImage: () => void;
}

const ArtworkModal = ({ open, onClose, artwork, selectedImageIndex, prevImage, nextImage }: ArtworkModalProps) => {
  if (!artwork) return null;

  const images = artwork.images || [artwork.image]; // תמיכה בודדת או מרובות

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="artwork-modal-content">
        <DialogHeader>
          <DialogTitle>{artwork.title}</DialogTitle>
          {/* הסרת ה-close-btn המותאם אישית, השארת רק את האיקס המובנה של Dialog */}
        </DialogHeader>
        <div className="artwork-modal-image-container">
          <img
            src={images[selectedImageIndex]}
            alt={`${artwork.title} - Image ${selectedImageIndex + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
          {images.length > 1 && (
            <div className="artwork-modal-navigation">
              <button onClick={prevImage} className="artwork-modal-nav-btn">
                <ChevronLeft />
              </button>
              <span className="artwork-modal-index">{selectedImageIndex + 1} / {images.length}</span>
              <button onClick={nextImage} className="artwork-modal-nav-btn">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;