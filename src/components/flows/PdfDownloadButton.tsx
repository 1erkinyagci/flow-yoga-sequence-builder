'use client';

import { useState, useCallback } from 'react';
import { Download, Loader2, Crown } from 'lucide-react';
import Link from 'next/link';
import { exportElementToPdf, sanitizeFilename } from '@/lib/utils/exportPdf';
import { cn } from '@/lib/utils/cn';

interface PdfDownloadButtonProps {
  targetRef: React.RefObject<HTMLElement | null>;
  filename?: string;
  className?: string;
  variant?: 'button' | 'icon';
  isProUser?: boolean;
  children?: React.ReactNode;
}

export function PdfDownloadButton({
  targetRef,
  filename = 'yoga-flow',
  className,
  variant = 'button',
  isProUser = false,
  children,
}: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpgradeHint, setShowUpgradeHint] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!isProUser) {
      setShowUpgradeHint(true);
      setTimeout(() => setShowUpgradeHint(false), 3000);
      return;
    }

    if (!targetRef.current || isGenerating) return;

    setIsGenerating(true);
    try {
      await exportElementToPdf(targetRef.current, {
        filename: `${sanitizeFilename(filename)}.pdf`,
        quality: 0.95,
        scale: 2,
      });
    } catch (error) {
      console.error('[PDF Button] Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [targetRef, filename, isGenerating, isProUser]);

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={cn(
            'p-2 rounded-lg transition-colors',
            'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          title={isProUser ? 'Download PDF' : 'Upgrade to Pro for PDF export'}
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : !isProUser ? (
            <Crown className="w-5 h-5 text-amber-500" />
          ) : (
            <Download className="w-5 h-5" />
          )}
        </button>
        {showUpgradeHint && (
          <div className="absolute top-full right-0 mt-1 z-50 w-48 p-2 bg-white rounded-lg shadow-lg border text-xs text-neutral-700">
            <p className="font-medium mb-1">Pro feature</p>
            <p className="text-neutral-500 mb-2">PDF export requires a Pro plan.</p>
            <Link href="/pricing" className="text-primary-600 hover:underline font-medium">
              Upgrade to Pro
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2',
          isProUser
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed',
          'font-medium rounded-lg transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </>
        ) : !isProUser ? (
          <>
            <Crown className="w-4 h-4 text-amber-500" />
            <span>{children || 'Download PDF'}</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>{children || 'Download PDF'}</span>
          </>
        )}
      </button>
      {showUpgradeHint && (
        <div className="absolute top-full left-0 mt-1 z-50 w-56 p-3 bg-white rounded-lg shadow-lg border text-xs text-neutral-700">
          <p className="font-medium mb-1">Pro feature</p>
          <p className="text-neutral-500 mb-2">PDF export requires a Pro plan.</p>
          <Link href="/pricing" className="text-primary-600 hover:underline font-medium">
            Upgrade to Pro
          </Link>
        </div>
      )}
    </div>
  );
}
