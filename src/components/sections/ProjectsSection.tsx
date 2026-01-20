import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage } from '@/components/decorative/ChristmasLights';
import { Play } from 'lucide-react';
import { VideoModal } from '@/components/ui/video-modal';

// Import work images
import workGraphicDesign from '@/assets/work-graphic-design.png';
import workIllustration from '@/assets/work-illustration.png';
import workTypography from '@/assets/work-typography.png';
import workMotion from '@/assets/work-motion.png';

gsap.registerPlugin(ScrollTrigger);

// Category definitions
const categories = [
  {
    id: 'illustration',
    title: 'Graphic Designer & Illustration Folio',
    description: 'A collection of graphic design work featuring branding, visual identity, and creative illustrations.',
    items: [
      { id: 1, image: workGraphicDesign, title: 'Brand Identity Design' },
      { id: 2, image: workIllustration, title: 'Creative Illustrations' },
    ],
  },
  {
    id: 'typography',
    title: 'Pamphlets / Typography / Web Designing',
    description: 'Where information meets visual character. Conversion-focused websites with distinctive typography.',
    items: [
      { id: 3, image: workTypography, title: 'Typography & Web Design' },
    ],
  },
  {
    id: 'motion',
    title: 'Motion Graphics / Branding',
    description: 'Dynamic motion graphics and branding projects that bring stories to life.',
    items: [
      { id: 4, image: workMotion, title: 'Motion & Branding' },
    ],
  },
  {
    id: 'genai',
    title: 'Gen AI',
    description: 'AI-powered creative explorations and generative art projects.',
    items: [
      { id: 5, video: '/videos/project-video-1.mp4', poster: workGraphicDesign, title: 'AI Creative Project 1' },
      { id: 6, video: '/videos/project-video-2.mp4', poster: workIllustration, title: 'AI Creative Project 2' },
      { id: 7, video: '/videos/project-video-3.mp4', poster: workTypography, title: 'AI Creative Project 3' },
      { id: 8, video: '/videos/project-video-4.mp4', poster: workMotion, title: 'AI Creative Project 4' },
    ],
  },
];

interface CategorySectionProps {
  category: typeof categories[0];
  index: number;
  onPlayVideo: (video: string, title: string, poster?: string) => void;
}

function CategorySection({ category, index, onPlayVideo }: CategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const isGenAI = category.id === 'genai';

  return (
    <div ref={sectionRef} className="mb-20 last:mb-0">
      {/* Category Header */}
      <div className="mb-8">
        <h3
          ref={titleRef}
          className="font-display text-2xl md:text-3xl text-primary mb-3 tracking-wide inline-block px-4 py-2 border border-primary/50 rounded-lg bg-primary/10"
        >
          {category.title}
        </h3>
        <p className="font-retro text-muted-foreground mt-4 max-w-2xl">
          {category.description}
        </p>
      </div>

      {/* Items Grid */}
      <div className={`grid gap-6 ${
        category.items.length === 1 
          ? 'grid-cols-1 max-w-2xl' 
          : category.items.length === 2 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}>
        {category.items.map((item, itemIndex) => (
          <ItemCard
            key={item.id}
            item={item}
            index={itemIndex}
            isVideo={isGenAI}
            onPlayVideo={onPlayVideo}
            parentIndex={index}
          />
        ))}
      </div>
    </div>
  );
}

interface ItemCardProps {
  item: {
    id: number;
    image?: string;
    video?: string;
    poster?: string;
    title: string;
  };
  index: number;
  parentIndex: number;
  isVideo: boolean;
  onPlayVideo: (video: string, title: string, poster?: string) => void;
}

function ItemCard({ item, index, parentIndex, isVideo, onPlayVideo }: ItemCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  const handleClick = () => {
    if (isVideo && item.video) {
      onPlayVideo(item.video, item.title, item.poster || item.image);
    }
  };

  const displayImage = item.poster || item.image;

  return (
    <div
      ref={cardRef}
      className={`group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 ${
        isVideo ? 'cursor-pointer' : ''
      }`}
      onClick={isVideo ? handleClick : undefined}
    >
      {/* Media Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Solid background */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-muted to-background" />

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted z-5">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Image */}
        {displayImage && !imageError && (
          <img
            src={displayImage}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        )}

        {/* Fallback for failed images */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-background flex items-center justify-center">
            <span className="font-retro text-muted-foreground text-sm">{item.title}</span>
          </div>
        )}

        {/* Video play overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="absolute inset-0 bg-background/20 group-hover:bg-background/40 transition-colors duration-300" />
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 flex items-center justify-center glow-red transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-lg">
              <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Title */}
      <div className="p-4">
        <h4 className="font-retro text-sm text-foreground/80 line-clamp-1">
          {item.title}
        </h4>
      </div>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: 'inset 0 0 20px hsl(var(--primary) / 0.15)',
        }}
      />
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string; poster?: string } | null>(null);

  const handlePlayVideo = (videoSrc: string, title: string, poster?: string) => {
    setActiveVideo({ src: videoSrc, title, poster });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveVideo(null);
  };

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

        {/* Category Sections */}
        {categories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            index={index}
            onPlayVideo={handlePlayVideo}
          />
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          videoSrc={activeVideo.src}
          posterSrc={activeVideo.poster}
          title={activeVideo.title}
        />
      )}
    </section>
  );
}
