import { VolumeX, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSound } from "../../hooks/use-sound-effects";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
  const { enabled, toggleSoundEffects, play } = useSound();
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    toggleSoundEffects();
    // Play toggle sound if enabling
    if (!enabled) {
      play("toggle");
    }
    
    // Add a brief animation when toggled
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className={`transition-all ${animating ? 'scale-110' : ''} ${className}`}
            aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
          >
            {enabled ? (
              <Volume2 className={`h-5 w-5 ${animating ? 'text-primary' : ''}`} />
            ) : (
              <VolumeX className={`h-5 w-5 ${animating ? 'text-muted-foreground' : ''}`} />
            )}
            
            {/* Small indicator dot */}
            {enabled && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{enabled ? "Disable sound effects" : "Enable sound effects"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
