import { Router, Request, Response } from "express";
import Stripe from "stripe";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

// Create a payment intent for a one-time payment
router.post("/create-payment", async (req: Request, res: Response) => {
  try {
    const { amount, planType, email, name } = req.body;

    // Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        planType,
      },
    });

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: "usd",
      customer: customer.id,
      metadata: {
        planType,
      },
      receipt_email: email,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Failed to create payment." });
  }
});

// Create a subscription
router.post("/create-subscription", async (req: Request, res: Response) => {
  try {
    const { email, name, planId, paymentMethod, setupFee = 250 } = req.body;

    // Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });

    // Add the setup fee as a one-time invoice item
    if (setupFee > 0) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        amount: setupFee * 100, // Convert to cents
        currency: 'usd',
        description: 'One-time setup fee',
      });
    }

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: planId }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
      // Add the invoice item to the first invoice
      add_invoice_items: setupFee > 0 ? [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'One-time setup fee',
            },
            unit_amount: setupFee * 100,
          },
        },
      ] : undefined,
    });

    // @ts-ignore - Stripe types don't properly define the nested expand
    const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret,
    });
  } catch (error) {
    console.error("Subscription creation error:", error);
    res.status(500).json({ error: "Failed to create subscription." });
  }
});

// Create price IDs for our plans
router.post("/create-product", async (req: Request, res: Response) => {
  try {
    const { name, description, amount, interval } = req.body;
    
    // Create a product
    const product = await stripe.products.create({
      name,
      description,
    });
    
    // Create a price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount * 100,
      currency: "usd",
      recurring: interval ? { interval } : undefined,
    });
    
    res.status(200).json({
      productId: product.id,
      priceId: price.id,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ error: "Failed to create product." });
  }
});

export default router;
