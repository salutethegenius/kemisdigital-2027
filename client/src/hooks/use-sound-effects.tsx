import { useCallback, useEffect, useState } from 'react';
import React, { createContext, useContext, ReactNode } from 'react';

export type SoundEffect = 'click' | 'hover' | 'success' | 'toggle';

// Cache to prevent multiple loads of the same audio files
const audioCache: Record<SoundEffect, HTMLAudioElement | null> = {
  click: null,
  hover: null,
  success: null,
  toggle: null
};

// Preload all sound files at once (browser needs user interaction to play sounds)
const preloadSounds = () => {
  const sounds: SoundEffect[] = ['click', 'hover', 'success', 'toggle'];
  sounds.forEach(sound => {
    try {
      const audio = new Audio();
      audio.src = `/sounds/${sound}.mp3`;
      audio.preload = 'metadata';
      audio.volume = 0.3;
      
      // Only add to cache after successful load
      audio.addEventListener('canplaythrough', () => {
        audioCache[sound] = audio;
      });
      
      // Handle errors gracefully
      audio.addEventListener('error', () => {
        audioCache[sound] = null;
      });
      
    } catch (error) {
      audioCache[sound] = null;
    }
  });
};

export function useSoundEffects() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    // Check if sound is enabled in localStorage
    const storedPreference = localStorage.getItem('sound-effects-enabled');
    return storedPreference !== null ? storedPreference === 'true' : true;
  });
  
  // Preload all sounds on first hook initialization
  useEffect(() => {
    // Make sure this only runs once and only if sounds aren't already loading
    const hasAnySounds = Object.values(audioCache).some(audio => audio !== null);
    if (!hasAnySounds) {
      preloadSounds();
    }
    
    // Update localStorage when enabled state changes
    localStorage.setItem('sound-effects-enabled', String(enabled));
  }, [enabled]);

  const play = useCallback((type: SoundEffect) => {
    if (!enabled) return;
    
    try {
      // Get the audio object from cache or create a new one
      let audio = audioCache[type];
      
      if (!audio) {
        audio = new Audio(`/sounds/${type}.mp3`);
        audio.volume = 0.3;
        audioCache[type] = audio;
      }
      
      if (audio) {
        // Create a clone to allow overlapping sounds
        const soundClone = audio.cloneNode() as HTMLAudioElement;
        soundClone.volume = 0.3;
        
        // Play the sound with proper promise handling
        const playPromise = soundClone.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently handle play failures
          });
        }
      }
    } catch (error) {
      // Silently handle all sound errors
    }
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
