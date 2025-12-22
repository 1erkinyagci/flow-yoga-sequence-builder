import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';
import { poseFormSchema } from '@/lib/validations/pose';

// Admin emails from environment variable
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

async function checkAdmin() {
  const user = await getUser();
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return null;
  }
  return user;
}

// GET - List all poses
export async function GET() {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('poses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - Create new pose
export async function POST(request: Request) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.english_name || !body.slug) {
      return NextResponse.json(
        { error: 'English name and slug are required' },
        { status: 400 }
      );
    }

    // Check for slug uniqueness
    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    const { data: existingPose } = await db
      .from('poses')
      .select('id')
      .eq('slug', body.slug)
      .single();

    if (existingPose) {
      return NextResponse.json(
        { error: 'A pose with this slug already exists' },
        { status: 400 }
      );
    }

    // Create the pose
    const { data, error } = await db
      .from('poses')
      .insert({
        slug: body.slug,
        english_name: body.english_name,
        sanskrit_name: body.sanskrit_name || null,
        sanskrit_name_simplified: body.sanskrit_name_simplified || null,
        pronunciation: body.pronunciation || null,
        short_description: body.short_description || null,
        description: body.description || null,
        breath_cue: body.breath_cue || null,
        benefits: body.benefits || [],
        cautions: body.cautions || [],
        contraindications: body.contraindications || [],
        step_by_step: body.step_by_step || [],
        alignment_cues: body.alignment_cues || [],
        modifications: body.modifications || [],
        variations: body.variations || [],
        tags: body.tags || [],
        equipment: body.equipment || [],
        difficulty: body.difficulty || 'beginner',
        pose_type: body.pose_type || null,
        primary_focus: body.primary_focus || null,
        secondary_focus: body.secondary_focus || [],
        duration_hint_seconds: body.duration_hint_seconds || null,
        is_peak_pose: body.is_peak_pose || false,
        is_warmup: body.is_warmup || false,
        is_cooldown: body.is_cooldown || false,
        is_bilateral: body.is_bilateral ?? true,
        image_path: body.image_path || null,
        image_url: body.image_url || null,
        image_alt: body.image_alt || null,
        meta_title: body.meta_title || null,
        meta_description: body.meta_description || null,
        canonical_url: body.canonical_url || null,
        status: body.status || 'draft',
        created_by: admin.id,
        updated_by: admin.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating pose:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
