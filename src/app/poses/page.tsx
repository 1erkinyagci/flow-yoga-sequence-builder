import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container, Card, Input, Select } from '@/components/ui';
import { DifficultyBadge, PoseTypeBadge } from '@/components/ui/Badge';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { PoseDifficulty, PoseType } from '@/types/pose';

export const metadata: Metadata = {
  title: 'Yoga Pose Library - 100+ Poses with Instructions',
  description:
    'Browse our comprehensive yoga pose library. Each pose includes step-by-step instructions, benefits, modifications, and alignment cues for all levels.',
  openGraph: {
    title: 'Yoga Pose Library - 100+ Poses with Instructions',
    description:
      'Browse our comprehensive yoga pose library with detailed instructions, benefits, and modifications.',
  },
};

const poseTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'standing', label: 'Standing' },
  { value: 'seated', label: 'Seated' },
  { value: 'prone', label: 'Prone' },
  { value: 'supine', label: 'Supine' },
  { value: 'inversion', label: 'Inversion' },
  { value: 'arm_balance', label: 'Arm Balance' },
  { value: 'twist', label: 'Twist' },
  { value: 'backbend', label: 'Backbend' },
  { value: 'forward_fold', label: 'Forward Fold' },
  { value: 'hip_opening', label: 'Hip Opening' },
  { value: 'balancing', label: 'Balancing' },
  { value: 'restorative', label: 'Restorative' },
  { value: 'kneeling', label: 'Kneeling' },
];

const difficultyOptions = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

interface PoseListItem {
  slug: string;
  english_name: string;
  sanskrit_name: string | null;
  short_description: string | null;
  difficulty: PoseDifficulty;
  pose_type: PoseType | null;
  image_url: string | null;
}

interface PageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    difficulty?: string;
  }>;
}

async function getPoses(filters: { search?: string; type?: string; difficulty?: string }) {
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  let query = db
    .from('poses')
    .select('slug, english_name, sanskrit_name, short_description, difficulty, pose_type, image_url')
    .eq('status', 'published')
    .order('english_name', { ascending: true });

  if (filters.search) {
    query = query.or(`english_name.ilike.%${filters.search}%,sanskrit_name.ilike.%${filters.search}%`);
  }

  if (filters.type) {
    query = query.eq('pose_type', filters.type);
  }

  if (filters.difficulty) {
    query = query.eq('difficulty', filters.difficulty);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching poses:', error);
    return [];
  }

  return (data || []) as PoseListItem[];
}

async function getTotalPublishedCount() {
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { count } = await db
    .from('poses')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  return count || 0;
}

