import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { FlowPageClient } from '@/components/flows/FlowPageClient';
import type { Flow, FlowItem, Pose, Profile } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface FlowWithCreator extends Flow {
  profiles?: Pick<Profile, 'full_name'> | null;
}

interface FlowItemWithPose extends FlowItem {
  poses: Pose | null;
}

async function getPublicFlow(slug: string) {
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  // Fetch flow with creator profile
  const { data: flow, error: flowError } = await db
    .from('flows')
    .select(`
      *,
      profiles:user_id (
        full_name
      )
    `)
    .eq('public_slug', slug)
    .eq('is_public', true)
    .single();

  if (flowError || !flow) {
    return null;
  }

  // Fetch flow items with poses
  const { data: items, error: itemsError } = await db
    .from('flow_items')
    .select(`
      *,
      poses:pose_id (*)
    `)
    .eq('flow_id', flow.id)
    .order('position', { ascending: true });

  if (itemsError) {
    console.error('Error fetching flow items:', itemsError);
    return null;
  }

  return {
    flow: flow as FlowWithCreator,
    items: (items || []).map((item: FlowItemWithPose) => ({
      ...item,
      pose: item.poses,
    })),
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublicFlow(slug);

  if (!data) {
    return {
      title: 'Flow Not Found',
    };
  }

  const { flow, items } = data;
  const totalDuration = items.reduce((acc: number, item: { duration_seconds: number }) => acc + item.duration_seconds, 0);
  const durationMins = Math.floor(totalDuration / 60);

  return {
    title: `${flow.title} - FLOW Yoga Sequence`,
    description: flow.description || `A ${durationMins} minute ${flow.style} yoga flow with ${items.length} poses.`,
    openGraph: {
      title: `${flow.title} - FLOW Yoga Sequence`,
      description: flow.description || `A ${durationMins} minute ${flow.style} yoga flow with ${items.length} poses.`,
    },
  };
}

export default async function PublicFlowPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPublicFlow(slug);

  if (!data) {
    notFound();
  }

  const { flow, items } = data;

  return <FlowPageClient flow={flow} items={items} />;
}
