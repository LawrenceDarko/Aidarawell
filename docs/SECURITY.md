# 🔒 Security Guide

Jumpstart is built with **security-first** principles. This guide explains the security features and best practices.

---

## 🛡️ Built-in Security Features

### 1. **Security Headers**

All responses include production-grade security headers:

```typescript
// Automatically applied via middleware
{
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': '...',
}
```

**What This Prevents**:
- ✅ Man-in-the-middle attacks (HSTS)
- ✅ Clickjacking (X-Frame-Options)
- ✅ MIME-type sniffing attacks
- ✅ Unauthorized feature access

**Location**: `libs/security/headers.ts`

---

### 2. **Rate Limiting**

Protection against brute-force and DoS attacks:

| Endpoint | Limit | Window |
|----------|-------|--------|
| Magic Link (`/api/auth/magic-link`) | 3 requests | 15 minutes (per IP) |
| Magic Link (per email) | 5 requests | 1 hour |
| API Routes (general) | 100 requests | 15 minutes |
| Webhook Endpoints | Unlimited | - |

**Implementation**:

```typescript
// libs/middleware/rate-limit.ts
import { rateLimit } from '@/libs/middleware/rate-limit';

const limiter = rateLimit({
  interval: 15 * 60 * 1000,  // 15 minutes
  uniqueTokenPerInterval: 500,
});

// In API route
await limiter.check(req, 3);  // Max 3 requests
```

**Customization**:

```typescript
// Custom rate limit for sensitive endpoint
const strictLimiter = rateLimit({
  interval: 60 * 1000,  // 1 minute
  uniqueTokenPerInterval: 100,
});

await strictLimiter.check(req, 1);  // Only 1 request per minute
```

---

### 3. **Input Validation**

All API inputs are validated using **Zod schemas** before processing:

**Example**:

```typescript
import { z } from 'zod';

const CheckoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID required'),
  successUrl: z.string().url('Must be valid URL'),
  cancelUrl: z.string().url('Must be valid URL'),
});

// In API route
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = CheckoutSchema.parse(body);
    // validated is now type-safe and sanitized
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
  }
}
```

**Benefits**:
- ✅ Prevents injection attacks
- ✅ Type safety
- ✅ Automatic sanitization
- ✅ Clear error messages

---

### 4. **Authentication Security**

#### NextAuth Security Features

**Session Security**:
```typescript
// libs/auth/next-auth.ts
session: {
  strategy: 'jwt',  // Stateless, secure
  maxAge: 30 * 24 * 60 * 60,  // 30 days
  updateAge: 24 * 60 * 60,  // Refresh daily
},
```

**CSRF Protection**: Built-in with NextAuth

**Secret Requirements**:
- `NEXTAUTH_SECRET` must be **minimum 15 characters**
- Generated with cryptographically secure random generator
- Never committed to version control

**Generate Secure Secret**:

```bash
# macOS/Linux
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Magic Link Security

**Token Generation**:
```typescript
// Crypto-secure random tokens
const token = crypto.randomBytes(32).toString('hex');
```

**Expiration**: 24 hours (configurable)

**One-time Use**: Tokens are invalidated after use

**Rate Limited**: See Rate Limiting section above

---

### 5. **Webhook Security**

Stripe webhooks are verified using signature validation:

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';

const signature = req.headers.get('stripe-signature');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

try {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    webhookSecret
  );
  // Event is verified and safe to process
} catch (err) {
  return Response.json({ error: 'Invalid signature' }, { status: 400 });
}
```

**What This Prevents**:
- ✅ Forged webhook requests
- ✅ Replay attacks
- ✅ Unauthorized subscription modifications

---

### 6. **Environment Variable Security**

**Typed & Validated**:

```typescript
// env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(15, 'Secret too short'),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  // ... more validations
});

export const env = envSchema.parse(process.env);
```

**Protection**:
- ✅ Never expose server-side variables to client
- ✅ Validate on startup (fail fast)
- ✅ Type-safe access throughout app
- ✅ `.env.local` in `.gitignore`

**Client vs Server Variables**:

```bash
# ❌ Server-only (NEVER expose)
STRIPE_SECRET_KEY=sk_live_...
NEXTAUTH_SECRET=...
RESEND_API_KEY=...

# ✅ Client-safe (prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_APP_URL=https://myapp.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

### 7. **Database Security**

#### Connection Security

**MongoDB**:
```bash
# Use TLS/SSL in production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true
```

**Supabase**:
```bash
# Row-level security (RLS) enabled by default
# Only use anon key (not service role key)
SUPABASE_ANON_KEY=eyJ...
```

#### Query Safety

**Parameterized Queries**:

✅ **Safe**:
```typescript
// MongoDB
db.users.findOne({ email: userEmail });

