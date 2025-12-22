import { Suspense } from 'react';
import Link from 'next/link';
import { Plus, Loader2 } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui';
import { PoseListItem } from '@/types/pose';
import { PoseFiltersClient } from './PoseFiltersClient';
import { PosesTableClient } from './PosesTableClient';

interface SearchParams {
  search?: string;
  status?: string;
  difficulty?: string;
  pose_type?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

const ITEMS_PER_PAGE = 20;

async function getPoses(searchParams: SearchParams) {
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const page = parseInt(searchParams.page || '1', 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  let query = db
    .from('poses')
    .select('id, slug, english_name, sanskrit_name, difficulty, pose_type, status, image_url, created_at, updated_at', { count: 'exact' });

  // Apply filters
  if (searchParams.search) {
    query = query.or(`english_name.ilike.%${searchParams.search}%,sanskrit_name.ilike.%${searchParams.search}%`);
  }

  if (searchParams.status && searchParams.status !== 'all') {
    query = query.eq('status', searchParams.status);
  }

  if (searchParams.difficulty && searchParams.difficulty !== 'all') {
    query = query.eq('difficulty', searchParams.difficulty);
  }

  if (searchParams.pose_type && searchParams.pose_type !== 'all') {
    query = query.eq('pose_type', searchParams.pose_type);
  }

  // Order and paginate
  query = query
    .order('updated_at', { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching poses:', error);
    return { poses: [], total: 0, error: error.message };
  }

  const poses: PoseListItem[] = (data || []).map((pose: Record<string, unknown>) => ({
    ...pose,
    has_image: !!pose.image_url,
  })) as PoseListItem[];

  return { poses, total: count || 0, error: null };
}

function PosesTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    </div>
  );
}

async function PosesTable({ searchParams }: { searchParams: SearchParams }) {
  const { poses, total, error } = await getPoses(searchParams);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
        Error loading poses: {error}
      </div>
    );
  }

  return (
    <PosesTableClient
      poses={poses}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={ITEMS_PER_PAGE}
      searchParams={searchParams}
    />
  );
}

export default async function AdminPosesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Pose Library</h1>
          <p className="text-neutral-600">Manage your yoga pose collection</p>
        </div>
        <Link href="/admin/poses/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Add New Pose
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <PoseFiltersClient
        initialSearch={params.search || ''}
        initialStatus={params.status || 'all'}
        initialDifficulty={params.difficulty || 'all'}
        initialPoseType={params.pose_type || 'all'}
      />

      {/* Table */}
      <Suspense fallback={<PosesTableSkeleton />}>
        <PosesTable searchParams={params} />
      </Suspense>
    </div>
  );
}
