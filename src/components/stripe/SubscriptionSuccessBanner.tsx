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
  const sessionId = searchParams.get('session_id');

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

    // Start activation process
    setIsPolling(true);

    const activateSubscription = async () => {
      try {
        // If we have a session_id, use the activate API directly
        if (sessionId) {
          const activateResponse = await fetch('/api/subscription/activate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId }),
          });

          if (activateResponse.ok) {
            const activateData = await activateResponse.json();
            if (activateData.activated && activateData.subscription_tier === 'paid') {
              setIsPolling(false);
              setShowSuccess(true);
              setTimeout(() => {
                router.refresh();
              }, 1500);
              return;
            }
          }
        }

        // Fallback: Try sync API
        const syncResponse = await fetch('/api/subscription/sync', {
          method: 'POST',
        });
        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          if (syncData.subscription_tier === 'paid') {
            setIsPolling(false);
            setShowSuccess(true);
            setTimeout(() => {
              router.refresh();
            }, 1500);
            return;
          }
        }

        // If first attempts failed, poll for a while
        let attempts = 0;
        const maxAttempts = 15;

        const pollInterval = setInterval(async () => {
          attempts++;

          try {
            // Check profile
            const response = await fetch('/api/auth/profile');
            if (response.ok) {
              const data = await response.json();
              if (data.profile?.subscription_tier === 'paid') {
                clearInterval(pollInterval);
                setIsPolling(false);
                setShowSuccess(true);
                setTimeout(() => {
                  router.refresh();
                }, 1500);
                return;
              }
            }

            // Try activate again every 3 seconds
            if (sessionId && attempts % 3 === 0) {
              const retryActivate = await fetch('/api/subscription/activate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId }),
              });
              if (retryActivate.ok) {
                const retryData = await retryActivate.json();
                if (retryData.activated) {
                  clearInterval(pollInterval);
                  setIsPolling(false);
                  setShowSuccess(true);
                  setTimeout(() => {
                    router.refresh();
                  }, 1500);
                  return;
                }
              }
            }
          } catch (error) {
            console.error('Error polling subscription:', error);
          }

          if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            setIsPolling(false);
            // Show message to refresh
            setShowSuccess(false);
            router.refresh();
          }
        }, 1000);
      } catch (error) {
        console.error('Error activating subscription:', error);
        setIsPolling(false);
        router.refresh();
      }
    };

    activateSubscription();
  }, [isSuccess, sessionId, currentTier, router]);

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
