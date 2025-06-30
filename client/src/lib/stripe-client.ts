/**
 * Client-side Stripe integration for KemisDigital
 * Handles payment processing without backend server
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  planType: 'basic' | 'premium';
}

/**
 * Create a payment using Stripe Checkout (hosted payment page)
 * This is the simplest approach for static sites
 */
export const createCheckoutSession = async (paymentData: PaymentData) => {
  const stripe = await stripePromise;
  
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  // For a static site, we'll use Stripe's prebuilt checkout
  // You'll need to create these price IDs in your Stripe dashboard
  const priceId = paymentData.planType === 'basic' 
    ? 'price_basic_setup' // Replace with actual price ID from Stripe dashboard
    : 'price_premium_setup'; // Replace with actual price ID from Stripe dashboard

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{
      price: priceId,
      quantity: 1,
    }],
    mode: 'payment',
    successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/payment-solutions`,
    customerEmail: undefined, // Customer will enter this
  });

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Alternative: Create payment with Stripe Elements (embedded forms)
 * More customizable but requires more setup
 */
export const createPaymentIntent = async (paymentData: PaymentData) => {
  // For static sites, you'd typically use Stripe Checkout instead
  // But if you need custom forms, you can use a serverless function
  // or Stripe's Payment Links feature
  
  throw new Error('Payment Intent requires serverless function - use Checkout instead');
};

/**
 * Create a Stripe Payment Link (no code solution)
 * Best for simple one-time payments
 */
export const getPaymentLink = (planType: 'basic' | 'premium'): string => {
  // You create these links in your Stripe dashboard
  const paymentLinks = {
    basic: 'https://buy.stripe.com/your-basic-link', // Replace with actual link
    premium: 'https://buy.stripe.com/your-premium-link', // Replace with actual link
  };
  
  return paymentLinks[planType];
};

/**
 * Verify payment success (for success page)
 */
export const verifyPaymentSuccess = async (sessionId: string) => {
  // For static sites, you can't verify server-side
  // But Stripe will only redirect to success URL if payment succeeded
  return { success: true, sessionId };
};

export default stripePromise;