import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Router } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import { HelmetProvider } from 'react-helmet-async';
// Import i18n configuration
import "./i18n";
import Preloader from "./components/shared/Preloader";

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
const PaymentSolutions = lazy(() => import("./pages/PaymentSolutions"));
const PressReleaseKemisDigital = lazy(() => import("./pages/PressReleaseKemisDigital"));

// Service Pages - Lazy Loaded
const WebDevelopment = lazy(() => import("@/pages/services/WebDevelopment"));
const AnalyticsDashboards = lazy(() => import("@/pages/services/AnalyticsDashboards"));
const DigitalMarketing = lazy(() => import("@/pages/services/DigitalMarketing"));
const TrainingSupport = lazy(() => import("@/pages/services/TrainingSupport"));
const WebAppDev = lazy(() => import("@/pages/WebAppDev"));

// Layout
import Layout from "./components/layout/Layout";

// Add Link Preloading (prefetch when hovering links)
if (typeof window !== 'undefined') {
  if ('IntersectionObserver' in window && 'requestIdleCallback' in window) {
    // Preload pages when links are in viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          const href = link.getAttribute('href');
          if (href && href.startsWith('/') && !link.dataset.prefetched) {
            // Mark as prefetched to avoid duplicate prefetching
            link.dataset.prefetched = 'true';
            
            // Use requestIdleCallback to preload during browser idle time
            window.requestIdleCallback(() => {
              switch (href) {
                case '/about':
                  import("./pages/About");
                  break;
                case '/services':
                  import("./pages/Services");
                  break;
                case '/contact':
                  import("./pages/Contact");
                  break;
                // Add more cases as needed
              }
            });
          }
        }
      });
    }, { rootMargin: '200px' });

    // Add event listeners after a short delay to avoid initial load impact
    setTimeout(() => {
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        observer.observe(link);
      });
    }, 1000);
  }
}

// Simple loading component for page transitions - no preloader for internal navigation
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-[#00A0E3]/20 rounded-full border-t-[#00A0E3] animate-spin"></div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SWRConfig 
          value={{ 
            fetcher,
            revalidateOnFocus: false, // Disable revalidation on window focus
            revalidateIfStale: true,
            dedupingInterval: 10000 // Dedupe requests within 10 seconds
          }}
        >
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
                  <Route path="/news/kemisdigital-revolutionizes-digital-marketing" component={PressReleaseKemisDigital} />
                </Switch>
              </Suspense>
            </Layout>
          </Router>
          <Toaster />
        </SWRConfig>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
