import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage, ChristmasLights } from '@/components/decorative/ChristmasLights';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { category: '3D & Animation', items: ['React Three Fiber', 'Three.js', 'Drei', 'GSAP'] },
  { category: 'Framework & UI', items: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand'] },
  { category: 'Design', items: ['Figma', 'Adobe Creative Suite'] },
  { category: 'Assets & Inspiration', items: ['Unsplash', 'Stranger Things Universe', 'Synthwave Aesthetic'] },
];

const acknowledgments = [
  'The Duffer Brothers for creating an iconic universe',
  'The open-source community for incredible tools',
  'Coffee, for obvious reasons',
  'You, for exploring my digital dimension',
];

export function CreditsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="credits"
      className="min-h-screen py-20 px-4 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div ref={contentRef} className="max-w-4xl mx-auto relative z-10">
        {/* Christmas lights header */}
        <div className="mb-12">
          <ChristmasLights count={26} className="opacity-50" />
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <LightMessage message="CREDITS" className="mb-8" />
          <p className="font-retro text-xl text-muted-foreground">
            The friends who helped me on this journey
          </p>
        </div>

        {/* Tools used */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool, index) => (
            <div
              key={tool.category}
              className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-display text-xl text-accent mb-4 tracking-wider">
                {tool.category}
              </h3>
              <ul className="space-y-2">
                {tool.items.map((item) => (
                  <li key={item} className="font-retro text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Acknowledgments */}
        <div className="text-center mb-16">
          <h3 className="font-display text-2xl text-primary mb-6 tracking-wider">
            Special Thanks
          </h3>
          <div className="space-y-3">
            {acknowledgments.map((ack, index) => (
              <p
                key={index}
                className="font-retro text-lg text-muted-foreground"
              >
                <Heart className="inline w-4 h-4 text-light-red mr-2" />
                {ack}
              </p>
            ))}
          </div>
        </div>

        {/* Contact / Social links */}
        <div className="text-center">
          <h3 className="font-display text-2xl text-primary mb-6 tracking-wider">
            Connect With Me
          </h3>
          <div className="flex justify-center gap-6">
            {[
              { icon: <Github />, label: 'GitHub', href: '#' },
              { icon: <Linkedin />, label: 'LinkedIn', href: '#' },
              { icon: <Mail />, label: 'Email', href: 'mailto:hello@example.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:glow-red transition-all duration-300"
              >
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  {link.icon}
                </span>
                <span className="font-retro text-sm text-muted-foreground group-hover:text-primary">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center">
          <p className="font-retro text-muted-foreground">
            Made with <Heart className="inline w-4 h-4 text-light-red mx-1" /> in the Upside Down
          </p>
          <p className="font-retro text-sm text-muted-foreground/50 mt-2">
            © {new Date().getFullYear()} • All rights reserved
          </p>
        </footer>
      </div>
    </section>
  );
}
