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
import Privacy from "./pages/Privacy";
import DataDeletion from "./pages/DataDeletion";

// Layout
import Layout from "./components/layout/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SWRConfig value={{ fetcher }}>
        <Router>
          <Switch>
            <Route path="/privacy">
              <Privacy />
            </Route>
            <Route path="/data-deletion">
              <DataDeletion />
            </Route>
            <Route path="/:rest*">
              <Layout>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/services" component={Services} />
                  <Route path="/about" component={About} />
                  <Route path="/resources" component={Resources} />
                  <Route path="/events" component={Events} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/case-studies" component={CaseStudies} />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </Router>
        <Toaster />
      </SWRConfig>
    </ThemeProvider>
  </StrictMode>
);
