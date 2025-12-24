'use client';

import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Clock, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { PoseSide } from '@/types';

interface SortableFlowItemProps {
  id: string;
  index: number;
  poseName: string;
  poseImage?: string | null;
  durationSeconds: number;
  side: PoseSide;
  notes: string;
  onUpdate: (updates: Partial<{
    durationSeconds: number;
    side: PoseSide;
    notes: string;
  }>) => void;
  onRemove: () => void;
}

const sideOptions: { value: PoseSide; label: string }[] = [
  { value: 'both', label: 'Both' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'center', label: 'Center' },
];

export function SortableFlowItem({
  id,
  index,
  poseName,
  poseImage,
  durationSeconds,
  side,
  notes,
  onUpdate,
  onRemove,
}: SortableFlowItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return secs === 0 ? `${mins}m` : `${mins}m ${secs}s`;
  };

  const adjustDuration = (delta: number) => {
    const newDuration = Math.max(5, Math.min(300, durationSeconds + delta));
    onUpdate({ durationSeconds: newDuration });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-white rounded-xl border border-neutral-100 shadow-sm relative',
        'transition-shadow duration-200',
        isDragging && 'shadow-lg ring-2 ring-primary-500/20 z-10'
      )}
    >
      {/* Delete button in top-right corner */}
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors z-10"
        aria-label="Remove pose"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-3 p-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1 text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Index */}
        <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
          {index + 1}
        </div>

        {/* Pose Image */}
        <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {poseImage ? (
            <Image
              src={poseImage}
              alt={poseName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-neutral-400 font-light text-lg">
              {poseName.charAt(0)}
            </span>
          )}
        </div>

        {/* Pose Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-neutral-900 truncate">{poseName}</p>
          <div className="flex items-center gap-2 mt-1">
            {/* Side Selector */}
            <select
              value={side}
              onChange={(e) => onUpdate({ side: e.target.value as PoseSide })}
              className="text-xs text-neutral-600 bg-neutral-100 rounded-full px-2 py-0.5 border-none focus:ring-1 focus:ring-primary-500"
            >
              {sideOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Duration Controls */}
        <div className="flex items-center gap-1 bg-neutral-50 rounded-lg p-1">
          <button
            onClick={() => adjustDuration(-5)}
            className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded"
            aria-label="Decrease duration"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 px-2 min-w-[60px] justify-center">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700">
              {formatDuration(durationSeconds)}
            </span>
          </div>
          <button
            onClick={() => adjustDuration(5)}
            className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded"
            aria-label="Increase duration"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notes (expandable) */}
      <div className="px-3 pb-3 pt-0">
        <input
          type="text"
          value={notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Add notes..."
          className="w-full text-sm text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2 border-none placeholder:text-neutral-400 focus:ring-1 focus:ring-primary-500 focus:bg-white"
        />
      </div>
    </div>
  );
}
