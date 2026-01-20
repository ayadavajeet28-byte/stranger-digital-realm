import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '@/store/useAppStore';
import { Volume2, VolumeX, Monitor, ChevronDown } from 'lucide-react';
import { UpsideDownScene } from '@/components/3d/UpsideDownScene';
import portalBg from '@/assets/upside-down-portal.jpg';

export function HeroSection() {
  const { soundEnabled, setSoundEnabled, setHasEntered, hasEntered } = useAppStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    if (!titleRef.current) return;
    
    // Initial animation
    gsap.set(titleRef.current, { opacity: 1 });
    
    const tl = gsap.timeline();
    tl.from(titleRef.current.querySelectorAll('span'), {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    gsap.to(heroRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        if (heroRef.current) {
          heroRef.current.style.pointerEvents = 'none';
        }
      }
    });
  };

  if (hasEntered) return null;

  return (
    <div 
      ref={heroRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${portalBg})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/40" />
      
      {/* 3D Particles */}
      <UpsideDownScene intensity={0.5} />
      
      {/* Fog overlay */}
      <div className="absolute inset-0 fog-overlay pointer-events-none" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="mb-8"
        >
          <span className="block stranger-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl flicker">
            Welcome
          </span>
          <span className="block font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.5em] text-foreground/80 my-4">
            to my
          </span>
          <span className="block stranger-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl flicker" style={{ animationDelay: '0.5s' }}>
            World
          </span>
        </h1>

        {/* Subtitle hints */}
        {showContent && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Sound toggle */}
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 hover:border-primary hover:text-primary transition-all duration-300"
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
                <span className="font-retro text-lg">
                  {soundEnabled ? 'Sound On' : 'Turn on sound'}
                </span>
              </button>
            </div>

            {/* Desktop recommendation */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-retro text-lg">
              <Monitor className="w-5 h-5" />
              <span>Best experienced on desktop</span>
            </div>

            {/* Enter button */}
            <button
              onClick={handleEnter}
              className="mt-8 px-12 py-4 border-2 border-primary text-primary font-display text-2xl tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-500 glow-red"
            >
              ENTER THE UPSIDE DOWN
            </button>

            {/* Scroll indicator */}
            <div className="mt-12 flex flex-col items-center text-muted-foreground scroll-indicator">
              <span className="font-retro text-sm mb-2">or scroll to discover</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>

      {/* Corner decorations - Christmas lights */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-50">
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-light-red christmas-light" />
        <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-light-blue christmas-light" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-12 left-4 w-3 h-3 rounded-full bg-light-yellow christmas-light" style={{ animationDelay: '0.6s' }} />
      </div>
      
      <div className="absolute top-0 right-0 w-32 h-32 opacity-50">
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-light-green christmas-light" />
        <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-light-pink christmas-light" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-12 right-4 w-3 h-3 rounded-full bg-light-orange christmas-light" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );
}
