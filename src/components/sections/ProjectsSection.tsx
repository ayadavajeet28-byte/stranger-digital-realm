import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage } from '@/components/decorative/ChristmasLights';
import { Play, Pause } from 'lucide-react';

// Import work images from PDF
import workGraphicDesign from '@/assets/work-graphic-design.png';
import workIllustration from '@/assets/work-illustration.png';
import workTypography from '@/assets/work-typography.png';
import workMotion from '@/assets/work-motion.png';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  video?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Graphic Design & Illustration Folio',
    description: 'A collection of graphic design work featuring branding, visual identity, and creative illustrations.',
    category: 'Graphic Design',
    image: workGraphicDesign,
    video: '/videos/project-video-1.mp4',
  },
  {
    id: 2,
    title: 'Illustration Folio',
    description: 'Expressive illustrations and cover art showcasing storytelling through visuals.',
    category: 'Illustration',
    image: workIllustration,
    video: '/videos/project-video-2.mp4',
  },
  {
    id: 3,
    title: 'Web Designing / Typography',
    description: 'Where information meets visual character. Conversion-focused websites with distinctive typography.',
    category: 'Web Design',
    image: workTypography,
    video: '/videos/project-video-3.mp4',
  },
  {
    id: 4,
    title: 'Motion Graphics / Branding',
    description: 'Dynamic motion graphics and branding projects that bring stories to life.',
    category: 'Motion Design',
    image: workMotion,
    video: '/videos/project-video-4.mp4',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoClick = () => {
    setShowVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500"
      style={{ perspective: '1000px' }}
    >
      {/* Media Container */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        {!showVideo && project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Play button overlay */}
            {project.video && (
              <button
                onClick={handleVideoClick}
                className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center glow-red">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </button>
            )}
          </>
        ) : project.video ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={project.video}
              className="w-full h-full object-cover"
              loop
              playsInline
              onClick={togglePlay}
            />
            {/* Video controls overlay */}
            <button
              onClick={togglePlay}
              className="absolute bottom-4 right-4 p-2 bg-card/80 rounded-full hover:bg-primary transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
        ) : null}
        
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        {/* Category badge */}
        <span className="absolute top-4 right-4 px-3 py-1 bg-primary/80 text-primary-foreground font-retro text-sm rounded">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl text-primary mb-2 tracking-wide">
          {project.title}
        </h3>
        <p className="font-retro text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
          <LightMessage message="MY WORKS" className="mb-8" />
          <p className="font-retro text-xl text-muted-foreground max-w-2xl mx-auto">
            This collection represents my approach to turning content into experience — designing conversion-focused websites, distinctive typography, interactive prototypes, and motion graphics.
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
