// ============================================
// Pose Types and Interfaces
// ============================================

// Enum types matching database
export type PoseStatus = 'draft' | 'published' | 'archived';
export type PoseDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type PoseType =
  | 'standing'
  | 'seated'
  | 'balancing'
  | 'backbend'
  | 'twist'
  | 'inversion'
  | 'arm_balance'
  | 'hip_opening'
  | 'forward_fold'
  | 'restorative'
  | 'prone'
  | 'supine'
  | 'kneeling';

export type BodyFocus =
  | 'hips'
  | 'hamstrings'
  | 'shoulders'
  | 'spine'
  | 'core'
  | 'legs'
  | 'glutes'
  | 'chest'
  | 'neck'
  | 'wrists'
  | 'ankles'
  | 'full_body';

// Full Pose interface
export interface Pose {
  id: string;
  slug: string;

  // Basic Information
  english_name: string;
  sanskrit_name: string | null;
  sanskrit_name_simplified: string | null;
  pronunciation: string | null;

  // Descriptions
  short_description: string | null;
  description: string | null;

  // Instructions (JSONB arrays)
  benefits: string[];
  cautions: string[];
  contraindications: string[];
  step_by_step: string[];
  alignment_cues: string[];
  modifications: string[];
  variations: string[];
  breath_cue: string | null;

  // Classification
  difficulty: PoseDifficulty;
  pose_type: PoseType | null;
  secondary_pose_type: PoseType | null;
  primary_focus: BodyFocus | null;
  secondary_focus: BodyFocus[] | null;

  // Tags and Categories
  tags: string[];
  equipment: string[];

  // Pose Characteristics
  duration_hint_seconds: number | null;
  is_peak_pose: boolean;
  is_warmup: boolean;
  is_cooldown: boolean;
  is_bilateral: boolean;

  // Image fields
  image_path: string | null;
  image_url: string | null;
  image_alt: string | null;
  thumbnail_path: string | null;
  thumbnail_url: string | null;

  // SEO fields
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;

  // Status
  status: PoseStatus;

  // Bulk import tracking
  image_original_filename: string | null;
  import_batch_id: string | null;

  // Audit
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// Form data type (for creating/editing)
export interface PoseFormData {
  english_name: string;
  sanskrit_name: string;
  sanskrit_name_simplified: string;
  pronunciation: string;
  short_description: string;
  description: string;
  benefits: string[];
  cautions: string[];
  contraindications: string[];
  step_by_step: string[];
  alignment_cues: string[];
  modifications: string[];
  variations: string[];
  breath_cue: string;
  difficulty: PoseDifficulty;
  pose_type: PoseType | '';
  secondary_pose_type: PoseType | '';
  primary_focus: BodyFocus | '';
  secondary_focus: BodyFocus[];
  tags: string[];
  equipment: string[];
  duration_hint_seconds: number | null;
  is_peak_pose: boolean;
  is_warmup: boolean;
  is_cooldown: boolean;
  is_bilateral: boolean;
  image_alt: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  status: PoseStatus;
}

// List item for admin table
export interface PoseListItem {
  id: string;
  slug: string;
  english_name: string;
  sanskrit_name: string | null;
  difficulty: PoseDifficulty;
  pose_type: PoseType | null;
  secondary_pose_type: PoseType | null;
  status: PoseStatus;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  has_image: boolean;
}

// Filter options
export interface PoseFilters {
  search: string;
  status: PoseStatus | 'all';
  difficulty: PoseDifficulty | 'all';
  pose_type: PoseType | 'all';
}

// Constants for UI
export const POSE_DIFFICULTIES: { value: PoseDifficulty; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const POSE_TYPES: { value: PoseType; label: string }[] = [
  { value: 'standing', label: 'Standing' },
  { value: 'seated', label: 'Seated' },
  { value: 'balancing', label: 'Balancing' },
  { value: 'backbend', label: 'Backbend' },
  { value: 'twist', label: 'Twist' },
  { value: 'inversion', label: 'Inversion' },
  { value: 'arm_balance', label: 'Arm Balance' },
  { value: 'hip_opening', label: 'Hip Opening' },
  { value: 'forward_fold', label: 'Forward Fold' },
  { value: 'restorative', label: 'Restorative' },
  { value: 'prone', label: 'Prone' },
  { value: 'supine', label: 'Supine' },
  { value: 'kneeling', label: 'Kneeling' },
];

export const BODY_FOCUS_OPTIONS: { value: BodyFocus; label: string }[] = [
  { value: 'hips', label: 'Hips' },
  { value: 'hamstrings', label: 'Hamstrings' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'spine', label: 'Spine' },
  { value: 'core', label: 'Core' },
  { value: 'legs', label: 'Legs' },
  { value: 'glutes', label: 'Glutes' },
  { value: 'chest', label: 'Chest' },
  { value: 'neck', label: 'Neck' },
  { value: 'wrists', label: 'Wrists' },
  { value: 'ankles', label: 'Ankles' },
  { value: 'full_body', label: 'Full Body' },
];

export const POSE_STATUSES: { value: PoseStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Draft', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'published', label: 'Published', color: 'bg-green-100 text-green-800' },
  { value: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-800' },
];

// Common equipment options
export const COMMON_EQUIPMENT = [
  'Yoga Mat',
  'Yoga Block',
  'Yoga Strap',
  'Bolster',
  'Blanket',
  'Wall',
  'Chair',
  'Wheel',
];

// Common tags
export const COMMON_TAGS = [
  'Strength',
  'Flexibility',
  'Balance',
  'Relaxation',
  'Energy',
  'Grounding',
  'Heart Opening',
  'Hip Opening',
  'Detox',
  'Stress Relief',
  'Morning',
  'Evening',
  'Prenatal',
  'Restorative',
];
