'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Loader2, X, AlertTriangle, Eye } from 'lucide-react';
import { PoseListItem, PoseStatus, PoseDifficulty, PoseType, POSE_STATUSES } from '@/types/pose';
import { PoseTableActions } from './PoseTableActions';

interface SearchParams {
  search?: string;
  status?: string;
  difficulty?: string;
  pose_type?: string;
  page?: string;
}

interface PosesTableClientProps {
  poses: PoseListItem[];
  total: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  searchParams: SearchParams;
}

function StatusBadge({ status }: { status: PoseStatus }) {
  const statusConfig = POSE_STATUSES.find((s) => s.value === status);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig?.color || 'bg-gray-100 text-gray-800'}`}>
      {statusConfig?.label || status}
    </span>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: PoseDifficulty }) {
  const colors: Record<PoseDifficulty, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
}

function PoseTypeBadge({ poseType }: { poseType: PoseType | null }) {
  if (!poseType) return <span className="text-neutral-400">-</span>;
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 capitalize">
      {poseType.replace('_', ' ')}
    </span>
  );
}

export function PosesTableClient({
  poses,
  total,
  currentPage,
  totalPages,
  itemsPerPage,
  searchParams,
}: PosesTableClientProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const allSelected = poses.length > 0 && poses.every((pose) => selectedIds.has(pose.id));
  const someSelected = poses.some((pose) => selectedIds.has(pose.id));

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all on current page
      const newSelected = new Set(selectedIds);
      poses.forEach((pose) => newSelected.delete(pose.id));
      setSelectedIds(newSelected);
    } else {
      // Select all on current page
      const newSelected = new Set(selectedIds);
      poses.forEach((pose) => newSelected.add(pose.id));
      setSelectedIds(newSelected);
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch('/api/admin/poses/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete poses');
      }

      setSelectedIds(new Set());
      setShowConfirmDialog(false);
      router.refresh();
    } catch (error) {
      console.error('Error deleting poses:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete poses');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkPublish = async () => {
    if (selectedIds.size === 0) return;

    setIsPublishing(true);
    try {
      const response = await fetch('/api/admin/poses/bulk-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to publish poses');
      }

      setSelectedIds(new Set());
      router.refresh();
    } catch (error) {
      console.error('Error publishing poses:', error);
      alert(error instanceof Error ? error.message : 'Failed to publish poses');
    } finally {
      setIsPublishing(false);
    }
  };

  // Build pagination URL
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (searchParams.search) params.set('search', searchParams.search);
    if (searchParams.status) params.set('status', searchParams.status);
    if (searchParams.difficulty) params.set('difficulty', searchParams.difficulty);
    if (searchParams.pose_type) params.set('pose_type', searchParams.pose_type);
    params.set('page', String(page));
    return `/admin/poses?${params.toString()}`;
  };

  return (
    <>
      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-primary-900">
              {selectedIds.size} pose{selectedIds.size > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={handleClearSelection}
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear selection
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkPublish}
              disabled={isPublishing || isDeleting}
              className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
            >
              {isPublishing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              Publish Selected
            </button>
            <button
              onClick={() => setShowConfirmDialog(true)}
              disabled={isDeleting || isPublishing}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">Delete Poses</h3>
                  <p className="text-sm text-neutral-500">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-neutral-700 mb-6">
                Are you sure you want to delete <strong>{selectedIds.size}</strong> pose{selectedIds.size > 1 ? 's' : ''}?
                This will also delete their associated images from storage.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete {selectedIds.size} Pose{selectedIds.size > 1 ? 's' : ''}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900 w-16">Image</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Difficulty</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Updated</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {poses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-neutral-500">
                    No poses found. Try adjusting your filters or add your first pose!
                  </td>
                </tr>
              ) : (
                poses.map((pose) => (
                  <tr
                    key={pose.id}
                    className={`hover:bg-neutral-50 transition-colors ${
                      selectedIds.has(pose.id) ? 'bg-primary-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(pose.id)}
                        onChange={() => handleSelectOne(pose.id)}
                        className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
                        {pose.image_url ? (
                          <Image
                            src={pose.image_url}
                            alt={pose.english_name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-neutral-400 text-xs">No img</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-neutral-900">{pose.english_name}</p>
                        {pose.sanskrit_name && (
                          <p className="text-sm text-neutral-500 italic">{pose.sanskrit_name}</p>
                        )}
                        <p className="text-xs text-neutral-400 mt-0.5">/{pose.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <PoseTypeBadge poseType={pose.pose_type} />
                    </td>
                    <td className="px-6 py-4">
                      <DifficultyBadge difficulty={pose.difficulty} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={pose.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {new Date(pose.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <PoseTableActions pose={pose} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-neutral-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, total)} of {total} poses
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={buildPageUrl(currentPage - 1)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm font-medium text-neutral-900">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={buildPageUrl(currentPage + 1)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
