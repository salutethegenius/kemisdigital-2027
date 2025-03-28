import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import StripeProvider from "../stripe/StripeProvider";

/**
 * PaymentModal Component
 * 
 * This modal handles one-time payment for Stripe setup package
 * It displays service information and embeds a Stripe payment form
 */
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (paymentIntentId: string) => void;
  planType: 'basic' | 'premium';
}

const PaymentModal = ({ isOpen, onClose, onSuccess, planType }: PaymentModalProps) => {
  // Pricing information based on plan type
  const plans = {
    basic: {
      name: "Stripe Setup Package",
      price: 97,
      features: [
        "Stripe Account Creation & Configuration",
        "Dashboard Access & Training",
        "Integration Support (if needed)",
        "One-time fee (no monthly charges)"
      ]
    },
    premium: {
      name: "Premium Setup Package",
      price: 299,
      features: [
        "Everything in Basic package",
        "Advanced integrations",
        "Priority support",
        "Custom payment portal",
        "Business automation setup"
      ]
    }
  };

  const selectedPlan = plans[planType];
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Payment Error",
        description: "Stripe has not been properly initialized.",
        variant: "destructive"
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast({
        title: "Payment Error",
        description: "Card element not found.",
        variant: "destructive"
      });
      return;
    }

    // Validate form
    if (!name || !email) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      if (!paymentMethod) {
        throw new Error('Failed to create payment method');
      }

      // Create one-time payment
      const response = await fetch('/api/payment/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          amount: selectedPlan.price,
          description: selectedPlan.name,
          paymentMethod: paymentMethod.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process payment');
      }

      const { clientSecret, paymentIntentId } = await response.json();

      // Confirm payment
      const { error: confirmationError } = await stripe.confirmCardPayment(clientSecret);

      if (confirmationError) {
        throw new Error(confirmationError.message);
      }

      toast({
        title: "Payment Successful",
        description: `Thank you for purchasing the ${selectedPlan.name}!`,
      });

      if (onSuccess) {
        onSuccess(paymentIntentId);
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {selectedPlan.name}
          </DialogTitle>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mt-3">
            <p className="text-md font-bold text-blue-800">
              One-time Fee: ${selectedPlan.price.toFixed(2)}
            </p>
            <p className="text-sm text-blue-700 mb-2">
              No monthly charges! Simple, one-time setup fee.
            </p>
            <ul className="space-y-1">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="text-sm text-blue-700 flex">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="card" className="block text-sm font-medium mb-1">Card Details</label>
                <div className="p-3 border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                  <CardElement 
                    id="card"
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            
            
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-[#00A0E3] hover:bg-[#0085bb]"
                disabled={!stripe || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay $${selectedPlan.price}`
                )}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-500">
          <p>Your payment is secured by Stripe. We do not store your card details.</p>
          <p className="mt-1">By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Wrap with StripeProvider when exported
const WrappedPaymentModal = (props: PaymentModalProps) => (
  <StripeProvider>
    <PaymentModal {...props} />
  </StripeProvider>
);

export default WrappedPaymentModal;