import { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  posterSrc?: string;
  title?: string;
}

export function VideoModal({ isOpen, onClose, videoSrc, posterSrc, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, videoSrc]);

  useEffect(() => {
    if (isOpen && videoRef.current && !hasError) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user will need to click play
        setIsLoading(false);
      });
    }
  }, [isOpen, hasError]);

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
    if (videoRef.current) {
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

  const handleVideoCanPlay = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
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
        aria-label="Close video"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Video container */}
      <div className="relative max-w-5xl w-full max-h-[90vh] animate-scale-in">
        {/* Title */}
        {title && (
          <h3 className="font-display text-2xl text-primary mb-4 text-center tracking-wider">
            {title}
          </h3>
        )}

        {/* Video */}
        <div className="relative rounded-lg overflow-hidden border border-primary/30 glow-red">
          {/* Loading overlay */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
              {posterSrc && (
                <img 
                  src={posterSrc} 
                  alt={title || 'Video thumbnail'} 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            </div>
          )}

          {/* Error state - show poster as fallback */}
          {hasError && posterSrc && (
            <div className="relative">
              <img 
                src={posterSrc} 
                alt={title || 'Video thumbnail'} 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                <p className="font-retro text-lg text-muted-foreground">Video failed to load</p>
              </div>
            </div>
          )}

          {/* Video element */}
          {!hasError && (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              className="w-full h-auto max-h-[80vh] object-contain bg-background"
              controls
              playsInline
              preload="metadata"
              onCanPlay={handleVideoCanPlay}
              onError={handleVideoError}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
