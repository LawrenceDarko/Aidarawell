/**
 * Database Adapter Factory
 * 
 * Returns the Supabase database adapter based on environment configuration.
 * 
 * NOTE: This module should NOT be imported in Edge runtime (middleware).
 * Only import in API routes and Server Components.
 */

import { SupabaseAdapter } from '@auth/supabase-adapter';
import type { Adapter } from 'next-auth/adapters';

/**
 * Get the appropriate NextAuth adapter
 * 
 * NOTE: This function should only be called when an adapter is actually needed.
 */
export function getAdapter(): Adapter | undefined {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }) as Adapter;
  }

  return undefined;
}
