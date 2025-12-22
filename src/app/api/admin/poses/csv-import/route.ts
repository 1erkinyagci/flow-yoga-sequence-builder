import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';
import { z } from 'zod';

// Admin emails from environment variable
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

async function checkAdmin() {
  const user = await getUser();
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return null;
  }
  return user;
}

// Generate slug from text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse pipe-separated values into array
 * - Trims whitespace from each item
 * - Filters out empty items
 * - Returns empty array for undefined/null/empty input
 */
function parsePipeSeparated(value: string | undefined | null): string[] {
  if (!value || typeof value !== 'string' || !value.trim()) return [];
  return value
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Parse boolean from string
 * - Handles: true/false, yes/no, 1/0, on/off
 * - Returns undefined for empty/invalid values
 */
function parseBoolean(value: string | undefined | null): boolean | undefined {
  if (!value || typeof value !== 'string' || !value.trim()) return undefined;
  const normalized = value.toLowerCase().trim();
  if (['true', 'yes', '1', 'on'].includes(normalized)) return true;
  if (['false', 'no', '0', 'off'].includes(normalized)) return false;
  return undefined;
}

/**
 * Parse integer from string
 * - Returns undefined for empty/invalid values
 */
function parseInteger(value: string | undefined | null): number | undefined {
  if (!value || typeof value !== 'string' || !value.trim()) return undefined;
  const num = parseInt(value.trim(), 10);
  return isNaN(num) ? undefined : num;
}

// Valid enum values
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;
const VALID_STATUSES = ['draft', 'published', 'archived'] as const;
const VALID_POSE_TYPES = [
  'standing', 'seated', 'balancing', 'backbend', 'twist', 'inversion',
  'arm_balance', 'hip_opening', 'forward_fold', 'restorative', 'prone', 'supine', 'kneeling',
] as const;
const VALID_BODY_FOCUS = [
  'hips', 'hamstrings', 'shoulders', 'spine', 'core', 'legs',
  'glutes', 'chest', 'neck', 'wrists', 'ankles', 'full_body',
] as const;

// Row validation schema - accepts all possible CSV columns
const csvRowSchema = z.object({
  rowNumber: z.number(),

  // Matching fields (at least one required for matching)
  image_original_filename: z.string().optional(),
  image_filename: z.string().optional(), // Alias for image_original_filename
  slug: z.string().optional(),

  // Core fields
  english_name: z.string().min(1, 'english_name is required'),
  sanskrit_name: z.string().optional(),
  sanskrit_name_simplified: z.string().optional(),
  pronunciation: z.string().optional(),

  // Descriptions
  short_description: z.string().optional(),
  description: z.string().optional(),

  // Array fields (pipe-separated in CSV)
  benefits: z.string().optional(),
  cautions: z.string().optional(),
  contraindications: z.string().optional(),
  step_by_step: z.string().optional(),
  alignment_cues: z.string().optional(),
  modifications: z.string().optional(),
  variations: z.string().optional(),
  tags: z.string().optional(),
  equipment: z.string().optional(),
  secondary_focus: z.string().optional(),

  // Classification
  difficulty: z.string().optional(),
  pose_type: z.string().optional(),
  primary_focus: z.string().optional(),

  // Timing
  duration_hint_seconds: z.string().optional(),

  // Boolean flags
  is_peak_pose: z.string().optional(),
  is_warmup: z.string().optional(),
  is_cooldown: z.string().optional(),
  is_bilateral: z.string().optional(),

  // SEO
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  image_alt: z.string().optional(),

  // Status
  status: z.string().optional(),
});

type CsvRow = z.infer<typeof csvRowSchema>;

interface ImportResult {
  success: number;
  failed: number;
  updated: number;
  created: number;
  errors: Array<{ row: number; error: string }>;
}

export async function POST(request: Request) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { rows } = await request.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No rows provided' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    const result: ImportResult = {
      success: 0,
      failed: 0,
      updated: 0,
      created: 0,
      errors: [],
    };

    // Get all existing slugs to check for conflicts
    const { data: existingSlugs } = await db
      .from('poses')
      .select('slug');
    const slugSet = new Set((existingSlugs || []).map((p: { slug: string }) => p.slug));

    for (const rawRow of rows) {
      try {
        // Validate row structure
        const parseResult = csvRowSchema.safeParse(rawRow);
        if (!parseResult.success) {
          result.failed++;
          result.errors.push({
            row: rawRow.rowNumber || 0,
            error: parseResult.error.issues.map((e) => e.message).join(', '),
          });
          continue;
        }

        const row = parseResult.data;

        // Normalize image_filename alias to image_original_filename
        const imageOriginalFilename = row.image_original_filename || row.image_filename;

        // Validate enums
        if (row.difficulty && !VALID_DIFFICULTIES.includes(row.difficulty.toLowerCase() as typeof VALID_DIFFICULTIES[number])) {
          result.failed++;
          result.errors.push({
            row: row.rowNumber,
            error: `Invalid difficulty: ${row.difficulty}. Valid: ${VALID_DIFFICULTIES.join(', ')}`,
          });
          continue;
        }

        if (row.pose_type && !VALID_POSE_TYPES.includes(row.pose_type.toLowerCase() as typeof VALID_POSE_TYPES[number])) {
          result.failed++;
          result.errors.push({
            row: row.rowNumber,
            error: `Invalid pose_type: ${row.pose_type}. Valid: ${VALID_POSE_TYPES.join(', ')}`,
          });
          continue;
        }

        if (row.primary_focus && !VALID_BODY_FOCUS.includes(row.primary_focus.toLowerCase() as typeof VALID_BODY_FOCUS[number])) {
          result.failed++;
          result.errors.push({
            row: row.rowNumber,
            error: `Invalid primary_focus: ${row.primary_focus}. Valid: ${VALID_BODY_FOCUS.join(', ')}`,
          });
          continue;
        }

        if (row.status && !VALID_STATUSES.includes(row.status.toLowerCase() as typeof VALID_STATUSES[number])) {
          result.failed++;
          result.errors.push({
            row: row.rowNumber,
            error: `Invalid status: ${row.status}. Valid: ${VALID_STATUSES.join(', ')}`,
          });
          continue;
        }

        // Validate secondary_focus array items
        const secondaryFocusArray = parsePipeSeparated(row.secondary_focus);
        for (const focus of secondaryFocusArray) {
          if (!VALID_BODY_FOCUS.includes(focus.toLowerCase() as typeof VALID_BODY_FOCUS[number])) {
            result.failed++;
            result.errors.push({
              row: row.rowNumber,
              error: `Invalid secondary_focus item: ${focus}. Valid: ${VALID_BODY_FOCUS.join(', ')}`,
            });
            continue;
          }
        }

        // Try to find existing pose by image_original_filename first
        let existingPose = null;

        if (imageOriginalFilename) {
          const { data } = await db
            .from('poses')
            .select('id, slug')
            .eq('image_original_filename', imageOriginalFilename)
            .single();
          existingPose = data;
        }

        // If not found, try by slug
        if (!existingPose && row.slug) {
          const { data } = await db
            .from('poses')
            .select('id, slug')
            .eq('slug', row.slug)
            .single();
          existingPose = data;
        }

        // Prepare update data with proper types
        const updateData: Record<string, unknown> = {
          english_name: row.english_name,
          updated_by: admin.id,
          updated_at: new Date().toISOString(),
        };

        // String fields (set to null if empty)
        if (row.sanskrit_name !== undefined) {
          updateData.sanskrit_name = row.sanskrit_name.trim() || null;
        }
        if (row.sanskrit_name_simplified !== undefined) {
          updateData.sanskrit_name_simplified = row.sanskrit_name_simplified.trim() || null;
        }
        if (row.pronunciation !== undefined) {
          updateData.pronunciation = row.pronunciation.trim() || null;
        }
        if (row.short_description !== undefined) {
          updateData.short_description = row.short_description.trim() || null;
        }
        if (row.description !== undefined) {
          updateData.description = row.description.trim() || null;
        }
        if (row.meta_title !== undefined) {
          updateData.meta_title = row.meta_title.trim() || null;
        }
        if (row.meta_description !== undefined) {
          updateData.meta_description = row.meta_description.trim() || null;
        }
        if (row.image_alt !== undefined) {
          updateData.image_alt = row.image_alt.trim() || null;
        }

        // Enum fields (lowercase)
        if (row.difficulty) {
          updateData.difficulty = row.difficulty.toLowerCase();
        }
        if (row.pose_type) {
          updateData.pose_type = row.pose_type.toLowerCase();
        }
        if (row.primary_focus) {
          updateData.primary_focus = row.primary_focus.toLowerCase();
        }

        // Array fields (pipe-separated -> JSON array)
        if (row.benefits !== undefined) {
          updateData.benefits = parsePipeSeparated(row.benefits);
        }
        if (row.cautions !== undefined) {
          updateData.cautions = parsePipeSeparated(row.cautions);
        }
        if (row.contraindications !== undefined) {
          updateData.contraindications = parsePipeSeparated(row.contraindications);
        }
        if (row.step_by_step !== undefined) {
          updateData.step_by_step = parsePipeSeparated(row.step_by_step);
        }
        if (row.alignment_cues !== undefined) {
          updateData.alignment_cues = parsePipeSeparated(row.alignment_cues);
        }
        if (row.modifications !== undefined) {
          updateData.modifications = parsePipeSeparated(row.modifications);
        }
        if (row.variations !== undefined) {
          updateData.variations = parsePipeSeparated(row.variations);
        }
        if (row.tags !== undefined) {
          updateData.tags = parsePipeSeparated(row.tags);
        }
        if (row.equipment !== undefined) {
          // Handle "none" as empty array
          const equipmentValue = row.equipment.toLowerCase().trim();
          updateData.equipment = equipmentValue === 'none' ? [] : parsePipeSeparated(row.equipment);
        }
        if (row.secondary_focus !== undefined) {
          updateData.secondary_focus = secondaryFocusArray.map(s => s.toLowerCase());
        }

        // Integer fields
        const durationHint = parseInteger(row.duration_hint_seconds);
        if (durationHint !== undefined) {
          updateData.duration_hint_seconds = durationHint;
        }

        // Boolean fields
        const isPeakPose = parseBoolean(row.is_peak_pose);
        if (isPeakPose !== undefined) {
          updateData.is_peak_pose = isPeakPose;
        }
        const isWarmup = parseBoolean(row.is_warmup);
        if (isWarmup !== undefined) {
          updateData.is_warmup = isWarmup;
        }
        const isCooldown = parseBoolean(row.is_cooldown);
        if (isCooldown !== undefined) {
          updateData.is_cooldown = isCooldown;
        }
        const isBilateral = parseBoolean(row.is_bilateral);
        if (isBilateral !== undefined) {
          updateData.is_bilateral = isBilateral;
        }

        // Handle status
        if (row.status) {
          updateData.status = row.status.toLowerCase();
          if (row.status.toLowerCase() === 'published') {
            updateData.published_at = new Date().toISOString();
          }
        }

        if (existingPose) {
          // Update existing pose
          // If CSV provides a slug that's different from existing, use it (after checking uniqueness)
          if (row.slug && row.slug !== existingPose.slug && !slugSet.has(row.slug)) {
            updateData.slug = row.slug;
            slugSet.delete(existingPose.slug);
            slugSet.add(row.slug);
          }

          const { error: updateError } = await db
            .from('poses')
            .update(updateData)
            .eq('id', existingPose.id);

          if (updateError) {
            throw new Error(updateError.message);
          }
          result.updated++;
        } else {
          // Create new pose - use provided slug or generate unique one
          let slug = row.slug ? row.slug : generateSlug(row.english_name);
          let slugSuffix = 2;

          while (slugSet.has(slug)) {
            slug = `${row.slug || generateSlug(row.english_name)}-${slugSuffix}`;
            slugSuffix++;
          }

          slugSet.add(slug);

          const insertData = {
            ...updateData,
            slug,
            difficulty: updateData.difficulty || 'beginner',
            status: updateData.status || 'draft',
            created_by: admin.id,
            // Set image_original_filename if provided (for future matching)
            ...(imageOriginalFilename && { image_original_filename: imageOriginalFilename }),
          };

          const { error: insertError } = await db
            .from('poses')
            .insert(insertData);

          if (insertError) {
            throw new Error(insertError.message);
          }
          result.created++;
        }

        result.success++;
      } catch (err) {
        result.failed++;
        result.errors.push({
          row: rawRow.rowNumber || 0,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error processing CSV import:', err);
    return NextResponse.json({ error: 'Failed to process import' }, { status: 500 });
  }
}

/**
 * CSV Import Matching Logic:
 *
 * 1. MATCHING BY image_original_filename (PRIORITY 1):
 *    - First, the importer tries to find an existing pose where
 *      `poses.image_original_filename` matches the CSV's `image_original_filename`
 *      (or `image_filename` alias)
 *    - This is the primary matching method for poses created via bulk image upload
 *
 * 2. MATCHING BY slug (PRIORITY 2):
 *    - If no match by filename, tries to match by `poses.slug` = CSV's `slug`
 *    - Useful for updating existing poses by their URL slug
 *
 * 3. CREATE NEW (FALLBACK):
 *    - If no existing pose is found, a new pose is created
 *    - Slug is generated from english_name (or uses provided slug if unique)
 *
 * ARRAY FIELDS (pipe-separated):
 *    benefits, cautions, contraindications, step_by_step, alignment_cues,
 *    modifications, variations, tags, equipment, secondary_focus
 *
 * BOOLEAN FIELDS (true/false/yes/no/1/0):
 *    is_peak_pose, is_warmup, is_cooldown, is_bilateral
 *
 * INTEGER FIELDS:
 *    duration_hint_seconds
 */
