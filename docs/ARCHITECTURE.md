# 🏗️ Project Architecture

Understanding Jumpstart's architecture will help you build faster and avoid common pitfalls. This guide explains the structure, design patterns, and philosophy behind the codebase.

---

## 🎯 Core Philosophy

Jumpstart follows these principles:

1. **TypeScript everywhere** - Strong typing prevents bugs before they happen
2. **Single source of truth** - `config.ts` is the backbone
3. **Composable components** - Build complex UIs from simple pieces
4. **Security by default** - Rate limiting, validation, secure headers
5. **Production-ready** - Not just tutorial code, but battle-tested patterns

---

## 📁 Folder Structure

### High-Level Overview

```
jumpstart/
├── app/                 # Next.js App Router (pages + API routes)
├── components/          # Reusable React components
├── libs/                # Business logic & integrations
├── models/              # Database schemas & domain models
├── types/               # TypeScript type definitions
├── config.ts            # 🎯 SINGLE SOURCE OF TRUTH
├── env.ts               # Typed environment variables
└── middleware.ts        # Request/response middleware
```

---

## 🧩 Detailed Structure

### 1. `/app` - Next.js App Router

The `app/` directory uses Next.js 13+ **App Router** pattern:

```
app/
├── layout.tsx           # Root layout with providers
├── page.tsx             # Homepage
├── error.tsx            # Error boundary
├── not-found.tsx        # 404 page
├── globals.css          # Global styles (Tailwind)
│
├── (pages)/             # Route groups for pages
│   ├── privacy/
│   │   └── page.tsx     # Privacy policy
│   └── ...
│
└── api/                 # API endpoints
    ├── auth/
    │   ├── [...nextauth]/
    │   │   └── route.ts  # NextAuth handler
    │   └── magic-link/
    │       └── route.ts  # Magic link endpoint
    ├── checkout/
    │   └── route.ts      # Stripe checkout
    ├── webhooks/
    │   └── stripe/
    │       └── route.ts  # Stripe webhooks
    └── health/
        └── route.ts      # Health check
```

**Key Concepts:**

- **Server Components by default** - Faster initial page loads
- **API Routes as `route.ts`** - RESTful endpoints with validation
- **Colocation** - Keep related code together

---

### 2. `/components` - Reusable UI

All components are **strongly typed** and use **Tailwind CSS**:

```
components/
├── index.ts             # Barrel exports for easy imports
│
├── elements/            # Basic UI elements
│   ├── Button.tsx       # Primary button
│   ├── GradientButton.tsx
│   ├── CheckoutButton.tsx
│   ├── LeadButton.tsx
│   └── Modal.tsx
│
├── marketing/           # Marketing/landing page components
│   ├── Hero.tsx         # Hero section
│   ├── PricingTable.tsx # Pricing display
│   ├── FAQ.tsx          # FAQ accordion
│   ├── Testimonials.tsx # Social proof
│   └── CTA.tsx          # Call-to-action sections
│
├── navigation/          # Site navigation
│   ├── Header.tsx       # Top navigation
│   └── Footer.tsx       # Footer with links
│
├── social-proof/        # Trust & credibility
│   ├── FeatureList.tsx
│   ├── FeatureAccordion.tsx
│   └── Rating.tsx
│
├── analytics/           # Analytics tracking
│   └── GoogleAnalytics.tsx
│
└── providers/           # Context providers
    └── SessionProvider.tsx
```

**Component Patterns:**

Every component follows this structure:

```typescript
// Define props interface
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

// Export typed component
export const Button = ({ variant = 'primary', onClick, children }: ButtonProps) => {
  // Implementation
};
```

---

### 3. `/libs` - Business Logic & Integrations

The `libs/` directory contains **zero UI code** - only business logic:

```
libs/
├── stripe.ts            # Stripe SDK wrapper
├── auth.ts              # Auth utilities
├── email.ts             # Email sending
├── seo.ts               # SEO metadata generation
├── errors.ts            # Custom error classes
├── analytics.ts         # Analytics tracking
│
├── auth/                # Authentication modules
│   ├── next-auth.ts     # NextAuth configuration
│   └── route-protection.ts
│
├── db/                  # Database integrations
│   ├── index.ts         # Database factory
│   ├── mongodb.ts       # MongoDB adapter
│   └── supabase.ts      # Supabase adapter
│
├── email/               # Email system
│   ├── resend.ts        # Resend integration
│   ├── magic-link.ts    # Magic link emails
│   └── templates.ts     # Email templates
│
├── stripe/              # Stripe integrations
│   └── client.ts        # Stripe client
│
├── middleware/          # Request middleware
│   ├── index.ts
│   └── rate-limit.ts    # Rate limiting
│
├── security/            # Security utilities
│   └── headers.ts       # Security headers
│
└── validation/          # Input validation
    └── api.ts           # Zod schemas
```

**Key Principles:**

- **Typed wrappers** around third-party SDKs
- **Environment-agnostic** - works client & server
- **Single responsibility** - each file has one job

---

### 4. `/models` - Database Schemas

Domain models define your data structure:

```
models/
├── index.ts             # Barrel exports
├── User.ts              # User model & type
└── Subscription.ts      # Subscription model & type
```

**Model Pattern:**

```typescript
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Database-specific schema (if needed)
export const UserSchema = {
  // MongoDB, Prisma, or Supabase schema
};
```

---

### 5. `/types` - TypeScript Definitions

