'use client';

import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Clock, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { PoseSide } from '@/types';

type ZoomLevel = 'small' | 'medium' | 'large';

interface VisualFlowItemProps {
  id: string;
  index: number;
  poseName: string;
  poseImage?: string | null;
  durationSeconds: number;
  side: PoseSide;
  notes: string;
  zoomLevel?: ZoomLevel;
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

export function VisualFlowItem({
  id,
  index,
  poseName,
  poseImage,
  durationSeconds,
  side,
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

  // Max zoom (large) - only image and name
  if (zoomLevel === 'large') {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'bg-white rounded-3xl border border-neutral-100 shadow-sm relative overflow-hidden group',
          'transition-all duration-200',
          isDragging && 'shadow-xl ring-2 ring-primary-500/30 z-10 scale-[1.02]'
        )}
      >
        {/* Delete button */}
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors z-20 opacity-0 group-hover:opacity-100"
          aria-label="Remove pose"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Position badge */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg z-20">
          {index + 1}
        </div>

        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="absolute top-4 left-16 p-2 bg-black/30 hover:bg-black/50 text-white rounded-lg cursor-grab active:cursor-grabbing touch-none z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Main Image */}
        <div className="aspect-[4/5] bg-gradient-to-br from-neutral-50 to-neutral-100 relative">
          {poseImage ? (
            <Image
              src={poseImage}
              alt={poseName}
              fill
              className="object-contain p-6"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl text-neutral-200 font-light">
                {poseName.charAt(0)}
              </span>
            </div>
          )}

          {/* Gradient overlay for text */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Pose name overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="text-white font-semibold text-base leading-tight drop-shadow-lg">
              {poseName}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  // Small zoom - compact with all controls
  if (zoomLevel === 'small') {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'bg-white rounded-xl border border-neutral-100 shadow-sm relative overflow-hidden group',
          'transition-all duration-200',
          isDragging && 'shadow-xl ring-2 ring-primary-500/30 z-10 scale-[1.02]'
        )}
      >
        {/* Delete button */}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-5 h-5 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors z-20 opacity-0 group-hover:opacity-100"
          aria-label="Remove pose"
        >
          <X className="w-2.5 h-2.5" />
        </button>

        {/* Position badge */}
        <div className="absolute top-2 left-2 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg z-20">
          {index + 1}
        </div>

        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="absolute top-2 left-8 p-0.5 bg-black/30 hover:bg-black/50 text-white rounded cursor-grab active:cursor-grabbing touch-none z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-2.5 h-2.5" />
        </button>

        {/* Main Image */}
        <div className="aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 relative">
          {poseImage ? (
            <Image
              src={poseImage}
              alt={poseName}
              fill
              className="object-contain p-1.5"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl text-neutral-200 font-light">
                {poseName.charAt(0)}
              </span>
            </div>
          )}

          {/* Gradient overlay for text */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Pose name overlay */}
          <div className="absolute inset-x-0 bottom-0 p-1.5">
            <h3 className="text-white font-medium text-[10px] leading-tight drop-shadow-lg truncate">
              {poseName}
            </h3>
          </div>
        </div>

        {/* Controls */}
        <div className="p-2">
          <div className="flex items-center justify-between gap-2">
            {/* Duration Controls */}
            <div className="flex items-center gap-0.5 bg-neutral-100 rounded p-0.5">
              <button
                onClick={() => adjustDuration(-5)}
                className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-white rounded transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-1 px-1.5 min-w-[45px] justify-center">
                <Clock className="w-3 h-3 text-neutral-400" />
                <span className="text-xs font-semibold text-neutral-700">
                  {formatDuration(durationSeconds)}
                </span>
              </div>
              <button
                onClick={() => adjustDuration(5)}
                className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-white rounded transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Side Selector */}
            <select
              value={side}
              onChange={(e) => onUpdate({ side: e.target.value as PoseSide })}
              className="text-xs text-neutral-600 bg-neutral-100 rounded px-2 py-1 border-none focus:ring-1 focus:ring-primary-500 font-medium"
            >
              {sideOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Medium zoom (default)
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-white rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden group',
        'transition-all duration-200',
        isDragging && 'shadow-xl ring-2 ring-primary-500/30 z-10 scale-[1.02]'
      )}
    >
      {/* Delete button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors z-20 opacity-0 group-hover:opacity-100"
        aria-label="Remove pose"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Position badge */}
      <div className="absolute top-3 left-3 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20">
        {index + 1}
      </div>

      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-3 left-14 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-lg cursor-grab active:cursor-grabbing touch-none z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Main Image */}
      <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-50 relative">
        {poseImage ? (
          <Image
            src={poseImage}
            alt={poseName}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl text-neutral-300 font-light">
              {poseName.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay for text */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Pose name overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="text-white font-medium text-sm leading-tight drop-shadow-lg truncate">
            {poseName}
          </h3>
        </div>
      </div>

      {/* Controls */}
      <div className="p-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Duration Controls */}
          <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => adjustDuration(-5)}
              className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-white rounded transition-colors"
              aria-label="Decrease duration"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 px-2 min-w-[60px] justify-center">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span className="text-sm font-semibold text-neutral-700">
                {formatDuration(durationSeconds)}
              </span>
            </div>
            <button
              onClick={() => adjustDuration(5)}
              className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-white rounded transition-colors"
              aria-label="Increase duration"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Side Selector */}
          <select
            value={side}
            onChange={(e) => onUpdate({ side: e.target.value as PoseSide })}
            className="text-sm text-neutral-600 bg-neutral-100 rounded-lg px-2 py-1.5 border-none focus:ring-2 focus:ring-primary-500 font-medium"
          >
            {sideOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
