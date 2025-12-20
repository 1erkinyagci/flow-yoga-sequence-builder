import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container, Card, Input, Select } from '@/components/ui';
import { DifficultyBadge, PoseTypeBadge } from '@/components/ui/Badge';
import { samplePoses } from '@/data/poses';
import type { PoseType, Difficulty, BodyArea } from '@/types';

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
  { value: 'hip_opener', label: 'Hip Opener' },
  { value: 'balance', label: 'Balance' },
  { value: 'restorative', label: 'Restorative' },
];

const difficultyOptions = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

interface PoseFilters {
  search?: string;
  poseType?: PoseType;
  difficulty?: Difficulty;
}

function filterPoses(filters: PoseFilters) {
  return samplePoses.filter((pose) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = pose.english_name.toLowerCase().includes(searchLower);
      const matchesSanskrit = pose.sanskrit_name?.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesSanskrit) return false;
    }
    if (filters.poseType && pose.pose_type !== filters.poseType) return false;
    if (filters.difficulty && pose.difficulty !== filters.difficulty) return false;
    return true;
  });
}

interface PageProps {
  searchParams: Promise<{
    search?: string;
    type?: PoseType;
    difficulty?: Difficulty;
  }>;
}

export default async function PosesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: PoseFilters = {
    search: params.search,
    poseType: params.type,
    difficulty: params.difficulty,
  };

  const poses = filterPoses(filters);
  const totalPoses = samplePoses.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <Container size="xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Yoga Pose Library
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Explore our collection of {totalPoses}+ yoga poses. Each pose includes
              detailed instructions, benefits, modifications, and alignment cues.
            </p>
          </div>

          {/* Filters */}
          <div className="glass-card p-4 mb-8">
            <form className="flex flex-col md:flex-row gap-4">
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
                  className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-neutral-600">
              Showing {poses.length} of {totalPoses} poses
            </p>
          </div>

          {/* Pose Grid */}
          <Suspense fallback={<PoseGridSkeleton />}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {poses.map((pose) => (
                <Link key={pose.slug} href={`/poses/${pose.slug}`}>
                  <Card
                    variant="glass"
                    padding="none"
                    hover
                    className="group overflow-hidden h-full"
                  >
                    {/* Pose Image Placeholder */}
                    <div className="aspect-[4/3] bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                      <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center">
                        <span className="text-3xl text-neutral-400 font-light">
                          {pose.english_name.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Pose Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h2 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                          {pose.english_name}
                        </h2>
                        <DifficultyBadge difficulty={pose.difficulty} size="sm" />
                      </div>
                      {pose.sanskrit_name && (
                        <p className="text-sm text-neutral-500 italic mb-3">
                          {pose.sanskrit_name}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        <PoseTypeBadge poseType={pose.pose_type} />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Suspense>

          {/* Empty State */}
          {poses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No poses found
              </h3>
              <p className="text-neutral-600 mb-4">
                Try adjusting your search or filters
              </p>
              <Link
                href="/poses"
                className="text-primary-600 hover:text-primary-700 font-medium"
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="glass-card overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-neutral-200" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-neutral-200 rounded w-3/4" />
            <div className="h-4 bg-neutral-200 rounded w-1/2" />
            <div className="h-6 bg-neutral-200 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
