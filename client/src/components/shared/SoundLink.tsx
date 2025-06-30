import { ReactNode, forwardRef } from "react";
import { Link, useLocation } from "wouter";

interface SoundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  soundEffect?: "click" | "hover"; // Kept for backward compatibility
  onClick?: () => void;
}

const SoundLink = forwardRef<HTMLAnchorElement, SoundLinkProps>(({
  href,
  children,
  className = "",
  soundEffect = "click", // Not used, but kept for backward compatibility
  onClick,
  ...props
}, ref) => {
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
      ref={ref}
      {...props}
    >
      {children}
    </Link>
  );
});

SoundLink.displayName = 'SoundLink';

export default SoundLink;
