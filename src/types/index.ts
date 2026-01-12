// ============================================
// FLOW Yoga Sequence Builder - Type Definitions
// ============================================

// --------------------------------------------
// Enums (matching database)
// --------------------------------------------

export type PoseType =
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

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type BodyArea =
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

export type FlowStyle =
  | 'vinyasa'
  | 'hatha'
  | 'yin'
  | 'restorative'
  | 'power'
  | 'gentle'
  | 'prenatal'
  | 'custom';

export type SubscriptionTier = 'free' | 'paid';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export type ImageType = 'photo' | 'illustration';

export type PoseSide = 'both' | 'left' | 'right' | 'center';

// --------------------------------------------
// Database Models
// --------------------------------------------

export interface Pose {
  id: string;
  slug: string;
  english_name: string;
  sanskrit_name: string | null;
  sanskrit_name_simplified: string | null;
  pose_type: PoseType;
  difficulty: Difficulty;
  short_description: string;
  long_description: string | null;
  benefits: string[];
  cautions: string[];
  contraindications: string[];
  breath_cue: string | null;
  alignment_cues: string[];
  modifications: string[];
  step_by_step: string[];
  target_areas: BodyArea[];
  image_url: string | null;
  thumbnail_url: string | null;
  image_type: ImageType;
  image_alt_text: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PoseRelationship {
  id: string;
  pose_id: string;
  related_pose_id: string;
  relationship_type: 'related' | 'preparatory' | 'follow_up' | 'variation';
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_current_period_end: string | null;
  flows_created: number;
  flows_saved_today: number;
  flows_saved_reset_at: string;
  ai_suggestions_today: number;
  ai_suggestions_reset_at: string;
  default_flow_style: FlowStyle;
  default_flow_duration: number;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface Flow {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  style: FlowStyle;
  level: Difficulty;
  duration_minutes: number;
  is_public: boolean;
  public_slug: string | null;
  share_expires_at: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface FlowItem {
  id: string;
  flow_id: string;
  pose_id: string;
  position: number;
  duration_seconds: number;
  side: PoseSide;
  repetitions: number;
  breath_count: number | null;
  notes: string | null;
  transition_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface AISuggestionLog {
  id: string;
  user_id: string | null;
  suggestion_type: 'flow_generation' | 'pose_suggestion' | 'duration_optimization' | 'flow_analysis';
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown> | null;
  tokens_used: number | null;
  created_at: string;
}

export interface Export {
  id: string;
  user_id: string;
  flow_id: string;
  export_type: 'pdf' | 'link';
  file_url: string | null;
  expires_at: string | null;
  created_at: string;
}

// --------------------------------------------
// Extended Types (with joins)
// --------------------------------------------

export interface FlowWithItems extends Flow {
  items: FlowItemWithPose[];
  total_duration_seconds: number;
  pose_count: number;
}

export interface FlowItemWithPose extends FlowItem {
  pose: Pose;
}

export interface PoseWithRelationships extends Pose {
  related_poses: Pose[];
  preparatory_poses: Pose[];
  follow_up_poses: Pose[];
  variations: Pose[];
}

// --------------------------------------------
// UI State Types
// --------------------------------------------

export interface FlowBuilderState {
  flow: Flow | null;
  items: FlowItemWithPose[];
  selectedPoseId: string | null;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PoseFilterState {
  search: string;
  poseType: PoseType | null;
  difficulty: Difficulty | null;
  targetArea: BodyArea | null;
}

// --------------------------------------------
// API Response Types
// --------------------------------------------

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// --------------------------------------------
// AI Types
// --------------------------------------------

export interface AIFlowSuggestionRequest {
  duration_minutes: number;
  style: FlowStyle;
  level: Difficulty;
  focus_areas: BodyArea[];
  include_poses?: string[];
  exclude_poses?: string[];
}

export interface AIFlowSuggestion {
  items: {
    pose_id: string;
    duration_seconds: number;
    side: PoseSide;
    notes: string;
  }[];
  reasoning: string;
}

export interface AIPoseSuggestionRequest {
  current_flow: FlowItem[];
  context: 'next_pose' | 'transition' | 'counter_pose';
}

export interface AIPoseSuggestion {
  suggested_poses: {
    pose_id: string;
    reason: string;
    confidence: number;
  }[];
}

// --------------------------------------------
// Form Types
// --------------------------------------------

export interface CreateFlowInput {
  title: string;
  description?: string;
  style: FlowStyle;
  level: Difficulty;
  duration_minutes: number;
}

export interface UpdateFlowInput extends Partial<CreateFlowInput> {
  is_public?: boolean;
  is_archived?: boolean;
}

export interface CreateFlowItemInput {
  pose_id: string;
  position: number;
  duration_seconds?: number;
  side?: PoseSide;
  repetitions?: number;
  breath_count?: number;
  notes?: string;
  transition_note?: string;
}

export interface UpdateFlowItemInput extends Partial<Omit<CreateFlowItemInput, 'pose_id'>> {}

// --------------------------------------------
// Session & Auth Types
// --------------------------------------------

export interface UserSession {
  user: {
    id: string;
    email: string;
  };
  profile: Profile;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserSession | null;
}

// --------------------------------------------
// Tier Limits
// --------------------------------------------

export const TIER_LIMITS = {
  anonymous: {
    maxFlows: 1,
    maxPosesPerFlow: 8,
    canSave: false,
    canExport: false,
    aiSuggestionsPerDay: 0,
    flowSavesPerDay: 0,
  },
  free: {
    maxFlows: 5,
    maxPosesPerFlow: 10,
    canSave: true,
    canExport: false,
    aiSuggestionsPerDay: 3,
    flowSavesPerDay: 1,
  },
  paid: {
    maxFlows: Infinity,
    maxPosesPerFlow: Infinity,
    canSave: true,
    canExport: true,
    aiSuggestionsPerDay: Infinity,
    flowSavesPerDay: Infinity,
  },
} as const;

export type TierType = keyof typeof TIER_LIMITS;
