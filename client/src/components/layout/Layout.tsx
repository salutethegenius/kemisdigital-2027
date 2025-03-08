import { ReactNode, lazy, Suspense, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Preloader from "@/components/shared/Preloader";

const Chatbot = lazy(() => import("@/components/chat/Chatbot"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if this is the first visit to the site during this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // This is the first visit, show preloader
      sessionStorage.setItem('hasVisited', 'true');
      // Keep preloader visible, it will auto-dismiss itself
    } else {
      // Not first visit, don't show preloader
      setLoading(false);
    }
    
    // Force preloader to show on every visit for now (for testing)
    // Comment this out in production if you only want preloader on first visit
    setLoading(true);
    
    // Preload any critical assets here
    const preloadAssets = async () => {
      try {
        // Any critical assets, videos, or images can be preloaded here
        // Example: await Promise.all([...promises to load assets])
      } catch (error) {
        console.error('Failed to preload assets:', error);
      }
    };
    
    preloadAssets();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {loading && <Preloader />}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
