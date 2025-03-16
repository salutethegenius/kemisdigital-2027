import { VolumeX } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
  // This is a placeholder component without actual sound functionality
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`transition-all ${className}`}
            aria-label="Sound effects disabled"
          >
            <VolumeX className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sound effects are disabled</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
