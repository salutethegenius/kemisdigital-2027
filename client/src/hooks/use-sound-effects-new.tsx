import { useCallback, useEffect, useState } from 'react';
import React, { createContext, useContext, ReactNode } from 'react';

export type SoundEffect = 'click' | 'hover' | 'success' | 'toggle';

// Web Audio API context
let audioContext: AudioContext | null = null;

// Initialize audio context once
const getAudioContext = (): AudioContext | null => {
  try {
    if (!audioContext && (window.AudioContext || (window as any).webkitAudioContext)) {
      audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
  } catch (error) {
    return null;
  }
};

// Generate simple tones for different sound effects
const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const context = getAudioContext();
  if (!context) return;

  try {
    // Resume context if suspended (required by browser autoplay policies)
    if (context.state === 'suspended') {
      context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = type;

    // Envelope for smooth sound
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
  } catch (error) {
    // Silently handle any audio errors
  }
};

// Sound configurations for different effects
const soundConfig: Record<SoundEffect, { frequency: number; duration: number; type: OscillatorType }> = {
  click: { frequency: 800, duration: 0.1, type: 'square' },
  hover: { frequency: 600, duration: 0.05, type: 'sine' },
  success: { frequency: 523, duration: 0.2, type: 'triangle' }, // C note
  toggle: { frequency: 440, duration: 0.15, type: 'sawtooth' } // A note
};

export function useSoundEffects() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      const storedPreference = localStorage.getItem('sound-effects-enabled');
      return storedPreference !== null ? storedPreference === 'true' : true;
    } catch (error) {
      return true;
    }
  });

  // Initialize audio context on user interaction
  useEffect(() => {
    const initAudio = () => {
      getAudioContext();
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  // Update localStorage when enabled state changes
  useEffect(() => {
    try {
      localStorage.setItem('sound-effects-enabled', String(enabled));
    } catch (error) {
      // Silently handle localStorage errors
    }
  }, [enabled]);

  const play = useCallback((type: SoundEffect) => {
    if (!enabled) return;

    const config = soundConfig[type];
    if (config) {
      playTone(config.frequency, config.duration, config.type);
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

// Context for sound effects
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