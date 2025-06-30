import { StrictMode, lazy, Suspense, useEffect } from "react";
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
import { setupGlobalErrorHandling } from "./lib/errorHandling";
import ErrorBoundary from "./components/ErrorBoundary";

// Eager load only the Home component for fast initial load
import Home from "./pages/Home";

// Lazy load all other components
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Resources = lazy(() => import("./pages/Resources"));
const Events = lazy(() => import("./pages/Events"));
const Contact = lazy(() => import("./pages/Contact"));
const LatestNews = lazy(() => import("./pages/LatestNews"));
const Privacy = lazy(() => import("./pages/Privacy"));
const DataDeletion = lazy(() => import("./pages/DataDeletion"));
const Meet = lazy(() => import("./pages/Meet"));
const USCompanyFormation = lazy(() => import("./pages/USCompanyFormation"));
const PaymentSolutions = lazy(() => import("./pages/PaymentSolutions"));
const PressReleaseKemisDigital = lazy(() => import("./pages/PressReleaseKemisDigital"));
const Membership = lazy(() => import("./pages/Membership"));
const AILabs = lazy(() => import("./pages/AILabs"));

// Service Pages - Lazy Loaded
const WebDevelopment = lazy(() => import("@/pages/services/WebDevelopment"));
const AnalyticsDashboards = lazy(() => import("@/pages/services/AnalyticsDashboards"));
const DigitalMarketing = lazy(() => import("@/pages/services/DigitalMarketing"));
const TrainingSupport = lazy(() => import("@/pages/services/TrainingSupport"));
const WebAppDev = lazy(() => import("@/pages/WebAppDev"));

// Layout
import Layout from "./components/layout/Layout";

// Simple loading component for page transitions
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-[#00A0E3]/20 rounded-full border-t-[#00A0E3] animate-spin"></div>
  </div>
);

// Main App Component with error handling setup
function App() {
  useEffect(() => {
    // Setup global error handling after React renders
    setupGlobalErrorHandling();
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SWRConfig 
          value={{ 
            fetcher,
            revalidateOnFocus: false,
            revalidateIfStale: true,
            dedupingInterval: 10000,
            onError: (error) => {
              console.warn('SWR Error:', error instanceof Error ? error.message : String(error));
            }
          }}
        >
          <ErrorBoundary componentName="App">
            <Router>
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/privacy" component={Privacy} />
                    <Route path="/data-deletion" component={DataDeletion} />
                    <Route path="/services" component={Services} />
                    <Route path="/services/web-development" component={WebDevelopment} />
                    <Route path="/services/analytics-dashboards" component={AnalyticsDashboards} />
                    <Route path="/services/digital-marketing" component={DigitalMarketing} />
                    <Route path="/services/training-support" component={TrainingSupport} />
                    <Route path="/services/web-app-dev" component={WebAppDev} />
                    <Route path="/about" component={About} />
                    <Route path="/resources" component={Resources} />
                    <Route path="/events" component={Events} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/meet" component={Meet} />
                    <Route path="/latest-news" component={LatestNews} />
                    <Route path="/payment-solutions" component={PaymentSolutions} />
                    <Route path="/membership" component={Membership} />
                    <Route path="/ai-labs" component={AILabs} />
                    <Route path="/us-company-formation" component={USCompanyFormation} />
                    <Route path="/news/kemisdigital-revolutionizes-digital-marketing" component={PressReleaseKemisDigital} />
                  </Switch>
                </Suspense>
              </Layout>
            </Router>
          </ErrorBoundary>
          <Toaster />
        </SWRConfig>
      </ThemeProvider>
    </HelmetProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);