# FLOW Yoga Sequence Builder - Project Summary

## Overview

FLOW is a production-grade Yoga SaaS application for yoga teachers to create, organize, and share professional class sequences.

**Domain:** https://www.yoga-sequencing.com
**Price:** $4.99/month for Pro tier

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 15 (App Router) |
| Styling | Tailwind CSS + Custom Glassmorphism Design |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| Payments | Stripe |
| Drag & Drop | @dnd-kit |
| Animations | Framer Motion |
| Icons | Lucide React |
| Hosting | Vercel |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (login, signup)
│   ├── api/                      # API routes
│   │   ├── auth/                 # Auth callback & signout
│   │   ├── checkout/             # Stripe checkout
│   │   └── webhooks/stripe/      # Stripe webhooks
│   ├── builder/                  # Flow Builder page
│   ├── dashboard/                # User dashboard
│   ├── poses/                    # Pose library
│   │   └── [slug]/               # Individual pose pages
│   ├── pricing/                  # Pricing page
│   ├── globals.css               # Design system
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   ├── flows/                    # Flow builder components
│   ├── layout/                   # Header, Footer
│   ├── poses/                    # Pose components
│   ├── shared/                   # Shared components
│   └── ui/                       # Design system components
├── data/
│   └── poses.ts                  # Sample pose data
├── hooks/                        # Custom React hooks
├── lib/
│   ├── supabase/                 # Supabase client & server
│   ├── stripe/                   # Stripe client
│   └── utils/                    # Utility functions
└── types/                        # TypeScript definitions

docs/
├── PRD.md                        # Product Requirements Document
├── database-schema.sql           # Supabase SQL schema
└── PROJECT_SUMMARY.md            # This file
```

---

## Key Features

### Public (No Login Required)
- Homepage with value proposition
- Full pose library access
- Individual SEO-optimized pose pages
- Flow Builder (limited: 1 flow, 8 poses, no saving)

### Free Account
- Up to 5 saved flows
- Up to 15 poses per flow
- Save and edit capabilities
- 3 AI suggestions per day

### Pro Account ($4.99/month)
- Unlimited flows
- Unlimited poses per flow
- Unlimited AI suggestions
- PDF export
- Shareable public links
- Priority support

---

## Design System

### Color Palette
- **Primary:** Sage Green (#4A7C54)
- **Neutral:** Warm Sand tones
- **Accent:** Muted Lavender

### UI Style
- Light glassmorphism
- Soft backdrop blur effects
- Generous white space
- Subtle shadows and borders
- Framer-style hover animations

---

## Database Schema

### Core Tables
1. **profiles** - User accounts and subscription data
2. **poses** - Yoga pose library
3. **pose_relationships** - Pose connections (related, preparatory, follow-up)
4. **flows** - User yoga sequences
5. **flow_items** - Poses within flows
6. **ai_suggestion_logs** - AI usage tracking
7. **exports** - Export history

### Security
- Row Level Security (RLS) on all tables
- Users can only access their own data
- Public poses readable by everyone
- Public flows viewable by link

---

## SEO Strategy

### Technical SEO
- Server-side rendering (RSC)
- Clean, semantic URLs
- Unique meta tags per page
- Structured data (Schema.org)
- Open Graph tags

### Content SEO
- 10+ sample poses with full content
- Individual pose pages with:
  - English and Sanskrit names
  - Step-by-step instructions
  - Benefits and cautions
  - Related poses (internal linking)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
# Fill in your Supabase and Stripe keys
```

### 3. Set Up Supabase
- Create a new Supabase project
- Run the SQL schema from `docs/database-schema.sql`
- Enable Google OAuth in Auth settings

### 4. Set Up Stripe
- Create a Stripe account
- Create a product with a $4.99/month price
- Set up webhook endpoints

### 5. Run Development Server
```bash
npm run dev
```

---

## Deployment

### Vercel Deployment
1. Connect your GitHub repository
2. Add environment variables
3. Deploy

### Stripe Webhook
Add webhook endpoint: `https://your-domain.com/api/webhooks/stripe`

Events to listen for:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`
- `invoice.paid`

---

## File Reference

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage |
| `src/app/poses/page.tsx` | Pose library |
| `src/app/poses/[slug]/page.tsx` | Individual pose page |
| `src/app/builder/page.tsx` | Flow Builder |
| `src/app/pricing/page.tsx` | Pricing page |
| `src/app/dashboard/page.tsx` | User dashboard |
| `src/components/ui/*.tsx` | UI components |
| `src/components/flows/SortableFlowItem.tsx` | Drag-drop flow item |
| `src/data/poses.ts` | Sample pose data |
| `docs/database-schema.sql` | Database schema |

---

## Next Steps

1. **Add more poses** - Expand from 10 to 100+ poses
2. **Implement AI suggestions** - OpenAI integration
3. **Add PDF export** - React-PDF or Puppeteer
4. **Add public flow sharing** - Generate shareable links
5. **Mobile optimization** - Improve touch interactions
6. **Analytics** - Vercel Analytics or Plausible

---

*Last updated: December 2024*
