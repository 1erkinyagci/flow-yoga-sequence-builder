'use client';

import Image from 'next/image';
import { Clock, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Flow, FlowItemWithPose, FlowStyle, Difficulty } from '@/types';

interface FlowPrintPreviewProps {
  flow: Flow;
  items: FlowItemWithPose[];
  creatorName?: string;
  className?: string;
}

const styleLabels: Record<FlowStyle, string> = {
  vinyasa: 'Vinyasa',
  hatha: 'Hatha',
  yin: 'Yin',
  restorative: 'Restorative',
  power: 'Power',
  gentle: 'Gentle',
  prenatal: 'Prenatal',
  custom: 'Custom',
};

const levelLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return secs === 0 ? `${mins}m` : `${mins}m ${secs}s`;
}

function formatTotalDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
}

export function FlowPrintPreview({
  flow,
  items,
  creatorName,
  className,
}: FlowPrintPreviewProps) {
  const totalDuration = items.reduce((acc, item) => acc + item.duration_seconds, 0);

  return (
    <div className={cn('flow-print-container bg-white', className)}>
      {/* Header */}
      <header className="flow-print-header border-b border-neutral-200 pb-4 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-neutral-900 truncate">
              {flow.title || 'Untitled Flow'}
            </h1>
            {flow.description && (
              <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                {flow.description}
              </p>
            )}
          </div>

          {/* Meta badges */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                {styleLabels[flow.style]}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
                {levelLabels[flow.level]}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{formatTotalDuration(totalDuration)}</span>
          </div>
          <span className="text-neutral-300">•</span>
          <span>{items.length} poses</span>
          {creatorName && (
            <>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{creatorName}</span>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Pose Grid - 4 cols on desktop/print, 2 cols on mobile */}
      <div className="flow-print-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flow-print-item relative bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200"
          >
            {/* Position badge */}
            <div className="absolute top-2 left-2 z-10 w-6 h-6 flex items-center justify-center bg-primary-500 text-white text-xs font-bold rounded-full shadow-md">
              {index + 1}
            </div>

            {/* Pose image */}
            <div className="aspect-square relative bg-white">
              {item.pose?.image_url ? (
                <Image
                  src={item.pose.image_url}
                  alt={item.pose.english_name}
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-light text-neutral-300">
                    {item.pose?.english_name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>

            {/* Pose info */}
            <div className="p-2 text-center border-t border-neutral-100">
              <h3 className="text-xs font-semibold text-neutral-800 truncate">
                {item.pose?.english_name || 'Unknown Pose'}
              </h3>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                {formatDuration(item.duration_seconds)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="flow-print-footer border-t border-neutral-200 pt-4 mt-6">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <span>{items.length} poses</span>
            <span>•</span>
            <span>{formatTotalDuration(totalDuration)} total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Created with</span>
            <span className="font-semibold text-primary-600">FLOW</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
