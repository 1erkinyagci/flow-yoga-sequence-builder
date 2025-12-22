import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import PoseForm from '../PoseForm';
import { Pose } from '@/types/pose';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getPose(id: string): Promise<Pose | null> {
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('poses')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Pose;
}

export default async function EditPosePage({ params }: PageProps) {
  const { id } = await params;
  const pose = await getPose(id);

  if (!pose) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/poses"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Poses
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900">Edit Pose</h1>
        <p className="text-neutral-600">
          Editing: <span className="font-medium">{pose.english_name}</span>
        </p>
      </div>

      <PoseForm initialData={pose} isEditing />
    </div>
  );
}
