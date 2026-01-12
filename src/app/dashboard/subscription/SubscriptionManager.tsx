'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import type { Profile } from '@/types';

interface SubscriptionManagerProps {
  profile: Profile | null;
}

export function SubscriptionManager({ profile }: SubscriptionManagerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isPro = profile?.subscription_tier === 'paid';
  const subscriptionStatus = profile?.subscription_status;
  const periodEnd = profile?.subscription_current_period_end;

  const handleCancel = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      setSuccess(true);
      setShowConfirm(false);

      // Refresh page after a short delay
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-neutral-900 mb-2">
          Subscription Cancelled
        </h2>
        <p className="text-neutral-600 mb-4">
          Your subscription has been cancelled. You now have access to the Free plan.
        </p>
        <Link href="/dashboard">
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="text-center py-8">
        <CreditCard className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-neutral-900 mb-2">
          No Active Subscription
        </h2>
        <p className="text-neutral-600 mb-4">
          You&apos;re currently on the Free plan. Upgrade to Pro for unlimited flows and more.
        </p>
        <Link href="/pricing">
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
            View Plans
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Plan Info */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-1">
            FLOW Pro
          </h2>
          <p className="text-neutral-600">$4.99/month</p>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
          subscriptionStatus === 'active'
            ? 'bg-success/10 text-success'
            : subscriptionStatus === 'trialing'
            ? 'bg-primary-100 text-primary-700'
            : 'bg-amber-100 text-amber-700'
        }`}>
          {subscriptionStatus === 'trialing' ? 'Trial' : subscriptionStatus === 'active' ? 'Active' : subscriptionStatus}
        </span>
      </div>

      {/* Period Info */}
      {periodEnd && (
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-sm text-neutral-600">
            {subscriptionStatus === 'trialing' ? (
              <>
                Your free trial ends on{' '}
                <span className="font-medium text-neutral-900">
                  {new Date(periodEnd).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                . Cancel before this date to avoid being charged.
              </>
            ) : (
              <>
                Your next billing date is{' '}
                <span className="font-medium text-neutral-900">
                  {new Date(periodEnd).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Features */}
      <div>
        <h3 className="font-medium text-neutral-900 mb-3">Your Pro Benefits</h3>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Unlimited flows
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Unlimited poses per flow
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            PDF export
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Shareable links
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Priority support
          </li>
        </ul>
      </div>

      {/* Cancel Section */}
      {!showConfirm ? (
        <div className="pt-4 border-t border-neutral-200">
          <Button
            variant="outline"
            onClick={() => setShowConfirm(true)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Cancel Subscription
          </Button>
        </div>
      ) : (
        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-900 mb-1">
                Cancel your subscription?
              </h3>
              <p className="text-sm text-red-700">
                {subscriptionStatus === 'trialing'
                  ? "You're still in your free trial. If you cancel now, you won't be charged and will lose access to Pro features immediately."
                  : "You'll lose access to all Pro features immediately. Your flows won't be deleted, but you'll be limited to the Free plan."}
              </p>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={isLoading}
            >
              Keep Subscription
            </Button>
            <Button
              onClick={handleCancel}
              isLoading={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
