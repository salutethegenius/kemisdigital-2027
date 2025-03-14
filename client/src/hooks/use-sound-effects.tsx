import { useCallback, useEffect, useState } from 'react';

export type SoundEffect = 'click' | 'hover' | 'success' | 'toggle';

// Cache to prevent multiple loads of the same audio files
const audioCache: Record<SoundEffect, HTMLAudioElement | null> = {
  click: null,
  hover: null,
  success: null,
  toggle: null
};

export function useSoundEffects() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    // Check if sound is enabled in localStorage
    const storedPreference = localStorage.getItem('sound-effects-enabled');
    return storedPreference !== null ? storedPreference === 'true' : true;
  });

  // Initialize audio cache on first load
  useEffect(() => {
    const loadAudio = (type: SoundEffect) => {
      if (!audioCache[type]) {
        const audio = new Audio(`/sounds/${type}.mp3`);
        audio.preload = 'auto';
        audio.volume = 0.2; // Set default volume to 20%
        audioCache[type] = audio;
      }
    };

    // Load all audio files
    loadAudio('click');
    loadAudio('hover');
    loadAudio('success');
    loadAudio('toggle');

    // Clean up audio objects on unmount
    return () => {
      Object.values(audioCache).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  // Update localStorage when enabled state changes
  useEffect(() => {
    localStorage.setItem('sound-effects-enabled', String(enabled));
  }, [enabled]);

  const play = useCallback((type: SoundEffect) => {
    if (!enabled) return;
    
    // Ensure audio is loaded
    if (!audioCache[type]) {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = 0.2;
      audioCache[type] = audio;
    }
    
    const audio = audioCache[type];
    if (audio) {
      // Stop and reset current playing sound
      audio.pause();
      audio.currentTime = 0;
      
      // Play the sound
      const playPromise = audio.play();
      
      // Handle play promises (required for some browsers)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Audio playback prevented:', error);
        });
      }
    }
  }, [enabled]);

  const toggleSoundEffects = useCallback(() => {
    setEnabled(prev => !prev);
  }, []);

  return {
    enabled,
    play,
    toggleSoundEffects
  };
}

// Create a global sound provider context
import React, { createContext, useContext, ReactNode } from 'react';

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
