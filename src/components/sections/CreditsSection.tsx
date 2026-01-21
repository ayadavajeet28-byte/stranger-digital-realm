import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage, ChristmasLights } from '@/components/decorative/ChristmasLights';
import { Heart, Mail, Phone, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { category: 'Design Tools', items: ['Figma', 'Adobe XD', 'Adobe Creative Suite'] },
  { category: 'Dashboard & Data', items: ['Tableau', 'Power BI'] },
  { category: 'Motion & Video', items: ['After Effects', 'Premiere Pro'] },
  { category: 'Development', items: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'] },
];

const contactInfo = {
  email: 'mohantyelisha2@gmail.com',
  phone: '7751847127',
  whatsapp: '+91 86584 80643',
};

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

        {/* Let's Work Title */}
        <div className="text-center mb-16">
          <LightMessage message="LETS WORK" className="mb-8" />
          <h2 className="font-display text-4xl md:text-6xl text-primary tracking-wider mb-4">
            Contact Me
          </h2>
        </div>

        {/* Contact Info */}
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-8 mb-12 glow-red">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <a
              href={`mailto:${contactInfo.email}`}
              className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-all duration-300"
            >
              <Mail className="w-8 h-8 text-light-red group-hover:scale-110 transition-transform" />
              <span className="font-retro text-lg text-foreground">Email</span>
              <span className="font-retro text-sm text-muted-foreground break-all">
                {contactInfo.email}
              </span>
            </a>

            <a
              href={`tel:${contactInfo.phone}`}
              className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-all duration-300"
            >
              <Phone className="w-8 h-8 text-light-blue group-hover:scale-110 transition-transform" />
              <span className="font-retro text-lg text-foreground">Call</span>
              <span className="font-retro text-sm text-muted-foreground">
                {contactInfo.phone}
              </span>
            </a>

            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:border-primary transition-all duration-300"
            >
              <MessageCircle className="w-8 h-8 text-light-green group-hover:scale-110 transition-transform" />
              <span className="font-retro text-lg text-foreground">WhatsApp</span>
              <span className="font-retro text-sm text-muted-foreground">
                {contactInfo.whatsapp}
              </span>
            </a>
          </div>
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

        {/* Thank You */}
        <div className="text-center mb-12">
          <h2 className="stranger-title text-6xl md:text-8xl mb-4">
            THANK
          </h2>
          <h2 className="stranger-title text-6xl md:text-8xl">
            YOU
          </h2>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center">
          <p className="font-retro text-muted-foreground">
            Made with <Heart className="inline w-4 h-4 text-light-red mx-1" /> by Elisha Mohanty
          </p>
          <p className="font-retro text-sm text-muted-foreground/50 mt-2">
            © {new Date().getFullYear()} • All rights reserved
          </p>
        </footer>
      </div>
    </section>
  );
}
