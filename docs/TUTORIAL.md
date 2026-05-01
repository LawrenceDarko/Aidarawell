# 🎓 Tutorial: Launch in 5 Minutes

This tutorial will guide you through building your first feature with Jumpstart. You'll learn the core workflows and patterns while creating a functional subscription system.

---

## 📚 What You'll Build

By the end of this tutorial, you'll have:

- ✅ A working landing page with pricing
- ✅ Google OAuth authentication
- ✅ Stripe subscription checkout
- ✅ Protected dashboard route
- ✅ User profile display

**Time Required**: ~5 minutes for experienced developers, ~15 for beginners

---

## 🎯 Tutorial Path

### Phase 1: Landing Page (2 minutes)
### Phase 2: Authentication (1 minute)
### Phase 3: Payments (2 minutes)

---

## Phase 1: Creating Your Landing Page

### Step 1.1: Customize Your Branding

Open `config.ts` and update your app information:

```typescript
export const config: AppConfig = {
  app: {
    name: 'MyAwesomeApp',  // ← Change this
    description: 'The best app for [your niche]',  // ← And this
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  seo: {
    title: 'MyAwesomeApp - Solve [Problem]',  // ← Update SEO
    description: 'Help [target audience] achieve [benefit]',
    keywords: ['your', 'relevant', 'keywords'],
  },
  // ... rest of config
};
```

> **💡 Pro Tip**: This is the **only file** you need to edit for branding. The changes will cascade throughout your entire app.

### Step 1.2: Configure Your Pricing Plans

Still in `config.ts`, define your Stripe plans:

```typescript
stripe: {
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      priceId: process.env.STRIPE_BASIC_PRICE_ID || '',
      features: [
        '10 projects per month',
        'Basic analytics',
        'Email support',
      ],
      price: 9,
      currency: 'USD',
      interval: 'month',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      priceId: process.env.STRIPE_PRO_PRICE_ID || '',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'API access',
      ],
      price: 29,
      currency: 'USD',
      interval: 'month',
      popular: true,  // ← This adds a "Popular" badge
    },
  ],
},
```

### Step 1.3: View Your Landing Page

Start your dev server if not already running:

```bash
npm run dev
```

Visit **http://localhost:3000** and you'll see:

- ✅ Hero section with your app name
- ✅ Pricing table with your plans
- ✅ FAQ section
- ✅ Call-to-action buttons

**That's it!** Your landing page is live. All components automatically read from `config.ts`.

---

## Phase 2: Setting Up Authentication

### Step 2.1: Create Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Copy your **Client ID** and **Client Secret**

### Step 2.2: Configure Environment Variables

Open `.env.local` and add:

```bash
# Generate a secure secret (minimum 15 characters)
NEXTAUTH_SECRET=your-super-secret-key-minimum-15-characters

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000
```

> **⚠️ SECURITY**: Generate a strong `NEXTAUTH_SECRET` using:
> ```bash
> openssl rand -base64 32
> ```

### Step 2.3: Test Authentication

1. Click **"Sign In"** in the header
2. Choose **"Sign in with Google"**
3. Complete Google authentication
4. You'll be redirected back to your app as authenticated

**Magic Links** are also enabled by default! Users can enter their email and receive a sign-in link.

---

## Phase 3: Enabling Payments

### Step 3.1: Set Up Stripe

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your **test mode** API keys from the Dashboard
3. Create **Products** and **Prices** in Stripe Dashboard:
   - Product: "Basic Plan" → Monthly price: $9
   - Product: "Pro Plan" → Monthly price: $29

### Step 3.2: Configure Stripe Keys

Add to `.env.local`:

```bash
# Stripe Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_51ABC...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...

# Price IDs from Stripe Dashboard
STRIPE_BASIC_PRICE_ID=price_1ABC...
STRIPE_PRO_PRICE_ID=price_1DEF...

# Webhook Secret (we'll set this up next)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 3.3: Test Checkout Flow

1. Go to **http://localhost:3000**
2. Click **"Get Started"** on any pricing plan
3. You'll be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any CVC
5. Complete checkout

**You just created a subscription!** 🎉

### Step 3.4: Set Up Stripe Webhooks (Local Testing)

Stripe uses webhooks to notify your app about subscription changes. For local testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret that appears and add to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_abc123...
```

Now your local app will receive real-time webhook events!

---

## 🎯 Testing Your Complete Flow

### End-to-End Test

1. **Visit homepage** → See pricing plans
2. **Click "Get Started"** → Redirected to sign in
3. **Sign in with Google** → Authenticated
4. **Redirected to checkout** → Stripe payment page
5. **Complete payment** → Subscription created
6. **Webhook fires** → Database updated
7. **Redirected to dashboard** → See subscription status

---

## 🔐 Protecting Routes

### Making a Route Protected

Want to require authentication for a page? Add it to `config.ts`:

