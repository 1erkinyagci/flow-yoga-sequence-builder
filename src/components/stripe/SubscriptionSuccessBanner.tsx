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

    // Start polling for subscription update
    setIsPolling(true);
    let attempts = 0;
    const maxAttempts = 15; // 15 seconds max

    const pollInterval = setInterval(async () => {
      attempts++;

      try {
        // Fetch fresh profile data
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
        console.error('Error polling profile:', error);
      }

      if (attempts >= maxAttempts) {
        clearInterval(pollInterval);
        setIsPolling(false);
        // Show success anyway and refresh
        setShowSuccess(true);
        setTimeout(() => {
          router.refresh();
        }, 1500);
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
