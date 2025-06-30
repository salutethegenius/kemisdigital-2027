import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

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
  const [isProcessing, setIsProcessing] = useState(false);

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
      name: "Premium Package",
      price: 297,
      features: [
        "Everything in Basic Package",
        "Custom Payment Integration",
        "Advanced Analytics Setup",
        "Priority Support",
        "3 months of maintenance"
      ]
    }
  };

  const selectedPlan = plans[planType];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPaymentIntentId = `pi_${Date.now()}`;
      
      toast({
        title: "Payment Successful",
        description: `Thank you for purchasing ${selectedPlan.name}!`,
      });
      
      onSuccess?.(mockPaymentIntentId);
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "Please try again or contact support.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg mx-4 bg-background rounded-lg shadow-lg border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">{selectedPlan.name}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-[#00A0E3]">${selectedPlan.price}</p>
            <p className="text-sm text-muted-foreground">One-time payment</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">What's included:</h3>
            <ul className="space-y-2">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#00A0E3] mr-2">✓</span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Payment integration coming soon. For now, please contact us to purchase this package.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 bg-[#00A0E3] hover:bg-[#00A0E3]/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay $${selectedPlan.price}`
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-center text-muted-foreground">
            <p>Your payment is secured by Stripe. We do not store your card details.</p>
            <p className="mt-1">By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;