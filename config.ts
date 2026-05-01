/**
 * Global Configuration Backbone
 * 
 * This file serves as the single source of truth for all application configuration.
 * All SEO, pricing, auth, and feature flags should reference this file.
 * 
 * Type safety is enforced through the AppConfig interface, ensuring consistency
 * across the entire application.
 */

/**
 * Payment Mode
 * 
 * Defines whether a plan is a one-time payment or a recurring subscription.
 * - 'payment': One-time purchase (e.g., lifetime access, single product)
 * - 'subscription': Recurring billing (e.g., monthly/yearly plans)
 */
export type PaymentMode = 'payment' | 'subscription';

/**
 * Stripe Plan Configuration
 * 
 * Represents a plan with pricing and feature information.
 * The priceId should match your Stripe Price ID from the Stripe Dashboard.
 * 
 * @property mode - 'payment' for one-time, 'subscription' for recurring
 * @property interval - Only applicable for subscription mode
 */
export interface StripePlan {
  id: string;
  name: string;
  priceId: string;
  features: string[];
  price: number;
  currency: string;
  mode: PaymentMode;
  interval?: 'month' | 'year';
  popular?: boolean;
}

/**
 * Application Configuration Interface
 * 
 * This interface ensures type safety for all configuration values
 * used throughout the application.
 */
export interface AppConfig {
  app: {
    name: string;
    description: string;
    url: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  stripe: {
    plans: StripePlan[];
    /** Default payment mode for new plans */
    defaultMode: PaymentMode;
  };
  auth: {
    protectedRoutes: string[];
    callbackUrl: string;
  };
  email: {
    from: string;
    replyTo: string;
  };
  theme: {
    darkMode: boolean;
  };
}

export const config: AppConfig = {
  app: {
    name: 'AidaraWell',
    description: 'Professional home care for seniors in Fargo, ND. Personal care, companionship, and transportation.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  seo: {
    title: 'Home Care in Fargo, ND | AidaraWell | Senior Care Services',
    description: 'Compassionate home care services in Fargo and Cass County. Personal care, companionship, transportation, and homemaking for seniors.',
    keywords: [
      'home care Fargo ND',
      'senior home care Fargo',
      'elderly transportation Fargo',
      'in home care Cass County',
      'senior care Horace ND',
      'home health care North Dakota',
    ],
    ogImage: '/og-image.png',
  },
  stripe: {
    defaultMode: 'subscription',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3',
        ],
        price: 9.99,
        currency: 'USD',
        mode: 'subscription',
        interval: 'month',
        popular: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        priceId: process.env.STRIPE_PRO_PRICE_ID || '',
        features: [
          'All Starter features',
          'Feature 4',
          'Feature 5',
          'Feature 6',
        ],
        price: 29.99,
        currency: 'USD',
        mode: 'subscription',
        interval: 'month',
        popular: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
        features: [
          'All Pro features',
          'Feature 7',
          'Feature 8',
          'Priority Support',
        ],
        price: 99.99,
        currency: 'USD',
        mode: 'subscription',
        interval: 'month',
        popular: false,
      },
      // Example one-time payment plan (uncomment to use)
      // {
      //   id: 'lifetime',
      //   name: 'Lifetime Access',
      //   priceId: process.env.STRIPE_LIFETIME_PRICE_ID || '',
      //   features: [
      //     'All Pro features',
      //     'Lifetime updates',
      //     'Priority Support',
      //     'One-time payment',
      //   ],
      //   price: 299.99,
      //   currency: 'USD',
      //   mode: 'payment',
      //   popular: false,
      // },
    ],
  },
  auth: {
    protectedRoutes: ['/dashboard', '/settings', '/billing'],
    callbackUrl: '/dashboard',
  },
  email: {
    from: process.env.EMAIL_FROM || 'noreply@aidarawell.com',
    replyTo: process.env.EMAIL_REPLY_TO || 'leads@aidarawell.com',
  },
  theme: {
    darkMode: process.env.NEXT_PUBLIC_DARK_MODE === 'true' || false,
  },
};
