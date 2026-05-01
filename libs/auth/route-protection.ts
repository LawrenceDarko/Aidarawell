/**
 * Route Protection Utilities
 * 
 * Edge-compatible route protection helpers.
 * This file must NOT import any Node.js-only modules.
 */

import { config } from '@/config';

/**
 * Check if a route is protected
 * 
 * Edge-compatible version that doesn't import database or auth modules.
 */
export function isProtectedRoute(pathname: string): boolean {
  return config.auth.protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
}

/**
 * Get the callback URL for authentication
 */
export function getCallbackUrl(): string {
  return config.auth.callbackUrl;
}
