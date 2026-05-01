# ❓ Frequently Asked Questions (FAQ)

Common questions and answers about Jumpstart.

---

## 🚀 Getting Started

### What is Jumpstart?

Jumpstart is a production-ready SaaS boilerplate built with Next.js, TypeScript, and modern best practices. It includes authentication, payments, email, and all the infrastructure you need to launch a SaaS product quickly.

### Who is Jumpstart for?

- **Indie makers** building their first SaaS
- **Startups** needing to move fast
- **Developers** who want battle-tested patterns
- **Teams** looking for a solid foundation

### What do I need to know to use Jumpstart?

**Required**:
- JavaScript/TypeScript basics
- React fundamentals
- Basic command line usage

**Helpful but not required**:
- Next.js experience
- Tailwind CSS
- API development

### How much does it cost?

Jumpstart itself is **free and open-source** (MIT License). However, you'll need accounts with third-party services:

- **Stripe**: Free to start, transaction fees apply
- **Database**: MongoDB (free tier) or Supabase (free tier)
- **Email**: Resend (free tier available)
- **Hosting**: Vercel (free tier available)

You can start with **$0/month** using free tiers.

---

## 🛠️ Technical Questions

### What version of Node.js do I need?

**Node.js 18.17.0 or greater** is required.

Check your version:
```bash
node -v
```

Upgrade if needed:
```bash
nvm install 18.17
nvm use 18.17
```

### Can I use JavaScript instead of TypeScript?

While technically possible, we **strongly recommend TypeScript**. The entire codebase is built with TypeScript, and removing it would eliminate many safety benefits. If you're new to TypeScript, this is a great project to learn on!

### What database should I use - MongoDB or Supabase?

Both are supported. Choose based on your needs:

**MongoDB**:
- ✅ Flexible schema
- ✅ Great for rapid iteration
- ✅ Widely adopted
- ❌ Requires separate auth layer

**Supabase**:
- ✅ Built-in auth (alternative to NextAuth)
- ✅ Row-level security
- ✅ Real-time subscriptions
- ✅ PostgreSQL (SQL)
- ❌ Less flexibility in schema

**Recommendation**: Start with **MongoDB** if unsure. It's easier to get started.

### Can I use a different payment provider instead of Stripe?

Stripe is deeply integrated into the boilerplate. Switching to another provider (Paddle, PayPal, etc.) would require significant refactoring. We chose Stripe for its:
- Developer-friendly API
- Comprehensive documentation
- Subscription management features
- Global availability

### Can I use a different authentication provider?

NextAuth supports many providers out of the box. To add more:

1. Install the provider:
   ```bash
   npm install next-auth
   ```

2. Add to `libs/auth/next-auth.ts`:
   ```typescript
   import GitHubProvider from 'next-auth/providers/github';
   
   providers: [
     GoogleProvider({ ... }),
     GitHubProvider({
       clientId: process.env.GITHUB_ID,
       clientSecret: process.env.GITHUB_SECRET,
     }),
   ],
   ```

3. Add environment variables to `.env.local`

Supported providers: GitHub, Facebook, Twitter, LinkedIn, Apple, and [many more](https://next-auth.js.org/providers/).

### Is this compatible with the Pages Router?

No, Jumpstart uses Next.js **App Router** (the modern approach). Migrating to Pages Router would require significant changes and is not recommended.

### Can I use this with Remix, Astro, or other frameworks?

Jumpstart is built specifically for Next.js. The architecture and many features (Server Components, API Routes, middleware) are Next.js-specific. For other frameworks, you'd need a different boilerplate.

---

## 📁 Configuration & Setup

### Where do I change my app name?

Edit `config.ts`:

```typescript
export const config: AppConfig = {
  app: {
    name: 'YourAppName',  // ← Change here
    description: 'Your app description',
    // ...
  },
};
```

This updates your app name **everywhere** — page titles, SEO tags, emails, headers, etc.

### How do I add a new pricing plan?

Edit `config.ts` → `stripe.plans` array:

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
        'Priority support',
        'Custom integrations',
      ],
      price: 99,
      currency: 'USD',
      interval: 'month',
    },
  ],
},
```

Then create the corresponding product in Stripe Dashboard and add the Price ID to `.env.local`.

### How do I customize the landing page?

1. **Edit components** in `components/marketing/`:
   - `Hero.tsx` - Hero section
   - `PricingTable.tsx` - Pricing
   - `FAQ.tsx` - FAQ section
   - `CTA.tsx` - Call-to-action

2. **Edit the page** at `app/page.tsx`:
   ```typescript
   export default function HomePage() {
     return (
       <>
         <Hero />
         <FeatureList />
         <PricingTable />
         <Testimonials />
         <FAQ />
         <CTA />
       </>
     );
   }
   ```

### Where do I add custom CSS?

Jumpstart uses **Tailwind CSS** utility classes. Avoid custom CSS when possible.

If you must add custom styles:

1. **Add to `app/globals.css`** for global styles
2. **Use Tailwind config** (`tailwind.config.ts`) for theme customization
3. **CSS Modules** for component-specific styles (create `Component.module.css`)

### How do I change colors/theme?

Edit `tailwind.config.ts`:

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

Then use in components:
```tsx
<button className="bg-primary-600 hover:bg-primary-700">
  Click Me
