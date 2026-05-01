/**
 * Authentication Helpers
 * 
 * This module provides authentication utilities including:
 * - Session management
 * - Route protection
 * - User validation
 */

import { config } from '@/config';

/**
 * Check if a route is protected
 * 
 * Re-exported from route-protection for backward compatibility.
 * For Edge runtime (middleware), use the route-protection module directly.
 */
export { isProtectedRoute, getCallbackUrl } from './auth/route-protection';

/**
 * Get NextAuth configuration
 */
export { authOptions } from './auth/next-auth';

/**
 * Get server session
 * 
 * Use this in Server Components and API routes to get the current session.
 */
export async function getServerSession() {
  const { getServerSession: getSession } = await import('next-auth/next');
  return getSession(authOptions);
}
