import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

/**
 * StripeProvider component props
 * @property {ReactNode} children - Child components that will have access to Stripe context
 */
interface StripeProviderProps {
  children: ReactNode;
}

// Initialize Stripe outside of the component to prevent multiple instances
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
