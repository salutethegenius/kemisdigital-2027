import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

// The site is always in dark mode, but we keep the toggle for API compatibility
// and future enhancements
export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Theme (dark mode only)"
      title="Theme (dark mode only)"
    >
      <Sun className="h-5 w-5 transition-all" />
    </Button>
  );
}
