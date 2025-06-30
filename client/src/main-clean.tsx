import { createRoot } from "react-dom/client";
import { Switch, Route, Router } from "wouter";
import "./index.css";

// Simple components without complex hooks to avoid React errors
import Home from "./pages/Home";
import Contact from "./pages/Contact";

// Simple App without complex providers that might cause hook errors
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route>
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">KemisDigital</h1>
              <p className="text-xl">Page not found</p>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

// Mount the app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}