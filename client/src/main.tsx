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
import DataDeletion from "./pages/DataDeletion";
import Layout from "./components/layout/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SWRConfig value={{ fetcher }}>
        <Router>
          <Switch>
            <Route path="/">
              <ComingSoon />
            </Route>
            <Route path="/services">
              <Layout>
                <Services />
              </Layout>
            </Route>
            <Route path="/about">
              <Layout>
                <About />
              </Layout>
            </Route>
            <Route path="/resources">
              <Layout>
                <Resources />
              </Layout>
            </Route>
            <Route path="/events">
              <Layout>
                <Events />
              </Layout>
            </Route>
            <Route path="/contact">
              <Layout>
                <Contact />
              </Layout>
            </Route>
            <Route path="/blog">
              <Layout>
                <Blog />
              </Layout>
            </Route>
            <Route path="/case-studies">
              <Layout>
                <CaseStudies />
              </Layout>
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
            <Route path="/data-deletion">
              <DataDeletion />
            </Route>
          </Switch>
        </Router>
        <Toaster />
      </SWRConfig>
    </ThemeProvider>
  </StrictMode>
);
