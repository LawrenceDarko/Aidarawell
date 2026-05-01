/**
 * Magic Link Email
 * 
 * Handles sending magic link emails for authentication.
 */

import { config } from '@/config';

export interface MagicLinkEmailOptions {
  email: string;
  callbackUrl: string;
  token?: string;
}

/**
 * Send magic link email
 * 
 * This function will be called by NextAuth's EmailProvider.
 * In a production environment, you would integrate with Resend or Mailgun here.
 */
export async function sendMagicLinkEmail(
  options: MagicLinkEmailOptions
): Promise<void> {
  const { email, callbackUrl, token } = options;

  // In production, implement actual email sending here
  // For now, this is a placeholder that NextAuth will handle
  // You can extend this to use Resend or Mailgun

  console.log(`[Magic Link] Sending to ${email}`);
  console.log(`[Magic Link] Callback URL: ${callbackUrl}`);
  if (token) {
    console.log(`[Magic Link] Token: ${token}`);
  }

  // TODO: Implement actual email sending with Resend or Mailgun
  // Example with Resend:
  // await resend.emails.send({
  //   from: config.email.from,
  //   to: email,
  //   subject: 'Sign in to ' + config.app.name,
  //   html: generateMagicLinkEmailHtml(callbackUrl, token),
  // });
}

/**
 * Generate magic link email HTML template
 */
export function generateMagicLinkEmailHtml(
  callbackUrl: string,
  token: string
): string {
  const magicLink = `${config.app.url}/api/auth/callback/email?token=${token}&email=${encodeURIComponent(callbackUrl)}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Sign in to ${config.app.name}</h1>
          <p>Click the button below to sign in to your account:</p>
          <a href="${magicLink}" 
             style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Sign In
          </a>
          <p style="color: #666; font-size: 14px;">
            Or copy and paste this link into your browser:<br>
            <a href="${magicLink}" style="color: #2563eb; word-break: break-all;">${magicLink}</a>
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This link will expire in 24 hours. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      </body>
    </html>
  `;
}
