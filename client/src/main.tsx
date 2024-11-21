import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import Advocacy from "./pages/Advocacy";
import Analytics from "./pages/Analytics";
import AILabs from "./pages/AILabs";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import BlogEditor from "@/components/blog/BlogEditor";
import CaseStudies from "./pages/CaseStudies";
import Layout from "./components/layout/Layout";
import DashboardLayout from "./components/layout/DashboardLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SWRConfig value={{ fetcher }}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard/*">
              {(params) => (
                <ProtectedRoute>
                  <DashboardLayout>
                    <Switch>
                      <Route path="/" component={Dashboard} />
                      <Route path="/analytics" component={Analytics} />
                      <Route path="/ailab" component={AILabs} />
                      <Route path="/blog/new">
                        {() => <BlogEditor onSuccess={() => window.location.href = "/blog"} />}
                      </Route>
                      <Route path="/blog/edit/:id">
                        {(params) => (
                          <BlogEditor
                            postId={parseInt(params.id)}
                            onSuccess={() => window.location.href = "/blog"}
                          />
                        )}
                      </Route>
                      <Route>404 Page Not Found</Route>
                    </Switch>
                  </DashboardLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route>
              {(params) => (
                <Layout>
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/services" component={Services} />
                    <Route path="/resources" component={Resources} />
                    <Route path="/events" component={Events} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/membership" component={Membership} />
                    <Route path="/advocacy" component={Advocacy} />
                    <Route path="/ailabs" component={AILabs} />
                    <Route path="/case-studies" component={CaseStudies} />
                    <Route path="/blog" component={Blog} />
                    <Route>404 Page Not Found</Route>
                  </Switch>
                </Layout>
              )}
            </Route>
          </Switch>
          <Toaster />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
