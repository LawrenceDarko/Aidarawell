# Deployment Guide

This guide covers deploying the Jumpstart SaaS boilerplate to Vercel and other platforms.

## Prerequisites

- Node.js >= 18.17.0
- A Vercel account (or similar platform)
- Environment variables configured

## Vercel Deployment

### Step 1: Prepare Your Repository

1. Ensure all code is committed and pushed to your Git repository
2. Verify that `package.json` includes all dependencies
3. Check that `next.config.ts` is properly configured

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Configure Environment Variables

In the Vercel dashboard, go to Project Settings → Environment Variables and add:

#### Required Variables

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

#### Database (Choose One)

**MongoDB:**
```env
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB_NAME=jumpstart
```

**Supabase:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### OAuth

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Email

```env
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_REPLY_TO=support@yourdomain.com
```

#### Stripe

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...
```

#### Analytics (Optional)

```env
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

### Step 4: Configure Stripe Webhook

1. Go to your Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Step 5: Update OAuth Redirect URLs

1. **Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Update authorized redirect URIs:
     - `https://your-domain.vercel.app/api/auth/callback/google`

2. **NextAuth:**
   - Ensure `NEXTAUTH_URL` matches your Vercel domain

### Step 6: Verify Deployment

1. Check build logs for any errors
2. Visit your deployed site
3. Test authentication flow
4. Test checkout flow (use Stripe test mode)
5. Verify webhooks are receiving events

## Other Platforms

### Netlify

1. Connect your Git repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard
4. Deploy

### Railway

1. Create new project from Git repository
2. Add environment variables
3. Railway will auto-detect Next.js and deploy

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] Database connection is working
- [ ] Authentication is functional
- [ ] Stripe webhooks are configured
- [ ] Email sending is working
- [ ] Analytics tracking is active
- [ ] Security headers are applied
- [ ] SSL certificate is active (automatic on Vercel)
- [ ] Custom domain is configured (if applicable)
- [ ] Error monitoring is set up (e.g., Sentry)

## Troubleshooting

### Build Failures

- Check Node.js version (must be >= 18.17.0)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors: `npm run build` locally

### Environment Variable Issues

- Ensure all required variables are set
- Check for typos in variable names
- Verify values are correct (no extra spaces)

### Database Connection Issues

- Verify connection string is correct
- Check database allows connections from Vercel IPs
- For MongoDB Atlas, whitelist Vercel IPs or use 0.0.0.0/0

### Webhook Issues

- Verify webhook URL is correct
- Check webhook secret matches
- Review Stripe webhook logs for errors

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- Project README.md
