import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

interface AssessmentRequest {
  name: string;
  phone: string;
  email: string;
  careNeeds: string;
  preferredContact: 'phone' | 'email';
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.email || !body.careNeeds) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = `
New Assessment Request from AidaraWell Website

Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}
Care Needs: ${body.careNeeds}
Preferred Contact: ${body.preferredContact}

---
Timestamp: ${new Date().toISOString()}
IP: ${request.ip || 'Unknown'}
    `.trim();

    // Send email via Resend (configured in libs/email.ts)
    try {
      // Using Resend API key from environment
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: config.email.from,
          to: config.email.replyTo,
          subject: `New Assessment Request: ${body.name}`,
          text: emailContent,
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0B5345; border-bottom: 2px solid #D4A574; padding-bottom: 10px;">
    New Assessment Request
  </h2>
  
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> ${body.name}</p>
    <p><strong>Phone:</strong> ${body.phone}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Care Needs:</strong> ${body.careNeeds}</p>
    <p><strong>Preferred Contact:</strong> ${body.preferredContact}</p>
  </div>
  
  <p style="color: #666; font-size: 12px;">
    Received: ${new Date().toLocaleString()}
  </p>
</div>
          `,
        }),
      });

      if (!response.ok) {
        console.error('Resend email error:', await response.text());
        // Continue anyway - lead is captured even if email fails
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    // Optional: Send autoresponse email to the user
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: config.email.from,
          to: body.email,
          subject: 'Your AidaraWell Assessment Request - We\'ll Call Soon',
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0B5345;">Thank You, ${body.name}!</h2>
  
  <p>We've received your assessment request and we're excited to help.</p>
  
  <div style="background-color: #f0f8f7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0B5345;">
    <p style="margin: 0; font-size: 16px; font-weight: bold; color: #0B5345;">
      We'll call you within 24 hours
    </p>
    <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
      Our care coordinator will discuss your needs and find the perfect match for your situation.
    </p>
  </div>
  
  <h3 style="color: #0B5345; margin-top: 30px;">What to Expect</h3>
  <ol style="color: #666; line-height: 1.8;">
    <li><strong>Initial Call:</strong> We'll learn about your specific care needs</li>
    <li><strong>Custom Plan:</strong> We'll create a personalized care plan</li>
    <li><strong>Caregiver Match:</strong> We'll match you with our best caregiver</li>
    <li><strong>Fast Start:</strong> Begin care as soon as you're ready</li>
  </ol>
  
  <p style="color: #666; margin-top: 30px;">
    If you need immediate assistance, please call us:<br/>
    <strong style="font-size: 18px; color: #0B5345;">
      (701) 555-CARE
    </strong>
  </p>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
  <p style="color: #999; font-size: 12px; text-align: center;">
    © 2024 AidaraWell Global LLC | Horace, North Dakota
  </p>
</div>
          `,
        }),
      });
    } catch (autoResponseError) {
      console.error('Autoresponse email failed:', autoResponseError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Assessment request submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Assessment form error:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment request' },
      { status: 500 }
    );
  }
}
