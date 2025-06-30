
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Router } from "wouter";
import "./index.css";
import "./styles/animated-title.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import { HelmetProvider } from 'react-helmet-async';
import "./i18n";
import ErrorBoundary from "./components/ErrorBoundary";

// Global unhandled rejection handler to prevent console spam
window.addEventListener('unhandledrejection', (event) => {
  event.preventDefault(); // Prevent default browser behavior
  // Silently handle unhandled rejections
});

// Eager load only the Home component
import Home from "./pages/Home";

// Lazy load other components
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));

// Layout
import Layout from "./components/layout/Layout";

// Simple loading component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-[#00A0E3]/20 rounded-full border-t-[#00A0E3] animate-spin"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SWRConfig 
          value={{ 
            fetcher,
            revalidateOnFocus: false,
            dedupingInterval: 10000,
            shouldRetryOnError: false,
            errorRetryCount: 0
          }}
        >
          <Router>
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/services" component={Services} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/privacy" component={Privacy} />
                </Switch>
              </Suspense>
            </Layout>
          </Router>
          <Toaster />
        </SWRConfig>
      </ThemeProvider>
    </HelmetProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
