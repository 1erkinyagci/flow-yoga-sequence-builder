'use client';

import Image from 'next/image';
import { Clock, User } from 'lucide-react';
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
  if (mins < 60) return `${mins} minutes`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
}

export function FlowPrintPreview({
  flow,
  items,
  creatorName,
  className,
}: FlowPrintPreviewProps) {
  const totalDuration = items.reduce((acc, item) => acc + item.duration_seconds, 0);

  return (
    <div className={cn('flow-print-container', className)}>
      {/* Page wrapper with light gray background */}
      <div className="bg-[#f5f5f7] p-8 md:p-12">

        {/* Header Section */}
        <header className="mb-10">
          {/* Title Row */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight" style={{ color: '#171717' }}>
                {flow.title || 'Yoga Flow Sequence'}
              </h1>
              {flow.description && (
                <p className="mt-3 text-base leading-relaxed max-w-2xl" style={{ color: '#525252' }}>
                  {flow.description}
                </p>
              )}
            </div>

            {/* Style & Level Badges */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-4 py-1.5 text-sm font-medium rounded-full" style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>
                {styleLabels[flow.style]}
              </span>
              <span className="px-4 py-1.5 text-sm font-medium rounded-full" style={{ backgroundColor: '#e5e5e5', color: '#404040' }}>
                {levelLabels[flow.level]}
              </span>
            </div>
          </div>

          {/* Meta Info Bar */}
          <div className="flex items-center justify-between py-4 border-y" style={{ borderColor: 'rgba(212, 212, 212, 0.5)' }}>
            <div className="flex items-center gap-6 text-sm" style={{ color: '#525252' }}>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#a3a3a3' }} />
                <span className="font-medium">{formatTotalDuration(totalDuration)}</span>
              </div>
              <span style={{ color: '#d4d4d4' }}>•</span>
              <span className="font-medium">{items.length} poses</span>
            </div>

            {creatorName && (
              <div className="flex items-center gap-2 text-sm" style={{ color: '#737373' }}>
                <User className="w-4 h-4" />
                <span>Created by <span className="font-medium" style={{ color: '#404040' }}>{creatorName}</span></span>
              </div>
            )}
          </div>
        </header>

        {/* Pose Grid - 3 columns for better PDF readability */}
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flow-print-item relative rounded-lg overflow-hidden"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)' }}
            >
              {/* Pose Number - Subtle top-left badge */}
              <div
                className="absolute top-2 left-2 z-10 w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-full"
                style={{ backgroundColor: 'rgba(38, 38, 38, 0.8)', color: '#ffffff' }}
              >
                {index + 1}
              </div>

              {/* Pose Image - Maximized with rounded corners mask */}
              <div className="aspect-square relative m-1.5 rounded-md overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
                {item.pose?.image_url ? (
                  <Image
                    src={item.pose.image_url}
                    alt={item.pose.english_name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-light" style={{ color: '#e5e5e5' }}>
                      {item.pose?.english_name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                {/* FLOW Logo Watermark - Top Right */}
                <div className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                  <Image
                    src="/images/yoga_sequencing_logo_transparent.jpg"
                    alt="FLOW"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Pose Info - Compact layout */}
              <div className="px-2.5 pb-2.5 pt-1">
                {/* Name row with duration on the right */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[13px] font-semibold leading-snug truncate flex-1" style={{ color: '#262626' }}>
                    {item.pose?.english_name || 'Unknown Pose'}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] flex-shrink-0" style={{ color: '#a3a3a3' }}>
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(item.duration_seconds)}</span>
                  </div>
                </div>
                {/* Sanskrit name */}
                {item.pose?.sanskrit_name && (
                  <p className="text-[11px] italic truncate mt-0.5" style={{ color: '#a3a3a3' }}>
                    {item.pose.sanskrit_name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t" style={{ borderColor: 'rgba(212, 212, 212, 0.5)' }}>
          <div className="flex items-center justify-between">
            {/* Left: Branding */}
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold tracking-tight" style={{ color: '#262626' }}>
                FLOW
              </div>
              <span style={{ color: '#d4d4d4' }}>|</span>
              <span className="text-xs" style={{ color: '#737373' }}>
                flowyogasequence.com
              </span>
            </div>

            {/* Center: Summary */}
            <div className="text-xs" style={{ color: '#a3a3a3' }}>
              {items.length} poses • {formatTotalDuration(totalDuration)}
            </div>

            {/* Right: Generated note */}
            <div className="text-xs" style={{ color: '#a3a3a3' }}>
              Generated with FLOW Yoga Sequence Builder
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
