/**
 * Stripe Webhook Handler
 * 
 * Handles Stripe webhook events for both subscriptions and one-time payments.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/libs/stripe';
import { headers } from 'next/headers';
import { applySecurityHeaders } from '@/libs/security/headers';
import Stripe from 'stripe';

/**
 * POST /api/webhooks/stripe
 * 
 * Handles Stripe webhook events for:
 * - Subscriptions (creation, updates, cancellations)
 * - One-time payments (checkout completed, payment success/failure)
 */
export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'STRIPE_WEBHOOK_SECRET is not set' },
        { status: 500 }
      );
    }

    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(body, signature as string, webhookSecret as string);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const paymentMode = session.metadata?.paymentMode || session.mode;
        
        console.log(`Checkout session completed (${paymentMode}):`, session.id);
        
        if (paymentMode === 'payment') {
          // One-time payment completed
          // TODO: Grant access to purchased product/service
          // TODO: Update user record with purchase info
          console.log('One-time payment completed for:', session.customer_email);
        } else {
          // Subscription checkout completed
          // TODO: Update user subscription in database
          console.log('Subscription started for:', session.customer_email);
        }
        break;
      }

      case 'payment_intent.succeeded': {
        // Handles successful one-time payments
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment intent succeeded:', paymentIntent.id);
        // TODO: Update purchase status in database
        break;
      }

      case 'payment_intent.payment_failed': {
        // Handles failed one-time payments
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment intent failed:', paymentIntent.id);
        // TODO: Handle failed payment, notify user
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);
        // TODO: Update subscription in database
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription canceled:', subscription.id);
        // TODO: Cancel subscription in database
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment succeeded:', invoice.id);
        // TODO: Update subscription status in database
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', invoice.id);
        // TODO: Handle failed payment, send notification
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    const response = NextResponse.json({ received: true }, { status: 200 });
    return applySecurityHeaders(response);
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
