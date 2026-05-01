/**
 * Email Integration
 * 
 * This module handles email sending using Resend or Mailgun.
 * Includes typed email templates and sending limits for security.
 */

import { config } from '@/config';
import { sendEmail, sendTransactionalEmail } from './email/resend';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

/**
 * Get default email sender
 */
export function getDefaultSender(): string {
  return config.email.from;
}

/**
 * Get default reply-to address
 */
export function getDefaultReplyTo(): string {
  return config.email.replyTo;
}

/**
 * Send email (exports from resend module)
 */
export { sendEmail, sendTransactionalEmail };