</button>
```

---

## 🔐 Authentication & Security

### How do I make a route require login?

Add the route to `config.ts`:

```typescript
auth: {
  protectedRoutes: [
    '/dashboard',
    '/settings',
    '/my-new-route',  // ← Add here
  ],
  callbackUrl: '/dashboard',
},
```

The middleware will automatically redirect unauthenticated users.

### How do I get the current user in a component?

**Server Component** (recommended):

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/next-auth';

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    // User not logged in
  }
  
  const userId = session.user.id;
  const userEmail = session.user.email;
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

**Client Component**:

```typescript
'use client';
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <div>Not logged in</div>;
  }
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

### Why does my NEXTAUTH_SECRET need to be 15 characters?

Short secrets are vulnerable to brute-force attacks. NextAuth requires a minimum of 15 characters for security. 

**Generate a secure secret**:
```bash
openssl rand -base64 32
```

This generates a 32-byte random string, which is far more secure than a 15-character minimum.

### Can I disable Magic Links and only use Google OAuth?

Yes. In `libs/auth/next-auth.ts`, remove the `EmailProvider`:

```typescript
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  // Remove or comment out EmailProvider
],
```

### How do I add user roles (admin, user, etc.)?

1. **Extend the User model** (`models/User.ts`):
   ```typescript
   export interface User {
     id: string;
     email: string;
     role: 'user' | 'admin' | 'moderator';  // ← Add roles
     // ... other fields
   }
   ```

2. **Extend NextAuth types** (`types/next-auth.d.ts`):
   ```typescript
   declare module 'next-auth' {
     interface Session {
       user: {
         id: string;
         role: 'user' | 'admin' | 'moderator';
       } & DefaultSession['user'];
     }
   }
   ```

3. **Check roles in your code**:
   ```typescript
   const session = await getServerSession(authOptions);
   
   if (session.user.role !== 'admin') {
     return Response.json({ error: 'Forbidden' }, { status: 403 });
   }
   ```

---

## 💳 Payments & Stripe

### Do I need to use Stripe test mode?

**Yes, always start with test mode** during development. Test mode uses different API keys:

- Test: `sk_test_...` and `pk_test_...`
- Live: `sk_live_...` and `pk_live_...`

Test mode allows you to simulate payments without real money.

**Test card**: `4242 4242 4242 4242` (any future date, any CVC)

### How do I switch to Stripe live mode?

1. Get your **live mode** API keys from Stripe Dashboard
2. Update `.env.local` with live keys:
   ```bash
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```
3. Create a **live webhook endpoint** in Stripe Dashboard
4. Update `STRIPE_WEBHOOK_SECRET` with the live webhook secret
5. Ensure your app is deployed and accessible via HTTPS

⚠️ **Never use live keys in development or commit them to Git**

### How do I handle subscription cancellations?

Webhook handler (`app/api/webhooks/stripe/route.ts`) already handles:

- `customer.subscription.deleted`
- `customer.subscription.updated`

When a subscription is canceled, the webhook updates the database automatically.

To cancel a subscription programmatically:

```typescript
import { stripe } from '@/libs/stripe/client';

await stripe.subscriptions.cancel(subscriptionId);
```

### Can I offer one-time payments instead of subscriptions?

Yes, but it requires modifications. Stripe supports one-time payments via:

1. **Payment Links** - Easiest, no code changes
2. **Checkout Sessions** - Modify `app/api/checkout/route.ts` to use `mode: 'payment'` instead of `mode: 'subscription'`
3. **Payment Intents** - More control, more code

### How do I add coupons/discounts?

In the checkout API route:

```typescript
const session = await stripe.checkout.sessions.create({
  // ... other params
  discounts: [{
    coupon: 'SUMMER20',  // Coupon ID from Stripe
  }],
  allow_promotion_codes: true,  // Let users enter codes
});
```

Create coupons in Stripe Dashboard first.

---

## 📧 Email

### Why aren't my emails sending?

**Common causes**:

1. **Invalid API key**: Check `RESEND_API_KEY` in `.env.local`
2. **Unverified sender domain**: Verify your domain in Resend Dashboard
3. **Rate limit hit**: Check rate limit logs
4. **Wrong "from" address**: Must be your verified domain

**Debug**:
```typescript
// Add logging to libs/email/resend.ts
console.log('Attempting to send email:', { to, subject });
```

### How do I customize email templates?

Edit `libs/email/templates.ts`:

