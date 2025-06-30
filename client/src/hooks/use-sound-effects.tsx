import { useCallback, useEffect, useState } from 'react';
import React, { createContext, useContext, ReactNode } from 'react';

export type SoundEffect = 'click' | 'hover' | 'success' | 'toggle';

export function useSoundEffects() {
  const [enabled, setEnabled] = useState<boolean>(false); // Disabled by default to prevent errors
  
  // Simplified effect with no sound loading to prevent promise rejections
  useEffect(() => {
    // Update localStorage when enabled state changes
    localStorage.setItem('sound-effects-enabled', String(enabled));
  }, [enabled]);

  const play = useCallback((type: SoundEffect) => {
    // Sound system disabled to prevent promise rejection errors
    return;
  }, [enabled]);

  const toggleSoundEffects = useCallback(() => {
    setEnabled(prev => {
      const newState = !prev;
      console.log(`Sound effects ${newState ? 'enabled' : 'disabled'}`);
      return newState;
    });
  }, []);

  return {
    enabled,
    play,
    toggleSoundEffects
  };
}

interface SoundContextType {
  enabled: boolean;
  play: (type: SoundEffect) => void;
  toggleSoundEffects: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const soundEffects = useSoundEffects();
  
  return (
    <SoundContext.Provider value={soundEffects}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
