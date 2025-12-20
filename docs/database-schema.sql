-- ============================================
-- FLOW Yoga Sequence Builder
-- Supabase Database Schema
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For fuzzy text search

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE pose_type AS ENUM (
  'standing',
  'seated',
  'prone',
  'supine',
  'inversion',
  'arm_balance',
  'twist',
  'backbend',
  'forward_fold',
  'hip_opener',
  'balance',
  'restorative'
);

CREATE TYPE difficulty_level AS ENUM (
  'beginner',
  'intermediate',
  'advanced'
);

CREATE TYPE body_area AS ENUM (
  'shoulders',
  'chest',
  'upper_back',
  'lower_back',
  'core',
  'hips',
  'hamstrings',
  'quadriceps',
  'calves',
  'ankles',
  'wrists',
  'neck',
  'full_body'
);

CREATE TYPE flow_style AS ENUM (
  'vinyasa',
  'hatha',
  'yin',
  'restorative',
  'power',
  'gentle',
  'prenatal',
  'custom'
);

CREATE TYPE subscription_tier AS ENUM (
  'free',
  'paid'
);

CREATE TYPE subscription_status AS ENUM (
  'active',
  'canceled',
  'past_due',
  'trialing'
);

CREATE TYPE image_type AS ENUM (
  'photo',
  'illustration'
);

CREATE TYPE pose_side AS ENUM (
  'both',
  'left',
  'right',
  'center'
);

-- ============================================
-- TABLES
-- ============================================

-- --------------------------------------------
-- User Profiles (extends Supabase Auth)
-- --------------------------------------------
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,

  -- Subscription
  subscription_tier subscription_tier DEFAULT 'free' NOT NULL,
  subscription_status subscription_status DEFAULT 'active' NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_current_period_end TIMESTAMPTZ,

  -- Usage Tracking
  flows_created INTEGER DEFAULT 0 NOT NULL,
  ai_suggestions_today INTEGER DEFAULT 0 NOT NULL,
  ai_suggestions_reset_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Preferences
  default_flow_style flow_style DEFAULT 'vinyasa',
  default_flow_duration INTEGER DEFAULT 60,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for Stripe lookups
CREATE INDEX idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX idx_profiles_stripe_subscription ON profiles(stripe_subscription_id);

-- --------------------------------------------
-- Poses (The core content)
-- --------------------------------------------
CREATE TABLE poses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,

  -- Names
  english_name TEXT NOT NULL,
  sanskrit_name TEXT,
  sanskrit_name_simplified TEXT,

  -- Classification
  pose_type pose_type NOT NULL,
  difficulty difficulty_level NOT NULL,

  -- Content (SEO-optimized)
  short_description TEXT NOT NULL,  -- 2-3 sentences, 150-160 chars for meta
  long_description TEXT,             -- Full detailed description
  benefits TEXT[] DEFAULT '{}',
  cautions TEXT[] DEFAULT '{}',
  contraindications TEXT[] DEFAULT '{}',

  -- Instructions
  breath_cue TEXT,
  alignment_cues TEXT[] DEFAULT '{}',
  modifications TEXT[] DEFAULT '{}',
  step_by_step TEXT[] DEFAULT '{}',

  -- Relationships
  target_areas body_area[] DEFAULT '{}',

  -- Media
  image_url TEXT,
  thumbnail_url TEXT,
  image_type image_type DEFAULT 'illustration',
  image_alt_text TEXT,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Metadata
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for search and filtering
CREATE INDEX idx_poses_slug ON poses(slug);
CREATE INDEX idx_poses_pose_type ON poses(pose_type);
CREATE INDEX idx_poses_difficulty ON poses(difficulty);
CREATE INDEX idx_poses_published ON poses(is_published);
CREATE INDEX idx_poses_english_name_trgm ON poses USING gin(english_name gin_trgm_ops);
CREATE INDEX idx_poses_sanskrit_name_trgm ON poses USING gin(sanskrit_name gin_trgm_ops);
CREATE INDEX idx_poses_target_areas ON poses USING gin(target_areas);

-- --------------------------------------------
-- Pose Relationships (for internal linking)
-- --------------------------------------------
CREATE TABLE pose_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pose_id UUID NOT NULL REFERENCES poses(id) ON DELETE CASCADE,
  related_pose_id UUID NOT NULL REFERENCES poses(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('related', 'preparatory', 'follow_up', 'variation')),

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Prevent duplicate relationships
  UNIQUE(pose_id, related_pose_id, relationship_type),
  -- Prevent self-referential relationships
  CHECK (pose_id != related_pose_id)
);

CREATE INDEX idx_pose_relationships_pose ON pose_relationships(pose_id);
CREATE INDEX idx_pose_relationships_related ON pose_relationships(related_pose_id);

-- --------------------------------------------
-- Flows (User sequences)
-- --------------------------------------------
CREATE TABLE flows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Basic Info
  title TEXT NOT NULL DEFAULT 'Untitled Flow',
  description TEXT,

  -- Classification
  style flow_style DEFAULT 'vinyasa' NOT NULL,
  level difficulty_level DEFAULT 'beginner' NOT NULL,
  duration_minutes INTEGER DEFAULT 60 NOT NULL,

  -- Sharing
  is_public BOOLEAN DEFAULT false NOT NULL,
  public_slug TEXT UNIQUE,

  -- State
  is_archived BOOLEAN DEFAULT false NOT NULL,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_flows_user ON flows(user_id);
