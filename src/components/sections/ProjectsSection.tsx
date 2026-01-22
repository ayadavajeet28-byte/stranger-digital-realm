import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightMessage } from '@/components/decorative/ChristmasLights';
import { Play } from 'lucide-react';
import { VideoModal } from '@/components/ui/video-modal';

// Import work images
import workIllustrationCombined from '@/assets/work-illustration-combined.png';
import workMotionVideo from '@/assets/vedio.mp4';
import page8Image from '@/assets/Page 8.png';

gsap.registerPlugin(ScrollTrigger);

// Category definitions
const categories = [
  {
    id: 'illustration',
    title: 'Illustration / Branding / Visual Content',
    description: 'A collection of graphic design work featuring branding, visual identity, and creative illustrations.',
    items: [
      { id: 1, image: workIllustrationCombined, title: 'Graphic & Illustration' },
    ],
  },
  {
    id: 'genai',
    title: 'Gen AI / UGC Ad',
    description: 'AI-powered creative explorations and generative art projects.',
    items: [
      { id: 5, video: '/videos/project-video-1.mp4', title: 'AI Creative Project 1' },
      { id: 6, video: '/videos/project-video-2.mp4', title: 'AI Creative Project 2' },
      { id: 7, video: '/videos/project-video-3.mp4', title: 'AI Creative Project 3' },
      { id: 8, video: '/videos/project-video-4.mp4', title: 'AI Creative Project 4' },
    ],
  },
  {
    id: 'motion',
    title: 'Motion Graphics',
    description: 'Dynamic motion graphics and branding projects that bring stories to life.',
    items: [
      { id: 4, video: workMotionVideo, title: 'Motion & Branding' },
    ],
  },
  {
    id: 'typography',
    title: 'Typography / Branding',
    description: 'Where information meets visual character. Conversion-focused websites with distinctive typography.',
    items: [
      { id: 3, image: page8Image, title: 'Typography & Web Design' },

    ],
  },
];

interface CategorySectionProps {
  category: typeof categories[0];
  index: number;
  onViewMedia: (src: string, type: 'video' | 'image', title: string, poster?: string) => void;
}

function CategorySection({ category, index, onViewMedia }: CategorySectionProps) {
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

  const isVideoCategory = ['genai', 'motion'].includes(category.id);
  const isSimpleLayout = ['illustration', 'typography', 'motion'].includes(category.id);
  const isConstrainedWidth = ['illustration', 'typography', 'motion'].includes(category.id);

  return (
    <div ref={sectionRef}>
      {/* Category Header */}
      <div className="mb-16">
        <h3
          ref={titleRef}
          className="font-display text-2xl md:text-3xl text-primary mb-3 tracking-wide inline-block px-4 py-2 border border-primary/50 rounded-lg bg-primary/10"
        >
          {category.title}
        </h3>
        <p className="font-retro text-lg md:text-xl text-muted-foreground mt-4 max-w-4xl">
          {category.description}
        </p>
      </div>

      {/* Items Grid */}
      <div className={`grid gap-6 ${isConstrainedWidth ? 'max-w-5xl mx-auto' : ''
        } ${category.items.length === 1
          ? 'grid-cols-1 w-full'
          : category.items.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
        {category.items.map((item, itemIndex) => (
          <ItemCard
            key={item.id}
            item={item}
            index={itemIndex}
            isVideo={isVideoCategory}
            isSimple={isSimpleLayout}
            onViewMedia={onViewMedia}
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
  isSimple?: boolean;
  onViewMedia: (src: string, type: 'video' | 'image', title: string, poster?: string) => void;
}

function ItemCard({ item, index, parentIndex, isVideo, isSimple, onViewMedia }: ItemCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // Set initial time for video thumbnail
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.1;
    }
  }, []);

  const handleClick = () => {
    if (isVideo && item.video) {
      onViewMedia(item.video, 'video', item.title, item.poster || item.image);
    } else if (item.image) {
      onViewMedia(item.image, 'image', item.title);
    }
  };

  const displayImage = item.poster || item.image;

  if (isSimple) {
    return (
      <div
        ref={cardRef}
        className="w-full relative cursor-pointer hover:opacity-95 transition-opacity duration-300 group"
        onClick={handleClick}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={item.title}
            className="w-full h-auto rounded-lg border border-border shadow-md"
            loading="eager"
          />
        ) : isVideo && item.video ? (
          <>
            <video
              ref={videoRef}
              src={item.video}
              className="w-full h-auto rounded-lg border border-border shadow-md"
              muted
              playsInline
              preload="metadata"
              onLoadedData={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="absolute inset-0 bg-background/10 group-hover:bg-background/30 transition-colors duration-300 rounded-lg" />
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 flex items-center justify-center glow-red transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-lg">
                <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-64 bg-muted flex items-center justify-center rounded-lg border border-border">
            <span className="font-retro text-muted-foreground">{item.title}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 cursor-pointer`}
      onClick={handleClick}
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
        {displayImage && !imageError ? (
          <img
            src={displayImage}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
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
        ) : isVideo && item.video ? (
          <video
            ref={videoRef}
            src={item.video}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setImageLoaded(true)}
          />
        ) : null}

        {/* Fallback for failed images */}
        {(imageError || (!displayImage && !item.video)) && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-background flex items-center justify-center">
            <span className="font-retro text-muted-foreground text-sm">{item.title}</span>
          </div>
        )}

        {/* Video play overlay - Only for videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="absolute inset-0 bg-background/20 group-hover:bg-background/40 transition-colors duration-300" />
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 flex items-center justify-center glow-red transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-lg">
              <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Image view overlay - Only for images */}
        {!isVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-background/20" />
            <div className="relative w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center glow-red shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <div className="w-5 h-5 border-2 border-primary-foreground rounded-full" />
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
  const [activeMedia, setActiveMedia] = useState<{ src: string; type: 'video' | 'image'; title: string; poster?: string } | null>(null);

  const handleViewMedia = (src: string, type: 'video' | 'image', title: string, poster?: string) => {
    setActiveMedia({ src, type, title, poster });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveMedia(null);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen pt-32 pb-20 px-4 relative"
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <LightMessage message="MY WORKS" className="mb-8" />

          {/* Category Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  const el = document.getElementById(`category-${category.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-3 md:px-10 md:py-4 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm 
                         text-primary font-retro text-base md:text-lg uppercase tracking-wide hover:bg-primary/20 
                         hover:border-primary/80 transition-all duration-300 shadow-[0_0_10px_rgba(229,9,20,0.1)]
                         hover:shadow-[0_0_15px_rgba(229,9,20,0.3)]"
              >
                {category.title}
              </button>
            ))}
          </div>

          <p className="font-retro text-xl text-muted-foreground max-w-2xl mx-auto">
            This collection represents my approach to turning content into experience — designing conversion-focused websites, distinctive typography, interactive prototypes, and motion graphics.
          </p>
        </div>

        {/* Category Sections */}
        {categories.map((category, index) => (
          <div key={category.id} id={`category-${category.id}`} className="mb-10 last:mb-0">
            <CategorySection
              category={category}
              index={index}
              onViewMedia={handleViewMedia}
            />
          </div>
        ))}
      </div>

      {/* Video/Image Modal */}
      {activeMedia && (
        <VideoModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          src={activeMedia.src}
          type={activeMedia.type}
          posterSrc={activeMedia.poster}
          title={activeMedia.title}
        />
      )}
    </section>
  );
}
