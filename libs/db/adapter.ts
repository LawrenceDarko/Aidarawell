/**
 * Database Adapter Factory
 * 
 * Returns the appropriate database adapter based on environment configuration.
 * Supports both MongoDB and Supabase.
 * 
 * NOTE: This module should NOT be imported in Edge runtime (middleware).
 * Only import in API routes and Server Components.
 */

import type { Adapter } from 'next-auth/adapters';
import { SupabaseAdapter } from '@auth/supabase-adapter';

/**
 * Get the appropriate NextAuth adapter
 * 
 * Priority: MongoDB if MONGODB_URI is set, otherwise Supabase
 * 
 * NOTE: This function should only be called when an adapter is actually needed.
 * It will throw an error if neither database is configured.
 * MongoDB connection is lazy-loaded to avoid errors when not configured.
 */
export function getAdapter(): Adapter {
  // Check Supabase first (since it's already imported and doesn't require lazy loading)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }) as Adapter;
  }

  // Check MongoDB (lazy load to avoid errors if not configured)
  if (process.env.MONGODB_URI) {
    try {
      // Dynamically import MongoDB adapter and client to avoid loading if not needed
      // Use require for synchronous loading (NextAuth expects sync adapter)
      const { MongoDBAdapter } = require('@next-auth/mongodb-adapter');
      const getClientPromise = require('./mongodb').default;
      // getClientPromise is a function that returns Promise<MongoClient>
      const clientPromise = getClientPromise();
      return MongoDBAdapter(clientPromise) as Adapter;
    } catch (error) {
      // If MongoDB import fails, fall through to error message
      console.error('Failed to load MongoDB adapter:', error);
    }
  }

  // Neither database configured
  throw new Error(
    'Please configure either MONGODB_URI or NEXT_PUBLIC_SUPABASE_URL in .env.local. ' +
    'Currently, MONGODB_URI is ' + (process.env.MONGODB_URI ? 'set' : 'not set') + 
    ' and NEXT_PUBLIC_SUPABASE_URL is ' + (process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'not set') + '.'
  );
}