```typescript
export const magicLinkTemplate = (url: string, appName: string) => ({
  subject: `Sign in to ${appName}`,
  html: `
    <h1>Welcome back!</h1>
    <p>Click the button below to sign in:</p>
    <a href="${url}">Sign In</a>
  `,
});
```

For more complex templates, consider using a template library like [react-email](https://react.email/).

### Can I use Mailgun instead of Resend?

Yes, uncomment the Mailgun configuration in `.env.local` and update `libs/email/` files to use Mailgun SDK instead of Resend.

### How do I prevent email spam?

Built-in protections:

1. **Rate limiting**: Max 3 magic links per 15 minutes per IP
2. **Email validation**: Zod schema validates email format
3. **CAPTCHA**: Not included, but you can add reCAPTCHA to forms

---

## 🚀 Deployment

### Where should I deploy Jumpstart?

**Recommended**: [Vercel](https://vercel.com) (creators of Next.js)

**Also supported**:
- Netlify
- Railway
- Render
- AWS (with Next.js adapter)
- Self-hosted (Docker, VPS)

Vercel is easiest and has the best Next.js support.

### How do I deploy to Vercel?

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

[Full deployment guide →](./DEPLOYMENT.md)

### Do I need to configure anything for production?

**Yes, update these**:

1. **Environment variables** in Vercel Dashboard:
   - All variables from `.env.local`
   - Use **live** Stripe keys
   - Update `NEXTAUTH_URL` to your domain
   - Update `NEXT_PUBLIC_APP_URL` to your domain

2. **Webhook URLs**:
   - Stripe webhook → `https://yourdomain.com/api/webhooks/stripe`

3. **OAuth redirect URIs**:
   - Google OAuth → `https://yourdomain.com/api/auth/callback/google`

4. **Database**:
   - Use production database (not local)
   - Enable connection pooling if needed

### How do I set up a custom domain?

In Vercel Dashboard:
1. Go to your project → Settings → Domains
2. Add your domain (e.g., `myapp.com`)
3. Follow DNS configuration instructions
4. Update environment variables with new domain

---

## 🐛 Troubleshooting

### I'm getting "Invalid NEXTAUTH_SECRET" error

**Fix**: Ensure `NEXTAUTH_SECRET` in `.env.local` is at least 15 characters.

Generate a new one:
```bash
openssl rand -base64 32
```

### Stripe checkout redirects to error page

**Check**:
1. Price ID matches Stripe Dashboard
2. `STRIPE_SECRET_KEY` is correct
3. Success/cancel URLs are valid
4. Stripe keys are in test mode (for development)

### Database connection error

**MongoDB**:
- Verify connection string format
- Check if MongoDB is running (local) or accessible (cloud)
- Ensure IP is whitelisted (MongoDB Atlas)

**Supabase**:
- Verify Project URL and anon key
- Check if project is paused (free tier)

### Magic link emails not arriving

1. Check spam folder
2. Verify sender domain in Resend
3. Check rate limits (3 per 15 min)
4. View logs in Resend Dashboard

### Port 3000 already in use

Run on different port:
```bash
PORT=3001 npm run dev
```

---

## 🔄 Maintenance & Updates

### How do I update dependencies?

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Or update specific package
npm update next
```

**Important**: Test thoroughly after updating, especially:
- Next.js
- NextAuth
- Stripe

### How do I update Jumpstart to the latest version?

If you cloned the repo:

```bash
git remote add upstream https://github.com/original/jumpstart.git
git fetch upstream
git merge upstream/main
```

Resolve conflicts manually, especially in `config.ts` and environment files.

### Should I update Next.js to every new version?

**No, be selective**. Update when:
- Security fixes are released
- Major features you need are added
- LTS (Long-Term Support) versions are released

Always test in a development environment first.

---

## 💼 Business Questions

### Can I use this for client projects?

**Yes!** MIT License allows commercial use. You can:
- Use for client projects
- Charge for your services
- Modify as needed
- No attribution required (but appreciated!)

### Can I resell Jumpstart?

The MIT License allows you to sell or redistribute Jumpstart. However, the code is open-source and free, so reselling the exact code might not be viable. 

**Better business models**:
- Offer customization services
- Provide hosting/setup services
- Create premium add-ons
- Build industry-specific versions

### Do I need to credit Jumpstart?

**Not required** by the MIT License, but appreciated! A link back helps the community grow.

---

## 🆘 Getting Help

### Where can I get help?

1. **Documentation**: Start with [Getting Started](./GETTING_STARTED.md)
2. **GitHub Issues**: For bugs and feature requests
3. **GitHub Discussions**: For questions and community help
4. **This FAQ**: Check here first!

### How do I report a bug?

[Open an issue on GitHub](https://github.com/yourusername/jumpstart/issues/new) with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment (Node version, OS, browser)
- Relevant code snippets

### Can I request a feature?

Yes! [Open a discussion](https://github.com/yourusername/jumpstart/discussions) to propose new features.

---

**Still have questions?** Check the [full documentation](./README.md) or ask in GitHub Discussions.
