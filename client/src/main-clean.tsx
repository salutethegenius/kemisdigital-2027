import { createRoot } from "react-dom/client";
import "./index.css";

// Minimal working app to fix React hook errors
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#00A0E3] mb-4">KemisDigital</h1>
          <p className="text-xl text-gray-300">Digital Marketing & Software Solutions</p>
          <p className="text-lg text-gray-400 mt-2">Serving The Bahamas with Innovation</p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-[#F7BE00] mb-4">Our Services</h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Web Application Development</li>
                <li>• Payment Processing Solutions</li>
                <li>• AI-Powered Marketing Tools</li>
                <li>• Digital Strategy Consulting</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-[#F7BE00] mb-4">Contact Us</h2>
              <div className="space-y-3 text-gray-300">
                <p>Ready to transform your business?</p>
                <p>Email: info@kemisdigital.com</p>
                <p>Phone: +1-242-XXX-XXXX</p>
                <p>Location: Nassau, Bahamas</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#00A0E3] to-[#F7BE00] p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                The People's Choice
              </h3>
              <p className="text-gray-900 text-lg">
                Backed by 20 years of experience in the Bahamian marketplace
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Mount the app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}