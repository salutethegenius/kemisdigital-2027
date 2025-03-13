import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StripePaymentForm from './StripePaymentForm';
import StripeProvider from '../stripe/StripeProvider';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (paymentIntentId: string) => void;
  planType: 'basic' | 'premium';
}

const PaymentModal = ({ isOpen, onClose, onSuccess, planType }: PaymentModalProps) => {
  const [amount, setAmount] = useState(0);
  const [interval, setInterval] = useState<'month' | 'year'>('month');

  // Set plan details based on type
  useEffect(() => {
    if (planType === 'basic') {
      setAmount(45); // Changed from 49 to 45
    } else if (planType === 'premium') {
      setAmount(99);
    }
  }, [planType]);

  const handleSuccess = (paymentIntentId: string) => {
    if (onSuccess) {
      onSuccess(paymentIntentId);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Subscribe to {planType === 'basic' ? 'Basic' : 'Premium'} Plan
          </DialogTitle>
          <div className="bg-yellow-100 p-3 rounded-md border border-yellow-300 mt-3">
            <p className="text-md font-bold text-yellow-800">
              Initial payment: ${250 + amount}
            </p>
            <p className="text-sm text-yellow-700">
              Includes $250 setup fee + first month (${amount})
            </p>
            <p className="text-sm font-semibold text-yellow-800 mt-1">
              Recurring payment: ${amount}/month
            </p>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <StripeProvider>
            <StripePaymentForm
              planType={planType}
              amount={amount}
              interval={interval}
              onSuccess={handleSuccess}
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
