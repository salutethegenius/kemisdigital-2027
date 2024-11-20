import { ReactNode, lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Chatbot = lazy(() => import("@/components/chat/Chatbot"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}
