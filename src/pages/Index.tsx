import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { CreditsSection } from '@/components/sections/CreditsSection';
import { Navigation } from '@/components/layout/Navigation';
import { UpsideDownScene } from '@/components/3d/UpsideDownScene';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const { hasEntered, setIsLoading, setHasEntered } = useAppStore();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    // Handle scroll to enter
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasEntered) {
        setHasEntered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered, setHasEntered]);

  useEffect(() => {
    // Refresh ScrollTrigger when entering
    if (hasEntered) {
      ScrollTrigger.refresh();
    }
  }, [hasEntered]);

  return (
    <div className="relative min-h-[500vh] bg-background text-foreground">
      {/* Hero overlay */}
      <HeroSection />

      {/* Main content */}
      <div
        ref={mainRef}
        className={`transition-opacity duration-1000 ${
          hasEntered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <UpsideDownScene intensity={0.3} />
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Sections */}
        <main>
          {/* Spacer for hero section */}
          <div id="hero" className="h-screen" />
          
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <CreditsSection />
        </main>
      </div>

      {/* Scanlines overlay - subtle */}
      <div className="fixed inset-0 pointer-events-none z-40 scanlines opacity-10" />
    </div>
  );
};

export default Index;
