import * as React from "react";
import { ButtonProps, Button } from "./button";
import { useSound } from "../../hooks/use-sound-effects";

export interface SoundButtonProps extends ButtonProps {
  soundEffect?: "click" | "success";
}

const SoundButton = React.forwardRef<HTMLButtonElement, SoundButtonProps>(
  ({ children, soundEffect = "click", onClick, ...props }, ref) => {
    const { play } = useSound();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Play the sound
      play(soundEffect);
      
      // Call the original onClick handler if provided
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Button {...props} ref={ref} onClick={handleClick}>
        {children}
      </Button>
    );
  }
);

SoundButton.displayName = "SoundButton";

export { SoundButton };
