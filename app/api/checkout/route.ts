/**
 * Stripe Checkout API Route
 * 
 * Creates a Stripe checkout session for both subscriptions and one-time payments.
 * The payment mode is automatically determined from the plan configuration.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/libs/auth';
import { createCheckoutSessionForPlan, getPlanById } from '@/libs/stripe';
import { config } from '@/config';
import { z } from 'zod';
import { rateLimit } from '@/libs/middleware/rate-limit';
import { withValidation } from '@/libs/validation/api';
import { applySecurityHeaders } from '@/libs/security/headers';
import { AuthenticationError, NotFoundError } from '@/libs/errors';

const checkoutSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
});

/**
 * POST /api/checkout
 * 
 * Creates a Stripe checkout session.
 * Automatically handles both subscription and one-time payment modes
 * based on the plan's configuration.
 */
export const POST = withValidation(
  {
    body: checkoutSchema,
  },
  async (request, { body }) => {
    // Rate limiting
    const rateLimitResponse = await rateLimit(request, { type: 'api' });
    if (rateLimitResponse) {
      return applySecurityHeaders(rateLimitResponse);
    }

    // Get session
    const session = await getServerSession();
    if (!session?.user?.email) {
      throw new AuthenticationError('You must be signed in to create a checkout session');
    }

    const { planId } = body as z.infer<typeof checkoutSchema>;

    // Get plan from config
    const plan = getPlanById(planId);
    if (!plan) {
      throw new NotFoundError('Plan not found');
    }

    // Create checkout session using the plan's payment mode
    const checkoutSession = await createCheckoutSessionForPlan(
      session.user.email,
      plan,
      `${config.app.url}/dashboard?success=true&mode=${plan.mode}`,
      `${config.app.url}/pricing?canceled=true`
    );

    const response = NextResponse.json(
      {
        sessionId: checkoutSession.id,
        url: checkoutSession.url,
        mode: plan.mode,
      },
      { status: 200 }
    );

    return applySecurityHeaders(response);
  }
);
