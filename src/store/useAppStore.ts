import { create } from 'zustand';

interface AppState {
  soundEnabled: boolean;
  currentSection: string;
  scrollProgress: number;
  isLoading: boolean;
  hasEntered: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  setCurrentSection: (section: string) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoading: (loading: boolean) => void;
  setHasEntered: (entered: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  soundEnabled: false,
  currentSection: 'hero',
  scrollProgress: 0,
  isLoading: true,
  hasEntered: false,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setHasEntered: (entered) => set({ hasEntered: entered }),
}));
