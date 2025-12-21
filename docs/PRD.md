# FLOW Yoga Sequence Builder - Product Requirements Document...

**Version:** 1.0
**Last Updated:** December 2024
**Domain:** https://www.yoga-sequencing.com

---

## Executive Summary

FLOW Yoga Sequence Builder is a professional-grade SaaS tool designed for yoga teachers, studio owners, and serious practitioners. It enables users to create, organize, and export yoga class sequences with an intuitive drag-and-drop interface, comprehensive pose library, and AI-assisted flow building.

The product follows a tool-first philosophy: publicly accessible for discovery, limited functionality without account, expanded capabilities with free registration, and full professional features with paid subscription.

---

## Product Vision

**Mission:** Empower yoga teachers to create professional, safe, and effective class sequences with minimal friction.

**Core Principles:**
1. **SEO-First Architecture** - Every page designed for discoverability
2. **Teacher-Grade Quality** - Professional tool, not a consumer toy
3. **Progressive Access** - Value at every tier, clear upgrade path
4. **Safety-Conscious AI** - Assists without compromising yoga safety standards
5. **Clean, Calm UX** - Premium glassmorphism design, no spiritual clichés

---

## Target Users

### Primary: Yoga Teachers
- Teach 5-20 classes per week
- Need to plan varied sequences
- Value efficiency and professionalism
- Ages 25-55, predominantly female (75%)
- Tech-comfortable but not developers

### Secondary: Studio Owners
- Manage multiple teachers
- Need consistency across staff
- Value shareable, brandable exports

### Tertiary: Teacher Trainees
- Learning sequencing principles
- Need educational pose information
- Budget-conscious, potential long-term users

---

## Competitive Landscape

| Competitor | Strength | Weakness | Our Advantage |
|------------|----------|----------|---------------|
| Tummee | Large pose library | Outdated UI, clunky UX | Modern glassmorphism UI |
| Yoga Glo | Strong content | Not a sequencing tool | Pure tool focus |
| Sequence Wiz | Comprehensive | Complex, steep learning | Simplicity, AI assist |
| Paper/Spreadsheet | Free, flexible | No structure, no sharing | Professional exports |

---

## Feature Tiers

### Tier 0: Public (No Login Required)

**Access:**
- Homepage and all marketing pages
- Complete pose library (browsing and individual pages)
- Flow Builder (severely limited)

**Flow Builder Limits:**
- Maximum 1 flow (not saved)
- Maximum 8 poses per flow
- No saving functionality
- No export functionality
- Session-based only (lost on browser close)

**Purpose:** SEO discovery, product demonstration, conversion funnel entry

---

### Tier 1: Free Account (Email Registration)

**Access:**
- Everything in Tier 0
- Account dashboard
- Flow saving and management

**Flow Builder Limits:**
- Maximum 5 flows total
- Maximum 15 poses per flow
- Save and edit capabilities
- No export functionality
- Very limited AI suggestions (3 per day)

**Purpose:** User acquisition, habit formation, upgrade conversion

---

### Tier 2: Paid Account ($4.99/month)

**Access:**
- Everything in Tier 1
- Unlimited capabilities
- Premium features

**Flow Builder Capabilities:**
- Unlimited flows
- Unlimited poses per flow
- Full drag-and-drop reordering
- Duplicate flows
- Archive/restore flows

**Export Features:**
- PDF export (branded, professional)
- Shareable public links
- Print-optimized layouts

**AI Features:**
- Unlimited AI-assisted flow building
- Smart pose suggestions
- Transition recommendations
- Duration optimization
- Flow analysis and feedback

**Purpose:** Revenue generation, professional tool delivery

---

## Core Features Specification

### 1. Pose Library

#### Data Model

