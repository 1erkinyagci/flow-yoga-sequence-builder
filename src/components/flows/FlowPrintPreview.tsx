'use client';

import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { getProxiedImageUrl } from '@/lib/images';
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
    <div className={cn('flow-print-container', className)}>
      {/* Page wrapper with light gray background */}
      <div className="bg-[#f5f5f7] p-4 md:p-12">

        {/* Header Section */}
        <header className="mb-6 md:mb-10">
          {/* Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6 mb-4 md:mb-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight" style={{ color: '#171717' }}>
                {flow.title || 'Yoga Flow Sequence'}
              </h1>
              {flow.description && (
                <p className="mt-2 md:mt-3 text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: '#525252' }}>
                  {flow.description}
                </p>
              )}
            </div>

            {/* Style & Level Badges */}
            <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
              <span className="px-2.5 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-full" style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>
                {styleLabels[flow.style]}
              </span>
              <span className="px-2.5 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-full" style={{ backgroundColor: '#e5e5e5', color: '#404040' }}>
                {levelLabels[flow.level]}
              </span>
            </div>
          </div>

          {/* Meta Info Bar - Compact on mobile */}
          <div
            className="flex items-center justify-between py-2.5 md:py-4 border-y"
            style={{ borderColor: 'rgba(212, 212, 212, 0.5)' }}
          >
            <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm" style={{ color: '#525252' }}>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: '#a3a3a3' }} />
                <span className="font-semibold">{formatTotalDuration(totalDuration)}</span>
              </div>
              <span style={{ color: '#d4d4d4' }}>•</span>
              <span className="font-semibold">{items.length} poses</span>
            </div>

            {creatorName && (
              <div className="flex items-center gap-1.5 text-xs md:text-sm" style={{ color: '#737373' }}>
                <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Created by </span>
                <span className="font-medium" style={{ color: '#404040' }}>{creatorName}</span>
              </div>
            )}
          </div>
        </header>

        {/* Pose Grid - 3 columns, minimal gaps on mobile */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flow-print-item relative rounded-md md:rounded-lg overflow-hidden"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)' }}
            >
              {/* Pose Number - Subtle top-left badge */}
              <div
                className="absolute top-1 left-1 md:top-2 md:left-2 z-10 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[9px] md:text-[11px] font-bold rounded-full"
                style={{ backgroundColor: 'rgba(38, 38, 38, 0.8)', color: '#ffffff' }}
              >
                {index + 1}
              </div>

              {/* Pose Image - Maximized with minimal margin */}
              <div
                className="aspect-square relative m-0.5 md:m-1.5 rounded-sm md:rounded-md overflow-hidden select-none"
                style={{ backgroundColor: '#f5f5f5' }}
                onContextMenu={(e) => e.preventDefault()}
              >
                {item.pose?.image_url ? (
                  <Image
                    src={getProxiedImageUrl(item.pose.image_url) || item.pose.image_url}
                    alt={item.pose.english_name}
                    fill
                    className="object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl md:text-5xl font-light" style={{ color: '#e5e5e5' }}>
                      {item.pose?.english_name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                {/* FLOW Logo Watermark - Responsive size */}
                <div className="absolute top-0.5 right-0.5 md:top-1.5 md:right-1.5 z-10 w-5 h-5 md:w-10 md:h-10">
                  <Image
                    src="/images/flow-logo.png"
                    alt="FLOW"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Pose Info - Compact layout */}
              <div className="px-1.5 pb-1.5 pt-0.5 md:px-2.5 md:pb-2.5 md:pt-1">
                {/* Name row with duration on the right */}
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-[10px] md:text-[13px] font-semibold leading-snug truncate flex-1" style={{ color: '#262626' }}>
                    {item.pose?.english_name || 'Unknown Pose'}
                  </h3>
                  <div className="flex items-center gap-0.5 text-[8px] md:text-[11px] flex-shrink-0" style={{ color: '#a3a3a3' }}>
                    <Clock className="w-2 h-2 md:w-3 md:h-3" />
                    <span>{formatDuration(item.duration_seconds)}</span>
                  </div>
                </div>
                {/* Sanskrit name - hidden on mobile for space */}
                {item.pose?.sanskrit_name && (
                  <p className="hidden md:block text-[11px] italic truncate mt-0.5" style={{ color: '#a3a3a3' }}>
                    {item.pose.sanskrit_name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer - Simplified on mobile */}
        <footer className="mt-6 md:mt-10 pt-4 md:pt-6 border-t" style={{ borderColor: 'rgba(212, 212, 212, 0.5)' }}>
          <div className="flex items-center justify-between">
            {/* Left: Branding */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="text-base md:text-xl font-bold tracking-tight" style={{ color: '#262626' }}>
                FLOW
              </div>
              <span className="hidden md:inline" style={{ color: '#d4d4d4' }}>|</span>
              <span className="hidden md:inline text-xs" style={{ color: '#737373' }}>
                flowyogasequence.com
              </span>
            </div>

            {/* Center: Summary - visible on mobile */}
            <div className="text-[10px] md:text-xs" style={{ color: '#a3a3a3' }}>
              {items.length} poses • {formatTotalDuration(totalDuration)}
            </div>

            {/* Right: Generated note - hidden on mobile */}
            <div className="hidden md:block text-xs" style={{ color: '#a3a3a3' }}>
              Generated with FLOW Yoga Sequence Builder
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
