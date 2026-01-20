import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Home, User, FolderKanban, Zap, Heart } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Zap className="w-4 h-4" /> },
  { id: 'credits', label: 'Credits', icon: <Heart className="w-4 h-4" /> },
];

export function Navigation() {
  const { hasEntered, currentSection, setCurrentSection } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasEntered) {
      setTimeout(() => setIsVisible(true), 500);
    }
  }, [hasEntered]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setCurrentSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use scrollTo with offset to ensure content is visible
      const offset = id === 'hero' ? 0 : element.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col gap-4 p-2 bg-card/50 backdrop-blur-sm border border-border rounded-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              currentSection === item.id
                ? 'bg-primary text-primary-foreground glow-red'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
            title={item.label}
          >
            {item.icon}
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1 bg-card border border-border rounded font-retro text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
