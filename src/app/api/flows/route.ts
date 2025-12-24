import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';
import type { CreateFlowInput, Flow, FlowItem, Pose } from '@/types';

// GET - List user's flows
export async function GET() {
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
    .eq('user_id', user.id)
    .eq('is_archived', false)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching flows:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Transform the data to include pose_count and total_duration
  const flowsWithStats = (data || []).map((flow: Flow & { flow_items: (FlowItem & { poses: Pose })[] }) => {
    const items = flow.flow_items || [];
    return {
      ...flow,
      pose_count: items.length,
      total_duration_seconds: items.reduce((acc: number, item: FlowItem) => acc + (item.duration_seconds || 0), 0),
      items: items.sort((a: FlowItem, b: FlowItem) => a.position - b.position).map((item: FlowItem & { poses: Pose }) => ({
        ...item,
        pose: item.poses,
      })),
    };
  });

  return NextResponse.json(flowsWithStats);
}

// POST - Create new flow
export async function POST(request: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: CreateFlowInput & { items?: { pose_id: string; duration_seconds: number; side: string; notes: string; position: number }[] } = await request.json();

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Create the flow
    const { data: flow, error: flowError } = await db
      .from('flows')
      .insert({
        user_id: user.id,
        title: body.title,
        description: body.description || null,
        style: body.style || 'vinyasa',
        level: body.level || 'beginner',
        duration_minutes: body.duration_minutes || 60,
        is_public: false,
        is_archived: false,
      })
      .select()
      .single();

    if (flowError) {
      console.error('Error creating flow:', flowError);
      return NextResponse.json({ error: flowError.message }, { status: 500 });
    }

    // If items are provided, create them
    if (body.items && body.items.length > 0) {
      const flowItems = body.items.map((item, index) => ({
        flow_id: flow.id,
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
        console.error('Error creating flow items:', itemsError);
        // Delete the flow if items failed
        await db.from('flows').delete().eq('id', flow.id);
        return NextResponse.json({ error: itemsError.message }, { status: 500 });
      }
    }

    // Fetch the complete flow with items
    const { data: completeFlow } = await db
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
      .eq('id', flow.id)
      .single();

    return NextResponse.json(completeFlow, { status: 201 });
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
