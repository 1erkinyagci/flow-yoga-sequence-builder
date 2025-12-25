import { getUser, getUserProfile, createServerSupabaseClient } from '@/lib/supabase/server';
import type { Profile, Flow, FlowItem, PoseType, Difficulty, PoseSide } from '@/types';
import BuilderClient from './BuilderClient';

interface PoseFromDB {
  id: string;
  slug: string;
  english_name: string;
  sanskrit_name: string | null;
  pose_type: PoseType;
  difficulty: Difficulty;
  short_description: string | null;
  image_url: string | null;
  duration_hint_seconds: number | null;
}

interface SavedFlow extends Flow {
  items: {
    id: string;
    pose_id: string;
    position: number;
    duration_seconds: number;
    side: PoseSide;
    notes: string | null;
    pose: PoseFromDB;
  }[];
}

export default async function BuilderPage() {
  // Fetch auth state server-side
  const user = await getUser();
  const profile = user ? await getUserProfile() as Profile | null : null;

  // Prepare user data for client
  const initialUser = user ? {
    id: user.id,
    email: user.email || '',
  } : null;

  // Fetch user's flows if authenticated
  let initialFlows: SavedFlow[] = [];

  if (user) {
    try {
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

      if (!error && data) {
        // Get all unique pose IDs from all flows
        const allPoseIds = new Set<string>();
        data.forEach((flow: Flow & { flow_items: FlowItem[] }) => {
          (flow.flow_items || []).forEach((item: FlowItem) => {
            if (item.pose_id) allPoseIds.add(item.pose_id);
          });
        });

        // Fetch all poses at once
        let posesMap: Record<string, PoseFromDB> = {};
        if (allPoseIds.size > 0) {
          const { data: posesData } = await db
            .from('poses')
            .select('id, slug, english_name, sanskrit_name, pose_type, difficulty, image_url')
            .in('id', Array.from(allPoseIds));

          if (posesData) {
            posesMap = posesData.reduce((acc: Record<string, PoseFromDB>, pose: PoseFromDB) => {
              acc[pose.id] = pose;
              return acc;
            }, {});
          }
        }

        // Transform the data to include pose_count and total_duration
        initialFlows = data.map((flow: Flow & { flow_items: FlowItem[] }) => {
          const items = flow.flow_items || [];
          return {
            ...flow,
            pose_count: items.length,
            total_duration_seconds: items.reduce((acc: number, item: FlowItem) => acc + (item.duration_seconds || 0), 0),
            items: items.sort((a: FlowItem, b: FlowItem) => a.position - b.position).map((item: FlowItem) => ({
              ...item,
              pose: posesMap[item.pose_id] as PoseFromDB,
            })),
          };
        }) as SavedFlow[];
      }
    } catch (error) {
      console.error('Error fetching flows:', error);
    }
  }

  return (
    <BuilderClient
      initialUser={initialUser}
      initialProfile={profile}
      initialFlows={initialFlows}
    />
  );
}
