import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import Cookies from "js-cookie";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test credentials
const TEST_EMAIL = "admin@bdma.com";
const TEST_PASSWORD = "bdma2024";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check for existing session
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Validate against test credentials
    if (email !== TEST_EMAIL || password !== TEST_PASSWORD) {
      throw new Error("Invalid credentials");
    }

    try {
      const mockUser = { email, name: "Admin User" };
      setUser(mockUser);
      Cookies.set("user", JSON.stringify(mockUser), { expires: 7 });
      setLocation("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    setLocation("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
