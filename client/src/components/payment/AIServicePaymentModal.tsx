import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

/**
 * AI Service Payment Modal props interface
 */
interface AIServicePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (paymentIntentId: string) => void;
  serviceName: string;
  servicePrice: number;
  serviceDescription: string;
}

export default function AIServicePaymentModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  serviceName, 
  servicePrice, 
  serviceDescription 
}: AIServicePaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPaymentIntentId = `pi_${Date.now()}`;
      
      toast({
        title: "Payment Successful",
        description: `Thank you for purchasing ${serviceName}!`,
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {serviceName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">{serviceDescription}</p>
            <p className="text-2xl font-bold text-[#00A0E3]">${servicePrice}</p>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Payment integration coming soon. For now, please contact us to purchase this service.
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
                  `Pay $${servicePrice}`
                )}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-center text-muted-foreground">
          <p>Your payment is secured by Stripe. We do not store your card details.</p>
          <p className="mt-1">By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}