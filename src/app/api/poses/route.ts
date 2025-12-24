import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// GET - List all published poses (public endpoint)
export async function GET() {
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data, error } = await db
    .from('poses')
    .select('id, slug, english_name, sanskrit_name, pose_type, difficulty, short_description, image_url, duration_hint_seconds')
    .eq('status', 'published')
    .order('english_name', { ascending: true });

  if (error) {
    console.error('Error fetching poses:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
