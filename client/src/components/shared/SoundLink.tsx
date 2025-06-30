import { ReactNode, forwardRef } from "react";
import { Link, useLocation } from "wouter";

interface SoundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const SoundLink = forwardRef<HTMLAnchorElement, SoundLinkProps>(({
  href,
  children,
  className = "",
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
