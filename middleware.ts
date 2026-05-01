/**
 * Next.js Middleware
 * 
 * Handles authentication and rate limiting at the edge.
 * 
 * NOTE: This middleware runs in Edge runtime. It should NOT import
 * any Node.js-only modules (MongoDB, nodemailer, etc.).
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isProtectedRoute } from '@/libs/auth/route-protection';

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Get token without importing full NextAuth config
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Check if route is protected
  if (isProtectedRoute(pathname)) {
    if (!token) {
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Rate limiting is handled in individual API routes
  // to avoid importing Node.js modules in Edge runtime

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
  // Use Node.js runtime instead of Edge to avoid MongoDB/nodemailer issues
  // Note: This means middleware runs on Node.js, not Edge
};
