# 🚀 Getting Started with Jumpstart

Welcome to **Jumpstart** — the fastest way to launch your SaaS startup! This high-performance boilerplate is built for makers who want to ship production-ready applications without reinventing the wheel.

## 🎯 What You Get

Jumpstart is a battle-tested, production-ready SaaS boilerplate that includes:

- ✅ **Authentication** with Google OAuth & Magic Links
- ✅ **Stripe Subscriptions** with automated billing
- ✅ **Email System** with rate limiting & templates
- ✅ **SEO Optimization** with dynamic meta tags
- ✅ **Security** headers, rate limiting, and validation
- ✅ **Analytics** integration ready
- ✅ **Modern UI** components for high conversion
- ✅ **TypeScript** throughout with strict typing
- ✅ **One-click Deploy** to Vercel

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** version **18.17.0 or greater** installed
- **npm** or **yarn** package manager
- A **Stripe account** (for payments)
- A **database** (MongoDB or Supabase)
- A **Google OAuth** app (for authentication)
- An **email service** (Resend or Mailgun)

> **💡 Tip**: Use `node -v` to check your Node.js version. If you need to upgrade, visit [nodejs.org](https://nodejs.org).

---

## 🏁 Quick Start (5 Minutes)

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/jumpstart.git
cd jumpstart

# Install dependencies
npm install
```

### Step 2: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

Now open `.env.local` and configure the following variables:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# NextAuth (REQUIRED - minimum 15 characters)
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-15-chars
NEXTAUTH_URL=http://localhost:3000

# Database (Choose ONE)
# MongoDB
MONGODB_URI=mongodb://localhost:27017/jumpstart
# OR Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# Email (Resend)
RESEND_API_KEY=re_...
```

> **⚠️ IMPORTANT**: The `NEXTAUTH_SECRET` must be at least **15 characters long** for security. Generate a secure random string using:
> ```bash
> openssl rand -base64 32
> ```

### Step 3: Start Development Server

```bash
# Run the development server
npm run dev
```

Your app will be available at **http://localhost:3000** 🎉

---

## 🔐 Environment Security Checklist

Before deploying, ensure:

- [ ] `NEXTAUTH_SECRET` is at least 15 characters
- [ ] All API keys are kept secret (never commit to Git)
- [ ] `.env.local` is in your `.gitignore`
- [ ] Production URLs are updated in deployment environment
- [ ] Stripe webhook secrets are configured correctly

---

## 📂 What's Next?

Now that you're up and running, explore:

1. **[Launch Tutorial](./TUTORIAL.md)** - Build your first feature in 5 minutes
2. **[Project Architecture](./ARCHITECTURE.md)** - Understand the codebase structure
3. **[API Reference](./REFERENCE.md)** - Deep dive into components and APIs
4. **[Deployment Guide](../DEPLOYMENT.md)** - Ship to production on Vercel

---

## 🆘 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Run on a different port
PORT=3001 npm run dev
```

### Database Connection Issues

- **MongoDB**: Ensure MongoDB is running locally or your connection string is correct
- **Supabase**: Verify your project URL and anon key are correct

### Authentication Not Working

1. Check `NEXTAUTH_SECRET` is set and at least 15 characters
2. Verify `NEXTAUTH_URL` matches your current URL
3. Ensure Google OAuth credentials are correct and authorized redirect URIs include `http://localhost:3000/api/auth/callback/google`

---

## 💬 Need Help?

- 📖 Read the [full documentation](./REFERENCE.md)
- 🐛 Report issues on GitHub
- 💡 Check existing discussions and issues

**Ready to build? Let's go! 🚀**
