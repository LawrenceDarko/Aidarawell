# 📖 API Reference

Complete technical reference for all components, utilities, and APIs in Jumpstart.

---

## Table of Contents

1. [Configuration](#configuration)
2. [Components](#components)
   - [Marketing Components](#marketing-components)
   - [Navigation Components](#navigation-components)
   - [UI Elements](#ui-elements)
   - [Social Proof Components](#social-proof-components)
3. [Libraries & Utilities](#libraries--utilities)
   - [Authentication](#authentication)
   - [Payments (Stripe)](#payments-stripe)
   - [Email](#email)
   - [Database](#database)
   - [Validation](#validation)
   - [Security](#security)
4. [API Routes](#api-routes)
5. [Database Models](#database-models)
6. [Environment Variables](#environment-variables)

---

## Configuration

### `config.ts` - Application Configuration

The single source of truth for all app settings.

#### Interface: `AppConfig`

```typescript
interface AppConfig {
  app: {
    name: string;
    description: string;
    url: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  stripe: {
    plans: StripePlan[];
  };
  auth: {
    protectedRoutes: string[];
    callbackUrl: string;
  };
  email: {
    from: string;
    replyTo: string;
  };
}
```

#### Interface: `StripePlan`

```typescript
interface StripePlan {
  id: string;                    // Unique plan identifier
  name: string;                  // Display name
  priceId: string;               // Stripe Price ID
  features: string[];            // List of features
  price: number;                 // Price amount
  currency: string;              // Currency code (USD, EUR, etc.)
  interval?: 'month' | 'year';   // Billing interval
  popular?: boolean;             // Show "Popular" badge
}
```

#### Usage

```typescript
import { config } from '@/config';

// Access app info
console.log(config.app.name);

// Get pricing plans
const plans = config.stripe.plans;

// Check if route is protected
const isProtected = config.auth.protectedRoutes.includes('/dashboard');
```

---

## Components

All components are TypeScript-first with strongly-typed props.

### Marketing Components

#### `<Hero />`

**Location**: `components/marketing/Hero.tsx`

Large hero section for landing pages with headline, description, and CTA.

**Props**: None (reads from `config.ts`)

**Usage**:

```typescript
import { Hero } from '@/components/marketing/Hero';

export default function HomePage() {
  return <Hero />;
}
```

**Features**:
- Responsive design
- Auto-reads app name and description from config
- Built-in CTA button

---

#### `<PricingTable />`

**Location**: `components/marketing/PricingTable.tsx`

Displays pricing plans in a responsive grid with feature lists.

**Props**:

```typescript
interface PricingTableProps {
  plans?: StripePlan[];  // Optional: override default plans
  highlightPopular?: boolean;  // Default: true
}
```

**Usage**:

```typescript
import { PricingTable } from '@/components/marketing/PricingTable';

// Use default plans from config
<PricingTable />

// Or provide custom plans
<PricingTable plans={customPlans} />
```

**Features**:
- Automatically renders all plans from `config.ts`
- "Popular" badge on featured plans
- Integrated checkout buttons
- Responsive 3-column grid (mobile: 1 column)

---

#### `<FAQ />`

**Location**: `components/marketing/FAQ.tsx`

Accordion-style FAQ section.

**Props**:

```typescript
interface FAQProps {
  items: {
    question: string;
    answer: string;
  }[];
}
```

**Usage**:

```typescript
import { FAQ } from '@/components/marketing/FAQ';

const faqs = [
  {
    question: 'How does billing work?',
    answer: 'We bill monthly based on your selected plan.',
  },
  // ... more FAQs
];

<FAQ items={faqs} />
```

---

#### `<Testimonials />`

**Location**: `components/marketing/Testimonials.tsx`

Social proof section with customer testimonials.

**Props**:

```typescript
interface TestimonialsProps {
  testimonials: {
    name: string;
    role?: string;
    company?: string;
    image?: string;
    quote: string;
    rating?: number;  // 1-5
  }[];
  variant?: 'grid' | 'single' | 'triple';  // Default: 'grid'
}
```

**Usage**:

```typescript
import { Testimonials } from '@/components/marketing/Testimonials';

const testimonials = [
  {
    name: 'Jane Doe',
    role: 'CEO',
    company: 'TechCorp',
    quote: 'This product changed our business!',
    rating: 5,
  },
];

<Testimonials testimonials={testimonials} variant="grid" />
```

**Variants**:
- `grid`: 3-column responsive grid
- `single`: One large featured testimonial
- `triple`: 3 testimonials side-by-side

---

#### `<CTA />`

**Location**: `components/marketing/CTA.tsx`

Call-to-action section for conversions.

**Props**:

```typescript
interface CTAProps {
  title: string;
  description?: string;
  buttonText?: string;  // Default: 'Get Started'
  buttonHref?: string;  // Default: '/api/auth/signin'
  variant?: 'centered' | 'split';  // Default: 'centered'
}
```

**Usage**:

```typescript
import { CTA } from '@/components/marketing/CTA';

<CTA 
  title="Ready to get started?"
  description="Join thousands of happy customers"
  buttonText="Start Free Trial"
/>
```

---

### Navigation Components

#### `<Header />`

**Location**: `components/navigation/Header.tsx`

Main navigation bar with authentication state.

**Props**: None (session-aware)

**Usage**:

```typescript
import { Header } from '@/components/navigation/Header';

// In layout.tsx
<Header />
```

**Features**:
- Shows "Sign In" for unauthenticated users
- Shows user menu for authenticated users
- Responsive mobile menu
- Sticky positioning

---

#### `<Footer />`

**Location**: `components/navigation/Footer.tsx`

Footer with links and copyright.

**Props**:

```typescript
interface FooterProps {
  links?: {
    label: string;
    href: string;
  }[];
}
```

**Usage**:

```typescript
import { Footer } from '@/components/navigation/Footer';

<Footer links={[
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]} />
```

---

### UI Elements

#### `<Button />`

**Location**: `components/elements/Button.tsx`

Primary button component.

**Props**:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;  // Renders as link if provided
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;  // Additional Tailwind classes
}
```

**Usage**:

```typescript
import { Button } from '@/components/elements/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>

// As a link
<Button href="/dashboard" variant="outline">
  Go to Dashboard
</Button>
```

---

#### `<GradientButton />`

**Location**: `components/elements/GradientButton.tsx`

Eye-catching button with gradient background.

**Props**: Same as `<Button />` plus:

```typescript
interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;  // Tailwind color class
  gradientTo?: string;    // Tailwind color class
}
```

**Usage**:

```typescript
import { GradientButton } from '@/components/elements/GradientButton';

<GradientButton 
  gradientFrom="blue-500" 
  gradientTo="purple-600"
>
  Premium Feature
</GradientButton>
```

---

#### `<CheckoutButton />`

**Location**: `components/elements/CheckoutButton.tsx`

Specialized button that initiates Stripe checkout.

**Props**:

```typescript
interface CheckoutButtonProps {
  priceId: string;              // Stripe Price ID
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  successUrl?: string;          // Default: '/dashboard'
  cancelUrl?: string;           // Default: current page
}
```

**Usage**:

```typescript
import { CheckoutButton } from '@/components/elements/CheckoutButton';

<CheckoutButton priceId="price_1ABC123">
  Subscribe Now
</CheckoutButton>
```

**Behavior**:
1. User clicks button
2. POST to `/api/checkout`
3. Creates Stripe Checkout Session
4. Redirects to Stripe
5. Returns to `successUrl` on completion

---

#### `<LeadButton />`

**Location**: `components/elements/LeadButton.tsx`

Button that captures leads before action.

**Props**:

```typescript
interface LeadButtonProps {
  children: React.ReactNode;
  onLeadCapture?: (email: string) => void | Promise<void>;
  successAction?: () => void;
}
```

**Usage**:

```typescript
import { LeadButton } from '@/components/elements/LeadButton';

<LeadButton 
  onLeadCapture={async (email) => {
    await saveToMailingList(email);
  }}
  successAction={() => router.push('/download')}
>
  Download Free Guide
</LeadButton>
```

---

#### `<Modal />`

**Location**: `components/elements/Modal.tsx`

Accessible modal dialog component.

**Props**:

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;  // Default: true
}
```

**Usage**:

```typescript
import { Modal } from '@/components/elements/Modal';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to continue?</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>
```

---

### Social Proof Components

#### `<FeatureList />`

**Location**: `components/social-proof/FeatureList.tsx`

List of features with icons.

**Props**:

```typescript
interface FeatureListProps {
  features: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  }[];
  columns?: 1 | 2 | 3;  // Default: 3
}
```

**Usage**:

```typescript
import { FeatureList } from '@/components/social-proof/FeatureList';

<FeatureList features={[
  {
    title: 'Fast Performance',
    description: 'Lightning-fast load times',
  },
  // ... more features
]} columns={3} />
```

---

#### `<FeatureAccordion />`

**Location**: `components/social-proof/FeatureAccordion.tsx`

Expandable feature list.

**Props**:

```typescript
interface FeatureAccordionProps {
  features: {
    title: string;
    description: string;
    details?: string;
  }[];
}
```

---

#### `<Rating />`

**Location**: `components/social-proof/Rating.tsx`

Star rating display.

**Props**:

```typescript
interface RatingProps {
  rating: number;      // 0-5
  maxRating?: number;  // Default: 5
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;  // Show "4.5" text
}
```

**Usage**:

```typescript
import { Rating } from '@/components/social-proof/Rating';

<Rating rating={4.5} size="md" showNumber />
```

---

## Libraries & Utilities

### Authentication

#### `libs/auth/next-auth.ts`

NextAuth configuration and session management.

**Functions**:

##### `getServerSession()`

Get current session server-side.

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/next-auth';

// In Server Component or API Route
const session = await getServerSession(authOptions);

if (!session) {
  // User not authenticated
}

console.log(session.user.email);
```

##### `authOptions`

NextAuth configuration object.

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      // Magic link configuration
    }),
  ],
  // ... more config
};
```

---

#### `libs/auth/route-protection.ts`

Utilities for protecting routes.

**Functions**:

##### `requireAuth(handler)`

Wrap API routes to require authentication.

```typescript
import { requireAuth } from '@/libs/auth/route-protection';

export const GET = requireAuth(async (req, session) => {
  // session is guaranteed to exist
  const userId = session.user.id;
  
  // Your logic here
  return Response.json({ userId });
});
```

---

### Payments (Stripe)

#### `libs/stripe/client.ts`

Stripe SDK wrapper.

**Functions**:

##### `createCheckoutSession()`

Create a Stripe Checkout Session.

```typescript
import { createCheckoutSession } from '@/libs/stripe/client';

const session = await createCheckoutSession({
  priceId: 'price_1ABC123',
  customerId: 'cus_123',
  successUrl: 'https://myapp.com/success',
  cancelUrl: 'https://myapp.com/cancel',
});

console.log(session.url);  // Redirect user here
```

**Parameters**:

```typescript
interface CreateCheckoutSessionParams {
  priceId: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}
```

##### `getStripeCustomer()`

Get or create Stripe customer for user.

```typescript
import { getStripeCustomer } from '@/libs/stripe/client';

const customer = await getStripeCustomer({
  email: 'user@example.com',
  name: 'John Doe',
  userId: 'user_123',
});
```

##### `getSubscription()`

Retrieve subscription details.

```typescript
import { getSubscription } from '@/libs/stripe/client';

const subscription = await getSubscription('sub_123');

console.log(subscription.status);  // 'active', 'canceled', etc.
console.log(subscription.current_period_end);
```

---

### Email

#### `libs/email/resend.ts`

Email sending via Resend.

**Functions**:

##### `sendEmail()`

Send a transactional email.

```typescript
import { sendEmail } from '@/libs/email/resend';

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to MyApp',
  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
  from: 'noreply@myapp.com',
});
```

**Parameters**:

```typescript
interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;  // Default: config.email.from
  replyTo?: string;
  attachments?: Attachment[];
}
```

---

#### `libs/email/magic-link.ts`

Magic link authentication emails.

**Functions**:

##### `sendMagicLink()`

Send magic link sign-in email.

```typescript
import { sendMagicLink } from '@/libs/email/magic-link';

await sendMagicLink({
  email: 'user@example.com',
  url: 'https://myapp.com/auth/verify?token=abc123',
});
```

**Rate Limiting**:
- 3 emails per 15 minutes per IP
- 5 emails per hour per email address

---

#### `libs/email/templates.ts`

Pre-built email templates.

**Functions**:

##### `magicLinkTemplate()`

```typescript
import { magicLinkTemplate } from '@/libs/email/templates';

const { subject, html } = magicLinkTemplate(
  'https://myapp.com/auth/verify?token=abc123',
  'MyApp'
);
```

##### `welcomeEmailTemplate()`

```typescript
import { welcomeEmailTemplate } from '@/libs/email/templates';

const { subject, html } = welcomeEmailTemplate({
  name: 'John',
  appName: 'MyApp',
});
```

---

### Database

#### `libs/db/index.ts`

Database connection factory.

**Functions**:

##### `getDatabase()`

Get database client based on environment config.

```typescript
import { getDatabase } from '@/libs/db';

const db = await getDatabase();

// Works with MongoDB or Supabase
const user = await db.users.findOne({ email: 'user@example.com' });
```

---

#### `libs/db/mongodb.ts`

MongoDB-specific adapter.

**Functions**:

##### `connectToDatabase()`

```typescript
import { connectToDatabase } from '@/libs/db/mongodb';

const { db, client } = await connectToDatabase();

const users = db.collection('users');
```

---

#### `libs/db/supabase.ts`

Supabase-specific adapter.

**Functions**:

##### `getSupabaseClient()`

```typescript
import { getSupabaseClient } from '@/libs/db/supabase';

const supabase = getSupabaseClient();

const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', 'user@example.com');
```

---

### Validation

#### `libs/validation/api.ts`

Zod schemas for API validation.

**Schemas**:

##### `CheckoutSchema`

```typescript
import { CheckoutSchema } from '@/libs/validation/api';

// In API route
const body = await req.json();
const validated = CheckoutSchema.parse(body);  // Throws if invalid

// Schema definition
const CheckoutSchema = z.object({
  priceId: z.string().min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});
```

##### `MagicLinkSchema`

```typescript
const MagicLinkSchema = z.object({
  email: z.string().email(),
});
```

##### `WebhookSchema`

```typescript
const WebhookSchema = z.object({
  type: z.string(),
  data: z.object({
    object: z.any(),
  }),
});
```

---

### Security

#### `libs/security/headers.ts`

Security headers configuration.

**Functions**:

##### `getSecurityHeaders()`

Returns Next.js security headers config.

```typescript
import { getSecurityHeaders } from '@/libs/security/headers';

// In next.config.js
module.exports = {
  async headers() {
    return getSecurityHeaders();
  },
};
```

**Headers Included**:
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- Content Security Policy (CSP)

---

#### `libs/middleware/rate-limit.ts`

Rate limiting for API routes.

**Functions**:

##### `rateLimit()`

Create rate limiter middleware.

```typescript
import { rateLimit } from '@/libs/middleware/rate-limit';

// In API route
const limiter = rateLimit({
  interval: 15 * 60 * 1000,  // 15 minutes
  uniqueTokenPerInterval: 500,  // Max 500 unique IPs
});

export async function POST(req: Request) {
  try {
    await limiter.check(req, 10);  // 10 requests per interval
  } catch {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  
  // Your logic
}
```

**Configuration**:

```typescript
interface RateLimitConfig {
  interval: number;              // Time window in ms
  uniqueTokenPerInterval: number;  // Max unique identifiers
}
```

---

### SEO

#### `libs/seo.ts`

SEO utilities and metadata generation.

**Functions**:

##### `generateMetadata()`

Generate Next.js metadata object.

```typescript
import { generateMetadata } from '@/libs/seo';

export const metadata = generateMetadata({
  title: 'My Page',
  description: 'Page description',
  path: '/my-page',
  image: '/my-page-og.png',
});
```

**Returns**:

```typescript
{
  title: 'My Page | MyApp',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    url: 'https://myapp.com/my-page',
    images: ['/my-page-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Page',
    description: 'Page description',
  },
}
```

##### `structuredData()`

Generate JSON-LD structured data.

```typescript
import { structuredData } from '@/libs/seo';

const jsonLd = structuredData({
  type: 'Organization',
  name: 'MyApp',
  url: 'https://myapp.com',
  logo: 'https://myapp.com/logo.png',
});

// In page
<script type="application/ld+json">
  {JSON.stringify(jsonLd)}
</script>
```

---

## API Routes

All API routes are located in `app/api/`.

### `POST /api/checkout`

Create Stripe checkout session.

**Request Body**:

```typescript
{
  priceId: string;
  successUrl?: string;  // Optional
  cancelUrl?: string;   // Optional
}
```

**Response**:

```typescript
{
  url: string;  // Redirect user to this URL
  sessionId: string;
}
```

**Example**:

```typescript
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_1ABC123',
  }),
});

const { url } = await response.json();
window.location.href = url;  // Redirect to Stripe
```

---

### `POST /api/auth/magic-link`

Send magic link sign-in email.

**Request Body**:

```typescript
{
  email: string;
}
```

**Response**:

```typescript
{
  success: boolean;
  message: string;
}
```

**Rate Limits**:
- 3 per 15 minutes per IP
- 5 per hour per email

---

### `POST /api/webhooks/stripe`

Stripe webhook handler.

**Headers Required**:
- `stripe-signature`: Webhook signature

**Events Handled**:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

**Security**:
- Verifies webhook signature
- Validates payload with Zod
- Idempotent processing

---

### `GET /api/health`

Health check endpoint.

**Response**:

```typescript
{
  status: 'ok',
  timestamp: '2024-01-01T00:00:00.000Z',
  database: 'connected' | 'disconnected',
}
```

---

## Database Models

### `User`

**Location**: `models/User.ts`

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: Date;
  role: 'user' | 'admin';
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### `Subscription`

**Location**: `models/Subscription.ts`

```typescript
interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Environment Variables

### Required Variables

```bash
# App
NEXT_PUBLIC_APP_URL=https://myapp.com

# NextAuth (MUST be 15+ characters)
NEXTAUTH_SECRET=your-secret-key-minimum-15-chars
NEXTAUTH_URL=https://myapp.com

# Database (Choose ONE)
MONGODB_URI=mongodb://...
# OR
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# Email
RESEND_API_KEY=re_...
```

### Optional Variables

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry
SENTRY_DSN=https://...

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_MAGIC_LINKS=true
```

---

## TypeScript Types

### Extending NextAuth Types

**File**: `types/next-auth.d.ts`

```typescript
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'user' | 'admin';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'user' | 'admin';
  }
}
```

---

## Best Practices

### 1. Always Use TypeScript Types

❌ **Don't**:
```typescript
const user: any = await getUser();
```

✅ **Do**:
```typescript
import { User } from '@/models/User';
const user: User = await getUser();
```

### 2. Validate API Inputs

❌ **Don't**:
```typescript
const { email } = await req.json();
await sendEmail(email);
```

✅ **Do**:
```typescript
import { MagicLinkSchema } from '@/libs/validation/api';

const body = await req.json();
const { email } = MagicLinkSchema.parse(body);
await sendEmail(email);
```

### 3. Reference Config, Don't Hardcode

❌ **Don't**:
```typescript
<title>My App - The Best SaaS</title>
```

✅ **Do**:
```typescript
import { config } from '@/config';
<title>{config.seo.title}</title>
```

### 4. Use Server Components When Possible

✅ **Server Component** (faster):
```typescript
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

⚠️ **Client Component** (when needed):
```typescript
'use client';
import { useState } from 'react';

export default function InteractivePage() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## Migration Guides

### Upgrading Node.js Version

```bash
# Check current version
node -v

# Install NVM (if not already)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 18.17+
nvm install 18.17
nvm use 18.17
```

### Switching from MongoDB to Supabase

1. Install Supabase dependencies (already included)
2. Update `.env.local`:
   ```bash
   # Comment out MongoDB
   # MONGODB_URI=...
   
   # Add Supabase
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-key
   ```
3. Restart dev server
4. Database adapter auto-detects and switches

---

**Need more help?** Check the [Tutorial](./TUTORIAL.md) or [Getting Started Guide](./GETTING_STARTED.md).
