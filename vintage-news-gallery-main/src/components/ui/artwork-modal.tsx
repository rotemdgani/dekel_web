import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import "./artwork-model.css";
import { X } from "lucide-react";

interface ArtworkModalProps {
  open: boolean;
  onClose: () => void;
  artwork: any;
}

const ArtworkModal = ({ open, onClose, artwork }: ArtworkModalProps) => {
  if (!artwork) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="artwork-modal-content">
        <DialogHeader>
          <DialogTitle>{artwork.title}</DialogTitle>
          <DialogClose asChild>
          </DialogClose>
        </DialogHeader>
        <img src={artwork.image} alt={artwork.title} className="w-full h-auto max-h-[70vh] object-contain" />
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;