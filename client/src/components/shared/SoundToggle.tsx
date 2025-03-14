import { VolumeX, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSound } from "../../hooks/use-sound-effects";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
  const { enabled, toggleSoundEffects, play } = useSound();

  const handleClick = () => {
    toggleSoundEffects();
    // Play toggle sound if enabling
    if (!enabled) {
      play("toggle");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className={`transition-all ${className}`}
            aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
          >
            {enabled ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
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
