import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage } from '@/components/decorative/ChristmasLights';
import { 
  Code2, 
  Palette, 
  Server, 
  Layers, 
  Users, 
  Zap 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
  category: string;
}

const skills: Skill[] = [
  { name: 'React / Vue.js', level: 90, icon: <Code2 />, color: 'bg-light-blue', category: 'Front-End' },
  { name: 'TypeScript', level: 85, icon: <Code2 />, color: 'bg-light-yellow', category: 'Front-End' },
  { name: 'Three.js / WebGL', level: 75, icon: <Layers />, color: 'bg-light-pink', category: 'Front-End' },
  { name: 'UI/UX Design', level: 80, icon: <Palette />, color: 'bg-light-green', category: 'Design' },
  { name: 'Figma / Adobe XD', level: 85, icon: <Palette />, color: 'bg-light-orange', category: 'Design' },
  { name: 'Node.js', level: 80, icon: <Server />, color: 'bg-light-red', category: 'Back-End' },
  { name: 'PostgreSQL / MongoDB', level: 75, icon: <Server />, color: 'bg-light-blue', category: 'Back-End' },
  { name: 'Project Management', level: 85, icon: <Users />, color: 'bg-light-pink', category: 'Leadership' },
  { name: 'Agile / Scrum', level: 80, icon: <Zap />, color: 'bg-light-yellow', category: 'Leadership' },
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current || !progressRef.current) return;

    gsap.fromTo(
      barRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      progressRef.current,
      { width: '0%' },
      {
        width: `${skill.level}%`,
        duration: 1.5,
        delay: index * 0.1 + 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [skill.level, index]);

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded ${skill.color} text-background`}>
            {skill.icon}
          </span>
          <span className="font-retro text-lg text-foreground">{skill.name}</span>
        </div>
        <span className="font-display text-xl text-primary">{skill.level}%</span>
      </div>
      
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className={`h-full ${skill.color} rounded-full relative`}
          style={{ width: '0%' }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 animate-pulse opacity-50 blur-sm" style={{ backgroundColor: 'currentColor' }} />
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Portal background effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-primary/10 animate-rotate-slow" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-accent/10 animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-electric/10 animate-rotate-slow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="stranger-title text-4xl md:text-6xl mb-4">
            Entering The
          </h2>
          <LightMessage message="SKILL ZONE" className="mb-8" />
          <p className="font-retro text-xl text-muted-foreground">
            Powers unlocked through countless nights of exploration
          </p>
        </div>

        {/* Skills by category */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
              <h3 className="font-display text-2xl text-accent mb-6 tracking-wider flex items-center gap-3">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                {category}
              </h3>
              
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
