import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';
import type { CreateFlowInput, Flow, FlowItem, Pose } from '@/types';

// GET - List user's flows
export async function GET() {
  try {
    const user = await getUser();

    console.log('GET /api/flows: User check result:', user ? `Found user ${user.id}` : 'No user found');

    if (!user) {
      console.log('GET /api/flows: Unauthorized - no user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // First get flows with flow_items
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
          notes
        )
      `)
      .eq('user_id', user.id)
      .eq('is_archived', false)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching flows:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get all unique pose IDs from all flows
    const allPoseIds = new Set<string>();
    (data || []).forEach((flow: Flow & { flow_items: FlowItem[] }) => {
      (flow.flow_items || []).forEach((item: FlowItem) => {
        if (item.pose_id) allPoseIds.add(item.pose_id);
      });
    });

    // Fetch all poses at once
    let posesMap: Record<string, Pose> = {};
    if (allPoseIds.size > 0) {
      const { data: posesData } = await db
        .from('poses')
        .select('id, slug, english_name, sanskrit_name, pose_type, difficulty, image_url')
        .in('id', Array.from(allPoseIds));

      if (posesData) {
        posesMap = posesData.reduce((acc: Record<string, Pose>, pose: Pose) => {
          acc[pose.id] = pose;
          return acc;
        }, {});
      }
    }

    // Transform the data to include pose_count and total_duration
    const flowsWithStats = (data || []).map((flow: Flow & { flow_items: FlowItem[] }) => {
      const items = flow.flow_items || [];
      return {
        ...flow,
        pose_count: items.length,
        total_duration_seconds: items.reduce((acc: number, item: FlowItem) => acc + (item.duration_seconds || 0), 0),
        items: items.sort((a: FlowItem, b: FlowItem) => a.position - b.position).map((item: FlowItem) => ({
          ...item,
          pose: posesMap[item.pose_id] || null,
        })),
      };
    });

    return NextResponse.json(flowsWithStats);
  } catch (err) {
    console.error('Error in GET /api/flows:', err);
    const errorMessage = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST - Create new flow
export async function POST(request: Request) {
  const user = await getUser();

  if (!user) {
    console.log('POST /api/flows: Unauthorized - no user');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rawBody = await request.text();
    console.log('POST /api/flows: Raw body length:', rawBody.length);

    if (!rawBody) {
      console.log('POST /api/flows: Empty body received');
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    const body: CreateFlowInput & { items?: { pose_id: string; duration_seconds: number; side: string; notes: string; position: number }[] } = JSON.parse(rawBody);

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    // Check user's profile for subscription tier and daily save limit
    const { data: profile, error: profileError } = await db
      .from('profiles')
      .select('subscription_tier, flows_saved_today, flows_saved_reset_at')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
    }

    // Check if free tier user has reached daily save limit
    if (profile.subscription_tier === 'free') {
      const now = new Date();
      const resetAt = new Date(profile.flows_saved_reset_at);
      const hoursSinceReset = (now.getTime() - resetAt.getTime()) / (1000 * 60 * 60);

      // Reset counter if 24 hours have passed
      if (hoursSinceReset >= 24) {
        await db
          .from('profiles')
          .update({
            flows_saved_today: 0,
            flows_saved_reset_at: now.toISOString(),
          })
          .eq('id', user.id);

        profile.flows_saved_today = 0;
      }

      // Check daily save limit (1 per day for free tier)
      if (profile.flows_saved_today >= 1) {
        const hoursUntilReset = 24 - hoursSinceReset;
        return NextResponse.json(
          {
            error: 'Daily save limit reached',
            message: 'Free tier users can save 1 flow per day. Upgrade to Pro for unlimited saves.',
            resetIn: Math.ceil(hoursUntilReset),
          },
          { status: 403 }
        );
      }
    }

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

    // Increment flows_saved_today counter for free tier users
    if (profile.subscription_tier === 'free') {
      await db
        .from('profiles')
        .update({
          flows_saved_today: profile.flows_saved_today + 1,
        })
        .eq('id', user.id);
    }

    // Fetch the complete flow with items
    const { data: completeFlow, error: fetchError } = await db
      .from('flows')
      .select(`
        *,
        flow_items (
          id,
          pose_id,
          position,
          duration_seconds,
          side,
          notes
        )
      `)
      .eq('id', flow.id)
      .single();

    if (fetchError || !completeFlow) {
      console.error('Error fetching created flow:', fetchError);
      // Return the basic flow data if fetch fails
      return NextResponse.json(flow, { status: 201 });
    }

    // Fetch poses separately if there are flow items
    const poseIds = (completeFlow.flow_items || [])
      .map((item: FlowItem) => item.pose_id)
      .filter(Boolean);

    let posesMap: Record<string, Pose> = {};
    if (poseIds.length > 0) {
      const { data: posesData } = await db
        .from('poses')
        .select('id, slug, english_name, sanskrit_name, pose_type, difficulty, image_url')
        .in('id', poseIds);

      if (posesData) {
        posesMap = posesData.reduce((acc: Record<string, Pose>, pose: Pose) => {
          acc[pose.id] = pose;
          return acc;
        }, {});
      }
    }

    // Transform the flow data
    const items = (completeFlow.flow_items || [])
      .sort((a: FlowItem, b: FlowItem) => a.position - b.position)
      .map((item: FlowItem) => ({
        ...item,
        pose: posesMap[item.pose_id] || null,
      }));

    return NextResponse.json({
      ...completeFlow,
      items,
      pose_count: items.length,
      total_duration_seconds: items.reduce((acc: number, item: FlowItem) => acc + (item.duration_seconds || 0), 0),
    }, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/flows:', err);
    const errorMessage = err instanceof Error ? err.message : 'Invalid request';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