CREATE INDEX idx_flows_public ON flows(is_public) WHERE is_public = true;
CREATE INDEX idx_flows_public_slug ON flows(public_slug) WHERE public_slug IS NOT NULL;
CREATE INDEX idx_flows_archived ON flows(is_archived);

-- --------------------------------------------
-- Flow Items (Poses in a sequence)
-- --------------------------------------------
CREATE TABLE flow_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flow_id UUID NOT NULL REFERENCES flows(id) ON DELETE CASCADE,
  pose_id UUID NOT NULL REFERENCES poses(id) ON DELETE RESTRICT,

  -- Ordering
  position INTEGER NOT NULL,

  -- Customization
  duration_seconds INTEGER DEFAULT 30 NOT NULL,
  side pose_side DEFAULT 'both' NOT NULL,
  repetitions INTEGER DEFAULT 1 NOT NULL,
  breath_count INTEGER,
  notes TEXT,
  transition_note TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Ensure unique positioning within a flow
  UNIQUE(flow_id, position)
);

-- Index for efficient flow item retrieval
CREATE INDEX idx_flow_items_flow ON flow_items(flow_id);
CREATE INDEX idx_flow_items_position ON flow_items(flow_id, position);

-- --------------------------------------------
-- AI Suggestion Log (for analytics and limiting)
-- --------------------------------------------
CREATE TABLE ai_suggestion_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Request
  suggestion_type TEXT NOT NULL CHECK (suggestion_type IN ('flow_generation', 'pose_suggestion', 'duration_optimization', 'flow_analysis')),
  input_data JSONB NOT NULL,

  -- Response
  output_data JSONB,
  tokens_used INTEGER,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_ai_logs_user ON ai_suggestion_logs(user_id);
CREATE INDEX idx_ai_logs_created ON ai_suggestion_logs(created_at);
CREATE INDEX idx_ai_logs_type ON ai_suggestion_logs(suggestion_type);

-- --------------------------------------------
-- Export History (for paid users)
-- --------------------------------------------
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  flow_id UUID NOT NULL REFERENCES flows(id) ON DELETE CASCADE,

  -- Export Details
  export_type TEXT NOT NULL CHECK (export_type IN ('pdf', 'link')),
  file_url TEXT,  -- For PDFs stored in Supabase Storage

  -- For link exports
  expires_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_exports_user ON exports(user_id);
CREATE INDEX idx_exports_flow ON exports(flow_id);

-- --------------------------------------------
-- Waitlist / Early Access (optional)
-- --------------------------------------------
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,  -- Where they signed up from
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Generate unique public slug for flows
CREATE OR REPLACE FUNCTION generate_public_slug()
RETURNS TEXT AS $$
DECLARE
  new_slug TEXT;
  slug_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 8-character alphanumeric slug
    new_slug := lower(substring(md5(random()::text) from 1 for 8));

    -- Check if slug exists
    SELECT EXISTS(SELECT 1 FROM flows WHERE public_slug = new_slug) INTO slug_exists;

    EXIT WHEN NOT slug_exists;
  END LOOP;

  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;

-- Reset daily AI suggestion count
CREATE OR REPLACE FUNCTION reset_ai_suggestions_if_needed()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ai_suggestions_reset_at < NOW() - INTERVAL '1 day' THEN
    NEW.ai_suggestions_today := 0;
    NEW.ai_suggestions_reset_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Increment flow count for user
CREATE OR REPLACE FUNCTION increment_user_flow_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET flows_created = flows_created + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Decrement flow count for user
CREATE OR REPLACE FUNCTION decrement_user_flow_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET flows_created = GREATEST(0, flows_created - 1)
  WHERE id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Auto-generate public slug when flow is made public
CREATE OR REPLACE FUNCTION auto_generate_public_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public = true AND (OLD.is_public = false OR OLD.public_slug IS NULL) THEN
    NEW.public_slug := generate_public_slug();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_poses_updated_at
  BEFORE UPDATE ON poses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_flows_updated_at
  BEFORE UPDATE ON flows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_flow_items_updated_at
  BEFORE UPDATE ON flow_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- AI suggestion reset trigger
CREATE TRIGGER check_ai_suggestion_reset
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION reset_ai_suggestions_if_needed();

-- Flow count triggers
CREATE TRIGGER increment_flow_count_on_create
  AFTER INSERT ON flows
  FOR EACH ROW EXECUTE FUNCTION increment_user_flow_count();

CREATE TRIGGER decrement_flow_count_on_delete
  AFTER DELETE ON flows
  FOR EACH ROW EXECUTE FUNCTION decrement_user_flow_count();

-- Auto-generate public slug
CREATE TRIGGER auto_public_slug
  BEFORE UPDATE ON flows
  FOR EACH ROW EXECUTE FUNCTION auto_generate_public_slug();