// Supabase
supabase.from('users').select('*').eq('email', userEmail);
```

❌ **Dangerous**:
```typescript
// Never build queries with string concatenation
db.users.findOne({ email: `${userInput}` });  // SQL injection risk
```

---

## 🚨 Security Checklist

### Before Deploying to Production

- [ ] `NEXTAUTH_SECRET` is 15+ characters and generated securely
- [ ] All API keys are in `.env.local` and NOT in code
- [ ] `.env.local` is in `.gitignore`
- [ ] Stripe is in **live mode** (keys start with `sk_live_` and `pk_live_`)
- [ ] Webhook secrets are configured for production domain
- [ ] Database uses TLS/SSL connections
- [ ] Security headers are enabled
- [ ] Rate limiting is active on all public API routes
- [ ] CORS is configured appropriately
- [ ] Error messages don't leak sensitive info
- [ ] All user inputs are validated with Zod
- [ ] Session expiry is configured
- [ ] Google OAuth redirect URIs include production domain

---

## 🔐 Common Security Patterns

### 1. Protecting API Routes

```typescript
// app/api/protected-route/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/next-auth';

export async function GET(req: Request) {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Check authorization (role-based)
  if (session.user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Validate input
  const { id } = await req.json();
  const validated = z.string().uuid().parse(id);
  
  // Your logic here
}
```

### 2. Server-Side Data Fetching

```typescript
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/api/auth/signin');
  }
  
  // Fetch user-specific data server-side
  const userData = await getUserData(session.user.id);
  
  return <Dashboard data={userData} />;
}
```

### 3. Client-Side API Calls

```typescript
// components/forms/UpdateProfileForm.tsx
'use client';

import { useState } from 'react';

export const UpdateProfileForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // Include session cookie
        body: JSON.stringify({ name: formData.name }),
      });
      
      if (!response.ok) {
        throw new Error('Update failed');
      }
      
      // Success
    } catch (error) {
      // Handle error (don't expose internals to user)
      console.error('Update failed:', error);
      setError('An error occurred. Please try again.');
    }
  };
};
```

---

## 🛠️ Advanced Security

### Content Security Policy (CSP)

Customize in `libs/security/headers.ts`:

```typescript
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.stripe.com",
  "frame-src https://js.stripe.com",
].join('; ');
```

### CORS Configuration

For API routes that need CORS:

```typescript
// app/api/public-data/route.ts
export async function GET(req: Request) {
  const data = await fetchPublicData();
  
  return Response.json(data, {
    headers: {
      'Access-Control-Allow-Origin': 'https://trusted-domain.com',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

### Logging & Monitoring

**Recommended**: Integrate Sentry or similar for security events:

```typescript
// libs/monitoring.ts
import * as Sentry from '@sentry/nextjs';

export function logSecurityEvent(event: string, data: any) {
  Sentry.captureMessage(`Security: ${event}`, {
    level: 'warning',
    extra: data,
  });
}

// Usage
if (rateLimitExceeded) {
  logSecurityEvent('Rate limit exceeded', { ip, endpoint });
}
```

---

## 🚫 Common Vulnerabilities & Mitigations

### XSS (Cross-Site Scripting)

**Prevention**:
- ✅ React escapes by default
- ✅ Never use `dangerouslySetInnerHTML` without sanitization
- ✅ CSP headers block inline scripts

### SQL/NoSQL Injection

**Prevention**:
- ✅ Parameterized queries only
- ✅ Zod validation on all inputs
- ✅ No string concatenation in queries

### CSRF (Cross-Site Request Forgery)

**Prevention**:
- ✅ NextAuth has built-in CSRF protection
- ✅ SameSite cookie attributes
- ✅ Origin header validation

### Session Hijacking

**Prevention**:
- ✅ HTTP-only cookies (can't be accessed by JavaScript)
- ✅ Secure flag in production (HTTPS only)
- ✅ Session rotation on sensitive actions

### Timing Attacks

**Prevention**:

```typescript
// Use constant-time comparison for secrets
import { timingSafeEqual } from 'crypto';

const isValid = timingSafeEqual(
  Buffer.from(provided),
  Buffer.from(expected)
);
```

---

## 📋 Security Incident Response

### If You Suspect a Breach

1. **Immediately rotate**:
   - `NEXTAUTH_SECRET`
   - All API keys (Stripe, Resend, etc.)
   - Database credentials

2. **Invalidate all sessions**:
   ```typescript
   // Force all users to re-authenticate
   // Update NEXTAUTH_SECRET in production
   ```

3. **Review logs** for suspicious activity

4. **Notify affected users** if data was compromised

5. **Update dependencies**:
   ```bash
   npm audit
   npm audit fix
   ```

---

## 🔄 Keeping Dependencies Secure

### Regular Updates

```bash
# Check for vulnerabilities
npm audit

# Fix automatically when possible
npm audit fix

# Update to latest versions
npm update
```

### Automated Scanning

Add to GitHub Actions:

```yaml
# .github/workflows/security.yml
name: Security Audit
on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm audit
```

---

## 📞 Security Contact

For security vulnerabilities, please **DO NOT** open a public issue.

Instead, email: **security@yourapp.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Your contact information

---

**Next**: [Deployment Guide](./DEPLOYMENT.md)
