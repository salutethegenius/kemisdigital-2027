import { createContext, useContext, useEffect } from "react";

// Type is now only "dark"
type Theme = "dark";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<{
  theme: Theme;
  // Keep toggleTheme for API compatibility, but it won't actually toggle
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => null,
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Always use dark theme
  const theme: Theme = "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // Empty function for API compatibility
  const toggleTheme = () => {
    // Does nothing - site is always in dark mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
