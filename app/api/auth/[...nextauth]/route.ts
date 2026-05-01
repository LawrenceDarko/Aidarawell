/**
 * NextAuth API Route Handler
 * 
 * Handles all NextAuth authentication requests including:
 * - Google OAuth
 * - Magic Link (Email) authentication
 * - Session management
 * 
 * Note: Rate limiting is handled at the middleware level for better performance.
 */

import NextAuth from 'next-auth';
import { authOptions } from '@/libs/auth/next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
