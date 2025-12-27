'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Share2, X, Copy, Check } from 'lucide-react';
import { FlowPrintPreview } from '@/components/flows/FlowPrintPreview';
import { PrintButton } from '@/components/flows/PrintButton';
import { Container, Button } from '@/components/ui';
import type { Flow, FlowItemWithPose, Profile } from '@/types';

interface FlowPageClientProps {
  flow: Flow & { profiles?: Pick<Profile, 'full_name'> | null };
  items: FlowItemWithPose[];
}

export function FlowPageClient({ flow, items }: FlowPageClientProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const creatorName = flow.profiles?.full_name || undefined;

  // Get the share URL (current URL without query params)
  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.search = ''; // Remove all query params
    return url.toString();
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Share Flow</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Link Display */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Share this link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getShareUrl()}
                  className="flex-1 px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-lg text-sm text-neutral-700 truncate"
                />
                <Button
                  variant={isCopied ? 'primary' : 'outline'}
                  size="sm"
                  onClick={handleCopyLink}
                  leftIcon={isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  style={isCopied ? { backgroundColor: '#34C759', borderColor: '#34C759' } : undefined}
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Info Text */}
            <div className="space-y-1">
              <p className="text-xs text-neutral-500">
                Anyone with this link can view this yoga flow sequence.
              </p>
              <p className="text-xs text-amber-600 font-medium">
                This link will expire in 24 hours.
              </p>
            </div>
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareModal(true)}
                leftIcon={<Share2 className="w-4 h-4" />}
              >
                Share
              </Button>
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
