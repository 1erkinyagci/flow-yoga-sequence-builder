import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { z } from 'zod';

const bulkPublishSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const parseResult = bulkPublishSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { ids } = parseResult.data;

    // Update poses to published status
    const { error: updateError, count } = await db
      .from('poses')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })
      .in('id', ids);

    if (updateError) {
      console.error('Error publishing poses:', updateError);
      return NextResponse.json(
        { error: 'Failed to publish poses' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      published: count || ids.length,
      message: `Successfully published ${count || ids.length} pose(s)`,
    });
  } catch (error) {
    console.error('Bulk publish error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