export default async function PosesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    search: params.search,
    type: params.type,
    difficulty: params.difficulty,
  };

  const [poses, totalPoses] = await Promise.all([
    getPoses(filters),
    getTotalPublishedCount(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e] relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>

      <Header />

      <main className="flex-1 py-8 md:py-12 relative z-10">
        <Container size="xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="relative inline-block mb-4">
              {/* Glow effect behind text */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 blur-2xl rounded-full" />

              {/* 3D Glass Title */}
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold">
                {/* Background text layer for depth */}
                <span className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent bg-clip-text text-transparent blur-[2px] translate-y-[2px]">
                  Yoga Pose Library
                </span>

                {/* Main gradient text */}
                <span className="relative bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Yoga Pose Library
                </span>

                {/* Top shine reflection */}
                <span className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent bg-clip-text text-transparent opacity-50" style={{ WebkitBackgroundClip: 'text' }}>
                  Yoga Pose Library
                </span>
              </h1>
            </div>
            <p className="text-lg text-white/60 max-w-2xl">
              Explore our collection of {totalPoses}+ yoga poses. Each pose includes
              detailed instructions, benefits, modifications, and alignment cues.
            </p>
          </div>

          {/* Filters - Glass Panel */}
          <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-5 mb-8">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
            <form className="flex flex-col md:flex-row gap-4 relative">
              <div className="flex-1">
                <Input
                  name="search"
                  placeholder="Search poses by name..."
                  defaultValue={params.search}
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </div>
              <div className="flex gap-4">
                <Select
                  name="type"
                  options={poseTypeOptions}
                  defaultValue={params.type || ''}
                  className="w-40"
                />
                <Select
                  name="difficulty"
                  options={difficultyOptions}
                  defaultValue={params.difficulty || ''}
                  className="w-40"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center gap-2 border border-white/10 hover:border-white/20"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-white/40">
              Showing {poses.length} of {totalPoses} poses
            </p>
          </div>

          {/* Pose Grid - Apple Glass Cards */}
          <Suspense fallback={<PoseGridSkeleton />}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
              {poses.map((pose) => (
                <Link key={pose.slug} href={`/poses/${pose.slug}`}>
                  <div className="group h-full relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
                    {/* Glass background layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

                    {/* Border glow */}
                    <div className="absolute inset-0 rounded-3xl border border-white/[0.15] group-hover:border-white/[0.25] transition-colors duration-500" />

                    {/* Highlight reflection */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-purple-500/10 via-transparent to-blue-500/5" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Pose Image */}
                      <div className="aspect-square flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                        {pose.image_url ? (
                          <Image
                            src={pose.image_url}
                            alt={pose.english_name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-white/[0.08] backdrop-blur-xl flex items-center justify-center border border-white/[0.15]">
                            <span className="text-3xl text-white/60 font-light">
                              {pose.english_name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Pose Info */}
                      <div className="p-3 md:p-4 pt-2 flex flex-col flex-1">
                        {/* Pose Name - full text, smaller font if needed */}
                        <h2 className="font-medium text-[13px] md:text-sm text-white/90 group-hover:text-white transition-colors duration-300 leading-tight mb-1">
                          {pose.english_name}
                        </h2>

                        {/* Sanskrit Name - full text */}
                        {pose.sanskrit_name && (
                          <p className="text-[11px] md:text-xs text-white/40 italic leading-tight mb-auto">
                            {pose.sanskrit_name}
                          </p>
                        )}

                        {/* Tags at bottom - centered, uniform size */}
                        <div className="flex items-center justify-center gap-1.5 mt-2 pt-2 border-t border-white/[0.08]">
                          <span className="inline-flex items-center justify-center min-w-[70px] h-6 px-2 text-[10px] font-medium rounded-full bg-white/[0.08] text-white/70 border border-white/[0.1]">
                            {pose.difficulty.charAt(0).toUpperCase() + pose.difficulty.slice(1)}
                          </span>
                          {pose.pose_type && (
                            <span className="inline-flex items-center justify-center min-w-[70px] h-6 px-2 text-[10px] font-medium rounded-full bg-white/[0.08] text-white/70 border border-white/[0.1]">
                              {pose.pose_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Suspense>

          {/* Empty State */}
          {poses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.05] backdrop-blur-xl mx-auto mb-4 flex items-center justify-center border border-white/[0.1]">
                <Search className="w-10 h-10 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No poses found
              </h3>
              <p className="text-white/50 mb-4">
                Try adjusting your search or filters
              </p>
              <Link
                href="/poses"
                className="text-white/70 hover:text-white font-medium transition-colors"
              >
                Clear all filters
              </Link>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}

function PoseGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="relative rounded-3xl overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-2xl" />
          <div className="absolute inset-0 rounded-3xl border border-white/[0.15]" />
          <div className="relative z-10 flex flex-col">
            <div className="aspect-square bg-white/[0.05]" />
            <div className="p-3 md:p-4 pt-2 flex flex-col">
              <div className="h-4 bg-white/[0.1] rounded w-full mb-1" />
              <div className="h-3 bg-white/[0.08] rounded w-2/3 mb-auto" />
              <div className="flex justify-center gap-1.5 mt-2 pt-2 border-t border-white/[0.08]">
                <div className="h-6 bg-white/[0.08] rounded-full min-w-[70px]" />
                <div className="h-6 bg-white/[0.08] rounded-full min-w-[70px]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
