import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import PoseForm from '../../PoseForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPosePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pose, error } = await (supabase as any)
    .from('poses')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !pose) {
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
        <p className="text-neutral-600">Update {pose.english_name}</p>
      </div>

      <PoseForm initialData={{ ...pose, id: pose.id }} isEditing />
    </div>
  );
}
