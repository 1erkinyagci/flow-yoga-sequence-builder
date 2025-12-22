import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';

// Admin emails from environment variable
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

async function checkAdmin() {
  const user = await getUser();
  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return null;
  }
  return user;
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET - Get single pose
export async function GET(request: Request, context: RouteContext) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('poses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Pose not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT - Update pose
export async function PUT(request: Request, context: RouteContext) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.english_name || !body.slug) {
      return NextResponse.json(
        { error: 'English name and slug are required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Check for slug uniqueness (excluding current pose)
    const { data: existingPose } = await db
      .from('poses')
      .select('id')
      .eq('slug', body.slug)
      .neq('id', id)
      .single();

    if (existingPose) {
      return NextResponse.json(
        { error: 'A pose with this slug already exists' },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, unknown> = {
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
      image_alt: body.image_alt || null,
      meta_title: body.meta_title || null,
      meta_description: body.meta_description || null,
      canonical_url: body.canonical_url || null,
      status: body.status || 'draft',
      updated_by: admin.id,
      updated_at: new Date().toISOString(),
    };

    // Only update image fields if provided
    if (body.image_path !== undefined) {
      updateData.image_path = body.image_path;
    }
    if (body.image_url !== undefined) {
      updateData.image_url = body.image_url;
    }

    // Set published_at when publishing
    if (body.status === 'published') {
      const { data: currentPose } = await db
        .from('poses')
        .select('status, published_at')
        .eq('id', id)
        .single();

      if (currentPose && currentPose.status !== 'published' && !currentPose.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await db
      .from('poses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pose:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// PATCH - Update pose status only
export async function PATCH(request: Request, context: RouteContext) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();

    if (!body.status || !['draft', 'published', 'archived'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    const updateData: Record<string, unknown> = {
      status: body.status,
      updated_by: admin.id,
      updated_at: new Date().toISOString(),
    };

    // Set published_at when first publishing
    if (body.status === 'published') {
      const { data: currentPose } = await db
        .from('poses')
        .select('published_at')
        .eq('id', id)
        .single();

      if (currentPose && !currentPose.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await db
      .from('poses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pose status:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE - Delete pose
export async function DELETE(request: Request, context: RouteContext) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  // Get the pose to delete its image from storage
  const { data: pose } = await db
    .from('poses')
    .select('image_path')
    .eq('id', id)
    .single();

  // Delete the image from storage if exists
  if (pose?.image_path) {
    await db.storage.from('pose-images').remove([pose.image_path]);
  }

  // Delete the pose
  const { error } = await db
    .from('poses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting pose:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
