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
        try {
          // Use the correct path for the Vite public directory
          const audio = new Audio(`/sounds/${type}.mp3`);
          audio.preload = 'auto';
          audio.volume = 0.3; // Set default volume to 30%
          audioCache[type] = audio;
          
          // Add debugging info
          console.log(`Loaded sound: ${type} from /sounds/${type}.mp3`);
          
          audio.addEventListener('error', (e) => {
            console.error(`Error loading sound: ${type}`, e);
          });
        } catch (error) {
          console.error(`Failed to load sound: ${type}`, error);
        }
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
    
    try {
      // Get the audio object from cache or create new one
      let audio = audioCache[type];
      
      if (!audio) {
        console.log(`Loading new audio for ${type}`);
        audio = new Audio(`/sounds/${type}.mp3`);
        audio.volume = 0.3;
        audioCache[type] = audio;
      }
      
      if (audio) {
        console.log(`Playing sound: ${type}`);
        
        // Stop and reset current playing sound
        audio.pause();
        audio.currentTime = 0;
        
        // Play the sound
        const playPromise = audio.play();
        
        // Handle play promises (required for some browsers)
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Audio playback prevented:', error);
          });
        }
      } else {
        console.error(`Sound not available: ${type}`);
      }
    } catch (error) {
      console.error(`Error playing sound ${type}:`, error);
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
