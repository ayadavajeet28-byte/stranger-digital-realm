import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FlickerTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function FlickerText({ text, className = '', delay = 0 }: FlickerTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const flickerTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    
    flickerTimeline
      .to(textRef.current, { opacity: 0.2, duration: 0.1, delay })
      .to(textRef.current, { opacity: 1, duration: 0.1 })
      .to(textRef.current, { opacity: 0.3, duration: 0.05 })
      .to(textRef.current, { opacity: 1, duration: 0.1 })
      .to(textRef.current, { opacity: 0.5, duration: 0.08 })
      .to(textRef.current, { opacity: 1, duration: 0.1 });

    return () => {
      flickerTimeline.kill();
    };
  }, [delay]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypewriterText({ text, className = '', speed = 50, onComplete }: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = text.split('');
    textRef.current.textContent = '';
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (textRef.current && currentIndex < chars.length) {
        textRef.current.textContent += chars[currentIndex];
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span ref={textRef} className={`font-retro ${className}`} />
  );
}
