import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PoseForm from '../PoseForm';

export default function NewPosePage() {
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
        <h1 className="text-2xl font-bold text-neutral-900">Add New Pose</h1>
        <p className="text-neutral-600">Create a new yoga pose for your library</p>
      </div>

      <PoseForm />
    </div>
  );
}
