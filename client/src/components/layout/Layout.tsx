import { ReactNode, lazy, Suspense, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Preloader from "@/components/shared/Preloader";
import { useLocation } from "wouter";

const Chatbot = lazy(() => import("@/components/chat/Chatbot"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  
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

  // Determine if this page should have header padding
  // Home page with hero section doesn't need top padding
  const isHomePage = location === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {loading && <Preloader />}
      <Header />
      <main className={`flex-grow container mx-auto px-4 ${isHomePage ? '' : 'pt-24 md:pt-28'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
