import express, { Request, Response } from 'express';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not defined in environment variables");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
});

const router = express.Router();

/**
 * Create a one-time payment intent
 * Used for single purchases or one-time services
 */
router.post("/create-payment", async (req: Request, res: Response) => {
  try {
    const { amount, planType, name, email } = req.body;

    if (!amount || !planType || !name || !email) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        planType,
        name,
        email,
      },
      receipt_email: email,
      description: `Payment for ${planType}`,
    });

    // Return the client secret
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while processing your payment' });
  }
});

/**
 * Create a subscription
 * Used for recurring billing plans
 */
router.post("/create-subscription", async (req: Request, res: Response) => {
  try {
    const { name, email, planId, paymentMethod, setupFee } = req.body;

    if (!name || !email || !planId || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create or get customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        name,
        email,
      });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethod, {
      customer: customer.id,
    });

    // Set as default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });

    // Add setup fee if applicable
    let subscription;
    if (setupFee && setupFee > 0) {
      // Create a one-time invoice item for the setup fee
      await stripe.invoiceItems.create({
        customer: customer.id,
        amount: Math.round(setupFee * 100), // Convert to cents
        currency: 'usd',
        description: 'One-time setup fee',
      });
    }

    // Create subscription
    subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: planId,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    // Type assertion for expanded invoice with payment intent
    const invoice = subscription.latest_invoice as any;
    const clientSecret = invoice?.payment_intent?.client_secret;

    res.json({
      subscriptionId: subscription.id,
      clientSecret,
    });
  } catch (error: any) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while processing your subscription' });
  }
});

/**
 * Create a product in Stripe
 * For admin use only, typically not exposed to clients
 */
router.post("/create-product", async (req: Request, res: Response) => {
  try {
    const { name, description, type, amount, interval } = req.body;

    if (!name || !amount || (type === 'subscription' && !interval)) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create a product first
    const product = await stripe.products.create({
      name,
      description,
    });

    // Create price based on type
    let price;
    if (type === 'subscription') {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        recurring: {
          interval: interval, // 'month' or 'year'
        },
      });
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
      });
    }

    res.json({
      productId: product.id,
      priceId: price.id,
    });
  } catch (error: any) {
    console.error('Product creation error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while creating the product' });
  }
});

export default router;