```typescript
interface Pose {
  id: string;                    // UUID
  slug: string;                  // URL-friendly: "downward-facing-dog"
  english_name: string;          // "Downward Facing Dog"
  sanskrit_name: string;         // "Adho Mukha Svanasana"
  sanskrit_name_simplified: string; // "Adho Mukha Svanasana" (no diacritics)

  // Classification
  pose_type: PoseType;           // standing, seated, prone, supine, inversion, arm_balance, twist, backbend, forward_fold, hip_opener, balance
  difficulty: Difficulty;        // beginner, intermediate, advanced

  // Content
  short_description: string;     // 2-3 sentences, SEO optimized
  benefits: string[];            // Array of benefit statements
  cautions: string[];            // Array of caution notes
  contraindications: string[];   // Array of when to avoid

  // Instructions
  breath_cue: string;            // "Exhale as you fold forward"
  alignment_cues: string[];      // Array of alignment instructions
  modifications: string[];       // Array of modification options

  // Relationships
  target_areas: BodyArea[];      // shoulders, hamstrings, spine, etc.
  related_poses: string[];       // Array of pose slugs
  preparatory_poses: string[];   // Poses to do before
  follow_up_poses: string[];     // Poses to do after

  // Media
  image_url: string;             // Primary image
  image_type: 'photo' | 'illustration';
  thumbnail_url: string;         // List view thumbnail

  // Metadata
  created_at: timestamp;
  updated_at: timestamp;
  is_published: boolean;
}

type PoseType =
  | 'standing'
  | 'seated'
  | 'prone'
  | 'supine'
  | 'inversion'
  | 'arm_balance'
  | 'twist'
  | 'backbend'
  | 'forward_fold'
  | 'hip_opener'
  | 'balance'
  | 'restorative';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

type BodyArea =
  | 'shoulders'
  | 'chest'
  | 'upper_back'
  | 'lower_back'
  | 'core'
  | 'hips'
  | 'hamstrings'
  | 'quadriceps'
  | 'calves'
  | 'ankles'
  | 'wrists'
  | 'neck'
  | 'full_body';
```

#### Pose Page Requirements

Each pose page (`/poses/[slug]`) must include:

1. **SEO Metadata**
   - Title: "{English Name} ({Sanskrit Name}) | Yoga Pose Guide"
   - Meta description: Short description (150-160 chars)
   - Open Graph tags
   - Structured data (Schema.org/ExerciseAction)

2. **Content Sections**
   - Hero with pose name and image
   - Quick facts (type, difficulty, target areas)
   - Description
   - Benefits list
   - Step-by-step instructions
   - Alignment cues
   - Modifications
   - Cautions and contraindications
   - Related poses (internal links)
   - CTA to use in Flow Builder

3. **Technical Requirements**
   - Server-rendered (RSC)
   - Static generation where possible
   - Clean semantic HTML
   - Accessible (WCAG 2.1 AA)
   - Mobile responsive

---

### 2. Flow Builder

#### Flow Data Model

```typescript
interface Flow {
  id: string;                    // UUID
  user_id: string;               // Owner's user ID

  // Basic Info
  title: string;                 // "Morning Vinyasa Flow"
  description: string;           // Optional description

  // Classification
  style: FlowStyle;              // vinyasa, hatha, yin, restorative, power
  level: Difficulty;
  duration_minutes: number;      // Target duration

  // Content
  items: FlowItem[];             // Ordered sequence

  // Sharing
  is_public: boolean;            // Shareable via link
  public_slug: string;           // For public URL

  // Metadata
  created_at: timestamp;
  updated_at: timestamp;
  is_archived: boolean;
}

interface FlowItem {
  id: string;                    // UUID for drag-drop
  pose_id: string;               // Reference to pose
  position: number;              // Order in sequence

  // Customization
  duration_seconds: number;      // Hold time
  side: 'both' | 'left' | 'right' | 'center';
  repetitions: number;           // For dynamic poses
  notes: string;                 // Teacher notes
  breath_count: number;          // Alternative to time

  // Transitions
  transition_note: string;       // How to move to next pose
}

type FlowStyle =
  | 'vinyasa'
  | 'hatha'
  | 'yin'
  | 'restorative'
  | 'power'
  | 'gentle'
  | 'prenatal'
  | 'custom';
```

