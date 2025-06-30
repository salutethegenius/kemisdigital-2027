import React from 'react';
import { Button } from './button';
import { useSound } from '../../hooks/use-sound-effects-new';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle() {
  const { enabled, toggleSoundEffects, play } = useSound();

  const handleToggle = () => {
    toggleSoundEffects();
    // Play a test sound when enabling
    if (!enabled) {
      setTimeout(() => play('success'), 100);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="gap-2 hover:bg-gray-800 transition-colors"
      title={enabled ? 'Disable sound effects' : 'Enable sound effects'}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="text-sm">{enabled ? 'Sound On' : 'Sound Off'}</span>
    </Button>
  );
}