```typescript
auth: {
  protectedRoutes: [
    '/dashboard',
    '/settings',
    '/billing',  // ← Add your route
  ],
  callbackUrl: '/dashboard',
},
```

That's it! The middleware will automatically redirect unauthenticated users to the sign-in page.

### Create a Protected Dashboard

Create `app/dashboard/page.tsx`:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {session.user?.name}!
      </h1>
      <p className="text-gray-600">
        Email: {session.user?.email}
      </p>
    </div>
  );
}
```

---

## 📧 Sending Emails

### Magic Link Example

The magic link flow is already built! Here's how it works:

1. User enters email on sign-in page
2. API route validates and creates token
3. Email sent with secure link
4. User clicks link → Authenticated

To customize the email template, edit `libs/email/templates.ts`:

```typescript
export const magicLinkTemplate = (url: string, appName: string) => ({
  subject: `Sign in to ${appName}`,
  html: `
    <h1>Welcome back!</h1>
    <p>Click the button below to sign in:</p>
    <a href="${url}" style="...">Sign In</a>
    <p>This link expires in 24 hours.</p>
  `,
});
```

### Rate Limiting Protection

Magic link sending is **rate-limited** to prevent abuse:

- Max 3 requests per 15 minutes per IP
- Max 5 requests per hour per email

This is configured in `libs/middleware/rate-limit.ts`.

---

## 🎨 Customizing UI Components

### Example: Customize the Hero Section

Edit `components/marketing/Hero.tsx`:

```typescript
import { config } from '@/config';
import { Button } from '@/components/elements/Button';

export const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          {config.app.name} {/* ← Reads from config */}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {config.app.description}
        </p>
        <Button href="/api/auth/signin">
          Get Started Free
        </Button>
      </div>
    </section>
  );
};
```

All marketing components follow this pattern:
- Read configuration from `config.ts`
- Use typed props interfaces
- Fully responsive with Tailwind

---

## 🔧 Common Customizations

### 1. Add a New Pricing Plan

**File**: `config.ts`

```typescript
stripe: {
  plans: [
    // ... existing plans
    {
      id: 'enterprise',
      name: 'Enterprise',
      priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
      ],
      price: 99,
      currency: 'USD',
      interval: 'month',
      popular: false,
    },
  ],
},
```

### 2. Change Color Scheme

**File**: `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... your brand colors
        900: '#1e3a8a',
      },
    },
  },
},
```

### 3. Add Custom SEO per Page

**File**: `app/about/page.tsx`

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | MyAwesomeApp',
  description: 'Learn about our mission and team',
};

export default function AboutPage() {
  // Your page content
}
```

---

## 🐛 Troubleshooting Common Issues

### Issue: "Invalid NEXTAUTH_SECRET"

**Solution**: Ensure `NEXTAUTH_SECRET` is at least 15 characters.

```bash
# Generate a new one
openssl rand -base64 32
```

### Issue: Stripe checkout redirects to error

**Solution**: Check that:
1. `STRIPE_SECRET_KEY` starts with `sk_test_`
2. Price IDs match your Stripe Dashboard
3. Success/cancel URLs are correct

### Issue: Magic link emails not sending

**Solution**: Verify:
1. `RESEND_API_KEY` is set correctly
2. Email "from" address is verified in Resend
3. Check rate limit hasn't been hit

### Issue: Protected routes not working

**Solution**: 
1. Ensure route is listed in `config.ts` → `auth.protectedRoutes`
2. Restart dev server after config changes
3. Check middleware is running (logs in terminal)

---

## ✅ What You've Accomplished

Congratulations! You now have:

- ✅ A fully branded landing page
- ✅ Working authentication (Google + Magic Links)
- ✅ Stripe subscription payments
- ✅ Protected routes
- ✅ Webhook handling
- ✅ Email system with rate limiting

---

## 🚀 Next Steps

### Level Up Your App

1. **Add a Feature**: [API Reference](./REFERENCE.md) for all components
2. **Customize Design**: Explore Tailwind utilities
3. **Add Analytics**: Configure Google Analytics
4. **Deploy**: [Deployment Guide](../DEPLOYMENT.md)

### Advanced Topics

- **Database Models**: Extend User and Subscription models
- **Email Templates**: Create custom transactional emails
- **API Routes**: Build custom endpoints with validation
- **Webhooks**: Handle more Stripe events
- **Testing**: Add unit and integration tests

---

## 💡 Pro Tips

> **Tip #1**: Always edit `config.ts` first before creating new components. It's your app's blueprint.

> **Tip #2**: Use TypeScript strictly. If it compiles, it usually works.

> **Tip #3**: Test with Stripe test mode before going live. Never use production keys in development.

> **Tip #4**: Git commit frequently. Small, atomic commits save debugging time.

> **Tip #5**: Read the [API Reference](./REFERENCE.md) to discover all available components and utilities.

---

**Ready to ship? Check out the [Deployment Guide](../DEPLOYMENT.md)!** 🚢
