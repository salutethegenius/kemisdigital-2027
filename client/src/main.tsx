import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
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
import Layout from "./components/layout/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SWRConfig value={{ fetcher }}>
        {/* Temporarily show ComingSoon page */}
        <ComingSoon />
        {/* Uncomment below and remove ComingSoon when ready to launch
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/resources" component={Resources} />
            <Route path="/events" component={Events} />
            <Route path="/contact" component={Contact} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/blog" component={Blog} />
            <Route>404 Page Not Found</Route>
          </Switch>
        </Layout>
        */}
        <Toaster />
      </SWRConfig>
    </ThemeProvider>
  </StrictMode>
);
