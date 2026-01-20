import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage } from '@/components/decorative/ChristmasLights';
import elishaProfile from '@/assets/elisha-profile.jpg';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { title: 'Freelance Graphic Designer & Illustrator', period: 'August 2021 – Present' },
  { title: 'Book Illustrator / Cover Artist', period: '2024 – Present' },
  { title: 'Graphic Artist / Web Designer', period: '2021 – Present' },
  { title: 'UX/UI Designer', period: 'Present' },
  { title: 'Video Editor (Content and YouTube Shots)', period: '2024 – Present' },
];

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

      <div ref={contentRef} className="max-w-5xl mx-auto relative z-10">
        {/* Section title with Christmas lights */}
        <LightMessage message="ABOUT ME" className="mb-12" />

        {/* Main content */}
        <div className="space-y-8">
          {/* Profile and Introduction */}
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-8 glow-red">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/50 glow-red">
                  <img 
                    src={elishaProfile} 
                    alt="Elisha Mohanty" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Bio */}
              <div className="text-center md:text-left">
                <h3 className="font-display text-3xl md:text-5xl text-primary mb-4 tracking-wider">
                  Hi, I'm Elisha!
                </h3>
                
                <div className="font-retro text-lg md:text-xl text-foreground/90 leading-relaxed space-y-4">
                  <p>
                    I'm Elisha Mohanty — a multidisciplinary UI/UX Designer, Graphic Designer, Illustrator, Motion Designer, and Dashboard Specialist. I blend design, technology, and storytelling to create user-centric experiences through intuitive interfaces, expressive illustrations, and impactful motion visuals.
                  </p>
                  <p className="text-muted-foreground">
                    Skilled in Figma, Adobe XD, Adobe Creative Suite, Tableau, and Power BI, I deliver solutions that are both visually compelling and results driven. Curious, creative, and innovation-led — I design experiences people remember.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
            <h4 className="font-display text-2xl text-accent mb-4 tracking-wider text-center">MY SKILLS</h4>
            <p className="font-retro text-lg text-muted-foreground text-center">
              Visual communication, branding, typography, composition, color theory, storytelling through visuals, layout design, visual hierarchy, and style consistency.
            </p>
          </div>

          {/* Experiences */}
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
            <h4 className="font-display text-2xl text-accent mb-6 tracking-wider text-center">MY EXPERIENCES</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {experiences.map((exp, index) => (
                <div
                  key={exp.title}
                  className="bg-card/50 border border-primary/20 rounded-lg p-4 hover:border-primary/50 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="font-display text-lg text-primary mb-1">
                    {exp.title}
                  </div>
                  <div className="font-retro text-sm text-muted-foreground">
                    {exp.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <blockquote className="font-typewriter text-xl md:text-2xl text-accent italic text-center">
            "Curious, creative, and innovation-led — I design experiences people remember."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
