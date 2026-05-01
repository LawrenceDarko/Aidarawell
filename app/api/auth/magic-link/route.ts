/**
 * Magic Link API Route
 * 
 * Handles magic link email authentication requests with rate limiting.
 */

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/libs/middleware/rate-limit';
import { sendMagicLinkEmail } from '@/libs/email/magic-link';
import { z } from 'zod';
import { withValidation } from '@/libs/validation/api';
import { applySecurityHeaders } from '@/libs/security/headers';

/**
 * Request body schema for magic link
 */
const magicLinkSchema = z.object({
  email: z.string().email('Invalid email address'),
  callbackUrl: z.string().url().optional(),
});

/**
 * POST /api/auth/magic-link
 * 
 * Sends a magic link email to the user
 */
export const POST = withValidation(
  {
    body: magicLinkSchema,
  },
  async (request, { body }) => {
    // Apply strict rate limiting for magic link requests
    const rateLimitResponse = await rateLimit(request, { type: 'magic-link' });
    if (rateLimitResponse) {
      return applySecurityHeaders(rateLimitResponse);
    }

    const { email, callbackUrl } = body;

    // Send magic link email
    await sendMagicLinkEmail({
      email,
      callbackUrl: callbackUrl || '/dashboard',
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Magic link sent to your email',
      },
      { status: 200 }
    );

    return applySecurityHeaders(response);
  }
);
