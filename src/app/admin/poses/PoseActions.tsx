'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

export function DeletePoseButton({ poseId, poseName }: { poseId: string; poseName: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${poseName}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/poses/${poseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pose');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting pose:', error);
      alert('Failed to delete pose. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Delete"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}

export function TogglePublishButton({ poseId, isPublished }: { poseId: string; isPublished: boolean }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/admin/poses/${poseId}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !isPublished }),
      });

      if (!response.ok) {
        throw new Error('Failed to update pose');
      }

      router.refresh();
    } catch (error) {
      console.error('Error updating pose:', error);
      alert('Failed to update pose. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isUpdating}
      className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
        isPublished
          ? 'text-green-600 hover:bg-green-50'
          : 'text-neutral-400 hover:text-green-600 hover:bg-green-50'
      }`}
      title={isPublished ? 'Unpublish' : 'Publish'}
    >
      {isUpdating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPublished ? (
        <Eye className="w-4 h-4" />
      ) : (
        <EyeOff className="w-4 h-4" />
      )}
    </button>
  );
}
