import React, { useState, useRef } from 'react';
import './blur-image.css';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  [key: string]: any; // Allow additional props to be passed through
}

const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  className = '',
  placeholderSrc,
  onLoad,
  onError,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLImageElement>(null);

  const handleMainImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleMainImageError = () => {
    setHasError(true);
    onError?.();
  };

  const handlePlaceholderLoad = () => {
    setPlaceholderLoaded(true);
  };

  const handlePlaceholderError = () => {
    // If placeholder fails, just show the main image
    setPlaceholderLoaded(false);
  };

  // Use provided placeholder or create a simple data URL
  const finalPlaceholderSrc = placeholderSrc || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23f0f0f0'/%3E%3C/svg%3E`;

  return (
    <div className={`blur-image-container ${className}`}>
      {/* Blurred placeholder */}
      {!isLoaded && (
        <img
          ref={placeholderRef}
          src={finalPlaceholderSrc}
          alt={`${alt} - Loading...`}
          className={`blur-image-placeholder ${placeholderLoaded ? 'loaded' : ''}`}
          onLoad={handlePlaceholderLoad}
          onError={handlePlaceholderError}
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`blur-image-main ${isLoaded ? 'loaded' : ''}`}
        loading={loading}
        onLoad={handleMainImageLoad}
        onError={handleMainImageError}
        {...props}
      />

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="blur-image-loading">
          <div className="blur-image-spinner"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="blur-image-error">
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default BlurImage; 