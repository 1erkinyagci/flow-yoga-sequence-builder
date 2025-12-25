import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser, getUserProfile } from '@/lib/supabase/server';
import type { Profile } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Generate a unique public slug using crypto
function generatePublicSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => chars[byte % chars.length]).join('');
}

// POST - Make flow public and generate share link
export async function POST(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check Pro tier
  const profile = await getUserProfile() as Profile | null;
  if (profile?.subscription_tier !== 'paid') {
    return NextResponse.json(
      { error: 'Pro subscription required for sharing flows' },
      { status: 403 }
    );
  }

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  // Verify ownership and get current state
  const { data: existingFlow, error: fetchError } = await db
    .from('flows')
    .select('id, is_public, public_slug')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !existingFlow) {
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  // If already public, return existing slug
  if (existingFlow.is_public && existingFlow.public_slug) {
    return NextResponse.json({
      is_public: true,
      public_slug: existingFlow.public_slug,
      share_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/flow/${existingFlow.public_slug}`,
    });
  }

  // Generate new slug and make public
  const publicSlug = generatePublicSlug();

  const { error: updateError } = await db
    .from('flows')
    .update({
      is_public: true,
      public_slug: publicSlug,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (updateError) {
    console.error('Error making flow public:', updateError);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    is_public: true,
    public_slug: publicSlug,
    share_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/flow/${publicSlug}`,
  });
}

// DELETE - Make flow private
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  // Verify ownership
  const { data: existingFlow, error: fetchError } = await db
    .from('flows')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !existingFlow) {
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  // Make private (keep the slug for potential re-sharing)
  const { error: updateError } = await db
    .from('flows')
    .update({
      is_public: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (updateError) {
    console.error('Error making flow private:', updateError);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    is_public: false,
    public_slug: null,
  });
}

// GET - Get share status
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data: flow, error } = await db
    .from('flows')
    .select('id, is_public, public_slug')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !flow) {
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  return NextResponse.json({
    is_public: flow.is_public,
    public_slug: flow.public_slug,
    share_url: flow.is_public && flow.public_slug
      ? `${process.env.NEXT_PUBLIC_APP_URL || ''}/flow/${flow.public_slug}`
      : null,
  });
}
