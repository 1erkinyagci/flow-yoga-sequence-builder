'use client';

import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ZoomLevel = 'small' | 'medium' | 'large' | 'xlarge';

interface VisualFlowItemProps {
  id: string;
  index: number;
  poseName: string;
  poseImage?: string | null;
  durationSeconds: number;
  side?: string;
  notes?: string;
  zoomLevel?: ZoomLevel;
  onUpdate: (updates: Partial<{
    durationSeconds: number;
  }>) => void;
  onRemove: () => void;
}

export function VisualFlowItem({
  id,
  index,
  poseName,
  poseImage,
  durationSeconds,
  zoomLevel = 'medium',
  onUpdate,
  onRemove,
}: VisualFlowItemProps) {
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

  // iOS-style size configurations
  // Image radius is proportionally inset from card radius
  const sizes = {
    small: {
      card: 'rounded-xl',
      badge: 'w-5 h-5 text-[10px] -top-1 -left-1',
      deleteBtn: 'w-6 h-6 -top-1.5 -right-1.5',
      deleteIcon: 'w-3 h-3',
      dragBtn: 'w-6 h-6',
      dragIcon: 'w-3 h-3',
      imageRadius: 'rounded-lg',
      imagePadding: 'p-0.5',
      imageMargin: 'm-0.5',
      nameText: 'text-[9px]',
      durationText: 'text-[8px]',
      durationBtn: 'w-4 h-4',
      durationIcon: 'w-2 h-2',
      contentPadding: 'px-1 pb-1 -mt-0.5',
      gap: 'gap-0.5',
    },
    medium: {
      card: 'rounded-2xl',
      badge: 'w-6 h-6 text-xs -top-1.5 -left-1.5',
      deleteBtn: 'w-7 h-7 -top-2 -right-2',
      deleteIcon: 'w-3.5 h-3.5',
      dragBtn: 'w-7 h-7',
      dragIcon: 'w-3.5 h-3.5',
      imageRadius: 'rounded-xl',
      imagePadding: 'p-1',
      imageMargin: 'm-1',
      nameText: 'text-[10px]',
      durationText: 'text-[9px]',
      durationBtn: 'w-5 h-5',
      durationIcon: 'w-2.5 h-2.5',
      contentPadding: 'px-1.5 pb-1.5 pt-0',
      gap: 'gap-0.5',
    },
    large: {
      card: 'rounded-2xl',
      badge: 'w-7 h-7 text-sm -top-2 -left-2',
      deleteBtn: 'w-8 h-8 -top-2 -right-2',
      deleteIcon: 'w-4 h-4',
      dragBtn: 'w-8 h-8',
      dragIcon: 'w-4 h-4',
      imageRadius: 'rounded-xl',
      imagePadding: 'p-1.5',
      imageMargin: 'm-1.5',
      nameText: 'text-[11px]',
      durationText: 'text-[10px]',
      durationBtn: 'w-6 h-6',
      durationIcon: 'w-3 h-3',
      contentPadding: 'px-2 pb-2 pt-0.5',
      gap: 'gap-1',
    },
    xlarge: {
      card: 'rounded-3xl',
      badge: 'w-8 h-8 text-base -top-2.5 -left-2.5',
      deleteBtn: 'w-9 h-9 -top-2.5 -right-2.5',
      deleteIcon: 'w-4.5 h-4.5',
      dragBtn: 'w-9 h-9',
      dragIcon: 'w-4.5 h-4.5',
      imageRadius: 'rounded-2xl',
      imagePadding: 'p-2',
      imageMargin: 'm-2',
      nameText: 'text-xs',
      durationText: 'text-[11px]',
      durationBtn: 'w-7 h-7',
      durationIcon: 'w-3.5 h-3.5',
      contentPadding: 'px-2.5 pb-2.5 pt-1',
      gap: 'gap-1',
    },
  };

  const s = sizes[zoomLevel];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group',
        'transition-all duration-300 ease-out',
        isDragging && 'z-50 scale-105'
      )}
    >
      {/* iOS Card */}
      <div
        className={cn(
          // Base card style
          'relative overflow-hidden',
          'bg-white/80 backdrop-blur-xl',
          'border border-white/50',
          'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]',
          s.card,
          // Hover & drag states
          'transition-all duration-300',
          'hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1),0_20px_40px_-5px_rgba(0,0,0,0.06)]',
          'hover:scale-[1.02]',
          isDragging && 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] bg-white/95'
        )}
      >
        {/* Inner highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />

        {/* Image Container */}
        <div className={cn('relative', s.imageMargin, s.imagePadding)}>
          <div className={cn('aspect-square relative overflow-hidden', s.imageRadius)}>
            {poseImage ? (
              <Image
                src={poseImage}
                alt={poseName}
                fill
                className="object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
                <span className={cn(
                  'font-light text-neutral-300',
                  zoomLevel === 'small' && 'text-4xl',
                  zoomLevel === 'medium' && 'text-5xl',
                  zoomLevel === 'large' && 'text-6xl',
                  zoomLevel === 'xlarge' && 'text-7xl'
                )}>
                  {poseName.charAt(0)}
                </span>
              </div>
            )}

            {/* Drag handle - centered at top, appears on hover */}
            <button
              {...attributes}
              {...listeners}
              className={cn(
                'absolute top-2 left-1/2 -translate-x-1/2',
                'flex items-center justify-center',
                'bg-black/20 backdrop-blur-md',
                'text-white/90 rounded-full',
                'cursor-grab active:cursor-grabbing touch-none',
                'opacity-0 group-hover:opacity-100',
                'transition-all duration-200',
                'hover:bg-black/30 hover:scale-110',
                s.dragBtn
              )}
              aria-label="Drag to reorder"
            >
              <GripVertical className={s.dragIcon} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={cn('relative', s.contentPadding)}>
          {/* Pose name */}
          <h3 className={cn(
            'font-semibold text-neutral-800 truncate text-center mb-0.5',
            s.nameText
          )}>
            {poseName}
          </h3>

          {/* Duration Controls - iOS style segmented control look */}
          <div className="flex items-center justify-center">
            <div className={cn(
              'inline-flex items-center',
              'bg-neutral-100/80 backdrop-blur-sm rounded-full',
              s.gap
            )}>
              <button
                onClick={() => adjustDuration(-5)}
                className={cn(
                  'flex items-center justify-center',
                  'rounded-full',
                  'text-neutral-500',
                  'transition-all duration-200',
                  'hover:bg-white hover:text-neutral-700 hover:shadow-sm',
                  'active:scale-95',
                  s.durationBtn
                )}
                aria-label="Decrease duration"
              >
                <Minus className={s.durationIcon} />
              </button>

              <span className={cn(
                'font-semibold text-neutral-700 tabular-nums px-1',
                s.durationText
              )}>
                {formatDuration(durationSeconds)}
              </span>

              <button
                onClick={() => adjustDuration(5)}
                className={cn(
                  'flex items-center justify-center',
                  'rounded-full',
                  'text-neutral-500',
                  'transition-all duration-200',
                  'hover:bg-white hover:text-neutral-700 hover:shadow-sm',
                  'active:scale-95',
                  s.durationBtn
                )}
                aria-label="Increase duration"
              >
                <Plus className={s.durationIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Position Badge - iOS notification style */}
      <div
        className={cn(
          'absolute z-20 flex items-center justify-center',
          'font-bold text-white',
          'bg-gradient-to-br from-blue-500 to-blue-600',
          'rounded-full shadow-lg',
          'ring-2 ring-white',
          s.badge
        )}
      >
        {index + 1}
      </div>

      {/* Delete button - iOS style */}
      <button
        onClick={onRemove}
        className={cn(
          'absolute z-20 flex items-center justify-center',
          'bg-gradient-to-br from-red-500 to-red-600',
          'text-white rounded-full',
          'shadow-lg ring-2 ring-white',
          'opacity-0 group-hover:opacity-100',
          'transition-all duration-200',
          'hover:scale-110 hover:shadow-xl',
          'active:scale-95',
          s.deleteBtn
        )}
        aria-label="Remove pose"
      >
        <X className={s.deleteIcon} />
      </button>
    </div>
  );
}
