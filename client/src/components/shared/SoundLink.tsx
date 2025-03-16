import { ReactNode } from "react";
import { Link, useLocation } from "wouter";

interface SoundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  soundEffect?: "click" | "hover"; // Kept for backward compatibility
  onClick?: () => void;
}

export default function SoundLink({
  href,
  children,
  className = "",
  soundEffect = "click", // Not used, but kept for backward compatibility
  onClick,
  ...props
}: SoundLinkProps) {
  const [location] = useLocation();
  const isActive = location === href;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? "active" : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}
