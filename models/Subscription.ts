/**
 * Subscription Model
 * 
 * Represents a user's subscription to a plan.
 * Compatible with both MongoDB and Supabase.
 */

export type SubscriptionStatus = 
  | 'active' 
  | 'canceled' 
  | 'incomplete' 
  | 'incomplete_expired' 
  | 'past_due' 
  | 'trialing' 
  | 'unpaid';

export type SubscriptionInterval = 'month' | 'year';

/**
 * Subscription
 * 
 * Main subscription interface representing a user's subscription.
 */
export interface Subscription {
  id: string;
  userId: string;
  
  // Stripe information
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
  stripeCurrentPeriodStart: Date;
  
  // Plan information
  planId: string; // References config.stripe.plans[].id
  status: SubscriptionStatus;
  interval: SubscriptionInterval;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  canceledAt?: Date | null;
  
  // Cancellation information
  cancelAtPeriodEnd?: boolean;
}

/**
 * Subscription with Plan Details
 * 
 * Extended subscription with full plan information from config.
 */
export interface SubscriptionWithPlan extends Subscription {
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    features: string[];
  };
}
