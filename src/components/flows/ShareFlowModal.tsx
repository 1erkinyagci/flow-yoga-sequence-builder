'use client';

import { useState, useEffect } from 'react';
import { X, Link2, Check, Copy, ExternalLink, Lock, Loader2, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui';

interface ShareFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  flowId: string;
  flowTitle: string;
  isProUser: boolean;
}

interface ShareState {
  isPublic: boolean;
  publicSlug: string | null;
  shareUrl: string | null;
}

export function ShareFlowModal({
  isOpen,
  onClose,
  flowId,
  flowTitle,
  isProUser,
}: ShareFlowModalProps) {
  const [shareState, setShareState] = useState<ShareState>({
    isPublic: false,
    publicSlug: null,
    shareUrl: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current share status when modal opens
  useEffect(() => {
    if (isOpen && flowId && isProUser) {
      fetchShareStatus();
    }
  }, [isOpen, flowId, isProUser]);

  const fetchShareStatus = async () => {
    try {
      const response = await fetch(`/api/flows/${flowId}/share`);
      if (response.ok) {
        const data = await response.json();
        setShareState({
          isPublic: data.is_public,
          publicSlug: data.public_slug,
          shareUrl: data.share_url,
        });
      }
    } catch (err) {
      console.error('Error fetching share status:', err);
    }
  };

  const handleShare = async () => {
    if (!isProUser) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/flows/${flowId}/share`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to share flow');
      }

      const data = await response.json();
      setShareState({
        isPublic: data.is_public,
        publicSlug: data.public_slug,
        shareUrl: data.share_url,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share flow');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnshare = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/flows/${flowId}/share`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to unshare flow');
      }

      setShareState({
        isPublic: false,
        publicSlug: null,
        shareUrl: null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unshare flow');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareState.shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareState.shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenLink = () => {
    if (shareState.shareUrl) {
      window.open(shareState.shareUrl, '_blank');
    }
  };

  const handleDownloadPdf = () => {
    if (shareState.shareUrl) {
      window.open(`${shareState.shareUrl}?download=pdf`, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-900">
            Share Flow
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Flow title */}
          <div className="mb-4">
            <p className="text-sm text-neutral-500">Sharing</p>
            <p className="font-medium text-neutral-900 truncate">{flowTitle}</p>
          </div>

          {!isProUser ? (
            /* Pro upgrade prompt */
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Upgrade to Pro
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Share your flows with others and export to PDF with a Pro subscription.
              </p>
              <a href="/pricing">
                <Button variant="primary" size="sm">
                  View Plans
                </Button>
              </a>
            </div>
          ) : shareState.isPublic ? (
            /* Share link active */
            <div className="space-y-4">
              <div className="p-3 bg-success-light rounded-xl border border-success/20">
                <div className="flex items-center gap-2 text-success mb-2">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Link is active</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Anyone with this link can view your flow
                </p>
              </div>

              {/* Share URL */}
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-neutral-100 rounded-lg text-sm text-neutral-700 truncate">
                  {shareState.shareUrl}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  leftIcon={isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleOpenLink}
                    leftIcon={<ExternalLink className="w-4 h-4" />}
                  >
                    Open Link
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={handleDownloadPdf}
                    leftIcon={<FileDown className="w-4 h-4" />}
                  >
                    Download PDF
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={handleUnshare}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Stop Sharing'}
                </Button>
              </div>
            </div>
          ) : (
            /* Not shared yet */
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Create Shareable Link
                </h3>
                <p className="text-sm text-neutral-600">
                  Generate a public link that anyone can use to view and print your flow.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleShare}
                disabled={isLoading}
                leftIcon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
              >
                {isLoading ? 'Creating...' : 'Create Share Link'}
              </Button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
