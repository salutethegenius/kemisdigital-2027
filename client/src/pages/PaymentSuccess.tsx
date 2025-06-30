import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHelmet from "@/components/shared/SEOHelmet";

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Get session ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    setSessionId(sessionIdParam);
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SEOHelmet
        title="Payment Successful | KemisDigital"
        description="Thank you for your purchase! Your Stripe setup service has been confirmed."
        keywords="payment success, Stripe setup, KemisDigital"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex justify-center mb-4"
              >
                <CheckCircle className="h-16 w-16 text-green-500" />
              </motion.div>
              <CardTitle className="text-2xl text-white">Payment Successful!</CardTitle>
              <p className="text-slate-300 mt-2">
                Thank you for choosing KemisDigital for your Stripe payment setup
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {sessionId && (
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-sm text-slate-400">Transaction ID:</p>
                  <p className="text-sm font-mono text-slate-200 break-all">{sessionId}</p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What happens next?</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You'll receive a confirmation email within 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Our team will contact you within 24 hours to begin setup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Your Stripe account will be fully configured within 2-3 business days</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-2">Need immediate assistance?</h4>
                <p className="text-blue-200 text-sm mb-3">
                  Contact us directly for urgent setup requests or questions about your purchase.
                </p>
                <div className="space-y-2 text-sm text-blue-200">
                  <div>📧 Email: support@kemisdigital.com</div>
                  <div>📱 WhatsApp: +1 (242) 555-0123</div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => navigate("/")}
                  className="flex-1 bg-[#00A0E3] hover:bg-[#0078A8]"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Button>
                <Button
                  onClick={() => navigate("/contact")}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}