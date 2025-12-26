'use client';

import { useState, useRef, useCallback } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportElementToPdf, sanitizeFilename } from '@/lib/utils/exportPdf';
import { cn } from '@/lib/utils/cn';

interface PdfDownloadButtonProps {
  targetRef: React.RefObject<HTMLElement | null>;
  filename?: string;
  className?: string;
  variant?: 'button' | 'icon';
  children?: React.ReactNode;
}

export function PdfDownloadButton({
  targetRef,
  filename = 'yoga-flow',
  className,
  variant = 'button',
  children,
}: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!targetRef.current || isGenerating) return;

    setIsGenerating(true);
    try {
      await exportElementToPdf(targetRef.current, {
        filename: `${sanitizeFilename(filename)}.pdf`,
        quality: 0.95,
        scale: 2,
      });
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [targetRef, filename, isGenerating]);

  if (variant === 'icon') {
    return (
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={cn(
          'p-2 rounded-lg transition-colors',
          'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        title="Download PDF"
      >
        {isGenerating ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2',
        'bg-primary-500 text-white font-medium rounded-lg',
        'hover:bg-primary-600 transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>{children || 'Download PDF'}</span>
        </>
      )}
    </button>
  );
}
