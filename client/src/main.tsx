import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Router } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import LatestNews from "./pages/LatestNews";
import Privacy from "./pages/Privacy";
import DataDeletion from "./pages/DataDeletion";
import Meet from "./pages/Meet";
import PaymentSolutions from "./pages/PaymentSolutions";  // Add import

// Service Pages
import WebDevelopment from "@/pages/services/WebDevelopment";
import AnalyticsDashboards from "@/pages/services/AnalyticsDashboards";
import DigitalMarketing from "@/pages/services/DigitalMarketing";
import TrainingSupport from "@/pages/services/TrainingSupport";
import WebAppDev from "@/pages/WebAppDev";

// Layout
import Layout from "./components/layout/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SWRConfig value={{ fetcher }}>
        <Router>
          <Layout>
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
              <Route path="/payment-solutions" component={PaymentSolutions} />  {/* Add route */}
            </Switch>
          </Layout>
        </Router>
        <Toaster />
      </SWRConfig>
    </ThemeProvider>
  </StrictMode>
);