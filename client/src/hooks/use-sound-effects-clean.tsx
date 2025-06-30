import { useCallback, useState } from 'react';
import React, { createContext, useContext, ReactNode } from 'react';

export type SoundEffect = 'click' | 'hover' | 'success' | 'toggle';

// Completely clean sound system without any promises or audio loading
export function useSoundEffects() {
  const [enabled, setEnabled] = useState<boolean>(false);

  const play = useCallback((type: SoundEffect) => {
    // Sound system disabled - no audio loading or playing
    return;
  }, []);

  const toggleSoundEffects = useCallback(() => {
    setEnabled(prev => !prev);
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