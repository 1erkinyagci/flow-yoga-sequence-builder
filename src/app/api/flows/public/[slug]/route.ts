import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { FlowItem, Pose } from '@/types';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET - Fetch public flow by slug (no auth required)
export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  // Fetch flow
  const { data: flow, error: flowError } = await db
    .from('flows')
    .select('*')
    .eq('public_slug', slug)
    .eq('is_public', true)
    .single();

  if (flowError || !flow) {
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  // Check if expired
  if (flow.share_expires_at) {
    const expiresAt = new Date(flow.share_expires_at);
    if (expiresAt < new Date()) {
      return NextResponse.json({ error: 'Share link has expired' }, { status: 410 });
    }
  }

  // Fetch flow items
  const { data: flowItems, error: itemsError } = await db
    .from('flow_items')
    .select('*')
    .eq('flow_id', flow.id)
    .order('position', { ascending: true });

  if (itemsError) {
    console.error('Error fetching flow items:', itemsError);
    return NextResponse.json({ error: 'Failed to fetch flow items' }, { status: 500 });
  }

  // Collect all pose IDs
  const poseIds = (flowItems || [])
    .map((item: FlowItem) => item.pose_id)
    .filter(Boolean);

  // Fetch poses separately
  let posesMap: Record<string, Pose> = {};
  if (poseIds.length > 0) {
    const { data: poses } = await db
      .from('poses')
      .select('*')
      .in('id', poseIds);

    if (poses) {
      posesMap = poses.reduce((acc: Record<string, Pose>, pose: Pose) => {
        acc[pose.id] = pose;
        return acc;
      }, {});
    }
  }

  // Combine items with poses
  const items = (flowItems || []).map((item: FlowItem) => ({
    ...item,
    pose: posesMap[item.pose_id] || null,
  }));

  return NextResponse.json({
    ...flow,
    items,
  });
}
