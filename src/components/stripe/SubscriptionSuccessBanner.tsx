'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui';

interface SubscriptionSuccessBannerProps {
  currentTier: 'free' | 'paid';
}

export function SubscriptionSuccessBanner({ currentTier }: SubscriptionSuccessBannerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  const [isPolling, setIsPolling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;

    // If already pro, show success immediately
    if (currentTier === 'paid') {
      setShowSuccess(true);
      // Clean URL after showing success
      setTimeout(() => {
        router.replace(window.location.pathname, { scroll: false });
      }, 5000);
      return;
    }

    // Start syncing and polling for subscription update
    setIsPolling(true);
    let attempts = 0;
    const maxAttempts = 20; // 20 seconds max
    let syncAttempted = false;

    const pollInterval = setInterval(async () => {
      attempts++;

      try {
        // First, try to sync subscription from Stripe (fallback for webhook)
        if (!syncAttempted || attempts % 3 === 0) {
          syncAttempted = true;
          const syncResponse = await fetch('/api/subscription/sync', {
            method: 'POST',
          });
          if (syncResponse.ok) {
            const syncData = await syncResponse.json();
            if (syncData.subscription_tier === 'paid') {
              clearInterval(pollInterval);
              setIsPolling(false);
              setShowSuccess(true);
              // Refresh the page to update all components
              setTimeout(() => {
                router.refresh();
              }, 1500);
              return;
            }
          }
        }

        // Also check profile directly
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const data = await response.json();
          if (data.profile?.subscription_tier === 'paid') {
            clearInterval(pollInterval);
            setIsPolling(false);
            setShowSuccess(true);
            // Refresh the page to update all components
            setTimeout(() => {
              router.refresh();
            }, 1500);
          }
        }
      } catch (error) {
        console.error('Error polling/syncing subscription:', error);
      }

      if (attempts >= maxAttempts) {
        clearInterval(pollInterval);
        setIsPolling(false);
        // Try one final sync
        try {
          const finalSync = await fetch('/api/subscription/sync', { method: 'POST' });
          const finalData = await finalSync.json();
          if (finalData.subscription_tier === 'paid') {
            setShowSuccess(true);
            setTimeout(() => {
              router.refresh();
            }, 1500);
            return;
          }
        } catch (e) {
          console.error('Final sync failed:', e);
        }
        // Show error state if still not synced
        setShowSuccess(false);
        router.refresh();
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, [isSuccess, currentTier, router]);

  if (!isSuccess && !showSuccess) return null;

  if (isPolling) {
    return (
      <Card
        variant="default"
        padding="md"
        className="mb-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white border-none"
      >
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <div>
            <h3 className="font-semibold">Activating your Pro subscription...</h3>
            <p className="text-primary-100 text-sm">
              Please wait while we set up your account.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (showSuccess) {
    return (
      <Card
        variant="default"
        padding="md"
        className="mb-8 bg-gradient-to-r from-success to-emerald-600 text-white border-none"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              Welcome to Pro! <Sparkles className="w-4 h-4" />
            </h3>
            <p className="text-emerald-100 text-sm">
              Your 7-day free trial has started. Enjoy unlimited flows, PDF exports, and more!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return null;
}
