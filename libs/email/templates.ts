/**
 * Email Templates
 * 
 * Typed email templates for transactional emails.
 */

import { config } from '@/config';

export interface WelcomeEmailData {
  name: string;
  loginUrl: string;
}

export interface MagicLinkEmailData {
  email: string;
  magicLink: string;
  expiresIn: string;
}

export interface PasswordResetEmailData {
  name: string;
  resetLink: string;
  expiresIn: string;
}

export interface InvoiceEmailData {
  name: string;
  amount: string;
  invoiceUrl: string;
  dueDate: string;
}

/**
 * Generate welcome email HTML
 */
export function generateWelcomeEmail(data: WelcomeEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Welcome to ${config.app.name}!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hi ${data.name},</p>
          <p>Thank you for signing up for ${config.app.name}! We're excited to have you on board.</p>
          <p>You can now access your account and start using all our features.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.loginUrl}" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
          </div>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>The ${config.app.name} Team</p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate magic link email HTML
 */
export function generateMagicLinkEmail(data: MagicLinkEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Sign in to ${config.app.name}</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Click the button below to sign in to your account:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.magicLink}" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Sign In</a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This link will expire in ${data.expiresIn}. If you didn't request this, you can safely ignore this email.
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Or copy and paste this link into your browser:<br>
            <a href="${data.magicLink}" style="color: #667eea; word-break: break-all;">${data.magicLink}</a>
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate password reset email HTML
 */
export function generatePasswordResetEmail(data: PasswordResetEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Reset Your Password</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hi ${data.name},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetLink}" style="display: inline-block; padding: 12px 30px; background: #f5576c; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This link will expire in ${data.expiresIn}. If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate invoice email HTML
 */
export function generateInvoiceEmail(data: InvoiceEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Invoice from ${config.app.name}</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hi ${data.name},</p>
          <p>Your invoice is ready for review.</p>
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Amount:</strong> ${data.amount}</p>
            <p style="margin: 10px 0 0 0;"><strong>Due Date:</strong> ${data.dueDate}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.invoiceUrl}" style="display: inline-block; padding: 12px 30px; background: #4facfe; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Invoice</a>
          </div>
          <p>Thank you for your business!</p>
        </div>
      </body>
    </html>
  `;
}
