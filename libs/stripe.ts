/**
 * Stripe Integration
 * 
 * This module handles all Stripe-related operations including:
 * - Subscription management
 * - One-time payments
 * - Checkout sessions
 * - Webhook handling
 * - Plan validation
 */

import { config, type PaymentMode, type StripePlan } from '@/config';
import { getStripeClient } from './stripe/client';
import type Stripe from 'stripe';

// Re-export types for convenience
export type { StripePlan, PaymentMode };

/**
 * Checkout session options
 */
export interface CheckoutOptions {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  mode: PaymentMode;
  metadata?: Record<string, string>;
}

/**
 * Get a plan by ID from config
 */
export function getPlanById(planId: string): StripePlan | undefined {
  return config.stripe.plans.find((plan) => plan.id === planId);
}

/**
 * Get all available plans
 */
export function getAllPlans(): StripePlan[] {
  return config.stripe.plans;
}

/**
 * Get plans filtered by payment mode
 */
export function getPlansByMode(mode: PaymentMode): StripePlan[] {
  return config.stripe.plans.filter((plan) => plan.mode === mode);
}

/**
 * Get subscription plans only
 */
export function getSubscriptionPlans(): StripePlan[] {
  return getPlansByMode('subscription');
}

/**
 * Get one-time payment plans only
 */
export function getOneTimePaymentPlans(): StripePlan[] {
  return getPlansByMode('payment');
}

/**
 * Check if a plan is a subscription
 */
export function isSubscriptionPlan(plan: StripePlan): boolean {
  return plan.mode === 'subscription';
}

/**
 * Check if a plan is a one-time payment
 */
export function isOneTimePaymentPlan(plan: StripePlan): boolean {
  return plan.mode === 'payment';
}

/**
 * Create a Stripe Checkout Session for existing customer
 * Supports both subscription and one-time payment modes
 */
export async function createCheckoutSession(
  customerId: string,
  options: CheckoutOptions
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();
  const { priceId, successUrl, cancelUrl, mode, metadata = {} } = options;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      priceId,
      paymentMode: mode,
      ...metadata,
    },
  });

  return session;
}

/**
 * Create a Checkout Session for new customers
 * Supports both subscription and one-time payment modes
 */
export async function createCheckoutSessionForNewCustomer(
  email: string,
  options: CheckoutOptions
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();
  const { priceId, successUrl, cancelUrl, mode, metadata = {} } = options;

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      priceId,
      paymentMode: mode,
      ...metadata,
    },
  });

  return session;
}

/**
 * Create a Checkout Session with plan object
 * Automatically uses the plan's payment mode
 */
export async function createCheckoutSessionForPlan(
  email: string,
  plan: StripePlan,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  return createCheckoutSessionForNewCustomer(email, {
    priceId: plan.priceId,
    mode: plan.mode,
    successUrl,
    cancelUrl,
    metadata: {
      planId: plan.id,
      ...metadata,
    },
  });
}

/**
 * Get customer by ID
 */
export async function getCustomer(
  customerId: string
): Promise<Stripe.Customer | null> {
  const stripe = getStripeClient();
  try {
    return await stripe.customers.retrieve(customerId) as Stripe.Customer;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    return null;
  }
}

/**
 * Get subscription by ID
 */
export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription | null> {
  const stripe = getStripeClient();
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    return null;
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  immediately: boolean = false
): Promise<Stripe.Subscription> {
  const stripe = getStripeClient();
  if (immediately) {
    return await stripe.subscriptions.cancel(subscriptionId);
  } else {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  const stripe = getStripeClient();
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
