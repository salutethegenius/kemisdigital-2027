import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import Advocacy from "./pages/Advocacy";
import Layout from "./components/layout/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/resources" component={Resources} />
          <Route path="/events" component={Events} />
          <Route path="/contact" component={Contact} />
          <Route path="/membership" component={Membership} />
          <Route path="/advocacy" component={Advocacy} />
          <Route>404 Page Not Found</Route>
        </Switch>
      </Layout>
      <Toaster />
    </SWRConfig>
  </StrictMode>
);
