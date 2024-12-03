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
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";
import ComingSoon from "./pages/ComingSoon";
import Privacy from "./pages/Privacy";
import Layout from "./components/layout/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SWRConfig value={{ fetcher }}>
        <Router>
          <Switch>
            <Route path="/privacy" component={Privacy} />
            <Route path="/*">
              <ComingSoon />
            </Route>
          </Switch>
        </Router>
        <Toaster />
      </SWRConfig>
    </ThemeProvider>
  </StrictMode>
);
