import React, { forwardRef } from "react";
import { Input, InputProps } from "./input";
import { Textarea, TextareaProps } from "./textarea";

export interface SoundInputProps extends InputProps {
  soundEffect?: "click" | "success"; // Kept for backward compatibility
}

export const SoundInput = forwardRef<HTMLInputElement, SoundInputProps>(
  ({ soundEffect = "click", onFocus, onBlur, ...props }, ref) => {
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      // Call the original onFocus handler if provided
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      // Call the original onBlur handler if provided
      if (onBlur) {
        onBlur(event);
      }
    };

    return (
      <Input {...props} ref={ref} onFocus={handleFocus} onBlur={handleBlur} />
    );
  }
);

SoundInput.displayName = "SoundInput";

export interface SoundTextareaProps extends TextareaProps {
  soundEffect?: "click" | "success"; // Kept for backward compatibility
}

export const SoundTextarea = forwardRef<HTMLTextAreaElement, SoundTextareaProps>(
  ({ soundEffect = "click", onFocus, onBlur, ...props }, ref) => {
    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      // Call the original onFocus handler if provided
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      // Call the original onBlur handler if provided
      if (onBlur) {
        onBlur(event);
      }
    };

    return (
      <Textarea {...props} ref={ref} onFocus={handleFocus} onBlur={handleBlur} />
    );
  }
);

SoundTextarea.displayName = "SoundTextarea";
