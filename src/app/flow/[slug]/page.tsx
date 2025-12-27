import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { FlowPageClient } from '@/components/flows/FlowPageClient';
import { Container, Button } from '@/components/ui';
import type { Flow, FlowItem, Pose, Profile } from '@/types';
import { Clock } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface FlowWithCreator extends Flow {
  profiles?: Pick<Profile, 'full_name'> | null;
}

interface FlowItemWithPose extends FlowItem {
  pose: Pose | null;
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

  // Check if the share link has expired
  if (flow.share_expires_at) {
    const expiresAt = new Date(flow.share_expires_at);
    if (expiresAt < new Date()) {
      return { expired: true, flow: flow as FlowWithCreator, items: [] };
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
    return {
      flow: flow as FlowWithCreator,
      items: [],
    };
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

  return {
    flow: flow as FlowWithCreator,
    items,
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

  if ('expired' in data && data.expired) {
    return {
      title: 'Link Expired - FLOW',
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

// Expired Link Page Component
function ExpiredLinkPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <Container size="xl" className="py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/yoga_sequencing_logo_transparent.jpg"
                alt="FLOW"
                width={120}
                height={48}
                className="h-10 w-auto object-contain contrast-150 saturate-150 brightness-75"
              />
            </Link>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-16">
        <Container size="sm">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">
              This link has expired
            </h1>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Share links are valid for 24 hours. The creator can generate a new link if they want to share this flow again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/builder">
                <Button variant="primary">
                  Create Your Own Flow
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-200 bg-white">
        <Container size="lg">
          <div className="text-center">
            <p className="text-sm text-neutral-600">
              Create and share yoga sequences with FLOW
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default async function PublicFlowPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPublicFlow(slug);

  if (!data) {
    notFound();
  }

  // Check if expired
  if ('expired' in data && data.expired) {
    return <ExpiredLinkPage />;
  }

  const { flow, items } = data;

  return <FlowPageClient flow={flow} items={items} />;
}
