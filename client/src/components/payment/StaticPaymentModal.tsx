import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, ExternalLink } from "lucide-react";
import { createCheckoutSession, getPaymentLink } from "@/lib/stripe-client";
import { toast } from "@/hooks/use-toast";

interface StaticPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: 'basic' | 'premium';
}

export default function StaticPaymentModal({ isOpen, onClose, selectedPlan }: StaticPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const planDetails = {
    basic: {
      name: "Stripe Setup",
      price: "$97",
      description: "One-time setup fee for Stripe payment processing",
      features: [
        "Complete Stripe account setup",
        "Payment form integration",
        "Basic transaction monitoring",
        "Email support for 30 days"
      ]
    },
    premium: {
      name: "Premium Setup + Training",
      price: "$197",
      description: "Complete setup with training and ongoing support",
      features: [
        "Everything in Basic plan",
        "Live training session",
        "Custom payment page design",
        "Advanced analytics setup",
        "90 days of email support",
        "Priority support"
      ]
    }
  };

  const currentPlan = planDetails[selectedPlan];

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    try {
      await createCheckoutSession({
        amount: selectedPlan === 'basic' ? 9700 : 19700, // Amount in cents
        currency: 'usd',
        description: currentPlan.description,
        planType: selectedPlan
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const handlePaymentLink = () => {
    const paymentLink = getPaymentLink(selectedPlan);
    window.open(paymentLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {currentPlan.name}
              <span className="text-2xl font-bold text-[#00A0E3]">{currentPlan.price}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-2 mb-6">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Button
                onClick={handleStripeCheckout}
                disabled={isProcessing}
                className="w-full bg-[#00A0E3] hover:bg-[#0078A8]"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isProcessing ? "Processing..." : "Pay with Stripe Checkout"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">or</div>

              <Button
                onClick={handlePaymentLink}
                variant="outline"
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Stripe Payment Link
              </Button>
            </div>

            <div className="mt-4 text-xs text-center text-muted-foreground">
              Secure payment processing by Stripe. Your card information is never stored on our servers.
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}