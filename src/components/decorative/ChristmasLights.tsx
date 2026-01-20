import { useMemo } from 'react';

interface ChristmasLightsProps {
  count?: number;
  className?: string;
}

const lightColors = [
  'text-light-red',
  'text-light-blue', 
  'text-light-yellow',
  'text-light-green',
  'text-light-pink',
  'text-light-orange',
];

export function ChristmasLights({ count = 26, className = '' }: ChristmasLightsProps) {
  const lights = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: lightColors[i % lightColors.length],
      delay: Math.random() * 2,
      letter: String.fromCharCode(65 + (i % 26)),
    }));
  }, [count]);

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {lights.map((light) => (
        <div
          key={light.id}
          className="flex flex-col items-center"
          style={{ animationDelay: `${light.delay}s` }}
        >
          {/* Wire */}
          <div className="w-px h-6 bg-muted-foreground/30" />
          
          {/* Bulb */}
          <div
            className={`christmas-light w-4 h-5 rounded-b-full ${light.color}`}
            style={{
              backgroundColor: 'currentColor',
              animationDelay: `${light.delay}s`,
            }}
          />
          
          {/* Letter */}
          <span 
            className={`mt-2 font-display text-2xl ${light.color}`}
            style={{ 
              textShadow: '0 0 10px currentColor',
              animationDelay: `${light.delay}s`,
            }}
          >
            {light.letter}
          </span>
        </div>
      ))}
    </div>
  );
}

interface LightMessageProps {
  message: string;
  className?: string;
}

export function LightMessage({ message, className = '' }: LightMessageProps) {
  const letters = message.toUpperCase().split('');
  
  return (
    <div className={`flex flex-wrap justify-center gap-1 ${className}`}>
      {letters.map((letter, i) => {
        if (letter === ' ') {
          return <div key={i} className="w-8" />;
        }
        
        const color = lightColors[i % lightColors.length];
        const delay = i * 0.1;
        
        return (
          <div
            key={i}
            className="flex flex-col items-center"
          >
            <div className="w-px h-4 bg-muted-foreground/30" />
            <div
              className={`christmas-light w-3 h-4 rounded-b-full ${color}`}
              style={{
                backgroundColor: 'currentColor',
                animationDelay: `${delay}s`,
              }}
            />
            <span 
              className={`mt-1 font-display text-xl md:text-3xl ${color} flicker`}
              style={{ 
                textShadow: '0 0 15px currentColor, 0 0 30px currentColor',
                animationDelay: `${delay + Math.random()}s`,
              }}
            >
              {letter}
            </span>
          </div>
        );
      })}
    </div>
  );
}
