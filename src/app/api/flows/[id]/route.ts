import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';
import type { UpdateFlowInput, FlowItem, Pose } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get single flow with items
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data, error } = await db
    .from('flows')
    .select(`
      *,
      flow_items (
        id,
        pose_id,
        position,
        duration_seconds,
        side,
        notes,
        poses (
          id,
          slug,
          english_name,
          sanskrit_name,
          pose_type,
          difficulty,
          image_url
        )
      )
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching flow:', error);
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  // Transform items to include pose data properly
  const items = (data.flow_items || [])
    .sort((a: FlowItem, b: FlowItem) => a.position - b.position)
    .map((item: FlowItem & { poses: Pose }) => ({
      ...item,
      pose: item.poses,
    }));

  return NextResponse.json({
    ...data,
    items,
    pose_count: items.length,
    total_duration_seconds: items.reduce((acc: number, item: FlowItem) => acc + (item.duration_seconds || 0), 0),
  });
}

// PUT - Update flow
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: UpdateFlowInput & { items?: { pose_id: string; duration_seconds: number; side: string; notes: string; position: number }[] } = await request.json();

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Verify ownership
    const { data: existingFlow } = await db
      .from('flows')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!existingFlow) {
      return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
    }

    // Update flow metadata
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.style !== undefined) updateData.style = body.style;
    if (body.level !== undefined) updateData.level = body.level;
    if (body.duration_minutes !== undefined) updateData.duration_minutes = body.duration_minutes;
    if (body.is_public !== undefined) updateData.is_public = body.is_public;
    if (body.is_archived !== undefined) updateData.is_archived = body.is_archived;

    const { error: updateError } = await db
      .from('flows')
      .update(updateData)
      .eq('id', id);

    if (updateError) {
      console.error('Error updating flow:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // If items are provided, replace all items
    if (body.items !== undefined) {
      // Delete existing items
      await db.from('flow_items').delete().eq('flow_id', id);

      // Insert new items
      if (body.items.length > 0) {
        const flowItems = body.items.map((item, index) => ({
          flow_id: id,
          pose_id: item.pose_id,
          position: item.position ?? index,
          duration_seconds: item.duration_seconds || 30,
          side: item.side || 'both',
          notes: item.notes || null,
          repetitions: 1,
        }));

        const { error: itemsError } = await db
          .from('flow_items')
          .insert(flowItems);

        if (itemsError) {
          console.error('Error updating flow items:', itemsError);
          return NextResponse.json({ error: itemsError.message }, { status: 500 });
        }
      }
    }

    // Fetch and return updated flow
    const { data: updatedFlow } = await db
      .from('flows')
      .select(`
        *,
        flow_items (
          id,
          pose_id,
          position,
          duration_seconds,
          side,
          notes,
          poses (
            id,
            slug,
            english_name,
            sanskrit_name,
            pose_type,
            difficulty,
            image_url
          )
        )
      `)
      .eq('id', id)
      .single();

    const items = (updatedFlow.flow_items || [])
      .sort((a: FlowItem, b: FlowItem) => a.position - b.position)
      .map((item: FlowItem & { poses: Pose }) => ({
        ...item,
        pose: item.poses,
      }));

    return NextResponse.json({
      ...updatedFlow,
      items,
      pose_count: items.length,
      total_duration_seconds: items.reduce((acc: number, item: FlowItem) => acc + (item.duration_seconds || 0), 0),
    });
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE - Delete flow
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
  const { data: existingFlow } = await db
    .from('flows')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!existingFlow) {
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  // Delete flow items first (cascade might handle this, but being explicit)
  await db.from('flow_items').delete().eq('flow_id', id);

  // Delete the flow
  const { error } = await db
    .from('flows')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting flow:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
