import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Router } from "wouter";
import { HelmetProvider } from 'react-helmet-async';
import "./i18n";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./hooks/use-theme";
import { setupGlobalErrorHandling } from "./lib/errorHandling";

// Eager load only the Home component
import Home from "./pages/Home";

// Lazy load other components
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const WebAppDev = lazy(() => import("./pages/WebAppDev"));
const PaymentSolutions = lazy(() => import("./pages/PaymentSolutions"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Resources = lazy(() => import("./pages/Resources"));
const Meet = lazy(() => import("./pages/Meet"));
const DrewberCongratulations = lazy(() => import("./pages/DrewberCongratulations"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00A0E3]"></div>
  </div>
);

function App() {
  return (
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Router>
              <Suspense fallback={<LoadingSpinner />}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/services" component={Services} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/web-app-development" component={WebAppDev} />
                  <Route path="/payment-solutions" component={PaymentSolutions} />
                  <Route path="/payment-success" component={PaymentSuccess} />
                  <Route path="/resources" component={Resources} />
                  <Route path="/meet" component={Meet} />
                  <Route path="/drewber-congratulations" component={DrewberCongratulations} />
                  <Route>
                    <div className="flex items-center justify-center min-h-screen">
                      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
                    </div>
                  </Route>
                </Switch>
              </Suspense>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );
}

// Setup global error handling to suppress fetch errors
setupGlobalErrorHandling();

// Mount the app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}