import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useSound } from "../../hooks/use-sound-effects";

interface SoundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  soundEffect?: "click" | "hover";
  onClick?: () => void;
}

export default function SoundLink({
  href,
  children,
  className = "",
  soundEffect = "click",
  onClick,
  ...props
}: SoundLinkProps) {
  const { play } = useSound();
  const [location] = useLocation();
  const isActive = location === href;

  const handleClick = (e: React.MouseEvent) => {
    // Don't play click sound if we're already on this page
    if (location !== href) {
      play(soundEffect);
    }
    
    if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    play("hover");
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${className} ${isActive ? "active" : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}
