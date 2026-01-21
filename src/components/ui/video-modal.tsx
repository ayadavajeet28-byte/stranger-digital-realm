import { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  type?: 'video' | 'image';
  posterSrc?: string;
  title?: string;
}

export function VideoModal({ isOpen, onClose, src, type = 'video', posterSrc, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, src]);

  useEffect(() => {
    if (type === 'video' && isOpen && videoRef.current && !hasError) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user will need to click play
        setIsLoading(false);
      });
    } else if (type === 'image' && isOpen) {
      // specific logic for image if needed
    }
  }, [isOpen, hasError, type]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    if (type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleMediaLoaded = () => {
    setIsLoading(false);
  };

  const handleMediaError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-card/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 glow-red"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Media container */}
      <div className="relative max-w-5xl w-full max-h-[90vh] animate-scale-in flex flex-col items-center">
        {/* Title */}
        {title && (
          <h3 className="font-display text-2xl text-primary mb-4 text-center tracking-wider bg-background/50 px-4 py-1 rounded-full backdrop-blur-sm">
            {title}
          </h3>
        )}

        {/* Media Content */}
        <div className={`relative rounded-lg overflow-hidden border border-primary/30 glow-red ${type === 'image' ? 'w-auto h-auto max-w-full' : 'w-full'}`}>
          {/* Loading overlay */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10 min-h-[200px]">
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="relative min-h-[300px] w-full bg-muted flex items-center justify-center">
              <div className="text-center p-6">
                <p className="font-retro text-lg text-muted-foreground mb-2">Failed to load media</p>
                <p className="text-sm text-muted-foreground/50">{src}</p>
              </div>
            </div>
          )}

          {/* Video element */}
          {!hasError && type === 'video' && (
            <video
              ref={videoRef}
              src={src}
              poster={posterSrc}
              className="w-full h-auto max-h-[80vh] object-contain bg-background"
              controls
              playsInline
              preload="metadata"
              onCanPlay={handleMediaLoaded}
              onError={handleMediaError}
            />
          )}

          {/* Image element */}
          {!hasError && type === 'image' && (
            <img
              src={src}
              alt={title || 'Full view'}
              className="w-full h-auto max-h-[80vh] object-contain bg-background"
              onLoad={handleMediaLoaded}
              onError={handleMediaError}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
