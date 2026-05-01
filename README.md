# Jumpstart - SaaS Boilerplate

A production-ready, high-performance SaaS boilerplate built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🔐 **Authentication**: NextAuth with Google OAuth & Magic Links
- 💳 **Payments**: Stripe subscription management
- 📧 **Email**: Resend integration with rate limiting
- 🎨 **UI Components**: High-conversion React components
- 🔒 **Security**: Security headers, rate limiting, input validation
- 📊 **Analytics**: Google Analytics integration
- 🚀 **Deployment**: Vercel-ready configuration
- 📝 **SEO**: Dynamic metadata generation
- ⚡ **Performance**: Optimized for speed and scalability

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: MongoDB or Supabase
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Email**: Resend
- **Node Version**: >= 18.17.0

## Project Structure

```
/app
  /api          # API routes with validation
  /privacy      # Privacy policy page
  error.tsx     # Global error handler
  not-found.tsx # 404 page

/components     # Reusable React components
  /elements     # Buttons, Modals
  /marketing    # Hero, Pricing, FAQ, CTA
  /navigation   # Header, Footer
  /social-proof # Features, Ratings

/libs           # Business logic & integrations
  /stripe       # Payment processing
  /auth         # Authentication
  /email        # Email sending
  /validation   # API validation
  /security     # Security headers
  /middleware   # Rate limiting

/models         # Database schemas

config.ts       # Global configuration
env.ts          # Typed environment variables
```

## 🚀 Quick Start

```bash
# 1. Clone and install
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

**New to Jumpstart?** Follow the [**5-Minute Tutorial →**](./docs/TUTORIAL.md)

## 📚 Documentation

### Tutorial Documentation (Learning Path)

Perfect for getting started and building your first features:

- **[Getting Started](./docs/GETTING_STARTED.md)** - Installation and setup (5 min)
- **[Tutorial: Launch in 5 Minutes](./docs/TUTORIAL.md)** - Step-by-step feature guide
- **[Project Architecture](./docs/ARCHITECTURE.md)** - Understand the codebase structure

### Reference Documentation (Technical Details)

Comprehensive technical references for advanced users:

- **[API Reference](./docs/REFERENCE.md)** - Complete component and utility docs
- **[Security Guide](./docs/SECURITY.md)** - Security features and best practices
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment instructions

### Quick Links

| What do you want to do? | Go here |
|--------------------------|---------|
| 🎯 Get started quickly | [Getting Started](./docs/GETTING_STARTED.md) |
| 📖 Learn by example | [Tutorial](./docs/TUTORIAL.md) |
| 🔍 Look up a component | [API Reference](./docs/REFERENCE.md) |
| 🔒 Review security | [Security Guide](./docs/SECURITY.md) |
| 🚢 Deploy to production | [Deployment Guide](./DEPLOYMENT.md) |

## ⚙️ Configuration

### The Backbone: `config.ts`

Jumpstart uses a **single source of truth** for all configuration:

```typescript
import { config } from '@/config';

// Everything reads from config.ts:
config.app.name           // App name
config.seo.title         // SEO settings
config.stripe.plans      // Pricing plans
config.auth.protectedRoutes  // Protected routes
```

**Why it matters**: Change your app name in ONE place, and it updates everywhere — SEO tags, headers, emails, and all components.

[Learn more about config.ts →](./docs/ARCHITECTURE.md#the-backbone-configts)

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

- **NextAuth** - Authentication (Google OAuth, Magic Links)
- **Database** - MongoDB or Supabase
- **Stripe** - Payment processing
- **Resend** - Email delivery
- **Analytics** - Google Analytics (optional)

[Complete environment variable guide →](./docs/REFERENCE.md#environment-variables)

## 🏗️ Project Structure

```
/app               # Next.js App Router (pages + API routes)
/components        # Reusable React components (fully typed)
/libs              # Business logic & integrations
/models            # Database schemas
config.ts          # 🎯 Single source of truth
env.ts             # Typed environment variables
```

[Deep dive into architecture →](./docs/ARCHITECTURE.md)

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety throughout
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication
- **[Stripe](https://stripe.com/)** - Payment processing
- **[Resend](https://resend.com/)** - Email delivery
- **[Zod](https://zod.dev/)** - Schema validation
- **[MongoDB](https://www.mongodb.com/)** / **[Supabase](https://supabase.com/)** - Database

## 📦 What's Included

✅ Landing page with Hero, Pricing, FAQ, Testimonials  
✅ Authentication (Google OAuth + Magic Links)  
✅ Stripe subscription checkout & webhooks  
✅ Email system with rate limiting  
✅ Protected routes & middleware  
✅ SEO optimization & meta tags  
✅ Security headers & validation  
✅ Error handling (404, 500, boundaries)  
✅ Analytics ready (Google Analytics)  
✅ TypeScript strict mode  
✅ Production-ready deployment config  

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 💬 Support

- 📖 [Full Documentation](./docs/README.md)
- 🐛 [Report Issues](https://github.com/yourusername/jumpstart/issues)
- 💡 [Feature Requests](https://github.com/yourusername/jumpstart/discussions)

---

**Ready to build your SaaS?** Start with the [Getting Started Guide →](./docs/GETTING_STARTED.md)
