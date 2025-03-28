import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StripePaymentForm from "./StripePaymentForm";
import StripeProvider from "../stripe/StripeProvider";

/**
 * PaymentModal Component
 * 
 * This modal handles subscription payments for basic and premium plans
 * It displays plan information and embeds a Stripe payment form
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
      name: "Premium Plan",
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
          <StripeProvider>
            <StripePaymentForm
              planType={planType}
              amount={selectedPlan.price}
              interval="once"
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </StripeProvider>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-500">
          <p>Your payment is secured by Stripe. We do not store your card details.</p>
          <p className="mt-1">By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
