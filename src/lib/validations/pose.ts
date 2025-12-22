import { z } from 'zod';

// Enum schemas
export const poseStatusSchema = z.enum(['draft', 'published', 'archived']);
export const poseDifficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);
export const poseTypeSchema = z.enum([
  'standing',
  'seated',
  'balancing',
  'backbend',
  'twist',
  'inversion',
  'arm_balance',
  'hip_opening',
  'forward_fold',
  'restorative',
  'prone',
  'supine',
  'kneeling',
]);
export const bodyFocusSchema = z.enum([
  'hips',
  'hamstrings',
  'shoulders',
  'spine',
  'core',
  'legs',
  'glutes',
  'chest',
  'neck',
  'wrists',
  'ankles',
  'full_body',
]);

// Main pose form schema
export const poseFormSchema = z.object({
  // Required fields
  english_name: z
    .string()
    .min(2, 'English name must be at least 2 characters')
    .max(100, 'English name must be less than 100 characters'),

  // Optional text fields
  sanskrit_name: z.string().max(100).optional().default(''),
  sanskrit_name_simplified: z.string().max(100).optional().default(''),
  pronunciation: z.string().max(200).optional().default(''),
  short_description: z.string().max(300).optional().default(''),
  description: z.string().optional().default(''),
  breath_cue: z.string().max(500).optional().default(''),

  // Array fields
  benefits: z.array(z.string()).default([]),
  cautions: z.array(z.string()).default([]),
  contraindications: z.array(z.string()).default([]),
  step_by_step: z.array(z.string()).default([]),
  alignment_cues: z.array(z.string()).default([]),
  modifications: z.array(z.string()).default([]),
  variations: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  equipment: z.array(z.string()).default([]),

  // Classification
  difficulty: poseDifficultySchema.default('beginner'),
  pose_type: poseTypeSchema.nullable().optional(),
  primary_focus: bodyFocusSchema.nullable().optional(),
  secondary_focus: z.array(bodyFocusSchema).default([]),

  // Characteristics
  duration_hint_seconds: z.number().int().positive().nullable().optional(),
  is_peak_pose: z.boolean().default(false),
  is_warmup: z.boolean().default(false),
  is_cooldown: z.boolean().default(false),
  is_bilateral: z.boolean().default(true),

  // Image
  image_alt: z.string().max(200).optional().default(''),

  // SEO
  meta_title: z.string().max(70).optional().default(''),
  meta_description: z.string().max(160).optional().default(''),
  canonical_url: z.string().url().optional().or(z.literal('')),

  // Status
  status: poseStatusSchema.default('draft'),
});

export type PoseFormValues = z.infer<typeof poseFormSchema>;

// Input type for form (with required string fields for controlled inputs)
export interface PoseFormInput {
  english_name: string;
  sanskrit_name: string;
  sanskrit_name_simplified: string;
  pronunciation: string;
  short_description: string;
  description: string;
  breath_cue: string;
  benefits: string[];
  cautions: string[];
  contraindications: string[];
  step_by_step: string[];
  alignment_cues: string[];
  modifications: string[];
  variations: string[];
  tags: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pose_type: string;
  primary_focus: string;
  secondary_focus: string[];
  duration_hint_seconds: number | null;
  is_peak_pose: boolean;
  is_warmup: boolean;
  is_cooldown: boolean;
  is_bilateral: boolean;
  image_alt: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  status: 'draft' | 'published' | 'archived';
}

// Schema for updating status only
export const poseStatusUpdateSchema = z.object({
  status: poseStatusSchema,
});

// Schema for slug generation
export const slugSchema = z
  .string()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens');

// Helper to generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Clean array fields (remove empty strings)
export function cleanArrayField(arr: string[]): string[] {
  return arr.map((s) => s.trim()).filter((s) => s.length > 0);
}

// Prepare form data for API submission
export function prepareFormDataForSubmission(data: PoseFormInput) {
  return {
    ...data,
    sanskrit_name: data.sanskrit_name || null,
    sanskrit_name_simplified: data.sanskrit_name_simplified || null,
    pronunciation: data.pronunciation || null,
    short_description: data.short_description || null,
    description: data.description || null,
    breath_cue: data.breath_cue || null,
    pose_type: data.pose_type || null,
    primary_focus: data.primary_focus || null,
    duration_hint_seconds: data.duration_hint_seconds || null,
    image_alt: data.image_alt || null,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    canonical_url: data.canonical_url || null,
    // Clean arrays
    benefits: cleanArrayField(data.benefits),
    cautions: cleanArrayField(data.cautions),
    contraindications: cleanArrayField(data.contraindications),
    step_by_step: cleanArrayField(data.step_by_step),
    alignment_cues: cleanArrayField(data.alignment_cues),
    modifications: cleanArrayField(data.modifications),
    variations: cleanArrayField(data.variations),
    tags: cleanArrayField(data.tags),
    equipment: cleanArrayField(data.equipment),
  };
}
