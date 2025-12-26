'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { FlowPrintPreview } from '@/components/flows/FlowPrintPreview';
import { PrintButton } from '@/components/flows/PrintButton';
import { PdfDownloadButton } from '@/components/flows/PdfDownloadButton';
import { Container, Button } from '@/components/ui';
import { exportElementToPdf, sanitizeFilename } from '@/lib/utils/exportPdf';
import type { Flow, FlowItemWithPose, Profile } from '@/types';

interface FlowPageClientProps {
  flow: Flow & { profiles?: Pick<Profile, 'full_name'> | null };
  items: FlowItemWithPose[];
}

export function FlowPageClient({ flow, items }: FlowPageClientProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [isAutoDownloading, setIsAutoDownloading] = useState(false);
  const creatorName = flow.profiles?.full_name || undefined;

  const triggerPdfDownload = useCallback(async () => {
    if (!printRef.current || isAutoDownloading) return;

    setIsAutoDownloading(true);
    try {
      await exportElementToPdf(printRef.current, {
        filename: `${sanitizeFilename(flow.title || 'yoga-flow')}.pdf`,
        quality: 0.95,
        scale: 2,
      });
    } catch (error) {
      console.error('Failed to auto-download PDF:', error);
    } finally {
      setIsAutoDownloading(false);
    }
  }, [flow.title, isAutoDownloading]);

  // Auto-trigger PDF download if ?download=pdf is in URL
  useEffect(() => {
    if (searchParams.get('download') === 'pdf') {
      // Small delay to ensure content is fully rendered
      const timer = setTimeout(() => {
        triggerPdfDownload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, triggerPdfDownload]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Auto-download loading overlay */}
      {isAutoDownloading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            <p className="text-neutral-700 font-medium">Generating PDF...</p>
          </div>
        </div>
      )}

      {/* Header - hidden on print */}
      <header className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <Container size="xl" className="py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/yoga_sequencing_logo_transparent.jpg"
                alt="FLOW"
                width={120}
                height={48}
                className="h-10 w-auto object-contain contrast-150 saturate-150 brightness-75"
              />
            </Link>

            <div className="flex items-center gap-2">
              <Link href="/builder">
                <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  <span className="hidden sm:inline">Create Your Own</span>
                  <span className="sm:hidden">Create</span>
                </Button>
              </Link>
              <PdfDownloadButton
                targetRef={printRef}
                filename={flow.title || 'yoga-flow'}
                className="bg-green-500 hover:bg-green-600"
              >
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </PdfDownloadButton>
              <PrintButton />
            </div>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="py-8 print:py-0">
        <Container size="lg" className="print:max-w-none print:px-0">
          <div ref={printRef}>
            <FlowPrintPreview
              flow={flow}
              items={items}
              creatorName={creatorName}
            />
          </div>
        </Container>
      </main>

      {/* Footer - hidden on print */}
      <footer className="no-print py-8 border-t border-neutral-200 bg-white">
        <Container size="lg">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-4">
              Create your own yoga sequences with FLOW
            </p>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                Get Started Free
              </Button>
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
