import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Router } from "wouter";
import "./index.css";
import "./styles/animated-title.css";
import "./styles/animated-title.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import { HelmetProvider } from 'react-helmet-async';
// Import i18n configuration
import "./i18n";
import Preloader from "./components/shared/Preloader";
import { logError, createError } from "./lib/errorHandling";
import ErrorBoundary from "./components/ErrorBoundary";

// Global error handlers to prevent unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('🔴 Unhandled Promise Rejection:', event.reason);
  
  // Convert to our standardized error format
  const appError = createError('Unhandled Promise Rejection', {
    code: 'CLIENT_UNHANDLED_REJECTION',
    context: {
      reason: event.reason instanceof Error ? event.reason.message : String(event.reason),
      stack: event.reason instanceof Error ? event.reason.stack : undefined
    },
    cause: event.reason instanceof Error ? event.reason : undefined
  });
  
  logError(appError, 'error');
  
  // Prevent the default unhandled rejection behavior
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('🔴 Global Error:', event.error);
  
  const appError = createError('Global JavaScript Error', {
    code: 'CLIENT_GLOBAL_ERROR',
    context: {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      message: event.message
    },
    cause: event.error
  });
  
  logError(appError, 'error');
});

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
const Advocacy = lazy(() => import("./pages/Advocacy"));
const Analytics = lazy(() => import("./pages/Analytics"));
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

// Duplicate error handlers removed - using the ones above

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
            dedupingInterval: 10000, // Dedupe requests within 10 seconds
            onError: (error, key) => {
              // Handle SWR errors globally
              const appError = createError('SWR Request Failed', {
                code: 'CLIENT_SWR_ERROR',
                context: {
                  key,
                  error: error instanceof Error ? error.message : String(error)
                },
                cause: error instanceof Error ? error : undefined
              });
              logError(appError, 'error');
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
                  <Route path="/advocacy" component={Advocacy} />
                  <Route path="/analytics" component={Analytics} />
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
  </StrictMode>
);
