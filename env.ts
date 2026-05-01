/**
 * Typed Environment Variables
 * 
 * Centralized, type-safe environment variable management.
 * Validates all environment variables at startup.
 */

import { z } from 'zod';

/**
 * Environment Variables Schema
 */
const envSchema = z.object({
  // NextAuth
  NEXTAUTH_SECRET: z.string().min(15, 'NEXTAUTH_SECRET must be at least 15 characters'),
  NEXTAUTH_URL: z.string().url().optional(),

  // Database - MongoDB
  MONGODB_URI: z.string().url().optional(),
  MONGODB_DB_NAME: z.string().optional(),

  // Database - Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Email - SMTP
  EMAIL_SERVER_HOST: z.string().optional(),
  EMAIL_SERVER_PORT: z.string().optional(),
  EMAIL_SERVER_USER: z.string().optional(),
  EMAIL_SERVER_PASSWORD: z.string().optional(),

  // Email - Resend
  RESEND_API_KEY: z.string().optional(),

  // App Configuration
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Jumpstart'),
  EMAIL_FROM: z.string().email().optional(),
  EMAIL_REPLY_TO: z.string().email().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_STARTER_PRICE_ID: z.string().optional(),
  STRIPE_PRO_PRICE_ID: z.string().optional(),
  STRIPE_ENTERPRISE_PRICE_ID: z.string().optional(),
  STRIPE_LIFETIME_PRICE_ID: z.string().optional(), // One-time payment plan

  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_ENABLED: z.string().optional(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Validate and parse environment variables
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err: z.ZodIssue) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
}

/**
 * Validated environment variables
 */
export const env = validateEnv();

/**
 * Type-safe environment variable getters
 */
export const getEnv = {
  // NextAuth
  nextAuthSecret: () => env.NEXTAUTH_SECRET,
  nextAuthUrl: () => env.NEXTAUTH_URL || env.NEXT_PUBLIC_APP_URL,

  // Database
  mongodbUri: () => env.MONGODB_URI,
  mongodbDbName: () => env.MONGODB_DB_NAME || 'jumpstart',
  supabaseUrl: () => env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: () => env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: () => env.SUPABASE_SERVICE_ROLE_KEY,

  // OAuth
  googleClientId: () => env.GOOGLE_CLIENT_ID,
  googleClientSecret: () => env.GOOGLE_CLIENT_SECRET,

  // Email
  emailServerHost: () => env.EMAIL_SERVER_HOST,
  emailServerPort: () => (env.EMAIL_SERVER_PORT ? parseInt(env.EMAIL_SERVER_PORT, 10) : 587),
  emailServerUser: () => env.EMAIL_SERVER_USER,
  emailServerPassword: () => env.EMAIL_SERVER_PASSWORD,
  resendApiKey: () => env.RESEND_API_KEY,

  // App
  appUrl: () => env.NEXT_PUBLIC_APP_URL,
  appName: () => env.NEXT_PUBLIC_APP_NAME,
  emailFrom: () => env.EMAIL_FROM || `noreply@${new URL(env.NEXT_PUBLIC_APP_URL).hostname}`,
  emailReplyTo: () => env.EMAIL_REPLY_TO || `support@${new URL(env.NEXT_PUBLIC_APP_URL).hostname}`,

  // Stripe
  stripeSecretKey: () => env.STRIPE_SECRET_KEY,
  stripePublishableKey: () => env.STRIPE_PUBLISHABLE_KEY,
  stripeWebhookSecret: () => env.STRIPE_WEBHOOK_SECRET,
  stripePriceIds: () => ({
    starter: env.STRIPE_STARTER_PRICE_ID,
    pro: env.STRIPE_PRO_PRICE_ID,
    enterprise: env.STRIPE_ENTERPRISE_PRICE_ID,
  }),

  // Analytics
  gaId: () => env.NEXT_PUBLIC_GA_ID,
  analyticsEnabled: () => env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',

  // Environment
  nodeEnv: () => env.NODE_ENV,
  isDevelopment: () => env.NODE_ENV === 'development',
  isProduction: () => env.NODE_ENV === 'production',
  isTest: () => env.NODE_ENV === 'test',
};

/**
 * Check if required environment variables are set
 */
export function validateRequiredEnv() {
  const required = {
    nextAuth: env.NEXTAUTH_SECRET,
    database: env.MONGODB_URI || env.NEXT_PUBLIC_SUPABASE_URL,
  };

  const missing: string[] = [];

  if (!required.nextAuth) {
    missing.push('NEXTAUTH_SECRET');
  }

  if (!required.database) {
    missing.push('MONGODB_URI or NEXT_PUBLIC_SUPABASE_URL');
  }

  if (missing.length > 0) {
    console.warn(`⚠️  Missing recommended environment variables: ${missing.join(', ')}`);
  }

  return missing.length === 0;
}
