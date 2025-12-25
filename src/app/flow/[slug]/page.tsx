import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { FlowPrintPreview } from '@/components/flows/FlowPrintPreview';
import { PrintButton } from '@/components/flows/PrintButton';
import { Container, Button } from '@/components/ui';
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
  const creatorName = flow.profiles?.full_name || undefined;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header - hidden on print */}
      <header className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
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

            <div className="flex items-center gap-3">
              <Link href="/builder">
                <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Create Your Own
                </Button>
              </Link>
              <PrintButton />
            </div>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="py-8 print:py-0">
        <Container size="lg" className="print:max-w-none print:px-0">
          <FlowPrintPreview
            flow={flow}
            items={items}
            creatorName={creatorName}
          />
        </Container>
      </main>

      {/* Footer - hidden on print */}
      <footer className="no-print py-8 border-t border-neutral-200 bg-white">
        <Container size="lg">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-4">
              Create your own yoga sequences with FLOW
            </p>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                Get Started Free
              </Button>
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