#### Flow Builder UI Requirements

1. **Layout**
   - Two-panel design (desktop): Pose picker + Sequence builder
   - Single column (mobile): Toggle between views
   - Persistent header with flow info and actions

2. **Pose Picker Panel**
   - Search by name (English or Sanskrit)
   - Filter by type, difficulty, target area
   - Quick-add with single click
   - Pose preview on hover

3. **Sequence Panel**
   - Vertical list of flow items
   - Drag-and-drop reordering
   - Inline editing of duration/notes
   - Delete with confirmation
   - Duplicate item action
   - Visual time accumulator

4. **Actions**
   - Save (with tier limits)
   - Clear sequence
   - AI Suggest (paid only)
   - Export (paid only)
   - Share (paid only)

---

### 3. AI Integration

#### Capabilities

1. **Flow Suggestions**
   - Input: Desired duration, style, level, focus areas
   - Output: Complete or partial flow suggestion
   - Always uses existing poses from library
   - Respects sequencing safety (no inversions after backbends, etc.)

2. **Pose Recommendations**
   - "What should come next?" suggestions
   - Based on current sequence context
   - Considers transitions and body mechanics

3. **Duration Optimization**
   - Adjust hold times to meet target duration
   - Intelligent distribution (not just equal time)
   - Respects pose-appropriate minimums

4. **Flow Analysis**
   - Safety check (contraindication conflicts)
   - Balance check (left/right, front/back body)
   - Pacing feedback

#### AI Safety Rules

**MUST:**
- Only suggest poses from the canonical library
- Respect yoga sequencing safety principles
- Provide reasoning for suggestions
- Allow user override of all suggestions

**MUST NOT:**
- Invent new poses
- Rename existing poses
- Override contraindication warnings
- Provide medical advice
- Suggest sequences without proper warm-up/cool-down

---

### 4. Authentication & Authorization

#### Supabase Auth Configuration

**Supported Methods:**
- Email/Password
- Magic Link (passwordless)
- Google OAuth
- Apple OAuth (future)

**User Profile Extension:**

```typescript
interface UserProfile {
  id: string;                    // Matches auth.users.id
  email: string;
  full_name: string;
  avatar_url: string;

  // Subscription
  subscription_tier: 'free' | 'paid';
  subscription_status: 'active' | 'canceled' | 'past_due';
  stripe_customer_id: string;
  stripe_subscription_id: string;

  // Usage Tracking
  flows_created: number;
  ai_suggestions_today: number;
  ai_suggestions_reset_at: timestamp;

  // Preferences
  default_flow_style: FlowStyle;
  default_flow_duration: number;

  // Metadata
  created_at: timestamp;
  updated_at: timestamp;
  last_login_at: timestamp;
}
```

#### Row Level Security (RLS)

```sql
-- Users can only read/write their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can only access their own flows
CREATE POLICY "Users can CRUD own flows"
  ON flows FOR ALL
  USING (auth.uid() = user_id);

-- Public flows are readable by anyone
CREATE POLICY "Public flows are readable"
  ON flows FOR SELECT
  USING (is_public = true);

-- Poses are readable by everyone
CREATE POLICY "Poses are public"
  ON poses FOR SELECT
  USING (is_published = true);
```

---

### 5. Stripe Integration

#### Subscription Model

**Product:** FLOW Pro
**Price:** $4.99/month (USD)
**Billing:** Monthly, auto-renewal
**Trial:** None (freemium model instead)

#### Webhook Events to Handle

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create/update subscription in DB |
| `customer.subscription.updated` | Sync subscription status |
| `customer.subscription.deleted` | Downgrade to free tier |
| `invoice.payment_failed` | Mark as past_due, send email |
| `invoice.paid` | Clear past_due status |

#### Customer Flow

