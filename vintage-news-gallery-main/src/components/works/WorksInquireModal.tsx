import { useEffect, useState } from "react";
import type { Artwork } from "@/data/artworks";
import { CONTACT_EMAIL, WHATSAPP_PHONE } from "@/config/site";
import {
  displayYear,
  lightboxDimensionLine,
  lightboxMediumLine,
  whatsappInterestMessage,
} from "@/lib/workDisplay";
import "./WorksInquireModal.css";

interface WorksInquireModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

const WorksInquireModal = ({ artwork, onClose }: WorksInquireModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!artwork) return;
    setName("");
    setEmail("");
    setMessage(`I'm interested in ${artwork.title}.`);
    setSent(false);
  }, [artwork]);

  useEffect(() => {
    if (!artwork) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [artwork, onClose]);

  useEffect(() => {
    document.body.style.overflow = artwork ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [artwork]);

  if (!artwork) return null;

  const yearStr = displayYear(artwork);
  const sizeStr = lightboxDimensionLine(artwork);
  const techniqueStr = lightboxMediumLine(artwork);

  const mailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ];
    const subject = `Inquiry — ${artwork.title}`;
    const body = lines.join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    whatsappInterestMessage(artwork),
  )}`;

  return (
    <div className="wim-root" role="dialog" aria-modal="true" aria-label="Inquire">
      <button type="button" className="wim-backdrop" aria-label="Close" onClick={onClose} />
      <div className="wim-card">
        <button type="button" className="wim-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <h2 className="wim-title">Inquire</h2>
        <p className="wim-sub">
          About: <span className="wim-sub-work">{artwork.title}</span>
        </p>

        <div className="wim-art">
          <img src={artwork.image} alt={artwork.title} className="wim-art-img" />
        </div>

        <div className="wim-readonly">
          {yearStr.length > 0 ? <p className="wim-line">{yearStr}</p> : null}
          <p className="wim-line">{sizeStr}</p>
          <p className="wim-line">{techniqueStr}</p>
        </div>

        {sent ? (
          <p className="wim-thanks">Thank you. We&apos;ll be in touch.</p>
        ) : (
          <form className="wim-form" onSubmit={mailtoSubmit}>
            <label className="wim-label">
              Name
              <input
                className="wim-input"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label className="wim-label">
              Email
              <input
                className="wim-input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className="wim-label">
              Message
              <textarea
                className="wim-textarea"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="wim-submit">
              Submit
            </button>
            <a
              href={waUrl}
              className="wim-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default WorksInquireModal;
