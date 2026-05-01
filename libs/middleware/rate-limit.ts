/**
 * Rate Limiting Middleware
 * 
 * Provides typed rate limiting for API routes and Magic Link requests.
 * Uses rate-limiter-flexible for production-grade rate limiting.
 */

import { RateLimiterMemory, RateLimiterRedis, IRateLimiterOptions } from 'rate-limiter-flexible';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate Limiter Configuration
 */
interface RateLimitConfig {
  points: number; // Number of requests
  duration: number; // Per duration in seconds
}

/**
 * Rate Limiter Types
 */
export type RateLimiterType = 'api' | 'magic-link' | 'auth';

/**
 * Rate Limiter Instances
 * 
 * Configured for different use cases:
 * - API: General API rate limiting
 * - Magic Link: Stricter limits for email authentication
 * - Auth: Authentication endpoints
 */
export const rateLimiters: Record<RateLimiterType, RateLimiterMemory> = {
  api: new RateLimiterMemory({
    points: 100, // 100 requests
    duration: 60, // per 60 seconds
  }),
  'magic-link': new RateLimiterMemory({
    points: 3, // 3 requests
    duration: 300, // per 5 minutes
  }),
  auth: new RateLimiterMemory({
    points: 10, // 10 requests
    duration: 60, // per 60 seconds
  }),
};

/**
 * Get client identifier from request
 */
function getClientId(request: NextRequest): string {
  // Try to get IP from various headers (for proxy/load balancer scenarios)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';

  // In production, you might want to use a combination of IP + user agent
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent}`;
}

/**
 * Rate Limit Error Response
 */
export class RateLimitError extends Error {
  constructor(
    public readonly retryAfter: number,
    message: string = 'Too many requests'
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

/**
 * Rate Limit Options
 */
export interface RateLimitOptions {
  type: RateLimiterType;
  customConfig?: Partial<IRateLimiterOptions>;
}

/**
 * Rate limit middleware for Next.js API routes
 * 
 * @param request - Next.js request object
 * @param options - Rate limit configuration
 * @returns NextResponse with rate limit headers or null if allowed
 */
export async function rateLimit(
  request: NextRequest,
  options: RateLimitOptions
): Promise<NextResponse | null> {
  const { type, customConfig } = options;
  const limiter = rateLimiters[type];

  // Apply custom config if provided
  if (customConfig) {
    Object.assign(limiter, customConfig);
  }

  const clientId = getClientId(request);

  try {
    await limiter.consume(clientId);
    return null; // Request allowed
  } catch (rejRes: unknown) {
    const rateLimitRes = rejRes as {
      msBeforeNext?: number;
      remainingPoints?: number;
      totalHits?: number;
    };

    const retryAfter = Math.ceil((rateLimitRes.msBeforeNext || 0) / 1000);

    return NextResponse.json(
      {
        error: 'Too many requests',
        message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': limiter.points.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(
            Date.now() + retryAfter * 1000
          ).toISOString(),
        },
      }
    );
  }
}

/**
 * Create a rate-limited API route handler wrapper
 * 
 * @example
 * ```ts
 * export async function POST(request: NextRequest) {
 *   const rateLimitResponse = await rateLimit(request, { type: 'api' });
 *   if (rateLimitResponse) return rateLimitResponse;
 *   // Your handler logic
 * }
 * ```
 */
export function withRateLimit<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T,
  options: RateLimitOptions
): T {
  return (async (...args: Parameters<T>) => {
    const request = args[0] as NextRequest;
    const rateLimitResponse = await rateLimit(request, options);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    return handler(...args);
  }) as T;
}