1. User clicks "Upgrade" in app
2. Redirect to Stripe Checkout (hosted)
3. Stripe processes payment
4. Webhook updates user profile
5. User redirected to success page
6. App reflects paid status immediately

---

### 6. Export System (Paid Only)

#### PDF Export

**Layout Options:**
- List view (compact, more poses per page)
- Card view (visual, one pose per section)
- Print-optimized (grayscale friendly)

**Content Includes:**
- Flow title and metadata
- Sequence with pose images
- Duration per pose
- Teacher notes
- Total class duration
- Optional: Alignment cues per pose

**Technical:**
- Server-side PDF generation
- React-PDF or Puppeteer
- Stored temporarily in Supabase Storage
- Download link valid for 24 hours

#### Shareable Links

- Public URL: `yoga-sequencing.com/flow/[public_slug]`
- Read-only view of the flow
- No login required to view
- SEO-friendly (can be indexed if desired)
- Creator can toggle public/private

---

## Page & Route Structure

### Public Routes

```
/                           # Homepage (landing)
/poses                      # Pose library (list/grid)
/poses/[slug]               # Individual pose page
/pricing                    # Pricing page
/about                      # About page
/contact                    # Contact page
/blog                       # Blog index (future)
/blog/[slug]                # Blog post (future)
/flow/[public_slug]         # Public flow view
```

### Authenticated Routes

```
/builder                    # Flow builder (main app)
/dashboard                  # User dashboard
/dashboard/flows            # Flow management
/dashboard/flows/[id]       # Edit specific flow
/dashboard/settings         # User settings
/dashboard/subscription     # Subscription management
```

### API Routes

```
/api/auth/callback          # Supabase auth callback
/api/webhooks/stripe        # Stripe webhook handler
/api/flows                  # Flow CRUD
/api/flows/[id]/export      # Generate PDF
/api/ai/suggest             # AI flow suggestions
/api/ai/analyze             # AI flow analysis
```

---

## SEO Strategy

### Technical SEO

1. **Server-Side Rendering**
   - All public pages use React Server Components
   - Full HTML delivered on first request
   - No client-side-only content for SEO pages

2. **URL Structure**
   - Clean, readable URLs
   - No query parameters for primary content
   - Consistent slug format (lowercase, hyphens)

3. **Metadata**
   - Unique title and description per page
   - Open Graph tags for social sharing
   - Twitter Card tags
   - Canonical URLs

4. **Structured Data**
   - Schema.org/ExerciseAction for poses
   - Schema.org/HowTo for sequences
   - Schema.org/FAQPage where appropriate
   - Schema.org/WebApplication for main app

5. **Performance**
   - Core Web Vitals optimization
   - Image optimization (Next.js Image)
   - Font optimization
   - Code splitting

### Content SEO

1. **Pose Pages (Programmatic)**
   - 100+ pose pages at launch
   - Each page 800-1200 words
   - Unique, valuable content per pose
   - Internal linking between related poses

2. **Blog (Future)**
   - Weekly articles on sequencing
   - "How to sequence for [condition]"
   - "Best poses for [goal]"
   - Teacher tips and techniques

3. **AI Search Optimization**
   - Clear, factual content
   - Structured information (lists, tables)
   - Direct answers to common questions
   - No fluff or filler content

### Link Building (Future)

- Yoga teacher training program partnerships
- Guest posts on yoga education sites
- PR for tool launches/features
- Community building (teacher forums)

---

## Design System

### Color Palette