Custom type definitions and module augmentation:

```
types/
├── next-auth.d.ts       # NextAuth type extensions
└── supabase.d.ts        # Supabase type extensions
```

---

## ⚙️ The Backbone: `config.ts`

### Why `config.ts` Matters

`config.ts` is the **single source of truth** for your entire application. Instead of scattering configuration across dozens of files, everything lives here:

```typescript
export const config: AppConfig = {
  app: {
    name: 'Jumpstart',
    description: 'Your SaaS description',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  seo: {
    title: 'Jumpstart - SaaS Boilerplate',
    description: 'Production-ready SaaS boilerplate',
    keywords: ['SaaS', 'Next.js', 'TypeScript'],
    ogImage: '/og-image.png',
  },
  stripe: {
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        price: 9.99,
        currency: 'USD',
        interval: 'month',
      },
      // More plans...
    ],
  },
  auth: {
    protectedRoutes: ['/dashboard', '/settings'],
    callbackUrl: '/dashboard',
  },
  email: {
    from: 'noreply@yourapp.com',
    replyTo: 'support@yourapp.com',
  },
};
```

### How It's Used

**SEO Metadata:**
```typescript
// app/layout.tsx
import { config } from '@/config';

export const metadata = {
  title: config.seo.title,
  description: config.seo.description,
};
```

**Pricing Table:**
```typescript
// components/marketing/PricingTable.tsx
import { config } from '@/config';

export const PricingTable = () => {
  return config.stripe.plans.map(plan => (
    <PricingCard key={plan.id} {...plan} />
  ));
};
```

**Route Protection:**
```typescript
// middleware.ts
import { config } from '@/config';

if (config.auth.protectedRoutes.includes(pathname)) {
  // Check authentication
}
```

---

## 🔒 Security Architecture

### Multi-Layer Security

1. **Input Validation** - Zod schemas on all API routes
2. **Rate Limiting** - Prevent abuse on auth and API endpoints
3. **Security Headers** - HSTS, CSP, X-Frame-Options, etc.
4. **Environment Variables** - Typed and validated via `env.ts`

### Validation Pattern

```typescript
// libs/validation/api.ts
import { z } from 'zod';

export const CheckoutSchema = z.object({
  priceId: z.string().min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

// app/api/checkout/route.ts
import { CheckoutSchema } from '@/libs/validation/api';

export async function POST(req: Request) {
  const body = await req.json();
  const validated = CheckoutSchema.parse(body); // Throws if invalid
  // ...
}
```

---

## 🌐 Routing & Middleware

### Middleware Pipeline

```typescript
// middleware.ts
import { withAuth } from '@/libs/middleware';
import { rateLimit } from '@/libs/middleware/rate-limit';

export default withAuth(rateLimit());
```

Middleware runs **before** every request and handles:
- Authentication checks
- Rate limiting
- Security headers
- Redirects

---

## 📦 Data Flow

### Typical Request Flow

```
User Request
    ↓
Middleware (auth, rate-limit, headers)
    ↓
API Route (validation)
    ↓
Business Logic (/libs)
    ↓
Database (/models)
    ↓
Response (with proper headers)
```

### Example: Checkout Flow

```
1. User clicks "Subscribe" button
   → CheckoutButton.tsx

2. POST to /api/checkout
   → Validation with Zod
   → Create Stripe checkout session
   
3. Redirect to Stripe
   → User completes payment
   
4. Webhook to /api/webhooks/stripe
   → Verify signature
   → Update subscription in database
   
5. Redirect user back to app
   → Dashboard with active subscription
```

---

## 🎨 Styling Architecture

### Tailwind CSS Approach

- **No custom CSS files** (except `globals.css`)
- **Utility-first** classes in components
- **Responsive by default** with mobile-first breakpoints
- **Dark mode ready** (if enabled in config)

### Component Style Pattern

```typescript
export const Button = ({ variant }: ButtonProps) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  };
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
};
```

---

## 🧪 Testing Architecture

### Recommended Structure

```
__tests__/
├── unit/                # Unit tests for libs/
├── integration/         # API route tests
└── e2e/                 # End-to-end with Playwright
```

---

## 📈 Performance Optimizations

1. **Server Components** - Reduce client-side JavaScript
2. **Dynamic Imports** - Code splitting for heavy components
3. **Image Optimization** - Next.js `<Image>` component
4. **Edge Runtime** - Fast middleware execution
5. **Static Generation** - Pre-render marketing pages

---

## 🔄 Adding New Features

### Pattern to Follow

1. **Define types** in `/models` or component
2. **Add business logic** in `/libs`
3. **Create API route** in `/app/api` with validation
4. **Build UI component** in `/components`
5. **Update config.ts** if needed
6. **Add to documentation**

### Example: Adding a Blog

```
1. models/Post.ts         → Post interface
2. libs/blog.ts           → Blog CRUD operations
3. app/api/posts/route.ts → API endpoints
4. components/blog/       → Blog UI components
5. app/blog/              → Blog pages
6. config.ts              → Add blog settings
```

---

## 🚀 Next Steps

Now that you understand the architecture:

- **[Launch Tutorial](./TUTORIAL.md)** - Build a feature step-by-step
- **[API Reference](./REFERENCE.md)** - Detailed component docs
- **[Deployment Guide](../DEPLOYMENT.md)** - Ship to production

---

**Remember**: Most changes happen in `config.ts`. Start there first! ⚡
