import * as React from "react";
import { ButtonProps, Button } from "./button";

export interface SoundButtonProps extends ButtonProps {
  soundEffect?: "click" | "success"; // Kept for backward compatibility
}

const SoundButton = React.forwardRef<HTMLButtonElement, SoundButtonProps>(
  ({ children, soundEffect = "click", onClick, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