```css
:root {
  /* Background */
  --bg-base: #FAFAF9;           /* Warm off-white */
  --bg-elevated: #FFFFFF;        /* Pure white for cards */
  --bg-glass: rgba(255, 255, 255, 0.7);

  /* Primary - Sage Green */
  --primary-50: #F0F5F1;
  --primary-100: #D9E6DC;
  --primary-200: #B3CDB8;
  --primary-300: #8DB494;
  --primary-400: #679B70;
  --primary-500: #4A7C54;         /* Main brand color */
  --primary-600: #3B6343;
  --primary-700: #2C4A32;

  /* Neutral - Sand */
  --neutral-50: #FAF9F7;
  --neutral-100: #F5F3F0;
  --neutral-200: #E8E4DF;
  --neutral-300: #D5CFC7;
  --neutral-400: #B8AFA3;
  --neutral-500: #9A8F80;
  --neutral-600: #7C7268;
  --neutral-700: #5E564F;
  --neutral-800: #403B36;
  --neutral-900: #221F1C;

  /* Accent - Lavender */
  --accent-100: #F3F0F7;
  --accent-200: #E1D9ED;
  --accent-300: #C4B5D6;
  --accent-400: #A791BF;
  --accent-500: #8A6DA8;

  /* Semantic */
  --success: #4A7C54;
  --warning: #C9A962;
  --error: #C45D5D;
  --info: #5D8AC4;
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Plus Jakarta Sans', var(--font-sans);

  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
}
```

### Glassmorphism Tokens

```css
:root {
  /* Glass Effect */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  --glass-blur: blur(12px);

  /* Elevation */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.10);

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

### Animation Tokens

```css
:root {
  /* Timing */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;

  /* Easing */
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Success Metrics

### North Star Metric
**Monthly Active Flow Creators** - Users who create or edit at least one flow per month

### Primary Metrics

| Metric | Target (Month 6) | Target (Month 12) |
|--------|------------------|-------------------|
| Monthly Active Users | 5,000 | 15,000 |
| Paid Subscribers | 250 | 1,000 |
| Conversion Rate (Free → Paid) | 5% | 8% |
| Monthly Recurring Revenue | $1,250 | $5,000 |

### Secondary Metrics

- Pose page views (SEO health)
- Time in Flow Builder (engagement)
- Flows created per user (value delivery)
- Export usage (paid feature adoption)
- Churn rate (retention health)

---

## Launch Phases

### Phase 1: MVP (Month 1-2)
- Core pose library (50 poses)
- Basic flow builder (no AI)
- Supabase auth
- Stripe payments
- Basic export (PDF)

### Phase 2: Growth (Month 3-4)
- Expanded pose library (100+ poses)
- AI suggestions (basic)
- Public flow sharing
- SEO optimization
- Blog foundation

### Phase 3: Polish (Month 5-6)
- Full AI integration
- Advanced exports
- Mobile optimization
- User feedback integration
- Performance optimization

---

## Technical Architecture

### Frontend (Next.js 14+)

```
src/
├── app/                    # App Router pages
│   ├── (marketing)/        # Public marketing pages
│   ├── (app)/              # Authenticated app pages
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Design system components
│   ├── poses/              # Pose-related components
│   ├── flows/              # Flow builder components
│   └── shared/             # Shared components
├── lib/
│   ├── supabase/           # Supabase client & utils
│   ├── stripe/             # Stripe integration
│   └── ai/                 # AI integration
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
└── styles/                 # Global styles
```

### Backend (Supabase)

- **Database:** PostgreSQL with RLS
- **Auth:** Supabase Auth with OAuth
- **Storage:** Pose images, PDF exports
- **Edge Functions:** AI integration, complex operations

### Infrastructure (Vercel)

- **Hosting:** Vercel Pro
- **Analytics:** Vercel Analytics
- **Edge:** Edge runtime for auth checks
- **Caching:** ISR for pose pages

---

## Appendix

### A. Pose Library Initial Set

MVP will launch with 50 foundational poses across all categories:
- 10 Standing poses
- 8 Seated poses
- 6 Prone poses
- 6 Supine poses
- 5 Inversions
- 4 Arm balances
- 6 Twists
- 5 Backbends

### B. Competitor Analysis Details

[Detailed competitor analysis in separate document]

### C. User Research Summary

[User interview findings in separate document]

---

*Document maintained by Product Team. Last review: December 2024*
