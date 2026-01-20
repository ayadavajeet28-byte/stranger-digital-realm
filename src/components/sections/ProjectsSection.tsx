import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage } from '@/components/decorative/ChristmasLights';
import { ExternalLink, Github } from 'lucide-react';

// Import generated project images
import projectPortal from '@/assets/project-portal.jpg';
import projectMobile from '@/assets/project-mobile.jpg';
import projectDashboard from '@/assets/project-dashboard.jpg';
import projectLab from '@/assets/project-lab.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Hawkins Lab Portal',
    description: 'A real-time collaboration platform with immersive 3D experiences and live data synchronization.',
    techStack: ['React', 'Three.js', 'WebSocket', 'Node.js'],
    image: projectPortal,
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'Demogorgon Tracker',
    description: 'Mobile-first PWA for tracking and visualizing complex data patterns with AI predictions.',
    techStack: ['Vue.js', 'TensorFlow.js', 'PWA', 'GraphQL'],
    image: projectMobile,
    category: 'AI/ML',
  },
  {
    id: 3,
    title: 'Mind Flayer CMS',
    description: 'Headless content management system with multi-dimensional content organization.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    image: projectLab,
    category: 'Backend',
  },
  {
    id: 4,
    title: 'Eleven\'s Dashboard',
    description: 'Analytics dashboard with telekinetic-level control over data visualization.',
    techStack: ['React', 'D3.js', 'Firebase', 'TypeScript'],
    image: projectDashboard,
    category: 'Frontend',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotateX: 10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        {/* Category badge */}
        <span className="absolute top-4 right-4 px-3 py-1 bg-primary/80 text-primary-foreground font-retro text-sm rounded">
          {project.category}
        </span>

        {/* Hover overlay */}
        <div 
          className={`absolute inset-0 bg-primary/20 flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="p-3 bg-card/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            <Github className="w-5 h-5" />
          </button>
          <button className="p-3 bg-card/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl text-primary mb-2 tracking-wide">
          {project.title}
        </h3>
        <p className="font-retro text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-secondary/50 text-secondary-foreground font-retro text-sm rounded border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: 'inset 0 0 30px hsl(var(--primary) / 0.2)',
        }}
      />
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen py-20 px-4 relative"
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <LightMessage message="PROJECTS" className="mb-8" />
          <p className="font-retro text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorations from the digital dimension. Each project is a gateway to something extraordinary.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
