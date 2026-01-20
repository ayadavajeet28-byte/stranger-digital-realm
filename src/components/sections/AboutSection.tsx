import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage } from '@/components/decorative/ChristmasLights';
import { TypewriterText } from '@/components/decorative/TextEffects';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative"
    >
      {/* Background portal effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-gradient-radial from-primary/10 via-accent/5 to-transparent blur-3xl animate-pulse-slow" />
      </div>

      <div ref={contentRef} className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section title with Christmas lights */}
        <LightMessage message="ABOUT ME" className="mb-12" />

        {/* Main content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-8 glow-red">
            <h3 className="font-display text-3xl md:text-5xl text-primary mb-6 tracking-wider">
              The Curious Mind Behind the Code
            </h3>
            
            <div className="font-retro text-xl md:text-2xl text-foreground/90 leading-relaxed space-y-4">
              <p>
                <TypewriterText 
                  text="Hello, friend. I'm a self-taught developer who ventured into the unknown realms of code and emerged with powerful skills." 
                  speed={30}
                />
              </p>
              <p className="text-muted-foreground">
                Like Eleven discovering her powers, I found my calling in the digital dimension. 
                What started as curiosity became a passion for crafting immersive web experiences.
              </p>
            </div>
          </div>

          {/* Stats / Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: '3+', label: 'Years Experience', color: 'text-light-red' },
              { number: '20+', label: 'Projects Completed', color: 'text-light-blue' },
              { number: '∞', label: 'Lines of Code', color: 'text-light-pink' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card/30 border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`font-display text-5xl ${stat.color} text-glow-red mb-2`}>
                  {stat.number}
                </div>
                <div className="font-retro text-lg text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="font-typewriter text-xl md:text-2xl text-accent italic mt-8">
            "In the Upside Down of web development, I found my way to the surface."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
