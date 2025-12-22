'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MoreVertical, Pencil, Trash2, Eye, EyeOff, Archive, ExternalLink } from 'lucide-react';
import { PoseListItem, PoseStatus } from '@/types/pose';

interface PoseTableActionsProps {
  pose: PoseListItem;
}

export function PoseTableActions({ pose }: PoseTableActionsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusChange = async (newStatus: PoseStatus) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/poses/${pose.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update pose status');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${pose.english_name}"? This action cannot be undone.`)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/poses/${pose.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pose');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting pose:', error);
      alert('Failed to delete pose');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center justify-end gap-2" ref={menuRef}>
      {/* Quick edit button */}
      <Link
        href={`/admin/poses/${pose.id}`}
        className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
        title="Edit pose"
      >
        <Pencil className="w-4 h-4" />
      </Link>

      {/* More actions dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
        title="More actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 z-50">
          {/* View on site (only for published) */}
          {pose.status === 'published' && (
            <Link
              href={`/poses/${pose.slug}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 w-full"
            >
              <ExternalLink className="w-4 h-4" />
              View on Site
            </Link>
          )}

          {/* Status changes */}
          {pose.status !== 'published' && (
            <button
              onClick={() => handleStatusChange('published')}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              Publish
            </button>
          )}

          {pose.status === 'published' && (
            <button
              onClick={() => handleStatusChange('draft')}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 w-full disabled:opacity-50"
            >
              <EyeOff className="w-4 h-4" />
              Unpublish (Draft)
            </button>
          )}

          {pose.status !== 'archived' && (
            <button
              onClick={() => handleStatusChange('archived')}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 w-full disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              Archive
            </button>
          )}

          {pose.status === 'archived' && (
            <button
              onClick={() => handleStatusChange('draft')}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 w-full disabled:opacity-50"
            >
              <EyeOff className="w-4 h-4" />
              Restore to Draft
            </button>
          )}

          <div className="border-t border-neutral-100 my-1" />

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
