import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { z } from 'zod';

const bulkDeleteSchema = z.object({
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
    const parseResult = bulkDeleteSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { ids } = parseResult.data;

    // First, get the poses to delete their images from storage
    const { data: posesToDelete, error: fetchError } = await db
      .from('poses')
      .select('id, image_url')
      .in('id', ids);

    if (fetchError) {
      console.error('Error fetching poses for deletion:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch poses' },
        { status: 500 }
      );
    }

    // Delete images from storage
    const imagesToDelete = posesToDelete
      ?.filter((pose: { image_url: string | null }) => pose.image_url)
      .map((pose: { image_url: string }) => {
        // Extract path from URL: .../storage/v1/object/public/poses/2024/12/file.jpg
        const url = pose.image_url;
        const match = url.match(/\/storage\/v1\/object\/public\/poses\/(.+)$/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    if (imagesToDelete && imagesToDelete.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('poses')
        .remove(imagesToDelete);

      if (storageError) {
        console.error('Error deleting images from storage:', storageError);
        // Continue with deletion even if image deletion fails
      }
    }

    // Delete poses from database
    const { error: deleteError, count } = await db
      .from('poses')
      .delete()
      .in('id', ids);

    if (deleteError) {
      console.error('Error deleting poses:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete poses' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted: count || ids.length,
      message: `Successfully deleted ${count || ids.length} pose(s)`,
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