-- New user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE poses ENABLE ROW LEVEL SECURITY;
ALTER TABLE pose_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE flow_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_suggestion_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exports ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only access their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Poses: Everyone can read published poses
CREATE POLICY "Published poses are viewable by everyone"
  ON poses FOR SELECT
  USING (is_published = true);

-- Pose Relationships: Everyone can read
CREATE POLICY "Pose relationships are viewable by everyone"
  ON pose_relationships FOR SELECT
  USING (true);

-- Flows: Users can CRUD their own flows
CREATE POLICY "Users can view own flows"
  ON flows FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flows"
  ON flows FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flows"
  ON flows FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flows"
  ON flows FOR DELETE
  USING (auth.uid() = user_id);

-- Flows: Public flows are viewable by everyone
CREATE POLICY "Public flows are viewable by everyone"
  ON flows FOR SELECT
  USING (is_public = true);

-- Flow Items: Users can CRUD items in their own flows
CREATE POLICY "Users can view own flow items"
  ON flow_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM flows
      WHERE flows.id = flow_items.flow_id
      AND flows.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own flow items"
  ON flow_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM flows
      WHERE flows.id = flow_items.flow_id
      AND flows.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own flow items"
  ON flow_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM flows
      WHERE flows.id = flow_items.flow_id
      AND flows.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own flow items"
  ON flow_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM flows
      WHERE flows.id = flow_items.flow_id
      AND flows.user_id = auth.uid()
    )
  );

-- Flow Items: Viewable for public flows
CREATE POLICY "Public flow items are viewable by everyone"
  ON flow_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM flows
      WHERE flows.id = flow_items.flow_id
      AND flows.is_public = true
    )
  );

-- AI Logs: Users can only view their own logs
CREATE POLICY "Users can view own AI logs"
  ON ai_suggestion_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI logs"
  ON ai_suggestion_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Exports: Users can only access their own exports
CREATE POLICY "Users can view own exports"
  ON exports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exports"
  ON exports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- VIEWS (for convenience)
-- ============================================

-- Flow with calculated total duration
CREATE VIEW flows_with_duration AS
SELECT
  f.*,
  COALESCE(SUM(fi.duration_seconds), 0) AS calculated_duration_seconds,
  COALESCE(COUNT(fi.id), 0) AS pose_count
FROM flows f
LEFT JOIN flow_items fi ON f.id = fi.flow_id
GROUP BY f.id;

-- Pose with relationship counts
CREATE VIEW poses_with_relationships AS
SELECT
  p.*,
  (SELECT COUNT(*) FROM pose_relationships pr WHERE pr.pose_id = p.id AND pr.relationship_type = 'related') AS related_count,
  (SELECT COUNT(*) FROM pose_relationships pr WHERE pr.pose_id = p.id AND pr.relationship_type = 'preparatory') AS preparatory_count,
  (SELECT COUNT(*) FROM pose_relationships pr WHERE pr.pose_id = p.id AND pr.relationship_type = 'follow_up') AS follow_up_count
FROM poses p;

-- ============================================
-- INITIAL SEED DATA (Sample poses)
-- ============================================

-- This would be populated via a separate seed file or admin interface
-- Here's a sample insert for reference:

/*
INSERT INTO poses (
  slug,
  english_name,
  sanskrit_name,
  sanskrit_name_simplified,
  pose_type,
  difficulty,
  short_description,
  benefits,
  cautions,
  contraindications,
  breath_cue,
  alignment_cues,
  target_areas,
  is_published
) VALUES (
  'downward-facing-dog',
  'Downward Facing Dog',
  'Adho Mukha Svanasana',
  'Adho Mukha Svanasana',
  'inversion',
  'beginner',
  'A foundational yoga pose that stretches the entire back body while strengthening the arms and legs. The body forms an inverted V-shape.',
  ARRAY['Stretches hamstrings, calves, and spine', 'Strengthens arms and shoulders', 'Calms the nervous system', 'Improves circulation'],
  ARRAY['Go easy if you have wrist issues', 'Bend knees if hamstrings are tight'],
  ARRAY['Carpal tunnel syndrome', 'Late-term pregnancy', 'High blood pressure', 'Detached retina'],
  'Exhale as you press hips up and back',
  ARRAY['Hands shoulder-width apart, fingers spread wide', 'Feet hip-width apart', 'Press weight evenly through hands', 'Relax the neck, let head hang'],
  ARRAY['hamstrings', 'calves', 'shoulders', 'upper_back']::body_area[],
  true
);
*/

-- ============================================
-- STORAGE BUCKETS (Supabase Storage)
-- ============================================

-- Note: These are created via Supabase Dashboard or API
-- Documented here for reference:

-- Bucket: pose-images
-- Public: Yes
-- Allowed types: image/png, image/jpeg, image/webp
-- Max file size: 5MB

-- Bucket: exports
-- Public: No (signed URLs)
-- Allowed types: application/pdf
-- Max file size: 10MB
-- Auto-delete after: 24 hours

-- Bucket: user-avatars
-- Public: Yes
-- Allowed types: image/png, image/jpeg, image/webp
-- Max file size: 2MB
