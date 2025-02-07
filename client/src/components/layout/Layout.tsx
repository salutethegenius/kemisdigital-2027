import { ReactNode, lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Preloader from "@/components/shared/Preloader";
import ErrorBoundary from "@/components/ErrorBoundary";

const Chatbot = lazy(() => import("@/components/chat/Chatbot"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ErrorBoundary>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Suspense fallback={<Preloader />}>
          <Chatbot />
        </Suspense>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}