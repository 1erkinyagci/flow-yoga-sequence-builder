'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { POSE_STATUSES, POSE_DIFFICULTIES, POSE_TYPES } from '@/types/pose';

interface PoseFiltersClientProps {
  initialSearch: string;
  initialStatus: string;
  initialDifficulty: string;
  initialPoseType: string;
}

export function PoseFiltersClient({
  initialSearch,
  initialStatus,
  initialDifficulty,
  initialPoseType,
}: PoseFiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 when filters change
      params.delete('page');

      router.push(`/admin/poses?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search });
  };

  const clearSearch = () => {
    setSearch('');
    updateFilters({ search: '' });
  };

  const clearAllFilters = () => {
    setSearch('');
    router.push('/admin/poses');
  };

  const hasActiveFilters =
    initialSearch || initialStatus !== 'all' || initialDifficulty !== 'all' || initialPoseType !== 'all';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Status Filter */}
        <div className="w-full lg:w-40">
          <select
            value={initialStatus}
            onChange={(e) => updateFilters({ status: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            {POSE_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="w-full lg:w-40">
          <select
            value={initialDifficulty}
            onChange={(e) => updateFilters({ difficulty: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Levels</option>
            {POSE_DIFFICULTIES.map((difficulty) => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </div>

        {/* Pose Type Filter */}
        <div className="w-full lg:w-48">
          <select
            value={initialPoseType}
            onChange={(e) => updateFilters({ pose_type: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            {POSE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors whitespace-nowrap"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
