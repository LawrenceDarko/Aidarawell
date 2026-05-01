/**
 * Resend Email Integration
 * 
 * Handles email sending using Resend with rate limiting for security.
 */

import { Resend } from 'resend';
import { config } from '@/config';
import { rateLimiters } from '@/libs/middleware/rate-limit';
import type { EmailOptions } from '../email';

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will be limited.');
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * Email sending limits per recipient
 */
const EMAIL_LIMITS = {
  points: 10, // 10 emails
  duration: 3600, // per hour
};

/**
 * Send email with rate limiting
 */
export async function sendEmail(options: EmailOptions): Promise<{ id: string } | null> {
  if (!resend) {
    console.error('Resend is not configured. Set RESEND_API_KEY in environment variables.');
    return null;
  }

  // Rate limiting per recipient
  const recipientId = options.to.toLowerCase();
  try {
    await rateLimiters.api.consume(`email:${recipientId}`, EMAIL_LIMITS.points);
  } catch (error) {
    console.error(`Rate limit exceeded for ${recipientId}`);
    throw new Error('Email rate limit exceeded. Please try again later.');
  }

  try {
    const result = await resend.emails.send({
      from: options.from || config.email.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      reply_to: options.replyTo || config.email.replyTo,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      throw new Error(result.error.message || 'Failed to send email');
    }

    return { id: result.data?.id || 'unknown' };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

/**
 * Send transactional email
 */
export async function sendTransactionalEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ id: string } | null> {
  return sendEmail({
    to,
    subject,
    html,
  });
}

export { resend };
