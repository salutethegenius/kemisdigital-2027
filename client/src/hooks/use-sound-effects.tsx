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
      audio.preload = 'auto';
      audio.volume = 0.3;
      audioCache[sound] = audio;
      
      // Add debugging logs
      console.log(`Preloaded sound: ${sound}`);
      
      // Log any errors
      audio.addEventListener('error', (e) => {
        console.error(`Error loading sound: ${sound}`, e);
      });
    } catch (error) {
      console.error(`Failed to preload sound: ${sound}`, error);
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
    // Make sure this only runs once
    if (!audioCache.click && !audioCache.hover && !audioCache.success && !audioCache.toggle) {
      console.log('Initializing sound system...');
      preloadSounds();
    }
    
    // Attempt to unlock audio on first user interaction
    const unlockAudio = () => {
      console.log('Unlocking audio...');
      // Play and immediately pause all sounds to unlock them
      Object.values(audioCache).forEach(audio => {
        if (audio) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              audio.pause();
              audio.currentTime = 0;
              console.log('Audio unlocked successfully');
            }).catch(error => {
              console.log('Audio unlock failed, will retry on next interaction', error);
            });
          }
        }
      });
      
      // Remove the event listeners after first interaction
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    
    // Add event listeners to unlock audio on first interaction
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
    document.addEventListener('keydown', unlockAudio, { once: true });
    
    // Update localStorage when enabled state changes
    localStorage.setItem('sound-effects-enabled', String(enabled));
    
    // Clean up audio objects on unmount
    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      
      Object.values(audioCache).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, [enabled]);

  const play = useCallback((type: SoundEffect) => {
    if (!enabled) return;
    
    try {
      // Get the audio object from cache or create a new one
      let audio = audioCache[type];
      
      if (!audio) {
        console.log(`Creating new audio instance for ${type}`);
        audio = new Audio(`/sounds/${type}.mp3`);
        audio.volume = 0.3;
        audioCache[type] = audio;
      }
      
      if (audio) {
        console.log(`Playing sound: ${type}`);
        
        // Create a clone to allow overlapping sounds
        const soundClone = audio.cloneNode() as HTMLAudioElement;
        soundClone.volume = 0.3;
        
        // Play the sound
        const playPromise = soundClone.play();
        
        // Handle play promises (required for some browsers)
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Audio playback prevented:', error);
            // Try to recover by recreating the audio element
            audioCache[type] = new Audio(`/sounds/${type}.mp3`);
            audioCache[type]!.volume = 0.3;
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
