import { ReactNode, useMemo } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

/**
 * StripeProvider component props
 * @property {ReactNode} children - Child components that will have access to Stripe context
 */
interface StripeProviderProps {
  children: ReactNode;
}

/**
 * StripeProvider Component
 * 
 * This provider component wraps its children with Stripe's Elements provider
 * to give them access to Stripe functionality.
 * 
 * @param {StripeProviderProps} props - Component props
 * @returns {JSX.Element} The wrapped children with Stripe context
 */
export default function StripeProvider({ children }: StripeProviderProps) {
  // Memoize Stripe instance to prevent recreation on every render
  const stripePromise = useMemo(() => {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.warn('VITE_STRIPE_PUBLISHABLE_KEY is not set');
      return null;
    }
    
    return loadStripe(publishableKey);
  }, []);

  // If no publishable key, render children without Stripe context
  if (!stripePromise) {
    console.warn('Stripe not initialized - missing publishable key');
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
